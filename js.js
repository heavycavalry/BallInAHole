function start() {
    const canvas = document.getElementById("canvas");
    const context = canvas.getContext("2d");

    window.addEventListener('deviceorientation', onDeviceMove)


    let startTime = Date.now();
    let time;

    const circle = {
        x: 50,
        y: 50,
        size: 30,
        dx: 1, //increment 
        dy: 1
    };

    const hole = {
        x: getRandomInt(50, 550),
        y: getRandomInt(50, 550),
        size: 40,
        dx: 0,
        dy: 0
    };

    function getRandomInt(min, max) {
        min = Math.ceil(min);
        max = Math.floor(max);
        return Math.floor(Math.random() * (max - min)) + min;
    }

    function onDeviceMove(ev) {
        console.log(ev.alpha, ev.beta, ev.gamma);
        stupidMove(ev.gamma, ev.beta)
    }

    function countSpeed(y) {
        y = ((y % 360) + 360) % 360
        dy = 0.1
        if (y > 0 && y < 180) {
            dy = 2
        }
        if (y > 180 && y < 360) {
            dy = -2
        }
        return dy;
    }

    function stupidMove(x, y) {
        dx = countSpeed(x);
        dy = countSpeed(y);
        circle.dx = dx;
        circle.dy = dy;
    }

    function drawCircle() {
        context.beginPath();
        context.arc(circle.x, circle.y, circle.size, 0, Math.PI * 2);
        context.fillStyle = '#7cad37';
        context.fill();
    }

    function drawHole() {
        context.beginPath();
        context.arc(hole.x, hole.y, hole.size, 0, Math.PI * 2);
        context.fillStyle = '#00a2c2';
        context.fill();
    }

    let shouldRun = true

    function animate() {
        if (shouldRun) {
            context.clearRect(0, 0, canvas.width, canvas.height);

            circle.x += circle.dx;
            circle.y += circle.dy;

            if (circle.x + circle.size >= canvas.width) {
                circle.x = canvas.width - circle.size
            }
            if (circle.x - circle.size <= 0) {
                circle.x = circle.size
            }

            if (circle.y + circle.size >= canvas.height) {
                circle.y = canvas.height - circle.size
            }

            if (circle.y - circle.size <= 0) {
                circle.y = circle.size
            }

            function ballInAHole() {
                if ((hole.x - circle.x) ** 2 + (hole.y - circle.y) ** 2 <= 400) {
                    time = Math.round((Date.now() - startTime) / 1000);
                    shouldRun = false;
                    alert(`You win !!! Your time: ${time} seconds`);
                    start();
                }
            }

            drawHole();
            drawCircle();
            requestAnimationFrame(animate);
            ballInAHole()
        }

    }

    animate();
}
start();