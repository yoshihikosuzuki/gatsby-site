---
title: ローカルからリモート Jupyter を一つのコマンド/アプリケーションで使う (Mac)
date: "2020-02-11"
template: "post"
draft: false
slug: "remote-jupyter"
category: "Life Style"
tags:
  - "Life style"
  - "Jupyter"
  - "Mac"
description: "ローカルからリモート Jupyter を使うための一通りの処理を行ってくれるアプリケーションを作る。"
---

## 目次

```toc
```

以下のコードは[この Gist](https://gist.github.com/yoshihikosuzuki/a0b89404063368ddaabc30c8173d2a7d) にも上げてある。

## 目的

最近では JupyterLab とか Visual Studio Code とか便利なサービスも増えてきたが、動作が重かったりしてなんだかんだいまだにバニラの Jupyter をブラウザで開いている、という人はそれなりにいるんじゃないかと思う。

計算資源だったりの観点から、リモートの Jupyter を (起動はサーバで行って) ローカルのブラウザで開くという需要はかなりあって、実際それは SSH Forwarding を使うことで実現できる。

この SSH Forwarding を使った、ローカルからのリモート Jupyter の接続方法については数多くの記事があるが、そのほとんどが

1. リモートで `$ jupyter notebook` コマンドを実行して Jupyter を起動
1. ローカルで `$ ssh ...` コマンドを実行してポートフォワーディングしてブラウザを開くと Jupyter の画面が現れる

という2段階のステップを取っている。最終的にやりたいのは「ブラウザでリモート Jupyter のタブを開くこと」だけなのに、これを毎回やるのは正直面倒くさい。さらに言うなら、上のコマンド打ち込むためにターミナルを開くことすら本質的ではない。

この記事では、まずこの処理をすべて行うスクリプトを作って、さらに Mac の Automator を使ってそのスクリプトを実行するアプリケーションを作る。これによって例えば、ターミナル等を経由しなくても Spotlight からすぐにリモートの Jupyter を起動できる。Windows/Linux では試していないが、スクリプトまではある程度共通して使えると思う。

## 前提知識

- SSH ポートフォワーディングを使ったリモート Jupyter の使い方
- Automator の基本的な使い方

## 本題

例えば以下のページを参考に、あらかじめリモートで Jupyter の設定をしておく。

- [Running a notebook server](https://jupyter-notebook.readthedocs.io/en/latest/public_server.html)

この時点で、以下のような流れでローカルからリモートの Jupyter に接続できるようになっているはず。

1. リモートで `$ jupyter notebook`
1. ローカルで `$ ssh -N -f -L ローカルでのポート番号:localhost:リモートのJUPYTERで設定したポート番号 ホスト名`
1. ローカルのブラウザで `http://localhost:ローカルでのポート番号` にアクセス

これらを全部やってくれるスクリプトを書いて、ローカルのホームディレクトリに `remote_jupyter.sh` という名前で保存する (リモートのログインシェルの設定ファイルを `$HOME/.bash_profile` でハードコードしていたりするので、異なる場合は適宜修正する)：

```bash
HOST_NAME=ホスト名
PORT_ID_LOCAL=ローカルでのポート番号
PORT_ID_REMOTE=リモートのJUPYTERで設定したポート番号
# Specify "direct" or "sge"
EXEC_TYPE="sge"

# Commands for checking existing jupyter process and for running jupyter
# Put `run_jupyter.sh` at the home directory in the remote environment if using a job scheduler
if [ ${EXEC_TYPE} = "direct" ]; then
    CHECK_JUPYTER="ps x"
    RUN_JUPYTER="nohup jupyter notebook >/dev/null 2>&1 &"
elif [ ${EXEC_TYPE} = "sge" ]; then
    CHECK_JUPYTER="qstat"
    # Options other than those specified here should be given in the remote file
    RUN_JUPYTER="qsub -N jupyter_nb -pe smp 4 -l hostname=${HOST_NAME} run_jupyter.sh"
else
    echo "Invalid value of `EXEC_TYPE`: ${EXEC_TYPE}"
    exit 1
fi

# Open the port
lsof -s TCP:LISTEN -i :${PORT_ID_LOCAL} | awk 'NR > 1 {print $2}' | uniq | while read PID; do kill -KILL ${PID}; done

# Run jupyter if not existing
N_JUPYTER_PROC=$(ssh ${HOST_NAME} "${CHECK_JUPYTER}" | grep "jupyter" | wc -l)
if [ ${N_JUPYTER_PROC} = 0 ]; then
    ssh ${HOST_NAME} "source ~/.bash_profile; ${RUN_JUPYTER}"
    sleep 10
fi

# Start connection and then open a chrome tab
ssh -N -f \
    -L localhost:${PORT_ID_LOCAL}:localhost:${PORT_ID_REMOTE} \
    -o PermitLocalCommand=yes \
    -o LocalCommand="open -a '/Applications/Google Chrome.app' http://localhost:${PORT_ID_LOCAL}" \
    ${HOST_NAME} \
&
```

このスクリプトには 5 行目の `EXEC_TYPE` で Jupyter の実行のしかたを選べる。デフォルトの `EXEC_TYPE="sge"` だと、SGE でジョブとして投げて実行する (当然だがリモート環境に SGE がインストールされている必要がある; スクリプトを適宜修正すれば SLURM なども使える)。この場合、リモートのホームディレクトリに以下のスクリプトファイルを `run_jupyter.sh` という名前で置いておく必要がある (SGE のオプションは適宜変更する)：

```bash
#!/bin/bash
#$ -o sge.log
#$ -j y
#$ -S /bin/bash
#$ -cwd
#$ -V
#$ -q all.q

jupyter notebook
```

ジョブの CPU 数は最初の `remote_jupyter.sh` の `-pe smp 4` の部分で指定できる。上のままだと 4 コア。

一方で、`EXEC_TYPE="direct"` に変更すると、リモートで Jupyter をシェルから直接実行する (SSH ログインして `$ jupyter notebook` を実行するのと同じ)。

この時点で、ローカルのターミナルのホームディレクトリで以下のコマンドを実行するとブラウザが起動して Jupyter のタブが開くようになっているはず：

```bash
$ ./remote_jupyter.sh
```

あとは Automator を開いて、「アプリケーション」 -> 「シェルスクリプトを実行」から以下のコマンドを指定してアプリケーションを例えば `jupyter_remote.app` という名前で作成すれば、Spotlight -> `jupyter_remote` (実際には Mac がアプリケーション名を補完してくれるので `ju` くらいで十分) と打ち込むだけでブラウザで Jupyter のタブが開くようになる。

```bash
nohup $HOME/remote_jupyter.sh > /dev/null 2>&1 &
```

## (余談) 何をやっているのか？

上のスクリプト (`remote_jupyter.sh`) で何をしているのかを少しだけ書く。

まず、

```bash
lsof -s TCP:LISTEN -i :${PORT_ID_LOCAL} | awk 'NR > 1 {print $2}' | uniq | while read PID; do kill -KILL ${PID}; done
```

の部分では、変数 `PORT_ID_LOCAL` で指定されたポート番号がローカルで使用済みの場合に、SSH 接続する前にそのポートを開放する。これは例えば今回のスクリプトを使って複数回 Jupyter を起動したい場合に必要で、前回の SSH 接続が残ったままで新しい SSH 接続ができなくなることを防ぐ。

その後、

```bash
N_JUPYTER_PROC=$(ssh ${HOST_NAME} "${CHECK_JUPYTER}" | grep "jupyter" | wc -l)
if [ ${N_JUPYTER_PROC} = 0 ]; then
    ssh ${HOST_NAME} "source ~/.bash_profile; ${RUN_JUPYTER}"
    sleep 10
fi
```

の部分で、リモートですでに実行されている Jupyter プロセスもしくはジョブがないか調べる。もしあれば何もせず、既存のものをそのまま使用する。もしなければ、新しく Jupyter を実行する。(`sleep 10` 不要かも。)

最後の、

```bash
ssh -N -f \
    -L localhost:${PORT_ID_LOCAL}:localhost:${PORT_ID_REMOTE} \
    -o PermitLocalCommand=yes \
    -o LocalCommand="open -a '/Applications/Google Chrome.app' http://localhost:${PORT_ID_LOCAL}" \
    ${HOST_NAME} \
&
```

この部分はよくある Jupyter SSH Forwarding のだいたいそのままで、接続後に Chrome を開くようにしている。
