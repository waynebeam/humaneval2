const canvas = document.getElementById('canvas1');
canvas.height = window.innerHeight * .8;
canvas.width = 50;
const ctx = canvas.getContext('2d');

let eval = 0;

const button1 = document.getElementById('-1');
const button2 = document.getElementById('-.5');
const button3 = document.getElementById('0');
const button4 = document.getElementById('.5');
const button5 = document.getElementById('1');

button1.addEventListener('click', function(){
    eval = -1;
    drawBar(eval);
})
button2.addEventListener('click', function(){
    eval = -.5;
    drawBar(eval);
})
button3.addEventListener('click', function(){
    eval = 0;
    drawBar(eval);
})
button4.addEventListener('click', function(){
    eval = .5;
    drawBar(eval);
})
button5.addEventListener('click', function(){
    eval = 1;
    drawBar(eval);
})

function drawBar(newEval){
    ctx.clearRect(0,0, canvas.width,canvas.height);
    ctx.fillStyle = 'black';
    let barMiddleHeight = canvas.height / 2;
    let barHeight = barMiddleHeight - (barMiddleHeight * newEval);
    ctx.fillRect(0,0,canvas.width,barHeight);

}

drawBar(eval);