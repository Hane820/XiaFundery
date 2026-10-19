---
title: Realtime Speech Masking with Lightweight Models
slug: realtime-audio-masking
type: experiment
status: internal
featured: false
demo: true
year: 2025
date: 2025-06-15
authors:
  - lu-yu
  - qi-an
keywords: [audio, DSP, speech separation, on-device inference]
summary: 内部实验记录：轻量模型结合传统 DSP 的实时语音掩蔽实验，记录了方法、量化结果与归档原因。
citation: Lu Yu, Qi An. Realtime Speech Masking with Lightweight Models. Internal experiment log, 2025.
bibtexType: techreport
links:
  code: https://example.com/xia-fundery/echo-scrub
relatedProjects: []
---

## 目的

验证在低算力设备上实现实时语音/噪声分离的可行性，服务于语音笔记场景。

## 方法

轻量掩蔽网络 + 频谱后处理。目标延迟低于感知阈值，运行于通用移动端推理运行时。

## 结果

原型在离线样本上达到可用水平，但在真实环境中的延迟与鲁棒性权衡不达预期，实验归档。

## 归档说明

本记录为内部实验日志，方法结论可能不完整，不作为已发表成果引用。
