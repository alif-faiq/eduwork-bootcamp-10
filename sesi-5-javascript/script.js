// ==========================================
// 2. STATE MANAGEMENT & STATE VARIABLES
// ==========================================
let state = {
  currentCategory: "Semua",
  searchQuery: "",
  sortBy: "default",
  cart: [],
};

const categories = [
  "Semua",
  "Elektronik",
  "Pakaian",
  "Sepatu",
  "Aksesoris",
  "Peralatan Rumah",
];

// DOM Elements
const productGrid = document.getElementById("productGrid");
const emptyState = document.getElementById("emptyState");
const statusInfo = document.getElementById("statusInfo");
const categoryContainer = document.getElementById("categoryContainer");
const searchInputNav = document.getElementById("searchInputNav");
const searchInputMobile = document.getElementById("searchInputMobile");
const clearSearchNav = document.getElementById("clearSearchNav");
const sortSelect = document.getElementById("sortSelect");
const resetFiltersBtn = document.getElementById("resetFiltersBtn");

// Cart DOM Elements
const cartBtn = document.getElementById("cartBtn");
const cartOverlay = document.getElementById("cartOverlay");
const cartDrawer = document.getElementById("cartDrawer");
const closeCartBtn = document.getElementById("closeCartBtn");
const cartItemsContainer = document.getElementById("cartItemsContainer");
const cartBadge = document.getElementById("cartBadge");
const cartCountBadge = document.getElementById("cartCountBadge");
const cartSubtotal = document.getElementById("cartSubtotal");
const cartTotal = document.getElementById("cartTotal");
const checkoutBtn = document.getElementById("checkoutBtn");

// Modal DOM Elements
const detailModalOverlay = document.getElementById("detailModalOverlay");
const detailModal = document.getElementById("detailModal");
const detailModalContent = document.getElementById("detailModalContent");
const closeDetailModal = document.getElementById("closeDetailModal");

// ==========================================
// 3. UTILITY HELPER FUNCTIONS
// ==========================================
// Format Currency to Indonesian Rupiah
function formatRupiah(amount) {
  return new Intl.NumberFormat("id-ID", {
    style: "currency",
    currency: "IDR",
    maximumFractionDigits: 0,
  }).format(amount);
}

// Render Star Rating HTML
function renderRatingStars(rating) {
  const fullStars = Math.floor(rating);
  const hasHalfStar = rating % 1 >= 0.5;
  let starsHTML = "";

  for (let i = 1; i <= 5; i++) {
    if (i <= fullStars) {
      starsHTML += `<i class="fa-solid fa-star text-amber-400"></i>`;
    } else if (i === fullStars + 1 && hasHalfStar) {
      starsHTML += `<i class="fa-solid fa-star-half-stroke text-amber-400"></i>`;
    } else {
      starsHTML += `<i class="fa-regular fa-star text-slate-300"></i>`;
    }
  }

  return `
                <div class="flex items-center gap-1 text-xs">
                    ${starsHTML}
                    <span class="font-bold text-slate-700 ml-1">${rating.toFixed(1)}</span>
                </div>
            `;
}

// Show Custom Toast Notification
function showToast(message, icon = "fa-check-circle", color = "bg-slate-900") {
  const toastContainer = document.getElementById("toastContainer");
  const toast = document.createElement("div");
  toast.className = `${color} text-white px-4 py-3 rounded-2xl shadow-xl flex items-center gap-3 text-sm font-semibold transform translate-y-5 opacity-0 transition-all duration-300 pointer-events-auto`;
  toast.innerHTML = `<i class="fa-solid ${icon} text-lg"></i><span>${message}</span>`;

  toastContainer.appendChild(toast);

  // Animate In
  setTimeout(() => {
    toast.classList.remove("translate-y-5", "opacity-0");
  }, 10);

  // Animate Out & Remove
  setTimeout(() => {
    toast.classList.add("translate-y-5", "opacity-0");
    setTimeout(() => toast.remove(), 300);
  }, 2500);
}

// ==========================================
// 4. CORE FILTER & SORTING LOGIC
// ==========================================
function getFilteredProducts() {
  let result = [...products];

  // Filter Kategori
  if (state.currentCategory !== "Semua") {
    result = result.filter((item) => item.category === state.currentCategory);
  }

  // Filter Pencarian (Nama & Deskripsi)
  if (state.searchQuery.trim() !== "") {
    const query = state.searchQuery.toLowerCase().trim();
    result = result.filter(
      (item) =>
        item.name.toLowerCase().includes(query) ||
        item.description.toLowerCase().includes(query),
    );
  }

  // Pengurutan (Sorting)
  switch (state.sortBy) {
    case "price-asc":
      result.sort((a, b) => a.price - b.price);
      break;
    case "price-desc":
      result.sort((a, b) => b.price - a.price);
      break;
    case "name-asc":
      result.sort((a, b) => a.name.localeCompare(b.name));
      break;
    case "name-desc":
      result.sort((a, b) => b.name.localeCompare(a.name));
      break;
    case "rating-desc":
      result.sort((a, b) => b.rating - a.rating);
      break;
    default:
      // Preserve original ID order
      result.sort((a, b) => a.id - b.id);
  }

  return result;
}

