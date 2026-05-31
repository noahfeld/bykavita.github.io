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

const isMobile = window.innerWidth <= 950;

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
                    // On mobile, keep autoplaying videos (except 2TTM) running
                    if (isMobile && group !== 'group7') return;
                    video.pause();
                    video.currentTime = 0;
                }

            });

        }

    });

});

// MASONRY GRID (index page only)
// Uses ResizeObserver so spans update automatically on image load and resize.
// align-items:start on the grid means getBoundingClientRect().height always
// returns actual content height (not grid-area height), so no reset needed.
(function () {
    var grid = document.querySelector('.section-flex-container');
    if (!grid) return;

    var GAP = 70; // visual gap between cards (px)
    var ro  = null;

    function setSpan(item) {
        var h = item.getBoundingClientRect().height;
        if (!h) return;
        item.style.gridRowEnd = 'span ' + Math.ceil(h + GAP);
    }

    function clearSpans() {
        grid.querySelectorAll('.section-flex-item').forEach(function (i) {
            i.style.gridRowEnd = '';
        });
    }

    function startObserver() {
        if (ro || !window.ResizeObserver) return;
        ro = new ResizeObserver(function (entries) {
            if (window.innerWidth <= 950) return;
            entries.forEach(function (e) { setSpan(e.target); });
        });
        grid.querySelectorAll('.section-flex-item').forEach(function (item) {
            ro.observe(item);
        });
    }

    if (window.innerWidth > 950) startObserver();

    window.addEventListener('resize', function () {
        if (window.innerWidth <= 950) {
            clearSpans();
        } else {
            startObserver(); // no-op if already started
        }
    });
})();

// SLIGHT PER-CARD OFFSET (index page only)
// Nudges each card a few px in x/y so the masonry grid feels less rigid.
// Applied as a translate (visual only) so grid row spans stay accurate.
(function () {
    var items = document.querySelectorAll('.section-flex-container .section-flex-item');
    if (!items.length) return;

    function rand(max) { return (Math.random() * 2 - 1) * max; }

    // Stable offset per card, generated once.
    var offsets = [];
    items.forEach(function () {
        offsets.push({ x: rand(22).toFixed(1) + 'px', y: rand(30).toFixed(1) + 'px' });
    });

    function applyOffsets() {
        var on = window.innerWidth > 950;
        items.forEach(function (item, i) {
            if (on) {
                item.style.setProperty('--rx', offsets[i].x);
                item.style.setProperty('--ry', offsets[i].y);
            } else {
                item.style.removeProperty('--rx');
                item.style.removeProperty('--ry');
            }
        });
    }

    applyOffsets();
    window.addEventListener('resize', applyOffsets);
})();