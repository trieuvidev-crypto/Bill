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
        { id: 11, name: "Sinh tố Mãng cầu", price: 20000 },
        { id: 12, name: "Sinh tố Kiwi", price: 20000 }
    ],
    "TRÀ TRÁI CÂY": [
        { id: 13, name: "Trà đào", price: 17000 },
        { id: 14, name: "Trà vải", price: 17000 },
        { id: 15, name: "Trà Kiwi", price: 17000 },
        { id: 16, name: "Trà chanh dây hạt đác", price: 20000 },
        { id: 17, name: "Trà dâu tằm hạt đác", price: 20000 },
        { id: 18, name: "Trà mãng cầu", price: 20000 },
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
        { id: 31, name: "Bánh tráng trộn", price: 20000 },
        { id: 32, name: "Bò viên chiên", price: 15000 },
        { id: 33, name: "Cá viên chiên", price: 15000 },
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
    
    // Modal
    document.getElementById('btnCloseModal').addEventListener('click', closeModal);
    document.getElementById('paymentModal').addEventListener('click', (e) => {
        if (e.target.id === 'paymentModal') closeModal();
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
    
    let text = 'HÓA ĐƠN\n';
    text += '━━━━━━━━━━━━━━━━━━━━\n\n';
    
    items.forEach(({ item, quantity }) => {
        const subtotal = item.price * quantity;
        text += `${item.name}\n`;
        text += `  ${formatPrice(item.price)} × ${quantity} = ${formatPrice(subtotal)}\n\n`;
    });
    
    const totalPrice = items.reduce((sum, { item, quantity }) => sum + (item.price * quantity), 0);
    text += '━━━━━━━━━━━━━━━━━━━━\n';
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
        btn.innerHTML = 'ĐÃ SAO CHÉP!';
        
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
    
    const phone = '0984771687';
    const url = `sms:${phone}?body=${encodeURIComponent(billText)}`;
    window.location.href = url;
}

function sendViaWhatsApp() {
    const billText = generateBillText();
    if (!billText) return;
    
    const phone = '84984771687'; // Format: 84 + số điện thoại
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
// EXPORT FOR DEBUGGING
// ===========================
window.POS = {
    currentBill,
    menuData,
    allItems,
    resetBill: () => { currentBill = {}; renderBill(); }
};
