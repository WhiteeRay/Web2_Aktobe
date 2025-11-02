document.addEventListener('DOMContentLoaded', () => {
  const form = document.getElementById('contactForm');
  const nameInput = document.getElementById('name');
  const emailInput = document.getElementById('email');
  const messageInput = document.getElementById('message');
  const statusMessage = document.getElementById('statusMessage');
  const copyEmailBtn = document.getElementById('copyEmailBtn');

  
  copyEmailBtn.addEventListener('click', () => {
    navigator.clipboard.writeText(emailInput.value)
      .then(() => {
        statusMessage.textContent = '📋 Email copied to clipboard!';
        statusMessage.style.color = 'green';
      })
      .catch(() => {
        statusMessage.textContent = '❌ Unable to copy email.';
        statusMessage.style.color = 'red';
      });
  });

  
  form.addEventListener('submit', (event) => {
    event.preventDefault();

    const name = nameInput.value.trim();
    const email = emailInput.value.trim();
    const message = messageInput.value.trim();

    if (!name || !email || !message) {
      statusMessage.textContent = '⚠️ Please fill in all fields.';
      statusMessage.style.color = 'red';
      return;
    }

    
    statusMessage.textContent = '📨 Sending...';
    statusMessage.style.color = 'gray';

    setTimeout(() => {
      statusMessage.textContent = '✅ Message sent successfully!';
      statusMessage.style.color = 'green';
      form.reset();
    }, 800);
  });
});
