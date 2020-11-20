const canvas = document.getElementById("canvas");
const context = canvas.getContext("2d");

window.addEventListener('deviceorientation', onDeviceMove)


const circle = {
    x: 200,
    y: 200,
    size: 30,
    dx: 1, //increment 
    dy: 1
};

function onDeviceMove(ev) {
    console.log(ev.alpha, ev.beta, ev.gamma);
    stupidMove(ev.gamma, ev.beta)
}

function xd(y) {
    y = ((y % 360) + 360) % 360
    dy = 0.1
    if (y > 0 && y < 180) {
        dy = 2
    }
    if (y > 180 && y < 360) {
        dy = -2
    }
    return dy
}

function stupidMove(x, y) {
    dx = xd(x)
    dy = xd(y)
    circle.dx = dx
    console.log(dx)
    circle.dy = dy
}

function drawCircle() {
    context.beginPath();
    context.arc(circle.x, circle.y, circle.size, 0, Math.PI * 2);
    context.fillStyle = 'purple';
    context.fill();
}

function animate() {

    context.clearRect(0, 0, canvas.width, canvas.height);


    //change position
    circle.x += circle.dx;
    circle.y += circle.dy;

    // detect side walls 
    if (circle.x + circle.size >= canvas.width) {
        circle.x = canvas.width - circle.size
    }
    if (circle.x - circle.size <= 0) {
        circle.x = circle.size
    }
    // if (circle.x + circle.size >= canvas.width || circle.x - circle.size <= 0) {
    // circle.dx *= -0.1;
    // circle.dx = 0;

    // }
    if (circle.y + circle.size >= canvas.height) {
        circle.y = canvas.height - circle.size
    }

    if (circle.y - circle.size <= 0) {
        circle.y = circle.size
    }
    // circle.dy *= -0.1;
    // circle.dy = 0;



    drawCircle();
    requestAnimationFrame(animate);
}

animate();