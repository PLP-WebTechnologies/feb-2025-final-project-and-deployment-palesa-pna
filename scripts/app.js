document.addEventListener('DOMContentLoaded', function() {
    // Mobile Navigation
    const hamburger = document.querySelector('.hamburger');
    const navLinks = document.querySelector('.nav-links');
    const navOverlay = document.createElement('div');
    navOverlay.className = 'nav-overlay';
    document.body.appendChild(navOverlay);

    // Mobile Menu Toggle
    const menuToggle = document.getElementById('menuToggle');
    const mainNav = document.getElementById('mainNav');
    const mobileOverlay = document.getElementById('mobileOverlay');

    // Initialize cart
    let cart = JSON.parse(localStorage.getItem('cart')) || [];
    const cartCount = document.querySelector('.cart-count');

    // Toggle mobile menu
    function toggleMobileMenu() {
        if (menuToggle && mainNav && mobileOverlay) {
            menuToggle.addEventListener('click', () => {
                mainNav.classList.toggle('active');
                mobileOverlay.classList.toggle('active');
                document.body.classList.toggle('no-scroll');
                
                // Toggle hamburger icon
                const icon = menuToggle.querySelector('i');
                if (icon) {
                    icon.classList.toggle('fa-times');
                }
            });
        }
    }

    // Close mobile menu
    function closeMobileMenu() {
        if (mobileOverlay) {
            mobileOverlay.addEventListener('click', () => {
                mainNav.classList.remove('active');
                mobileOverlay.classList.remove('active');
                document.body.classList.remove('no-scroll');
                
                const icon = menuToggle.querySelector('i');
                if (icon) {
                    icon.classList.remove('fa-times');
                }
            });
        }
    }

    // Close menu when clicking on nav links
    function closeMenuOnLinkClick() {
        document.querySelectorAll('.nav-link').forEach(link => {
            link.addEventListener('click', () => {
                if (mainNav && mobileOverlay && menuToggle) {
                    mainNav.classList.remove('active');
                    mobileOverlay.classList.remove('active');
                    document.body.classList.remove('no-scroll');
                    
                    const icon = menuToggle.querySelector('i');
                    if (icon) {
                        icon.classList.remove('fa-times');
                    }
                }
            });
        });
    }

    // Update cart count
    function updateCartCount() {
        if (cartCount) {
            const totalItems = cart.reduce((total, item) => total + (item.quantity || 0), 0);
            cartCount.textContent = totalItems;
        }
    }

    // Add to cart functionality
    function setupAddToCart() {
        document.querySelectorAll('.btn-add-to-cart').forEach(button => {
            button.addEventListener('click', function() {
                const productCard = this.closest('.product-card');
                if (!productCard) return;

                const productId = productCard.dataset.productId || Date.now().toString();
                const productNameElement = productCard.querySelector('.product-title');
                const priceElement = productCard.querySelector('.current-price');
                
                if (!productNameElement || !priceElement) return;

                const productName = productNameElement.textContent;
                const priceText = priceElement.textContent;
                const productPrice = parseFloat(priceText.replace(/[^0-9.]/g, '')) || 0;

                // Add to cart
                const existingItem = cart.find(item => item.id === productId);
                if (existingItem) {
                    existingItem.quantity = (existingItem.quantity || 0) + 1;
                } else {
                    cart.push({
                        id: productId,
                        name: productName,
                        price: productPrice,
                        quantity: 1
                    });
                }

                localStorage.setItem('cart', JSON.stringify(cart));
                updateCartCount();

                // Show confirmation
                const confirmation = document.createElement('div');
                confirmation.className = 'add-to-cart-confirmation';
                confirmation.textContent = `${productName} added to cart!`;
                document.body.appendChild(confirmation);

                setTimeout(() => {
                    confirmation.remove();
                }, 3000);
            });
        });
    }

    // Newsletter form handling
    function setupNewsletterForm() {
        const newsletterForm = document.getElementById('newsletterForm');
        
        if (newsletterForm) {
            newsletterForm.addEventListener('submit', function(e) {
                e.preventDefault();
                
                const emailInput = document.getElementById('newsletterEmail');
                const formMessage = document.querySelector('.form-message');
                
                if (!emailInput || !formMessage) return;

                const email = emailInput.value.trim();
                
                // Validate email
                if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
                    formMessage.textContent = 'Please enter a valid email address';
                    formMessage.style.color = '#e74c3c';
                    emailInput.focus();
                    return;
                }
                
                // Save to localStorage
                let subscribers = JSON.parse(localStorage.getItem('newsletterSubscribers')) || [];
                
                if (subscribers.includes(email)) {
                    formMessage.textContent = 'You\'re already subscribed!';
                    formMessage.style.color = '#ffc107';
                } else {
                    subscribers.push(email);
                    localStorage.setItem('newsletterSubscribers', JSON.stringify(subscribers));
                    
                    formMessage.textContent = 'Thank you for subscribing! 🎉';
                    formMessage.style.color = '#28a745';
                    emailInput.value = '';
                    
                    setTimeout(() => {
                        formMessage.textContent = '';
                    }, 5000);
                }
            });
        }
    }

    // Initialize all functions
    toggleMobileMenu();
    closeMobileMenu();
    closeMenuOnLinkClick();
    updateCartCount();
    setupAddToCart();
    setupNewsletterForm();

    // Handle window resize
    window.addEventListener('resize', function() {
        if (window.innerWidth > 768 && mainNav) {
            mainNav.classList.remove('active');
            if (mobileOverlay) mobileOverlay.classList.remove('active');
            document.body.classList.remove('no-scroll');
            
            const icon = menuToggle?.querySelector('i');
            if (icon) icon.classList.remove('fa-times');
        }
    });

    // Pause video when tab is inactive
    const heroVideo = document.querySelector('.hero video');
    if (heroVideo) {
        document.addEventListener('visibilitychange', () => {
            if (document.hidden) {
                heroVideo.pause();
            } else {
                heroVideo.play().catch(e => console.log('Autoplay prevented:', e));
            }
        });
    }
});