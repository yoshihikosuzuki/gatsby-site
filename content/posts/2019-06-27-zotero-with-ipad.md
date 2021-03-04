---
title: Zotero で管理している PDF を iPad/モバイル端末から閲覧・編集する
date: "2021-03-04"
template: "post"
draft: false
slug: "zotero-with-ipad"
category: "Life style"
tags:
  - "Life style"
  - "Zotero"
description: "なるべく特定のソフトウエアに依存せずに、Zotero をパソコンとモバイル端末の両方でどう使うか。"
---

文献管理ソフトの 1 つであるところの [Zotero](https://www.zotero.org/) は PC 版だと使いやすいのだけど、別の端末、特に Zotero 公式アプリが (まだ) 提供されていないモバイル端末などと同期させようとすると少々面倒な話になってくる。Zotero が他の文献管理ソフトと比べて

## 前提

1. PC (Mac, Windows) で Zotero を使って論文などの PDF を管理している
2. iPad などのタブレットやモバイル端末からもその PDF (+ アノテーション) にアクセスしたい
3. Zotero Storage (アカウントを作ると 300MB まで無料の同期用クラウドストレージがもらえるやつ) を使わない
4. 特定の PDF リーダに対してこだわりがない、むしろデバイスのデフォルトの PDF リーダを使いたい

最後の 2 つの条件の理由は、一言で言うと「特定のソフトウエアに依存したくない」ということだ。つまり、

- Zotero Storage を使うと確かに楽かもしれないが、Zotero Storage のサービスの及ぶ範囲でしかファイルを共有することはできない (しかも現実的な量のファイルを同期するには有料となる)
- Zotero 以外の文献管理ソフトにありがちな内蔵 PDF リーダも、確かに便利なのかもしれないが、その特定のソフトに対する依存性を強めてしまい (注釈の形式など)、ふと別のデバイスでも使いたくなった時にサポートしていない (もしくはわざわざアノテーション付き PDF を別に出力してそれを移動する必要がある)、なんてことになりがち

## Zotfile + Google Drive + Acrobat Reader

まず、Zotero Storage を使わないので、別の何らかの方法で PC 上のファイルを共有する必要がある。ここでは Google Drive を挙げているが、以下の 3 点を満たしていればどんなものでもよい：

- ファイルを保存するための十分な容量がある
- パソコン上のフォルダの中身を自動で同期してくれる
- モバイル側で使いたい PDF リーダ (ここでは Acrobat Reader) がそのストレージサービスにアクセスできる (Acrobat Reader なら OneDrive, Google Drive, Dropbox が簡単に紐付けできる)

そして、Zotero とクラウドストレージサービスをつなげるために [Zotfile](http://zotfile.com/) が必要になる。具体的なインストールと設定のやり方は [公式のインストールマニュアル](http://zotfile.com/#how-to-install--set-up-zotfile) や [このガイド](https://www.researchgate.net/publication/325828616_Tutorial_The_Best_Reference_Manager_Setup_Zotero_ZotFile_Cloud_Storage) に従う。ただし、`Zotfile Preferences -> General Settings -> Use subfolder defined by` の設定だけは私はガイドと違って `/%c` にしている (こうすると Google Drive 等に同期されるファイルのディレクトリ構造を Zotero のコレクション構造と同じにできる)。これを済ませると、

1. [各アイテムについて一度だけ] PC の Zotero で同期したいアイテムを選択して、右クリック → `Manage Attachments` → `Rename Attachments` (一度だけでよいが複数回やっても構わないので、アイテムを全選択して全部一気にやると楽)
2. iPad で Acrobat Reader から Google Drive 経由で同期されたファイルを開く

ということができるようになって、PC/iPad のどちらでアノテーションを付けても、特に何もすることもなくもう片方に反映されるようになる (クラウドサービスの同期が完了するまでのタイムラグはある)。ただし、注意点があって、

- 同期するアイテムは親アイテム (=メタデータ) を持っている必要がある (一覧表示で左端に三角マークがあれば持っている)。もしなければ、右クリック → `Create Parent Item...` で親アイテムを作っておく
- Zotfile で `Use subfolder defined by` を `/%c` (上述) にしている場合、同じアイテムが複数コレクションに属していると、どちらか一つのフォルダにしか追加することができず、アイテムを同期するたびにどのフォルダを選ぶか聞かれるので非常に面倒。なので、すべてのアイテムはそれぞれ1つのコレクションだけに属するようにして、複数のコレクションにまたがるアイテムはタグを使って管理する (ちなみに Zotero の左下にはタグの一覧を表示することができる)

これらに気をつければ、(いちいち右クリック → `Rename Attachments` は面倒なので正直どうにかしたいものの) 十分快適にデバイス間同期ができる。無料、高速、なるべく簡潔、を同時に満たす現時点で唯一のやり方だと思う。
