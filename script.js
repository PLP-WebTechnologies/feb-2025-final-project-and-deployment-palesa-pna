// Cart Logic
let cart = [];

function updateCartCount() {
    document.getElementById('cart-count').textContent = cart.length;
}

document.querySelectorAll('.add-to-cart').forEach(button => {
    button.addEventListener('click', () => {
        const product = button.parentElement;
        cart.push({
            name: product.querySelector('h3').textContent,
            price: product.querySelector('p').textContent
        });
        updateCartCount();
    });
});

// Form Validation
document.getElementById('contactForm').addEventListener('submit', (e) => {
    e.preventDefault();
    const email = document.getElementById('email').value;
    if (!email.includes('@')) {
        alert('Please enter a valid email!');
    } else {
        document.getElementById('form-success').style.display = 'block';
    }
});
// DOM Elements
const cartCount = document.querySelector('.cart-count');
const addToCartBtns = document.querySelectorAll('.btn-add-to-cart');
const mobileMenuBtn = document.querySelector('.hamburger');
const navLinks = document.querySelector('.nav-links');
const newsletterForm = document.getElementById('newsletterForm');

// Cart functionality
let cartItems = JSON.parse(localStorage.getItem('cart')) || [];

function updateCartCount() {
    cartCount.textContent = cartItems.length;
}

function addToCart(product) {
    cartItems.push(product);
    localStorage.setItem('cart', JSON.stringify(cartItems));
    updateCartCount();
}

// Mobile menu toggle
mobileMenuBtn.addEventListener('click', () => {
    navLinks.classList.toggle('active');
    mobileMenuBtn.querySelector('i').classList.toggle('fa-times');
    
    // Update ARIA attribute
    const expanded = mobileMenuBtn.getAttribute('aria-expanded') === 'true';
    mobileMenuBtn.setAttribute('aria-expanded', !expanded);
});

// Newsletter form
if(newsletterForm) {
    newsletterForm.addEventListener('submit', function(e) {
        e.preventDefault();
        const emailInput = this.querySelector('input[type="email"]');
        const messageDiv = this.querySelector('.form-message') || document.createElement('div');
        
        if(!this.querySelector('.form-message')) {
            messageDiv.className = 'form-message';
            this.appendChild(messageDiv);
        }
        
        if (!emailInput.value.includes('@')) {
            messageDiv.textContent = 'Please enter a valid email address';
            messageDiv.style.color = 'var(--danger-color)';
        } else {
            messageDiv.textContent = 'Thanks for subscribing!';
            messageDiv.style.color = 'var(--success-color)';
            this.reset();
        }
    });
}

// Initialize cart count on load
document.addEventListener('DOMContentLoaded', updateCartCount);
// Add loaded class when images finish loading
document.querySelectorAll('img').forEach(img => {
  if (img.complete) {
    img.classList.add('loaded');
  } else {
    img.addEventListener('load', () => {
      img.classList.add('loaded');
    });
  }
});