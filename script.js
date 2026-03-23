
// بيكاليكا - متجر إلكتروني فاخر
// JavaScript functionality
// ============================================

// بيانات المنتجات
const products = [
    {
        id: 1,
        name: "ساعة فاخرة كلاسيكية",
        category: "إكسسوارات",
        price: 1299,
        oldPrice: 1599,
        image: "https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=600",
        rating: 4.8,
        reviews: 124,
        badge: "bestseller",
        description: "ساعة يد فاخرة بتصميم كلاسيكي أنيق، مثالية لجميع المناسبات. مصنوعة من أفضل المواد مع حركة سويسرية دقيقة."
    },
    {
        id: 2,
        name: "حقيبة يد جلدية",
        category: "إكسسوارات",
        price: 899,
        oldPrice: null,
        image: "https://images.unsplash.com/photo-1548036328-c9fa89d128fa?w=600",
        rating: 4.9,
        reviews: 89,
        badge: "new",
        description: "حقيبة يد فاخرة من الجلد الطبيعي، تصميم عصري يناسب جميع الأوقات. مساحة واسعة وتنظيم ممتاز."
    },
    {
        id: 3,
        name: "نظارة شمسية عصرية",
        category: "إكسسوارات",
        price: 459,
        oldPrice: 599,
        image: "https://images.unsplash.com/photo-1572635196237-14b3f281503f?w=600",
        rating: 4.7,
        reviews: 156,
        badge: "sale",
        description: "نظارة شمسية بتصميم عصري وحماية UV400 كاملة. إطار خفيف الوزن وعدسات عالية الجودة."
    },
    {
        id: 4,
        name: "حذاء رياضي فاخر",
        category: "أحذية",
        price: 799,
        oldPrice: null,
        image: "https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=600",
        rating: 4.6,
        reviews: 203,
        badge: "bestseller",
        description: "حذاء رياضي بتصميم عصري وراحة استثنائية. تقنية امتصاص الصدمات للمشي الطويل."
    },
    {
        id: 5,
        name: "سماعات لاسلكية فاخرة",
        category: "إلكترونيات",
        price: 699,
        oldPrice: 899,
        image: "https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=600",
        rating: 4.9,
        reviews: 312,
        badge: "sale",
        description: "سماعات لاسلكية بجودة صوت عالية وعزل للضوضاء. بطارية تدوم 30 ساعة."
    },
    {
        id: 6,
        name: "قميص قطني فاخر",
        category: "أزياء",
        price: 349,
        oldPrice: null,
        image: "https://images.unsplash.com/photo-1596755094514-f87e34085b2c?w=600",
        rating: 4.5,
        reviews: 78,
        badge: "new",
        description: "قميص من القطن 100% بتصميم أنيق وخامة ناعمة. مناسب للعمل والمناسبات الرسمية."
    },
    {
        id: 7,
        name: "عطر فاخر",
        category: "إكسسوارات",
        price: 599,
        oldPrice: 750,
        image: "https://images.unsplash.com/photo-1541643600914-78b084683601?w=600",
        rating: 4.8,
        reviews: 245,
        badge: "sale",
        description: "عطر فاخر بتركيبة فريدة تدوم طويلاً. مزيج من الروائح الشرقية والعصرية."
    },
    {
        id: 8,
        name: "حزام جلدي فاخر",
        category: "إكسسوارات",
        price: 199,
        oldPrice: null,
        image: "https://images.unsplash.com/photo-1624222247344-550fb60583dc?w=600",
        rating: 4.4,
        reviews: 67,
        badge: "new",
        description: "حزام من الجلد الطبيعي الفاخر بإبزيم معدني عالي الجودة."
    }
];

// سلة التسوق
let cart = JSON.parse(localStorage.getItem('cart')) || [];

// قائمة المفضلة
let wishlist = JSON.parse(localStorage.getItem('wishlist')) || [];

// ============================================
// تهيئة الصفحة
// ============================================
document.addEventListener('DOMContentLoaded', function() {
    renderProducts();
    updateCartUI();
    initEventListeners();
    initScrollEffects();
    initCountdown();
    initSlider();
});

