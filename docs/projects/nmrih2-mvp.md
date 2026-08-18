# No More Room in Hell 2 — MVP PRD & TDH Plan

> 基于 AnvilWiki 的专项实例化文档。目标是在 1.0 发布后的 SEO 窗口期，用最小改造上线 10 个高意图页面，并保持 AnvilWiki 的 Code / Config / Content 三层分离。

## 1. 产品定位

产品定位：**No More Room in Hell 2 Guides, Crossplay, Platforms & Gameplay Hub**。

第一阶段不做传统大而全 Wiki，不机械套用 `codes → bosses → redeem` 模板；优先覆盖已经验证的搜索意图：crossplay、Xbox、PS5、Game Pass、solo、tips、Steam/PC、review、characters、update。

### 非目标

MVP 不做：

- Codes / Redeem FAQ
- Boss 攻略
- 用户系统、数据库、CMS
- 实时 Player Count 后端
- Interactive Map / Build Planner
- 多语言

## 2. 信息架构

首期导航：

```text
Guides
Platforms
Gameplay
Updates
```

建议目录：

```text
src/content/wiki/en/
├── guides/
│   ├── crossplay.mdx
│   ├── beginner-tips.mdx
│   ├── solo-mode.mdx
│   └── is-it-worth-it.mdx
├── platforms/
│   ├── xbox.mdx
│   ├── ps5.mdx
│   ├── game-pass.mdx
│   └── steam-pc.mdx
├── gameplay/
│   └── characters.mdx
└── updates/
    └── armageddon-1-0.mdx
```

## 3. TDH 总规则

### 3.1 关键词映射

每个页面只确定一个 Primary Intent；其他相关词只能作为 Secondary Keyword / H2，不应在多个页面的 Title/H1 中同时抢占。

| 页面 | Primary Keyword | 主要 Secondary Keywords |
|---|---|---|
| 首页 | no more room in hell 2 wiki | guides, crossplay, tips |
| Crossplay | no more room in hell 2 crossplay | cross platform, PC, PS5, Xbox |
| Xbox | no more room in hell xbox | Xbox Series X|S, console |
| PS5 | no more room in hell 2 ps5 | PlayStation, PS4 |
| Game Pass | no more room in hell 2 game pass | gamepass, Xbox Game Pass, PC Game Pass |
| Solo | no more room in hell 2 solo | solo mode, play alone |
| Beginner | no more room in hell 2 tips | beginner guide, tips and tricks |
| Steam/PC | no more room in hell 2 steam | PC, Steam |
| Review | no more room in hell 2 review | worth it, price, free |
| Characters | no more room in hell 2 characters | responders, progression |
| 1.0 Update | no more room in hell 2 update | 1.0, Armageddon, patch notes |

### 3.2 Title / H1 关系

AnvilWiki 当前文章页用 frontmatter `title` 同时渲染 H1，并通过 `pageTitle()` 自动追加 `— {site.name}` 作为 HTML `<title>` 后缀。因此：

- frontmatter `title` 必须既适合作为 H1，也能作为 SERP title 的主体；
- `site.name` 应尽量短，推荐 `NMRiH2 Wiki`，避免最终 `<title>` 过长；
- 不在正文再写 H1；正文从 H2 开始；
- H2 表达用户真实问题；H3 只作为 H2 的子问题。

### 3.3 Description

Description 的目标不是重复关键词，而是说明用户点击后能得到什么答案。建议：

```text
Primary keyword + direct value + 1-2 secondary concepts
```

保持 40–165 characters，遵守当前 Zod schema。

### 3.4 Quick Answer / summary

当前 schema 限制 `summary <= 200 characters`，因此本项目以 schema 为硬门槛，建议 20–30 个英文单词左右，首句直接回答 Primary Intent。

### 3.5 Heading 原则

```text
H1 = Primary Intent
  H2 = 用户大问题
    H3 = 平台 / 场景 / 子问题
  H2 = 用户第二个大问题
  H2 = Troubleshooting / FAQ
```

避免无搜索价值的泛标题：`Introduction`、`Overview`、`Conclusion`。

## 4. 首页 TDH

### Title

`No More Room in Hell 2 Wiki, Guides & Crossplay`

### Description

`No More Room in Hell 2 guides for crossplay, Xbox, PS5, solo mode, beginner tips, characters and the latest 1.0 updates.`

### H1

`No More Room in Hell 2 Wiki & Guides`

### Hero supporting copy

