# 匣方艺创 · Xia Fundery 官方网站

面向独立工作室「匣方艺创 / Xia Fundery」的静态官网：软件与开源工具、游戏与交互体验、AI 应用、学术研究内容的展示站点。

技术栈：Astro 7（SSG）+ TypeScript + Tailwind CSS v4 + GSAP（时间线与滚动动效）+ lucide 图标 + Astro View Transitions（页面过渡）。内容由 Astro Content Collections 统一管理。

> **状态说明**：当前站点为**演示构建**。项目、成员与研究条目均为虚构的示例数据，且明确标注；发布前请替换为真实内容（见下文）。

---

## 快速开始

```bash
npm install
npm run dev        # 开发服务器 http://localhost:4321
```

生产构建与预览：

```bash
npm run build      # 输出到 dist/
npm run preview    # 本地预览构建产物
```

质量检查：

```bash
npm run check          # Astro + TypeScript 类型检查（内容 schema 校验）
npm run check:links    # 扫描 dist 中的内部链接与本地资源
npm run gen:assets     # 重新生成品牌 SVG 资源（封面 / 头像 / Logo / OG 图）
npm run fetch:contributions   # 抓取 GitHub 提交记录，生成项目贡献统计缓存
```

## 部署

产物为纯静态文件（`dist/`），可直接部署到 Cloudflare Pages、Netlify、Vercel 或任意静态托管。

- **构建命令**：`npm run build`
- **输出目录**：`dist`

发布前设置真实域名，覆盖配置中的占位域名：

```bash
# Windows PowerShell
$env:SITE_URL = "https://你的真实域名"; npm run build
```

未设置 `SITE_URL` 时使用占位域名 `https://xia-fundery.example.com`，sitemap、canonical 与 Open Graph 地址都会随之更新。部署后在管理后台把 `robots.txt` 与站点地图对应的域名一并确认。

## 页面与路由

| 路由 | 说明 |
| --- | --- |
| `/` | 首页：Hero、理念、精选项目、研究预览、团队预览 |
| `/about` | 工作室定位、创作方向、技术原则、协作与开源 |
| `/projects` | 项目列表（按类型 / 状态筛选） |
| `/projects/[slug]` | 项目详情：简介、正文、元信息、成员、相关研究与项目 |
| `/research` | 研究列表（论文 / 报告 / 预印本 / 研究项目，按类型 / 状态筛选） |
| `/research/[slug]` | 研究成果详情：摘要、正文、引用、BibTeX 复制 |
| `/team` | 成员列表 |
| `/team/[slug]` | 成员详情：介绍、技能、参与项目与研究 |
| `/404` | 统一的 404 页面 |

## 目录结构

```text
src/
├── content.config.ts        # 内容集合定义与 Zod schema（projects / research）
├── content/                 # 内容文件（Markdown）
│   ├── projects/            #   项目（slug.md）
│   └── research/            #   研究成果（slug.md）
├── config/
│   └── members.ts           # 成员配置（新增合作者在此添加，附类型注释）
├── components/              # 布局、首页、项目 / 研究 / 团队、UI 组件
├── layouts/                 # BaseLayout（含 SEO、Header、Footer、阅读进度）
├── lib/                     # site 配置、内容查询辅助、BibTeX 生成
├── pages/                   # 路由页面
├── scripts/                 # 前端交互与动效（app.ts / motion.ts）
├── styles/global.css        # 设计 Token（Tailwind v4 @theme）与全局样式
public/
├── img/
│   ├── covers/              # 项目封面
│   └── avatars/             # 成员头像
├── brand/                   # Logo 与 OG 分享图
└── favicon.svg
scripts/                     # 资源生成与链接检查工具
```

## 内容管理

**完整字段参考见 [`docs/`](docs/README.md)（新增内容前请先阅读）。**

**项目与研究**：新增内容时**只需添加 Markdown 文件**，无需改动任何页面模板。
**成员**：直接编辑 `src/config/members.ts`，在 `MEMBERS` 数组里追加一项即可。
**GitHub 贡献统计**：见 [`docs/contributions.md`](docs/contributions.md) —— 项目详情页的成员贡献柱状图由构建期抓取的 GitHub 提交记录自动生成。

### 新增成员（编辑 `src/config/members.ts`）

```ts
{
  name: '某某',
  slug: 'someone',             // 详情页 URL：/team/someone
  role: '工程师 · 方向',
  focus: '主要技术方向',
  bio: '卡片上的一句话简介',
  about: '详情页介绍（可选）',   // 用空行分段
  avatar: '/img/avatars/someone.svg',
  skills: ['TypeScript'],
  order: 7,                    // 列表排序，越小越靠前
  joinedDate: '2025-11-01',    // 可选
  demo: true,                  // 示例标记，发布真实内容后请改为 false
  links: { website: '', github: '' }, // 可选
}
```

