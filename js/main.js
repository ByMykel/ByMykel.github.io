// Theme toggle
const toggle = document.querySelector('.theme-toggle');
const saved = localStorage.getItem('theme');

if (saved) document.documentElement.setAttribute('data-theme', saved);

toggle?.addEventListener('click', () => {
    const current = document.documentElement.getAttribute('data-theme');
    const next = current === 'light' ? null : 'light';

    if (next) {
        document.documentElement.setAttribute('data-theme', next);
        localStorage.setItem('theme', next);
    } else {
        document.documentElement.removeAttribute('data-theme');
        localStorage.removeItem('theme');
    }
});
