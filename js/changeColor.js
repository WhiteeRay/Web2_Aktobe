const button = document.getElementById('colorButton');

const colors = ['#FF5733', '#33FFBD', '#3380FF', '#E833FF', '#FFDB33', '#33FF57'];

button.addEventListener('click', () => {
  const randomColor = colors[Math.floor(Math.random() * colors.length)];
  document.body.style.backgroundColor = randomColor;
});
