# No More Room in Hell 2 — 实现方案

## 1. 实现原则

本项目基于现有 AnvilWiki，不新造框架。

遵守仓库三层分离：

```text
Code Layer    src/pages / src/components / src/lib
Config Layer  src/config / src/locales / src/styles / public / wrangler.toml
Content Layer src/content/wiki
```

MVP 原则：

- 优先改 Config / Content
- Code Layer 尽量不动
- 不引入 React/Vue/Svelte
- 不切 SSR
- 不引数据库
- 不为 Player Count 阻塞上线

## 2. 开发分支

推荐：

```bash
git checkout main
git pull
git checkout -b feat/nmrih2-mvp
pnpm install
```

## 3. 模板实例化

### 3.1 Dry run

```bash
pnpm apply-template --dry-run
```

确认 planned changes。

### 3.2 正式执行

```bash
pnpm apply-template
```

建议输入：

```text
Game name: No More Room in Hell 2
Locales: en
Categories:
  guides
  platforms
  gameplay
  updates
Homepage preset: guides
```

### 3.3 注意

`guides` preset 只是 scaffold，不能作为最终首页。当前 preset 仍包含通用游戏假设，例如 bosses / starter codes / first boss 等文案，必须继续人工重写 `src/locales/en.json`。

## 4. 文件级改动清单

### 4.1 `src/config/site.ts`

需要配置：

- site name
- short name
- description
- domain
- tagline
- legal notice
- official URL
- sameAs
- game.name
- platform
- developer
- genre

建议站点名保持短，例如：

```text
NMRiH2 Wiki
```

原因：文章 frontmatter `title` 会被 `pageTitle()` 自动追加 `— {site.name}` 作为 HTML title 后缀。

### 4.2 `src/config/navigation.ts`

目标：

```ts
export const NAVIGATION_CONFIG = [
  { key: 'guides', path: '/guides', icon: 'lucide:book-open', isContentType: true, order: 1 },
  { key: 'platforms', path: '/platforms', icon: 'lucide:gamepad-2', isContentType: true, order: 2 },
  { key: 'gameplay', path: '/gameplay', icon: 'lucide:crosshair', isContentType: true, order: 3 },
  { key: 'updates', path: '/updates', icon: 'lucide:newspaper', isContentType: true, order: 4 },
];
```

必须同步：

```text
navigation.ts key
=
src/locales/en.json nav.<key>
=
src/content/wiki/en/<key>/
```

### 4.3 `src/locales/en.json`

需要重写：

- `site`
- `nav`
- `overview`
- `home.meta`
- `home.hero`
- `home.start`
- `home.popular`
- `home.explore`
- `home.closingCta`

首页 TDH 与模块内容见 `../nmrih2-mvp.md`。

### 4.4 `src/i18n/*`

MVP 只保留 English。

确保：

```text
locales = ['en']
```

并同步 locale JSON 与 content 目录。

### 4.5 `src/styles/globals.css`

只调整品牌变量，不在组件里写死颜色：

```text
--brand
--brand-light
--brand-h
--brand-s
```

### 4.6 `public/*`

替换：

- favicon
- apple-touch-icon
- Android icons
- manifest metadata
- `images/hero.webp`

检查 OG image dimensions 与 `site.ts` 配置一致。

### 4.7 `wrangler.toml`

确认：

```toml
SITE_URL = "https://<domain>"
```

若保留 `wrangler.toml`，以它作为 Cloudflare Pages env 的 source of truth。

## 5. Content Layer

目标结构：

```text
src/content/wiki/en/
├── guides/
├── platforms/
├── gameplay/
└── updates/
```

删除 `apply-template` 产生的占位 `getting-started.mdx`，在真实文章完成后不能留 scaffold 页面参与索引。

## 6. 首批文章实现

### 文件映射

```text
/guides/crossplay
→ src/content/wiki/en/guides/crossplay.mdx

/platforms/xbox
→ src/content/wiki/en/platforms/xbox.mdx
```

以此类推。

### Frontmatter 模板

```yaml
---
title: "No More Room in Hell 2 Crossplay: PC, PS5 & Xbox"
description: "..."
category: "guides"
date: 2026-08-18
lastModified: 2026-08-18
gameVersion: "1.0"
summary: "..."
tags:
  - crossplay
  - multiplayer
---
```

