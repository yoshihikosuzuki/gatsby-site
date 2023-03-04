---
title: 使用頻度の低いコマンド置き場
template: "memo"
slug: "commands"
description: "たまに必要になるけど覚えているほど使用頻度が高くないコマンドやショートカットキーをメモ代わりに書き留めておく場所。"
---

## 目次

```toc

```

## Homebrew

- [公式サイト](https://brew.sh/index_ja)
- `--cask` オプションを付けると GUI アプリケーションだけを扱う

| コマンド                               | 機能                                                      |
| -------------------------------------- | --------------------------------------------------------- |
| `brew list [--cask]`                   | インストールされているパッケージの一覧を表示              |
| `brew install [--cask] パッケージ名`   | 特定のパッケージのインストール                            |
| `brew uninstall [--cask] パッケージ名` | 特定のパッケージだけのアンインストール                    |
| `brew autoremove`                      | 使用されていない依存パッケージを削除                      |
| `brew cleanup [--cask]`                | キャッシュを削除                                          |
| `brew upgrade [--cask]`                | Homebrew 本体とパッケージのアップデート<br>たまに実行する |
| `brew doctor`                          | 定期的に実行して、表示される問題を解消する                |

## Dropbox

### コマンドラインからダウンロードする

```bash
wget -O ファイル名.zip https://www.dropbox.com/...?dl=1
7zz x ファイル名.zip
```

## Git & GitHub

### ローカルのディレクトリを GitHub に追加する

- [公式ドキュメント](https://docs.github.com/ja/get-started/importing-your-projects-to-github/importing-source-code-to-github/adding-locally-hosted-code-to-github)

```bash
# あらかじめ GitHub で新規レポジトリを作成しておく
git init
git add . && git commit -m "initial commit"
git branch -M main
git remote add origin レポジトリURL
# `git remote -v` でリモートレポジトリが正しく追加されているか確認
git push -u origin main
```

### タグを追加して自動でリリース公開

- GitHub workflow で、タグが追加された時に自動でリリースを公開するように設定

```yaml
name: CI

on:
  push:
    tags:
      - "v*"

jobs:
  create_release:
    runs-on: ubuntu-latest
    steps:
      - name: Checkout
        uses: actions/checkout@v2
      - name: Release
        id: create_release
        uses: actions/create-release@v1
        env:
          GITHUB_TOKEN: ${{ secrets.GITHUB_TOKEN }}
        with:
          tag_name: ${{ github.ref }}
          release_name: Release ${{ github.ref }}
          draft: false
          prerelease: false
    outputs:
      upload_url: ${{ steps.create_release.outputs.upload_url }}
```

- タグを作りリリースを作成

```bash
# あらかじめ git push まで済ませておく
git tag v0.1
git push origin v0.1
```

## Python

### PyPI パッケージ登録

- [公式ドキュメント](https://packaging.python.org/en/latest/tutorials/packaging-projects/)
- [TestPyPI](https://test.pypi.org/), [PyPI](https://pypi.org/) にアカウントを作成し、必要なパッケージをインストールしておく:

```bash
python3 -m pip install --upgrade build twine
```

- アップロードの際に必要となるユーザ名とパスワードをコンフィグファイル `~/.pypirc` に書いておく ([公式ドキュメント](https://packaging.python.org/en/latest/specifications/pypirc/)):

```toml
[distutils]
index-servers =
  pypi
  pypitest

[pypi]
repository = https://upload.pypi.org/legacy/
username = ユーザ名
password = パスワード

[pypitest]
repository = https://test.pypi.org/legacy/
username = ユーザ名
password = パスワード
```

- 登録したいパッケージで `setup.[py|cfg]` と `pyproject.toml` を作っておく

- ビルド:

```bash
python3 -m build
```

- アップロードとインストールのテスト:

```bash
python3 -m twine upload --repository testpypi dist/*
python3 -m venv env
source env/bin/activate
python3 -m pip install --index-url https://test.pypi.org/simple/ --no-deps パッケージ名
```

- 本番アップロード:

```bash
python3 -m twine upload dist/*
```

## Rust

### VScode に rust-analyzer を自前インストール

- [Github Issue](https://github.com/rust-lang/rust-analyzer/issues/13081#issuecomment-1222199782)

1. `$ rustup toolchain install nightly --component rust-analyzer`
2. VScode settings の `rust-analyzer.server.path` を `~/.rustup/toolchains/nightly-x86_64-unknown-linux-gnu/bin/rust-analyzer` 等に設定

### python パッケージの作成

- [PyO3](https://github.com/PyO3/pyo3)

```bash
# (pip install maturin しておく)
maturin new パッケージ名   # もしくは maturin init
...
maturin build
pip install target/wheels/*.whl
```

## Perl

| コマンド            | 機能                     |
| ------------------- | ------------------------ |
| `cpan モジュール名` | モジュールをインストール |

## Node

### nodebrew

- Node 自体のバージョン管理
  - `$ brew install nodebrew` でインストール
  - シェルの設定に `export PATH="$HOME/.nodebrew/current/bin:$PATH"` を追記

| コマンド                             | 機能                                       |
| ------------------------------------ | ------------------------------------------ |
| `nodebrew ls`                        | インストールされているバージョン一覧を表示 |
| `nodebrew ls-remote`                 | インストール可能なバージョン一覧を表示     |
| `nodebrew install-binary バージョン` | そのバージョンをバイナリからインストール   |
| `nodebrew use バージョン`            | そのバージョンを有効化                     |

### npm (Node Package Manager)

- 新規プロジェクト作成
  - `$ npm init -y` (`-y`は非対話モード)
  - `package.json`が作られる
- パッケージのインストール
  - `node_modules/`にインストールしたモジュールや実行ファイルには自動でパスが通るので、後述の npm scripts や`require()`ではプレフィックスは不要

| コマンド                                | インストール先    | `package.json`との関係                         | 用途                                |
| --------------------------------------- | ----------------- | ---------------------------------------------- | ----------------------------------- |
| `$ npm install -g パッケージ名`         | 環境全体          | 依存関係には追加されない(が、記述すべき)       |                                     |
| `$ npm install --save-dev パッケージ名` | `./node_modules/` | `devDependencies`にパッケージ名を追加          | 開発時にだけ使用するパッケージ      |
| `$ npm install --save パッケージ名`     | `./node_modules/` | `dependencies`にパッケージ名を追加             | 実行時に(も)使用するパッケージ      |
| `$ npm install`                         | `./node_modules/` | 記述されている依存パッケージを全てインストール | 既存レポジトリを clone した場合など |

- 現在インストールされているバージョンと最新のバージョンを確認
  - `$ npm outdated [-g|--save|--save-dev]`
  - アップデート自体はインストールと同じコマンドで可能
- npm scripts
  - `package.json`中の`"scripts"`で定義されたコマンド群のこと
  - `$ npm run`で一覧を表示できる
  - 以下のような記述のとき、`タスク名` = `install`, `start`, `test`等なら`$ npm タスク名`で、その他(`build`等)は`$ npm run タスク名`で、`コマンド`を実行可能

```json
"scripts": {
    "タスク名": "コマンド"
}
```

## Runby on Rails (& Jekyll)

| コマンド                   | 機能                                                |
| -------------------------- | --------------------------------------------------- |
| `bundle install`           | Gemfile 中の gem をインストール                     |
| `bundle update`            | Gemfile 中の gem のバージョンを更新<br>注意して実行 |
| `bundle exec jekyll serve` | ローカルでサイト実行                                |

## Gatsby

| コマンド                     | 機能                                                                 |
| ---------------------------- | -------------------------------------------------------------------- |
| `gatsby develop`             | ローカルでサイト実行                                                 |
| `gatsby build; gatsby serve` | ローカルでサイトをビルドして実行<br>より実際に近いサイトを生成できる |

## AWS CLI

- [公式ドキュメント](https://aws.amazon.com/jp/cli/)
- `aws s3 ls --no-sign-request s3://<ディレクトリorファイル>`
- `aws s3 sync --no-sign-request s3://<ディレクトリ> <ディレクトリ名>`
