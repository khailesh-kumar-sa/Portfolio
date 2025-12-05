// Universal Theme Toggle & Navigation
document.addEventListener('DOMContentLoaded', function() {
    // Theme Toggle
    const themeToggle = document.querySelector('.theme-toggle');
    const body = document.body;
    
    function initTheme() {
        const savedTheme = localStorage.getItem('theme');
        if (savedTheme === 'dark') {
            body.classList.add('dark-theme');
            document.querySelector('.theme-toggle i').className = 'fas fa-sun';
        }
    }
    
    themeToggle.addEventListener('click', () => {
        body.classList.toggle('dark-theme');
        const isDark = body.classList.contains('dark-theme');
        document.querySelector('.theme-toggle i').className = isDark ? 'fas fa-sun' : 'fas fa-moon';
        localStorage.setItem('theme', isDark ? 'dark' : 'light');
    });
    
    initTheme();
    
    // Navbar Active State
    document.querySelectorAll('.nav-link').forEach(link => {
        link.addEventListener('click', () => {
            document.querySelectorAll('.nav-link').forEach(l => l.classList.remove('active'));
            link.classList.add('active');
        });
    });
    
    // Smooth Scroll
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute('href'));
            if (target) {
                target.scrollIntoView({ behavior: 'smooth', block: 'start' });
            }
        });
    });
    
    // Animate Skill Bars
    const skillObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const progress = entry.target.querySelector('.skill-progress');
                const targetWidth = progress.dataset.width;
                progress.style.width = targetWidth + '%';
                skillObserver.unobserve(entry.target);
            }
        });
    }, { threshold: 0.5 });
    
    document.querySelectorAll('.skill-card').forEach(card => {
        card.querySelector('.skill-progress').dataset.width = card.dataset.skill || '0';
        skillObserver.observe(card);
    });
    
    // Counter Animation
    function animateCounters() {
        const counters = document.querySelectorAll('.achievement-counter');
        counters.forEach(counter => {
            const target = parseInt(counter.dataset.target);
            const count = parseInt(counter.textContent);
            const increment = target / 100;
            
            if (count < target) {
                counter.textContent = Math.ceil(count + increment);
                requestAnimationFrame(animateCounters);
            } else {
                counter.textContent = target;
            }
        });
    }
    
    const counterObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                animateCounters();
                counterObserver.unobserve(entry.target);
            }
        });
    });
    
    document.querySelectorAll('.achievements-grid').forEach(grid => {
        counterObserver.observe(grid);
    });
    
    // Form Submission
    document.querySelectorAll('.contact-form').forEach(form => {
        form.addEventListener('submit', function(e) {
            e.preventDefault();
            const formData = new FormData(this);
            // Simulate form submission
            this.innerHTML = '<div class="success-message">🎉 Message sent successfully! I\'ll get back to you within 24 hours.</div>';
            setTimeout(() => {
                this.reset();
                this.innerHTML = this.dataset.originalHTML || '';
            }, 3000);
        });
    });
    
    // Navbar Scroll Effect
    window.addEventListener('scroll', () => {
        const navbar = document.querySelector('.navbar');
        if (window.scrollY > 100) {
            navbar.style.background = 'rgba(255,255,255,0.98)';
            navbar.style.boxShadow = '0 10px 40px rgba(0,0,0,0.15)';
        } else {
            navbar.style.background = 'rgba(255,255,255,0.95)';
            navbar.style.boxShadow = '0 4px 30px rgba(0,0,0,0.08)';
        }
    });
});
