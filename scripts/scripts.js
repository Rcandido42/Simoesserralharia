document.addEventListener('DOMContentLoaded', () => {
    
    const header = document.getElementById('main-header');
    const logoText = document.getElementById('logo-text');
    const navMenu = document.getElementById('nav-menu');
    const mobileBtn = document.getElementById('mobile-btn');
    const mobileMenu = document.getElementById('mobile-menu');
    const mobileLinks = document.querySelectorAll('#mobile-menu a');
    const reveals = document.querySelectorAll('.reveal');
    const carouselImages = document.querySelectorAll('.hover-carousel');

    carouselImages.forEach(img => {
        let interval;
        const originalSrc = img.src;
        const images = img.dataset.images ? JSON.parse(img.dataset.images) : [originalSrc];
        let currentIndex = 0;

        img.closest('.group').addEventListener('mouseenter', () => {
            interval = setInterval(() => {
                currentIndex = (currentIndex + 1) % images.length;
                img.style.opacity = 0;
                
                setTimeout(() => {
                    img.src = images[currentIndex];
                    img.style.opacity = 1;
                }, 200);
                
            }, 1500); 
        });

        img.closest('.group').addEventListener('mouseleave', () => {
            clearInterval(interval);
            img.style.opacity = 0;
            setTimeout(() => {
                img.src = originalSrc;
                img.style.opacity = 1;
                currentIndex = 0;
            }, 200);
        });
    });

    if (mobileBtn && mobileMenu) {
        mobileBtn.addEventListener('click', () => {
            mobileMenu.classList.toggle('hidden');
            
            if (!mobileMenu.classList.contains('hidden')) {
                header.classList.remove('bg-transparent', 'py-6');
                header.classList.add('bg-white/95', 'backdrop-blur-sm', 'shadow-md', 'py-3');
                if(mobileBtn) {
                     mobileBtn.classList.remove('text-white');
                     mobileBtn.classList.add('text-gray-800');
                }
            } else {
                if (window.scrollY <= 50) {
                     updateHeaderOnScroll();
                }
            }
        });
    }

    mobileLinks.forEach(link => {
        link.addEventListener('click', () => {
            if (mobileMenu) {
                mobileMenu.classList.add('hidden');
            }
        });
    });

    function updateHeaderOnScroll() {
        if (!header) return;

        if (mobileMenu && !mobileMenu.classList.contains('hidden')) return;

        if (window.scrollY > 50) {
            header.classList.remove('bg-transparent', 'py-6');
            header.classList.add('bg-white/95', 'backdrop-blur-sm', 'shadow-md', 'py-3');
            
            if(logoText) {
                logoText.classList.remove('text-white');
                logoText.classList.add('text-gray-800');
            }
            if(navMenu) {
                navMenu.classList.remove('text-white');
                navMenu.classList.add('text-gray-600');
            }
            if(mobileBtn) {
                mobileBtn.classList.remove('text-white');
                mobileBtn.classList.add('text-gray-800');
            }

        } else {
            header.classList.add('bg-transparent', 'py-6');
            header.classList.remove('bg-white/95', 'backdrop-blur-sm', 'shadow-md', 'py-3');
            
            if(logoText) {
                logoText.classList.add('text-white');
                logoText.classList.remove('text-gray-800');
            }
            if(navMenu) {
                navMenu.classList.add('text-white');
                navMenu.classList.remove('text-gray-600');
            }
            if(mobileBtn) {
                mobileBtn.classList.add('text-white');
                mobileBtn.classList.remove('text-gray-800');
            }
        }
    }

    function checkReveal() {
        const windowHeight = window.innerHeight;
        const elementVisible = 150;

        reveals.forEach((reveal) => {
            const elementTop = reveal.getBoundingClientRect().top;
            if (elementTop < windowHeight - elementVisible) {
                reveal.classList.add('active');
            }
        });
    }

    window.addEventListener('scroll', updateHeaderOnScroll);
    window.addEventListener('scroll', checkReveal);
    
    updateHeaderOnScroll();
    checkReveal();
});