# 成员配置参考 · `src/config/members.ts`

成员不在 Markdown 里，而是集中管理在配置文件 `src/config/members.ts`。新增合作者只需在 `MEMBERS` 数组里追加一项，页面（列表、详情、参与项目 / 研究聚合）都会自动生效。

## 完整示例

```ts
{
  name: '祁安',
  slug: 'qi-an',                    // 详情页 URL：/team/qi-an
  role: '联合创始人 · 软件架构师',     // 头像下方的一行角色
  focus: '工程架构与开源',            // 主要技术方向
  bio: '卡片上的一句话简介。',
  about: '详情页详细介绍，用空行分段。\n\n第二个段落。',
  avatar: '/img/avatars/qi-an.svg',
  skills: ['TypeScript', 'Rust'],
  order: 1,                         // 列表排序，越小越靠前
  joinedDate: '2025-03-01',         // 可选
  demo: true,                       // 示例标记；发布真实成员后改为 false
  links: {                          // 全部可选
    website: 'https://example.com',
    github: 'https://github.com/xx',
    blog: 'https://example.com/blog',
  },
},
```

## 字段说明

| 字段 | 类型 | 必填 | 说明 |
| --- | --- | --- | --- |
| `name` | 字符串 | ✅ | 公开姓名 / 昵称 |
| `slug` | 字符串 | ✅ | 稳定 ID，直接作为 `/team/<slug>` 的 URL 与项目 / 研究里的引用；发布后不要修改。建议全小写连字符（如 `lumina-qin`），大小写字母也允许，URL 区分大小写 |
| `role` | 字符串 | ✅ | 角色，如 `联合创始人 · 软件架构师` |
| `focus` | 字符串 | ✅ | 主要技术方向，详情页标题下显示 |
| `bio` | 字符串 | ✅ | 卡片上的简短介绍（1~2 句） |
| `about` | 字符串 | — | 详情页详细自我介绍；用空行 `\n\n` 分段 |
| `avatar` | 字符串 | ✅ | 头像路径，建议 `/img/avatars/<slug>.<扩展名>`；SVG / PNG / JPG / WebP 均可 |
| `skills` | 数组 | — | 技能标签，卡片与详情页显示 |
| `order` | 数字 | — | 列表排序，数字小靠前，默认 `0` |
| `joinedDate` | 字符串 | — | 加入时间，格式 `YYYY-MM-DD` |
| `demo` | 布尔 | — | 示例数据标记；`true` 时详情页显示「示例内容」标签 |
| `links` | 对象 | — | 公开链接，见下表 |

### `links` 可用键（全部可选）

| 键 | 显示 | 说明 |
| --- | --- | --- |
| `website` | 个人主页 | 个人网站 / 主页 |
| `github` | GitHub | GitHub 主页 |
| `blog` | 博客 | 个人博客（支持） |

> 想加其他类型（邮箱、X / 微博 / B 站 / Mastodon 等）：在 `Member` 接口和成员页 `/team/[slug]` 的 links 映射里各加一行即可。链接值必须是完整 URL（含 `https://`）。

## 如何新增一位成员（checklist）

1. 头像图片放到 `public/img/avatars/<slug>.<扩展名>`（SVG / PNG / JPG 均可）；
2. 在 `src/config/members.ts` 的 `MEMBERS` 数组末尾追加一个对象；
3. `slug` 与头像文件名保持一致（大小写敏感，URL 直接使用该值）；
4. `order` 填一个大于现有最大值的数字；
5. 需要展示的项目 / 研究，在其 frontmatter 的 `members` / `authors` 里填入该 `slug`；
6. 运行 `npm run check` 与 `npm run dev` 预览。

## 常见问题

| 问题 | 原因 | 解决 |
| --- | --- | --- |
| 成员详情页 404 | `slug` 与 URL 不一致 | 确认 `slug` 拼写与链接一致 |
| 项目 / 研究里引用了但没显示 | `members` / `authors` 里 slug 写错或拼写不一致 | 与 `src/config/members.ts` 的 `slug` 逐字核对（缺失的 slug 会被静默忽略，注意拼写） |
| 头像不显示 | 路径或文件名不对 | 确认文件在 `public/img/avatars/` 且 `avatar` 以 `/img/avatars/` 开头 |
