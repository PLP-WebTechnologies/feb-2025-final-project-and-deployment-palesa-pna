// Mobile Menu Toggle (for responsive navigation)
document.querySelector('.mobile-menu').addEventListener('click', () => {
    document.querySelector('nav ul').classList.toggle('active');
});

// Smooth scrolling for anchor links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function(e) {
        e.preventDefault();
        document.querySelector(this.getAttribute('href')).scrollIntoView({
            behavior: 'smooth'
        });
    });
});
document.addEventListener('DOMContentLoaded', function() {
    const hamburger = document.querySelector('.hamburger');
    const navLinks = document.querySelector('.nav-links');
    const overlay = document.querySelector('.mobile-menu-overlay');
    
    // Toggle menu
    hamburger.addEventListener('click', function(e) {
        e.stopPropagation();
        navLinks.classList.toggle('active');
        overlay.classList.toggle('active');
        this.classList.toggle('fa-times');
    });
    
    // Close menu when clicking outside
    overlay.addEventListener('click', function() {
        navLinks.classList.remove('active');
        overlay.classList.remove('active');
        hamburger.classList.remove('fa-times');
    });
    
    // Close menu when clicking on links
    document.querySelectorAll('.nav-links a').forEach(link => {
        link.addEventListener('click', function() {
            navLinks.classList.remove('active');
            overlay.classList.remove('active');
            hamburger.classList.remove('fa-times');
        });
    });
    
    // Handle window resize
    window.addEventListener('resize', function() {
        if (window.innerWidth > 768) {
            navLinks.classList.remove('active');
            overlay.classList.remove('active');
            hamburger.classList.remove('fa-times');
        }
    });
});
    
    // Close menu when clicking on links
    document.querySelectorAll('.nav-links a').forEach(link => {
        link.addEventListener('click', function() {
            navLinks.classList.remove('active');
            overlay.classList.remove('active');
            hamburger.classList.remove('fa-times');
        });
    });
    
// Mobile menu toggle
document.querySelector('.hamburger').addEventListener('click', () => {
    document.querySelector('.nav-links').classList.toggle('active');
    document.querySelector('.hamburger i').classList.toggle('fa-times');
});
// Mobile menu toggle
document.querySelector('.hamburger').addEventListener('click', function() {
    document.querySelector('.nav-links').classList.toggle('active');
});

// Close mobile menu when clicking a link
document.querySelectorAll('.nav-links a').forEach(link => {
    link.addEventListener('click', function() {
        document.querySelector('.nav-links').classList.remove('active');
    });
});
// Pause video when tab is inactive
document.addEventListener('visibilitychange', () => {
    const video = document.querySelector('.hero video');
    if (document.hidden) {
        video.pause();
    } else {
        video.play();
    }
});
// Add to cart functionality

document.querySelectorAll('.btn-add-to-cart').forEach(button => {
    button.addEventListener('click', function() {
        // Add your cart logic here
        const productCard = this.closest('.product-card');
        const productName = productCard.querySelector('.product-title').textContent;
        
        // Show confirmation
        const confirmation = document.createElement('div');
        confirmation.className = 'add-to-cart-confirmation';
        confirmation.textContent = `${productName} added to cart!`;
        document.body.appendChild(confirmation);
        
        // Remove after 3 seconds
        setTimeout(() => {
            confirmation.remove();
        }, 3000);
    });
});
        
        // Save to localStorage
        localStorage.setItem('cart', JSON.stringify(cart));
        
        // Update cart count
        updateCartCount();
        
        // Show confirmation
        showAddToCartConfirmation(productData.name);
    });
});

function updateCartCount() {
    const cart = JSON.parse(localStorage.getItem('cart')) || [];
    const totalItems = cart.reduce((sum, item) => sum + item.quantity, 0);
    document.querySelectorAll('.cart-count').forEach(el => {
        el.textContent = totalItems;
    });
}

function showAddToCartConfirmation(productName) {
    const confirmation = document.createElement('div');
    confirmation.className = 'add-to-cart-confirmation';
    confirmation.innerHTML = `
        <i class="fas fa-check"></i>
        ${productName} added to cart!
    `;
    document.body.appendChild(confirmation);
    
    setTimeout(() => {
        confirmation.remove();
    }, 3000);
}
// Add this temporary debug code
document.querySelectorAll('.btn-add-to-cart').forEach(button => {
    button.addEventListener('click', function() {
        const productCard = this.closest('.product-card');
        console.log('Product data:', productCard.getAttribute('data-product'));
    });
});
// Mobile navigation toggle
const hamburger = document.querySelector('.hamburger');
const navLinks = document.querySelector('.nav-links');

hamburger.addEventListener('click', function() {
    navLinks.classList.toggle('active');
    this.classList.toggle('fa-times');
});

// Close menu when clicking on links
document.querySelectorAll('.nav-links a').forEach(link => {
    link.addEventListener('click', function() {
        navLinks.classList.remove('active');
        hamburger.classList.remove('fa-times');
    });
});

// Handle window resize
function handleResize() {
    if (window.innerWidth > 768) {
        navLinks.classList.remove('active');
        hamburger.classList.remove('fa-times');
    }
}

window.addEventListener('resize', handleResize);

// Add touch support for mobile
document.querySelectorAll('button, a').forEach(element => {
    element.style.touchAction = 'manipulation';
});

// Prevent zooming on form inputs
document.querySelectorAll('input, select, textarea').forEach(input => {
    input.addEventListener('touchstart', function() {
        document.querySelector('meta[name="viewport"]').content = 'width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=no';
    });
});
// Update your existing mobile menu JS
document.addEventListener('DOMContentLoaded', function() {
    const hamburger = document.querySelector('.hamburger');
    const navLinks = document.querySelector('.nav-links');
    const navOverlay = document.createElement('div');
    navOverlay.className = 'nav-overlay';
    document.body.appendChild(navOverlay);

    hamburger.addEventListener('click', function() {
        navLinks.classList.toggle('active');
        hamburger.classList.toggle('fa-times');
        navOverlay.style.display = navLinks.classList.contains('active') ? 'block' : 'none';
    });

    navOverlay.addEventListener('click', function() {
        navLinks.classList.remove('active');
        hamburger.classList.remove('fa-times');
        this.style.display = 'none';
    });

    // Close menu when clicking on links
    document.querySelectorAll('.nav-links a').forEach(link => {
        link.addEventListener('click', function() {
            navLinks.classList.remove('active');
            hamburger.classList.remove('fa-times');
            navOverlay.style.display = 'none';
        });
    });
});
