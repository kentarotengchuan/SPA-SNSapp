# line風疑似SNSアプリ

# 構築手順

## 1
「cp ./backend/.env.example ./backend/.env」で環境をコピー。
## 2   
プロジェクトディレクトリ内で「docker-compose up -d --build」を実行し、フロントエンドとバックエンドを構築。
## 3
バックエンドのシェルに入る。「docker-compose exec backend bash」
## 4
マイグレーションとシーディングを実行。「php artisan migrate:fresh --seed」
## 5
シンボリックリンクを作成。「php artisan storage:link」

