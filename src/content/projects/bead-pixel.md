---
name: "BeadPixel · Image-to-Pixel"
slug: "bead-pixel"
type: "software"
status: "released"
featured: true
summary: "图像转像素画的网页编辑器，同时提供可复用的 JavaScript 库与多种抖动算法。"
image: "/img/covers/bead-pixel.svg"
tech: ["JavaScript", "HTML5 Canvas", "Web App"]
startDate: "2026-08-10"
publishDate: "2026-08-10"
updatedDate: "2026-08-10"
members: ["Lumina"]
relatedProjects: []
relatedResearch: []
intro: "一个直观的「图片 → 像素艺术」工具，既可在浏览器中交互使用，也能作为 image-to-pixel 库嵌入到其它项目里。"
links:
  github: "https://github.com/Yunease/BeadPixel"
---

## 项目定位

BeadPixel（Image-to-Pixel）是一个把普通图片转换为像素艺术的工具，提供两种形态：一个可直接使用的**交互式网页应用**，以及一个可在第三方项目中调用的 **JavaScript API**。

## 核心功能

- **多种抖动算法**：Floyd-Steinberg、`2x2 Bayer`、`4x4 Bayer`、`Ordered`、`Clustered 4x4`、`Atkinson`，并支持实时调节抖动强度。
- **调色板支持**：内置 Lospec 调色板，也可通过 Lospec API 用 palette slug 导入；支持自定义调色板，可保存至本地缓存，或以 JSON 格式下载 / 上传。
- **分辨率控制**：可按原图分辨率导出，或导出为真正的像素画尺寸。
- **尺寸自动识别**：一键将像素宽度对齐原图，适合处理精灵图集（spritesheet）。
- **实时预览**：V2 引入自动刷新开关，调参时即时看到结果。

## 技术架构

纯前端实现，基于 HTML5 Canvas 与 JavaScript。库通过 CDN 或本地引入两种方式提供，并可通过 `p5.prototype.registerMethod` 与 p5 / q5 等创意编程框架配合，对整个 sketch 做像素化后处理。

## 许可

- `image-to-pixel.js` 库：MIT License；
- 应用本身：Apache License 2.0。

可在 Tezumie 提供的在线编辑器直接体验完整功能。