项目与研究成果中通过 `members` / `authors` 字段填写成员的 **slug** 字符串引用（例如 `members: [qi-an, su-he]`），成员页会自动反向聚合参与的项目与研究。

### 新增项目 `src/content/projects/<slug>.md`

```md
---
name: 项目名称
slug: my-project            # 详情页 URL 后缀
type: software              # software | game | ai | opensource | experiment
status: ongoing             # released | ongoing | archived | planning
featured: false
demo: true                  # 示例内容标记（上线前请改为 false）
summary: 一句话简介
intro: 详情页顶部导语
image: /img/covers/my-project.svg
tech: [TypeScript, Godot]
publishDate: 2025-08-30
members: [qi-an, su-he]     # 引用成员 slug
links:
  github: https://example.com/...
  demo: https://example.com/...
relatedProjects: []         # 引用其它项目 slug
relatedResearch: []         # 引用研究成果 slug
---

## 设计思路
正文使用 Markdown，标题即区块。
```

### 新增研究成果 `src/content/research/<slug>.md`

字段：`title`、`slug`、`type`（`paper | report | preprint | project | experiment`）、`status`（`published | preprint | in-progress | internal | archived`）、`authors`（成员 slug 数组）、`year`、`date`、`venue`、`keywords`、`summary`、`citation`、`bibtexType`、`links.pdf / code / doi / site`、`relatedProjects`、`relatedResearch`。

> **重要**：BibTeX 由 `src/lib/cite.ts` 根据条目数据（标题 / 作者 / 年份 / 载体 / DOI / 状态）自动生成，不会虚构信息。未发表的条目请保持 `status` 为 `preprint / in-progress / internal`，不要标记为 `published`。所有示例数据均为虚构，上线前请删除或替换。

### 封面与头像

图片统一放在 `public/img/` 下：封面在 `public/img/covers/`、头像在 `public/img/avatars/`。可运行 `npm run gen:assets` 重新生成一套几何风格占位资源；替换为真实图片时直接覆盖同名文件或更新 frontmatter / 配置里的路径即可。

## 视觉系统

设计 Token 集中在 `src/styles/global.css` 的 `@theme` 中：

- **色板**：深海军蓝（`ink`）、暖白（`paper`）、琥珀强调色（`accent`）、中性灰（`mist`）。
- **字体**：`Space Grotesk`（英文展示 / 标题）、`JetBrains Mono`（标签 / 元信息 / 代码）、系统 CJK 字体（中文正文）。
- **间距 / 圆角 / 动效曲线**：沿用 Tailwind 默认比例，缓动使用 `--ease-expo` 等自定义曲线。

页面采用「暖白底 + 深蓝强调」的编辑式排版；首页首屏为深色 Hero，作为局部视觉强调。

## 动效与页面过渡

采用 **Astro 原生 View Transitions**（`<ClientRouter />`）负责页面转场，配合 GSAP 负责入场时间线与滚动揭示。**没有使用 Swup**：

- Swup 与 Astro 的页面生命周期（软导航、组件重挂载、客户端脚本）存在职责重叠，Astro 原生 View Transitions 与静态生成配合更稳定、无额外依赖；
- 若未来需要 Swup 的扩展（如持久化元素动画），可在保留 `<ClientRouter />` 之外单独引入，但需避免双方同时接管导航。

动效架构（`src/scripts/`）：

- `app.ts`：注册一次性的全局事件委托（菜单、筛选、复制 BibTeX、返回顶部、阅读进度），并在每次 `astro:page-load` 时重置状态并初始化当前页交互；
- `motion.ts`：使用 `gsap.context` 在每次页面加载时创建并**清理**动画上下文，避免事件 / 动画实例在软导航后泄漏或重复触发；
- 尊重 `prefers-reduced-motion`：动画直接跳过，内容始终可见；
- 无 JavaScript 或动画不可用时，内容不会被遮挡（`.js` 与 `[data-reveal]` 的可见性由 CSS 兜底）。

## 配置项

- **站点信息 / 外链**：`src/lib/site.ts`。`email`、`github` 等当前为空占位，提供后页脚自动显示对应链接，未提供则显示「联系方式待补充」。
- **域名**：`astro.config.mjs` 读取 `SITE_URL`，缺省为占位域名。
- **品牌资源**：`public/favicon.svg`、`public/brand/logo-mark.svg`、`public/brand/og.svg`，可替换为工作室正式素材。

## 待工作室提供

上线前需要工作室提供以下真实素材与配置：

1. 正式域名（`SITE_URL`）与邮箱 / GitHub 等联系方式。
2. 真实 Logo 与品牌分享图（替换 `public/brand/` 与 favicon）。
3. 真实项目、研究成果内容（替换 `src/content/` 下的示例数据）与成员信息（编辑 `src/config/members.ts`），并将 `demo` 字段改为 `false`。
4. 项目封面与成员头像的真实图片（放在 `public/img/covers/` 与 `public/img/avatars/`）。
