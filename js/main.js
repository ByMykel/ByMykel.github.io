const header = document.querySelector('.header');
const darkBlocks = [...document.querySelectorAll('.block.tone-dark')];

let ticking = false;

function updateHeader() {
    ticking = false;
    const line = header.offsetHeight / 2;
    const overDark = darkBlocks.some(block => {
        const r = block.getBoundingClientRect();
        return r.top <= line && r.bottom > line;
    });
    header.classList.toggle('tone-dark', overDark);
}

function onScroll() {
    if (!ticking) {
        ticking = true;
        requestAnimationFrame(updateHeader);
    }
}

if (header && darkBlocks.length) {
    window.addEventListener('scroll', onScroll, { passive: true });
    window.addEventListener('resize', onScroll);
    updateHeader();
}
