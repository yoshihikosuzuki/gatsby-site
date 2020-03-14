---
title: リモート環境でどうパスを通すか？
date: "2020-03-13"
template: "post"
draft: false
slug: "remote-env-path"
category: "Settings"
tags:
  - "Settings"
  - "Shell"
description: "管理者権限のないリモート環境で自分でインストールした実行ファイルやライブラリに対して、どうパスを通すか。"
---

## 環境

- CentOS 7 + bash
- 管理者権限なし

## インストール先のディレクトリ構成について

- 基本的には `$HOME/.local` を `/usr/local` の自前版に見立ててインストールしていく
  - `$HOME/.local/[bin|lib|include]` にパスを通したい
- 物によっては `$HOME/.local/ソフトウエア名` という独立したディレクトリを作ってそこにインストールする
  - それぞれについて追加でパスを通す必要がある

## 本題

- `$HOME/.bashrc` に記述する
- 実行ファイルのパスを通すには `PATH`
- コンパイル時に必要なライブラリのパスを通すには `LIBRARY_PATH`
  - 、、で基本的には大丈夫なのだが、ソフトウエアによっては `LDFLAGS` でないとダメなので両方定義する
- 実行時に必要なライブラリのパスを通すには `LD_LIBRARY_PATH`
- C/C++ コンパイル時に必要なインクルードファイルのパスを通すには `CPATH`
  - こちらも `LIBRARY_PATH` と同様 `CPPFLAGS` も定義する
  - C だけ [C++] だけの場合は `C_INCLUDE_PATH` (と `CFLAGS`) [`CPLUS_INCLUDE_PATH` (と `CXXFLAGS`)]
- すべて**先に**書かれているパスが優先される