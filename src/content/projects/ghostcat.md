---
name: "GhostCat · 砂铃桌面宠物"
slug: "ghostcat"
type: "ai"
status: "released"
featured: true
summary: "以作者小猫「砂铃」为形象的桌面宠物，结合本地大模型提供陪伴式对话与情绪互动。"
image: "/img/covers/ghostcat.svg"
tech: ["Rust", "Tauri", "React", "Vite", "Ollama"]
startDate: "2026-06-07"
publishDate: "2026-06-07"
updatedDate: "2026-06-07"
members: ["Lumina"]
relatedProjects: []
relatedResearch: []
intro: "一个用 Tauri 打包的桌面宠物小程序：像素风闲置动画 + 本地 Ollama 大模型对话 + 情绪分析，把宠物陪伴与轻量 AI 交互结合起来。"
links:
  github: "https://github.com/Yunease/ghostcat"
---

## 项目定位

ghostcat 是一个桌面宠物小程序，形象来自作者自己的小猫「砂铃（sharin）」。它没有止步于传统桌面宠物，而是接入了**本地大模型（Ollama）**，提供陪伴式对话与情绪互动，是一个把宠物陪伴与轻量 AI 结合起来的趣味项目。

## 功能与实现

- **桌面外壳**：基于 Tauri v2，前端用 React + Vite，后端为 Rust。
- **本地大模型对话**：Rust 侧通过 `src-tauri/src/ollama.rs` 调用本地 Ollama 服务，无需联网即可聊天。
- **提示词驱动**：内置 `cat-chat.txt`（猫娘聊天）与 `emotion-analyzer.txt`（情绪分析）两套提示词，分别负责对话风格与情绪识别。
- **像素风表现**：使用一组闲置动画帧（`Idle_Normal / Jump / Lost / Rest / Shadow`）配合 `zpix` 像素字体，呈现低分辨率的萌系宠物观感。

## 技术栈

Rust（Tauri v2） + React + Vite + Ollama（本地 LLM）。项目同时包含完整的 Tauri 图标集与打包配置，可直接构建为桌面安装包。

## 备注

该项目与 `godot-`（Godot 桌面宠物）是同一「桌面宠物」方向上的不同技术路线尝试。