// ============================================
// عرض المنتجات
// ============================================
function renderProducts(filter = 'all') {
    const grid = document.getElementById('productsGrid');
    let filteredProducts = products;
    
    if (filter !== 'all') {
        filteredProducts = products.filter(p => p.badge === filter);
    }
    
    grid.innerHTML = filteredProducts.map(product => `
        <div class="product-card" data-category="${product.badge}">
            ${product.badge ? `<span class="product-badge badge-${product.badge}">${getBadgeText(product.badge)}</span>` : ''}
            <div class="product-image">
                <img src="${product.image}" alt="${product.name}" loading="lazy">
                <div class="product-actions">
                    <button class="action-btn" onclick="addToWishlist(${product.id})" title="المفضلة">
                        <i class="fas fa-heart ${wishlist.includes(product.id) ? 'text-danger' : ''}"></i>
                    </button>
                    <button class="action-btn" onclick="quickView(${product.id})" title="عرض سريع">
                        <i class="fas fa-eye"></i>
                    </button>
                    <button class="action-btn" onclick="addToCart(${product.id})" title="أضف للسلة">
                        <i class="fas fa-shopping-bag"></i>
                    </button>
                </div>
            </div>
            <div class="product-info">
                <span class="product-category">${product.category}</span>
                <h3 class="product-title" onclick="quickView(${product.id})">${product.name}</h3>
                <div class="product-rating">
                    ${generateStars(product.rating)}
                    <span>(${product.reviews})</span>
                </div>
                <div class="product-price">
                    <span class="current-price">${product.price} ريال</span>
                    ${product.oldPrice ? `<span class="old-price">${product.oldPrice} ريال</span>` : ''}
                </div>
            </div>
        </div>
    `).join('');
}

function getBadgeText(badge) {
    const badges = {
        'new': 'جديد',
        'sale': 'تخفيض',
        'bestseller': 'الأكثر مبيعاً'
    };
    return badges[badge] || '';
}

function generateStars(rating) {
    let stars = '';
    for (let i = 1; i <= 5; i++) {
        if (i <= rating) {
            stars += '<i class="fas fa-star"></i>';
        } else if (i - 0.5 <= rating) {
            stars += '<i class="fas fa-star-half-alt"></i>';
        } else {
            stars += '<i class="far fa-star"></i>';
        }
    }
    return stars;
}

// ============================================
// تصفية المنتجات
// ============================================
document.querySelectorAll('.tab-btn').forEach(btn => {
    btn.addEventListener('click', function() {
        document.querySelectorAll('.tab-btn').forEach(b => b.classList.remove('active'));
        this.classList.add('active');
        renderProducts(this.dataset.filter);
    });
});

// ============================================
// عرض المزيد من المنتجات
// ============================================
function loadMoreProducts() {
    showNotification('جاري تحميل المزيد من المنتجات...', 'info');
    
    // محاكاة تحميل المزيد
    setTimeout(() => {
        const grid = document.getElementById('productsGrid');
        const moreProducts = products.slice(0, 4).map((product, index) => ({
            ...product,
            id: product.id + 100 + index
        }));
        
        const html = moreProducts.map(product => `
            <div class="product-card" data-category="${product.badge}">
                ${product.badge ? `<span class="product-badge badge-${product.badge}">${getBadgeText(product.badge)}</span>` : ''}
                <div class="product-image">
                    <img src="${product.image}" alt="${product.name}" loading="lazy">
                    <div class="product-actions">
                        <button class="action-btn" onclick="addToWishlist(${product.id})" title="المفضلة">
                            <i class="fas fa-heart"></i>
                        </button>
                        <button class="action-btn" onclick="quickView(${product.id})" title="عرض سريع">
                            <i class="fas fa-eye"></i>
                        </button>
                        <button class="action-btn" onclick="addToCart(${product.id})" title="أضف للسلة">
                            <i class="fas fa-shopping-bag"></i>
                        </button>
                    </div>
                </div>
                <div class="product-info">
                    <span class="product-category">${product.category}</span>
                    <h3 class="product-title" onclick="quickView(${product.id})">${product.name}</h3>
                    <div class="product-rating">
                        ${generateStars(product.rating)}
                        <span>(${product.reviews})</span>
                    </div>
                    <div class="product-price">
                        <span class="current-price">${product.price} ريال</span>
                        ${product.oldPrice ? `<span class="old-price">${product.oldPrice} ريال</span>` : ''}
                    </div>
                </div>
            </div>
        `).join('');
        
        grid.insertAdjacentHTML('beforeend', html);
        showNotification('تم تحميل المزيد من المنتجات!', 'success');
    }, 1000);
}