// Render Category Pills UI
function renderCategories() {
  categoryContainer.innerHTML = categories
    .map((cat) => {
      const isActive = cat === state.currentCategory;
      const activeClasses = isActive
        ? "bg-brand-600 text-white shadow-md shadow-brand-600/20"
        : "bg-slate-100 hover:bg-slate-200 text-slate-700";

      return `
                    <button onclick="setCategory('${cat}')" class="px-4 py-2 rounded-full text-xs font-bold whitespace-nowrap transition-all duration-200 flex items-center gap-1.5 ${activeClasses}">
                        ${cat === "Semua" ? '<i class="fa-solid fa-border-all text-[11px]"></i>' : ""}
                        ${cat}
                    </button>
                `;
    })
    .join("");
}

// Render Product Cards
function renderProducts() {
  const filtered = getFilteredProducts();

  // Update Status Count Text
  statusInfo.innerText = `Menampilkan ${filtered.length} dari ${products.length} produk`;

  // Empty State Handling
  if (filtered.length === 0) {
    productGrid.innerHTML = "";
    emptyState.classList.remove("hidden");
    emptyState.classList.add("flex");
    return;
  } else {
    emptyState.classList.add("hidden");
    emptyState.classList.remove("flex");
  }

  // Render Product Cards Grid
  productGrid.innerHTML = filtered
    .map((product) => {
      return `
                    <div class="group bg-white rounded-2xl border border-slate-200/80 overflow-hidden shadow-sm hover:shadow-xl transition-all duration-300 flex flex-col hover:-translate-y-1">
                        <!-- Image Container -->
                        <div class="relative aspect-square overflow-hidden bg-slate-100 cursor-pointer" onclick="openDetailModal(${product.id})">
                            <img src="${product.image}" alt="${product.name}" 
                                loading="lazy"
                                onerror="this.src='https://placehold.co/600x600/f1f5f9/475569?text=NexaStore'"
                                class="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500">
                            
                            <!-- Category Badge -->
                            <span class="absolute top-3 left-3 bg-white/90 backdrop-blur-md text-slate-800 text-[10px] font-extrabold px-2.5 py-1 rounded-full shadow-sm">
                                ${product.category}
                            </span>
                        </div>

                        <!-- Card Body -->
                        <div class="p-4 flex-1 flex flex-col justify-between space-y-3">
                            <div class="space-y-1.5">
                                <!-- Rating Stars -->
                                ${renderRatingStars(product.rating)}

                                <!-- Name -->
                                <h3 onclick="openDetailModal(${product.id})" class="font-bold text-slate-800 text-sm sm:text-base hover:text-brand-600 transition-colors cursor-pointer line-clamp-1" title="${product.name}">
                                    ${product.name}
                                </h3>

                                <!-- Truncated Description -->
                                <p class="text-xs text-slate-500 line-clamp-2 leading-relaxed">
                                    ${product.description}
                                </p>
                            </div>

                            <!-- Footer Price & Actions -->
                            <div class="pt-2 border-t border-slate-100 flex items-center justify-between gap-2">
                                <div class="flex flex-col">
                                    <span class="text-[10px] font-bold uppercase text-slate-400">Harga</span>
                                    <span class="text-base sm:text-lg font-black text-brand-600">
                                        ${formatRupiah(product.price)}
                                    </span>
                                </div>

                                <div class="flex items-center gap-1.5">
                                    <button onclick="openDetailModal(${product.id})" title="Lihat Detail" class="p-2.5 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-600 text-xs font-semibold transition-colors">
                                        <i class="fa-solid fa-eye"></i>
                                    </button>
                                    <button onclick="addToCart(${product.id})" title="Tambah ke Keranjang" class="p-2.5 sm:px-3.5 rounded-xl bg-brand-600 hover:bg-brand-700 text-white text-xs font-bold transition-all shadow-md shadow-brand-600/20 active:scale-95 flex items-center gap-1">
                                        <i class="fa-solid fa-cart-plus"></i>
                                        <span class="hidden xl:inline">+Beli</span>
                                    </button>
                                </div>
                            </div>
                        </div>
                    </div>
                `;
    })
    .join("");
}

