# No More Room in Hell 2 项目文档

> 本目录是基于 AnvilWiki 实例化 `No More Room in Hell 2` SEO 站点的项目级文档。AnvilWiki 通用框架规范仍以仓库根 `AGENTS.md`、`docs/PRD.md`、`docs/development.md` 为准；本目录只记录该游戏站点的产品决策与实施计划。

## 1. 项目目标

在 1.0 发布后的搜索窗口期，基于现有 AnvilWiki 快速上线英文站，优先覆盖已经通过 Google Trends 验证的搜索意图，而不是机械套用 codes / bosses / redeem 模板。

产品定位：

> **No More Room in Hell 2 Guides, Crossplay, Platforms & Gameplay Hub**

首期核心需求：

- Crossplay
- Xbox / PS5 / Steam
- Game Pass
- Solo Mode
- Beginner Tips
- Review / Price
- Characters / Responders
- 1.0 Updates

## 2. 文档地图

| 文档 | 用途 | 主要读者 |
|---|---|---|
| [PRD.md](./PRD.md) | 产品目标、范围、信息架构、首批页面、验收指标 | 产品 / SEO / 开发 |
| [IMPLEMENTATION.md](./IMPLEMENTATION.md) | 如何基于当前 AnvilWiki 代码落地，包括文件级改动、验证与部署 | 开发 / AI Agent |
| [CONTENT-PLAN.md](./CONTENT-PLAN.md) | 首批内容计划、素材要求、内链、更新节奏 | 内容 / SEO |
| [../nmrih2-mvp.md](../nmrih2-mvp.md) | 首批页面 TDH、关键词归属、H1/H2/H3 与 cannibalization 规则 | SEO / 内容 |

## 3. 项目状态

当前阶段：**Planning / Documentation**。

已完成：

- 游戏选品验证
- Trends 需求验证
- 竞争格局判断
- 首批 10 页规划
- TDH / Heading 设计
- 项目级 PRD 与实现方案

尚未执行：

- `pnpm apply-template`
- NMRiH2 配置实例化
- 首页重写
- 首批 MDX 内容生产
- Crossplay Checker
- Player Count 动态能力
- Cloudflare 正式域名部署
- Search Console 提交

## 4. 核心决策

### D1. 不做传统大而全 Wiki

首期用 Search Intent 驱动页面，而不是按百科分类一次性铺满 Weapons / Maps / Items。

### D2. 不做 Codes / Redeem FAQ / Boss 三件套

目前没有可靠证据证明游戏存在兑换码体系，Boss 也不是当前已验证的核心搜索需求。禁止为了套模板生成伪需求页面。

### D3. 首期只做 English

默认语言英文无 `/en` 前缀，优先保证 Worldwide 搜索窗口的上线速度；第二语言由后续 GSC 国家和 Query 数据决定。

### D4. 保持 Astro Static + Cloudflare Pages

首期不引入数据库、SSR 或应用服务器。动态 Player Count 作为独立 Phase 2 能力，不阻塞内容站上线。

### D5. Code / Config / Content 三层分离

- Code：尽量不改
- Config：实例化时修改一次
- Content：持续更新

只有可复用的产品能力（例如通用 Compatibility Checker）才进入 Code Layer。

## 5. 推荐阅读顺序

```text
1. PRD.md
2. ../nmrih2-mvp.md        # TDH / SEO
3. CONTENT-PLAN.md
4. IMPLEMENTATION.md
5. ../../development.md    # 只有真正改 Code Layer 时再读
```

## 6. Definition of Done

MVP 完成必须同时满足：

- NMRiH2 配置替换完整，无 Anvil Quest demo 残留
- 首批 10 个真实内容页可索引
- 每页 Primary Keyword 唯一
- Title / Description / H1 / H2 通过专项 TDH 规范
- `pnpm check-config` / `typecheck` / `lint` / `test` / `check-content` / `build` / `check-links` 全绿
- canonical / sitemap / robots / JSON-LD 正确
- Cloudflare Pages 正式环境可访问
- Google Search Console 已添加站点并提交 sitemap