// ============================================
// عرض سريع للمنتج
// ============================================
function quickView(productId) {
    const product = products.find(p => p.id === productId) || 
                   products.find(p => p.id === productId - 100) ||
                   products.find(p => p.id === productId - 101) ||
                   products.find(p => p.id === productId - 102) ||
                   products.find(p => p.id === productId - 103);
    
    if (!product) return;
    
    const modal = document.getElementById('productModal');
    const modalBody = document.getElementById('modalBody');
    
    modalBody.innerHTML = `
        <div class="modal-image">
            <img src="${product.image}" alt="${product.name}">
        </div>
        <div class="modal-details">
            <span class="modal-category">${product.category}</span>
            <h2 class="modal-title">${product.name}</h2>
            <div class="modal-rating">
                ${generateStars(product.rating)}
                <span>(${product.reviews} تقييم)</span>
            </div>
            <div class="modal-price">${product.price} ريال</div>
            <p class="modal-description">${product.description}</p>
            
            <div class="modal-options">
                <h4>اللون:</h4>
                <div class="color-options">
                    <div class="color-option active"><span style="background: #000;"></span></div>
                    <div class="color-option"><span style="background: #8B4513;"></span></div>
                    <div class="color-option"><span style="background: #4A4A4A;"></span></div>
                </div>
                
                <h4>المقاس:</h4>
                <div class="size-options">
                    <div class="size-option">S</div>
                    <div class="size-option active">M</div>
                    <div class="size-option">L</div>
                    <div class="size-option">XL</div>
                </div>
            </div>
            
            <div class="modal-actions">
                <button class="btn-primary add-to-cart-btn" onclick="addToCart(${product.id}); closeProductModal();">
                    <i class="fas fa-shopping-bag"></i>
                    أضف للسلة
                </button>
                <button class="wishlist-btn-modal" onclick="addToWishlist(${product.id})">
                    <i class="fas fa-heart ${wishlist.includes(product.id) ? 'text-danger' : ''}"></i>
                </button>
            </div>
        </div>
    `;
    
    // تفعيل اختيار الألوان والمقاسات
    modalBody.querySelectorAll('.color-option').forEach(opt => {
        opt.addEventListener('click', function() {
            modalBody.querySelectorAll('.color-option').forEach(o => o.classList.remove('active'));
            this.classList.add('active');
        });
    });
    
    modalBody.querySelectorAll('.size-option').forEach(opt => {
        opt.addEventListener('click', function() {
            modalBody.querySelectorAll('.size-option').forEach(o => o.classList.remove('active'));
            this.classList.add('active');
        });
    });
    
    modal.classList.add('active');
    document.body.style.overflow = 'hidden';
}

function closeProductModal() {
    const modal = document.getElementById('productModal');
    modal.classList.remove('active');
    document.body.style.overflow = '';
}

// إغلاق النافذة عند النقر خارجها
document.getElementById('productModal').addEventListener('click', function(e) {
    if (e.target === this) {
        closeProductModal();
    }
});

// ============================================
// سلة التسوق
// ============================================
function toggleCart() {
    const sidebar = document.getElementById('cartSidebar');
    const overlay = document.getElementById('cartOverlay');
    
    sidebar.classList.toggle('active');
    overlay.classList.toggle('active');
    
    if (sidebar.classList.contains('active')) {
        document.body.style.overflow = 'hidden';
    } else {
        document.body.style.overflow = '';
    }
}

function addToCart(productId) {
    const product = products.find(p => p.id === productId) || 
                   products.find(p => p.id === productId - 100) ||
                   products.find(p => p.id === productId - 101) ||
                   products.find(p => p.id === productId - 102) ||
                   products.find(p => p.id === productId - 103);
    
    if (!product) return;
    
    const existingItem = cart.find(item => item.id === product.id);
    
    if (existingItem) {
        existingItem.quantity++;
    } else {
        cart.push({
            id: product.id,
            name: product.name,
            price: product.price,
            image: product.image,
            quantity: 1
        });
    }
    
    saveCart();
    updateCartUI();
    showNotification(`تم إضافة "${product.name}" إلى السلة`, 'success');
    
    // تأثير الاهتزاز على أيقونة السلة
    const cartBtn = document.querySelector('.cart-btn');
    cartBtn.style.transform = 'scale(1.2)';
    setTimeout(() => cartBtn.style.transform = '', 200);
}

