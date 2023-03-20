const canvas = document.getElementById('canvas1');
canvas.height = window.innerHeight * .8;
canvas.width = 50;
const ctx = canvas.getContext('2d');

let eval = 0;
let targetBarHeight;
let barMiddleHeight = canvas.height / 2;
let barHeight = 0;
let barSpeed = .25;
let prevTime;


const button1 = document.getElementById('-1');
const button2 = document.getElementById('-.5');
const button3 = document.getElementById('0');
const button4 = document.getElementById('.5');
const button5 = document.getElementById('1');

button1.addEventListener('click', function(){
   changeEval(-1);
})
button2.addEventListener('click', function(){
    changeEval(-.5);
})
button3.addEventListener('click', function(){
    changeEval(0);
})
button4.addEventListener('click', function(){
    changeEval(.5);
})
button5.addEventListener('click', function(){
    changeEval(1);
})

function drawBar(elapsedMs){

    
    //console.log("elapsedMS",elapsedMs);
    // console.log("dt", dt);

    let distance = targetBarHeight - barHeight;
    if(Math.abs(distance) > 5){
        barHeight += distance * (barSpeed );
        requestAnimationFrame(drawBar);
    }
    else
    {
        barHeight = targetBarHeight;
    }
    ctx.clearRect(0,0, canvas.width,canvas.height);
    ctx.fillStyle = 'black';
    ctx.fillRect(0,0,canvas.width,barHeight);
}

function changeEval(newEval) {
    eval = newEval;
    targetBarHeight = barMiddleHeight - (barMiddleHeight * eval);
    drawBar();
}

changeEval(0);