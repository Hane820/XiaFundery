# GitHub 贡献统计 · Contribution Tracking

项目详情页的「成员贡献」柱状图，基于 **GitHub 提交记录**自动生成，按成员 GitHub 账号归属。数据在**构建期抓取**，产物是静态 JSON，页面零网络请求。

## 工作原理

```text
npm run fetch:contributions
  → 读取 src/content/projects/*.md 里每个项目的 links.github（仓库地址）
  → GitHub API 拉取提交记录（/repos/<owner>/<repo>/commits，分页，最多 1000 条）
  → 按 commit 的 author.login（GitHub 用户名）聚合数量
  → 用每位成员 links.github 主页地址的用户名做归属匹配
  → 写入 src/content/contributions/contributions.json（缓存，随仓库提交）
  → 构建时由 file() 内容集合读取，项目详情页渲染纯 CSS 柱状图
```

## 使用步骤

1. **项目**的 `links.github` 填**仓库地址**，例如 `https://github.com/Yunease/vilstia`；
2. **成员**的 `links.github` 填**主页地址**，例如 `https://github.com/Yunease`（用于匹配提交归属）；
3. 运行抓取脚本：
   ```bash
   npm run fetch:contributions          # 拉取并更新缓存
   npm run build:refresh                # 拉取 + 重新构建（快捷方式）

   # 可选：提供 GITHUB_TOKEN 提高接口额度（未认证 60 次/小时，认证 5000 次/小时）
   # Windows PowerShell:
   #   $env:GITHUB_TOKEN = "你的token"; npm run fetch:contributions
   # macOS / Linux bash:
   #   GITHUB_TOKEN=xxx npm run fetch:contributions
   ```
4. 构建生成的 `contributions.json` **随仓库提交**，之后离线也能正常构建。

## 降级与容错

- **抓取失败**（离线、限流、仓库不存在）：保留上次缓存并标注「更新失败」，或记录错误；**构建永不因此失败**；
- **非 GitHub 链接**（如 `example.com`）：直接跳过，不生成记录，页面也不显示该区块；
- **未抓取过的真实仓库**：页面显示「暂无统计数据，运行 fetch:contributions」；
- **未关联 GitHub 账号 / 机器人（如 dependabot）的提交**：归入「其他」，柱状图用灰色显示。

## 属性说明

| 字段 | 类型 | 说明 |
| --- | --- | --- |
| `id` | 字符串 | 对应项目 slug |
| `source` | 字符串 | 抓取的仓库地址 |
| `fetchedAt` | 字符串 | 抓取时间（ISO） |
| `totalCommits` | 数字 | 统计到的提交总数 |
| `members` | 数组 | `[{ slug, username, commits }]`，匹配到成员的提交 |
| `others` | 对象 | 未归属到成员的提交数 `{ commits }` |
| `error` | 字符串（可选） | 最近一次抓取失败信息 |

`members[].slug` 与 `src/config/members.ts` 的成员 slug 对应，柱状图会自动显示成员姓名并链接到成员页。

## 注意

- **commit 数量 ≠ 完整贡献**：合并提交、squash、单次大提交都会使数字失真，柱状图定位为「提交活跃度的直观参考」；
- GitHub 未认证限流 60 次/小时，认证（`GITHUB_TOKEN`）后 5000 次/小时；
- 演示数据的仓库地址是占位符（`example.com`），因此当前站点不显示任何统计数据。