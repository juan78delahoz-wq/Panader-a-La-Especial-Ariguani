// ========================================
// NAVEGACIÓN
// ========================================

// Elementos del DOM
const navbar = document.getElementById('navbar');
const navToggle = document.getElementById('navToggle');
const navMenu = document.getElementById('navMenu');
const navLinks = document.querySelectorAll('.nav-link');

// Toggle del menú móvil
navToggle.addEventListener('click', () => {
    navMenu.classList.toggle('active');
    
    // Animación del botón hamburguesa
    const spans = navToggle.querySelectorAll('span');
    if (navMenu.classList.contains('active')) {
        spans[0].style.transform = 'rotate(45deg) translate(5px, 5px)';
        spans[1].style.opacity = '0';
        spans[2].style.transform = 'rotate(-45deg) translate(7px, -6px)';
    } else {
        spans[0].style.transform = 'none';
        spans[1].style.opacity = '1';
        spans[2].style.transform = 'none';
    }
});

// Cerrar menú al hacer click en un enlace
navLinks.forEach(link => {
    link.addEventListener('click', () => {
        navMenu.classList.remove('active');
        const spans = navToggle.querySelectorAll('span');
        spans[0].style.transform = 'none';
        spans[1].style.opacity = '1';
        spans[2].style.transform = 'none';
    });
});

// Cambiar estilo del navbar al hacer scroll
let lastScroll = 0;

window.addEventListener('scroll', () => {
    const currentScroll = window.pageYOffset;
    
    // Agregar clase scrolled cuando se hace scroll
    if (currentScroll > 50) {
        navbar.classList.add('scrolled');
    } else {
        navbar.classList.remove('scrolled');
    }
    
    lastScroll = currentScroll;
});

// ========================================
// SMOOTH SCROLL CON OFFSET PARA NAVBAR
// ========================================

navLinks.forEach(link => {
    link.addEventListener('click', (e) => {
        e.preventDefault();
        
        const targetId = link.getAttribute('href');
        const targetSection = document.querySelector(targetId);
        
        if (targetSection) {
            const navbarHeight = navbar.offsetHeight;
            const targetPosition = targetSection.offsetTop - navbarHeight;
            
            window.scrollTo({
                top: targetPosition,
                behavior: 'smooth'
            });
        }
    });
});

// ========================================
// ANIMACIONES AL HACER SCROLL
// ========================================

// Función para detectar si un elemento está en el viewport
function isInViewport(element) {
    const rect = element.getBoundingClientRect();
    return (
        rect.top >= 0 &&
        rect.left >= 0 &&
        rect.bottom <= (window.innerHeight || document.documentElement.clientHeight) &&
        rect.right <= (window.innerWidth || document.documentElement.clientWidth)
    );
}

// Función para animar elementos cuando aparecen en pantalla
function animateOnScroll() {
    const elements = document.querySelectorAll('.product-card, .process-step, .contact-card');
    
    elements.forEach((element, index) => {
        if (isInViewport(element)) {
            setTimeout(() => {
                element.style.opacity = '1';
                element.style.transform = 'translateY(0)';
            }, index * 100);
        }
    });
}

// Inicializar elementos con opacidad 0
document.addEventListener('DOMContentLoaded', () => {
    const elements = document.querySelectorAll('.product-card, .process-step, .contact-card');
    elements.forEach(element => {
        element.style.opacity = '0';
        element.style.transform = 'translateY(30px)';
        element.style.transition = 'all 0.6s ease';
    });
});

// Escuchar el evento scroll
window.addEventListener('scroll', animateOnScroll);
window.addEventListener('load', animateOnScroll);

// ========================================
// DESTACAR ENLACE ACTIVO EN NAVEGACIÓN
// ========================================

function highlightActiveSection() {
    const sections = document.querySelectorAll('section[id]');
    const navbarHeight = navbar.offsetHeight;
    
    let currentSection = '';
    
    sections.forEach(section => {
        const sectionTop = section.offsetTop - navbarHeight - 100;
        const sectionHeight = section.clientHeight;
        
        if (window.pageYOffset >= sectionTop && window.pageYOffset < sectionTop + sectionHeight) {
            currentSection = section.getAttribute('id');
        }
    });
    
    navLinks.forEach(link => {
        link.classList.remove('active');
        if (link.getAttribute('href') === `#${currentSection}`) {
            link.classList.add('active');
        }
    });
}

window.addEventListener('scroll', highlightActiveSection);
window.addEventListener('load', highlightActiveSection);

