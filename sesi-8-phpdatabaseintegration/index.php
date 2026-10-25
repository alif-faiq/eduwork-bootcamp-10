<?php
/**
 * Tugas Sesi 8: PHP Database Integration - Bootcamp EduWork
 * File: index.php
 * Deskripsi: Halaman katalog e-commerce yang menampilkan produk dari database MySQL,
 *            dilengkapi filter kategori dinamis, pencarian, prepared statements,
 *            dan template responsif Bootstrap 5.
 */

require_once __DIR__ . '/db.php';

// Ambil parameter filter dan pencarian dari URL (GET request)
$selected_kategori = isset($_GET['kategori']) ? trim($_GET['kategori']) : '';
$search_keyword    = isset($_GET['search']) ? trim($_GET['search']) : '';

// 1. Ambil daftar kategori unik dari database menggunakan SELECT DISTINCT
$sql_categories = "SELECT DISTINCT `kategori` FROM `products` WHERE `kategori` IS NOT NULL AND `kategori` != '' ORDER BY `kategori` ASC";
$result_categories = $conn->query($sql_categories);

$categories = [];
if ($result_categories) {
    while ($row = $result_categories->fetch_assoc()) {
        $categories[] = $row['kategori'];
    }
}

// 2. Ambil total keseluruhan produk di database (untuk perbandingan statistik)
$total_all_products = 0;
$result_total = $conn->query("SELECT COUNT(*) AS total FROM `products`");
if ($result_total) {
    $row_total = $result_total->fetch_assoc();
    $total_all_products = (int) $row_total['total'];
}

// 3. Bangun query produk dengan prepared statement dinamis berdasarkan filter & search
$conditions = [];
$params = [];
$types = '';

// Tambahkan kondisi filter kategori jika dipilih
if ($selected_kategori !== '') {
    $conditions[] = "`kategori` = ?";
    $params[] = $selected_kategori;
    $types .= 's';
}

// Tambahkan kondisi pencarian berdasarkan nama produk atau deskripsi jika diisi
if ($search_keyword !== '') {
    $conditions[] = "(`nama_produk` LIKE ? OR `deskripsi` LIKE ?)";
    $search_param = '%' . $search_keyword . '%';
    $params[] = $search_param;
    $params[] = $search_param;
    $types .= 'ss';
}

// Query dasar
$sql_products = "SELECT `id`, `nama_produk`, `kategori`, `harga`, `deskripsi`, `stok`, `created_at` FROM `products`";

// Gabungkan klausa WHERE jika ada kondisi
if (!empty($conditions)) {
    $sql_products .= " WHERE " . implode(" AND ", $conditions);
}

// Urutkan produk berdasarkan id secara menaik
$sql_products .= " ORDER BY `id` ASC";

// Eksekusi query menggunakan Prepared Statement untuk mencegah SQL Injection
$stmt = $conn->prepare($sql_products);
if (!$stmt) {
    die("Gagal menyiapkan query: " . htmlspecialchars($conn->error, ENT_QUOTES, 'UTF-8'));
}

if (!empty($params)) {
    $stmt->bind_param($types, ...$params);
}

$stmt->execute();
$result_products = $stmt->get_result();

$products = [];
if ($result_products) {
    while ($row = $result_products->fetch_assoc()) {
        $products[] = $row;
    }
}
$stmt->close();