// ==========================================
// 5. SHOPPING CART LOGIC
// ==========================================
function addToCart(productId, qty = 1) {
  const product = products.find((p) => p.id === productId);
  if (!product) return;

  const existingIndex = state.cart.findIndex((item) => item.id === productId);
  if (existingIndex > -1) {
    state.cart[existingIndex].qty += qty;
  } else {
    state.cart.push({ ...product, qty: qty });
  }

  updateCartUI();
  showToast(
    `"<b>${product.name.slice(0, 22)}...</b>" berhasil ditambahkan!`,
    "fa-cart-plus",
    "bg-emerald-600",
  );
}

function updateQuantity(productId, delta) {
  const item = state.cart.find((p) => p.id === productId);
  if (item) {
    item.qty += delta;
    if (item.qty <= 0) {
      removeFromCart(productId);
    } else {
      updateCartUI();
    }
  }
}

function removeFromCart(productId) {
  state.cart = state.cart.filter((item) => item.id !== productId);
  updateCartUI();
  showToast("Produk dihapus dari keranjang", "fa-trash-can", "bg-slate-800");
}

function updateCartUI() {
  const totalItems = state.cart.reduce((acc, item) => acc + item.qty, 0);
  const subtotal = state.cart.reduce(
    (acc, item) => acc + item.price * item.qty,
    0,
  );

  // Update Badge Count
  cartBadge.innerText = totalItems;
  cartCountBadge.innerText = `${totalItems} Item`;

  if (totalItems > 0) {
    cartBadge.classList.remove("scale-0");
  } else {
    cartBadge.classList.add("scale-0");
  }

  // Render Items List
  if (state.cart.length === 0) {
    cartItemsContainer.innerHTML = `
                    <div class="h-full flex flex-col items-center justify-center text-center p-6 space-y-3">
                        <div class="w-16 h-16 rounded-full bg-slate-100 flex items-center justify-center text-slate-300 text-2xl">
                            <i class="fa-solid fa-basket-shopping"></i>
                        </div>
                        <p class="font-bold text-slate-700 text-sm">Keranjang Anda Masih Kosong</p>
                        <p class="text-xs text-slate-400">Pilih produk favorit Anda dari katalog dan tambahkan ke sini.</p>
                    </div>
                `;
  } else {
    cartItemsContainer.innerHTML = state.cart
      .map(
        (item) => `
                    <div class="flex items-center gap-3 p-3 bg-slate-50 rounded-2xl border border-slate-100">
                        <img src="${item.image}" alt="${item.name}" class="w-16 h-16 rounded-xl object-cover bg-white border border-slate-200 shrink-0">
                        
                        <div class="flex-1 min-w-0 space-y-1">
                            <h4 class="text-xs font-bold text-slate-800 truncate" title="${item.name}">${item.name}</h4>
                            <p class="text-xs font-black text-brand-600">${formatRupiah(item.price)}</p>
                            
                            <!-- Quantity Controller -->
                            <div class="flex items-center gap-2 pt-1">
                                <div class="flex items-center border border-slate-200 bg-white rounded-lg">
                                    <button onclick="updateQuantity(${item.id}, -1)" class="w-6 h-6 flex items-center justify-center text-slate-600 hover:bg-slate-100 rounded-l-lg text-xs font-bold">-</button>
                                    <span class="w-8 text-center text-xs font-bold text-slate-800">${item.qty}</span>
                                    <button onclick="updateQuantity(${item.id}, 1)" class="w-6 h-6 flex items-center justify-center text-slate-600 hover:bg-slate-100 rounded-r-lg text-xs font-bold">+</button>
                                </div>
                            </div>
                        </div>

                        <button onclick="removeFromCart(${item.id})" class="p-2 text-slate-400 hover:text-red-500 rounded-lg transition-colors">
                            <i class="fa-solid fa-trash-can text-sm"></i>
                        </button>
                    </div>
                `,
      )
      .join("");
  }

  // Update Total Prices
  cartSubtotal.innerText = formatRupiah(subtotal);
  cartTotal.innerText = formatRupiah(subtotal);
}

// Cart Drawer Controls
function openCart() {
  cartOverlay.classList.remove("opacity-0", "pointer-events-none");
  cartDrawer.classList.remove("translate-x-full");
}

function closeCart() {
  cartOverlay.classList.add("opacity-0", "pointer-events-none");
  cartDrawer.classList.add("translate-x-full");
}

