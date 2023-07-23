const c = document.getElementById('gameCanvas');
                const ctx = c.getContext('2d');
               
                //ctx.strokeRect(0, 0, c.clientWidth, c.clientHeight);
                let snake = [  
                    {x: 150, y: 150},  
                    {x: 140, y: 150},  
                    {x: 130, y: 150},  
                    {x: 120, y: 150},  
                    {x: 110, y: 150}
                ];
                let foodX;
                let foodY;
                let dx = 10;
                let dy = 0;
                let score = 0;
                let changingDirection = false;

                createFood();

                main();
            
                document.addEventListener("keydown", changeDirection);

                function drawSnakePart(snakePart){
                    ctx.fillStyle = 'lightgreen';
                    ctx.strokeStyle = 'darkgreen';
                    ctx.fillRect(snakePart.x, snakePart.y, 10, 10);
                    ctx.strokeRect(snakePart.x, snakePart.y, 10, 10);
                };
                function drawSnake(){
                    snake.forEach(drawSnakePart);
                };
                
                function changeDirection(event){
                    const keyPressed = event.key;
                    
                    const LEFT_KEY = 'ArrowLeft';
                    const RIGHT_KEY = 'ArrowRight';
                    const UP_KEY = 'ArrowUp';
                    const DOWN_KEY = 'ArrowDown';

                    if (changingDirection) return;
                    chagingFirection = true;
                    
                    const goingUp = dy === -10;
                    const goingDown = dy === 10;
                    const goingRight = dx === 10;
                    const goingLeft = dx === -10;

                    if (keyPressed === LEFT_KEY && !goingRight){
                        dx = -10;
                        dy = 0;
                        //console.log(dx, dy);
                    };
                    if (keyPressed === RIGHT_KEY && !goingLeft){
                        dx = 10;
                        dy = 0;
                        //console.log(dx, dy);
                    };
                    if (keyPressed === UP_KEY && !goingDown){
                        dx = 0;
                        dy = -10;
                        //console.log(dx, dy);
                    };
                    if (keyPressed === DOWN_KEY && !goingUp){
                        dx = 0;
                        dy = 10;
                        //console.log(dx, dy);
                    };
                };
                //dx, dy
                function advanceSnake(){
                    const head = {
                        x: snake[0].x + dx,
                        y: snake[0].y + dy
                        };
                    snake.unshift(head);
                    const didEatFood = snake[0].x === foodX && snake[0].y === foodY;
                    if (didEatFood){
                        score += 10;
                        document.getElementById("score").innerHTML=score;
                        createFood();
                    } else {
                        snake.pop();
                    }
                };
                function clearCanvas(){
                    ctx.fillStyle = "white";
                    ctx.strokeStyle = "black";
                    ctx.fillRect(0, 0, c.width, c.height);
                    ctx.strokeRect(0, 0, c.width, c.height);
                };
                function randomTen(min, max){
                    return Math.round((Math.random() * (max - min)+ min) / 10)*10;
                };
                function createFood(){
                    foodX = randomTen(0, c.width - 10);
                    foodY = randomTen(0, c.height - 10);
                    snake.forEach(function isFoodOnSnake(part){
                        const foodIsOnSnake = part.x == foodX && part.y == foodY;
                        if (foodIsOnSnake) {
                            createFood();
                        }
                    });
                };
                function drawFood(){
                    ctx.fillStyle = 'red';
                    ctx.strokeStyle = 'darkred';
                    ctx.fillRect(foodX, foodY, 10, 10);
                    ctx.strokeRect(foodX, foodY, 10, 10);

                }
                function didGameEnd(){
                    for (let i = 4; i < snake.length; i++){
                        const didCollide = snake[i].x === snake[0].x && snake[i].y === snake[0].y;
                        if (didCollide) return true;
                    };
                    const hitLeftWall = snake[0].x < 0;
                    const hitRightWall = snake[0].x > c.width -10;
                    const hitTopWall = snake[0].y < 0;
                    const hitBottomWall = snake[0] > c.height -10;

                    return hitLeftWall || hitRightWall || hitTopWall || hitBottomWall;
                };
                function main(){
                    if (didGameEnd()) return;
                    setTimeout( function onTick(){
                        clearCanvas();
                        drawFood();
                        advanceSnake();
                        drawSnake();
                        main();
                        changingDirection = false;
                    }, 100);
                };