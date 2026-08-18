/**
 * Report published articles whose page-level refresh window has expired.
 * The same `refreshAfterDays` frontmatter field drives the page banner.
 */
import * as fs from 'node:fs';
import * as path from 'node:path';

const ROOT = process.cwd();
const BASE = path.resolve(ROOT, 'src/content/wiki');
const DAY = 24 * 60 * 60 * 1000;

interface Item {
  file: string;
  days: number;
  refreshAfterDays: number;
}

const files: string[] = [];
(function walk(dir: string) {
  if (!fs.existsSync(dir)) return;
  for (const entry of fs.readdirSync(dir, { withFileTypes: true })) {
    const itemPath = path.join(dir, entry.name);
    if (entry.isDirectory()) walk(itemPath);
    else if (entry.name.endsWith('.mdx')) files.push(itemPath);
  }
})(BASE);

const items: Item[] = [];
const now = Date.now();

for (const file of files) {
  const source = fs.readFileSync(file, 'utf8');
  const frontmatter = source.split('---')[1] ?? '';
  if (/^draft:\s*true\s*$/m.test(frontmatter)) continue;

  const date = frontmatter.match(/^date:\s*(.+)$/m)?.[1]?.trim().replace(/['"]/g, '');
  const lastModified = frontmatter
    .match(/^lastModified:\s*(.+)$/m)?.[1]
    ?.trim()
    .replace(/['"]/g, '');
  const refreshAfterDays = Number(
    frontmatter.match(/^refreshAfterDays:\s*(\d+)$/m)?.[1],
  );
  const referenceDate = new Date(lastModified || date || '');

  if (!Number.isFinite(refreshAfterDays) || refreshAfterDays <= 0) continue;
  if (Number.isNaN(referenceDate.getTime())) continue;

  const ageMs = now - referenceDate.getTime();
  if (ageMs > refreshAfterDays * DAY) {
    items.push({
      file: path.relative(ROOT, file),
      days: Math.floor(ageMs / DAY),
      refreshAfterDays,
    });
  }
}

items.sort((a, b) => b.days - b.refreshAfterDays - (a.days - a.refreshAfterDays));

const today = new Date().toISOString().slice(0, 10);
const lines = [`## Content freshness audit (${today})`, ''];
if (items.length === 0) {
  lines.push(`✅ Nothing stale. ${files.length} articles scanned.`);
} else {
  lines.push(`${items.length} item(s) need verification (${files.length} articles scanned):`, '');
  lines.push('| Priority | Article | Age | Refresh window | Why |');
  lines.push('|---|---|---:|---:|---|');
  for (const item of items) {
    lines.push(
      `| P1 | \`${item.file}\` | ${item.days}d | ${item.refreshAfterDays}d | Page-level verification window expired |`,
    );
  }
  lines.push('', '**Suggested action**');
  lines.push('- Re-check time-sensitive claims against current primary sources, then bump `lastModified`.');
}

const report = lines.join('\n');
console.log('\n' + report + '\n');

if (process.env.GITHUB_STEP_SUMMARY) {
  fs.appendFileSync(process.env.GITHUB_STEP_SUMMARY, report + '\n', 'utf8');
}
