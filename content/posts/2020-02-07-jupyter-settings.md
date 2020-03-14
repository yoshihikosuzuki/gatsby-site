---
title: Jupyter 設定など雑記
date: "2020-02-07"
template: "post"
draft: false
slug: "jupyter-settings"
category: "Settings"
tags:
  - "Settings"
  - "Jupyter"
description: "Jupyter で使っている設定など。"
---

## 設定

- [ここ]()に従ってローカルからすぐにリモートの Jupyter をブラウザで実行できるようにする
- `$HOME/.jupyter/custom/custom.css` でスタイルを変更できる
- Notebook を公開したい場合は、GitHub にアップロードしてから [nbviewer](https://nbviewer.jupyter.org/) のリンクを公開する

## ショートカットキー

- 関数・クラスの名前の上で `Shift + Tab`: init signature 表示

## 拡張機能

- [Snippets Menu](https://jupyter-contrib-nbextensions.readthedocs.io/en/latest/nbextensions/snippets_menu/readme.html): コードのテンプレートを登録できる。下はトップレベルのテンプレートの例。
  - `display` はデータフレーム等を整形して表示できる
  - [Plotly](https://plot.ly/python/) (version 4) は interactive plot 用
    - [cufflinks](https://github.com/santosjorge/cufflinks) を使えばデータフレームに対しても `pd.DataFrame.iplot()` のように書ける
  - [logzero](https://logzero.readthedocs.io/en/latest/) は標準よりも優れたロガー。`loglevel` は状況に応じて `DEBUG` に変える

```python
%matplotlib inline
%config InlineBackend.figure_format = 'retina'
from IPython.display import display
import plotly.offline as py
py.init_notebook_mode(connected=True)
import plotly.io as pio
pio.templates.default = 'plotly_white'
import logging
import logzero
logzero.loglevel(logging.INFO)
```

