const popupOverlay = document.getElementById("popupOverlay");
const openPopupBtn = document.getElementById("openPopupBtn");
const closePopupBtn = document.getElementById("closePopupBtn");
const contactForm = document.getElementById("contactForm");
const dateTimeDisplay = document.getElementById("dateTimeDisplay");

// Open popup
openPopupBtn.addEventListener("click", () => {
  popupOverlay.style.display = "flex";
});

// Close popup (X button)
closePopupBtn.addEventListener("click", () => {
  popupOverlay.style.display = "none";
});

// Close when clicking outside
window.addEventListener("click", (event) => {
  if (event.target === popupOverlay) {
    popupOverlay.style.display = "none";
  }
});

// Show date and time when "Send Message" is clicked
contactForm.addEventListener("submit", (event) => {
  event.preventDefault(); // Prevent form from reloading the page

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

  // Show formatted date below the form
  dateTimeDisplay.textContent = `Message sent on: ${formattedDate}`;

  // Optionally clear form fields
  contactForm.reset();
});
