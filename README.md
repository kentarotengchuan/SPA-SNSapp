# laravel-vanilla

# 構築手順

## 1    
プロジェクトディレクトリ内で「docker-compose up -d --build」を実行し、フロントエンドとバックエンドを構築。
## 2
バックエンドのシェルに入る。「docker-compose exec backend bash」
## 3
マイグレーションとシーディングを実行。「php artisan migrate:fresh --seed」
## 4
シンボリックリンクを作成。「php artisan storage:link」

