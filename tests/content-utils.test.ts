import { describe, it, expect } from 'vitest';
import { parseEntryId, isPossiblyOutdated } from '~/lib/content-utils';

describe('parseEntryId', () => {
  it('parses a simple id into locale/category/slug', () => {
    expect(parseEntryId('en/bosses/emberfang')).toEqual({
      locale: 'en',
      category: 'bosses',
      slug: 'emberfang',
    });
  });

  it('strips the .mdx extension the glob loader includes in the id', () => {
    expect(parseEntryId('en/bosses/emberfang.mdx')).toEqual({
      locale: 'en',
      category: 'bosses',
      slug: 'emberfang',
    });
  });

  it('keeps nested slug segments joined with /', () => {
    expect(parseEntryId('en/guides/sub/deep/page')).toEqual({
      locale: 'en',
      category: 'guides',
      slug: 'sub/deep/page',
    });
  });

  it('returns null when the locale segment is not a configured locale', () => {
    expect(parseEntryId('fr/bosses/emberfang')).toBeNull();
  });

  it('returns null when there are fewer than 3 segments', () => {
    expect(parseEntryId('en/bosses')).toBeNull();
    expect(parseEntryId('en')).toBeNull();
    expect(parseEntryId('')).toBeNull();
  });
});

describe('isPossiblyOutdated', () => {
  const now = new Date('2026-08-16T00:00:00Z');
  const published = new Date('2026-07-01T00:00:00Z');

  it('is false when an article has no page-level refresh policy', () => {
    expect(isPossiblyOutdated(undefined, undefined, published, now)).toBe(false);
  });

  it('uses the article-specific refresh interval', () => {
    const sixDaysOld = new Date(now.getTime() - 6 * 86400000);
    const eightDaysOld = new Date(now.getTime() - 8 * 86400000);
    expect(isPossiblyOutdated(7, sixDaysOld, published, now)).toBe(false);
    expect(isPossiblyOutdated(7, eightDaysOld, published, now)).toBe(true);
    expect(isPossiblyOutdated(14, eightDaysOld, published, now)).toBe(false);
  });

  it('prefers lastModified over the publish date', () => {
    const fresh = new Date(now.getTime() - 2 * 86400000);
    expect(isPossiblyOutdated(7, fresh, published, now)).toBe(false);
    expect(isPossiblyOutdated(7, published, fresh, now)).toBe(true);
  });
});
