document.querySelectorAll('.hover-item').forEach(item => {
    const group = item.dataset.hover;

    const groupItems = document.querySelectorAll(
        `.hover-item[data-hover="${group}"]`
    );

    item.addEventListener('mouseenter', () => {
        groupItems.forEach(el => el.classList.add('active'));
    });

    item.addEventListener('mouseleave', () => {
        groupItems.forEach(el => el.classList.remove('active'));
    });
});
