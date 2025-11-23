// Globální proměnná
let playerData;

// Mapování hodnot jednotlivých tierů
const tierValues = {
  HT1: 60, LT1: 45,
  HT2: 30, LT2: 20,
  HT3: 10, LT3: 6,
  HT4: 4,  LT4: 3,
  HT5: 2,  LT5: 1
};

// Funkce na spočítání celkové hodnoty
function getTotalValue(player) {
  let total = 0;
  for (const key in player) {
    if (key !== "player-name") {
      total += tierValues[player[key]] || 0;
    }
  }
  return total;
}

// --- Top-level await pro načtení JSON ---
// RELATIVNÍ cesta (soubor je v /data/data.json)
const response = await fetch("/draci-tiers/data/data.json");
playerData = await response.json();

// Přidáme overallPoints a seřadíme
playerData.forEach(p => p.overallPoints = getTotalValue(p));
playerData.sort((a, b) => b.overallPoints - a.overallPoints);

// --- TEĎ můžeš používat playerData kdekoliv níže ---
console.log("Používám playerData mimo funkce:", playerData);

function displayPLayerPositions() {
  playerData.forEach((player, index) => {
    const position = index + 1;
    document.querySelector('.overall-rankings').innerHTML += `
      <div class="overall-rank">
        <div class="player-details">
          <div class="overall-position-number">${position}</div>
          <img class="overall-player-image" src="https://render.crafty.gg/3d/bust/${player.name}"/>
          <div class="player-exact-details">
            <div class="overall-player-name">${player.name}</div>
            <div class="overall-place">Combat Master points: ${player.overallPoints}</div>
          </div>
        </div>
        <div class="tiers">
          <div class="each-tier ${player.Vanilla}">
            <img src="../images/vanilla.svg">
            <div class="exact-tier">${player.Vanilla}</div>
          </div>
          <div class="each-tier ${player.UHC}">
            <img src="../images/uhc.svg">
            <div class="exact-tier">${player.UHC}</div>
          </div>
          <div class="each-tier ${player.Pot}">
            <img src="../images/pot.svg">
            <div class="exact-tier">${player.Pot}</div>
          </div>
          <div class="each-tier ${player.NethOP}">
            <img src="../images/nethop.svg">
            <div class="exact-tier">${player.NethOP}</div>
          </div>
            <div class="each-tier ${player.SMP}">
            <img src="../images/smp.svg">
            <div class="exact-tier">${player.SMP}</div>
          </div>
          <div class="each-tier ${player.Sword}">
            <img src="../images/sword.svg">
            <div class="exact-tier">${player.Sword}</div>
          </div>
          <div class="each-tier ${player.Axe}">
            <img src="../images/axe.svg">
            <div class="exact-tier">${player.Axe}</div>
          </div>
          <div class="each-tier ${player.Mace}">
            <img src="../images/mace.svg">
            <div class="exact-tier">${player.Mace}</div>
          </div>
        </div>
      </div>`;
  });
}

displayPLayerPositions();

