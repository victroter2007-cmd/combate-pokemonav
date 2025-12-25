let playerHP = 100;
let enemyHP = 100;

const playerBar = document.getElementById("player-hp");
const enemyBar = document.getElementById("enemy-hp");
const text = document.getElementById("battle-text");

function updateBars() {
  playerBar.style.width = playerHP + "%";
  enemyBar.style.width = enemyHP + "%";
}

function attack() {
  let damage = Math.floor(Math.random() * 15) + 5;
  enemyHP -= damage;
  if (enemyHP < 0) enemyHP = 0;

  text.innerText = `Delibird atacó e hizo ${damage} de daño!`;
  updateBars();

  if (enemyHP === 0) {
    text.innerText = "¡Stantler fue derrotado! 🎄";
    return;
  }

  setTimeout(enemyTurn, 1000);
}

function heal() {
  let healAmount = 15;
  playerHP += healAmount;
  if (playerHP > 100) playerHP = 100;

  text.innerText = "Delibird recuperó energía 🎁";
  updateBars();

  setTimeout(enemyTurn, 1000);
}

function enemyTurn() {
  let damage = Math.floor(Math.random() * 12) + 5;
  playerHP -= damage;
  if (playerHP < 0) playerHP = 0;

  text.innerText = `Stantler atacó e hizo ${damage} de daño!`;
  updateBars();

  if (playerHP === 0) {
    text.innerText = "¡Delibird se debilitó! ❄️";
  }
}
