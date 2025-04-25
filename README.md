# SPA仕様のSNSアプリ

# 構築手順

## 1
プロジェクトディレクトリ内で「cp ./backend/.env.example ./backend/.env」で環境をコピー。
## 2
「cd frontend」でフロントエンドディレクトリに移動し、「npm install」を実行してViteをインストール。
## 3
「npm run build」を実行して、フロントエンドのファイル構成を最適化する。
## 4
プロジェクトディレクトリ内で「docker-compose up -d --build」を実行し、フロントエンドとバックエンドを構築。
## 5
バックエンドのシェルに入る。「docker-compose exec backend bash」
## 6
マイグレーションとシーディングを実行。「php artisan migrate:fresh --seed」
## 7
ブラウザで「localhost:3000」にアクセスすることでアプリを表示。

# 使用技術
PHP 8.2.28

Laravel Framework 10.48.29

JavaScript

MySQL　8.0.32

Mailpit (v1.21.7)

Vite 6.3.3

# ポートごとの機能
localhost:3000 ・・・フロントエンド

localhost:8000 ・・・バックエンド(Laravel)

localhost:8080 ・・・phpMyAdmin（DB情報にアクセス）

localhost:8025 ・・・MailPit（ローカル環境では認証メールはここに表示される）

# アプリ作成の目的
・フロントエンドとバックエンドを完全に切り分けたSPA仕様のアプリを作成して、CORに対する理解を深めるため。

・Vanilla.jsを採用し、非同期処理やイベント移譲、モジュール構成といったJavaScriptの基礎的な知識を確認するため。

・Viteを採用して、バンドラーの利用方法を確認するため。

# 今後追加予定の実装
・TypeScriptを採用し、フロントエンドを総じて書き換えることで、型の安全性の保障による安定定・自身のTypeScriptの知識を確認したい。

・現在CSSを一つのファイルに一元化しているが、これをコンポーネント化することによって、今後のプロジェクトの複雑化を見越した実装をしたい。CSSコンポーネント化はViteの採用による恩恵を受けられる項目なので積極的に採用したい。
