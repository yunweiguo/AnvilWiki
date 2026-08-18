import { describe, expect, it } from 'vitest';
import * as fs from 'node:fs';
import * as path from 'node:path';
import { NAVIGATION_CONFIG } from '~/config/navigation';
import { site } from '~/config/site';
import { locales } from '~/i18n/routing';

const ROOT = path.resolve(__dirname, '..');
const contentRoot = path.join(ROOT, 'src/content/wiki/en');
const localeConfig = JSON.parse(
  fs.readFileSync(path.join(ROOT, 'src/locales/en.json'), 'utf8'),
);
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

const expectedRefreshPolicies: Record<string, number> = {
  'guides/crossplay.mdx': 7,
  'platforms/game-pass.mdx': 7,
  'guides/is-it-worth-it.mdx': 7,
  'platforms/xbox.mdx': 14,
  'platforms/ps5.mdx': 14,
  'platforms/steam-pc.mdx': 14,
  'guides/solo-mode.mdx': 30,
  'guides/beginner-tips.mdx': 30,
  'gameplay/characters.mdx': 30,
  'updates/armageddon-1-0.mdx': 90,
};

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

  it('drives homepage actions and featured routes from locale config', () => {
    const home = localeConfig.home;
    const articleRoutes = new Set(expectedArticles.map((file) => `/${file.replace(/\.mdx$/, '')}`));
    const configuredLinks = [
      home.hero.ctaPrimary.href,
      home.hero.ctaSecondary.href,
      home.latest.href,
      ...home.featuredSections.flatMap((section: any) => [
        section.cta?.href,
        ...(section.cards ?? []).map((card: any) => card.href),
      ]),
      ...home.popular.cards.map((card: any) => card.href),
    ].filter(Boolean);

    expect(home.hero.ctaPrimary).toEqual({
      label: 'Crossplay Guide',
      href: '/guides/crossplay',
      external: false,
    });
    expect(home.hero.ctaSecondary).toEqual({
      label: 'Beginner Guide',
      href: '/guides/beginner-tips',
      external: false,
    });
    expect(home.latest).toMatchObject({ category: 'updates', limit: 3, href: '/updates' });
    expect(configuredLinks.every((href: string) => href === '/updates' || articleRoutes.has(href))).toBe(true);
    expect(JSON.stringify(home)).not.toMatch(/\b(codes|bosses)\b/i);
  });

  it('defines valid page-level freshness policies for all ten articles', () => {
    for (const [relativePath, days] of Object.entries(expectedRefreshPolicies)) {
      const source = fs.readFileSync(path.join(contentRoot, relativePath), 'utf8');
      const configured = Number(source.match(/^refreshAfterDays:\s*(\d+)$/m)?.[1]);
      expect(configured, relativePath).toBe(days);
      expect(configured).toBeGreaterThan(0);
      expect(configured).toBeLessThanOrEqual(365);
    }
  });

  it('uses the same page-level field in the audit and enables it for this repository', () => {
    const audit = fs.readFileSync(path.join(ROOT, 'scripts/refresh-audit.ts'), 'utf8');
    const workflow = fs.readFileSync(
      path.join(ROOT, '.github/workflows/content-pipeline.yml'),
      'utf8',
    );

    expect(audit).toContain('refreshAfterDays');
    expect(audit).not.toContain('STALE_CATEGORIES');
    expect(workflow).toContain("github.repository == 'yunweiguo/AnvilWiki'");
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

  it('keeps the homepage and support routes free of instance-specific code', () => {
    const homepage = fs.readFileSync(path.join(ROOT, 'src/components/home/HomePage.astro'), 'utf8');
    const legal = fs.readFileSync(path.join(ROOT, 'src/components/layout/LegalContent.astro'), 'utf8');
    const llms = fs.readFileSync(path.join(ROOT, 'src/pages/llms.txt.ts'), 'utf8');
    const forbidden = /NMRiH2|No More Room in Hell 2|Responder|Armageddon|listPath\(['"](?:platforms|updates)/i;

    expect(homepage).not.toMatch(forbidden);
    expect(legal).not.toMatch(forbidden);
    expect(llms).not.toMatch(forbidden);
  });

  it('builds llms.txt from generic site metadata and the live article collection', () => {
    const llmsRoute = fs.readFileSync(path.join(ROOT, 'src/pages/llms.txt.ts'), 'utf8');

    expect(llmsRoute).toContain('site.game.name');
    expect(llmsRoute).toContain('site.description');
    expect(llmsRoute).toContain("getCollection('wiki')");
  });

  it('does not model a misleading first-release date or a fabricated default author', () => {
    const siteConfig = fs.readFileSync(path.join(ROOT, 'src/config/site.ts'), 'utf8');
    const seo = fs.readFileSync(path.join(ROOT, 'src/lib/seo.ts'), 'utf8');

    expect(siteConfig).not.toContain('releaseDate');
    expect(siteConfig).not.toContain('defaultAuthor');
    expect(seo.match(/function videoGameJsonLd[\s\S]*?^}/m)?.[0]).not.toContain('datePublished');
  });
});
