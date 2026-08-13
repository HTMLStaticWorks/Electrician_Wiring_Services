/* 
============================================================
  ELECTRICIAN & WIRING SERVICES - MAIN JAVASCRIPT
============================================================
*/

document.addEventListener('DOMContentLoaded', () => {
    
    // 1. Loader Logic
    const loader = document.getElementById('page-loader');
    if (loader) {
        setTimeout(() => {
            loader.style.opacity = '0';
            setTimeout(() => {
                loader.style.visibility = 'hidden';
                loader.remove();
            }, 500);
        }, 800); // Simulated load time
    }

    // 2. Theme Toggle Logic
    const themeToggleBtns = document.querySelectorAll('.theme-toggle-btn');
    const htmlElement = document.documentElement;
    
    const setTheme = (theme) => {
        htmlElement.setAttribute('data-theme', theme);
        localStorage.setItem('theme', theme);
        updateThemeIcons(theme);
    };

    const updateThemeIcons = (theme) => {
        themeToggleBtns.forEach(btn => {
            if (theme === 'dark') {
                btn.innerHTML = '<i data-lucide="sun"></i>';
            } else {
                btn.innerHTML = '<i data-lucide="moon"></i>';
            }
        });
        if (typeof lucide !== 'undefined') {
            lucide.createIcons();
        }
    };

    // Initialize Theme
    const savedTheme = localStorage.getItem('theme');
    const systemTheme = window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light';
    const initialTheme = savedTheme || systemTheme;
    setTheme(initialTheme);

    themeToggleBtns.forEach(btn => {
        btn.addEventListener('click', () => {
            const currentTheme = htmlElement.getAttribute('data-theme');
            setTheme(currentTheme === 'dark' ? 'light' : 'dark');
        });
    });

    // 3. RTL Toggle Logic
    const rtlToggleBtns = document.querySelectorAll('.rtl-toggle-btn');
    
    const setRtl = (isRtl) => {
        htmlElement.setAttribute('dir', isRtl ? 'rtl' : 'ltr');
        localStorage.setItem('rtl', isRtl);
    };

    // Initialize RTL
    const savedRtl = localStorage.getItem('rtl') === 'true';
    setRtl(savedRtl);

    rtlToggleBtns.forEach(btn => {
        btn.addEventListener('click', () => {
            const currentDir = htmlElement.getAttribute('dir');
            setRtl(currentDir !== 'rtl');
        });
    });

    // 4. Mobile Navbar Logic
    const navbarToggler = document.querySelector('.navbar-toggler');
    const navbarCollapse = document.querySelector('.navbar-collapse');
    const navLinks = document.querySelectorAll('.nav-link');

    if (navbarToggler && navbarCollapse) {
        navbarToggler.addEventListener('click', () => {
            navbarCollapse.classList.toggle('show');
            // Animate hamburger to X (simplified here, assume Lucide icon change or CSS transform)
            const icon = navbarToggler.querySelector('i');
            if (navbarCollapse.classList.contains('show')) {
                icon.setAttribute('data-lucide', 'x');
            } else {
                icon.setAttribute('data-lucide', 'menu');
            }
            if (typeof lucide !== 'undefined') {
                lucide.createIcons();
            }
        });

        // Auto close after selecting a link (exclude dropdown toggles)
        navLinks.forEach(link => {
            link.addEventListener('click', (e) => {
                if (link.classList.contains('dropdown-toggle')) {
                    return; // Do not close menu if clicking a dropdown toggle
                }
                
                if (window.innerWidth <= 1024) {
                    navbarCollapse.classList.remove('show');
                    const icon = navbarToggler.querySelector('i');
                    icon.setAttribute('data-lucide', 'menu');
                    if (typeof lucide !== 'undefined') {
                        lucide.createIcons();
                    }
                }
            });
        });
    }

    // 5. Initialize Lucide Icons
    if (typeof lucide !== 'undefined') {
        lucide.createIcons();
    }

    // 6. GSAP Animations (If available)
    if (typeof gsap !== 'undefined' && typeof ScrollTrigger !== 'undefined') {
        gsap.registerPlugin(ScrollTrigger);

        // General Fade Up for elements
        const fadeUpElements = document.querySelectorAll('.gsap-fade-up');
        fadeUpElements.forEach(el => {
            gsap.from(el, {
                scrollTrigger: {
                    trigger: el,
                    start: "top 85%",
                    toggleActions: "play none none none"
                },
                y: 50,
                opacity: 0,
                duration: 0.8,
                ease: "power3.out"
            });
        });

        // Staggered Cards (Services, Pricing, etc)
        const cardContainers = document.querySelectorAll('.gsap-stagger-container');
        cardContainers.forEach(container => {
            const cards = container.querySelectorAll('.gsap-stagger-item');
            if (cards.length > 0) {
                gsap.from(cards, {
                    scrollTrigger: {
                        trigger: container,
                        start: "top 80%",
                    },
                    y: 50,
                    opacity: 0,
                    duration: 0.6,
                    stagger: 0.15,
                    ease: "power2.out"
                });
            }
        });
    }

    // 7. Initialize CountUp (If available)
    if (typeof CountUp !== 'undefined') {
        const counterElements = document.querySelectorAll('.stat-counter');
        counterElements.forEach(el => {
            const target = parseInt(el.getAttribute('data-target'), 10);
            if (!isNaN(target)) {
                let countUp = new CountUp(el, target, { duration: 3 });
                
                // Trigger via Intersection Observer
                let observer = new IntersectionObserver((entries) => {
                    if (entries[0].isIntersecting) {
                        countUp.start();
                        observer.disconnect();
                    }
                });
                observer.observe(el);
            }
        });
    }

    // 8. Form Validation (Client-Side)
    const forms = document.querySelectorAll('.needs-validation');
    Array.from(forms).forEach(form => {
        form.addEventListener('submit', event => {
            if (!form.checkValidity()) {
                event.preventDefault();
                event.stopPropagation();
            } else {
                event.preventDefault(); // Prevent actual submission for demo
                const btn = form.querySelector('button[type="submit"]');
                const originalText = btn.innerHTML;
                btn.innerHTML = 'Processing... <i data-lucide="loader" class="loader-icon"></i>';
                if (typeof lucide !== 'undefined') lucide.createIcons();
                
                setTimeout(() => {
                    btn.innerHTML = 'Success! <i data-lucide="check-circle" class="icon-bright"></i>';
                    btn.classList.replace('btn-electric', 'btn-success');
                    if (typeof lucide !== 'undefined') lucide.createIcons();
                    form.reset();
                    form.classList.remove('was-validated');
                    
                    setTimeout(() => {
                        btn.innerHTML = originalText;
                        btn.classList.replace('btn-success', 'btn-electric');
                        if (typeof lucide !== 'undefined') lucide.createIcons();
                    }, 3000);
                }, 1500);
            }
            form.classList.add('was-validated');
        }, false);
    });

        // 10. Testimonials Swiper
    if (typeof Swiper !== 'undefined') {
        const testimonialsSlider = new Swiper('.testimonials-slider', {
            slidesPerView: 1,
            spaceBetween: 24,
            loop: true,
            autoplay: {
                delay: 4000,
                disableOnInteraction: false,
            },
            pagination: {
                el: '.swiper-pagination',
                clickable: true,
            },
            navigation: {
                nextEl: '.swiper-button-next',
                prevEl: '.swiper-button-prev',
            },
            breakpoints: {
                768: {
                    slidesPerView: 2,
                },
                1024: {
                    slidesPerView: 3,
                }
            }
        });
    }

    // 9. Back to Top Button
    const backToTopBtn = document.getElementById('backToTopBtn');
    if (backToTopBtn) {
        window.addEventListener('scroll', () => {
            if (window.scrollY > 300) {
                backToTopBtn.classList.add('show');
            } else {
                backToTopBtn.classList.remove('show');
            }
        });

        backToTopBtn.addEventListener('click', (e) => {
            e.preventDefault();
            window.scrollTo({
                top: 0,
                behavior: 'smooth'
            });
        });
    }

});
