// Select elements
const popupOverlay = document.getElementById("popupOverlay");
const openPopupBtn = document.getElementById("openPopupBtn");
const closePopupBtn = document.getElementById("closePopupBtn");

// Open popup
openPopupBtn.addEventListener("click", () => {
  popupOverlay.style.display = "flex";
});

// Close popup (via button)
closePopupBtn.addEventListener("click", () => {
  popupOverlay.style.display = "none";
});

// Close popup (click outside)
window.addEventListener("click", (event) => {
  if (event.target === popupOverlay) {
    popupOverlay.style.display = "none";
  }
});
