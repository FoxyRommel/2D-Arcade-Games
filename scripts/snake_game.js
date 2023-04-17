const canvas = document.getElementById("game");
const ctx = canvas.getContext("2d");

const ground = new Image();
ground.src="images/ground.png";

const foodImg = new Image();
foodImg.src="images/food.png";

let box = 32;
let score = 0;

let food = {
    x: Math.floor(Math.random() * 17 + 1) * box,
    y: Math.floor(Math.random() * 15 + 3) * box
}

let snake = [];
snake[0] = {
    x: 9 * box,
    y: 10 * box
}

document.addEventListener("keydown", direction);

function soundPellet(url) {
    let audio = new Audio(); // Создаём новый элемент Audio
    audio.src = url; // Указываем путь к звуку "клика"
    audio.autoplay = true; // Автоматически запускаем
  }

let dir;

//функция на проверку направления, что бы змейка не свернула на 180 градусов назад и присвоением значения в переменную dir
function direction(e){
    if(e.keyCode == 37 && dir != "right")
        dir = "left";
    else if(e.keyCode == 38 && dir != "down")
        dir = "up";    
    else if(e.keyCode == 39 && dir != "left")
        dir = "right";
    else if(e.keyCode == 40 && dir != "up")
        dir = "down";
}

//функция определяющия что змейка столкнулась со своим хвостом
function eatTail(head, arr){
    for(let i= 0; i < arr.length; i++){             //итерация для каждого элемента хвоста сверяем с положением головы змейки
       if(head.x == arr[i].x && head.y == arr[i].y)
       clearInterval(game);
    }
}

function drawGame() {
    ctx.drawImage(ground, 0, 0);                    //Отрисовки игрового поля
    ctx.drawImage(foodImg, food.x, food.y);         //Отрисовска бонусного блока
    for(let i = 0; i < snake.length; i++){          //цикл отрисовки змейки с 0 элементом массива зеленым, остальные желтые
        if(i == 0)
        ctx.fillStyle = "green";
        else
        ctx.fillStyle = "yellow";
        ctx.fillRect(snake[i].x, snake[i].y, box, box);
    }

    ctx.fillStyle = "white";                        //Вывод счета
    ctx.font = "50px Arial";
    ctx.fillText(score, box * 2.5, box * 1.7);

    let snakeX = snake[0].x;                                
    let snakeY = snake[0].y;

    if(snakeX == food.x && snakeY == food.y){       //проверка на соприкосновение головы змейки с бонусным блоком
        score++;
        soundPellet('./sounds/sfx-5.mp3');
        food = {
            x: Math.floor(Math.random() * 17 + 1) * box,        //генерация нового блока бонуса
            y: Math.floor(Math.random() * 15 + 3) * box
        };
    } else {
        snake.pop();                                            //Добавление в конец массива элемента змейки
    }

    if(snakeX < box || snakeX > box * 17                        //проверка на соприкосновения с границами
         || snakeY < 3 * box || snakeY > box * 17)
        clearInterval(game);

    if(dir == "left") snakeX -= box;
    if(dir == "right") snakeX += box;
    if(dir == "up") snakeY -= box;
    if(dir == "down") snakeY += box;

    let newHead = {
        x: snakeX,
        y: snakeY
    }

    eatTail(newHead, snake);
    snake.unshift(newHead);
}

let game = setInterval(drawGame, 100);