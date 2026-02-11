// ===========================
// DỮ LIỆU MENU
// ===========================
const menuData = {
    "CA PHÊ PHA MÁY": [
        { id: 1, name: "Cà phê đá", price: 12000 },
        { id: 2, name: "Cà phê đen", price: 10000 },
        { id: 3, name: "Cà phê sữa đá", price: 15000 },
        { id: 4, name: "Cà phê muối", price: 17000 },
        { id: 5, name: "Bạc xỉu", price: 18000 },
        { id: 6, name: "Ca cao sữa", price: 15000 }
    ],
    "SINH TỐ": [
        { id: 7, name: "Sinh tố Bơ", price: 20000 },
        { id: 8, name: "Sinh tố Sầu riêng", price: 25000 },
        { id: 9, name: "Sinh tố Mít", price: 20000 },
        { id: 10, name: "Sinh tố Dâu", price: 20000 },
        { id: 11, name: "Sinh tố Măng cầu", price: 20000 },
        { id: 12, name: "Sinh tố Kiwi", price: 20000 }
    ],
    "TRÀ TRÁI CÂY": [
        { id: 13, name: "Trà đào", price: 17000 },
        { id: 14, name: "Trà vải", price: 17000 },
        { id: 15, name: "Trà Kiwi", price: 17000 },
        { id: 16, name: "Trà chanh dây hạt đác", price: 20000 },
        { id: 17, name: "Trà dâu tằm hạt đác", price: 20000 },
        { id: 18, name: "Trà măng cầu", price: 20000 },
        { id: 19, name: "Trà chanh Thái xanh", price: 17000 },
        { id: 20, name: "Trà dưa lưới", price: 17000 },
        { id: 21, name: "Trà dâu", price: 17000 },
        { id: 22, name: "Trà ổi hồng", price: 17000 }
    ],
    "TRÀ SỮA": [
        { id: 23, name: "Trà sữa thái xanh", price: 20000 },
        { id: 24, name: "Trà sữa thái đỏ", price: 20000 },
        { id: 25, name: "Sữa tươi TCĐD", price: 20000 },
        { id: 26, name: "Trà sữa Matcha", price: 20000 },
        { id: 27, name: "Matcha latte", price: 20000 },
        { id: 28, name: "Cacao latte", price: 20000 },
        { id: 29, name: "Trà sữa việt quất", price: 20000 },
        { id: 30, name: "Trà sữa socola", price: 20000 }
    ],
    "ĂN VẶT": [
        { id: 31, name: "Bánh tráng trộn", price: 15000 },
        { id: 32, name: "Bò viên chiên", price: 15000 },
        { id: 33, name: "Cá viên chiên", price: 15000 },
        { id: 34, name: "Trái cây ly", price: 10000 },
        { id: 35, name: "Mì ly", price: 10000 },
        { id: 36, name: "Bánh Flan", price: 4000 },
        { id: 37, name: "Kem cây", price: 10000 }
    ],
    "ĐIỂM TÂM SÁNG": [
        { id: 38, name: "Hủ tiếu", price: 25000 },
        { id: 39, name: "Cơm sườn", price: 25000 }
    ],
    "GIẢI KHÁT": [
        { id: 40, name: "Lipton tắc xí muội", price: 10000 },
        { id: 41, name: "Tắc xí muội", price: 10000 },
        { id: 42, name: "Đá me", price: 10000 },
        { id: 43, name: "Trà đường", price: 8000 }
    ],
    "THUỐC LÁ": [
        { id: 44, name: "Saigon Melon", price: 22000 },
        { id: 45, name: "SaiGon Xì Gà", price: 22000 },
        { id: 46, name: "Hero", price: 25000 },
        { id: 47, name: "Jet", price: 30000 },
        { id: 48, name: "SaiGon Silver", price: 20000 }
    ],
    "ĐÁ XAY": [
        { id: 49, name: "Matcha Đá Xay", price: 25000 },
        { id: 50, name: "Oreo Đá Xay", price: 25000 }
    ],
    "SODA": [
        { id: 51, name: "Soda Đủ Vị", price: 15000 }
    ]
};

