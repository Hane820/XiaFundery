# 研究成果字段参考 · `src/content/research/<slug>.md`

每个研究成果（论文 / 报告 / 预印本 / 研究项目 / 实验记录）一个 Markdown 文件。

> **基本原则**：没有真实发表信息时，**不要**标记为已发表。`status` 使用 `preprint` / `in-progress` / `internal` / `archived`。BibTeX 由 `src/lib/cite.ts` 根据 frontmatter **自动生成**，不会凭空构造，请确保字段真实。

## 完整示例

```md
---
title: "Procedural Narrative Graphs: A Lightweight Model for Branching Stories"
slug: procedural-narrative-graphs
type: preprint
status: preprint
featured: true
demo: false
year: 2025
date: 2025-08-05
venue: 预印本（示例）
authors: [su-he, tang-qi]
keywords: [narrative design, branching stories]
summary: A preprint describing a lightweight narrative graph model.
doi: 10.1000/example
citation: "Su He, Tang Qi. Procedural Narrative Graphs. Preprint, 2025."
bibtexType: inproceedings
links:
  pdf: https://example.com/paper.pdf
  code: https://example.com/repo
relatedProjects: [above-the-deep]
relatedResearch: [interactive-fiction-blocks]
---

## Abstract
正文从这里开始。
```

## 必填字段

| 字段 | 类型 | 说明 | 示例 |
| --- | --- | --- | --- |
| `title` | 字符串 | 标题。含英文冒号 + 空格时**必须加引号** | `"Field Notes: Building Blocks"` |
| `slug` | 字符串 | 详情页 URL：`/research/<slug>`，与文件名一致 | `procedural-narrative-graphs` |
| `type` | 枚举 | 成果类型，见下表 | `report` |
| `status` | 枚举 | 成果状态，见下表 | `preprint` |
| `summary` | 字符串 | 摘要 / 简介 | `一份技术报告，讨论……` |

### `type` 允许值

| 值 | 中文显示 | 适用场景 |
| --- | --- | --- |
| `paper` | 学术论文 | 完整论文 |
| `report` | 技术报告 | 内部或对外技术报告 |
| `preprint` | 预印本 | 尚未正式发表、先公开的版本 |
| `project` | 研究项目 | 进行中的研究项目 |
| `experiment` | 实验记录 | 实验 / 笔记类 |

### `status` 允许值

| 值 | 中文显示 | 何时使用 |
| --- | --- | --- |
| `published` | 已发表 | **仅当确有正式发表**（期刊 / 会议 / 收录） |
| `preprint` | 预印本 | 已公开但未正式发表 |
| `in-progress` | 研究中 | 正在研究 / 编写中 |
| `internal` | 内部记录 | 内部笔记 / 归档资料 |
| `archived` | 已归档 | 已结束并归档 |

> 示例数据一律不要用 `published`。发布真实成果后再改为 `published`，同时补上 `doi` / `venue` / 发表链接。

## 可选字段

| 字段 | 类型 | 默认 | 说明 | 示例 |
| --- | --- | --- | --- | --- |
| `featured` | 布尔 | `false` | 首页是否展示 | `true` |
| `demo` | 布尔 | `false` | 示例数据标记（显示「示例内容」标签） | `true` |
| `year` | 数字 | — | 发表 / 产出年份 | `2025` |
| `date` | 日期 | — | 具体日期，格式 `YYYY-MM-DD` | `2025-08-05` |
| `venue` | 字符串 | — | 发表载体 / 期刊 / 会议 | `Journal of X` |
| `authors` | 数组 | `[]` | 作者成员 slug（见成员配置） | `[su-he, tang-qi]` |
| `keywords` | 数组 | `[]` | 关键词，列表页显示为 `#标签` | `[narrative design, 提示词工程]` |
| `doi` | 字符串 | — | DOI 标识（BibTeX 会引用） | `10.1000/example` |
| `citation` | 字符串 | — | 人类可读引用，显示在详情页。含英文冒号时加引号 | `"Su He, Tang Qi. Preprint, 2025."` |
| `bibtexType` | 枚举 | `misc` | BibTeX 条目类型，见下表 | `inproceedings` |
| `links` | 对象 | `{}` | 外部资源链接 | — |
| `relatedProjects` | 数组 | `[]` | 相关项目 slug | `[above-the-deep]` |
| `relatedResearch` | 数组 | `[]` | 相关成果 slug | `[interactive-fiction-blocks]` |

### `bibtexType` 允许值

| 值 | BibTeX 含义 |
| --- | --- |
| `article` | 期刊文章 |
| `inproceedings` | 会议论文 |
| `techreport` | 技术报告 |
| `phdthesis` | 学位论文 |
| `misc` | 其他（默认） |

### `links` 可用键（均为可选，填了才显示）

| 键 | 显示 | 说明 |
| --- | --- | --- |
| `pdf` | PDF | 论文 / 报告下载 |
| `doi` | DOI | DOI 页面地址 |
| `code` | 代码 | 代码仓库 / 数据集 |
| `site` | 项目主页 | 相关页面 |
| `github` | — | 预留（项目链接用，研究页不展示） |
| `demo` / `download` / `release` / `website` / `blog` | — | 预留 |

## 正文写作

- 建议用 `## Abstract`、`## 方法`、`## 结果`、`## 局限` 组织长文；
- 长篇正文会显示**阅读进度条**，侧栏展示引用与 BibTeX；
- 代码块、表格、引用（`>`）等 Markdown 语法均支持；
- 未发表内容在正文中标注状态（如 `> 本文为内部记录，未经同行评审。`），避免误导读者。

## 新增步骤（checklist）

1. 新建 `src/content/research/<slug>.md`；
2. 填写全部**必填**字段；
3. 未发表条目 `status` 用 `preprint` / `in-progress` / `internal`，不要用 `published`；
4. `authors` 的 slug 与 `src/config/members.ts` 一致；
5. `npm run check` 校验字段，`npm run dev` 预览。
