TUGAS SESI 7 - FORM TAMBAH PRODUK PHP

File utama: tambah_produk.php

Cara menjalankan di XAMPP:
1. Salin folder project ke C:\xampp\htdocs\eduwork-bootcamp-10\sesi-7-php-form\
2. Pastikan Apache dan MySQL/MariaDB dari C:\xampp berjalan.
3. Pastikan database ecommerce_db dan tabel products sudah dibuat sesuai tugas Sesi 6.
4. Pada file tambah_produk.php, koneksi database saat ini diatur ke:
   Host     : 127.0.0.1
   Username : root
   Password : (kosong)
   Database : ecommerce_db
   Port     : 3307
   Sesuaikan jika konfigurasi lokal berbeda.
5. Buka URL:
   http://localhost:8081/eduwork-bootcamp-10/sesi-7-php-form/tambah_produk.php

Kolom tabel products yang digunakan:
- nama_produk
- harga
- deskripsi
- stok (diisi 0 otomatis)

Fitur:
- Form POST
- Validasi nama, harga numerik/positif, dan deskripsi
- IF/ELSE untuk validasi
- Prepared statement mysqli untuk INSERT
- Pesan sukses/error
- Output HTML di-escape

Catatan: Jangan masukkan password akun asli ke data dummy. File ini mengasumsikan tabel products yang dibuat pada Sesi 6 memiliki kolom stok dengan default 0 atau menerima nilai 0.
