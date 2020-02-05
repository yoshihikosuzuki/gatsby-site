# Static site

with

- [Gatsby](https://www.gatsbyjs.org/)
- [gatsby-starter-lumen](https://github.com/alxshelepenok/gatsby-starter-lumen)
- [Netlify](https://app.netlify.com/sites/yoshihiko-suzuki/overview)
  - 自動デプロイ
- [Algolia](https://www.algolia.com/apps/WX370V53Q1/dashboard)
  - サイト内検索
- [Simple Icons](https://simpleicons.org/)
  - GitHub や Twitter のアイコン

## 開発の流れ

- `$ gatsby develop`: マークダウン等の変更がすぐに反映されるが、反映されない変更があったり、実際のサイトの挙動と異なることがある
- `$ gatsby clean; gatsby build; gatsby serve`: Production ディレクトリ (`public/`) を生成する。`clean`はしなくてもよいが、その場合変更が反映されない可能性がある
  - `gatsby-config.js`で`gatsby-plugin-algolia`プラグインが指定されていると、ビルドのたびに Algolia の検索インデックスが生成される。キーも消費するので、頻繁にビルドする場合は先にコメントアウトしておく
- GitHub にプッシュすると自動で Netlify でデプロイされる

## Plotly プロットの載せ方

試行錯誤した結果、ページ中にはラスター画像 + リンク先に HTML の interactive plot の方式を採用した。

1. Plotly で HTML 形式のプロットを出力
2. HTML の`head`に`<script src="https://cdn.plot.ly/plotly-latest.min.js">`を追記
3. プロットの画像をスクリーンショットなりで生成
4. HTML と画像ファイルの両方を`static/plotly`ディレクトリに置く
5. マークダウンのプロットを挿入したい場所に`<a href="/plotly/HTMLファイル名" target="_blank" rel="noopener noreferrer"><img src="/plotly/画像ファイル名"></a>`と記述

## Netlify を使う際の Algolia のキーの扱い方

通常 Algolia のキーを`.env`ファイル中で指定するが、admin key は GitHub にアップロードしたくない。しかしアップロードしないと Netlify から見えずビルドできない。

そこで、Netlify のデプロイ設定画面で、ビルドに使用する環境設定を直に定義する。`.env`にあるものをそのまま列挙すればよい。
