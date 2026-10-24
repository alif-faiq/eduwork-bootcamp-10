<?php
// ============================================
// TUGAS SESI 7: FORM TAMBAH PRODUK
// Database: ecommerce_db
// Tabel: products
// ============================================

$nama_produk = "";
$harga = "";
$deskripsi = "";
$errors = [];
$success = "";

// Memproses data hanya ketika form dikirim dengan method POST.
if ($_SERVER["REQUEST_METHOD"] === "POST") {
    // Variabel menerima input dari form.
    $nama_produk = trim($_POST["nama_produk"] ?? "");
    $harga = trim($_POST["harga"] ?? "");
    $deskripsi = trim($_POST["deskripsi"] ?? "");

    // ============================================
    // VALIDASI INPUT: IF / ELSE
    // ============================================
    if ($nama_produk === "") {
        $errors[] = "Nama produk wajib diisi.";
    }

    if ($harga === "") {
        $errors[] = "Harga produk wajib diisi.";
    } elseif (!is_numeric($harga)) {
        $errors[] = "Harga harus berupa angka.";
    } elseif ((float) $harga <= 0) {
        $errors[] = "Harga harus lebih besar dari 0.";
    }

    if ($deskripsi === "") {
        $errors[] = "Deskripsi produk wajib diisi.";
    }

    // Hanya menyimpan ke database jika tidak ada error validasi.
    if (empty($errors)) {
        mysqli_report(MYSQLI_REPORT_ERROR | MYSQLI_REPORT_STRICT);

        try {
            // Konfigurasi mengikuti XAMPP utama: MariaDB port 3307.
            $conn = new mysqli(
                "127.0.0.1",
                "root",
                "",
                "ecommerce_db",
                3307
            );
            $conn->set_charset("utf8mb4");

            // Prepared statement membantu mencegah SQL injection.
            // Kolom stok diisi 0 karena form ini belum meminta input stok.
            $sql = "INSERT INTO products (nama_produk, harga, deskripsi, stok)
                    VALUES (?, ?, ?, 0)";

            $stmt = $conn->prepare($sql);
            $harga_angka = (float) $harga;
            $stmt->bind_param("sds", $nama_produk, $harga_angka, $deskripsi);
            $stmt->execute();

            $success = "Produk berhasil ditambahkan ke database.";

            // Kosongkan form setelah berhasil disimpan.
            $nama_produk = "";
            $harga = "";
            $deskripsi = "";

            $stmt->close();
            $conn->close();
        } catch (mysqli_sql_exception $exception) {
            // Detail teknis dicatat di log, bukan ditampilkan kepada pengguna.
            error_log("Gagal menyimpan produk: " . $exception->getMessage());
            $errors[] = "Produk gagal disimpan. Pastikan MariaDB berjalan dan konfigurasi database benar.";
        }
    }
}

// Escape output agar teks yang ditampilkan aman di dalam HTML.
function e(string $value): string
{
    return htmlspecialchars($value, ENT_QUOTES, "UTF-8");
}
?>
<!DOCTYPE html>
<html lang="id">