// ===========================
// STATE MANAGEMENT
// ===========================
let currentBill = {}; // { itemId: { item, quantity } }
let currentCategory = null;
let allItems = [];

// ===========================
// INITIALIZATION
// ===========================
document.addEventListener('DOMContentLoaded', function() {
    initializeApp();
    updateDateTime();
    setInterval(updateDateTime, 1000);
    loadLogoFromUpload();
});

function initializeApp() {
    // Flatten all items for search
    allItems = [];
    Object.keys(menuData).forEach(category => {
        menuData[category].forEach(item => {
            allItems.push({ ...item, category });
        });
    });
    
    renderCategoryTabs();
    renderMenuItems(Object.keys(menuData)[0]); // Show first category
    renderBill();
    setupEventListeners();
}

// ===========================
// LOGO HANDLING
// ===========================
function loadLogoFromUpload() {
    const logoImg = document.getElementById('logoImg');
    // Thử load logo từ uploads folder
    logoImg.src = '/mnt/user-data/uploads/1000660663.png';
    logoImg.onerror = function() {
        // Nếu không có, dùng placeholder
        logoImg.src = 'data:image/svg+xml,%3Csvg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 200 200"%3E%3Crect fill="%236F4E37" width="200" height="200"/%3E%3Ctext x="50%25" y="50%25" font-size="80" fill="white" text-anchor="middle" dy=".3em"%3E☕%3C/text%3E%3C/svg%3E';
    };
}

// ===========================
// DATETIME
// ===========================
function updateDateTime() {
    const now = new Date();
    const options = { 
        weekday: 'long', 
        year: 'numeric', 
        month: 'long', 
        day: 'numeric',
        hour: '2-digit',
        minute: '2-digit',
        second: '2-digit'
    };
    document.getElementById('datetime').textContent = now.toLocaleDateString('vi-VN', options);
}

// ===========================
// RENDER FUNCTIONS
// ===========================
function renderCategoryTabs() {
    const container = document.getElementById('categoryTabs');
    const categories = Object.keys(menuData);
    
    container.innerHTML = categories.map((category, index) => `
        <button class="category-tab ${index === 0 ? 'active' : ''}" data-category="${category}">
            ${category}
        </button>
    `).join('');
    
    currentCategory = categories[0];
}

function renderMenuItems(category = currentCategory) {
    const container = document.getElementById('menuItems');
    const items = menuData[category] || [];
    
    container.innerHTML = items.map(item => `
        <div class="menu-item" data-id="${item.id}">
            <div class="item-name">${item.name}</div>
            <div class="item-price">${formatPrice(item.price)}</div>
        </div>
    `).join('');
}

function renderBill() {
    const container = document.getElementById('billItems');
    const items = Object.values(currentBill);
    
    if (items.length === 0) {
        container.innerHTML = `
            <div class="empty-bill">
                <p>☕ Chưa có món nào</p>
                <p>Chọn món từ menu bên trái</p>
            </div>
        `;
    } else {
        container.innerHTML = items.map(({ item, quantity }) => `
            <div class="bill-item" data-id="${item.id}">
                <div class="item-info">
                    <div class="name">${item.name}</div>
                    <div class="price">${formatPrice(item.price)} × ${quantity}</div>
                </div>
                <div class="item-controls">
                    <div class="quantity-control">
                        <button class="btn-qty btn-decrease" data-id="${item.id}">−</button>
                        <span class="quantity-display">${quantity}</span>
                        <button class="btn-qty btn-increase" data-id="${item.id}">+</button>
                    </div>
                    <button class="btn-remove" data-id="${item.id}">🗑️</button>
                </div>
            </div>
        `).join('');
    }
    
    updateBillSummary();
}

