const btn = document.getElementById('toggleBtn');
const container = document.getElementById('myContainer');

btn.addEventListener('click', () => {
    container.classList.toggle('active');
});