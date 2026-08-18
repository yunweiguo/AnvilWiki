import { describe, expect, it } from 'vitest';
import * as fs from 'node:fs';
import * as path from 'node:path';
import { NAVIGATION_CONFIG } from '~/config/navigation';
import { site } from '~/config/site';
import { locales } from '~/i18n/routing';

const ROOT = path.resolve(__dirname, '..');
const contentRoot = path.join(ROOT, 'src/content/wiki/en');
const removedTemplatePaths = [
  'src/components/landing',
  'src/config/landing.ts',
  'src/pages/landing.astro',
  'src/pages/landing',
  'src/pages/zh/landing.astro',
  'src/pages/zh/landing',
  'public/images/showcase',
  'public/images/wechat-qr.jpg',
];

const expectedArticles = [
  'guides/crossplay.mdx',
  'guides/beginner-tips.mdx',
  'guides/solo-mode.mdx',
  'guides/is-it-worth-it.mdx',
  'platforms/xbox.mdx',
  'platforms/ps5.mdx',
  'platforms/game-pass.mdx',
  'platforms/steam-pc.mdx',
  'gameplay/characters.mdx',
  'updates/armageddon-1-0.mdx',
];

describe('NMRiH2 site instance', () => {
  it('uses the project identity and four search-intent categories', () => {
    expect(site.name).toBe('NMRiH2 Wiki');
    expect(site.game.name).toBe('No More Room in Hell 2');
    expect(site.game.developer).toBe('Torn Banner Studios');
    expect(NAVIGATION_CONFIG.map((item) => item.key)).toEqual([
      'guides',
      'platforms',
      'gameplay',
      'updates',
    ]);
  });

  it('keeps local and CI canonical fallbacks aligned with the site domain', () => {
    const astroConfig = fs.readFileSync(path.join(ROOT, 'astro.config.ts'), 'utf8');
    const ciConfig = fs.readFileSync(path.join(ROOT, '.github/workflows/ci.yml'), 'utf8');

    expect(astroConfig).toContain("import { siteUrl } from './src/config/site';");
    expect(astroConfig).toMatch(/site:\s*siteUrl/);
    expect(ciConfig).toContain(`vars.SITE_URL || 'https://${site.domain}'`);
  });

  it('ships English only for the MVP', () => {
    expect(locales).toEqual(['en']);
    expect(fs.existsSync(path.join(ROOT, 'src/locales/ja.json'))).toBe(false);
    expect(fs.existsSync(path.join(ROOT, 'src/content/wiki/ja'))).toBe(false);
  });

  it('publishes exactly the planned ten English articles', () => {
    const actual = fs
      .readdirSync(contentRoot, { recursive: true })
      .filter((entry) => String(entry).endsWith('.mdx'))
      .map(String)
      .sort();

    expect(actual).toEqual([...expectedArticles].sort());
  });

  it('gives every planned article a unique title and summary', () => {
    const titles = new Set<string>();

    for (const relativePath of expectedArticles) {
      const source = fs.readFileSync(path.join(contentRoot, relativePath), 'utf8');
      const title = source.match(/^title:\s*['"](.+)['"]$/m)?.[1];
      const summary = source.match(/^summary:\s*['"](.+)['"]$/m)?.[1];

      expect(title, `${relativePath} title`).toBeTruthy();
      expect(summary, `${relativePath} summary`).toBeTruthy();
      expect(titles.has(title!), `${relativePath} title is unique`).toBe(false);
      titles.add(title!);
    }
  });

  it('describes Xbox multiplayer access without outdated subscription tiers', () => {
    const xboxArticles = ['platforms/game-pass.mdx', 'platforms/xbox.mdx'];

    for (const relativePath of xboxArticles) {
      const source = fs.readFileSync(path.join(contentRoot, relativePath), 'utf8');

      expect(source).not.toContain('Game Pass Core');
      expect(source).toContain('eligible Xbox subscription plan');
      expect(source).toMatch(/online console multiplayer/i);
    }
  });

  it('does not publish the AnvilWiki project landing bundle', () => {
    for (const relativePath of removedTemplatePaths) {
      expect(fs.existsSync(path.join(ROOT, relativePath)), relativePath).toBe(false);
    }
  });

  it('does not render a missing Discord URL in public legal content', () => {
    const legalContent = fs.readFileSync(
      path.join(ROOT, 'src/components/layout/LegalContent.astro'),
      'utf8',
    );

    expect(site.social.discord).toBeUndefined();
    expect(legalContent).not.toContain('href={site.social.discord}');
    expect(legalContent).not.toContain('join our Discord');
    expect(legalContent).not.toContain('reach out on Discord');
  });

  it('keeps homepage topic links independent of navigation order', () => {
    const homepage = fs.readFileSync(path.join(ROOT, 'src/components/home/HomePage.astro'), 'utf8');
    const updatesTitle = homepage.indexOf('{updates.title}');
    const browseAll = homepage.indexOf('{shared.browseAll}', updatesTitle);
    const updatesHeader = homepage.slice(updatesTitle, browseAll);

    expect(updatesTitle).toBeGreaterThan(-1);
    expect(browseAll).toBeGreaterThan(updatesTitle);
    expect(homepage).toContain("href={listPath('platforms', locale)}");
    expect(updatesHeader).toContain("href={listPath('updates', locale)}");
    expect(homepage).not.toContain('NAVIGATION_CONFIG[');
  });

  it('describes only the live NMRiH2 corpus in llms.txt', () => {
    const llmsRoute = fs.readFileSync(path.join(ROOT, 'src/pages/llms.txt.ts'), 'utf8');

    expect(llmsRoute).toContain('crossplay');
    expect(llmsRoute).toContain('platform availability');
    expect(llmsRoute).toContain('Responder progression');
    expect(llmsRoute).toContain('Armageddon 1.0 updates');
    expect(llmsRoute).not.toMatch(/boss guides|tier lists|codes|items/);
    expect(llmsRoute).not.toContain('landingLinkEnabled');
    expect(llmsRoute).not.toContain('handbookPath');
  });
});
