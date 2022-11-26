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

## Git & GitHub

### ローカルのディレクトリを GitHub に追加する

- [公式ドキュメント](https://docs.github.com/ja/get-started/importing-your-projects-to-github/importing-source-code-to-github/adding-locally-hosted-code-to-github)

```bash
# あらかじめ GitHub で新規レポジトリを作成しておく
git init -b main
git add . && git commit -m "initial commit"
git remote add origin レポジトリURL
git remote -v
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

## PyPI パッケージ登録

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

- [PyO3](https://github.com/PyO3/pyo3) で python パッケージの作成

```bash
maturin new パッケージ名   # もしくは maturin init
...
maturin build
pip install target/wheels/*.whl
```

## Perl

| コマンド            | 機能                     |
| ------------------- | ------------------------ |
| `cpan モジュール名` | モジュールをインストール |

## Runby on Rails (& Jekyll)

| コマンド                   | 機能                 |
| -------------------------- | -------------------- |
| `bundle install`             | Gemfile 中の gem をインストール |
| `bundle update` | Gemfile 中の gem のバージョンを更新<br>注意して実行 |
| `bundle exec jekyll serve` | ローカルでサイト実行 |

## Gatsby

| コマンド                     | 機能                                                                 |
| ---------------------------- | -------------------------------------------------------------------- |
| `gatsby develop`             | ローカルでサイト実行                                                 |
| `gatsby build; gatsby serve` | ローカルでサイトをビルドして実行<br>より実際に近いサイトを生成できる |


## AWS CLI

- [公式ドキュメント](https://aws.amazon.com/jp/cli/)
- `aws s3 ls --no-sign-request s3://<ディレクトリorファイル>`
- `aws s3 sync --no-sign-request s3://<ディレクトリ> <ディレクトリ名>`