// ========================================
// LAZY LOADING DE IMÁGENES
// ========================================

document.addEventListener('DOMContentLoaded', () => {
    const images = document.querySelectorAll('img[src]');
    
    const imageObserver = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const img = entry.target;
                img.classList.add('loaded');
                observer.unobserve(img);
            }
        });
    });
    
    images.forEach(img => {
        imageObserver.observe(img);
    });
});

// ========================================
// BOTÓN DE WHATSAPP FLOTANTE (OPCIONAL)
// ========================================

// Crear botón flotante de WhatsApp
function createFloatingWhatsAppButton() {
    const whatsappButton = document.createElement('a');
    whatsappButton.href = 'https://wa.me/5734258092';
    whatsappButton.target = '_blank';
    whatsappButton.className = 'floating-whatsapp';
    whatsappButton.innerHTML = '💬';
    whatsappButton.setAttribute('aria-label', 'Contactar por WhatsApp');
    
    // Estilos inline para el botón flotante
    whatsappButton.style.cssText = `
        position: fixed;
        bottom: 20px;
        right: 20px;
        width: 60px;
        height: 60px;
        background: linear-gradient(135deg, #25D366, #128C7E);
        color: white;
        border-radius: 50%;
        display: flex;
        align-items: center;
        justify-content: center;
        font-size: 2rem;
        box-shadow: 0 4px 20px rgba(37, 211, 102, 0.5);
        z-index: 999;
        transition: all 0.3s ease;
        text-decoration: none;
        cursor: pointer;
    `;
    
    // Efectos hover
    whatsappButton.addEventListener('mouseenter', () => {
        whatsappButton.style.transform = 'scale(1.1)';
        whatsappButton.style.boxShadow = '0 8px 30px rgba(37, 211, 102, 0.7)';
    });
    
    whatsappButton.addEventListener('mouseleave', () => {
        whatsappButton.style.transform = 'scale(1)';
        whatsappButton.style.boxShadow = '0 4px 20px rgba(37, 211, 102, 0.5)';
    });
    
    // Mostrar solo cuando se hace scroll
    window.addEventListener('scroll', () => {
        if (window.pageYOffset > 300) {
            whatsappButton.style.opacity = '1';
            whatsappButton.style.visibility = 'visible';
        } else {
            whatsappButton.style.opacity = '0';
            whatsappButton.style.visibility = 'hidden';
        }
    });
    
    // Inicialmente oculto
    whatsappButton.style.opacity = '0';
    whatsappButton.style.visibility = 'hidden';
    whatsappButton.style.transition = 'all 0.3s ease';
    
    document.body.appendChild(whatsappButton);
}

// Crear el botón al cargar la página
document.addEventListener('DOMContentLoaded', createFloatingWhatsAppButton);

// ========================================
// PARALLAX SUAVE EN HERO
// ========================================

window.addEventListener('scroll', () => {
    const scrolled = window.pageYOffset;
    const hero = document.querySelector('.hero-content');
    
    if (hero && scrolled < window.innerHeight) {
        hero.style.transform = `translateY(${scrolled * 0.5}px)`;
        hero.style.opacity = 1 - (scrolled / 600);
    }
});

// ========================================
// MEJORAR EXPERIENCIA DE CARGA
// ========================================

window.addEventListener('load', () => {
    // Remover cualquier loader si existe
    const loader = document.querySelector('.loader');
    if (loader) {
        loader.style.opacity = '0';
        setTimeout(() => loader.remove(), 300);
    }
    
    // Activar animaciones iniciales
    document.body.classList.add('loaded');
});

// ========================================
// PREVENIR FOUC (Flash of Unstyled Content)
// ========================================

document.addEventListener('DOMContentLoaded', () => {
    document.body.style.visibility = 'visible';
});

// ========================================
// ANALYTICS Y TRACKING (OPCIONAL)
// ========================================

// Rastrear clics en botones de WhatsApp
document.querySelectorAll('a[href*="wa.me"]').forEach(button => {
    button.addEventListener('click', () => {
        console.log('Click en botón de WhatsApp');
        // Aquí puedes agregar código de analytics como Google Analytics
        // gtag('event', 'click', { 'event_category': 'whatsapp' });
    });
});

// Rastrear clics en Instagram
document.querySelectorAll('a[href*="instagram.com"]').forEach(button => {
    button.addEventListener('click', () => {
        console.log('Click en Instagram');
        // gtag('event', 'click', { 'event_category': 'instagram' });
    });
});

console.log('🥖 Panadería la Especial - Website cargado correctamente');