function updateBillSummary() {
    const items = Object.values(currentBill);
    const totalItems = items.reduce((sum, { quantity }) => sum + quantity, 0);
    const totalPrice = items.reduce((sum, { item, quantity }) => sum + (item.price * quantity), 0);
    
    document.getElementById('totalItems').textContent = totalItems;
    document.getElementById('totalPrice').textContent = formatPrice(totalPrice);
}

// ===========================
// EVENT LISTENERS
// ===========================
function setupEventListeners() {
    // Category tabs
    document.getElementById('categoryTabs').addEventListener('click', (e) => {
        if (e.target.classList.contains('category-tab')) {
            document.querySelectorAll('.category-tab').forEach(tab => tab.classList.remove('active'));
            e.target.classList.add('active');
            currentCategory = e.target.dataset.category;
            renderMenuItems(currentCategory);
        }
    });
    
    // Menu items
    document.getElementById('menuItems').addEventListener('click', (e) => {
        const menuItem = e.target.closest('.menu-item');
        if (menuItem) {
            const itemId = parseInt(menuItem.dataset.id);
            addItemToBill(itemId);
        }
    });
    
    // Bill controls
    document.getElementById('billItems').addEventListener('click', (e) => {
        const itemId = parseInt(e.target.dataset.id);
        
        if (e.target.classList.contains('btn-increase')) {
            increaseQuantity(itemId);
        } else if (e.target.classList.contains('btn-decrease')) {
            decreaseQuantity(itemId);
        } else if (e.target.classList.contains('btn-remove')) {
            removeItem(itemId);
        }
    });
    
    // Search
    document.getElementById('searchInput').addEventListener('input', (e) => {
        const query = e.target.value.toLowerCase().trim();
        if (query === '') {
            renderMenuItems(currentCategory);
        } else {
            searchItems(query);
        }
    });
    
    // Action buttons
    document.getElementById('btnClearAll').addEventListener('click', clearAllItems);
    document.getElementById('btnPayment').addEventListener('click', processPayment);
    document.getElementById('btnCopy').addEventListener('click', copyBillToClipboard);
    document.getElementById('btnSMS').addEventListener('click', sendViaSMS);
    document.getElementById('btnWhatsApp').addEventListener('click', sendViaWhatsApp);
    document.getElementById('btnZalo').addEventListener('click', sendViaZalo);
    document.getElementById('btnQR').addEventListener('click', showQRPayment);

    // QR Modal
    document.getElementById('btnCloseQR').addEventListener('click', closeQRModal);
    document.getElementById('btnCloseQR2').addEventListener('click', closeQRModal);
    document.getElementById('btnConfirmPaid').addEventListener('click', confirmQRPaid);
    document.getElementById('qrModal').addEventListener('click', (e) => {
        if (e.target.id === 'qrModal') closeQRModal();
    });
    
    // Modal
    document.getElementById('btnCloseModal').addEventListener('click', closeModal);
    document.getElementById('paymentModal').addEventListener('click', (e) => {
        if (e.target.id === 'paymentModal') closeModal();
    });

    // Manage Modal
    document.getElementById('btnManage').addEventListener('click', openManageModal);
    document.getElementById('btnCloseManage').addEventListener('click', closeManageModal);
    document.getElementById('manageModal').addEventListener('click', (e) => {
        if (e.target.id === 'manageModal') closeManageModal();
    });

    // Manage Tabs
    document.querySelectorAll('.manage-tab').forEach(tab => {
        tab.addEventListener('click', () => switchManageTab(tab.dataset.tab));
    });

    // Filter in edit tab
    document.getElementById('filterCategory').addEventListener('change', renderEditList);
    document.getElementById('filterSearch').addEventListener('input', renderEditList);

    // Add item btn
    document.getElementById('btnAddItem').addEventListener('click', handleAddItem);

    // Add category btn
    document.getElementById('btnAddCategory').addEventListener('click', handleAddCategory);

    // Inline edit popup
    document.getElementById('btnCloseInlineEdit').addEventListener('click', closeInlineEdit);
    document.getElementById('btnSaveEdit').addEventListener('click', handleSaveEdit);
    document.getElementById('btnDeleteItem').addEventListener('click', handleDeleteItem);
    document.getElementById('inlineEditOverlay').addEventListener('click', (e) => {
        if (e.target.id === 'inlineEditOverlay') closeInlineEdit();
    });
}

