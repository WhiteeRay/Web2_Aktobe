document.addEventListener("DOMContentLoaded", () => {
  const body = document.body;
  const toggleBtn = document.getElementById("themeToggle");

  themeToggle.addEventListener("click", () => {
  themeToggle.classList.toggle("active");
});

  const savedTheme = localStorage.getItem("mainTheme") || "light";
  body.classList.add(savedTheme === "dark" ? "dark-theme" : "light-theme");

  
  if (toggleBtn) {
    toggleBtn.textContent = savedTheme === "dark"
      ? "Light Mode"
      : "Dark Mode";
  }


  if (toggleBtn) {
    toggleBtn.addEventListener("click", () => {
      const isDark = body.classList.toggle("dark-theme");
      body.classList.toggle("light-theme", !isDark);
    
      toggleBtn.textContent = isDark ? "Light Mode" : "Dark Mode";
      localStorage.setItem("mainTheme", isDark ? "dark" : "light");
    });
  }
});
