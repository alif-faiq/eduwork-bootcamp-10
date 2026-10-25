# Tugas Sesi 8: PHP Database Integration — Bootcamp EduWork

Proyek ini merupakan implementasi tugas Bootcamp EduWork Sesi 8 untuk mengintegrasikan PHP dengan database MariaDB/MySQL (`ecommerce_db`) yang telah dibuat pada Sesi 6.

---

## 1. Lingkungan Pengembangan

| Komponen | Nilai / Konfigurasi |
| :--- | :--- |
| **Lokasi Repository** | `C:\xampp\htdocs\eduwork-bootcamp-10` |
| **Folder Sesi 8** | `sesi-8-php-database` |
| **Versi PHP** | `8.2.12` |
| **Database Server** | MariaDB 10.4.32 (XAMPP) |
| **Host Database** | `127.0.0.1` |
| **Port Database** | `3307` |
| **Username Database** | `root` |
| **Password Database** | *(kosong)* |
| **Nama Database** | `ecommerce_db` |
| **Port Apache Web Server** | `8081` |
| **URL Aplikasi** | `http://localhost:8081/eduwork-bootcamp-10/sesi-8-php-database/index.php` |

---

## 2. Struktur Proyek

```text
sesi-8-php-database/
├── index.php          # Halaman katalog produk responsif (Bootstrap 5, filter, search, looping foreach)
├── db.php             # Modul koneksi database MySQLi (charset utf8mb4 & error handling)
├── setup_sesi8.sql    # Skrip SQL migrasi penambahan kolom kategori & update data secara aman (idempotent)
└── README.md          # Dokumentasi teknis proyek, alur kerja kode, dan panduan pengujian
```

---

## 3. Rincian File dan Implementasi

### A. `setup_sesi8.sql`
Skrip SQL migrasi yang dirancang bersifat **idempotent** (aman dijalankan berulang kali tanpa merusak atau menduplikasi struktur data).
- **Penambahan Kolom:** Menambahkan kolom `kategori VARCHAR(50) NOT NULL DEFAULT 'Lainnya'` setelah kolom `nama_produk` pada tabel `products` menggunakan klausa `IF NOT EXISTS`.
- **Pembaruan Data:** Mengkategorikan produk bawaan Sesi 6 dan produk tambahan:
  - `Aksesoris Komputer`: Mechanical Keyboard RGB, Mouse Wireless Ergo.
  - `Audio`: Wireless Headphone Pro.
  - `Aksesoris Gadget`: USB-C Fast Charger 65W.
  - `Wearable`: Smartwatch Active 2.
  - `Smartphone` & `Laptop`: Produk tambahan jika tersedia di database.
- **Integritas:** Tabel `users` dan `orders` tidak dimodifikasi sama sekali sesuai batasan tugas.

### B. `db.php`
Modul koneksi terpusat menggunakan ekstensi **MySQLi**:
- Menggunakan parameter `new mysqli($db_host, $db_user, $db_pass, $db_name, $db_port)` yang secara spesifik mengarah ke port `3307`.
- Memeriksa error koneksi dengan `$conn->connect_error` dan memberikan pesan error yang informatif jika MariaDB belum dijalankan.
- Mengatur charset koneksi ke `utf8mb4` melalui `$conn->set_charset("utf8mb4")` agar mendukung seluruh karakter multibyte dan emoji secara konsisten.

### C. `index.php`
Antarmuka pengguna katalog e-commerce modern dengan fitur utama:
1. **Dropdown Filter Kategori Dinamis:**
   - Mengambil seluruh kategori unik dari database menggunakan query:
     ```sql
     SELECT DISTINCT `kategori` FROM `products` WHERE `kategori` IS NOT NULL AND `kategori` != '' ORDER BY `kategori` ASC;
     ```
   - Menyediakan opsi "Semua Kategori" dan mempertahankan status pilihan (`selected`).
2. **Pencarian Produk:**
   - Memfilter produk berdasarkan `nama_produk` maupun `deskripsi` menggunakan operator `LIKE ?`.
   - Tetap menampilkan nilai kata kunci pada kolom input pencarian setelah form disubmit.
3. **Filter Terpadu (Kombinasi Kategori & Pencarian):**
   - Filter kategori dan pencarian keyword dapat digunakan secara bersamaan (`WHERE kategori = ? AND (nama_produk LIKE ? OR deskripsi LIKE ?)`).
4. **Prepared Statements:**
   - Seluruh query filter dan pencarian dibangun secara dinamis menggunakan `$conn->prepare()` dan `$stmt->bind_param()` untuk mencegah celah keamanan **SQL Injection**.
