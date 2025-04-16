# ベースイメージは公式の PHP 8.x FPM + Debianベース
FROM php:8.2-fpm

# 必須のシステムパッケージとPHP拡張をインストール
RUN apt-get update && apt-get install -y \
    git curl zip unzip libzip-dev libpng-dev libonig-dev libxml2-dev \
    && docker-php-ext-install pdo_mysql zip

# Composerの公式イメージからコピー（速くて安全）
COPY --from=composer:latest /usr/bin/composer /usr/bin/composer

# 作業ディレクトリ設定
WORKDIR /var/www

# Laravelプロジェクトをコピー（Docker context が ./backend の場合）
COPY . .

# Composerの依存パッケージをインストール
RUN composer install --no-interaction --prefer-dist --optimize-autoloader

# Laravelキャッシュ類の事前生成（必要に応じて）
RUN php artisan config:cache || true
RUN php artisan route:cache || true

# Laravel用パーミッション設定
RUN chown -R www-data:www-data /var/www && chmod -R 755 /var/www

CMD php artisan serve --host=0.0.0.0 --port=8000

