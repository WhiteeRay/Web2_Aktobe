
const popupOverlay = document.getElementById("popupOverlay");
const openPopupBtn = document.getElementById("openPopupBtn");
const closePopupBtn = document.getElementById("closePopupBtn");


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
