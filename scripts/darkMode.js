const toggle = document.getElementById('toggle');
const html = document.querySelector('html');
const isDarkMode = localStorage.getItem('isDarkMode');

if (isDarkMode === 'true') {
  html.classList.add('dark');
}

toggle.addEventListener('click', (e) => {
  if (html.classList.contains('dark')) {
    html.classList.remove('dark');
    localStorage.setItem('isDarkMode', 'false');
  } else {
    html.classList.add('dark');
    localStorage.setItem('isDarkMode', 'true');
  }
});
