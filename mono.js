const canvas = document.querySelector("canvas");
 canvas.width = 350;
 canvas.height = 350;
 const c = canvas.getContext("2d");
 
 
    let count = 0;
    const myBox = {
         x: 30,
         y: 30,
         width: 20,
         height: 20,
         color: "rgb(15, 32, 60)",
         dx: 0,
         dy: 0,
         speed: 2 };

         let mySnake = [{ x: 100, y: 100, width: 20, height: 20, color: "rgb(15, 32, 60)", dx: 2, dy: 2, }];

     mySnake.push({ x: myBox.x, y: myBox.y, width: myBox.width, height: myBox.height, color: myBox.color, });

     const myCircle = {
         x: 150,
         y: 150,
         radius: 8,
         color: "red", };

      function drawCircle(){
         c.beginPath();
         c.arc( myCircle.x, myCircle.y, myCircle.radius, 0, 2 * Math.PI, false );
         c.fillStyle = myCircle.color;
         c.fill();
         }

      function drawBox() {
         c.clearRect(0, 0, canvas.width, canvas.height);
         for (let i = 0; i < mySnake.length; i++) {
             c.fillStyle = mySnake[i].color;
             c.fillRect(mySnake[i].x, mySnake[i].y, mySnake[i].width, mySnake[i].height);
             }
        c.fillStyle = myBox.color;
        c.fillRect(myBox.x, myBox.y, myBox.width, myBox.height);
             }

      function animateBox() {
         myBox.x += myBox.dx;
         myBox.y += myBox.dy;
         if (mySnake[0].x < 0 || mySnake[0].x + mySnake[0].width > canvas.width) { // Змея выходит за пределы холста по горизонтали // Остановка анимации
            if (confirm(`Ваш счёт = ${count} \n Хотите начать заново?`)) {
                location.reload();
            };
            return
         }
         if (mySnake[0].y < 0 || mySnake[0].y + mySnake[0].height > canvas.height) { // Змея выходит за пределы холста по вертикали // Остановка анимации
            if (confirm(`Ваш счёт = ${count} \n Хотите начать заново?`)) {
                location.reload();
            };
            return
         }
        for (let i = 0; i < mySnake.length; i++) { for (let j = i + 1; j < mySnake.length; j++) { if (isColliding(mySnake[i], mySnake[j])) { // Остановить змейку
            if (confirm(`Ваш счёт = ${count} \n Хотите начать заново?`)) {
                location.reload();
            };
            return
         } } }
         c.clearRect(mySnake[0].x, mySnake[0].y, mySnake[0].width, mySnake[0].height);
         mySnake.unshift({
            x: myBox.x,
            y: myBox.y,
            width: myBox.width,
            height: myBox.height,
            color: myBox.color,
             });
            mySnake.pop();
         drawBox();
         drawCircle();

         if (isColliding(mySnake[0], myCircle)) {
            c.clearRect(myCircle.x - myCircle.radius, myCircle.y - myCircle.radius, myCircle.radius * 2, myCircle.radius * 2);
            myBox.speed+=0.2;
            myCircle.x = Math.random() * canvas.width;
            myCircle.y = Math.random() * canvas.height;
            count++; 

            mySnake.unshift({ x: mySnake[1].x, y: mySnake[1].y, width: myBox.width, height: myBox.height, color: myBox.color, });
            }
            requestAnimationFrame(animateBox); }

    function isColliding(square, circle) {
        const dx = Math.abs(circle.x - square.x - square.width / 2);
        const dy = Math.abs(circle.y - square.y - square.height / 2);
            
        if (dx < square.width / 2 + circle.radius && dy < square.height / 2 + circle.radius) {
            return true;
            }
            return false;
            } 
    document.addEventListener("keydown", (event) => { if (event.code === "ArrowUp") {
        myBox.dy = -myBox.speed;
        myBox.dx = 0
     } else if (event.code === "ArrowDown") {
        myBox.dy = myBox.speed;
        myBox.dx = 0
     } else if (event.code === "ArrowLeft") {
        myBox.dy = 0;
        myBox.dx = -myBox.speed
     } else if (event.code === "ArrowRight") {
        myBox.dy = 0;
        myBox.dx = myBox.speed
    }
 });

            animateBox();