document.addEventListener('DOMContentLoaded', () => {
    const alphabet = 'ABCDEFGHJKLMNPQRSTUVWXYZ23456789';
    const captchaTextEl = document.getElementById('captchaText');
    const captchaInput = document.getElementById('captchaInput');
    const refreshBtn = document.getElementById('captchaRefresh');
    const form = document.getElementById('contactForm');

    if (!captchaTextEl || !captchaInput || !refreshBtn || !form) {
        return;
    }

    let currentCaptcha = '';

    const generateCaptcha = () => {
        currentCaptcha = Array.from({ length: 5 }, () => alphabet[Math.floor(Math.random() * alphabet.length)]).join(' ');
        captchaTextEl.textContent = currentCaptcha;
    };

    const normalized = (value) => value.replace(/\s+/g, '').toUpperCase();

    refreshBtn.addEventListener('click', () => {
        generateCaptcha();
        captchaInput.value = '';
        captchaInput.focus();
    });

    form.addEventListener('submit', (event) => {
        if (normalized(captchaInput.value) !== normalized(currentCaptcha)) {
            event.preventDefault();
            alert('Captcha does not match. Please try again.');
            generateCaptcha();
            captchaInput.value = '';
            captchaInput.focus();
        }
    });

    generateCaptcha();
});
