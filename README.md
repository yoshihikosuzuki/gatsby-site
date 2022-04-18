# Static site

**NOTE (2022-04-18)**: 現在の Gatsby のバージョンは v4 だが、このサイトは v2 を使い続けている。管理者のフロントエンド力の足りなさにより、v4 にアップグレードできないでいる。Netflify でのデプロイは `.nvmrc` で古い Node のバージョンを指定することで動かし続けているが、ローカルでは `$ gatsby [develop|build]` できなくなっている。他の (自力で管理する必要のない) サービスに移行するべきか。。？

## 使用サービス

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

試行錯誤した結果、ページ中にはラスター画像 + リンク先で Plotly で出力した HTML を表示、という方式を採用した。最初は HTML を記事に埋め込みたかったが、結果的にはサイズの大きいプロットはロードに時間がかかってしまうので、むしろこのやり方が良かったのではと思ってる。

HTML と画像は`static/plotly/`以下に置くことにした。`gatsby-remark-copy-linked-files`を使うと`content/posts/記事名/`に`index.md`と一緒に置けるが、ビルド時間が長くなったり、(少なくとも gatsby-starter-lumen では) ポストの URL をうまく扱えなかったりしたので断念。

`gatsby-plugin-catch-links`プラグインが必要。

1. Plotly で HTML 形式のプロットを出力
1. HTML の`head`に`<script src="https://cdn.plot.ly/plotly-latest.min.js">`を追記
1. プロットの画像をスクリーンショットなりで生成
1. HTML と画像ファイルの両方を上の`static/plotly`ディレクトリに置く
1. マークダウンのプロットを挿入したい場所に`<a href="/plotly/HTMLファイル名" target="_blank" rel="noopener noreferrer"><img src="/plotly/画像ファイル名"></a>`と記述

将来的にはマークダウンの frontmatter に`plotly: true`とするとその記事の`head`で`plotly.js`を読み込み、interactive plot を記事中に挿入するようにしたいが、どうも React と相性が悪くて面倒そう。

## Netlify を使う際の Algolia のキーの扱い方

通常 Algolia のキーを`.env`ファイル中で指定するが、admin key は GitHub にアップロードしたくない。しかしアップロードしないと Netlify から見えずビルドできない。

そこで、Netlify のデプロイ設定画面で、ビルドに使用する環境設定を直に定義する。`.env`にあるものをそのまま列挙すればよい。