`Crossplay, platform availability, solo guides, beginner tips and updated information for No More Room in Hell 2.`

### Homepage H2 structure

```text
H2: Start Here

H2: No More Room in Hell 2 Crossplay
  H3: PC and PS5
  H3: PC and Xbox
  H3: PS5 and Xbox

H2: No More Room in Hell 2 Platforms
  H3: Xbox
  H3: PlayStation
  H3: Steam
  H3: Game Pass

H2: No More Room in Hell 2 Beginner Guides
  H3: Beginner Tips
  H3: Solo Mode
  H3: Characters and Responders

H2: Latest No More Room in Hell 2 Updates
```

首页不需要重复完整回答每个子意图；每块只给摘要并内链到对应 canonical page。

## 5. 首批 10 页 TDH

### 5.1 Crossplay

**URL:** `/guides/crossplay`

**Title / H1:** `No More Room in Hell 2 Crossplay: PC, PS5 & Xbox`

**Description:** `Learn how No More Room in Hell 2 crossplay works across PC, PS5 and Xbox, including platform compatibility, multiplayer setup and common issues.`

**Primary:** `no more room in hell 2 crossplay`

**Secondary:** `no room in hell 2 crossplay`, `is no more room in hell 2 cross platform`, `is no more room in hell 2 crossplay`

**Quick Answer:** 待素材验证后填写；必须直接回答 PC / PS5 / Xbox 是否互通。

**H2/H3:** 

```text
H2: Is No More Room in Hell 2 Crossplay?
H2: Which Platforms Support No More Room in Hell 2 Crossplay?
  H3: PC and PS5 Crossplay
  H3: PC and Xbox Crossplay
  H3: PS5 and Xbox Crossplay
H2: How Do You Enable Crossplay in No More Room in Hell 2?
H2: How Do You Play With Friends Across Platforms?
H2: Why Is No More Room in Hell 2 Crossplay Not Working?
H2: Does No More Room in Hell 2 Have Cross-Progression?
```

**Canonical rule:** 所有 Xbox / PS5 / Game Pass 页面提到 crossplay 时只给短答并内链本页。

---

### 5.2 Xbox

**URL:** `/platforms/xbox`

**Title / H1:** `No More Room in Hell 2 Xbox: Series X|S Guide`

**Description:** `Find out whether No More Room in Hell 2 is on Xbox, which consoles are supported, how crossplay works, and what to know before buying.`

**Primary:** `no more room in hell xbox`

**Secondary:** `is no more room in hell 2 on xbox`, `no more room in hell 2 console`

**H2/H3:** 

```text
H2: Is No More Room in Hell 2 Available on Xbox?
H2: Is No More Room in Hell 2 on Xbox One?
H2: Which Xbox Consoles Support No More Room in Hell 2?
H2: Does No More Room in Hell 2 Support Crossplay on Xbox?
H2: Is No More Room in Hell 2 on Xbox Game Pass?
H2: How Much Does No More Room in Hell 2 Cost on Xbox?
H2: Can Xbox Players Play With PS5 and PC Players?
```

`Game Pass` 和 `Crossplay` H2 只做短答，分别内链 `/platforms/game-pass`、`/guides/crossplay`。

---

### 5.3 PS5

**URL:** `/platforms/ps5`

**Title / H1:** `No More Room in Hell 2 PS5: PlayStation Guide`

**Description:** `Check No More Room in Hell 2 availability on PS5 and PS4, plus PlayStation crossplay support, multiplayer requirements and platform details.`

**Primary:** `no more room in hell 2 ps5`

**Secondary:** `no more room in hell 2 playstation`, `is no more room in hell 2 on ps5`, `no more room in hell 2 ps4`

**H2/H3:** 

```text
H2: Is No More Room in Hell 2 on PS5?
H2: Is No More Room in Hell 2 on PS4?
H2: Does No More Room in Hell 2 Support Crossplay on PS5?
H2: Can PS5 Players Play With Xbox and PC Players?
H2: Do You Need PlayStation Plus to Play Online?
H2: How Much Does No More Room in Hell 2 Cost on PS5?
```

---

### 5.4 Game Pass

**URL:** `/platforms/game-pass`

**Title / H1:** `No More Room in Hell 2 Game Pass: Current Status`

**Description:** `Check whether No More Room in Hell 2 is on Xbox Game Pass or PC Game Pass, plus the current purchase options and platform availability.`

**Primary:** `no more room in hell 2 game pass`

