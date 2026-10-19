# 内容编写指南 · Content Authoring Guide

本站的**项目**与**研究**都是纯 Markdown 文件，**成员**是配置文件。日常更新只改下面三个地方，**不需要改动任何代码或模板**：

| 内容类型 | 位置 | 如何新增 |
| --- | --- | --- |
| 项目 | `src/content/projects/<slug>.md` | 新增一个 Markdown 文件 |
| 研究成果 | `src/content/research/<slug>.md` | 新增一个 Markdown 文件 |
| 成员 | `src/config/members.ts` | 在 `MEMBERS` 数组里追加一项 |

## 快速开始

以「新增一个项目」为例：

1. 复制 `src/content/projects/` 下任意一个文件为 `src/content/projects/my-project.md`；
2. 修改 frontmatter（见 [项目字段参考](projects.md)）；
3. 正文用 Markdown 写详细内容，`##` 标题会被渲染为章节；
4. 封面图放到 `public/img/covers/`，头像放 `public/img/avatars/`；
5. 运行 `npm run dev` 预览，或 `npm run check` 检查字段合法性。

## 文件命名规则

- 文件名即建议的 `slug`，全小写、用连字符分隔单词：`my-project.md`、`procedural-narrative-graphs.md`。
- `slug` 字段与文件名保持一致，它是页面 URL 的一部分，发布后不要随意修改（会改变链接）。

## 字段合法性由 schema 保证

`src/content.config.ts` 用 Zod 定义了每个字段的类型、必填与否和允许值。写错类型、枚举值或漏掉必填字段时：

```bash
npm run check   # 会列出具体哪个文件的哪个字段有问题
```

> 系统检查的是「字段」，正文 Markdown 没有严格校验，请自行注意格式。

## YAML 语法注意事项（最容易踩的坑）

frontmatter 是 YAML，位于文件顶部两个 `---` 之间：

```md
---
name: 项目名称
status: ongoing
---
正文从这里开始
```

1. **值里出现「英文冒号 + 空格」必须加引号**，否则会被解析成嵌套结构报错：
   ```yaml
   title: "Field Notes: Building Blocks for Interactive Fiction"
   citation: "Su He, Tang Qi. Report: Notes, 2025."
   ```
2. **中文字符不需要引号**，直接写即可（中文冒号 `：` 不算问题）。
3. **数组**两种写法等价：
   ```yaml
   tech: [TypeScript, Godot]
   # 或
   tech:
     - TypeScript
     - Godot
   ```
4. **布尔值**：`true` / `false`（不要加引号，否则变成字符串）。
5. **日期**统一格式 `YYYY-MM-DD`，例如 `2025-08-30`。
6. **URL 必须以协议开头**：`https://...`（缺协议会校验失败）。

## 常见问题

| 问题 | 原因 | 解决 |
| --- | --- | --- |
| `npm run check` 报 YAML 解析错误 | 值里有未加引号的英文冒号 | 给该字段值加双引号 |
| 枚举字段报错 | `type` / `status` 写成了允许值之外 | 对照下方字段参考 |
| 成员页没显示某成员 | `members` / `authors` 里的 slug 写错或该成员不存在 | 核对 `src/config/members.ts` 中的 slug（缺失的 slug 会被静默忽略，注意拼写） |
| 图片不显示 | 路径写错 | 确认文件在 `public/img/` 下，路径以 `/img/...` 开头 |

## 详细字段参考

- [项目 frontmatter 字段（`src/content/projects/*.md`）](projects.md)
- [研究成果 frontmatter 字段（`src/content/research/*.md`）](research.md)
- [成员配置字段（`src/config/members.ts`）](members.md)
- [图片与资源规范（`public/img/`）](assets.md)
- [GitHub 贡献统计（项目详情页柱状图）](contributions.md)
