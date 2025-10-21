//Manipulating Attributes thumbnail
document.addEventListener("DOMContentLoaded", () => {
    const displayImage = document.getElementById("displayImage");
    const thumbnails = document.querySelectorAll(".gallery-item img");

    thumbnails.forEach(thumb => {
      thumb.addEventListener("click", () => {
    
        displayImage.src = thumb.src;
        displayImage.alt = thumb.alt;


        displayImage.style.opacity = 0.6;
        setTimeout(() => (displayImage.style.opacity = 1), 150);
      });
    });
});