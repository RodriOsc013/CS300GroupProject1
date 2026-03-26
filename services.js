document.addEventListener('DOMContentLoaded', () => {
    const wheel = document.getElementById('serviceWheel');
    const prevBtn = document.getElementById('wheelPrev');
    const nextBtn = document.getElementById('wheelNext');

    if (!wheel || !prevBtn || !nextBtn) {
        return;
    }

    const cards = Array.from(wheel.querySelectorAll('.wheel-card'));
    let activeIndex = 0;

    const getPrevIndex = () => (activeIndex - 1 + cards.length) % cards.length;
    const getNextIndex = () => (activeIndex + 1) % cards.length;
    const rotationDelay = 6500;
    let autoRotateId;

    const renderWheel = () => {
        cards.forEach((card, index) => {
            card.classList.remove('is-active', 'is-left', 'is-right', 'is-hidden');

            if (index === activeIndex) {
                card.classList.add('is-active');
            } else if (index === getPrevIndex()) {
                card.classList.add('is-left');
            } else if (index === getNextIndex()) {
                card.classList.add('is-right');
            } else {
                card.classList.add('is-hidden');
            }
        });
    };

    const goPrev = () => {
        activeIndex = getPrevIndex();
        renderWheel();
    };

    const goNext = () => {
        activeIndex = getNextIndex();
        renderWheel();
    };

    prevBtn.addEventListener('click', () => {
        goPrev();
        startAutoRotate();
    });

    nextBtn.addEventListener('click', () => {
        goNext();
        startAutoRotate();
    });

    const stopAutoRotate = () => {
        if (autoRotateId) {
            clearInterval(autoRotateId);
            autoRotateId = undefined;
        }
    };

    const startAutoRotate = () => {
        stopAutoRotate();
        autoRotateId = setInterval(goNext, rotationDelay);
    };

    [wheel, prevBtn, nextBtn].forEach((el) => {
        el.addEventListener('mouseenter', stopAutoRotate);
        el.addEventListener('mouseleave', startAutoRotate);
        el.addEventListener('touchstart', stopAutoRotate, { passive: true });
        el.addEventListener('touchend', startAutoRotate);
    });

    // Support swipe gestures on touch devices
    let startX = 0;
    let isDragging = false;

    wheel.addEventListener('touchstart', (event) => {
        startX = event.touches[0].clientX;
        isDragging = true;
    });

    wheel.addEventListener('touchmove', (event) => {
        if (!isDragging) return;
        const currentX = event.touches[0].clientX;
        const diff = currentX - startX;
        if (Math.abs(diff) > 40) {
            if (diff > 0) {
                goPrev();
            } else {
                goNext();
            }
            isDragging = false;
        }
    });

    wheel.addEventListener('touchend', () => {
        isDragging = false;
    });

    renderWheel();
    startAutoRotate();
});