function removeFromCart(productId) {
    cart = cart.filter(item => item.id !== productId);
    saveCart();
    updateCartUI();
    showNotification('تم حذف المنتج من السلة', 'info');
}

function updateQuantity(productId, change) {
    const item = cart.find(item => item.id === productId);
    if (item) {
        item.quantity += change;
        if (item.quantity <= 0) {
            removeFromCart(productId);
        } else {
            saveCart();
            updateCartUI();
        }
    }
}

function updateCartUI() {
    const cartItems = document.getElementById('cartItems');
    const cartCount = document.getElementById('cart-count');
    const cartTotal = document.getElementById('cartTotal');
    
    const totalItems = cart.reduce((sum, item) => sum + item.quantity, 0);
    const totalPrice = cart.reduce((sum, item) => sum + (item.price * item.quantity), 0);
    
    cartCount.textContent = totalItems;
    cartTotal.textContent = totalPrice + ' ريال';
    
    if (cart.length === 0) {
        cartItems.innerHTML = `
            <div class="empty-cart">
                <i class="fas fa-shopping-bag"></i>
                <p>السلة فارغة</p>
                <p>أضف بعض المنتجات للبدء</p>
            </div>
        `;
    } else {
        cartItems.innerHTML = cart.map(item => `
            <div class="cart-item">
                <div class="cart-item-image">
                    <img src="${item.image}" alt="${item.name}">
                </div>
                <div class="cart-item-details">
                    <h4 class="cart-item-title">${item.name}</h4>
                    <div class="cart-item-price">${item.price} ريال</div>
                    <div class="cart-item-quantity">
                        <button class="qty-btn" onclick="updateQuantity(${item.id}, -1)">-</button>
                        <span>${item.quantity}</span>
                        <button class="qty-btn" onclick="updateQuantity(${item.id}, 1)">+</button>
                    </div>
                </div>
                <button class="remove-item" onclick="removeFromCart(${item.id})">
                    <i class="fas fa-trash-alt"></i>
                </button>
            </div>
        `).join('');
    }
    
    // تحديث ملخص الطلب في نافذة الدفع
    const subtotalEl = document.getElementById('subtotal');
    const finalTotalEl = document.getElementById('finalTotal');
    if (subtotalEl) subtotalEl.textContent = totalPrice + ' ريال';
    if (finalTotalEl) finalTotalEl.textContent = totalPrice + ' ريال';
}

function saveCart() {
    localStorage.setItem('cart', JSON.stringify(cart));
}

// ============================================
// المفضلة
// ============================================
function addToWishlist(productId) {
    const index = wishlist.indexOf(productId);
    
    if (index === -1) {
        wishlist.push(productId);
        showNotification('تم إضافة المنتج للمفضلة', 'success');
    } else {
        wishlist.splice(index, 1);
        showNotification('تم إزالة المنتج من المفضلة', 'info');
    }
    
    localStorage.setItem('wishlist', JSON.stringify(wishlist));
    updateWishlistUI();
    renderProducts(document.querySelector('.tab-btn.active')?.dataset.filter || 'all');
}

function updateWishlistUI() {
    const wishlistCount = document.querySelector('.wishlist-btn .badge');
    if (wishlistCount) {
        wishlistCount.textContent = wishlist.length;
    }
}

// ============================================
// الدفع
// ============================================
function checkout() {
    if (cart.length === 0) {
        showNotification('السلة فارغة! أضف منتجات أولاً', 'error');
        return;
    }
    
    toggleCart();
    const modal = document.getElementById('checkoutModal');
    modal.classList.add('active');
    document.body.style.overflow = 'hidden';
    
    // تحديث المجموع
    const totalPrice = cart.reduce((sum, item) => sum + (item.price * item.quantity), 0);
    document.getElementById('subtotal').textContent = totalPrice + ' ريال';
    document.getElementById('finalTotal').textContent = totalPrice + ' ريال';
}

