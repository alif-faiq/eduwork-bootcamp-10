// ==========================================
// 1. DATA JAVASCRIPT ARRAY (50 PRODUK UNIK)
// ==========================================
const products = [
  // Kategori: Elektronik (1-10)
  {
    id: 1,
    name: "Wireless Headphone Noise Cancelling Premium",
    category: "Elektronik",
    price: 1499000,
    image:
      "https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=600&auto=format&fit=crop&q=80",
    description:
      "Headphone nirkabel dengan kedap suara aktif (ANC), bass mendalam, serta baterai tahan hingga 30 jam.",
    rating: 4.8,
  },
  {
    id: 2,
    name: "Smartwatch AMOLED Sport Fitness Tracker",
    category: "Elektronik",
    price: 899000,
    image:
      "https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=600&auto=format&fit=crop&q=80",
    description:
      "Jam tangan pintar dengan pemantau detak jantung, SpO2, GPS presisi, dan layar AMOLED yang jernih.",
    rating: 4.6,
  },
  {
    id: 3,
    name: "Mouse Wireless Ergonomis Silent Click",
    category: "Elektronik",
    price: 249000,
    image:
      "https://images.unsplash.com/photo-1615663245857-ac93bb7c39e7?w=600&auto=format&fit=crop&q=80",
    description:
      "Mouse nirkabel desain ergonomis yang nyaman digunakan seharian tanpa suara klik yang mengganggu.",
    rating: 4.5,
  },
  {
    id: 4,
    name: "Keyboard Mekanikal RGB Wireless Tactile Switch",
    category: "Elektronik",
    price: 750000,
    image:
      "https://images.unsplash.com/photo-1587829741301-dc798b83add3?w=600&auto=format&fit=crop&q=80",
    description:
      "Keyboard mekanikal 75% dengan backlight RGB yang memukau dan daya tahan switch hingga 50 juta kali.",
    rating: 4.9,
  },
  {
    id: 5,
    name: "Speaker Bluetooth Portable Waterproof Bass",
    category: "Elektronik",
    price: 450000,
    image:
      "https://images.unsplash.com/photo-1608043152269-423dbba4e7e1?w=600&auto=format&fit=crop&q=80",
    description:
      "Speaker portable tahan air rating IPX7 dengan suara stereo jernih dan bass ekstra.",
    rating: 4.7,
  },
  {
    id: 6,
    name: "Webcam Full HD 1080p Dual Microphone",
    category: "Elektronik",
    price: 350000,
    image:
      "https://images.unsplash.com/photo-1588702547919-26089e690ecc?w=600&auto=format&fit=crop&q=80",
    description:
      "Kamera web untuk rapat online dan streaming dengan auto-focus serta mikrofon peredam bising.",
    rating: 4.4,
  },
  {
    id: 7,
    name: "Powerbank Fast Charging 20000mAh Dual Output",
    category: "Elektronik",
    price: 299000,
    image:
      "https://images.unsplash.com/photo-1609091839311-d5365f9ff1c5?w=600&auto=format&fit=crop&q=80",
    description:
      "Pengisi daya portabel kapasitas besar dengan teknologi Quick Charge 3.0 dan Power Delivery.",
    rating: 4.8,
  },
  {
    id: 8,
    name: "Monitor LED 24 Inch Full HD IPS 75Hz",
    category: "Elektronik",
    price: 1850000,
    image:
      "https://images.unsplash.com/photo-1527443224154-c4a3942d3acf?w=600&auto=format&fit=crop&q=80",
    description:
      "Monitor visual ultra-jernih dengan bezel tipis, akurasi warna tinggi, dan fitur eye-care.",
    rating: 4.9,
  },
  {
    id: 9,
    name: "Tablet Android 10 Inch HD IPS Display",
    category: "Elektronik",
    price: 2299000,
    image:
      "https://images.unsplash.com/photo-1544244015-0df4b3ffc6b0?w=600&auto=format&fit=crop&q=80",
    description:
      "Tablet praktis untuk edukasi dan hiburan dengan prosesor octa-core dan speaker stereo.",
    rating: 4.5,
  },
  {
    id: 10,
    name: "Earbuds TWS Active Noise Reduction Bluetooth 5.3",
    category: "Elektronik",
    price: 389000,
    image:
      "https://images.unsplash.com/photo-1590658268037-6bf12165a8df?w=600&auto=format&fit=crop&q=80",
    description:
      "Earphone TWS berdesain ringkas dengan suara jernih dan latency sangat rendah untuk gaming.",
    rating: 4.6,
  },

  // Kategori: Pakaian (11-20)
  {
    id: 11,
    name: "Kaos Oversize Cotton Combed 30s Minimalis",
    category: "Pakaian",
    price: 99000,
    image:
      "https://images.unsplash.com/photo-1521572267360-ee0c2909d518?w=600&auto=format&fit=crop&q=80",
    description:
      "Kaos kasual potongan oversized berbahan katun murni yang adem dan menyerap keringat.",
    rating: 4.7,
  },
  {
    id: 12,
    name: "Jaket Denim Classic Vintage Unisex",
    category: "Pakaian",
    price: 289000,
    image:
      "https://images.unsplash.com/photo-1576995853123-5a10305d93c0?w=600&auto=format&fit=crop&q=80",
    description:
      "Jaket jeans washed gaya klasik serbaguna yang cocok dipadupadankan untuk segala acara.",
    rating: 4.8,
  },
  {
    id: 13,
    name: "Kemeja Flannel Lengan Panjang Premium Cotton",
    category: "Pakaian",
    price: 179000,
    image:
      "https://images.unsplash.com/photo-1602810318383-e386cc2a3ccf?w=600&auto=format&fit=crop&q=80",
    description:
      "Kemeja flanel motif kotak-kotak modern dengan bahan lembut dan terasa hangat saat dipakai.",
    rating: 4.5,
  },
  {
    id: 14,
    name: "Hoodie Fleece Soft Cotton Warmth",
    category: "Pakaian",
    price: 220000,
    image:
      "https://images.unsplash.com/photo-1556905055-8f358a7a47b2?w=600&auto=format&fit=crop&q=80",
    description:
      "Sweater hoodie berbahan fleece tebal nan halus, lengkap dengan kantong kanguru.",
    rating: 4.9,
  },
  {
    id: 15,
    name: "Celana Chino Slim Fit Stretch Comfort",
    category: "Pakaian",
    price: 195000,
    image:
      "https://images.unsplash.com/photo-1624378439575-d8705ad7ae80?w=600&auto=format&fit=crop&q=80",
    description:
      "Celana chino semi-formal lentur yang memberikan kebebasan bergerak maksimal.",
    rating: 4.6,
  },
  {
    id: 16,
    name: "Sweater Rajut Casual Minimalist Knitwear",
    category: "Pakaian",
    price: 165000,
    image:
      "https://images.unsplash.com/photo-1620799140408-edc6dcb6d633?w=600&auto=format&fit=crop&q=80",
    description:
      "Sweater rajut bergaya Korean style yang simpel, halus, dan elegan.",
    rating: 4.4,
  },
  {
    id: 17,
    name: "Celana Jeans Regular Fit Dark Blue Denim",
    category: "Pakaian",
    price: 245000,
    image:
      "https://images.unsplash.com/photo-1541099649105-f69ad21f3246?w=600&auto=format&fit=crop&q=80",
    description:
      "Celana jeans potongan klasik dengan bahan denim tahan lama dan warna dark blue autentik.",
    rating: 4.7,
  },
  {
    id: 18,
    name: "Jaket Bomber Waterproof Urban Style",
    category: "Pakaian",
    price: 260000,
    image:
      "https://images.unsplash.com/photo-1591047139829-d91aecb6caea?w=600&auto=format&fit=crop&q=80",
    description:
      "Jaket bomber tahan percikan air dengan furing tebal yang tahan angin.",
    rating: 4.8,
  },
  {
    id: 19,
    name: "Kemeja Polos Casual Short Sleeve Linen",
    category: "Pakaian",
    price: 135000,
    image:
      "https://images.unsplash.com/photo-1596755094514-f87e34085b2c?w=600&auto=format&fit=crop&q=80",
    description:
      "Kemeja berlengan pendek bahan katun linen yang sejuk untuk penampilan santai sehari-hari.",
    rating: 4.5,
  },
  {
    id: 20,
    name: "Celana Jogger Sporty Cotton Fleece",
    category: "Pakaian",
    price: 140000,
    image:
      "https://images.unsplash.com/photo-1552902865-b72c031ac5ea?w=600&auto=format&fit=crop&q=80",
    description:
      "Celana jogger kasual dengan karet pinggang elastis dan tali yang nyaman untuk berolahraga.",
    rating: 4.6,
  },

  // Kategori: Sepatu (21-30)
  {
    id: 21,
    name: "Sepatu Sneakers Running Light Cushioning",
    category: "Sepatu",
    price: 389000,
    image:
      "https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=600&auto=format&fit=crop&q=80",
    description:
      "Sepatu olahraga lari yang sangat ringan dengan bantalan empuk penahan benturan.",
    rating: 4.8,
  },
  {
    id: 22,
    name: "Sepatu Slip On Canvas Casual Daily Wear",
    category: "Sepatu",
    price: 185000,
    image:
      "https://images.unsplash.com/photo-1560769629-975ec94e6a86?w=600&auto=format&fit=crop&q=80",
    description:
      "Sepatu slip on kanvas praktis tanpa tali, sangat elastis dan cocok untuk aktivitas harian.",
    rating: 4.5,
  },
  {
    id: 23,
    name: "Sepatu Pantofel Kulit Asli Formal Executive",
    category: "Sepatu",
    price: 499000,
    image:
      "https://images.unsplash.com/photo-1614252235316-8c857d38b5f4?w=600&auto=format&fit=crop&q=80",
    description:
      "Sepatu kerja formal dari bahan kulit asli berkualitas dengan jahitan yang rapi dan kuat.",
    rating: 4.9,
  },
  {
    id: 24,
    name: "Sepatu Gunung Outdoor Waterproof Grip",
    category: "Sepatu",
    price: 575000,
    image:
      "https://images.unsplash.com/photo-1520639888713-7851133b1ed0?w=600&auto=format&fit=crop&q=80",
    description:
      "Sepatu trekking dengan sol karet anti-selip yang tangguh menaklukkan berbagai medan ekstrim.",
    rating: 4.8,
  },
  {
    id: 25,
    name: "Sepatu Basket High Top Ankle Support",
    category: "Sepatu",
    price: 680000,
    image:
      "https://images.unsplash.com/photo-1579338559194-a162d19bf842?w=600&auto=format&fit=crop&q=80",
    description:
      "Sepatu basket dengan desain high top untuk pelindung pergelangan kaki dan traksi maksimal.",
    rating: 4.7,
  },
  {
    id: 26,
    name: "Sandal Casual Strap Synthetic Leather",
    category: "Sepatu",
    price: 125000,
    image:
      "https://images.unsplash.com/photo-1603808033192-082d6919d3e1?w=600&auto=format&fit=crop&q=80",
    description:
      "Sandal kasual model strap berbahan kulit sintetis awet yang cocok untuk suasana santai.",
    rating: 4.4,
  },
  {
    id: 27,
    name: "Sepatu Loafers Casual Premium Suede",
    category: "Sepatu",
    price: 340000,
    image:
      "https://images.unsplash.com/photo-1533867617858-e7b97e060509?w=600&auto=format&fit=crop&q=80",
    description:
      "Sepatu loafers bergaya smart casual dari bahan suede lembut yang modis.",
    rating: 4.6,
  },
  {
    id: 28,
    name: "Sepatu Sport Performance Running Elite",
    category: "Sepatu",
    price: 520000,
    image:
      "https://images.unsplash.com/photo-1584735935682-2f2b69dff9d2?w=600&auto=format&fit=crop&q=80",
    description:
      "Sepatu olahraga profesional dengan aliran udara mesh optimal untuk menjaga kesegaran kaki.",
    rating: 4.8,
  },
  {
    id: 29,
    name: "Sepatu Classic White Canvas Low Top",
    category: "Sepatu",
    price: 210000,
    image:
      "https://images.unsplash.com/photo-1525966222134-fcfa99b8ae77?w=600&auto=format&fit=crop&q=80",
    description:
      "Sneakers kanvas putih timeless yang menjadi pelengkap penampilan paling serbaguna.",
    rating: 4.7,
  },
  {
    id: 30,
    name: "Sandal Gunung Tough Grip All-Terrain",
    category: "Sepatu",
    price: 160000,
    image:
      "https://images.unsplash.com/photo-1562183241-b937e95585b6?w=600&auto=format&fit=crop&q=80",
    description:
      "Sandal outdoor dengan tali webbing kuat dan insole yang membentuk kontur telapak kaki.",
    rating: 4.5,
  },

  // Kategori: Aksesoris (31-40)
  {
    id: 31,
    name: "Jam Tangan Pria Chronograph Leather Strap",
    category: "Aksesoris",
    price: 650000,
    image:
      "https://images.unsplash.com/photo-1524805444758-089113d48a6d?w=600&auto=format&fit=crop&q=80",
    description:
      "Jam tangan analog pria dengan chronograph aktif dan strap kulit asli bermutu tinggi.",
    rating: 4.9,
  },
  {
    id: 32,
    name: "Kacamata Hitam Polarized UV400 Protection",
    category: "Aksesoris",
    price: 145000,
    image:
      "https://images.unsplash.com/photo-1511499767150-a48a237f0083?w=600&auto=format&fit=crop&q=80",
    description:
      "Kacamata hitam dengan lensa terpolarisasi untuk menangkal silau matahari dan radiasi UV.",
    rating: 4.6,
  },
  {
    id: 33,
    name: "Dompet Kulit Asli Lipat Minimalis RFID",
    category: "Aksesoris",
    price: 175000,
    image:
      "https://images.unsplash.com/photo-1627123424574-724758594e93?w=600&auto=format&fit=crop&q=80",
    description:
      "Dompet pria berbahan kulit asli dengan perlindungan anti-skimming RFID untuk keamanan kartu.",
    rating: 4.8,
  },
  {
    id: 34,
    name: "Ransel Laptop Canvas Anti Air 15.6 Inch",
    category: "Aksesoris",
    price: 275000,
    image:
      "https://images.unsplash.com/photo-1553062407-98eeb64c6a62?w=600&auto=format&fit=crop&q=80",
    description:
      "Tas punggung modern dengan kompartemen khusus laptop tebal dan slot port pengisian USB.",
    rating: 4.7,
  },
  {
    id: 35,
    name: "Topi Baseball Canvas Custom Classic Curved",
    category: "Aksesoris",
    price: 75000,
    image:
      "https://images.unsplash.com/photo-1588850561407-ed78c282e89b?w=600&auto=format&fit=crop&q=80",
    description:
      "Topi baseball bergaya sporty dengan pengatur lingkar kepala kuningan antik di belakang.",
    rating: 4.5,
  },
  {
    id: 36,
    name: "Tas Selempang Messenger Unisex Casual",
    category: "Aksesoris",
    price: 189000,
    image:
      "https://images.unsplash.com/photo-1548036328-c9fa89d128fa?w=600&auto=format&fit=crop&q=80",
    description:
      "Tas slingbag fungsional berukuran sedang dengan banyak kantong penyimpanan teratur.",
    rating: 4.6,
  },
  {
    id: 37,
    name: "Sabuk Kulit Asli Premium Buckle Automatic",
    category: "Aksesoris",
    price: 135000,
    image:
      "https://images.unsplash.com/photo-1624222247344-550fb60583dc?w=600&auto=format&fit=crop&q=80",
    description:
      "Ikat pinggang pria sistem rel otomatis modern dari bahan kulit selapis yang awet.",
    rating: 4.7,
  },
  {
    id: 38,
    name: "Gelang Titanium Minimalis Silver Anti Karat",
    category: "Aksesoris",
    price: 85000,
    image:
      "https://images.unsplash.com/photo-1611591475113-5b8d003b87a8?w=600&auto=format&fit=crop&q=80",
    description:
      "Gelang gaya simpel berbahan titanium murni yang tidak mudah pudar atau menimbulkan alergi.",
    rating: 4.4,
  },
  {
    id: 39,
    name: "Kalung Titanium Pendant Classic Geometry",
    category: "Aksesoris",
    price: 95000,
    image:
      "https://images.unsplash.com/photo-1599643478518-a784e5dc4c8f?w=600&auto=format&fit=crop&q=80",
    description:
      "Kalung liontin elegan yang tahan karat, tahan air, dan melengkapi style harian.",
    rating: 4.5,
  },
  {
    id: 40,
    name: "Tas Waistbag Sport Utility Water Resistant",
    category: "Aksesoris",
    price: 120000,
    image:
      "https://images.unsplash.com/photo-1522335789203-aabd1fc54bc9?w=600&auto=format&fit=crop&q=80",
    description:
      "Tas pinggang serbaguna yang cocok dibawa saat berolahraga, bersepeda, maupun jalan-jalan.",
    rating: 4.6,
  },

  // Kategori: Peralatan Rumah (41-50)
  {
    id: 41,
    name: "Lampu Meja Belajar LED Smart Touch Control",
    category: "Peralatan Rumah",
    price: 165000,
    image:
      "https://images.unsplash.com/photo-1534073828943-f801091bb18c?w=600&auto=format&fit=crop&q=80",
    description:
      "Lampu meja fleksibel dengan 3 mode pencahayaan dan pelindung mata dari sinar radiasi.",
    rating: 4.7,
  },
  {
    id: 42,
    name: "Air Humidifier Diffuser Aromatherapy 500ml",
    category: "Peralatan Rumah",
    price: 199000,
    image:
      "https://images.unsplash.com/photo-1540555700478-4be289fbecef?w=600&auto=format&fit=crop&q=80",
    description:
      "Pelembab udara ruangan dengan mode lampu malam LED RGB dan diffuser minyak esensial.",
    rating: 4.8,
  },
  {
    id: 43,
    name: "Blender Portable 6 Pisau Stainless Rechargeable",
    category: "Peralatan Rumah",
    price: 185000,
    image:
      "https://images.unsplash.com/photo-1570222094114-d054a817e56b?w=600&auto=format&fit=crop&q=80",
    description:
      "Blender praktis isi ulang baterai untuk membuat jus segar di mana saja secara instan.",
    rating: 4.5,
  },
  {
    id: 44,
    name: "Teko Listrik Stainless Steel 1.8L Auto Off",
    category: "Peralatan Rumah",
    price: 140000,
    image:
      "https://images.unsplash.com/photo-1594212699903-ec8a3eca50f6?w=600&auto=format&fit=crop&q=80",
    description:
      "Teko pemanas air pembuat kopi dan teh yang cepat mendidih dengan pemutus arus otomatis.",
    rating: 4.6,
  },
  {
    id: 45,
    name: "Robot Vacuum Cleaner Smart Sensor Quiet",
    category: "Peralatan Rumah",
    price: 1250000,
    image:
      "https://images.unsplash.com/photo-1558317374-067fb5f30001?w=600&auto=format&fit=crop&q=80",
    description:
      "Pembersih lantai otomatis dengan sensor anti-jatuh dan kemampuan menyapu serta mengepel.",
    rating: 4.9,
  },
  {
    id: 46,
    name: "Timbangan Badan Digital Presisi Tempered Glass",
    category: "Peralatan Rumah",
    price: 110000,
    image:
      "https://images.unsplash.com/photo-1519389950473-47ba0277781c?w=600&auto=format&fit=crop&q=80",
    description:
      "Timbangan digital mengukur berat badan akurat dengan kaca tempered tebal tahan beban.",
    rating: 4.6,
  },
  {
    id: 47,
    name: "Rice Cooker Mini Digital 1.2L Non-Stick",
    category: "Peralatan Rumah",
    price: 380000,
    image:
      "https://images.unsplash.com/photo-1544816155-12df9643f363?w=600&auto=format&fit=crop&q=80",
    description:
      "Penanak nasi elektrik pintar serbaguna cocok untuk keluarga kecil atau anak kos.",
    rating: 4.8,
  },
  {
    id: 48,
    name: "Air Fryer 3.5L Low Watt Eco Friendly",
    category: "Peralatan Rumah",
    price: 749000,
    image:
      "https://images.unsplash.com/photo-1585515320310-259814833e62?w=600&auto=format&fit=crop&q=80",
    description:
      "Penggoreng tanpa minyak untuk hasil masakan lebih sehat dan hemat konsumsi daya listrik.",
    rating: 4.9,
  },
  {
    id: 49,
    name: "Coffee Maker Drip Machine 0.6L Warm Keep",
    category: "Peralatan Rumah",
    price: 299000,
    image:
      "https://images.unsplash.com/photo-1517668808822-9e4288246ede?w=600&auto=format&fit=crop&q=80",
    description:
      "Mesin pembuat kopi drip otomatis dengan teko kaca dan piringan pemanas menjaga kehangatan.",
    rating: 4.7,
  },
  {
    id: 50,
    name: "Set Pisau Dapur Stainless Steel Premium 6 in 1",
    category: "Peralatan Rumah",
    price: 155000,
    image:
      "https://images.unsplash.com/photo-1593618998160-e34014e67546?w=600&auto=format&fit=crop&q=80",
    description:
      "Set pisau koki profesional tajam dengan lapisan anti-lengket dan gunting dapur multifungsi.",
    rating: 4.8,
  },
];
