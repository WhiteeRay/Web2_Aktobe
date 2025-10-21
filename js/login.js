//Task 1 DOM
document.addEventListener("DOMContentLoaded", () => {
  //Task 2 Current time
  const showTimeBtn = document.getElementById("showTimeBtn");
  const currentTimeDisplay = document.getElementById("currentTime");

  showTimeBtn.addEventListener("click", () => {
    const now = new Date().toLocaleTimeString();
    currentTimeDisplay.textContent = "Current Time: " + now;
  });

  const form = document.getElementById("loginForm");
  

  form.addEventListener("submit", (event) => {
    event.preventDefault();


    const email = document.getElementById("email").value.trim();
    const password = document.getElementById("password").value.trim();


    const emailError = document.getElementById("emailError");
    const passwordError = document.getElementById("passwordError");


    emailError.textContent = "";
    passwordError.textContent = "";

    let isValid = true;

 
    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (email === "") {
      emailError.textContent = "Email is required.";
      isValid = false;
    } else if (!emailPattern.test(email)) {
      emailError.textContent = "Invalid email format.";
      isValid = false;
    }

   
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
