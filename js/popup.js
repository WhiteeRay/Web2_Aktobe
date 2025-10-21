//Task 2 Responding to Events with Callbacks

document.addEventListener("keydown", (event) => {
  const navItems = document.querySelectorAll("nav a");
  let index = Array.from(navItems).indexOf(document.activeElement);

  if (event.key === "ArrowRight") {
    index = (index + 1) % navItems.length;
    navItems[index].focus();
  } else if (event.key === "ArrowLeft") {
    index = (index - 1 + navItems.length) % navItems.length;
    navItems[index].focus();
  }
});


const form = document.getElementById("contactForm");
const statusMessage = document.getElementById("statusMessage");

form.addEventListener("submit", async (e) => {
  e.preventDefault();

  const data = {
    name: form.name.value,
    email: form.email.value,
    message: form.message.value,
  };

  const handleResponse = (success) => {
    const now = new Date();
    const formattedDate = now.toLocaleString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
      hour: 'numeric',
      minute: '2-digit',
      second: '2-digit',
      hour12: true,
    });

    statusMessage.textContent = success
      ? `Message sent successfully on ${formattedDate}!`
      : "Failed to send message.";
    statusMessage.style.color = success ? "green" : "red";
  };

  try {
    const response = await fetch("https://example.com/api/contact", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(data),
    });

    handleResponse(response.ok);
    form.reset();
  } catch (error) {
    handleResponse(false);
  }
});

