document.addEventListener("DOMContentLoaded", () => {
  const searchInput = document.getElementById("searchInput");
  const suggestions = document.getElementById("suggestions");
  const itemsList = document.getElementById("itemsList");
  const items = Array.from(itemsList.querySelectorAll("li"));

  searchInput.addEventListener("input", () => {
    const query = searchInput.value.toLowerCase().trim();
    suggestions.innerHTML = "";

    if (query === "") {
      suggestions.style.display = "none";
      return;
    }

    const matched = items.filter(item =>
      item.textContent.toLowerCase().includes(query)
    );

    if (matched.length > 0) {
      matched.forEach(item => {
        const div = document.createElement("div");
        div.textContent = item.textContent;
        div.className = "suggestion-item";
        div.onclick = () => {
          searchInput.value = item.textContent;
          suggestions.style.display = "none";
        };
        suggestions.appendChild(div);
      });
      suggestions.style.display = "block";
    } else {
      suggestions.style.display = "none";
    }
  });
}); //

const classes = ["Yoga Basics", "Advanced Cardio", "Strength Training", "Zumba Fun"];

document.getElementById("searchInput").addEventListener("input", function () {
  const query = this.value.toLowerCase();
  const results = classes.filter(c => c.toLowerCase().includes(query));

  localStorage.setItem("searchResults", JSON.stringify(results));

  const resultList = document.getElementById("searchResults");
  resultList.innerHTML = results.map(r => `<li class="list-group-item">${r}</li>`).join("");
});