**Secondary:** `no more room in hell 2 gamepass`, `Xbox Game Pass`, `PC Game Pass`

**H2/H3:**

```text
H2: Is No More Room in Hell 2 on Game Pass?
H2: Is No More Room in Hell 2 on Xbox Game Pass?
H2: Is No More Room in Hell 2 on PC Game Pass?
H2: Do You Need Game Pass to Play No More Room in Hell 2 Online?
H2: Where Can You Buy No More Room in Hell 2?
H2: How Much Does No More Room in Hell 2 Cost?
```

页面必须在 `lastModified` 中维护状态更新时间；不得长期保留未经复核的订阅状态。

---

### 5.5 Solo Mode

**URL:** `/guides/solo-mode`

**Title / H1:** `No More Room in Hell 2 Solo Mode: How to Play Alone`

**Description:** `Learn how Solo Mode works in No More Room in Hell 2, what changes when playing alone, and the key survival tips for completing solo runs.`

**Primary:** `no more room in hell 2 solo`

**Secondary:** `no more room in hell 2 solo mode`, `play alone`

**H2/H3:**

```text
H2: Can You Play No More Room in Hell 2 Solo?
H2: How Do You Start Solo Mode?
H2: How Is Solo Mode Different From Co-op?
H2: Does Solo Mode Change Difficulty or Rewards?
H2: What Are the Best Tips for Playing Solo?
  H3: Resource Management
  H3: Weapon Choice
  H3: Infection and Healing
  H3: Extraction Planning
H2: Is Solo Mode Good for Beginners?
```

---

### 5.6 Beginner Tips

**URL:** `/guides/beginner-tips`

**Title / H1:** `No More Room in Hell 2 Beginner Tips & Guide`

**Description:** `Learn the essential No More Room in Hell 2 beginner tips for surviving your first runs, managing infection, choosing weapons and working with your team.`

**Primary:** `no more room in hell 2 tips`

**Secondary:** `beginner guide`, `tips and tricks`

**H2/H3:**

```text
H2: What Should Beginners Know Before Playing No More Room in Hell 2?
H2: How Does Death Work in No More Room in Hell 2?
H2: How Does Infection Work?
H2: Which Weapons Should Beginners Use?
H2: How Should You Manage Your Inventory?
H2: Should You Stay With Your Team?
H2: What Should You Do Before Extraction?
H2: Can Beginners Play Solo?
H2: What Mistakes Should New Players Avoid?
```

本页是 broad evergreen guide；具体 solo / weapon / progression 深度内容后续拆 canonical pages。

---

### 5.7 Steam / PC

**URL:** `/platforms/steam-pc`

**Title / H1:** `No More Room in Hell 2 Steam & PC Guide`

**Description:** `See No More Room in Hell 2 on Steam and PC, including price, system requirements, crossplay support, controller options and platform details.`

**Primary:** `no more room in hell 2 steam`

**Secondary:** `no more room in hell steam`, `no more room in hell 2 pc`

**H2/H3:**

```text
H2: Is No More Room in Hell 2 on Steam?
H2: How Much Does No More Room in Hell 2 Cost on Steam?
H2: What Are the PC System Requirements?
H2: Does the Steam Version Support Crossplay?
H2: Does No More Room in Hell 2 Support Controllers on PC?
H2: Can You Play No More Room in Hell 2 on Steam Deck?
```

Steam Deck 若无可靠验证素材，先删除该 H2，而不是猜测。

---

### 5.8 Review / Worth It

**URL:** `/guides/is-it-worth-it`

**Title / H1:** `No More Room in Hell 2 Review: Worth It in 2026?`

**Description:** `Is No More Room in Hell 2 worth buying after 1.0? Compare its co-op gameplay, solo mode, crossplay, player feedback, price and current issues.`

**Primary:** `no more room in hell 2 review`

**Secondary:** `no more room in hell 2 price`, `is no more room in hell 2 worth it`, `no more room in hell 2 free`

**H2/H3:**

```text
H2: Is No More Room in Hell 2 Worth It After 1.0?
H2: What Does No More Room in Hell 2 Do Well?
H2: What Are the Biggest Problems Right Now?
H2: Is No More Room in Hell 2 Better With Friends or Solo?
H2: How Much Does No More Room in Hell 2 Cost?
H2: Is No More Room in Hell 2 Free?
H2: Who Should Buy No More Room in Hell 2?
H2: Who Should Wait?
```