// ===========================
// BILL MANAGEMENT
// ===========================
function addItemToBill(itemId) {
    const item = allItems.find(i => i.id === itemId);
    if (!item) return;
    
    if (currentBill[itemId]) {
        currentBill[itemId].quantity++;
    } else {
        currentBill[itemId] = { item, quantity: 1 };
    }
    
    renderBill();
    playAddSound();
}

function increaseQuantity(itemId) {
    if (currentBill[itemId]) {
        currentBill[itemId].quantity++;
        renderBill();
    }
}

function decreaseQuantity(itemId) {
    if (currentBill[itemId]) {
        if (currentBill[itemId].quantity > 1) {
            currentBill[itemId].quantity--;
        } else {
            delete currentBill[itemId];
        }
        renderBill();
    }
}

function removeItem(itemId) {
    if (confirm('Xóa món này khỏi hóa đơn?')) {
        delete currentBill[itemId];
        renderBill();
    }
}

function clearAllItems() {
    if (Object.keys(currentBill).length === 0) return;
    
    if (confirm('Xóa toàn bộ hóa đơn?')) {
        currentBill = {};
        renderBill();
    }
}

// ===========================
// SEARCH
// ===========================
function searchItems(query) {
    const container = document.getElementById('menuItems');
    const results = allItems.filter(item => 
        item.name.toLowerCase().includes(query)
    );
    
    if (results.length === 0) {
        container.innerHTML = '<div style="grid-column: 1/-1; text-align: center; padding: 2rem; color: #999;">Không tìm thấy món nào</div>';
    } else {
        container.innerHTML = results.map(item => `
            <div class="menu-item" data-id="${item.id}">
                <div class="item-name">${item.name}</div>
                <div class="item-price">${formatPrice(item.price)}</div>
            </div>
        `).join('');
    }
}

// ===========================
// PAYMENT & MESSAGING
// ===========================
function processPayment() {
    const items = Object.values(currentBill);
    if (items.length === 0) {
        alert('Chưa có món nào trong hóa đơn!');
        return;
    }
    
    const totalPrice = items.reduce((sum, { item, quantity }) => sum + (item.price * quantity), 0);
    
    document.getElementById('modalTotalPrice').textContent = formatPrice(totalPrice);
    document.getElementById('paymentModal').classList.add('show');
    
    // Reset bill sau 2 giây
    setTimeout(() => {
        currentBill = {};
        renderBill();
    }, 2000);
}

function closeModal() {
    document.getElementById('paymentModal').classList.remove('show');
}

function generateBillText() {
    const items = Object.values(currentBill);
    if (items.length === 0) {
        alert('Chưa có món nào trong hóa đơn!');
        return null;
    }
    
    let text = '☕ COFFEE SANG - HÓA ĐƠN\n';
    text += '_____\n\n';
    
    items.forEach(({ item, quantity }) => {
        const subtotal = item.price * quantity;
        text += `${item.name}\n`;
        text += `  ${formatPrice(item.price)} × ${quantity} = ${formatPrice(subtotal)}\n\n`;
    });
    
    const totalPrice = items.reduce((sum, { item, quantity }) => sum + (item.price * quantity), 0);
    text += '_____\n';
    text += `TỔNG TIỀN: ${formatPrice(totalPrice)}\n\n`;
    text += '';
    
    return text;
}

