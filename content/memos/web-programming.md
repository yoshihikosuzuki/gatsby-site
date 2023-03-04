---
title: "Web プログラミング(フロントエンド)覚書"
template: "memo"
slug: "web-programming"
description: "フロントエンド技術のまとめ場所。"
---


## CSS, Sass, JS

- [JS ライブラリ、jQuery プラグインまとめ](http://coliss.com/articles/build-websites/operation/javascript/best-javascript-libs-jquery-plugins-2016.html)
- [CSS セレクタのチートシート](https://webliker.info/css-selector-cheat-sheet/)
- [Material-UI](https://material-ui.com/): `$ npm install --save @material-ui/core`
- Node と Sass を使うなら`$ npm install --save-dev node-sass`

## Electron

### Hello, World

1. `$ npm init -y`で新規プロジェクトを作成
2. [公式 Quick Start](https://electronjs.org/docs/tutorial/quick-start) に従って`main.js`と`index.html`をコピペ
   - `package.json`中の`"main"`は上の`main.js`に変更しておく
3. `$ electron .`で実行
   - npm script で`"start": "electron ."`としておけば、`$ npm start`でも OK
4. アプリケーション実行ファイルの生成には [electron-packager](https://github.com/electron/electron-packager) を使う(`$ npm install -g electron-packager`)

### Visual Studio Code で開発・デバッグできるようにする

1. (グローバルではなく)レポジトリに Electron をインストール
2. VSC に拡張機能`Debugger for Chrome`をインストール
3. 一度実行(F5)して`.vscode/launch.json`生成後、[公式ドキュメント](https://electronjs.org/docs/tutorial/debugging-main-process-vscode)に従って内容を変更し、再度実行
   - ビルドはしてくれないので、コードを変更したらターミナルでビルドし直してから再度実行

### Electron 実行時の処理の流れ

1. `electron DIR_NAME`すると、`DIR_NAME/package.json`の`"main"`で指定されている JS ファイル(`main.js`)が Main process として実行される
2. `app.on('ready', …)`の`createWindow`でウィンドウが生成される
3. `createWindow`の中で、`electron.BrowserWindow`インスタンスの`loadURL()`で`index.html`が読み込まれる
4. `index.html`で読み込まれる JS ファイルが Renderer process として実行される

### Main-Renderer プロセス間のやり取り

- プロセス間通信(IPC)を使う
- `ipc`は現在の API には無く、代わりに [ipcMain](https://electronjs.org/docs/api/ipc-main)/[ipcRederer](https://electronjs.org/docs/api/ipc-renderer) を使う(cf. [Electron の IPC をまとめる](https://qiita.com/gcmae/items/cb6eb18be2f4ffae60b5))
  - `<channel>`は文字列、`<listerner>`は`(event, arg) => {...}`という関数
    - `event.returnValue`に代入すれば同期的に返信(送信側の返り値になる)
    - `event.sender.Send(<channel>[, <args>])`で非同期的に返信(再度`on`で受信)

| Sender -> Receiver (非同期通信) | Method in Sender                                        | Method in Receiver                      |
| ------------------------------- | ------------------------------------------------------- | --------------------------------------- |
| Main -> Renderer                | `<BrowserWindow>.webContents.send(<channel>[, <args>])` | `ipcRenderer.on(<chennel>, <listener>)` |
| Renderer -> Main                | `ipcRenderer.send(<channel>[, <args>])`                 | `ipcMain.on(<channel>, <listener>)`     |

### 設定ファイル

- [electron-store](https://github.com/sindresorhus/electron-store) を使う
- デフォルトでは`/Users/USER_NAME/Library/Application\ Support/APP_NAME/config.json`に保存される

## Webpack

- `$ npm install --save-dev webpack webpack-cli`
- [webpack 4 入門](https://qiita.com/soarflat/items/28bf799f7e0335b68186)
- 複数ファイルに分割して開発された JS, CSS, etc. を 1 つの JS ファイルにまとめる(**モジュールバンドル**)
- Electron と使う場合は`target:electron-main`や`target: electron-renderer`を指定しないとエラーになる
- ローダー
  - `$ npm install --save-dev css-loader mini-css-extract-plugin`: CSS
  - `$ npm install --save-dev sass-loader node-sass`: SCSS
  - `$ npm install --save-dev babel-loader`: Babel

## Babel

- `$ npm install --save-dev @babel/core @babel/preset-env`
  - React と使う場合は `$ npm install --save-dev @babel/preset-react`も
- トランスパイラ
  - 変換したい言語に合わせた**プラグイン**をコンフィグファイル(`.babelrc`等)中に指定する必要がある
  - React のようなフレームワークには必要なプラグイン集合が**プリセット**で用意されていて、簡単に指定できる
- Webpack と使う場合は、`webpack.config.js`で`babel-loader`をローダーに指定して、プリセットの指定は以下のどちらかで行う(cf. [Babel の presets を設定する 2 つの方法](https://qiita.com/tmiki/items/86abc565d06ced78d968))
  - `webpack.config.js`に書く場合は`options`で指定する
  - `.babelrc` (not `babel.config.js`)に書く(こちらの方が複数の対象について 1 つで済むため良さそう)
- `webpack.config.js`をトランスパイルしたい場合は、`$ npm install --save-dev @babel/register`して、`webpack.config.js`を`webpack.config.babel.js`に変える

## React + Redux

- `$ npm --save install react react-dom redux react-redux`
- [React+Redux 入門](https://qiita.com/erukiti/items/e16aa13ad81d5938374e)
- [Example: Todo List](https://redux.js.org/basics/example)
- Redux で非同期処理がしたい場合は Redux Middleware を使う
