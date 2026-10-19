# 项目字段参考 · `src/content/projects/<slug>.md`

每个项目一个 Markdown 文件。以下为 frontmatter 的全部字段。

## 完整示例

```md
---
name: 匣形 Casket Kit
slug: casket-kit
type: software
status: released
featured: true
demo: false
summary: 一句话简介，会显示在卡片上
intro: 详情页顶部导语，可选
image: /img/covers/casket-kit.svg
tech: [TypeScript, Web Components]
startDate: 2025-02-10
publishDate: 2025-08-30
updatedDate: 2025-09-02
members: [qi-an, su-he]
links:
  github: https://github.com/org/repo
  demo: https://example.com/demo
relatedProjects: [lantern-docs]
relatedResearch: [indie-studio-infra-report]
---

## 设计思路
正文从这里开始，`##` 标题会被渲染为章节区块。
```

## 必填字段

| 字段 | 类型 | 说明 | 示例 |
| --- | --- | --- | --- |
| `name` | 字符串 | 项目名称（可含中英文） | `匣形 Casket Kit` |
| `slug` | 字符串 | 详情页 URL：`/projects/<slug>`，与文件名一致，全小写连字符 | `casket-kit` |
| `type` | 枚举 | 项目分类，见下表 | `software` |
| `status` | 枚举 | 项目状态，见下表 | `released` |
| `summary` | 字符串 | 列表卡片上的一句话简介 | `一套跨项目复用的组件与设计系统。` |
| `image` | 字符串 | 代表图片路径，相对站点根目录（列表卡片与详情页共用） | `/img/covers/casket-kit.svg` |

### `type` 允许值

| 值 | 中文显示 | 说明 |
| --- | --- | --- |
| `software` | 软件开发 | 工程 / 工具类 |
| `game` | 游戏开发 | 游戏与交互体验 |
| `ai` | AI 应用 | 模型应用类 |
| `opensource` | 开源工具 | 开源项目 |
| `experiment` | 实验创作 | 实验性 / 装置类 |

### `status` 允许值

| 值 | 中文显示 | 说明 |
| --- | --- | --- |
| `released` | 已发布 | 已对外发布 |
| `ongoing` | 进行中 | 正在开发 |
| `archived` | 已归档 | 已停止维护 |
| `planning` | 规划中 | 概念 / 原型阶段 |

## 可选字段

| 字段 | 类型 | 默认 | 说明 | 示例 |
| --- | --- | --- | --- | --- |
| `featured` | 布尔 | `false` | 是否显示在首页「精选项目」 | `true` |
| `demo` | 布尔 | `false` | 是否为示例数据；为 `true` 时页面显示「示例内容」标签 | `true` |
| `intro` | 字符串 | — | 详情页标题下的导语 | `为工作室自用而生的轻量组件库。` |
| `tech` | 数组 | `[]` | 技术栈标签，会显示在卡片与详情页 | `[TypeScript, Godot]` |
| `startDate` | 日期 | — | 开始时间，格式 `YYYY-MM-DD` | `2025-02-10` |
| `publishDate` | 日期 | — | 发布时间 | `2025-08-30` |
| `updatedDate` | 日期 | — | 最近更新 | `2025-09-02` |
| `members` | 数组 | `[]` | 参与成员的 slug（见成员配置），成员页会自动列出该项目 | `[qi-an, su-he]` |
| `links` | 对象 | `{}` | 外部链接，见下表 | — |
| `relatedProjects` | 数组 | `[]` | 相关项目的 slug，详情页底部展示 | `[lantern-docs]` |
| `relatedResearch` | 数组 | `[]` | 相关研究成果的 slug | `[indie-studio-infra-report]` |

### `links` 可用键（均为可选，填了才显示）

| 键 | 显示 | 说明 |
| --- | --- | --- |
| `github` | 源码仓库 | 代码仓库地址 |
| `demo` | 在线演示 | 可体验的演示 |
| `site` | 项目主页 | 官网 / 文档站 |
| `download` | 下载 | 安装包 / 下载链接 |
| `release` | 发布页 | 发布公告页 |
| `pdf` | PDF | 文档 PDF |
| `doi` | DOI | DOI 地址 |
| `code` | 代码 | 数据集 / 代码 |
| `website` | — | 预留（成员链接用，项目页不展示） |
| `blog` | — | 预留（成员链接用，项目页不展示） |

> 链接值必须是完整 URL（含 `https://`）。例如 `github: https://github.com/xia-fundery/casket-kit`。

## 正文写作

- 正文为 Markdown，`##` 与 `###` 会形成章节层级；
- 支持列表、代码块（```）、表格、引用、图片等常规语法；
- 建议用章节组织：`## 设计思路`、`## 技术架构`、`## 开发过程`、`## 成果` 等；
- 详情页侧栏的「类型 / 状态 / 日期 / 技术栈 / 成员 / 链接」全部由 frontmatter 自动生成，正文里**不需要**重复写这些信息。

## 新增步骤（checklist）

1. 复制现有项目文件，或新建 `<slug>.md`；
2. 填写全部**必填**字段，按需填写可选字段；
3. `image` 指向 `public/img/covers/` 下实际存在的文件（其它截图、演示图放进正文，用 Markdown 图片语法引用）；
4. `members` 的 slug 需与 `src/config/members.ts` 一致；
5. 运行 `npm run check` 确认字段合法，`npm run dev` 预览。
