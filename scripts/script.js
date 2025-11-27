let playerData;

const tierValues = {
  HT1: 60, LT1: 45,
  HT2: 30, LT2: 20,
  HT3: 10, LT3: 6,
  HT4: 4,  LT4: 3,
  HT5: 2,  LT5: 1
};

function getTotalValue(player) {
  let total = 0;
  for (const key in player) {
    if (key !== "player-name") {
      total += tierValues[player[key]] || 0;
    }
  }
  return total;
}

const response = await fetch("./data/data.json");
playerData = await response.json();

playerData.forEach(p => p.overallPoints = getTotalValue(p));
playerData.sort((a, b) => b.overallPoints - a.overallPoints);

console.log("Používám playerData mimo funkce:", playerData);

function displayPLayerPositions() {
  const container = document.querySelector('.overall-rankings');
  container.innerHTML = "";

  playerData.forEach((player, index) => {
    const rank = document.createElement("div");
    rank.className = "overall-rank";

    rank.innerHTML = `
      <div class="player-details">
        <div class="overall-position-number">${index + 1}</div>
        <img class="overall-player-image" src="https://render.crafty.gg/3d/bust/${player.name}">
        <div class="player-exact-details">
          <div class="overall-player-name">${player.name}</div>
          <div class="overall-place">Combat Master points: ${player.overallPoints}</div>
        </div>
      </div>
    `;

    // ---- ZDE ZAČÍNÁ TŘÍDĚNÍ GAMEMODŮ ----

    const modes = [];

    // ForEach přes všechny klíče hráče
    Object.keys(player).forEach(key => {
      if (key !== "name" && key !== "overallPoints") {

        const tier = player[key];   // např. HT1
        const value = tierValues[tier]; // např. 60

        modes.push({
          mode: key,    // Vanilla, UHC...
          tier: tier,
          value: value
        });
      }
    });

    // Seřazení podle větší hodnoty (nejjednodušší sort)
    modes.sort((a, b) => b.value - a.value);

    // ---- HTML GENEROVÁNÍ IKONEK ----

    const tiersDiv = document.createElement("div");
    tiersDiv.className = "tiers";

    modes.forEach(gm => {
      tiersDiv.innerHTML += `
        <div class="each-tier ${gm.tier}">
          <img src="./images/${gm.mode.toLowerCase()}.svg">
          <div class="exact-tier">${gm.tier}</div>
        </div>
      `;
    });

    rank.appendChild(tiersDiv);
    container.appendChild(rank);
  });
}



displayPLayerPositions();