// ===========================
// COPY TO CLIPBOARD
// ===========================
function copyBillToClipboard() {
    const billText = generateBillText();
    if (!billText) return;
    
    const btn = document.getElementById('btnCopy');
    
    // Copy to clipboard
    navigator.clipboard.writeText(billText).then(() => {
        // Thành công - Hiệu ứng đã copy
        btn.classList.add('copied');
        btn.innerHTML = '✓ ĐÃ SAO CHÉP!';
        
        // Vibrate nếu có hỗ trợ (mobile)
        if (navigator.vibrate) {
            navigator.vibrate(100);
        }
        
        // Reset sau 2 giây
        setTimeout(() => {
            btn.classList.remove('copied');
            btn.innerHTML = '📋 SAO CHÉP ĐƠN';
        }, 2000);
        
    }).catch((err) => {
        // Lỗi - Hiển thị popup để copy thủ công
        const userCopy = prompt('Không thể tự động copy. Vui lòng copy nội dung bên dưới:', billText);
        if (userCopy !== null) {
            alert('✅ Hãy dán (Ctrl+V) vào Zalo!');
        }
    });
}

function sendViaSMS() {
    const billText = generateBillText();
    if (!billText) return;
    
    const phone = '0327002590';
    const url = `sms:${phone}?body=${encodeURIComponent(billText)}`;
    window.location.href = url;
}

function sendViaWhatsApp() {
    const billText = generateBillText();
    if (!billText) return;
    
    const phone = '84327002590'; // Format: 84 + số điện thoại
    const url = `https://wa.me/${phone}?text=${encodeURIComponent(billText)}`;
    window.open(url, '_blank');
}

function sendViaZalo() {
    const billText = generateBillText();
    if (!billText) return;
    
    // ========================================
    // CẤU HÌNH GỬI ZALO - CHỌN 1 TRONG 2 CÁCH
    // ========================================
    
    // CÁCH 1: GỬI CHO CÁ NHÂN (mặc định)
    // const phone = '0984771687';
    // const url = `https://zalo.me/${phone}`;
    
    // CÁCH 2: GỬI VÀO NHÓM ZALO (khuyên dùng)
    // Bước 1: Vào nhóm Zalo trên điện thoại/máy tính
    // Bước 2: Nhấn "Chia sẻ" → "Copy link"
    // Bước 3: Dán link vào đây (bỏ dấu // ở đầu dòng)
    
    const url = 'https://zalo.me/g/gfvfgn372';  // ← THAY BẰNG LINK NHÓM CỦA BẠN
    
    // ========================================
    
    // Mở Zalo
    window.open(url, '_blank');
    
    // Copy bill vào clipboard để dán
    navigator.clipboard.writeText(billText).then(() => {
        alert('✅ Đã copy hóa đơn!\n📱 Dán (Ctrl+V) vào nhóm Zalo để gửi.');
    }).catch(() => {
        // Nếu không copy được tự động, hiển thị bill
        prompt('Copy nội dung này và dán vào Zalo:', billText);
    });
}

// ===========================
// UTILITIES
// ===========================
function formatPrice(price) {
    return price.toLocaleString('vi-VN') + 'đ';
}

function playAddSound() {
    // Simple feedback sound (optional)
    const audio = new Audio('data:audio/wav;base64,UklGRnoGAABXQVZFZm10IBAAAAABAAEAQB8AAEAfAAABAAgAZGF0YQoGAACBhYqFbF1fdJivrJBhNjVgodDbq2EcBj+a2/LDciUFLIHO8tiJNwgZaLvt559NEAxQp+PwtmMcBjiR1/LMeSwFJHfH8N2QQAoUXrTp66hVFApGn+DyvmwhBi6Czr...');
    audio.volume = 0.1;
    audio.play().catch(() => {});
}

// ===========================
// QR THANH TOÁN - VIETQR
// ===========================

// ⚙️ CẤU HÌNH NGÂN HÀNG - Chỉnh tại đây nếu cần đổi
const BANK_CONFIG = {
    bankId: 'agribank',       // Mã ngân hàng VietQR (agribank, vietcombank, techcombank, ...)
    accountNo: '7400215025420', // ← Số tài khoản
    accountName: 'NGUYEN THANH SANG', // ← Tên chủ tài khoản
    transferPrefix: 'CoffeSang' // Tiền tố nội dung chuyển khoản
};

