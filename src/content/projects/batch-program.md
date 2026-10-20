---
name: "BatchProgram · 零散脚本合集"
slug: "batch-program"
type: "software"
status: "released"
featured: false
summary: "零散的 Python 小程序合集，收纳了批处理、CNN 训练与音频处理等独立脚本。"
image: "/img/covers/batch-program.svg"
tech: ["Python", "PyTorch", "CNN"]
startDate: "2026-01-02"
publishDate: "2026-01-02"
updatedDate: "2026-01-27"
members: ["Lumina"]
relatedProjects: []
relatedResearch: []
intro: "个人练手与批处理任务的脚本集合，多个互不相关的独立小程序放在同一仓库中统一管理。"
links:
  github: "https://github.com/Yunease/batchProgram"
---

## 项目定位

batchProgram 是一个收纳若干独立 Python 小程序 / 脚本的集合型仓库，用于存放个人在批处理、机器学习实验与音频处理上的练手代码。仓库没有统一入口，各脚本按目录独立运行。

## 内容与结构

- **`avg脚本处理/engine.py`**：均值 / 平均类的批处理脚本，对一批数据做聚合或归一化处理。
- **`cnn训练/code.py` + `cnn训练/data/`**：基于 CIFAR-10 数据集的卷积神经网络分类训练代码，包含数据集缓存（`batches.meta`）。
- **`音频处理/py.py`**：音频文件的批量处理脚本。

## 技术说明

核心语言为 Python。CNN 训练部分依赖深度学习框架（PyTorch 一类），音频处理则偏向标准库与音频库的组合。各模块之间无耦合，按需单独执行即可。

## 备注

该仓库属于「工具箱」性质，适合作为灵感与代码片段的归档地，而非一个单一产品。
