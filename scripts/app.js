document.addEventListener('DOMContentLoaded', function() {
    // Mobile Navigation
    const hamburger = document.querySelector('.hamburger');
    const navLinks = document.querySelector('.nav-links');
    const navOverlay = document.createElement('div');
    navOverlay.className = 'nav-overlay';
    document.body.appendChild(navOverlay);

    // Toggle mobile menu
    hamburger.addEventListener('click', function() {
        navLinks.classList.toggle('active');
        this.classList.toggle('fa-times');
        navOverlay.style.display = navLinks.classList.contains('active') ? 'block' : 'none';
    });

    // Close menu when clicking overlay
    navOverlay.addEventListener('click', function() {
        navLinks.classList.remove('active');
        hamburger.classList.remove('fa-times');
        this.style.display = 'none';
    });

    // Close menu when clicking on links
    document.querySelectorAll('.nav-links a').forEach(link => {
        link.addEventListener('click', function() {
            if (window.innerWidth <= 768) {
                navLinks.classList.remove('active');
                hamburger.classList.remove('fa-times');
                navOverlay.style.display = 'none';
            }
        });
    });

    // Handle window resize
    window.addEventListener('resize', function() {
        if (window.innerWidth > 768) {
            navLinks.classList.remove('active');
            hamburger.classList.remove('fa-times');
            navOverlay.style.display = 'none';
        }
    });

    // Smooth scrolling for anchor links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute('href'));
            if (target) {
                target.scrollIntoView({
                    behavior: 'smooth'
                });
            }
        });
    });

    // Add to cart functionality
    document.querySelectorAll('.btn-add-to-cart').forEach(button => {
        button.addEventListener('click', function() {
            const productCard = this.closest('.product-card');
            const productName = productCard.querySelector('.product-title').textContent;
            
            // Update cart count
            const cartCount = document.querySelector('.cart-count');
            let currentCount = parseInt(cartCount.textContent) || 0;
            cartCount.textContent = currentCount + 1;
            
            // Show confirmation
            const confirmation = document.createElement('div');
            confirmation.className = 'add-to-cart-confirmation';
            confirmation.textContent = `${productName} added to cart!`;
            document.body.appendChild(confirmation);
            
            // Remove after 3 seconds
            setTimeout(() => {
                confirmation.remove();
            }, 3000);
            
            // Save to localStorage
            const cart = JSON.parse(localStorage.getItem('cart')) || [];
            const productId = productCard.getAttribute('data-product-id') || Date.now();
            const existingItem = cart.find(item => item.id === productId);
            
            if (existingItem) {
                existingItem.quantity += 1;
            } else {
                cart.push({
                    id: productId,
                    name: productName,
                    quantity: 1,
                    price: parseFloat(productCard.querySelector('.current-price').textContent.replace(/[^0-9.]/g, ''))
                });
            }
            
            localStorage.setItem('cart', JSON.stringify(cart));
        });
    });

    // Initialize cart count
    const cart = JSON.parse(localStorage.getItem('cart')) || [];
    const totalItems = cart.reduce((sum, item) => sum + item.quantity, 0);
    document.querySelector('.cart-count').textContent = totalItems;

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

    // Mobile touch support
    document.querySelectorAll('button, a').forEach(element => {
        element.style.touchAction = 'manipulation';
    });

    // Prevent zooming on form inputs
    document.querySelectorAll('input, select, textarea').forEach(input => {
        input.addEventListener('touchstart', function() {
            const viewportMeta = document.querySelector('meta[name="viewport"]');
            if (viewportMeta) {
                viewportMeta.content = 'width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=no';
            }
        });
    });
});