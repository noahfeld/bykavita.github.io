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