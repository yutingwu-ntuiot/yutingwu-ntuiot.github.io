const root = document.documentElement;
const toggle = document.querySelector('#theme');
function setTheme(dark) {
  root.dataset.theme = dark ? 'dark' : 'light';
  toggle.setAttribute('aria-pressed', String(dark));
  toggle.setAttribute('aria-label', dark ? 'Switch to light theme' : 'Switch to dark theme');
}
let saved;
try { saved = localStorage.getItem('theme'); } catch {}
setTheme(saved ? saved === 'dark' : window.matchMedia('(prefers-color-scheme: dark)').matches);
toggle.addEventListener('click', () => {
  setTheme(root.dataset.theme !== 'dark');
  try { localStorage.setItem('theme', root.dataset.theme); } catch {}
});
document.querySelector('#year').textContent = new Date().getFullYear();
const links = [...document.querySelectorAll('nav a')];
function updateNavigation() {
  const hash = location.hash || '#about';
  links.forEach(link => {
    const active = link.getAttribute('href') === hash;
    link.classList.toggle('active', active);
    if (active) link.setAttribute('aria-current', 'location');
    else link.removeAttribute('aria-current');
  });
}
window.addEventListener('hashchange', updateNavigation);
updateNavigation();
