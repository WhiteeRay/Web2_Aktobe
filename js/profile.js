document.addEventListener('DOMContentLoaded', () => {
  const profileName = document.getElementById('profileName');
  const profileEmail = document.getElementById('profileEmail');
  const logoutBtn = document.getElementById('logoutBtn');

  const ratingInput = document.getElementById('ratingInput');
  const saveRatingBtn = document.getElementById('saveRatingBtn');
  const ratingMessage = document.getElementById('ratingMessage');

  const searchInput = document.getElementById('searchInput');
  const searchBtn = document.getElementById('searchBtn');
  const searchResults = document.getElementById('searchResults');

  // Logged-in user
  const user = JSON.parse(localStorage.getItem('currentUser'));
  if (!user) {
    alert('You are not logged in!');
    window.location.href = 'login.html';
    return;
  }

  profileName.textContent = user.name;
  profileEmail.textContent = user.email;

  // Load rating if exists
  if (user.rating) ratingInput.value = user.rating;

  // Logout
  logoutBtn.addEventListener('click', () => {
    localStorage.removeItem('currentUser');
    window.location.href = 'login.html';
  });

  // Save rating
  saveRatingBtn.addEventListener('click', () => {
    const rating = parseInt(ratingInput.value);
    if (!rating || rating < 1 || rating > 5) {
      ratingMessage.textContent = 'Please enter a valid rating (1-5).';
      ratingMessage.classList.remove('text-success');
      ratingMessage.classList.add('text-danger');
      return;
    }
    user.rating = rating;
    localStorage.setItem('currentUser', JSON.stringify(user));
    ratingMessage.textContent = `Rating saved: ${rating}`;
    ratingMessage.classList.remove('text-danger');
    ratingMessage.classList.add('text-success');
  });

  // Fitness items mapping to pages
  const fitnessPages = {
    'Cardio Training': 'cardio.html',
    'Yoga': 'yoga.html',
    'Strength Training': 'strength.html',
    'Personal Training': 'personal.html'
  };

  // Search handler
  searchBtn.addEventListener('click', () => {
    const query = searchInput.value.trim().toLowerCase();
    const results = Object.keys(fitnessPages).filter(item =>
      item.toLowerCase().includes(query)
    );

    searchResults.innerHTML = '';
    if (results.length === 0) {
      const li = document.createElement('li');
      li.className = 'list-group-item text-muted';
      li.textContent = 'No results found';
      searchResults.appendChild(li);
      return;
    }

    results.forEach(item => {
      const li = document.createElement('li');
      li.className = 'list-group-item list-group-item-action';
      li.style.cursor = 'pointer';
      li.textContent = item;
      li.addEventListener('click', () => {
        window.location.href = fitnessPages[item];
      });
      searchResults.appendChild(li);
    });
  });
});