function showQRPayment() {
    const items = Object.values(currentBill);
    if (items.length === 0) {
        alert('⚠️ Chưa có món nào trong hóa đơn!');
        return;
    }

    // Tính tổng tiền
    const totalPrice = items.reduce((sum, { item, quantity }) => sum + (item.price * quantity), 0);

    // Hiển thị số tiền trong modal
    document.getElementById('qrTotalAmount').textContent = formatPrice(totalPrice);

    // Tạo nội dung chuyển khoản (thêm timestamp tránh trùng)
    const now = new Date();
    const timeCode = `${now.getHours()}${String(now.getMinutes()).padStart(2,'0')}`;
    const transferContent = `${BANK_CONFIG.transferPrefix} ${timeCode}`;
    document.getElementById('transferContent').textContent = transferContent;

    // Reset QR image về trạng thái loading
    const qrImage = document.getElementById('qrImage');
    const qrLoading = document.getElementById('qrLoading');
    qrImage.style.display = 'none';
    qrLoading.style.display = 'flex';
    qrLoading.innerHTML = '<div class="spinner"></div><p>Đang tạo mã QR...</p>';

    // Tạo URL QR từ VietQR API (không cần backend, không cần API key)
    const qrUrl = buildVietQRUrl(totalPrice, transferContent);
    qrImage.src = qrUrl;

    // Mở modal
    document.getElementById('qrModal').classList.add('show');
}

function buildVietQRUrl(amount, content) {
    // VietQR public API - tạo QR code ảnh PNG trực tiếp
    // Không cần đăng ký, không cần API key
    const base = 'https://img.vietqr.io/image';
    const bank = BANK_CONFIG.bankId;
    const acc  = BANK_CONFIG.accountNo;
    const name = encodeURIComponent(BANK_CONFIG.accountName);
    const memo = encodeURIComponent(content);
    
    // Format: /bankId-accountNo-compact2.png?amount=X&addInfo=Y&accountName=Z
    return `${base}/${bank}-${acc}-compact2.png?amount=${amount}&addInfo=${memo}&accountName=${name}`;
}

function closeQRModal() {
    document.getElementById('qrModal').classList.remove('show');
}

function confirmQRPaid() {
    // Đóng QR modal
    closeQRModal();

    // Tính tổng tiền để hiển thị
    const items = Object.values(currentBill);
    const totalPrice = items.reduce((sum, { item, quantity }) => sum + (item.price * quantity), 0);

    // Hiển thị modal thành công
    document.getElementById('modalTotalPrice').textContent = formatPrice(totalPrice);
    document.getElementById('paymentModal').classList.add('show');

    // Reset bill
    setTimeout(() => {
        currentBill = {};
        renderBill();
    }, 1500);
}

// ===========================
// EXPORT FOR DEBUGGING
// ===========================
window.POS = {
    currentBill,
    menuData,
    allItems,
    resetBill: () => { currentBill = {}; renderBill(); }
};

// ===================================
// QUẢN LÝ MÓN - MANAGE MENU SYSTEM
// ===================================

// State cho inline edit
let inlineEditTarget = null; // { categoryKey, itemId }

// -- Mở/đóng modal quản lý --
function openManageModal() {
    populateManageSelects();
    renderCategoryChips();
    renderEditList();
    document.getElementById('manageModal').classList.add('show');
}

function closeManageModal() {
    document.getElementById('manageModal').classList.remove('show');
}

// -- Chuyển tab --
function switchManageTab(tabName) {
    document.querySelectorAll('.manage-tab').forEach(t => t.classList.remove('active'));
    document.querySelectorAll('.manage-tab-content').forEach(c => c.classList.remove('active'));
    document.querySelector(`.manage-tab[data-tab="${tabName}"]`).classList.add('active');
    document.getElementById(`tab${tabName.charAt(0).toUpperCase() + tabName.slice(1)}`).classList.add('active');
}

