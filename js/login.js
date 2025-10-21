// Task 1 — DOM
document.addEventListener("DOMContentLoaded", () => {
  // Task 2 — Show Current Time
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

    //Task 3 Objects and method
    if (isValid) {
      
      const gymMember = {
        name: email.split("@")[0], 
        goal: "Improve cardio endurance",
        loginMessage() {
          return `${this.name} logged in successfully! Let's work on your ${this.goal}.`;
        },
      };

     
      const sound = new Audio("sound/ding.mp3");
      sound.play();

      
      const messageBox = document.createElement("div");
      messageBox.className =
        "alert alert-success mt-3 text-center fw-bold rounded-3";
      messageBox.textContent = "✅ " + gymMember.loginMessage();

      form.after(messageBox);
      form.reset();

      
      setTimeout(() => {
        messageBox.remove();
      }, 5000);
    }
  });
});

// Task 3 — Animation
const dumbbell = document.getElementById("dumbbell");
dumbbell.addEventListener("click", () => {
  dumbbell.classList.add("bounce");
  setTimeout(() => dumbbell.classList.remove("bounce"), 300);
});
