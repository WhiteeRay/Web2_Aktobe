const gymMember = {
  name: "Ray",
  goal: "Improve cardio endurance",
  level: "Intermediate",
  greet() {
    return `Welcome back, ${this.name}! Let's hit your ${this.goal} goal today.`;
  }
};
console.log(gymMember.greet());