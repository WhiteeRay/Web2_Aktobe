
document.addEventListener("DOMContentLoaded", function () {
  const questions = document.querySelectorAll(".question");

  questions.forEach((question) => {
    question.addEventListener("click", () => {
      const answer = question.nextElementSibling;

      answer.classList.toggle("open");

  
      if (answer.classList.contains("open")) {
        answer.style.maxHeight = answer.scrollHeight + "px";
      } else {
        answer.style.maxHeight = 0;
      }
    });
  });
});
