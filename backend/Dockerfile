# Usa la imagen base de PHP con Apache
FROM php:8.2-apache

# Instalar dependencias del sistema
RUN apt-get update && apt-get install -y \
    git \
    curl \
    libpng-dev \
    libonig-dev \
    libxml2-dev \
    libzip-dev \
    zip \
    unzip \
    libpq-dev \
    && docker-php-ext-install pdo_mysql mbstring exif pcntl bcmath gd zip soap pdo_pgsql

# Instalar Composer (gestor de dependencias de PHP)
COPY --from=composer:latest /usr/bin/composer /usr/bin/composer

# Limpiar caché para reducir el tamaño de la imagen
RUN apt-get clean && rm -rf /var/lib/apt/lists/*

# Habilitar mod_rewrite para Laravel
RUN a2enmod rewrite

# Copia el contenido del proyecto al contenedor
COPY . .

RUN mkdir /var/www/src
RUN mkdir /var/www/src/storage
RUN mkdir /var/www/src/bootstrap
RUN mkdir /var/www/src/bootstrap/cache

# Configura los permisos (Laravel necesita acceso a storage y bootstrap/cache)
RUN chown -R www-data:www-data /var/www/src/storage /var/www/src/bootstrap/cache

# Establece el directorio de trabajo
WORKDIR /var/www/html
