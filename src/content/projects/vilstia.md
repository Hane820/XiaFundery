---
name: Vilstia · 樟庭徊路
slug: vilstia
type: software
status: released
featured: true
demo: false
summary: 一个持续维护的个人技术与创作网站，承载独立开发记录、技术文章与长篇内容，并探索静态站点性能优化、搜索引擎优化与内容发现。
intro: 从个人博客出发，逐步构建兼顾阅读体验、内容沉淀与长期维护的独立站点。通过 Astro 与现代 Web 工具链，在性能、可维护性和内容规模之间寻找平衡。
image: /img/covers/vilstia.jpg
tech: [Astro, TypeScript, Svelte, Tailwind CSS, Swup, Pagefind, Vercel]
startDate: 2023-09-01
publishDate: 2026-10-19
members:
  - Lumina
links:
  demo: https://vilstia.org
  github: https://github.com/Yunease/vilstia
relatedProjects: []
relatedResearch: []
---

## 项目定位

Vilstia（站点名「樟庭徊路」）是琴泠（Lumina）的个人博客与数字花园，也是工作室在「内容型站点架构」上的长期试验田。它既是个人向的创作仓库——存放梦境、碎碎念、诗歌、摄影与绘画；也是技术向的工程对象——一个不断被重构、打磨的 Astro 站点。

项目 fork 自 Fuwari 模板，在此之上做了大量二次开发：从内容模型到页面拆解、从 Markdown 排版管线到构建期数据管道，逐步长成一套「博客 + 碎碎念 + 创作集 + 工程实验」的复合系统。

## 页面架构

站点按内容气质拆成多个既有联系又独立的板块：

- **首页 / 归档**：分页文章流，支持「全部 / 精选」切换（`精选` 标签的文章单独成流），侧栏有年度创作热力图。
- **文章详情**：字数、阅读时间、浏览量、上一篇/下一篇导航；支持「合集」字段，为连载内容提供合集内前后跳转与全览列表。
- **叙梦协定 `/dream`**：梦境记录。
- **心灵碎片 `/rant`**：短吐槽与情绪碎片，按月份聚合，配有情绪统计与情绪折线图。
- **回廊画架 `/gallery`** 与 **截光求影 `/photo`**：绘画与摄影作品集，仿 Pixiv 的相册布局。
- **择摘拾玑 `/anthology`**：语录摘选；**层岩叠纪 `/chronicle`**：编年史时间线；**AI 小世界 `/ai-world`**：基于流式大模型的 OC 角色对话。
- **年度记录 `/memory`**：年度报告页；**创作热力图 `/heatmap`** 与 **访问排名 `/rank`**：基于内容与 Umami 统计的可视化。
- **访讯留志 `/message-board`**：Twikoo 评论区；**友链**与两级 **关于**页。

这些「第二层」板块统一收纳在导航的**剪影（Silhouette）**下拉菜单中，与首页主信息流形成分层。

## 技术架构

核心栈：**Astro 5（SSG）+ Tailwind CSS 3 + Svelte 5**。Svelte 仅用于真正需要交互的部分（搜索、主题/色相、小猫、热力图等岛屿组件），其余全部静态渲染。

- **页面过渡**：Swup（`@swup/astro`）驱动主体内容软切换并平滑滚动；
- **站内搜索**：Pagefind，构建期生成索引，`pagefind.yml` 排除公式与忽略区域；
- **代码块**：Expressive Code + 自研插件（语言徽标、自定义复制按钮、可折叠区块、行号），并映射 `gds→gdscript`、`renpy→python` 等语言别名；
- **数学公式**：remark-math + rehype-katex；**图片灯箱**：PhotoSwipe；
- **UI 细节**：OverlayScrollbars 自定义滚动条、astro-icon（fa6 按需打包 + 本地 SVG 图标）、JetBrains Mono 与 Roboto 字体；
- **样式**：Tailwind（`dark` class 模式）+ Stylus 变量体系，主题色为 oklch 色域并支持 0–360° 色相调节，主题与色相持久化在 localStorage。

## 内容系统

内容由三个 Astro Content Collection 承载：**posts**（文章 / 动态 / 梦境 / 图集）、**spec**（关于页与人物卡）、**chronicle**（编年史事件）。

文章 frontmatter 的核心字段包括：`title`、`published`、`updated`、`draft`、`description`、`image`、`tags`、`category`、`collection`（合集）、`album`（图集）、`lang`、`mood` / `mood_level`（心情与强度）。

有趣的设计是**用标签驱动板块**：`mess` → 心灵碎片、`dream` → 梦境、`gallery` → 画架、`photo` → 摄影、`anth` → 选集、`精选` → 首页精选流、`star` → 置顶。这些特殊标签的文章被排除在主归档之外，避免污染常规文章流。

心情系统只服务于碎碎念板块：六种情绪各有十六进制颜色（焦躁、消沉、怨恨、开心、平和、振奋），配合 1–5 级强度，最终聚合出每月情绪折线图。

## Markdown 排版管线

正文经自定义的 remark / rehype 管线处理：

- **读书时间与摘要**：`remark-reading-time` / `remark-excerpt` 注入字数、阅读时长与摘要；
- **标题结构**：`rehype-shift-headings` 整体降级一级标题，保证文章内 `h1` 即页面标题；
- **提示框与卡片**：GitHub Admonition 语法转 `note/tip/important/caution/warning` 提示框；`:github{repo=...}` 指令渲染为实时拉取仓库信息的卡片；
- **目录锚点**：rehype-slug + autolink-headings；文章侧栏 TOC 仅对 `/posts/` 启用。

## 构建与数据管线

`pnpm build` 是一条完整的流水线：

1. **fetch-rank**：登录 Umami，拉取近 90 天各文章访问量，写入 `public/rank-data.json`；
2. **fetch-stats**：拉取全站 PV/UV 等统计，写入 `public/umami-stats.json`；
3. **generate-og**：用 Satori + Resvg 在无头生成默认分享图 `og-default.png`；
4. **astro build**：静态生成；
5. **pagefind**：构建搜索索引。

另有 `pnpm new-post` 脚手架快速创建新文章，`pnpm gen-og` 单独刷新分享图，`pnpm check` / `type-check` / `lint` 做质量门禁。CI 在 GitHub Actions 上并行跑 `astro check` 与 `astro build`（Node 22/23）。

## SEO 与性能

- **站点地图**：Astro sitemap，且通过构建期扫描文章 frontmatter，用 `updated || published` 生成每个中文 slug 的 `lastmod`；
- **结构化数据**：全站 `WebSite` / `Person`（`Person` 锚定到中文「关于我」页），文章页输出 `BlogPosting`，均内联作者与字数、阅读时间；
- **内容版权信号**：`robots.txt` 声明 `Content-Signal: search=yes, ai-train=no, use=reference`，并显式屏蔽 GPTBot、ClaudeBot、Google-Extended 等爬虫；
- **资源与缓存**：`vercel.json` 对 `/_astro/*` 设置 immutable 长缓存；封面图预置宽高避免 CLS；OG 图、RSS（sanitize 后的全文订阅）一应俱全。

## 源码与工程文档

项目源码位于 [github.com/Yunease/vilstia](https://github.com/Yunease/vilstia)，`docs/` 目录下沉淀了若干工程笔记（合集功能设计、CSS 隐式加载机制的排错、构建期数据层性能分析等），站点部署于 Cloudflare，访问 vilstia.org 可体验完整实现。