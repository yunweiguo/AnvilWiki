/**
 * Site configuration — the single source of truth for game-specific metadata.
 *
 * 👉 APPLY TEMPLATE: Change every field here when building a new game wiki.
 * This is part of the CONFIG LAYER — framework code reads from here, never the reverse.
 */

export interface SiteConfig {
  /** Full site name, used in <title> suffix and Organization JSON-LD. e.g. "Anvil Quest Wiki" */
  name: string;
  /** Short name for PWA manifest and mobile logo. e.g. "AQ Wiki" */
  shortName: string;
  /** Site description for Organization JSON-LD and og:site_name. */
  description: string;
  /** Domain without protocol or trailing slash. e.g. "anvilquestwiki.wiki" */
  domain: string;
  /** Hero tagline shown under the site title. */
  tagline: string;
  /** Copyright / legal disclaimer line shown in footer. */
  legalNotice: string;
  social: {
    /** Official game website URL (the game itself, not the wiki). */
    official: string;
    discord?: string;
    youtube?: string;
    twitter?: string;
    reddit?: string;
  };
  /**
   * Canonical URLs about the GAME (Steam page, official site, Wikipedia entry…).
   * Emitted as Organization JSON-LD `sameAs` — helps Google / AI engines link
   * this wiki to the game's knowledge-graph entity.
   */
  sameAs?: string[];
  game: {
    /** Full game name. */
    name: string;
    /** Platform: "Roblox" | "Steam" | "Epic Games" | "Mobile" | ... */
    platform: string;
    /** Developer / studio name. */
    developer: string;
    /** Genre description. */
    genre: string;
  };
  /**
   * Dimensions of the default OG/Twitter share image (public/images/hero.webp).
   * Emitted as og:image:width / og:image:height so social crawlers can render
   * the share card without downloading the image first.
   */
  ogImageWidth: number;
  ogImageHeight: number;
}

export const site: SiteConfig = {
  name: 'NMRiH2 Wiki',
  shortName: 'NMRiH2',
  description:
    'No More Room in Hell 2 guides for crossplay, Xbox, PS5, solo mode, beginner tips, Responders, and the latest 1.0 updates.',
  domain: 'nmrih2-5cp.pages.dev',
  tagline: 'Crossplay, platforms, survival guides, and 1.0 updates',
  legalNotice:
    'NMRiH2 Wiki is a fan-made site and is not affiliated with Torn Banner Studios or Green Man Gaming Publishing.',
  social: {
    official: 'https://www.nmrih2.com/',
  },
  sameAs: [
    'https://www.nmrih2.com/',
    'https://store.steampowered.com/app/292000/No_More_Room_in_Hell_2/',
    'https://www.xbox.com/en-US/games/store/no-more-room-in-hell-2/9pf1q2f7jm9g',
    'https://store.playstation.com/en-us/concept/10019078',
  ],
  game: {
    name: 'No More Room in Hell 2',
    platform: 'PC, PlayStation 5, Xbox Series X|S',
    developer: 'Torn Banner Studios',
    genre: 'Co-op survival horror shooter',
  },
  // hero.webp is 1200×630 (the recommended OG share aspect ratio).
  ogImageWidth: 1200,
  ogImageHeight: 630,
};

/** Absolute site URL (no trailing slash). Falls back to the Astro `site` config. */
export const siteUrl: string = (process.env.SITE_URL || `https://${site.domain}`).replace(
  /\/$/,
  '',
);
