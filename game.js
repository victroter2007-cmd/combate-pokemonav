const canvas = document.getElementById("gameCanvas");
const ctx = canvas.getContext("2d");

const bg = new Image();
bg.src = "background.png";

const delibird = new Image();
delibird.src = "delibird.png";

const stantler = new Image();
stantler.src = "stantler.png";

const santa = new Image();
santa.src = "santa.png";

const battleMusic = new Audio("audio/battle.mp3");
const winMusic = new Audio("audio/win.mp3");
const hitSound = new Audio("audio/hit.wav");

battleMusic.loop = true;
battleMusic.play();

let playerHP = 100;
let enemyHP = 100;
let state = "battle";

function draw() {
  ctx.clearRect(0,0,640,360);
  ctx.drawImage(bg,0,0,640,360);

  if (state === "battle") {
    ctx.drawImage(stantler, 380, 80, 96, 96);
    ctx.drawImage(delibird, 140, 180, 96, 96);

    drawHP(50, 50, enemyHP);
    drawHP(350, 250, playerHP);

    ctx.fillStyle = "white";
    ctx.fillText("Stantler Lv5", 50, 40);
    ctx.fillText("Delibird Lv5", 350, 240);
  }

  if (state === "victory") {
    ctx.fillStyle = "black";
    ctx.fillRect(0,0,640,360);
    ctx.drawImage(santa, 250, 100, 128, 128);
    ctx.fillStyle = "white";
    ctx.font = "16px monospace";
    ctx.fillText("¡Felicidades!", 240, 60);
    ctx.fillText("Santa te entrega un código QR", 180, 80);

    drawQR(270, 240);
  }
}

function drawHP(x,y,hp){
  ctx.fillStyle="white";
  ctx.fillRect(x,y,104,12);
  ctx.fillStyle="green";
  ctx.fillRect(x+2,y+2,hp,8);
}

function playerAttack() {
  if (state !== "battle") return;

  hitSound.play();
  enemyHP -= Math.floor(Math.random()*15)+10;
  if (enemyHP <= 0) {
    enemyHP = 0;
    win();
    return;
  }
  setTimeout(enemyAttack, 800);
}

function enemyAttack() {
  hitSound.play();
  playerHP -= Math.floor(Math.random()*12)+8;
  if (playerHP < 0) playerHP = 0;
}

function heal() {
  playerHP += 20;
  if (playerHP > 100) playerHP = 100;
}

function win() {
  battleMusic.pause();
  winMusic.play();
  state = "victory";
}

function drawQR(x,y) {
  const qrData = [
    "111111101010101111111",
    "100000100111001000001",
    "101110101010101011101",
    "101110100111001011101",
    "101110101010101011101",
    "100000100111001000001",
    "111111101010101111111"
  ];

  for (let r=0;r<qrData.length;r++){
    for (let c=0;c<qrData[r].length;c++){
      if (qrData[r][c]==="1"){
        ctx.fillRect(x+c*4,y+r*4,4,4);
      }
    }
  }
}

setInterval(draw, 1000/60);