function closeCheckout() {
    const modal = document.getElementById('checkoutModal');
    modal.classList.remove('active');
    document.body.style.overflow = '';
    
    // إعادة تعيين الخطوات
    document.querySelectorAll('.step').forEach((step, index) => {
        step.classList.remove('active', 'completed');
        if (index === 0) step.classList.add('active');
    });
    
    document.querySelectorAll('.form-step').forEach((step, index) => {
        step.classList.remove('active');
        if (index === 0) step.classList.add('active');
    });
    
    // إفراغ السلة بعد إتمام الشراء
    if (document.querySelector('#step3.active')) {
        cart = [];
        saveCart();
        updateCartUI();
    }
}

function nextStep(step) {
    // التحقق من صحة النموذج في الخطوة الحالية
    const currentStepEl = document.querySelector('.form-step.active');
    const inputs = currentStepEl.querySelectorAll('input[required], select[required]');
    let valid = true;
    
    inputs.forEach(input => {
        if (!input.value.trim()) {
            valid = false;
            input.style.borderColor = '#dc3545';
            setTimeout(() => input.style.borderColor = '', 2000);
        }
    });
    
    if (!valid) {
        showNotification('يرجى ملء جميع الحقول المطلوبة', 'error');
        return;
    }
    
    // الانتقال للخطوة التالية
    document.querySelectorAll('.form-step').forEach(s => s.classList.remove('active'));
    document.getElementById('step' + step).classList.add('active');
    
    // تحديث مؤشرات الخطوات
    document.querySelectorAll('.step').forEach((s, index) => {
        s.classList.remove('active', 'completed');
        if (index + 1 < step) {
            s.classList.add('completed');
        } else if (index + 1 === step) {
            s.classList.add('active');
        }
    });
    
    // إذا كانت الخطوة الأخيرة، أظهر رسالة النجاح
    if (step === 3) {
        showNotification('تم إتمام طلبك بنجاح!', 'success');
    }
}

function prevStep(step) {
    document.querySelectorAll('.form-step').forEach(s => s.classList.remove('active'));
    document.getElementById('step' + step).classList.add('active');
    
    document.querySelectorAll('.step').forEach((s, index) => {
        s.classList.remove('active', 'completed');
        if (index + 1 < step) {
            s.classList.add('completed');
        } else if (index + 1 === step) {
            s.classList.add('active');
        }
    });
}

// إغلاق النافذة عند النقر خارجها
document.getElementById('checkoutModal').addEventListener('click', function(e) {
    if (e.target === this) {
        closeCheckout();
    }
});

// ============================================
// البحث
// ============================================
document.querySelector('.search-btn').addEventListener('click', function() {
    document.getElementById('searchOverlay').classList.add('active');
    document.getElementById('searchInput').focus();
    document.body.style.overflow = 'hidden';
});

function closeSearch() {
    document.getElementById('searchOverlay').classList.remove('active');
    document.body.style.overflow = '';
}

// إغلاق البحث بالزر Escape
document.addEventListener('keydown', function(e) {
    if (e.key === 'Escape') {
        closeSearch();
        closeProductModal();
        closeCheckout();
        if (document.getElementById('cartSidebar').classList.contains('active')) {
            toggleCart();
        }
    }
});

// البحث الفوري
let searchTimeout;
document.getElementById('searchInput').addEventListener('input', function() {
    clearTimeout(searchTimeout);
    searchTimeout = setTimeout(() => {
        const query = this.value.toLowerCase();
        if (query.length > 2) {
            const filtered = products.filter(p => 
                p.name.toLowerCase().includes(query) || 
                p.category.toLowerCase().includes(query)
            );
            showNotification(`تم العثور على ${filtered.length} منتج`, 'info');
        }
    }, 500);
});

