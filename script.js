/* ===================================
   TOTAL PROTECT INTEGRADORES
   Main JavaScript
   =================================== */

document.addEventListener('DOMContentLoaded', () => {
    // --- Intro Animation ---
    const intro = document.getElementById('intro');
    const introLogo = intro?.querySelector('.intro__logo');

    if (intro && introLogo) {
        setTimeout(() => {
            introLogo.classList.add('animate');
        }, 1200);

        setTimeout(() => {
            intro.classList.add('hidden');
            document.body.style.overflow = 'auto';
        }, 2200);

        document.body.style.overflow = 'hidden';
    }

    // --- Mobile Menu ---
    const navToggle = document.getElementById('nav-toggle');
    const navClose = document.getElementById('nav-close');
    const navMenu = document.getElementById('nav-menu');
    const navLinks = document.querySelectorAll('.nav__link');

    if (navToggle) {
        navToggle.addEventListener('click', () => {
            navMenu.classList.add('active');
        });
    }

    if (navClose) {
        navClose.addEventListener('click', () => {
            navMenu.classList.remove('active');
        });
    }

    navLinks.forEach(link => {
        link.addEventListener('click', () => {
            navMenu.classList.remove('active');
        });
    });

    // --- Header Scroll Effect ---
    const header = document.getElementById('header');
    
    window.addEventListener('scroll', () => {
        if (window.scrollY > 50) {
            header.classList.add('scrolled');
        } else {
            header.classList.remove('scrolled');
        }
    });

    // --- Clients Carousel (bucle infinito automático, sin controles) ---
    const track = document.getElementById('clients-track');

    if (track) {
        // Duplicar logos para un bucle seamless (la animación CSS desplaza -50%).
        // Se clona una sola vez; las copias van con aria-hidden para accesibilidad.
        if (track.children.length > 0 && !track.dataset.loopReady) {
            const originals = Array.from(track.children);
            originals.forEach((logo) => {
                const clone = logo.cloneNode(true);
                clone.setAttribute('aria-hidden', 'true');
                const img = clone.querySelector('img');
                if (img) {
                    img.setAttribute('loading', 'lazy');
                    img.removeAttribute('id');
                }
                track.appendChild(clone);
            });
            track.dataset.loopReady = 'true';
        }
    }

    // --- Smooth Scroll for anchor links ---
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

    // --- Active Navigation Link ---
    const sections = document.querySelectorAll('section[id]');
    
    function highlightNav() {
        const scrollY = window.pageYOffset;
        
        sections.forEach(section => {
            const sectionHeight = section.offsetHeight;
            const sectionTop = section.offsetTop - 100;
            const sectionId = section.getAttribute('id');
            const navLink = document.querySelector(`.nav__link[href="#${sectionId}"]`);
            
            if (navLink) {
                if (scrollY > sectionTop && scrollY <= sectionTop + sectionHeight) {
                    navLink.classList.add('active');
                } else {
                    navLink.classList.remove('active');
                }
            }
        });
    }
    
    window.addEventListener('scroll', highlightNav);

    // --- Contact Form ---
    const contactForm = document.getElementById('contact-form');
    
    if (contactForm) {
        contactForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            const formData = new FormData(this);
            const name = formData.get('name');
            const email = formData.get('email');
            const phone = formData.get('phone');
            const service = formData.get('service');
            const message = formData.get('message');
            
            // Create mailto link
            const subject = encodeURIComponent(`Consulta desde la web - ${service || 'General'}`);
            const body = encodeURIComponent(
                `Nombre: ${name}\n` +
                `Email: ${email}\n` +
                `Teléfono: ${phone}\n` +
                `Servicio: ${service || 'No especificado'}\n\n` +
                `Mensaje:\n${message}`
            );
            
            window.location.href = `mailto:totalprotectin@gmail.com?subject=${subject}&body=${body}`;
            
            // Show success message
            const btn = this.querySelector('button[type="submit"]');
            const originalText = btn.innerHTML;
            btn.innerHTML = '<i class="fas fa-check"></i> Mensaje Enviado';
            btn.disabled = true;
            
            setTimeout(() => {
                btn.innerHTML = originalText;
                btn.disabled = false;
                this.reset();
            }, 3000);
        });
    }

    // --- Scroll Reveal Animation ---
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
            }
        });
    }, observerOptions);
    
    document.querySelectorAll('.service-card, .gallery__item, .value, .contact__detail').forEach(el => {
        el.style.opacity = '0';
        el.style.transform = 'translateY(30px)';
        el.style.transition = 'all 0.6s ease';
        observer.observe(el);
    });

    // --- Counter Animation ---
    function animateCounter(element, target, duration = 2000) {
        let start = 0;
        const increment = target / (duration / 16);
        
        function updateCounter() {
            start += increment;
            if (start < target) {
                element.textContent = Math.floor(start) + '+';
                requestAnimationFrame(updateCounter);
            } else {
                element.textContent = target + '+';
            }
        }
        
        updateCounter();
    }
    
    const statsObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const statNumbers = entry.target.querySelectorAll('.stat__number');
                statNumbers.forEach(stat => {
                    const text = stat.textContent;
                    const number = parseInt(text);
                    if (!isNaN(number)) {
                        animateCounter(stat, number);
                    }
                });
                statsObserver.unobserve(entry.target);
            }
        });
    }, { threshold: 0.5 });
    
    const statsSection = document.querySelector('.hero__stats');
    if (statsSection) {
        statsObserver.observe(statsSection);
    }
});
