// Elements
const loginForm = document.getElementById('loginForm');
const emailInput = document.getElementById('email');
const passwordInput = document.getElementById('password');

// Log In Event
loginForm.addEventListener('submit', (e) => {
  e.preventDefault();

  const email = emailInput.value.trim();
  const password = passwordInput.value.trim();

  let users = JSON.parse(localStorage.getItem('users')) || [];
  const user = users.find(u => u.email === email && u.password === password);

  if (!user) {
    alert('Invalid email or password.');
    return;
  }

  // Save logged-in user to localStorage
  localStorage.setItem('currentUser', JSON.stringify(user));

  alert('Login successful!');
  window.location.href = 'profile.html'; // redirect to profile page
});
