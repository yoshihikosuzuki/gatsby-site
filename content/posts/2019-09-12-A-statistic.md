---
title: ゲノムアセンブリの A-statistic
date: "2019-09-12"
template: "post"
draft: false
slug: "assembly-a-statistic"
category: "Bioinformatics"
tags:
  - "Genome assembly"
description: 'Myers, E. W. A Whole-Genome Assembly of Drosophila. Science 287, 2196–2204 (2000) にある "A-statistic" について。'
---

ほとんど自分用メモ。[Myers, E. W. A Whole-Genome Assembly of Drosophila. _Science_ 287, 2196–2204 (2000)](https://science.sciencemag.org/content/287/5461/2196) にある "A-statistic" について。

- Given: ゲノム長 $G$ bp
- Given: (途切れていない) リードの総数 $N$
- Given: 長さ $l$ bp で $k$ 個のリードからなるコンティグ $c$
- Def: コンティグ $c$ の「重複度」$r\in\mathbb{N}$ (= その配列がゲノム中に何回現れるか = リピートのコピー何個をまとめたものか、を表す値)

このとき、$p(k\vert r):=$「コンティグ $c$ が $k$ 個のリードから構成される確率」＝「$l$ bp の区間 ($\times r$ 個) 内で $k$ 個のリードが開始する確率」は、

$$
\begin{aligned}
p(k\vert r)&={\rm Poisson}\left(k;\frac{lrN}{G}\right) \\
&=\frac{1}{k!}\left(\frac{lrN}{G}\right)^k\exp\left(-\frac{lrN}{G}\right)
\end{aligned}
$$

となる。そしてこれをもとに、重複度 1 の場合 (= ユニーク配列) と 2 の場合 (= リピート配列; コピー数が 3 以上の場合もこちらの方が近くなる) の log オッズ比

$$
\log\frac{p(k\vert r=1)}{p(k\vert r=2)}= \frac{lN}{G}\log e-k\log 2
$$

の値が 10 以上なら、その $l$ bp の区間 (= コンティグ) はユニークであるとする、という話。これはコンティグが全体としてリピートっぽいかどうかの判定なので、アセンブリの "正しさ" はまた別問題となる (A-statistic の値が小さくてもアセンブリが正しいこともあるし、大きくてもミスアセンブリがあることもある)。
