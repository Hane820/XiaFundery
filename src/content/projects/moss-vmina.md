---
name: "Moss-VMina · 模型微调"
slug: "moss-vmina"
type: "ai"
status: "released"
featured: true
summary: "基于个人语料对 Moss / MiniMax 等大模型进行微调的训练项目，并附带 OpenAI 兼容的 TTS 与推理服务。"
image: "/img/covers/moss-vmina.svg"
tech: ["Python", "PyTorch", "LoRA", "LLM"]
startDate: "2026-07-03"
publishDate: "2026-07-03"
updatedDate: "2026-07-13"
members: ["Lumina"]
relatedProjects: []
relatedResearch: []
intro: "一个把个人创作语料（梦境、碎碎念、画廊等）清洗、构建为训练集，并用于 SFT / QLoRA 微调的项目，同时提供可用的推理与语音合成代码。"
links:
  github: "https://github.com/Yunease/Moss-VMina"
---

## 项目定位

Moss-VMina 是一个**大语言模型微调**项目：基于作者个人的语料数据，对 Moss / MiniMax 等大模型进行 SFT / QLoRA 微调。仓库同时附带一套 OpenAI 兼容的 TTS 与推理服务代码，可直接用于对话与语音合成。

## 处理流程

1. **收集原始语料** → `data/raw/`（`mine/` 个人原始数据 + `external/` 外部来源数据）；
2. **数据清洗**（去重、格式化）→ `data/processed/`；
3. **构建训练集** → 进入模型微调。

配套脚本位于 `config/`、`python/`、`scripts/data_cleaning/` 等目录。

## 配套服务

- **OpenAI TTS**：`OpenAI/OpenAI TTS/tts_server.py` 提供语音合成服务；
- **推理与建模**：`OpenAI/model.py`、`inference.py`、`server.py`、`schemas.py` 构成推理与接口层；
- **TTS 测试**：`TTS/` 下包含测试脚本与示例音频。

## 数据说明

`data/raw/mine/` 下包含大量个人创作语料：梦境（dream）、碎碎念（message）、画廊（gallery，含像素画 / 迷森深境 / 鼠标画等）、anthology 选集等。这些语料正是 Vilstia 内容体系背后的数据与训练素材来源。

## 备注

这是一个长期维护的「用自己写过的东西训练自己的模型」的实验，数据隐私与本地化是核心考量。
