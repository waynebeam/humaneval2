const canvas = document.getElementById('canvas1');
canvas.height = window.innerHeight * .8;
canvas.width = 100;
const ctx = canvas.getContext('2d');

let eval;
let targetBarHeight;
let barMiddleHeight = canvas.height / 2;
let barHeight = 0;
let barWidth = canvas.width * .4;
let barX = (canvas.width - barWidth)/2;
let barSpeed = 5;
let prevTime = 0;
let floatHeight = 5;
let isTextScrolling = false;
let currentButton;
let currentEvalText;
let textScrollX = 0;
let textSpeed = canvas.height * .7;
let textEndX = canvas.height * 3;
let highlightedBtn;


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
        let btnsDiv = document.createElement('div');
        btnsDiv.classList.add('eval-btn-div');
        let btn = document.createElement('button');
        let renameBtn = document.createElement('button');
        renameBtn.innerHTML = 'rename';
        btnsDiv.appendChild(btn);
        btnsDiv.append(renameBtn);
        btn.innerHTML = btnData.description;
        btn.classList.add('button');
        renameBtn.classList.add('button');
        btn.addEventListener('click', ()=>{
            changeEval(btnData);
            styleButton(btn);
        })
        renameBtn.addEventListener('click', ()=>{
            renameButton(btn,btnData);
        })
        whiteButtonsContainer.appendChild(btnsDiv);
    })
    blackButtons.forEach(btnData => {
        let btnsDiv = document.createElement('div');
        btnsDiv.classList.add('eval-btn-div');
        let btn = document.createElement('button');
        let renameBtn = document.createElement('button');
        renameBtn.innerHTML = 'rename';
        btnsDiv.appendChild(btn);
        btnsDiv.append(renameBtn);
        btn.innerHTML = btnData.description;
        btn.classList.add('button');
        renameBtn.classList.add('button');
        btn.addEventListener('click', ()=>{
            changeEval(btnData);
            styleButton(btn);
        })
        renameBtn.addEventListener('click', ()=>{
            renameButton(btn,btnData);
        })
        blackButtonsContainer.appendChild(btnsDiv);
    })
    sharedButtons.forEach(btnData => {
        let btnsDiv = document.createElement('div');
        btnsDiv.classList.add('eval-btn-div');
        let btn = document.createElement('button');
        let renameBtn = document.createElement('button');
        renameBtn.innerHTML = 'rename';
        btnsDiv.appendChild(btn);
        btnsDiv.append(renameBtn);
        btn.innerHTML = btnData.description;
        btn.classList.add('button');
        renameBtn.classList.add('button');
        btn.addEventListener('click', ()=>{
            changeEval(btnData);
            styleButton(btn);
        })
        renameBtn.addEventListener('click', ()=>{
            renameButton(btn,btnData);
        })
        sharedButtonsContainer.appendChild(btnsDiv);
    })

}

function renameButton(btn, btnData) {
    const newName = prompt(`Rename ${btnData.description} to:`);
    if(newName){
        btnData.description = newName;
        btn.innerHTML = btnData.description;
        if(eval === btnData.eval) {
            currentEvalText = btnData.description;
        }
    }
}

function styleButton(btn){
    if(highlightedBtn){
        highlightedBtn.classList.remove('accent-border');
    }
    highlightedBtn = btn;
    btn.classList.add('accent-border');
}

function drawBar(elapsedMs){

    
    //console.log("elapsedMS",elapsedMs);
    // console.log("dt", dt);

    let dt = elapsedMs - prevTime;

    let distance = targetBarHeight - barHeight;
    if(Math.abs(distance) > floatHeight){
        barHeight += Math.sign(distance) * (barSpeed);
    }
    else
    {
        barHeight = targetBarHeight + Math.sin(elapsedMs/500) * floatHeight;
    }
    ctx.clearRect(0,0, canvas.width,canvas.height);
    ctx.fillStyle = 'white';
    ctx.fillRect(barX,0,barWidth,canvas.height);
    ctx.fillStyle = 'black';
    ctx.fillRect(barX,0,barWidth,barHeight);
    ctx.beginPath();
    ctx.moveTo(0, barMiddleHeight);
    ctx.lineTo(canvas.width, barMiddleHeight);
    ctx.strokeStyle = accentColor;
    ctx.lineWidth = '5';
    ctx.stroke();

    drawText(dt);

    prevTime = elapsedMs;
    requestAnimationFrame(drawBar);

}

function drawText(dt)
{
    if(eval){
        let originX = 0;
        let originY = 0;
        let rotation = 0;
        let startX = -canvas.height;

        let drawX = startX + textScrollX;
        let maxSpeedThisFrame = textSpeed * dt/1000;

        if(drawX < 0)
        {
            textScrollX += maxSpeedThisFrame;
        }
        else{
            let radians = ((drawX -  canvas.height) / canvas.height) * Math.PI;
            textScrollX += maxSpeedThisFrame * .2 + (maxSpeedThisFrame * .8 * Math.abs(Math.cos(radians))) ; 
            if(textScrollX > textEndX){
                textScrollX = 0;
            }  
        }
        ctx.save();
        ctx.font = `${barX}px monospace`;
        if(eval > 0){
            ctx.fillStyle = 'white';
            originX = barX;
            originY = barMiddleHeight;
            rotation = -Math.PI * .5;
        }
        if(eval < 0){
            ctx.fillStyle = 'black';
            originX = barX + barWidth;
            originY = barMiddleHeight;
            rotation = Math.PI * .5;
        }
        
        ctx.translate(originX, originY);
        ctx.rotate(rotation);
        ctx.translate(-canvas.height * .6, 0);
        ctx.fillText(currentEvalText, drawX,0);
        ctx.restore();
    }
}


function changeEval(evalData) {
    if(evalData.eval !== eval){
        eval = evalData.eval;
        currentEvalText = evalData.description;
        targetBarHeight = barMiddleHeight - (barMiddleHeight * eval);
        textScrollX = 0;

    }
}

let bodyStyles = window.getComputedStyle(document.body);
let accentColor = bodyStyles.getPropertyValue('--accent-color');
wireUpButtons();
changeEval(sharedButtons[0]);
drawBar();

