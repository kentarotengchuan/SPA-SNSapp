FROM php:8.2.26-fpm

RUN apt-get update && apt-get install -y \
    libzip-dev unzip curl \
    && docker-php-ext-install zip pdo pdo_mysql

COPY --from=composer:latest /usr/bin/composer /usr/bin/composer

WORKDIR /var/www

COPY . .

RUN composer install

CMD php artisan serve --host=0.0.0.0 --port=8000