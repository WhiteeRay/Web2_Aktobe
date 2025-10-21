

//Task 1 Dynamic CSS
const content = document.querySelector('.content');
const toggleBtn = document.getElementById('themeToggle');

const savedTheme = localStorage.getItem('mainTheme');
if (savedTheme === 'dark') {
  content.classList.add('dark-theme');
  toggleBtn.textContent = 'Switch to Light Theme';
} else {
  content.classList.add('light-theme');
  toggleBtn.textContent = 'Switch to Dark Theme';
}

toggleBtn.addEventListener('click', () => {
  content.classList.toggle('dark-theme');
  content.classList.toggle('light-theme');

  const isDark = content.classList.contains('dark-theme');
  toggleBtn.textContent = isDark ? 'Switch to Light Theme' : 'Switch to Dark Theme';
  localStorage.setItem('mainTheme', isDark ? 'dark' : 'light');
});

//Task 2 Keyboard Event Handling
const navLinks = document.querySelectorAll("#navMenu .nav-link");
  let currentIndex = 0;

  navLinks[currentIndex].focus();

  document.addEventListener("keydown", (event) => {
    if (event.key === "ArrowRight") {
      currentIndex = (currentIndex + 1) % navLinks.length;
      navLinks[currentIndex].focus();
    } else if (event.key === "ArrowLeft") {
      currentIndex = (currentIndex - 1 + navLinks.length) % navLinks.length;
      navLinks[currentIndex].focus();
    }
});



function loadNews(category) {
  const newsContainer = document.getElementById('newsContainer');
  let content = '';

  switch (category) {
    case 'workouts':
      content = `
        <h4>Latest Workout Updates</h4>
        <ul class="list-unstyled mt-3">
          <li>• Our new <strong>HIIT Blast</strong> class starts this Monday — 6:00 AM sharp!</li>
          <li>• Trainer <strong>Alina</strong> just uploaded a new “Legs of Steel” workout video.</li>
          <li>• Don’t forget: <em>stretch before and after</em> every session — recovery matters!</li>
        </ul>`;
      break;

    case 'nutrition':
      content = `
        <h4>Nutrition Tips & News</h4>
        <ul class="list-unstyled mt-3">
          <li>• New protein smoothie flavors now available at our club café — try <strong>berry power</strong>!</li>
          <li>• Our nutritionist <strong>Dr. Aisha</strong> will host a Q&A on balanced meal prep this Friday.</li>
          <li>• Small habit, big result: drink at least <strong>2 liters of water</strong> daily .</li>
        </ul>`;
      break;

    case 'events':
      content = `
        <h4> Upcoming Events</h4>
        <ul class="list-unstyled mt-3">
          <li>• Join our <strong>Summer Fitness Challenge</strong> — registration closes in 3 days!</li>
          <li>• <strong>Charity Yoga Marathon</strong> happening this Sunday. All proceeds go to local shelters.</li>
          <li>• Members' Night: healthy snacks, music, and fun at 7 PM next Friday.</li>
        </ul>`;
      break;

    default:
      content = `<p>Please select a category to view news.</p>`;
  }

  // add fade-in effect
  newsContainer.style.opacity = 0;
  setTimeout(() => {
    newsContainer.innerHTML = content;
    newsContainer.style.transition = 'opacity 0.5s';
    newsContainer.style.opacity = 1;
  }, 150);
}


