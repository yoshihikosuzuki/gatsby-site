---
title: Git & GitHub & GitLab 用の設定
date: "2020-01-25"
template: "post"
draft: false
slug: "git-github-settings"
category: "Settings"
tags:
  - "Settings"
  - "Git"
  - "GitHub"
  - "GitLab"
description: "Git([Hub|Lab]) の設定。"
---

- `$HOME/.gitconfig`

```ini
[user]
    name = ユーザ名
    email = メールアドレス
[color]
    ui = auto
[url "git@github.com:"]
    insteadof = https://github.com/
[url "git@gitlab.com:"]
    insteadof = https://gitlab.com/
```

- SSH 接続の設定は `$HOME/.ssh/config` に記述

```ini
Host github.com
    User ユーザ名
    HostName ssh.github.com
    IdentityFile ~/.ssh/秘密鍵ファイル名
    ServerAliveInterval 60
```

- 認証でエラーが出たら GitHub 用の SSH 秘密鍵を登録

```bash
$ eval `ssh-agent`   # Mac では不要
$ ssh-add $HOME/.ssh/秘密鍵ファイル
$ ssh-add -l   # 登録されている秘密鍵を確認
```

- `$ git log` をデフォルトでツリー表示するためにシェルの設定ファイルに以下を追加

```shell
git() {
    if [[ $@ == "log" ]]; then
        git log --oneline --graph --decorate
    else
        command git "$@"
    fi
}
```

