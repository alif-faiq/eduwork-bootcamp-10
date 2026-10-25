<?php
/**
 * Tugas Sesi 8: PHP Database Integration - Bootcamp EduWork
 * File: db.php
 * Deskripsi: Modul konfigurasi dan inisialisasi koneksi database MySQL/MariaDB
 *            menggunakan ekstensi MySQLi dengan charset utf8mb4.
 */

// Konfigurasi parameter koneksi database
$db_host = '127.0.0.1';
$db_user = 'root';
$db_pass = '';
$db_name = 'ecommerce_db';
$db_port = 3307;

// Inisialisasi koneksi MySQLi
$conn = new mysqli($db_host, $db_user, $db_pass, $db_name, $db_port);

// Periksa status koneksi database
if ($conn->connect_error) {
    die("
        <div style='font-family: Arial, sans-serif; padding: 20px; background: #fff3cd; border: 1px solid #ffeeba; border-radius: 6px; max-width: 600px; margin: 40px auto; color: #856404;'>
            <h3 style='margin-top: 0;'>Koneksi Database Gagal!</h3>
            <p><strong>Pesan Error:</strong> " . htmlspecialchars($conn->connect_error, ENT_QUOTES, 'UTF-8') . "</p>
            <p><strong>Pastikan:</strong></p>
            <ul>
                <li>Layanan MariaDB/MySQL pada XAMPP sudah berjalan (Port: <code>$db_port</code>).</li>
                <li>Database <code>$db_name</code> sudah dibuat.</li>
                <li>Host <code>$db_host</code> dan kredensial user <code>$db_user</code> sudah sesuai.</li>
            </ul>
        </div>
    ");
}

// Set karakter encoding ke utf8mb4 agar mendukung multibyte character & emoji
if (!$conn->set_charset("utf8mb4")) {
    die("Gagal menetapkan charset utf8mb4: " . htmlspecialchars($conn->error, ENT_QUOTES, 'UTF-8'));
}
