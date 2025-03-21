window.onload = function () {
  canvas = document.getElementById("canvas");
  ctx = canvas.getContext("2d");
  scoreDisplay = document.getElementById("score");

  // Variáveis
  snake = [];
  positionX = 10;
  positionY = 10;
  foodX = 15;
  foodY = 15;
  velX = 0;
  velY = 0;
  grid = 20;
  tam = 3;
  score = 0;

  // Chamada da função jogo a cada 100 milisegundos
  setInterval(jogo, 100);

  // Controles
  document.addEventListener("keydown", function (e) {
    switch (e.keyCode) {
      case 39:
        velX = 1;
        velY = 0;
        break;
      case 37:
        velX = -1;
        velY = 0;
        break;
      case 38:
        velY = -1;
        velX = 0;
        break;
      case 40:
        velY = 1;
        velX = 0;
        break;
    }
  });
};

function jogo() {
  // Configuração da tela
  ctx.fillStyle = "#2980B9";
  ctx.fillRect(0, 0, canvas.width, canvas.height);

  // Deslocamento da cobra
  positionX += velX;
  positionY += velY;

  // Espelhamento
  if (positionX < 0) positionX = grid;
  if (positionX > grid) positionX = 0;
  if (positionY < 0) positionY = grid;
  if (positionY > grid) positionY = 0;

  // Configuração da cobra
  ctx.fillStyle = "#00f102";
  for (let i = 0; i < snake.length; i++) {
    ctx.fillRect(snake[i].x * grid, snake[i].y * grid, grid - 1, grid - 1);
    if (snake[i].x == positionX && snake[i].y == positionY) {
      tam = 3;
      score = 0; // Resetando a pontuação ao colidir consigo mesma
      scoreDisplay.innerText = "Score: " + score;
    }
  }

  // Posicionando a cobra
  snake.push({ x: positionX, y: positionY });
  while (snake.length > tam) {
    snake.shift();
  }

  // Configurando a comida
  ctx.fillStyle = "#F1C40F";
  ctx.fillRect(foodX * grid, foodY * grid, grid - 1, grid - 1);

  // Exibindo a pontuação da comida dentro do quadrado
  ctx.fillStyle = "#000";
  ctx.font = "14px Arial";
  ctx.fillText("+10", foodX * grid + 4, foodY * grid + 14);

  // Comendo a comida
  if (positionX == foodX && positionY == foodY) {
    tam++;
    score += 10;
    foodX = Math.floor(Math.random() * grid);
    foodY = Math.floor(Math.random() * grid);
    scoreDisplay.innerText = "Score: " + score;
  }

  // Exibindo a pontuação da cobra na tela
  ctx.fillStyle = "#FFF";
  ctx.font = "16px Arial";
  ctx.fillText("Score: " + score, 10, 20);
}
