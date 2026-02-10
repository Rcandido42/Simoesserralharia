document.addEventListener('DOMContentLoaded', () => {
    
    const observerOptions = {
        threshold: 0.15,
        rootMargin: "0px 0px -50px 0px"
    };

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('active');
            }
        });
    }, observerOptions);

    const revealElements = document.querySelectorAll('.reveal');
    revealElements.forEach(el => observer.observe(el));

    const statsSection = document.querySelector('#stats-section');
    let counted = false;

    const statsObserver = new IntersectionObserver((entries) => {
        const [entry] = entries;
        if (entry.isIntersecting && !counted) {
            const counters = document.querySelectorAll('.counter-value');
            
            counters.forEach(counter => {
                const target = +counter.getAttribute('data-target');
                const duration = 2000;
                const increment = target / (duration / 16);
                
                let current = 0;
                const updateCounter = () => {
                    current += increment;
                    if (current < target) {
                        counter.innerText = Math.ceil(current);
                        requestAnimationFrame(updateCounter);
                    } else {
                        counter.innerText = target;
                        if(counter.parentElement.innerText.includes('+')) counter.innerText += '+';
                        if(counter.parentElement.innerText.includes('%')) counter.innerText += '%';
                    }
                };
                updateCounter();
            });
            counted = true;
        }
    }, { threshold: 0.5 });

    if(statsSection) {
        statsObserver.observe(statsSection);
    }
});