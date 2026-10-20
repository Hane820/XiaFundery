---
name: "Time Capsule · 时间胶囊"
slug: "time-capsule"
type: "software"
status: "released"
featured: false
summary: "简单的时间胶囊桌面应用：把信件加密保存到指定日期，到期才能开启。"
image: "/img/covers/time-capsule.svg"
tech: ["Python", "Flask", "PyWebView", "Vue"]
startDate: "2026-02-25"
publishDate: "2026-02-25"
updatedDate: "2026-02-25"
members: ["Lumina"]
relatedProjects: []
relatedResearch: []
intro: "一个用 Flask + PyWebView + Vue3 打造的桌面小工具，支持加密存储、时间解锁与背景音乐播放。"
links:
  github: "https://github.com/Yunease/timeCapsule"
---

## 项目定位

Time Capsule（时间胶囊）是一个简单的时间胶囊桌面应用：你可以把一封信保存到某个指定日期，只有到了那天才能打开查看。

## 功能

- **创建时间胶囊**：设置名称、解锁日期、信件内容、背景音乐；
- **加密存储**：内容自动加密保存，未到日期无法读取；
- **时间解锁**：只有到达设定日期才能查看内容；
- **音乐播放**：打开胶囊时自动播放背景音乐。

## 技术架构

- 后端：**Python（Flask + flask-cors + pywebview）** 提供接口并以 PyWebView 嵌入前端；
- 前端：`templates/index.html`（Vue 3）实现交互界面；
- 模块划分：`webapp.py`（主程序）、`core.py`（核心逻辑）、`audio.py`（音频）、`main.py`（早期 tkinter 入口）；
- 存储：胶囊数据存于 `capsules/`，音乐存于 `music/`。

## 打包

通过 PyInstaller 可打包为单个 `TimeCapsule.exe`（`--onefile -w`，隐藏控制台并携带 templates 与依赖）。也可直接 `pip install flask flask-cors pywebview` 后运行 `python webapp.py` 从源码启动。