规则：

- `title <= 80`
- `description 40-165 chars`
- `summary <= 200 chars`
- 正文不写 H1
- 第一层正文 heading 从 H2 开始
- H2 / H3 按 `../nmrih2-mvp.md`

## 7. 内容生产工作流

优先使用已有 `anvil-new-article` skill。

每页步骤：

```text
1. 确认 Primary Keyword
2. 收集可靠素材
3. 确认 TDH / H2/H3
4. 生成 MDX
5. 核对所有硬事实
6. pnpm check-content
7. pnpm build
8. 人工浏览页面
```

如果素材不够：

```yaml
draft: true
```

不得为了首日 10 页数量编造事实。

## 8. 首页实现

当前 `HomePage.astro` 已支持：

- Hero
- QuickStart
- Recent Updates
- Trending
- Explore modules
- Closing CTA

MVP 不修改 HomePage framework。

通过 `src/locales/en.json` 驱动。

需要注意：当前 Hero `ctaPrimary` 实际跳转 `site.social.official`，而 `ctaSecondary` 由 navigation index 推导。若产品最终需要首页首 CTA 直接跳 Crossplay Guide，这属于 Code Layer 行为差异，需要单独设计通用 CTA data model；MVP 可先接受现有行为或在配置实例化时做最小通用改造，但不得硬编码 NMRiH2 URL 到组件。

## 9. Crossplay Checker

MVP：不做，先静态页面。

Phase 1.1：

```text
src/components/mdx/CompatibilityChecker.astro
```

要求：

- 通用组件
- props 驱动 platforms / matrix
- 原生 Astro + vanilla JS
- 不引 framework runtime

示例逻辑：

```ts
compatibility[from][to]
```

只有 Crossplay 页有稳定 impression 后再做。

## 10. Player Count

MVP：不做实时。

禁止上线伪 Live 数据。

Phase 2：

```text
Browser
  ↓
Cloudflare Worker
  ↓
Cache
  ↓
verified source
```

Worker 与静态站解耦。

## 11. SEO 实现检查

### Homepage

检查：

- title
- description
- H1
- canonical
- WebSite / VideoGame JSON-LD

### Article

检查：

- frontmatter title -> H1
- final HTML title = article title + site suffix
- description
- Article JSON-LD
- Breadcrumb JSON-LD
- lastModified
- gameVersion
- Quick Answer

### Site

检查：

```text
/robots.txt
/sitemap-index.xml
/rss.xml
/llms.txt
```

## 12. 验证命令

配置完成后：

```bash
pnpm check-config
pnpm typecheck
pnpm lint
pnpm test
pnpm check-content
pnpm build
pnpm check-links
```

MVP English-only 时仍建议跑：

```bash
pnpm check-i18n
```

全部通过才能发布。

## 13. 部署

Cloudflare Pages：

```text
Build command: pnpm build
Output: dist
Node: 22
```

保持 Astro static。

部署后：

1. 检查正式域名 canonical
2. 检查 sitemap
3. 检查 robots
4. 检查主要页面 200
5. Google Search Console 添加 domain
6. 提交 `sitemap-index.xml`

## 14. 推荐提交顺序

```text
1. chore: configure NMRiH2 site metadata and navigation
2. feat: rebuild NMRiH2 homepage content
3. content: add crossplay guide
4. content: add Xbox PS5 and Game Pass pages
5. content: add solo and beginner guides
6. content: add Steam review characters and update pages
7. seo: verify metadata internal links and sitemap
```

每个内容批次都单独跑 `check-content + build`。

## 15. MVP 验收

### Config

- [ ] 无 Anvil Quest
- [ ] 无 Forge Studios
- [ ] 无 demo codes / bosses
- [ ] domain / SITE_URL 正确

### Content

- [ ] 10 正式页面
- [ ] 无 scaffold 页面
- [ ] 无 fake facts
- [ ] TDH 对齐

### Engineering

- [ ] all checks green
- [ ] build green
- [ ] Cloudflare deployed

### SEO

- [ ] canonical correct
- [ ] sitemap correct
- [ ] robots correct
- [ ] GSC submitted