// -- Đổ dữ liệu vào select --
function populateManageSelects() {
    const cats = Object.keys(menuData);

    // Filter select (tab sửa)
    const filterSel = document.getElementById('filterCategory');
    filterSel.innerHTML = '<option value="">-- Tất cả danh mục --</option>'
        + cats.map(c => `<option value="${c}">${c}</option>`).join('');

    // Add select (tab thêm)
    const addSel = document.getElementById('addCategory');
    addSel.innerHTML = '<option value="">-- Chọn danh mục --</option>'
        + cats.map(c => `<option value="${c}">${c}</option>`).join('');
}

// -- Render danh sách món (tab sửa) --
function renderEditList() {
    const catFilter  = document.getElementById('filterCategory').value;
    const textFilter = document.getElementById('filterSearch').value.toLowerCase().trim();
    const container  = document.getElementById('editItemList');
    const countEl    = document.getElementById('editCount');

    // Lấy danh sách cần hiển thị
    let rows = [];
    const cats = catFilter ? [catFilter] : Object.keys(menuData);
    cats.forEach(cat => {
        (menuData[cat] || []).forEach(item => {
            if (!textFilter || item.name.toLowerCase().includes(textFilter)) {
                rows.push({ cat, item });
            }
        });
    });

    countEl.textContent = rows.length > 0 ? `Tìm thấy ${rows.length} món` : '';

    if (rows.length === 0) {
        container.innerHTML = '<div class="manage-empty">Không tìm thấy món nào</div>';
        return;
    }

    container.innerHTML = rows.map(({ cat, item }) => `
        <div class="edit-item-row">
            <div class="edit-item-info">
                <div class="edit-item-name">${item.name}</div>
                <div class="edit-item-cat">${cat}</div>
            </div>
            <span class="edit-item-price">${formatPrice(item.price)}</span>
            <button class="btn-edit-item"
                data-cat="${encodeURIComponent(cat)}"
                data-id="${item.id}">
                ✏️ Sửa
            </button>
        </div>
    `).join('');

    // Gắn event cho các nút sửa
    container.querySelectorAll('.btn-edit-item').forEach(btn => {
        btn.addEventListener('click', () => {
            const cat    = decodeURIComponent(btn.dataset.cat);
            const itemId = parseInt(btn.dataset.id);
            openInlineEdit(cat, itemId);
        });
    });
}

// -- Render chips danh mục --
function renderCategoryChips() {
    const chips = document.getElementById('categoryChips');
    chips.innerHTML = Object.keys(menuData)
        .map(c => `<span class="cat-chip">${c}</span>`)
        .join('');
}

// -- Thêm món mới --
function handleAddItem() {
    const cat   = document.getElementById('addCategory').value.trim();
    const name  = document.getElementById('addName').value.trim();
    const price = parseInt(document.getElementById('addPrice').value);
    const msg   = document.getElementById('addMsg');

    if (!cat)             { showMsg(msg, '⚠️ Vui lòng chọn danh mục', 'error'); return; }
    if (!name)            { showMsg(msg, '⚠️ Vui lòng nhập tên món', 'error'); return; }
    if (!price || price < 0) { showMsg(msg, '⚠️ Giá tiền không hợp lệ', 'error'); return; }

    // Kiểm tra trùng tên trong cùng danh mục
    const exists = menuData[cat].some(i => i.name.toLowerCase() === name.toLowerCase());
    if (exists) { showMsg(msg, '⚠️ Món này đã tồn tại trong danh mục!', 'error'); return; }

    // Tạo ID mới (max id + 1)
    const maxId = Math.max(...allItems.map(i => i.id), 0);
    const newItem = { id: maxId + 1, name, price };

    menuData[cat].push(newItem);
    syncAllItems();

    // Refresh menu ngoài màn hình chính
    renderCategoryTabs();
    renderMenuItems(currentCategory);

    // Clear form
    document.getElementById('addName').value = '';
    document.getElementById('addPrice').value = '';
    showMsg(msg, `✅ Đã thêm "${name}" vào ${cat}!`, 'success');

    // Refresh edit list nếu đang ở tab sửa
    renderEditList();
}

