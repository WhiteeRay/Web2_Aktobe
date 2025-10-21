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
//Task 2 === Arrays and Loops ===
const workouts = ["Cardio", "Strength Training", "Yoga", "CrossFit", "Zumba", "Personal Coaching"];
const workoutList = document.getElementById("workoutList");

for (let workout of workouts) {
  const li = document.createElement("li");
  li.textContent = ` ${workout}`;
  workoutList.appendChild(li);
}
