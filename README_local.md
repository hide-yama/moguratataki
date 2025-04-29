# モグラ叩きゲーム（Whack-a-Mole）

Webブラウザで遊べるシンプルなモグラ叩きゲームです。

## 概要

- 3×3の穴からランダムに出現するモグラをクリックしてスコアを稼ぐリアクションゲームです。
- ゴールデンモグラ（高得点）や爆弾モグラ（減点）も登場します。
- 制限時間内にできるだけ多くのスコアを獲得しましょう。
- ハイスコアはローカルストレージに保存されます。

## デモ

![ゲーム画面イメージ](./src/images/normal.png)

## セットアップ

1. リポジトリをクローン

```bash
git clone https://github.com/hide-yama/moguratataki.git
cd moguratataki
```

2. 依存パッケージをインストール

```bash
npm install
```

3. 開発サーバーを起動

```bash
npm run dev
```

4. ブラウザで `http://localhost:5173` を開く

## 使い方

- 「Start Game」ボタンでゲーム開始
- 穴から出てくるモグラをクリックしてスコアを稼ぐ
- ゴールデンモグラは高得点、爆弾モグラは減点
- 制限時間（15秒）が0になるとゲーム終了
- 「Play Again」で再挑戦

## 技術構成

- React (TypeScript)
- Vite
- Tailwind CSS
- Context API（状態管理）

## ディレクトリ構成

```
├── src/
│   ├── components/   # UIコンポーネント
│   ├── context/      # ゲーム状態管理
│   ├── images/       # モグラ画像
│   ├── types/        # 型定義
│   └── utils/        # ユーティリティ
├── public/
├── package.json
└── ...
```

## ライセンス

MIT 