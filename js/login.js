document.addEventListener("DOMContentLoaded", () => {
  const form = document.getElementById("loginForm");

  form.addEventListener("submit", (event) => {
    event.preventDefault();

    // Get values
    const email = document.getElementById("email").value.trim();
    const password = document.getElementById("password").value.trim();

    // Error elements
    const emailError = document.getElementById("emailError");
    const passwordError = document.getElementById("passwordError");

    // Reset errors
    emailError.textContent = "";
    passwordError.textContent = "";

    let isValid = true;

    // Validate email
    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (email === "") {
      emailError.textContent = "Email is required.";
      isValid = false;
    } else if (!emailPattern.test(email)) {
      emailError.textContent = "Invalid email format.";
      isValid = false;
    }

    // Validate password
    if (password === "") {
      passwordError.textContent = "Password is required.";
      isValid = false;
    } else if (password.length < 6) {
      passwordError.textContent = "Password must be at least 6 characters.";
      isValid = false;
    }

    if (isValid) {
      alert("Login successful!");
      form.reset();
    }
  });
});
