---
title: 使用頻度の低いコマンド置き場
template: "article"
slug: "commands"
description: "ずっと覚えているほど使用頻度が高くないコマンドやショートカットキーをメモ代わりに書き留めておく場所。"
---

## 目次

```toc

```

### Visual Studio Code

| ショートカットキー     | 機能                               | ユーザ設定コマンド名                                         |
| ---------------------- | ---------------------------------- | ------------------------------------------------------------ |
| `Command + Shift + P`  | コマンドパレットを開く             |                                                              |
| `Alt + Shift + F`      | 自動フォーマット                   |                                                              |
| `` Ctrl + Shift + ` `` | ターミナルウィンドウを開閉         | `Terminal: Focus Terminal` (when = `!terminalFocus`)<br>`View: Focus Active Editor Group` (when = `terminalFocus`) |
| `Ctrl + M`             | ターミナルウィンドウを最大化・戻す | `View: Toggle Maximized Panel` (when = `terminalFocus`)      |

### Homebrew

| コマンド                                | 機能                                                         |
| :-------------------------------------- | ------------------------------------------------------------ |
| `brew doctor`                           | 定期的に実行して、表示される問題を解消する                   |
| `brew upgrade`                          | Homebrew 本体とパッケージのアップデート、こちらもたまに実行する |
| `brew [install|uninstall] パッケージ名` |                                                              |
| `brew list`                             |                                                              |

### Perl

| コマンド            | 機能                     |
| :------------------ | :----------------------- |
| `cpan モジュール名` | モジュールをインストール |

### [cargo-atcoder](https://github.com/tanakh/cargo-atcoder)

| コマンド                         | 機能                     |
| -------------------------------- | ------------------------ |
| `cargo atcoder new コンテスト名` | コンテストをダウンロード |
| `cargo atcoder test 問題名`      | テスト実行               |
| `cargo run --bin 問題名`         | 直接実行                 |

