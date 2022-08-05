---
title: Zotero で管理している PDF を iPad/モバイル端末から閲覧・編集する
date: "2019-06-27"
template: "post"
draft: false
slug: "zotero-with-ipad"
category: "Life style"
tags:
  - "Life style"
  - "Zotero"
description: "なるべく特定のソフトウエアに依存せずに、Zotero をパソコンとモバイル端末の両方でどう使うか。"
---

文献管理ソフトの 1 つであるところの [Zotero](https://www.zotero.org/) は他のサービス (Mendelay, ReadCube Papers, etc.) と比べて

1. 無料
2. 動作が軽い
3. 依存関係が少ない (= PDF の閲覧・編集・同期のいずれも任意の外部サービスを使うことができる)

という利点があるが、各所で指摘されているようにモバイル端末との同期がかなり厳しい。ここでは私が Mac と iPad の間での PDF 同期をするために行き着いた方法を書く。

## Zotfile + Google Drive + Acrobat Reader

まず、Zotero Storage を使わないので、別の何らかの方法で PC 上のファイルを共有する必要がある。ここでは Google Drive を挙げているが、以下の 3 点を満たしていればどんなものでもよい：

- ファイルを保存するための十分な容量がある
- パソコン上のフォルダの中身を自動で同期してくれる
- モバイル側で使いたい PDF リーダ (ここでは Acrobat Reader) がそのストレージサービスにアクセスできる (Acrobat Reader なら OneDrive, Google Drive, Dropbox が簡単に紐付けできる)

そして、Zotero とクラウドストレージサービスをつなげるために [Zotfile](http://zotfile.com/) が必要になる。具体的なインストールと設定のやり方は [公式のインストールマニュアル](http://zotfile.com/#how-to-install--set-up-zotfile) や [このガイド](https://www.researchgate.net/publication/325828616_Tutorial_The_Best_Reference_Manager_Setup_Zotero_ZotFile_Cloud_Storage) に従う。これを済ませると、

1. [各アイテムについて一度だけ] PC の Zotero で同期したいアイテムを選択して、右クリック → `Manage Attachments` → `Rename Attachments` (一度だけでよいが複数回やっても構わないので、アイテムを全選択して全部一気にやると楽)
2. iPad で Acrobat Reader から Google Drive 経由で同期されたファイルを開く

ということができるようになって、PC/iPad のどちらでアノテーションを付けても、特に何もすることもなくもう片方に反映されるようになる (クラウドサービスの同期が完了するまでのタイムラグはある)。ただし、注意点があって、

- 同期するアイテムは親アイテム (=メタデータ) を持っている必要がある (一覧表示で左端に三角マークがあれば持っている)。もしなければ、右クリック → `Create Parent Item...` で親アイテムを作っておく

これと、いちいち右クリック → `Rename Attachments` しないといけない点 (と次セクションで述べる点) を除けば、十分快適にデバイス間同期ができる。無料、高速、なるべく簡潔、を同時に満たす現時点で唯一のやり方だと思う。

## Zotero でのファイル構造と、同期されるファイル構造について

上のやり方でファイルを同期させることができたが、ガイドに従ってその通りに設定をしていると Zotero ライブラリ内のすべての PDF が Google Drive の指定したフォルダにまとめて保存されることになる。Zotero では (おそらく) コレクションやタグを使ってアイテムを分類しているので、iPad でも同じ構造を保ったまま同期したいと感じるのは自然だろう。実際、Zotfile Preferences → `General Settings` → `Use subfolder defined by` を `/%c` にしてチェックを入れればコレクションごとにフォルダが作られて同期される。しかしこのやり方には大きな問題があって、

- 同一アイテムが複数コレクションに属していると、どちらか一つのフォルダにしか追加することしかできない

これはディレクトリ構造が木構造である以上どうしようもない (シンボリックリンクを使えばいけるだろうが現状ではそのような機能はない)。仕方がないので私は「構造を持たせた文献管理は Mac で、読むときは (全ファイルから検索して) iPad で」というように使い分けることで理性を保っている。

## (余談) コレクションとタグについて (結論：コレクションは使わない)

これも各所で散々言われていることだが、コレクションとタグの使い分けが曖昧すぎる、というか違いが分からない。私は以下の結論に落ち着いた：

- コレクションは一切使わず、タグだけを使う
- 左下にタグ一覧は表示できるがそれだけでは使いづらすぎるので、高度な検索 (上の方にある虫眼鏡ボタン) から検索条件を保存したものを使う。保存された検索条件はコレクションと同じように表示されて使用できる (公式も "smart collection" だと[言っている](https://www.zotero.org/support/collections_and_tags#saved_searches))。コレクションに対する「未整理のアイテム」に相当するものも、[このやり方](https://forums.zotero.org/discussion/49888/how-to-view-untagged-items)で作ることができる。
