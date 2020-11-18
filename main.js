window.addEventListener('deviceorientation', onDeviceMove)
const ball = {
    x: 0,
    y: 0,
}

function onDeviceMove(ev) {
    console.log(ev.alpha, ev.beta, ev.gamma);
}
// zczytywanie położenia kulki 
function gameInit() {
    ballStartXPos = Math.random() * 1000;
    ball.x = ballStartXPos;
}
//narysowanie kuli i dziury

// jak sie dowiedzieć ze kula wpadła w dziure
// dziura ma srodek i kula również => odległość środków jest mniejsza niż promień dziury => pitagoras