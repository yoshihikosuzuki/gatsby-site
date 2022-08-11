---
title: 使用頻度の低いコマンド置き場
template: "memo"
slug: "commands"
description: "たまに必要になるけど覚えているほど使用頻度が高くないコマンドやショートカットキーをメモ代わりに書き留めておく場所。"
---

## 目次

```toc

```

### [Homebrew](https://brew.sh/index_ja)

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

### Git & GitHub

- [ローカルのディレクトリを GitHub に追加する](https://docs.github.com/ja/get-started/importing-your-projects-to-github/importing-source-code-to-github/adding-locally-hosted-code-to-github):

```bash
# あらかじめ GitHub で新規レポジトリを作成しておく
git init -b main
git add . && git commit -m "initial commit"
git remote add origin レポジトリURL
git remote -v
git push -u origin main
```

### [PyPI パッケージ登録](https://packaging.python.org/en/latest/tutorials/packaging-projects/)

- [TestPyPI](https://test.pypi.org/), [PyPI](https://pypi.org/) にアカウントを作成し、必要なパッケージをインストールしておく:

```bash
python3 -m pip install --upgrade build twine
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

### Perl

| コマンド            | 機能                     |
| ------------------- | ------------------------ |
| `cpan モジュール名` | モジュールをインストール |

### Runby on Rails (& Jekyll)

| コマンド                   | 機能                 |
| -------------------------- | -------------------- |
| `bundle install`             | Gemfile 中の gem をインストール |
| `bundle update` | Gemfile 中の gem のバージョンを更新<br>注意して実行 |
| `bundle exec jekyll serve` | ローカルでサイト実行 |

### Gatsby

| コマンド                     | 機能                                                                 |
| ---------------------------- | -------------------------------------------------------------------- |
| `gatsby develop`             | ローカルでサイト実行                                                 |
| `gatsby build; gatsby serve` | ローカルでサイトをビルドして実行<br>より実際に近いサイトを生成できる |
