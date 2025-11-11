const signupForm = document.getElementById('signupForm');
const loginForm = document.getElementById('loginForm');
const profileDiv = document.getElementById('profile');
const profileName = document.getElementById('profileName');
const profileEmail = document.getElementById('profileEmail');
const logoutBtn = document.getElementById('logoutBtn');
const ratingInput = document.getElementById('ratingInput');
const saveRatingBtn = document.getElementById('saveRatingBtn');
const ratingMessage = document.getElementById('ratingMessage');
const searchInput = document.getElementById('searchInput');
const searchBtn = document.getElementById('searchBtn');
const searchResults = document.getElementById('searchResults');

// Validation functions
function validateEmail(email) {
  const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return re.test(email);
}

function validatePassword(password) {
  return password.length >= 6;
}

function validatePhone(phone) {
  const re = /^\d{10,15}$/;
  return re.test(phone);
}

// Sign Up
signupForm.addEventListener('submit', (e) => {
  e.preventDefault();
  
  const name = document.getElementById('signupName').value.trim();
  const email = document.getElementById('signupEmail').value.trim();
  const password = document.getElementById('signupPassword').value.trim();
  const phone = document.getElementById('signupPhone').value.trim();

  if (!validateEmail(email)) { alert('Invalid email'); return; }
  if (!validatePassword(password)) { alert('Password must be at least 6 characters'); return; }
  if (!validatePhone(phone)) { alert('Invalid phone number'); return; }

  let users = JSON.parse(localStorage.getItem('users')) || [];
  if (users.find(u => u.email === email)) { alert('User already exists'); return; }

  users.push({ name, email, password, phone, rating: null });
  localStorage.setItem('users', JSON.stringify(users));
  alert('Sign Up successful!');
  signupForm.reset();
});

// Log In
loginForm.addEventListener('submit', (e) => {
  e.preventDefault();

  const email = document.getElementById('loginEmail').value.trim();
  const password = document.getElementById('loginPassword').value.trim();

  let users = JSON.parse(localStorage.getItem('users')) || [];
  const user = users.find(u => u.email === email && u.password === password);

  if (!user) { alert('Invalid credentials'); return; }

  localStorage.setItem('currentUser', JSON.stringify(user));
  showProfile(user);
});

// Show Profile
function showProfile(user) {
  profileDiv.classList.remove('hidden');
  profileName.textContent = `Name: ${user.name}`;
  profileEmail.textContent = `Email: ${user.email}`;
}

// Logout
logoutBtn.addEventListener('click', () => {
  localStorage.removeItem('currentUser');
  profileDiv.classList.add('hidden');
});

// Save Rating
saveRatingBtn.addEventListener('click', () => {
  const rating = parseInt(ratingInput.value);
  if (!rating || rating < 1 || rating > 5) { 
    ratingMessage.textContent = 'Enter a valid rating 1-5';
    return;
  }
  let user = JSON.parse(localStorage.getItem('currentUser'));
  user.rating = rating;

  let users = JSON.parse(localStorage.getItem('users'));
  users = users.map(u => u.email === user.email ? user : u);
  localStorage.setItem('users', JSON.stringify(users));
  localStorage.setItem('currentUser', JSON.stringify(user));
  ratingMessage.textContent = `Rating saved: ${rating}`;
});

// Search / Filtration
const sampleItems = ['Kuyrdak', 'Beshbarmak', 'Plov', 'Manty', 'Lagman'];
searchBtn.addEventListener('click', () => {
  const query = searchInput.value.trim().toLowerCase();
  const results = sampleItems.filter(item => item.toLowerCase().includes(query));
  localStorage.setItem('searchResults', JSON.stringify(results));

  searchResults.innerHTML = '';
  results.forEach(item => {
    const li = document.createElement('li');
    li.textContent = item;
    searchResults.appendChild(li);
  });
});

// Auto-login
const currentUser = JSON.parse(localStorage.getItem('currentUser'));
if (currentUser) showProfile(currentUser);
