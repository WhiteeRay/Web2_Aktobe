
  // === Gym workout data ===
  const workouts = [
    "Push-ups",
    "Squats",
    "Bench Press",
    "Deadlift",
    "Pull-ups",
    "Plank"
  ];


  
  const longWorkouts = workouts.filter((w) => w.length > 6);

  // Display results on page
  const workoutList = document.createElement("ul");
  longWorkouts.forEach((workout) => {
    const li = document.createElement("li");
    li.textContent = workout;
    workoutList.appendChild(li);
  });

  document.body.appendChild(workoutList);

  
  console.log("Long workout names:", longWorkouts);
