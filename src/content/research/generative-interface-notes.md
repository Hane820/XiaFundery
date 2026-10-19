---
title: 生成式界面：约束与自由
slug: generative-interface-notes
type: report
status: internal
featured: true
demo: true
year: 2025
date: 2025-07-20
venue: 匣方艺创内部技术笔记
authors:
  - tang-qi
  - lu-yu
  - Lumina
keywords: [生成式界面, 人机交互, 约束设计, LLM 应用]
summary: 一份内部技术笔记，讨论生成式界面在「约束」与「自由」之间的设计张力，以及如何用结构化输出约束模型行为。
citation: 唐栖，陆屿. 生成式界面：约束与自由. 匣方艺创内部技术笔记, 2025.
links:
  pdf: https://example.com/xia-fundery/generative-interface-notes.pdf
relatedProjects: []
relatedResearch:
  - prompt-decomposition-survey
---

## 背景

生成式界面的核心张力在于：模型天然倾向于自由生成，而可用界面要求行为可预期。这份笔记整理我们在织文项目中处理这一张力的实践。

## 主要观点

- 用结构化输出格式（如 JSON Schema）约束模型，而不是依赖提示词里的口头约定。
- 把「自由」保留在内容层，把「约束」施加在结构层。
- 交互上提供「生成 -> 确认 -> 调整」的循环，而不是一次性输出。

## 局限

本文为内部记录，未经过同行评审，不构成已发表成果。