5. **Looping PHP & Tampilan Data:**
   - Menggunakan looping `foreach ($products as $product)` untuk merender kartu-kartu produk.
   - Menampilkan `nama_produk`, `harga` (format Rupiah `number_format()`), `deskripsi`, `stok`, dan badge `kategori`.
   - Indikator ketersediaan stok:
     - Hijau: Stok > 5.
     - Kuning: Stok 1 - 5 unit.
     - Merah: Stok Habis (0 unit, tombol beli otomatis dinonaktifkan).
6. **Keamanan Output (XSS Protection):**
   - Semua output variabel dinamis di-escape menggunakan `htmlspecialchars($var, ENT_QUOTES, 'UTF-8')`.
7. **Empty State & Tombol Reset:**
   - Menampilkan alert dan instruksi yang ramah jika produk tidak ditemukan berdasarkan kriteria pencarian/filter.
   - Tombol **Reset** dan tautan kembali untuk menghapus filter aktif.
8. **UI Responsif:**
   - Menggunakan Bootstrap 5 CDN dan Bootstrap Icons CDN, layout responsif (1 kolom di HP, 2 kolom di tablet, 3-4 kolom di desktop).

---

## 4. Cara Menjalankan Proyek

1. **Jalankan XAMPP Control Panel:**
   - Pastikan modul **Apache** aktif di Port `8081`.
   - Pastikan modul **MySQL/MariaDB** aktif di Port `3307`.

2. **Eksekusi Skrip SQL Migrasi (Jika Belum Dijalankan):**
   - Skrip migrasi dapat diimpor melalui phpMyAdmin (`http://localhost:8081/phpmyadmin`) pada database `ecommerce_db`, atau langsung melalui CLI:
     ```bash
     C:\xampp\mysql\bin\mysql.exe -u root -P 3307 -h 127.0.0.1 ecommerce_db < C:\xampp\htdocs\eduwork-bootcamp-10\sesi-8-php-database\setup_sesi8.sql
     ```
   *(Skrip ini sudah dieksekusi dan diverifikasi pada database saat implementasi berlangsung).*

3. **Buka Aplikasi Melalui Browser:**
   - Buka browser (Chrome/Edge/Firefox) dan akses URL:
     ```
     http://localhost:8081/eduwork-bootcamp-10/sesi-8-php-database/index.php
     ```

4. **Uji Fitur:**
   - Pilih kategori dari dropdown lalu klik **Terapkan**.
   - Masukkan kata kunci (misal: `keyboard`, `charger`, `headphone`) pada kolom pencarian lalu klik **Terapkan**.
   - Gabungkan filter kategori dan pencarian keyword secara bersamaan.
   - Coba lakukan pencarian acak yang tidak ada di database untuk melihat tampilan **Empty State** (Produk Tidak Ditemukan).
   - Klik tombol **Reset** untuk kembali melihat seluruh katalog.

---

## 5. Ringkasan Hasil Pengujian

Seluruh skenario pengujian telah diuji dan diverifikasi secara langsung pada server Apache dan database MariaDB:

| Skenario Pengujian | Hasil yang Diharapkan | Status |
| :--- | :--- | :---: |
| **Koneksi Database (`db.php`)** | Berhasil terhubung ke port 3307 dengan charset `utf8mb4` | **PASS** |
| **Migrasi Kolom (`setup_sesi8.sql`)** | Kolom `kategori` terbentuk, data produk terupdate, idempotent | **PASS** |
| **Tampilan Katalog Default** | Seluruh produk tampil dengan looping `foreach` dan format Rupiah | **PASS** |
| **Dropdown Kategori Dinamis** | Kategori unik diambil via `SELECT DISTINCT` dan terurut alfabet | **PASS** |
| **Filter Kategori Saja** | Hanya menampilkan produk sesuai kategori yang dipilih | **PASS** |
| **Pencarian Saja (Nama/Deskripsi)** | Menampilkan produk yang cocok dengan klausa `LIKE` | **PASS** |
| **Kombinasi Kategori & Pencarian** | Menggabungkan kondisi kategori dan kata kunci dalam 1 query | **PASS** |
| **Hasil Kosong (Empty State)** | Menampilkan pesan "Produk Tidak Ditemukan" dan tombol reset | **PASS** |
| **Keamanan Prepared Statements** | Parameter binding mencegah SQL Injection | **PASS** |
| **Sanitasi Output (XSS)** | Tag HTML/JS disanitasi oleh `htmlspecialchars` | **PASS** |