<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Tambah Produk | FaiqStore</title>
    <style>
        * {
            box-sizing: border-box;
        }

        body {
            margin: 0;
            padding: 32px 16px;
            font-family: Arial, Helvetica, sans-serif;
            background: #f3f6fb;
            color: #1f2937;
        }

        .container {
            width: 100%;
            max-width: 720px;
            margin: 0 auto;
        }

        .header {
            margin-bottom: 22px;
        }

        .brand {
            color: #2563eb;
            font-size: 14px;
            font-weight: bold;
            letter-spacing: 1px;
            text-transform: uppercase;
        }

        h1 {
            margin: 8px 0;
            font-size: 30px;
        }

        .subtitle {
            margin: 0;
            color: #64748b;
            line-height: 1.6;
        }

        .card {
            padding: 26px;
            background: #fff;
            border: 1px solid #e2e8f0;
            border-radius: 16px;
            box-shadow: 0 10px 25px rgba(15, 23, 42, .06);
        }

        .field {
            margin-bottom: 18px;
        }

        label {
            display: block;
            margin-bottom: 7px;
            font-weight: 700;
            font-size: 14px;
        }

        input,
        textarea {
            display: block;
            width: 100%;
            padding: 12px 13px;
            border: 1px solid #cbd5e1;
            border-radius: 9px;
            font: inherit;
            background: #fff;
        }

        input:focus,
        textarea:focus {
            outline: 2px solid #bfdbfe;
            border-color: #2563eb;
        }

        textarea {
            min-height: 120px;
            resize: vertical;
        }

        .hint {
            margin: 6px 0 0;
            font-size: 12px;
            color: #64748b;
        }

        button {
            width: 100%;
            padding: 13px 16px;
            border: 0;
            border-radius: 9px;
            background: #2563eb;
            color: #fff;
            font-size: 15px;
            font-weight: 700;
            cursor: pointer;
        }

        button:hover {
            background: #1d4ed8;
        }

        .notice {
            margin-bottom: 18px;
            padding: 13px 15px;
            border-radius: 9px;
            line-height: 1.5;
        }

        .success {
            border: 1px solid #86efac;
            background: #f0fdf4;
            color: #166534;
        }

        .error {
            border: 1px solid #fca5a5;
            background: #fef2f2;
            color: #991b1b;
        }

        .error ul {
            margin: 6px 0 0;
            padding-left: 20px;
        }

        .footnote {
            margin-top: 18px;
            color: #64748b;
            font-size: 12px;
            line-height: 1.6;
        }

        @media (max-width: 480px) {
            body {
                padding: 20px 12px;
            }

            .card {
                padding: 20px 16px;
            }

            h1 {
                font-size: 25px;
            }
        }
    </style>
</head>

<body>
    <main class="container">
        <header class="header">
            <div class="brand">FaiqStore · Sesi 7 PHP</div>
            <h1>Tambah Produk Baru</h1>
            <p class="subtitle">Silahkan masukkan nama produk, harga, dan deskripsi pada form di bawah ini.</p>
        </header>

        <section class="card">
            <?php if ($success !== ""): ?>
                <div class="notice success" role="status"><?= e($success) ?></div>
            <?php endif; ?>

            <?php if (!empty($errors)): ?>
                <div class="notice error" role="alert">
                    <strong>Periksa kembali input kamu:</strong>
                    <ul>
                        <?php foreach ($errors as $error): ?>
                            <li><?= e($error) ?></li>
                        <?php endforeach; ?>
                    </ul>
                </div>
            <?php endif; ?>

            <form method="POST" action="">
                <div class="field">
                    <label for="nama_produk">Nama Produk</label>
                    <input
                        type="text"
                        id="nama_produk"
                        name="nama_produk"
                        maxlength="150"
                        value="<?= e($nama_produk) ?>"
                        placeholder="Contoh: Wireless Headphone Pro"
                        required>
                </div>

                <div class="field">
                    <label for="harga">Harga (Rupiah)</label>
                    <input
                        type="number"
                        id="harga"
                        name="harga"
                        min="1"
                        step="0.01"
                        value="<?= e($harga) ?>"
                        placeholder="Contoh: 459000"
                        required>
                    <p class="hint">Masukkan angka saja, tanpa Rp atau pemisah ribuan.</p>
                </div>

                <div class="field">
                    <label for="deskripsi">Deskripsi Produk</label>
                    <textarea
                        id="deskripsi"
                        name="deskripsi"
                        placeholder="Jelaskan produk secara singkat..."
                        required><?= e($deskripsi) ?></textarea>
                </div>

                <button type="submit">Simpan Produk</button>
            </form>

            <p class="footnote">
                Catatan: stok produk akan diisi 0 secara default. Form ini melakukan validasi di server sebelum data disimpan.
            </p>
        </section>
    </main>
</body>

</html>