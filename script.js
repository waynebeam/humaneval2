const canvas = document.getElementById('canvas1');
canvas.height = window.innerHeight * .8;
canvas.width = 50;
const ctx = canvas.getContext('2d');

let eval = 0;
let targetBarHeight;
let barMiddleHeight = canvas.height / 2;
let barHeight = 0;
let barSpeed = 5;
let prevTime;
let floatHeight = 5;

const whiteButtonsContainer = document.getElementById('white-buttons-container');
const blackButtonsContainer = document.getElementById('black-buttons-container');
const sharedButtonsContainer = document.getElementById('shared-buttons-container');
const whiteButtons = [
    {
        description: "White is winning!",
        eval: 1,
    },
    {
        description: "White is much better",
        eval: .75,
    },
    {
        description: "White is better",
        eval: .5,
    },
    {
        description: "White is slightly better",
        eval: .25,
    },
];
const blackButtons = [
 
    {
        description: "Black is slightly better",
        eval: -.25,
    },
    {
        description: "Black is better",
        eval: -.5,
    },
    {
        description: "Black is much better",
        eval: -.75,
    },
    {
        description: "Black is winning!",
        eval: -1,
    },
   
]
const sharedButtons = [
    {
        description: "Equal",
        eval: 0,
    },
]

function wireUpButtons(){
    whiteButtons.forEach(btnData => {
        let btn = document.createElement('button');
        btn.innerHTML = btnData.description;
        btn.classList.add('button');
        btn.addEventListener('click', ()=>changeEval(btnData.eval));
        whiteButtonsContainer.appendChild(btn);
    })
    blackButtons.forEach(btnData => {
        let btn = document.createElement('button');
        btn.innerHTML = btnData.description;
        btn.classList.add('button');

        btn.addEventListener('click', ()=>changeEval(btnData.eval));
        blackButtonsContainer.appendChild(btn);
    })
    sharedButtons.forEach(btnData => {
        let btn = document.createElement('button');
        btn.innerHTML = btnData.description;
        btn.classList.add('button');

        btn.addEventListener('click', ()=>changeEval(btnData.eval));
        sharedButtonsContainer.appendChild(btn);
    })
}



function drawBar(elapsedMs){

    
    //console.log("elapsedMS",elapsedMs);
    // console.log("dt", dt);

    let distance = targetBarHeight - barHeight;
    if(Math.abs(distance) > floatHeight){
        barHeight += Math.sign(distance) * (barSpeed);
    }
    else
    {
        barHeight = targetBarHeight + Math.sin(elapsedMs/500) * floatHeight;
    }
    ctx.clearRect(0,0, canvas.width,canvas.height);
    ctx.fillStyle = 'black';
    ctx.fillRect(0,0,canvas.width,barHeight);
    ctx.beginPath();
    ctx.moveTo(0, barMiddleHeight);
    ctx.lineTo(canvas.width, barMiddleHeight);
    ctx.strokeStyle = 'salmon';
    ctx.lineWidth = '3';
    ctx.stroke();

    requestAnimationFrame(drawBar);

}

function changeEval(newEval) {
    eval = newEval;
    targetBarHeight = barMiddleHeight - (barMiddleHeight * eval);
    drawBar();
}

wireUpButtons();
changeEval(0);