// Cek apakah sedang ada filter atau pencarian aktif
$is_filtered = ($selected_kategori !== '' || $search_keyword !== '');
?>
<!DOCTYPE html>
<html lang="id">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>EduStore — Katalog Produk Sesi 8</title>
    <!-- Bootstrap 5 CSS -->
    <link href="https://cdn.jsdelivr.net/npm/bootstrap@5.3.3/dist/css/bootstrap.min.css" rel="stylesheet" integrity="sha384-QWTKZyjpPEjISv5WaRU9OFeRpok6YctnYmDr5pNlyT2bRjXh0JMhjY6hW+ALEwIH" crossorigin="anonymous">
    <!-- Bootstrap Icons -->
    <link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/bootstrap-icons@1.11.3/font/bootstrap-icons.min.css">
    <style>
        body {
            background-color: #f8fafc;
            color: #334155;
            min-height: 100vh;
            display: flex;
            flex-direction: column;
        }
        .main-content {
            flex: 1 0 auto;
        }
        .navbar-brand-gradient {
            background: linear-gradient(135deg, #0d6efd, #0dcaf0);
            -webkit-background-clip: text;
            -webkit-text-fill-color: transparent;
            font-weight: 800;
        }
        .hero-banner {
            background: linear-gradient(135deg, #1e3a8a 0%, #0d6efd 100%);
            color: #ffffff;
            border-radius: 1rem;
            padding: 2.5rem 2rem;
            margin-bottom: 2rem;
            box-shadow: 0 10px 25px -5px rgba(13, 110, 253, 0.25);
        }
        .filter-card {
            background: #ffffff;
            border-radius: 0.85rem;
            box-shadow: 0 4px 12px rgba(0, 0, 0, 0.05);
            border: 1px solid #e2e8f0;
        }
        .product-card {
            background: #ffffff;
            border: 1px solid #e2e8f0;
            border-radius: 0.85rem;
            transition: transform 0.2s ease, box-shadow 0.2s ease;
            display: flex;
            flex-direction: column;
            height: 100%;
        }
        .product-card:hover {
            transform: translateY(-4px);
            box-shadow: 0 12px 24px rgba(0, 0, 0, 0.08);
            border-color: #cbd5e1;
        }
        .product-thumb {
            height: 160px;
            background: linear-gradient(135deg, #e2e8f0, #f1f5f9);
            border-top-left-radius: 0.85rem;
            border-top-right-radius: 0.85rem;
            display: flex;
            align-items: center;
            justify-content: center;
            position: relative;
        }
        .product-thumb i {
            font-size: 3.5rem;
            color: #94a3b8;
        }
        .price-tag {
            font-size: 1.25rem;
            font-weight: 700;
            color: #0d6efd;
        }
        .badge-kategori {
            background-color: #e0e7ff;
            color: #3730a3;
            font-weight: 600;
            font-size: 0.75rem;
            padding: 0.35rem 0.65rem;
            border-radius: 2rem;
        }
    </style>
</head>
<body>

    <!-- Navbar Navigasi -->
    <nav class="navbar navbar-expand-lg navbar-dark bg-dark sticky-top shadow-sm">
        <div class="container">
            <a class="navbar-brand d-flex align-items-center gap-2 fs-4" href="index.php">
                <i class="bi bi-shop text-primary"></i>
                <span class="navbar-brand-gradient">EduStore</span>
            </a>
            <span class="navbar-text text-light-50 small d-none d-md-inline">
                Bootcamp EduWork — Sesi 8: PHP Database Integration
            </span>
            <div class="ms-auto d-flex align-items-center gap-2">
                <span class="badge bg-primary bg-opacity-25 text-primary border border-primary border-opacity-25 px-3 py-2 rounded-pill">
                    <i class="bi bi-database-check me-1"></i> MySQLi Connected
                </span>
            </div>
        </div>
    </nav>

    <!-- Konten Utama -->
    <main class="main-content py-4">
        <div class="container">

            <!-- Hero Banner -->
            <div class="hero-banner">
                <div class="row align-items-center">
                    <div class="col-lg-8">
                        <span class="badge bg-light text-primary fw-semibold px-3 py-2 rounded-pill mb-2">
                            <i class="bi bi-layers-fill me-1"></i> Modul Integrasi Database
                        </span>
                        <h1 class="display-6 fw-bold mb-2">Katalog Produk E-Commerce</h1>
                        <p class="lead mb-0 text-white-50 fs-6">
                            Menampilkan data produk secara dinamis dari database <code>ecommerce_db</code> dengan fitur pencarian real-time dan penyaringan kategori terintegrasi.
                        </p>
                    </div>
                    <div class="col-lg-4 text-lg-end mt-3 mt-lg-0">
                        <div class="bg-white bg-opacity-10 p-3 rounded-3 d-inline-block text-start border border-white border-opacity-25">
                            <div class="small text-white-50">Total Data Produk:</div>
                            <div class="fs-4 fw-bold text-white"><?= $total_all_products; ?> Produk</div>
                        </div>
                    </div>
                </div>
            </div>

            <!-- Form Pencarian dan Filter Kategori -->
            <div class="card filter-card mb-4">
                <div class="card-body p-4">
                    <form action="index.php" method="GET" class="row g-3 align-items-end">
                        
                        <!-- Input Pencarian -->
                        <div class="col-12 col-md-5">
                            <label for="search" class="form-label fw-semibold text-secondary small">
                                <i class="bi bi-search me-1 text-primary"></i> Cari Produk
                            </label>
                            <div class="input-group">
                                <span class="input-group-text bg-light border-end-0">
                                    <i class="bi bi-search text-muted"></i>
                                </span>
                                <input type="text" 
                                       class="form-control border-start-0 ps-0" 
                                       id="search" 
                                       name="search" 
                                       placeholder="Ketik nama atau deskripsi..." 
                                       value="<?= htmlspecialchars($search_keyword, ENT_QUOTES, 'UTF-8'); ?>">
                            </div>
                        </div>

                        <!-- Dropdown Filter Kategori -->
                        <div class="col-12 col-md-4">
                            <label for="kategori" class="form-label fw-semibold text-secondary small">
                                <i class="bi bi-funnel me-1 text-primary"></i> Filter Kategori
                            </label>
                            <select class="form-select" id="kategori" name="kategori">
                                <option value="">Semua Kategori</option>
                                <?php foreach ($categories as $cat): ?>
                                    <option value="<?= htmlspecialchars($cat, ENT_QUOTES, 'UTF-8'); ?>" 
                                        <?= ($selected_kategori === $cat) ? 'selected' : ''; ?>>
                                        <?= htmlspecialchars($cat, ENT_QUOTES, 'UTF-8'); ?>
                                    </option>
                                <?php endforeach; ?>
                            </select>
                        </div>

                        <!-- Tombol Submit & Reset -->
                        <div class="col-12 col-md-3 d-flex gap-2">
                            <button type="submit" class="btn btn-primary flex-grow-1">
                                <i class="bi bi-filter me-1"></i> Terapkan
                            </button>
                            <?php if ($is_filtered): ?>
                                <a href="index.php" class="btn btn-outline-secondary" title="Reset filter & pencarian">
                                    <i class="bi bi-arrow-counterclockwise"></i> Reset
                                </a>
                            <?php endif; ?>
                        </div>
                    </form>

                    <!-- Status Filter Aktif -->
                    <?php if ($is_filtered): ?>
                        <div class="mt-3 pt-3 border-top d-flex flex-wrap align-items-center gap-2 small">
                            <span class="text-muted fw-semibold">Filter aktif:</span>
                            <?php if ($selected_kategori !== ''): ?>
                                <span class="badge bg-primary-subtle text-primary border border-primary-subtle py-1 px-2 rounded-pill">
                                    Kategori: <?= htmlspecialchars($selected_kategori, ENT_QUOTES, 'UTF-8'); ?>
                                </span>
                            <?php endif; ?>
                            <?php if ($search_keyword !== ''): ?>
                                <span class="badge bg-info-subtle text-info-emphasis border border-info-subtle py-1 px-2 rounded-pill">
                                    Kata kunci: "<?= htmlspecialchars($search_keyword, ENT_QUOTES, 'UTF-8'); ?>"
                                </span>
                            <?php endif; ?>
                            <span class="text-muted ms-auto">
                                Menampilkan <strong><?= count($products); ?></strong> dari <strong><?= $total_all_products; ?></strong> produk
                            </span>
                        </div>
                    <?php endif; ?>
                </div>
            </div>

            <!-- Daftar Produk / Looping PHP -->
            <?php if (!empty($products)): ?>
                <div class="row row-cols-1 row-cols-sm-2 row-cols-lg-3 row-cols-xl-4 g-4">
                    <?php foreach ($products as $product): ?>
                        <?php
                            // Format mata uang rupiah
                            $harga_format = "Rp " . number_format($product['harga'], 0, ',', '.');
                            
                            // Logika badge ketersediaan stok
                            $stok = (int) $product['stok'];
                            if ($stok === 0) {
                                $badge_stok_class = 'bg-danger-subtle text-danger border border-danger-subtle';
                                $badge_stok_text  = 'Stok Habis';
                            } elseif ($stok <= 5) {
                                $badge_stok_class = 'bg-warning-subtle text-warning-emphasis border border-warning-subtle';
                                $badge_stok_text  = "Sisa $stok unit";
                            } else {
                                $badge_stok_class = 'bg-success-subtle text-success border border-success-subtle';
                                $badge_stok_text  = "Tersedia $stok unit";
                            }

                            // Ikon visual berdasarkan kategori produk
                            $icon_class = 'bi-box-seam';
                            $kat_lower = strtolower($product['kategori'] ?? '');
                            if (str_contains($kat_lower, 'komputer') || str_contains($kat_lower, 'laptop')) {
                                $icon_class = 'bi-laptop';
                            } elseif (str_contains($kat_lower, 'audio')) {
                                $icon_class = 'bi-headphones';
                            } elseif (str_contains($kat_lower, 'gadget') || str_contains($kat_lower, 'charger')) {
                                $icon_class = 'bi-lightning-charge';
                            } elseif (str_contains($kat_lower, 'wearable') || str_contains($kat_lower, 'watch')) {
                                $icon_class = 'bi-smartwatch';
                            } elseif (str_contains($kat_lower, 'smartphone') || str_contains($kat_lower, 'phone')) {
                                $icon_class = 'bi-phone';
                            }
                        ?>
                        <div class="col">
                            <div class="product-card">
                                <!-- Thumbnail Produk Visual -->
                                <div class="product-thumb">
                                    <i class="bi <?= $icon_class; ?>"></i>
                                    <span class="position-absolute top-0 end-0 m-3 badge rounded-pill <?= $badge_stok_class; ?>">
                                        <?= $badge_stok_text; ?>
                                    </span>
                                </div>

                                <!-- Card Body -->
                                <div class="card-body p-3 d-flex flex-column">
                                    <!-- Kategori -->
                                    <div class="mb-2">
                                        <span class="badge-kategori">
                                            <i class="bi bi-tag-fill me-1"></i>
                                            <?= htmlspecialchars($product['kategori'] ?? 'Lainnya', ENT_QUOTES, 'UTF-8'); ?>
                                        </span>
                                    </div>

                                    <!-- Nama Produk -->
                                    <h5 class="card-title fs-6 fw-bold mb-1 text-truncate" title="<?= htmlspecialchars($product['nama_produk'], ENT_QUOTES, 'UTF-8'); ?>">
                                        <?= htmlspecialchars($product['nama_produk'], ENT_QUOTES, 'UTF-8'); ?>
                                    </h5>

                                    <!-- Deskripsi Produk -->
                                    <p class="card-text text-muted small flex-grow-1 mb-3" style="min-height: 40px; display: -webkit-box; -webkit-line-clamp: 2; -webkit-box-orient: vertical; overflow: hidden;">
                                        <?= !empty($product['deskripsi']) ? htmlspecialchars($product['deskripsi'], ENT_QUOTES, 'UTF-8') : '<em class="text-secondary">Tidak ada deskripsi produk.</em>'; ?>
                                    </p>

                                    <!-- Harga dan Aksi -->
                                    <div class="pt-2 border-top d-flex align-items-center justify-content-between mt-auto">
                                        <div>
                                            <span class="text-muted d-block" style="font-size: 0.7rem;">Harga</span>
                                            <span class="price-tag"><?= $harga_format; ?></span>
                                        </div>
                                        <button class="btn btn-sm btn-outline-primary rounded-pill px-3" type="button" <?= ($stok === 0) ? 'disabled' : ''; ?>>
                                            <i class="bi bi-cart-plus me-1"></i> Beli
                                        </button>
                                    </div>
                                </div>
                            </div>
                        </div>
                    <?php endforeach; ?>
                </div>
            <?php else: ?>
                <!-- Kondisi Produk Tidak Ditemukan (Empty State) -->
                <div class="card border-0 shadow-sm py-5 my-4 text-center rounded-4">
                    <div class="card-body">
                        <div class="mb-3">
                            <span class="d-inline-flex align-items-center justify-content-center bg-warning bg-opacity-10 text-warning rounded-circle" style="width: 80px; height: 80px;">
                                <i class="bi bi-search fs-1"></i>
                            </span>
                        </div>
                        <h3 class="fw-bold text-secondary">Produk Tidak Ditemukan</h3>
                        <p class="text-muted mx-auto mb-4" style="max-width: 480px;">
                            <?php if ($is_filtered): ?>
                                Maaf, tidak ada produk yang sesuai dengan kriteria filter atau pencarian Anda. Silakan coba kata kunci lain atau reset filter.
                            <?php else: ?>
                                Belum ada data produk di dalam database.
                            <?php endif; ?>
                        </p>
                        <?php if ($is_filtered): ?>
                            <a href="index.php" class="btn btn-primary px-4 py-2 rounded-pill">
                                <i class="bi bi-arrow-counterclockwise me-1"></i> Tampilkan Semua Produk
                            </a>
                        <?php endif; ?>
                    </div>
                </div>
            <?php endif; ?>

        </div>
    </main>

    <!-- Footer -->
    <footer class="bg-white border-top py-4 mt-5 text-center text-secondary small">
        <div class="container">
            <p class="mb-1"><strong>Bootcamp EduWork Sesi 8</strong> &bull; Integrasi PHP dengan Database MySQL/MariaDB</p>
            <p class="mb-0 text-muted">Dikembangkan menggunakan PHP 8.2 &bull; MySQLi Prepared Statements &bull; Bootstrap 5</p>
        </div>
    </footer>

    <!-- Bootstrap 5 Bundle JS -->
    <script src="https://cdn.jsdelivr.net/npm/bootstrap@5.3.3/dist/js/bootstrap.bundle.min.js" integrity="sha384-YvpcrYf0tY3lHB60NNkmXc5s9fDVZLESaAA55NDzOxhy9GkcIdslK1eN7N6jIeHz" crossorigin="anonymous"></script>
</body>
</html>
<?php
// Tutup koneksi database
if (isset($conn) && $conn instanceof mysqli) {
    $conn->close();
}
?>
