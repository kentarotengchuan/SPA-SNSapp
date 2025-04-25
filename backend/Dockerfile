# ベースイメージは公式の PHP 8.x FPM + Debianベース
FROM php:8.2-fpm

RUN apt-get update && apt-get install -y \
    git curl zip unzip libzip-dev libpng-dev libonig-dev libxml2-dev \
    && docker-php-ext-install pdo_mysql zip

COPY --from=composer:latest /usr/bin/composer /usr/bin/composer

WORKDIR /var/www

COPY . .

# ✅ vendor/autoload.php がないと artisan は壊れるので、ここでチェック
RUN composer install --no-interaction --prefer-dist --optimize-autoloader || (cat /var/www/composer.json && false)

# ✅ artisan 実行前に vendor が存在していることを確認
RUN test -f vendor/autoload.php

# 🔁 失敗してもエラーにならないように || true を使う
RUN php artisan config:cache || true
RUN php artisan route:cache || true

RUN chown -R www-data:www-data /var/www && chmod -R 755 /var/www

CMD php artisan serve --host=0.0.0.0 --port=8000