如果没有亲自试玩素材，页面定位必须是 `buyer's guide / current-state review`，不要伪装成第一手体验评测。

---

### 5.9 Characters / Responders

**URL:** `/gameplay/characters`

**Title / H1:** `No More Room in Hell 2 Characters & Responders`

**Description:** `Learn how characters and Responders work in No More Room in Hell 2, including progression, selection, loadouts and what changes between runs.`

**Primary:** `no more room in hell 2 characters`

**Secondary:** `responders`, `character progression`

**H2/H3:**

```text
H2: What Are Responders in No More Room in Hell 2?
H2: How Do You Choose a Character or Responder?
H2: Do Characters Have Different Stats or Abilities?
H2: How Does Responder Progression Work?
H2: What Happens to a Character When You Die?
H2: Can You Change a Responder's Loadout?
H2: Are More Characters Coming in Future Updates?
```

没有官方或游戏内素材确认的能力差异必须标注待验证，不能编造职业差异。

---

### 5.10 Armageddon / 1.0 Update

**URL:** `/updates/armageddon-1-0`

**Title / H1:** `No More Room in Hell 2 1.0 Update: Armageddon`

**Description:** `See what changed in the No More Room in Hell 2 1.0 Armageddon update, including new modes, maps, solo play, progression changes and launch features.`

**Primary:** `no more room in hell 2 update`

**Secondary:** `No More Room in Hell 2 1.0`, `Armageddon update`, `patch notes`

**H2/H3:**

```text
H2: What Is the No More Room in Hell 2 Armageddon Update?
H2: What New Modes Were Added in 1.0?
  H3: Survival Mode
  H3: Solo Mode
H2: What New Maps Were Added in 1.0?
H2: What Changed With Progression and Responders?
H2: What Changed With Crossplay and Console Support?
H2: What Bugs or Known Issues Remain After Launch?
H2: What Should Returning Early Access Players Know?
```

本页承担 update intent；后续每个重大 patch 单独建立 `/updates/<version>`，不要持续无限扩写同一篇。

## 6. Cannibalization 规则

### Crossplay

Canonical：`/guides/crossplay`

Xbox / PS5 / Steam 页面只允许：

- 一个相关 H2；
- 2–3 句直答；
- 内链到 Crossplay 主页面。

### Game Pass

Canonical：`/platforms/game-pass`

Xbox 页提到 Game Pass 时只做摘要。

### Solo

Canonical：`/guides/solo-mode`

Beginner Guide 中的 `Can Beginners Play Solo?` 只给摘要和内链。

### Review / Price

价格可以被平台页引用，但“值不值得买”只由 `/guides/is-it-worth-it` 主攻。

## 7. Frontmatter 示例

```yaml
---
title: "No More Room in Hell 2 Crossplay: PC, PS5 & Xbox"
description: "Learn how No More Room in Hell 2 crossplay works across PC, PS5 and Xbox, including platform compatibility, multiplayer setup and common issues."
category: "guides"
date: 2026-08-18
lastModified: 2026-08-18
gameVersion: "1.0"
summary: "<verified direct answer, <= 200 characters>"
tags: ["crossplay", "pc", "ps5", "xbox"]
---
```

正文从 H2 开始。

## 8. 实施步骤

1. `pnpm apply-template --dry-run`
2. `pnpm apply-template`
3. 仅保留 English locale
4. categories 改成 `guides / platforms / gameplay / updates`
5. 重写 `src/locales/en.json` 首页文案；不要保留 guides preset 中的 starter codes / first boss demo 文案
6. 删除 scaffold `getting-started.mdx`
7. 按本文件首批 10 页 TDH 创建 MDX
8. 每页事实先验证；未验证页面使用 `draft: true`
9. 执行：

```bash
pnpm check-config
pnpm typecheck
pnpm lint
pnpm test
pnpm check-content
pnpm build
pnpm check-links
```

10. Cloudflare Pages 上线并提交 GSC sitemap

## 9. 后续扩展触发条件

根据 GSC query 而不是 Wiki 惯性扩页：

- `crossplay not working` 有 impressions → troubleshooting 独立页
- `player count / steam charts / steamdb` 有持续 impressions → Player Count Phase 2
- `best weapons / tier list` 有 impressions → Weapon Tier List
- `maps / raven rock / survival map` 有 impressions → Maps cluster

原则：**Google Query 决定页面增长，而不是“Wiki 应该有什么”决定页面增长。**
