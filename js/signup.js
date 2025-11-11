// Elements
const signupForm = document.getElementById('signupForm');
const nameInput = document.getElementById('name');
const emailInput = document.getElementById('email');
const passwordInput = document.getElementById('password');
const phoneInput = document.getElementById('phone');

// Validation
function validateEmail(email) {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
}
function validatePassword(password) {
  return password.length >= 6;
}
function validatePhone(phone) {
  return /^\+?\d{10,15}$/.test(phone);
}

// Sign Up Event
signupForm.addEventListener('submit', (e) => {
  e.preventDefault();

  const name = nameInput.value.trim();
  const email = emailInput.value.trim();
  const password = passwordInput.value.trim();
  const phone = phoneInput.value.trim();

  if (!validateEmail(email)) { alert('Invalid email'); return; }
  if (!validatePassword(password)) { alert('Password must be at least 6 characters'); return; }
  if (!validatePhone(phone)) { alert('Invalid phone number'); return; }

  let users = JSON.parse(localStorage.getItem('users')) || [];
  if (users.find(u => u.email === email)) { alert('User already exists'); return; }

  users.push({ name, email, password, phone, rating: null });
  localStorage.setItem('users', JSON.stringify(users));

  alert('Sign Up successful! You can now log in.');
  signupForm.reset();
});
