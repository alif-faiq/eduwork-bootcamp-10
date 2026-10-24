-- phpMyAdmin SQL Dump
-- version 5.2.1
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1:3307
-- Waktu pembuatan: 24 Okt 2026 pada 05.27
-- Versi server: 10.4.32-MariaDB
-- Versi PHP: 8.2.12

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `ecommerce_db`
--

-- --------------------------------------------------------

--
-- Struktur dari tabel `orders`
--

CREATE TABLE `orders` (
  `order_id` bigint(20) UNSIGNED NOT NULL,
  `user_id` bigint(20) UNSIGNED NOT NULL,
  `product_id` bigint(20) UNSIGNED NOT NULL,
  `quantity` int(10) UNSIGNED NOT NULL,
  `total` decimal(12,2) UNSIGNED NOT NULL,
  `order_date` timestamp NOT NULL DEFAULT current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Dumping data untuk tabel `orders`
--

INSERT INTO `orders` (`order_id`, `user_id`, `product_id`, `quantity`, `total`, `order_date`) VALUES
(1, 1, 1, 1, 699000.00, '2026-10-24 03:26:28'),
(2, 2, 2, 2, 918000.00, '2026-10-24 03:26:28'),
(3, 3, 3, 1, 249000.00, '2026-10-24 03:26:28'),
(4, 4, 4, 3, 987000.00, '2026-10-24 03:26:28'),
(5, 5, 5, 1, 799000.00, '2026-10-24 03:26:28'),
(6, 1, 3, 2, 498000.00, '2026-10-24 03:26:28'),
(7, 2, 1, 1, 699000.00, '2026-10-24 03:26:28'),
(8, 3, 5, 2, 1598000.00, '2026-10-24 03:26:28'),
(9, 4, 2, 1, 459000.00, '2026-10-24 03:26:28'),
(10, 5, 4, 2, 658000.00, '2026-10-24 03:26:28');

-- --------------------------------------------------------

--
-- Struktur dari tabel `products`
--

CREATE TABLE `products` (
  `id` bigint(20) UNSIGNED NOT NULL,
  `nama_produk` varchar(150) NOT NULL,
  `harga` decimal(12,2) UNSIGNED NOT NULL,
  `deskripsi` text DEFAULT NULL,
  `stok` int(10) UNSIGNED NOT NULL DEFAULT 0,
  `created_at` timestamp NOT NULL DEFAULT current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Dumping data untuk tabel `products`
--

INSERT INTO `products` (`id`, `nama_produk`, `harga`, `deskripsi`, `stok`, `created_at`) VALUES
(1, 'Mechanical Keyboard RGB', 699000.00, 'Keyboard mekanikal RGB untuk mengetik dan gaming.', 15, '2026-10-24 03:26:28'),
(2, 'Wireless Headphone Pro', 459000.00, 'Headphone wireless dengan suara jernih.', 20, '2026-10-24 03:26:28'),
(3, 'Mouse Wireless Ergo', 249000.00, 'Mouse wireless ergonomis untuk bekerja.', 30, '2026-10-24 03:26:28'),
(4, 'USB-C Fast Charger 65W', 329000.00, 'Charger USB-C untuk smartphone dan laptop.', 18, '2026-10-24 03:26:28'),
(5, 'Smartwatch Active 2', 799000.00, 'Smartwatch untuk memantau aktivitas harian.', 10, '2026-10-24 03:26:28');

-- --------------------------------------------------------

--
-- Struktur dari tabel `users`
--

CREATE TABLE `users` (
  `id` bigint(20) UNSIGNED NOT NULL,
  `nama` varchar(100) NOT NULL,
  `email` varchar(191) NOT NULL,
  `password` varchar(255) NOT NULL,
  `created_at` timestamp NOT NULL DEFAULT current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Dumping data untuk tabel `users`
--

INSERT INTO `users` (`id`, `nama`, `email`, `password`, `created_at`) VALUES
(1, 'Muhammad Alif', 'alif@example.com', '$2y$10$92IXUNpkjO0rOQ5byMi.Ye4oKoEa3Ro9llC/.og/at2uheWG/igi.', '2026-10-24 03:26:28'),
(2, 'Andi Pratama', 'andi@example.com', '$2y$10$92IXUNpkjO0rOQ5byMi.Ye4oKoEa3Ro9llC/.og/at2uheWG/igi.', '2026-10-24 03:26:28'),
(3, 'Siti Rahma', 'siti@example.com', '$2y$10$92IXUNpkjO0rOQ5byMi.Ye4oKoEa3Ro9llC/.og/at2uheWG/igi.', '2026-10-24 03:26:28'),
(4, 'Budi Santoso', 'budi@example.com', '$2y$10$92IXUNpkjO0rOQ5byMi.Ye4oKoEa3Ro9llC/.og/at2uheWG/igi.', '2026-10-24 03:26:28'),
(5, 'Dewi Lestari', 'dewi@example.com', '$2y$10$92IXUNpkjO0rOQ5byMi.Ye4oKoEa3Ro9llC/.og/at2uheWG/igi.', '2026-10-24 03:26:28');

--
-- Indexes for dumped tables
--

--
-- Indeks untuk tabel `orders`
--
ALTER TABLE `orders`
  ADD PRIMARY KEY (`order_id`),
  ADD KEY `fk_orders_users` (`user_id`),
  ADD KEY `fk_orders_products` (`product_id`);

--
-- Indeks untuk tabel `products`
--
ALTER TABLE `products`
  ADD PRIMARY KEY (`id`);

--
-- Indeks untuk tabel `users`
--
ALTER TABLE `users`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `email` (`email`);

--
-- AUTO_INCREMENT untuk tabel yang dibuang
--

--
-- AUTO_INCREMENT untuk tabel `orders`
--
ALTER TABLE `orders`
  MODIFY `order_id` bigint(20) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=11;

--
-- AUTO_INCREMENT untuk tabel `products`
--
ALTER TABLE `products`
  MODIFY `id` bigint(20) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=6;

--
-- AUTO_INCREMENT untuk tabel `users`
--
ALTER TABLE `users`
  MODIFY `id` bigint(20) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=6;

--
-- Ketidakleluasaan untuk tabel pelimpahan (Dumped Tables)
--

--
-- Ketidakleluasaan untuk tabel `orders`
--
ALTER TABLE `orders`
  ADD CONSTRAINT `fk_orders_products` FOREIGN KEY (`product_id`) REFERENCES `products` (`id`) ON UPDATE CASCADE,
  ADD CONSTRAINT `fk_orders_users` FOREIGN KEY (`user_id`) REFERENCES `users` (`id`) ON UPDATE CASCADE;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;

-- CREATE DATA
INSERT INTO products (nama_produk, harga, deskripsi, stok)
VALUES (
    'Bluetooth Speaker Mini',
    189000.00,
    'Speaker Bluetooth dengan ukuran compact dan suara jernih.',
    25
);

-- READ SEMUA DATA
SELECT * FROM products;

-- READ DATA DENGAN ID
SELECT * FROM products WHERE id = 1;

-- READ DATA DENGAN NAMA dan HARGA saja
SELECT nama_produk, harga FROM products;

-- UPDATE DATA
UPDATE products
SET
    harga = 729000.00,
    stok = 20
WHERE id = 1;

-- DELETE DATA
DELETE FROM products WHERE id = 5;
