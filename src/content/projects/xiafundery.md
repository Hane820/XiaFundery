---
name: "XiaFundery · 匣方艺创官网"
slug: "xiafundery"
type: "software"
status: "released"
featured: true
summary: "独立工作室「匣方艺创 / Xia Fundery」的官方静态站点，展示软件、游戏、AI 应用与研究内容。"
image: "/img/covers/xiafundery.jpg"
tech: ["Astro", "TypeScript", "Tailwind CSS v4", "GSAP"]
startDate: "2026-10-19"
publishDate: "2026-10-19"
updatedDate: "2026-10-19"
members: ["Lumina"]
relatedProjects: []
relatedResearch: []
intro: "本项目（XiaFundery）本身即工作室的官网：基于 Astro 7 + Tailwind v4 + GSAP 构建，内容由 Content Collections 统一管理，并提供构建期 GitHub 贡献统计。"
links:
  github: "https://github.com/Yunease/XiaFundery"
---

## 项目定位

XiaFundery 是独立工作室「**匣方艺创 / Xia Fundery**」的官方静态站点，用于集中展示工作室的软件与开源工具、游戏与交互体验、AI 应用以及学术研究内容。你正在浏览的站点正是它。

## 技术架构

- **框架**：Astro 7（SSG）+ TypeScript + **Tailwind CSS v4**；
- **动效**：GSAP（时间线与滚动揭示）+ **Astro 原生 View Transitions**（`<ClientRouter />`）负责页面转场；
- **图标**：lucide 图标；
- **内容管理**：项目与研究成果均为 Astro Content Collections 下的纯 Markdown（`src/content/`），成员集中在 `src/config/members.ts`；
- **贡献统计**：`scripts/fetch-contributions.mjs` 在构建期抓取各项目的 GitHub 提交记录，生成 `contributions.json`，项目详情页据此渲染成员贡献柱状图。

## 页面与路由

首页（Hero / 理念 / 精选项目 / 研究预览 / 团队预览）、关于、项目列表与详情、研究列表与详情、团队列表与详情、统一 404。

## 视觉系统

设计 Token 集中在 `src/styles/global.css` 的 `@theme` 中：深海军蓝（`ink`）、暖白（`paper`）、琥珀强调色（`accent`）、中性灰（`mist`）；字体为 Space Grotesk（英文展示 / 标题）、JetBrains Mono（标签 / 元信息 / 代码）与系统 CJK 字体（中文正文）。页面采用「暖白底 + 深蓝强调」的编辑式排版，首页首屏为深色 Hero。

## 动效原则

采用 Astro 原生 View Transitions 而非 Swup，配合 GSAP 负责入场时间线与滚动揭示，并在每次页面加载时创建 / 清理动画上下文以避免泄漏；尊重 `prefers-reduced-motion`，无 JS 时内容始终可见。

## 构建与部署

产物为纯静态 `dist/`，可部署到 Cloudflare Pages / Netlify / Vercel 等任意静态托管；`SITE_URL` 环境变量用于覆盖占位域名。