// ============================================
// القائمة المتنقلة
// ============================================
function toggleMenu() {
    // إنشاء القائمة إذا لم تكن موجودة
    let mobileMenu = document.querySelector('.mobile-menu');
    
    if (!mobileMenu) {
        mobileMenu = document.createElement('div');
        mobileMenu.className = 'mobile-menu';
        mobileMenu.innerHTML = `
            <div class="mobile-menu-header">
                <h3>القائمة</h3>
                <button class="close-menu" onclick="toggleMenu()">
                    <i class="fas fa-times"></i>
                </button>
            </div>
            <ul>
                <li><a href="#home" onclick="toggleMenu()">الرئيسية</a></li>
                <li><a href="#products" onclick="toggleMenu()">المنتجات</a></li>
                <li><a href="#categories" onclick="toggleMenu()">الأقسام</a></li>
                <li><a href="#offers" onclick="toggleMenu()">العروض</a></li>
                <li><a href="#contact" onclick="toggleMenu()">تواصل معنا</a></li>
            </ul>
        `;
        document.body.appendChild(mobileMenu);
        
        // إضافة overlay
        const overlay = document.createElement('div');
        overlay.className = 'cart-overlay';
        overlay.onclick = toggleMenu;
        overlay.id = 'menuOverlay';
        document.body.appendChild(overlay);
    }
    
    mobileMenu.classList.toggle('active');
    const overlay = document.getElementById('menuOverlay');
    if (overlay) {
        overlay.classList.toggle('active');
    }
    
    if (mobileMenu.classList.contains('active')) {
        document.body.style.overflow = 'hidden';
    } else {
        document.body.style.overflow = '';
    }
}

// ============================================
// الإشعارات
// ============================================
function showNotification(message, type = 'info') {
    const container = document.getElementById('notifications');
    const notification = document.createElement('div');
    notification.className = `notification ${type}`;
    
    const icons = {
        success: 'fa-check-circle',
        error: 'fa-exclamation-circle',
        info: 'fa-info-circle'
    };
    
    notification.innerHTML = `
        <i class="fas ${icons[type]}"></i>
        <div class="notification-content">
            <h4>${type === 'success' ? 'نجاح' : type === 'error' ? 'تنبيه' : 'معلومة'}</h4>
            <p>${message}</p>
        </div>
    `;
    
    container.appendChild(notification);
    
    // إزالة الإشعار بعد 3 ثواني
    setTimeout(() => {
        notification.style.animation = 'slideInLeft 0.5s ease reverse';
        setTimeout(() => notification.remove(), 500);
    }, 3000);
}

// ============================================
// عداد التنازلي
// ============================================
function initCountdown() {
    // تعيين موعد نهاية العرض (48 ساعة من الآن)
    const endDate = new Date();
    endDate.setHours(endDate.getHours() + 48);
    
    function updateCountdown() {
        const now = new Date();
        const diff = endDate - now;
        
        if (diff <= 0) {
            document.getElementById('days').textContent = '00';
            document.getElementById('hours').textContent = '00';
            document.getElementById('minutes').textContent = '00';
            document.getElementById('seconds').textContent = '00';
            return;
        }
        
        const days = Math.floor(diff / (1000 * 60 * 60 * 24));
        const hours = Math.floor((diff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
        const minutes = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60));
        const seconds = Math.floor((diff % (1000 * 60)) / 1000);
        
        document.getElementById('days').textContent = String(days).padStart(2, '0');
        document.getElementById('hours').textContent = String(hours).padStart(2, '0');
        document.getElementById('minutes').textContent = String(minutes).padStart(2, '0');
        document.getElementById('seconds').textContent = String(seconds).padStart(2, '0');
    }
    
    updateCountdown();
    setInterval(updateCountdown, 1000);
}

// ============================================
// سلايدر الصور
// ============================================
let currentSlideIndex = 0;
let slideInterval;

function initSlider() {
    showSlide(0);
    startSlideShow();
}

function showSlide(index) {
    const slides = document.querySelectorAll('.slide');
    const dots = document.querySelectorAll('.dot');
    
    slides.forEach((slide, i) => {
        slide.classList.toggle('active', i === index);
    });
    
    dots.forEach((dot, i) => {
        dot.classList.toggle('active', i === index);
    });
    
    currentSlideIndex = index;
}

function currentSlide(index) {
    showSlide(index - 1);
    resetSlideShow();
}

function nextSlide() {
    const slides = document.querySelectorAll('.slide');
    showSlide((currentSlideIndex + 1) % slides.length);
}

function startSlideShow() {
    slideInterval = setInterval(nextSlide, 5000);
}

function resetSlideShow() {
    clearInterval(slideInterval);
    startSlideShow();
}

