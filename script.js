// Jed's Design Laws - Motion & Interaction Implementation

// Formspree Configuration
// Form automatically posts to: https://formspree.io/f/mvzyrezz

// Mobile Menu Toggle
const hamburger = document.querySelector('.hamburger');
const navMenu = document.querySelector('.nav-menu');
const navLinks = document.querySelectorAll('.nav-menu a');

hamburger.addEventListener('click', () => {
    navMenu.classList.toggle('active');
});

// Close menu when a link is clicked
navLinks.forEach(link => {
    link.addEventListener('click', () => {
        navMenu.classList.remove('active');
    });
});

// CTA Button Scroll to Contact
const ctaButtons = document.querySelectorAll('.cta-button');
ctaButtons.forEach(button => {
    button.addEventListener('click', (e) => {
        if (button.type !== 'submit') {
            document.querySelector('#contact').scrollIntoView({ behavior: 'smooth' });
        }
    });
});

// Scroll-triggered animations with IntersectionObserver
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -100px 0px'
};

const revealObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('revealed');
            revealObserver.unobserve(entry.target);
        }
    });
}, observerOptions);

// Observe elements for scroll reveals
const revealElements = document.querySelectorAll('.service-card, .metric, .portfolio-item, .testimonial');
revealElements.forEach(el => {
    el.classList.add('reveal');
    revealObserver.observe(el);
});

// Contact Form Handling with Formspree
const contactForm = document.getElementById('contactForm');

if (contactForm) {
    contactForm.addEventListener('submit', (e) => {
        // Get form values for validation
        const name = document.getElementById('name').value;
        const email = document.getElementById('email').value;
        const message = document.getElementById('message').value;

        // Validation
        if (!name || !email || !message) {
            alert('Please fill in all required fields.');
            e.preventDefault();
            return;
        }

        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(email)) {
            alert('Please enter a valid email address.');
            e.preventDefault();
            return;
        }

        // Show loading state
        const submitButton = contactForm.querySelector('.submit-button');
        const originalText = submitButton.textContent;
        submitButton.textContent = 'Sending...';
        submitButton.disabled = true;

        // Formspree will handle the actual submission
        // After successful submission, Formspree redirects to a success page
        // We let it proceed naturally
    });
}

// Smooth scroll for navigation links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        const href = this.getAttribute('href');
        if (href !== '#' && document.querySelector(href)) {
            e.preventDefault();
            document.querySelector(href).scrollIntoView({
                behavior: 'smooth'
            });
        }
    });
});

// Active nav link highlighting on scroll
window.addEventListener('scroll', () => {
    const sections = document.querySelectorAll('section[id]');
    const navLinks = document.querySelectorAll('.nav-menu a');

    let current = '';
    sections.forEach(section => {
        const sectionTop = section.offsetTop;
        if (pageYOffset >= sectionTop - 300) {
            current = section.getAttribute('id');
        }
    });

    navLinks.forEach(link => {
        link.style.color = '';
        if (link.getAttribute('href').slice(1) === current) {
            link.style.color = 'var(--accent)';
        }
    });
});

// Prevent layout shift on form focus
document.querySelectorAll('input, textarea').forEach(field => {
    field.addEventListener('focus', function() {
        this.style.transition = 'none';
    });
    field.addEventListener('blur', function() {
        this.style.transition = '';
    });
});
