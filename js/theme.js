//Task 4
const content = document.querySelector('.content');
const toggleBtn = document.getElementById('themeToggle');


const savedTheme = localStorage.getItem('mainTheme');
if (savedTheme === 'dark') {
  content.classList.add('dark-theme');
} else {
  content.classList.add('light-theme');
}


toggleBtn.addEventListener('click', () => {
  content.classList.toggle('dark-theme');
  content.classList.toggle('light-theme');

  const isDark = content.classList.contains('dark-theme');
  toggleBtn.textContent = isDark ? 'Switch to Light Theme' : 'Switch to Dark Theme';
  localStorage.setItem('mainTheme', isDark ? 'dark' : 'light');
});