// ==========================================
// 6. PRODUCT DETAIL MODAL LOGIC
// ==========================================
function openDetailModal(productId) {
  const product = products.find((p) => p.id === productId);
  if (!product) return;

  detailModalContent.innerHTML = `
                <div class="aspect-square bg-slate-100 overflow-hidden relative">
                    <img src="${product.image}" alt="${product.name}" class="w-full h-full object-cover">
                    <span class="absolute top-4 left-4 bg-white/90 backdrop-blur-md text-slate-800 text-xs font-bold px-3 py-1 rounded-full shadow-sm">
                        ${product.category}
                    </span>
                </div>
                <div class="p-6 sm:p-8 flex flex-col justify-between space-y-6">
                    <div class="space-y-4">
                        ${renderRatingStars(product.rating)}
                        <h2 class="text-xl font-extrabold text-slate-900 leading-snug">${product.name}</h2>
                        <div class="text-2xl font-black text-brand-600">${formatRupiah(product.price)}</div>
                        <p class="text-sm text-slate-600 leading-relaxed">${product.description}</p>
                        
                        <div class="space-y-2 pt-2">
                            <div class="flex items-center gap-2 text-xs text-slate-500 font-semibold">
                                <i class="fa-solid fa-shield-halved text-emerald-500"></i> Garansi Resmi 1 Tahun
                            </div>
                            <div class="flex items-center gap-2 text-xs text-slate-500 font-semibold">
                                <i class="fa-solid fa-truck-fast text-brand-500"></i> Stok Tersedia & Siap Kirim Hari Ini
                            </div>
                        </div>
                    </div>

                    <div class="space-y-3 pt-4 border-t border-slate-100">
                        <button onclick="addToCart(${product.id}); closeDetail();" class="w-full py-3.5 bg-brand-600 hover:bg-brand-700 text-white font-bold rounded-xl shadow-lg shadow-brand-600/30 transition-all flex items-center justify-center gap-2">
                            <i class="fa-solid fa-cart-plus"></i>
                            <span>Tambah Ke Keranjang</span>
                        </button>
                    </div>
                </div>
            `;

  detailModalOverlay.classList.remove("hidden");
  setTimeout(() => {
    detailModalOverlay.classList.remove("opacity-0");
    detailModal.classList.remove("scale-95");
    detailModal.classList.add("scale-100");
  }, 10);
}

function closeDetail() {
  detailModalOverlay.classList.add("opacity-0");
  detailModal.classList.remove("scale-100");
  detailModal.classList.add("scale-95");
  setTimeout(() => {
    detailModalOverlay.classList.add("hidden");
  }, 300);
}

// ==========================================
// 7. FILTER CONTROLLERS & EVENT LISTENERS
// ==========================================
function setCategory(categoryName) {
  state.currentCategory = categoryName;
  renderCategories();
  renderProducts();
}

function resetFilters() {
  state.currentCategory = "Semua";
  state.searchQuery = "";
  state.sortBy = "default";

  searchInputNav.value = "";
  searchInputMobile.value = "";
  sortSelect.value = "default";
  clearSearchNav.classList.add("hidden");

  renderCategories();
  renderProducts();
  showToast("Semua filter berhasil di-reset", "fa-rotate-left", "bg-slate-800");
}

// Event Listener Setup
document.addEventListener("DOMContentLoaded", () => {
  // Render Initial Views
  renderCategories();
  renderProducts();
  updateCartUI();

  // Real-time Search Handlers
  const handleSearchInput = (e) => {
    state.searchQuery = e.target.value;
    if (e.target.value.length > 0) {
      clearSearchNav.classList.remove("hidden");
    } else {
      clearSearchNav.classList.add("hidden");
    }
    renderProducts();
  };

  searchInputNav.addEventListener("input", handleSearchInput);
  searchInputMobile.addEventListener("input", handleSearchInput);

  clearSearchNav.addEventListener("click", () => {
    searchInputNav.value = "";
    searchInputMobile.value = "";
    state.searchQuery = "";
    clearSearchNav.classList.add("hidden");
    renderProducts();
  });

  // Sorting Handler
  sortSelect.addEventListener("change", (e) => {
    state.sortBy = e.target.value;
    renderProducts();
  });

  // Reset Button
  resetFiltersBtn.addEventListener("click", resetFilters);

  // Cart Drawer Events
  cartBtn.addEventListener("click", openCart);
  closeCartBtn.addEventListener("click", closeCart);
  cartOverlay.addEventListener("click", closeCart);

  // Detail Modal Events
  closeDetailModal.addEventListener("click", closeDetail);
  detailModalOverlay.addEventListener("click", (e) => {
    if (e.target === detailModalOverlay) closeDetail();
  });

  // Checkout Button Action
  checkoutBtn.addEventListener("click", () => {
    if (state.cart.length === 0) {
      showToast(
        "Keranjang belanja Anda masih kosong!",
        "fa-triangle-exclamation",
        "bg-amber-600",
      );
      return;
    }

    showToast(
      "Pesanan berhasil dibuat! Terima kasih telah berbelanja.",
      "fa-circle-check",
      "bg-emerald-600",
    );
    state.cart = [];
    updateCartUI();
    closeCart();
  });
});
