// Mobile menu toggle
const menuToggle = document.getElementById('menu-toggle');
const mobileMenu = document.getElementById('mobile-menu');
const mobileMenuClose = document.getElementById('mobile-menu-close');
const mobileMenuOverlay = document.getElementById('mobile-menu-overlay');

if (menuToggle) {
    menuToggle.addEventListener('click', () => {
        mobileMenu.classList.add('open');
        mobileMenuOverlay.classList.add('open');
    });
    mobileMenuClose.addEventListener('click', () => {
        mobileMenu.classList.remove('open');
        mobileMenuOverlay.classList.remove('open');
    });
    mobileMenuOverlay.addEventListener('click', () => {
        mobileMenu.classList.remove('open');
        mobileMenuOverlay.classList.remove('open');
    });
    window.addEventListener('resize', () => {
        if (window.innerWidth > 950) {
            mobileMenu.classList.remove('open');
            mobileMenuOverlay.classList.remove('open');
        }
    });
}

const activeGroups = new Set();

document.querySelectorAll('.hover-item').forEach(item => {

    const group = item.dataset.hover;

    const groupItems = document.querySelectorAll(
        `.hover-item[data-hover="${group}"]`
    );

    const focusTarget = [...groupItems].find(el => el.id);

    item.addEventListener('mouseenter', () => {

        const firstEnter = !activeGroups.has(group);

        if (firstEnter) {
            activeGroups.add(group);

            groupItems.forEach(el => {

                el.classList.add('active');

                const video = el.querySelector('video');
                if (video) video.play().catch(() => {});

            });

            // focus screen when hovering the non-id element
            if (focusTarget && item !== focusTarget) {
                focusTarget.scrollIntoView({
                    behavior: "smooth",
                    block: "center"
                });
            }
        }

    });

    item.addEventListener('mouseleave', () => {

        const stillInside = [...groupItems].some(el => el.matches(':hover'));

        if (!stillInside) {

            activeGroups.delete(group);

            groupItems.forEach(el => {

                el.classList.remove('active');

                const video = el.querySelector('video');
                if (video) {
                    video.pause();
                    video.currentTime = 0;
                }

            });

        }

    });

});