// -- Thêm danh mục mới --
function handleAddCategory() {
    const input = document.getElementById('newCategoryName');
    const msg   = document.getElementById('categoryMsg');
    const name  = input.value.trim().toUpperCase();

    if (!name) { showMsg(msg, '⚠️ Vui lòng nhập tên danh mục', 'error'); return; }
    if (menuData[name]) { showMsg(msg, '⚠️ Danh mục đã tồn tại!', 'error'); return; }

    menuData[name] = [];
    syncAllItems();
    populateManageSelects();
    renderCategoryChips();
    renderCategoryTabs();

    input.value = '';
    showMsg(msg, `✅ Đã tạo danh mục "${name}"!`, 'success');
}

// -- Mở popup sửa inline --
function openInlineEdit(cat, itemId) {
    const item = menuData[cat]?.find(i => i.id === itemId);
    if (!item) return;

    inlineEditTarget = { cat, itemId };

    document.getElementById('inlineEditTitle').textContent = `✏️ Sửa: ${item.name}`;
    document.getElementById('inlineEditName').value  = item.name;
    document.getElementById('inlineEditPrice').value = item.price;
    document.getElementById('editMsg').textContent   = '';
    document.getElementById('editMsg').className     = 'manage-msg';

    document.getElementById('inlineEditOverlay').classList.add('show');
}

function closeInlineEdit() {
    document.getElementById('inlineEditOverlay').classList.remove('show');
    inlineEditTarget = null;
}

// -- Lưu sửa --
function handleSaveEdit() {
    if (!inlineEditTarget) return;
    const { cat, itemId } = inlineEditTarget;
    const msg   = document.getElementById('editMsg');
    const name  = document.getElementById('inlineEditName').value.trim();
    const price = parseInt(document.getElementById('inlineEditPrice').value);

    if (!name)  { showMsg(msg, '⚠️ Tên món không được để trống', 'error'); return; }
    if (!price || price < 0) { showMsg(msg, '⚠️ Giá không hợp lệ', 'error'); return; }

    const item = menuData[cat]?.find(i => i.id === itemId);
    if (!item) return;

    item.name  = name;
    item.price = price;
    syncAllItems();

    // Refresh menu ngoài + list trong manage
    renderCategoryTabs();
    renderMenuItems(currentCategory);
    renderEditList();

    showMsg(msg, `✅ Đã lưu thay đổi!`, 'success');
    setTimeout(closeInlineEdit, 900);
}

// -- Xóa món --
function handleDeleteItem() {
    if (!inlineEditTarget) return;
    const { cat, itemId } = inlineEditTarget;
    const item = menuData[cat]?.find(i => i.id === itemId);
    if (!item) return;

    if (!confirm(`Xóa món "${item.name}" khỏi menu?`)) return;

    menuData[cat] = menuData[cat].filter(i => i.id !== itemId);
    syncAllItems();

    renderCategoryTabs();
    renderMenuItems(currentCategory);
    renderEditList();
    closeInlineEdit();
}

// -- Đồng bộ allItems sau khi sửa menuData --
function syncAllItems() {
    allItems = [];
    Object.keys(menuData).forEach(category => {
        menuData[category].forEach(item => {
            allItems.push({ ...item, category });
        });
    });
}

// -- Hiển thị message helper --
function showMsg(el, text, type) {
    el.textContent = text;
    el.className = `manage-msg ${type}`;
    if (type === 'success') {
        setTimeout(() => { el.textContent = ''; el.className = 'manage-msg'; }, 3000);
    }
}
