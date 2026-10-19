# 图片与资源规范 · `public/img/`

站点内图片统一放在 `public/img/` 下，按用途分子目录：

```text
public/
├── img/
│   ├── covers/     # 项目封面
│   └── avatars/    # 成员头像
├── brand/          # Logo 与默认分享图（og.svg）
└── favicon.svg
```

## 引用方式

内容文件（frontmatter）里直接写**以 `/` 开头的站点相对路径**：

```yaml
image: /img/covers/casket-kit.svg
avatar: /img/avatars/qi-an.svg
```

文件存在性会在 `npm run build` 后用链接检查脚本验证：

```bash
npm run check:links   # 扫描 dist，报告缺失的资源与失效的内部链接
```

## 格式支持

- **SVG / PNG / JPG / WebP / GIF** 均支持，`<img>` 直接引用即可；
- 当前示例为程序化生成的 SVG（几何封面 + 姓氏头像），可替换为真实图片；
- 封面建议比例：卡片区域为 **10:7**，详情页大图为 **16:9** 裁切（`object-cover`），图片本身尺寸不限，但建议不小于 1200px 宽避免放大模糊；
- 头像为正方形，建议 ≥ 320×320px；
- `alt` 文案由页面根据 `name` 自动生成，无需在 frontmatter 里填写。

## 重新生成占位资源

```bash
npm run gen:assets
```

会按 `scripts/generate-assets.mjs` 中定义的清单，重新生成一套几何风格封面与头像（覆盖同名文件）。上传真实图片前无需运行此命令。

## 站点级品牌资源（如需替换）

| 文件 | 用途 |
| --- | --- |
| `public/brand/logo-mark.svg` | 品牌标志（网页内联使用） |
| `public/brand/og.svg` | 默认 Open Graph 分享图（1200×630） |
| `public/favicon.svg` | 浏览器站点图标 |
