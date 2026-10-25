-- ==============================================================================
-- Tugas Sesi 8: PHP Database Integration - Bootcamp EduWork
-- File: setup_sesi8.sql
-- Deskripsi: Skrip migrasi idempotent untuk menambahkan kolom 'kategori'
--            pada tabel 'products' dan memperbarui data kategori produk yang ada.
-- ==============================================================================

USE `ecommerce_db`;

-- 1. Tambahkan kolom 'kategori' jika belum ada (aman dijalankan berulang kali)
ALTER TABLE `products`
ADD COLUMN IF NOT EXISTS `kategori` VARCHAR(50) NOT NULL DEFAULT 'Lainnya' AFTER `nama_produk`;

-- 2. Perbarui data kategori untuk produk bawaan Sesi 6
UPDATE `products` SET `kategori` = 'Aksesoris Komputer' WHERE `id` = 1; -- Mechanical Keyboard RGB
UPDATE `products` SET `kategori` = 'Audio'              WHERE `id` = 2; -- Wireless Headphone Pro
UPDATE `products` SET `kategori` = 'Aksesoris Komputer' WHERE `id` = 3; -- Mouse Wireless Ergo
UPDATE `products` SET `kategori` = 'Aksesoris Gadget'   WHERE `id` = 4; -- USB-C Fast Charger 65W
UPDATE `products` SET `kategori` = 'Wearable'           WHERE `id` = 5; -- Smartwatch Active 2

-- 3. Perbarui kategori untuk data produk tambahan yang mungkin ada di database
UPDATE `products` SET `kategori` = 'Smartphone'         WHERE `nama_produk` LIKE '%samsung%' OR `nama_produk` LIKE '%Iphone%';
UPDATE `products` SET `kategori` = 'Laptop'             WHERE `nama_produk` LIKE '%dell%' OR `nama_produk` LIKE '%laptop%';

-- 4. Verifikasi hasil pembaruan
SELECT `id`, `nama_produk`, `kategori`, `harga`, `stok` FROM `products` ORDER BY `id` ASC;
