/**
 * llms.txt (/llms.txt) — a Markdown "site map" for LLMs (ChatGPT, Perplexity,
 * Claude, etc.) proposed by Jeremy Howard and now a de-facto standard for
 * AI-search visibility.
 *
 * Generated at build time from the wiki Content Collection:
 *   - site intro (name + description)
 *   - every default-locale article: title, absolute URL, one-line summary
 *
 * Listing the live guide corpus here helps AI crawlers discover and cite the
 * site without advertising removed template sections.
 */
import type { APIRoute } from 'astro';
import { site, siteUrl } from '~/config/site';
import { getCollection } from 'astro:content';
import { parseEntryId } from '~/lib/content';
import { defaultLocale } from '~/i18n/routing';
import { detailPath } from '~/lib/url';

export const GET: APIRoute = async () => {
  const all = await getCollection('wiki');
  const entries = all
    .filter((e) => {
      const parsed = parseEntryId(e.id);
      return parsed?.locale === defaultLocale && !e.data.noindex && !e.data.draft;
    })
    .sort((a, b) => a.data.category.localeCompare(b.data.category));

  const lines: string[] = [
    `# ${site.name}`,
    '',
    `> ${site.description}`,
    '',
    `Wiki for ${site.game.name}, available on ${site.game.platform} and developed by ${site.game.developer}. ${site.description}`,
    '',
    '## Articles',
    '',
  ];

  for (const e of entries) {
    const parsed = parseEntryId(e.id);
    const slug = parsed?.slug ?? '';
    const url = `${siteUrl}${detailPath(e.data.category, slug, defaultLocale)}`;
    const summary = e.data.summary ?? e.data.description;
    lines.push(`- [${e.data.title}](${url}): ${summary}`);
  }

  return new Response(lines.join('\n') + '\n', {
    headers: { 'Content-Type': 'text/plain; charset=utf-8' },
  });
};
