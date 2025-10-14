// Task 3
const popupOverlay = document.getElementById("popupOverlay");
const openPopupBtn = document.getElementById("openPopupBtn");
const closePopupBtn = document.getElementById("closePopupBtn");
const contactForm = document.getElementById("contactForm");
const dateTimeDisplay = document.getElementById("dateTimeDisplay");


openPopupBtn.addEventListener("click", () => {
  popupOverlay.style.display = "flex";
});


closePopupBtn.addEventListener("click", () => {
  popupOverlay.style.display = "none";
});


window.addEventListener("click", (event) => {
  if (event.target === popupOverlay) {
    popupOverlay.style.display = "none";
  }
});


contactForm.addEventListener("submit", (event) => {
  event.preventDefault(); 
//Task 5
  const now = new Date();
  const options = {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
    hour: 'numeric',
    minute: '2-digit',
    second: '2-digit',
    hour12: true
  };

  const formattedDate = now.toLocaleString('en-US', options);

  dateTimeDisplay.textContent = `Message sent on: ${formattedDate}`;

  contactForm.reset();
});
