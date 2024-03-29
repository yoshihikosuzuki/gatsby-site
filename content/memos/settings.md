---
title: 設定置き場 (ターミナル、エディタ、etc.)
template: "memo"
slug: "mac-settings"
category: "Settings"
tags:
  - "Settings"
  - "Alacritty"
  - "tmux"
  - "Mac"
description: "Mac 用の Alacritty、tmux、その他の設定。"
---

## 目次

```toc

```

環境は macOS + zsh (+ Homebrew)

## tmux

- `$ brew install tmux` でインストール
- 設定ファイルは `$HOME/.tmux.conf`
- 設定が反映されない場合は一度 `tmux kill-server` する

```ini
# Enable mouse
set -g mouse on

# Copy with mouse to clipboard in Mac
bind-key -T copy-mode MouseDragEnd1Pane send-keys -X copy-pipe-and-cancel "pbcopy"

# Do not show a prompt before killing a pane
bind-key x kill-pane
```

- 色を使うために `$HOME/.zshenv` に以下を追加

```shell
export TERM='xterm-256color'
```

## Alacritty

- [公式サイト](https://alacritty.org/) からインストーラを使ってインストール
- 設定ファイルは `$HOME/.alacritty.yml`
- Mac の option を alt キーにする

```yaml
- { key: A, mods: Alt, chars: "\x1ba" }
- { key: B, mods: Alt, chars: "\x1bb" }
- { key: C, mods: Alt, chars: "\x1bc" }
- { key: D, mods: Alt, chars: "\x1bd" }
- { key: E, mods: Alt, chars: "\x1be" }
- { key: F, mods: Alt, chars: "\x1bf" }
- { key: G, mods: Alt, chars: "\x1bg" }
- { key: H, mods: Alt, chars: "\x1bh" }
- { key: I, mods: Alt, chars: "\x1bi" }
- { key: J, mods: Alt, chars: "\x1bj" }
- { key: K, mods: Alt, chars: "\x1bk" }
- { key: L, mods: Alt, chars: "\x1bl" }
- { key: M, mods: Alt, chars: "\x1bm" }
- { key: N, mods: Alt, chars: "\x1bn" }
- { key: O, mods: Alt, chars: "\x1bo" }
- { key: P, mods: Alt, chars: "\x1bp" }
- { key: Q, mods: Alt, chars: "\x1bq" }
- { key: R, mods: Alt, chars: "\x1br" }
- { key: S, mods: Alt, chars: "\x1bs" }
- { key: T, mods: Alt, chars: "\x1bt" }
- { key: U, mods: Alt, chars: "\x1bu" }
- { key: V, mods: Alt, chars: "\x1bv" }
- { key: W, mods: Alt, chars: "\x1bw" }
- { key: X, mods: Alt, chars: "\x1bx" }
- { key: Y, mods: Alt, chars: "\x1by" }
- { key: Z, mods: Alt, chars: "\x1bz" }
- { key: A, mods: Alt|Shift, chars: "\x1bA" }
- { key: B, mods: Alt|Shift, chars: "\x1bB" }
- { key: C, mods: Alt|Shift, chars: "\x1bC" }
- { key: D, mods: Alt|Shift, chars: "\x1bD" }
- { key: E, mods: Alt|Shift, chars: "\x1bE" }
- { key: F, mods: Alt|Shift, chars: "\x1bF" }
- { key: G, mods: Alt|Shift, chars: "\x1bG" }
- { key: H, mods: Alt|Shift, chars: "\x1bH" }
- { key: I, mods: Alt|Shift, chars: "\x1bI" }
- { key: J, mods: Alt|Shift, chars: "\x1bJ" }
- { key: K, mods: Alt|Shift, chars: "\x1bK" }
- { key: L, mods: Alt|Shift, chars: "\x1bL" }
- { key: M, mods: Alt|Shift, chars: "\x1bM" }
- { key: N, mods: Alt|Shift, chars: "\x1bN" }
- { key: O, mods: Alt|Shift, chars: "\x1bO" }
- { key: P, mods: Alt|Shift, chars: "\x1bP" }
- { key: Q, mods: Alt|Shift, chars: "\x1bQ" }
- { key: R, mods: Alt|Shift, chars: "\x1bR" }
- { key: S, mods: Alt|Shift, chars: "\x1bS" }
- { key: T, mods: Alt|Shift, chars: "\x1bT" }
- { key: U, mods: Alt|Shift, chars: "\x1bU" }
- { key: V, mods: Alt|Shift, chars: "\x1bV" }
- { key: W, mods: Alt|Shift, chars: "\x1bW" }
- { key: X, mods: Alt|Shift, chars: "\x1bX" }
- { key: Y, mods: Alt|Shift, chars: "\x1bY" }
- { key: Z, mods: Alt|Shift, chars: "\x1bZ" }
- { key: Key1, mods: Alt, chars: "\x1b1" }
- { key: Key2, mods: Alt, chars: "\x1b2" }
- { key: Key3, mods: Alt, chars: "\x1b3" }
- { key: Key4, mods: Alt, chars: "\x1b4" }
- { key: Key5, mods: Alt, chars: "\x1b5" }
- { key: Key6, mods: Alt, chars: "\x1b6" }
- { key: Key7, mods: Alt, chars: "\x1b7" }
- { key: Key8, mods: Alt, chars: "\x1b8" }
- { key: Key9, mods: Alt, chars: "\x1b9" }
- { key: Key0, mods: Alt, chars: "\x1b0" }
- { key: Space, mods: Control, chars: "\x00" } # Ctrl + Space
- { key: Grave, mods: Alt, chars: "\x1b`" } # Alt + `
- { key: Grave, mods: Alt|Shift, chars: "\x1b~" } # Alt + ~
- { key: Period, mods: Alt, chars: "\x1b." } # Alt + .
- { key: Key8, mods: Alt|Shift, chars: "\x1b*" } # Alt + *
- { key: Key3, mods: Alt|Shift, chars: "\x1b#" } # Alt + #
- { key: Period, mods: Alt|Shift, chars: "\x1b>" } # Alt + >
- { key: Comma, mods: Alt|Shift, chars: "\x1b<" } # Alt + <
- { key: Minus, mods: Alt|Shift, chars: "\x1b_" } # Alt + _
- { key: Key5, mods: Alt|Shift, chars: "\x1b%" } # Alt + %
- { key: Key6, mods: Alt|Shift, chars: "\x1b^" } # Alt + ^
- { key: Backslash, mods: Alt, chars: "\x1b\\" } # Alt + \
- { key: Backslash, mods: Alt|Shift, chars: "\x1b|" } # Alt + |
```

- tmux 用のキーバインド

```yml
- { key: D, mods: Command, chars: "\x02\x64" } # detach a session
- { key: T, mods: Command, chars: "\x02\x63" } # create a window
- { key: P, mods: Command, chars: "\x02\x25" } # create a horizontal pane
- { key: P, mods: Command|Shift, chars: "\x02\x22" } # create a vertical pane
- { key: W, mods: Command, chars: "\x02\x78" } # close a pane (close a window with a single pane)
- { key: Up, mods: Command, chars: "\x02\x1b\x5b\x41" } # move to another pane
- { key: Down, mods: Command, chars: "\x02\x1b\x5b\x42" }
- { key: Right, mods: Command, chars: "\x02\x1b\x5b\x43" }
- { key: Left, mods: Command, chars: "\x02\x1b\x5b\x44" }
```

- 日本語に対応するためにシェルの設定に以下を追加

```shell
export LANG='ja_JP.UTF-8'
```

## Git

- `$HOME/.gitconfig`

```ini
[user]
    name = ユーザ名
    email = メールアドレス
[color]
    ui = auto
```

- SSH 接続の設定は `$HOME/.ssh/config` に記述

```ini
Host github.com
    User ユーザ名
    HostName ssh.github.com
    IdentityFile ~/.ssh/秘密鍵ファイル名
    ServerAliveInterval 60
```
