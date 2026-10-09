# Questudy v1.0

> 現実の勉強でしか攻撃できない学習RPG。

勉強を始めるまでが面倒な大学生向けの、学習タイマー × RPGアプリです。学習クエストを完了するとEXPとバトル力を獲得し、レベルアップや敵の攻略に使用できます。

## 実装済み機能

- 初回プロフィール登録（レベル1から開始）
- 学習クエストの作成・編集・一覧・削除
- 集中タイマーの開始・一時停止・中断
- 再読み込み後も継続するタイマー
- EXP獲得、レベルアップ、バトル力獲得
- 敵への攻撃、ダメージ・撃破演出、次の敵への進行
- 日別学習履歴、週間グラフ、連続学習日数
- LocalStorageへの自動保存とv0.2データの移行
- 発表デモモードのON/OFF
- PC・スマートフォン対応

## 起動方法

Node.js 18以上をインストールし、VS Codeのターミナルから実行します。

```bash
npm install
npm run dev
```

表示された `http://localhost:5173` をブラウザで開いてください。

## GitHub Pagesで公開する方法

このプロジェクトはGitHub Pages用に設定済みです。`main`ブランチへ更新を送ると、GitHub Actionsが自動でビルドと公開を行います。

1. GitHubでリポジトリを作成し、このフォルダの内容を`main`ブランチへ送信する
2. リポジトリの **Settings → Pages** を開く
3. **Source** を **GitHub Actions** に設定する
4. 上部の **Actions** で「Deploy Questudy to GitHub Pages」が完了するまで待つ
5. `https://ユーザー名.github.io/リポジトリ名/`を開く

`acdctaiki/Qestudy`へ公開する場合のURLは、次の形式です。

```text
https://acdctaiki.github.io/Qestudy/
```

画面が古い場合は、ブラウザで `Ctrl + F5` を押してください。学習データは各ブラウザのLocalStorageに保存されるため、GitHubへ個人の学習記録が送信されることはありません。

### 公開前の確認

```bash
npm ci
npm run build
npm run preview
```

`dist`フォルダは自動生成物なので、GitHubへ直接登録する必要はありません。

## 4人での担当案

- A：クエスト管理（作成・編集・削除・入力検証・カテゴリ機能）
- B：タイマー・学習履歴（永続化・完了処理・日別集計）
- C：成長・バトル（EXP・レベル・敵・演出・バランス）
- D：データ・画面統合（保存・連続日数・週間グラフ・レスポンシブ・公開）

全員が担当機能のUI、ロジック、動作検証を行います。GitHubでは担当ごとのブランチを作成し、Pull Requestで統合してください。

## 主な構成

```text
src/
├─ components/        画面・UI
├─ hooks/             データ管理とタイマー
├─ utils/             計算・保存処理
├─ App.jsx            画面遷移と機能統合
├─ main.jsx
└─ styles.css
```