// ============================================
// تأثيرات التمرير
// ============================================
function initScrollEffects() {
    // تغيير شكل الهيدر عند التمرير
    window.addEventListener('scroll', function() {
        const header = document.querySelector('.main-header');
        const backToTop = document.getElementById('backToTop');
        
        if (window.scrollY > 100) {
            header.classList.add('scrolled');
            backToTop.classList.add('visible');
        } else {
            header.classList.remove('scrolled');
            backToTop.classList.remove('visible');
        }
        
        // تأثير الظهور التدريجي للعناصر
        const reveals = document.querySelectorAll('.reveal');
        reveals.forEach(element => {
            const windowHeight = window.innerHeight;
            const elementTop = element.getBoundingClientRect().top;
            const elementVisible = 150;
            
            if (elementTop < windowHeight - elementVisible) {
                element.classList.add('active');
            }
        });
    });
    
    // إضافة تأثيرات للأقسام
    const sections = document.querySelectorAll('section');
    sections.forEach(section => {
        section.classList.add('reveal');
    });
}

function scrollToTop() {
    window.scrollTo({
        top: 0,
        behavior: 'smooth'
    });
}

// ============================================
// مستمعي الأحداث
// ============================================
function initEventListeners() {
    // تنسيق رقم البطاقة
    const cardNumber = document.getElementById('cardNumber');
    if (cardNumber) {
        cardNumber.addEventListener('input', function(e) {
            let value = e.target.value.replace(/\D/g, '');
            value = value.substring(0, 16);
            const formattedValue = value.match(/.{1,4}/g)?.join(' ') || value;
            e.target.value = formattedValue;
        });
    }
    
    // تنسيق تاريخ الانتهاء
    const expiryDate = document.getElementById('expiryDate');
    if (expiryDate) {
        expiryDate.addEventListener('input', function(e) {
            let value = e.target.value.replace(/\D/g, '');
            value = value.substring(0, 4);
            if (value.length >= 2) {
                value = value.substring(0, 2) + '/' + value.substring(2);
            }
            e.target.value = value;
        });
    }
    
    // تنسيق CVV
    const cvv = document.getElementById('cvv');
    if (cvv) {
        cvv.addEventListener('input', function(e) {
            let value = e.target.value.replace(/\D/g, '');
            e.target.value = value.substring(0, 3);
        });
    }
    
    // تغيير طريقة الدفع
    const paymentOptions = document.querySelectorAll('input[name="payment"]');
    paymentOptions.forEach(option => {
        option.addEventListener('change', function() {
            const cardDetails = document.getElementById('cardDetails');
            if (this.value === 'card') {
                cardDetails.style.display = 'block';
            } else {
                cardDetails.style.display = 'none';
            }
        });
    });
    
    // إرسال النشرة البريدية
    const newsletterForm = document.querySelector('.newsletter-form');
    if (newsletterForm) {
        newsletterForm.addEventListener('submit', function(e) {
            e.preventDefault();
            const email = this.querySelector('input').value;
            if (email) {
                showNotification('تم اشتراكك في النشرة البريدية بنجاح!', 'success');
                this.querySelector('input').value = '';
            }
        });
    }
    
    // روابط سلسة
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute('href'));
            if (target) {
                target.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
            }
        });
    });
}

// ============================================
// أدوات مساعدة
// ============================================
function formatPrice(price) {
    return price.toLocaleString('ar-SA') + ' ريال';
}

// منع إرسال النماذج
function preventFormSubmit(e) {
    e.preventDefault();
    return false;
}

// ============================================
// تهيئة عند تحميل الصفحة
// ============================================
window.addEventListener('load', function() {
    // إخفاء شاشة التحميل إذا وجدت
    const loader = document.querySelector('.page-loader');
    if (loader) {
        loader.style.opacity = '0';
        setTimeout(() => loader.remove(), 500);
    }
    
    // تحديث واجهة المفضلة
    updateWishlistUI();
    
    console.log('🛍️ بيكاليكا - متجرك الفاخر جاهز!');
});

// تصدير الدوال للاستخدام العام
window.toggleCart = toggleCart;
window.addToCart = addToCart;
window.removeFromCart = removeFromCart;
window.updateQuantity = updateQuantity;
window.quickView = quickView;
window.closeProductModal = closeProductModal;
window.addToWishlist = addToWishlist;
window.checkout = checkout;
window.closeCheckout = closeCheckout;
window.nextStep = nextStep;
window.prevStep = prevStep;
window.closeSearch = closeSearch;
window.toggleMenu = toggleMenu;
window.scrollToTop = scrollToTop;
window.loadMoreProducts = loadMoreProducts;
window.currentSlide = currentSlide;
