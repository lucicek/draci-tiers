async function loadPlayerData() {
  try {
    const response = await fetch("../data/data.json");
    const playerData = await response.json();

    // Struktury pro ukládání HT a LT zvlášť
    let tier1 = { HT: [], LT: [] };
    let tier2 = { HT: [], LT: [] };
    let tier3 = { HT: [], LT: [] };
    let tier4 = { HT: [], LT: [] };
    let tier5 = { HT: [], LT: [] };

    // Vrátí číslo tieru (1–5)
    function getTierNumber(value) {
      return Number(value.slice(-1));
    }

    // Vrátí typ: HT nebo LT
    function getTierType(value) {
      return value.startsWith("HT") ? "HT" : "LT";
    }

    // Zpracování hráčů
    playerData.forEach(player => {
      const swordValue = player.Sword;
      if (!swordValue) return;

      const tierNum = getTierNumber(swordValue);
      const tierType = getTierType(swordValue);

      switch (tierNum) {
        case 1:
          tier1[tierType].push(player.name);
          break;
        case 2:
          tier2[tierType].push(player.name);
          break;
        case 3:
          tier3[tierType].push(player.name);
          break;
        case 4:
          tier4[tierType].push(player.name);
          break;
        case 5:
          tier5[tierType].push(player.name);
          break;
      }
    });

    // Výpis do konzole
    console.log("Tier 1 →", tier1);
    console.log("Tier 2 →", tier2);
    console.log("Tier 3 →", tier3);
    console.log("Tier 4 →", tier4);
    console.log("Tier 5 →", tier5);

    function renderTier(tierData, columnSelector) {
    const column = document.querySelector(columnSelector);

      tierData.HT.forEach(player => {
        column.innerHTML += `
          <div class="exact-gamemode-player-details high-tier">
            <img src="https://render.crafty.gg/3d/bust/${player}">
            ${player}
          </div>`;
      });

      tierData.LT.forEach(player => {
        column.innerHTML += `
          <div class="exact-gamemode-player-details low-tier">
            <img src="https://render.crafty.gg/3d/bust/${player}">
            ${player}
          </div>`;
      });
    }

    renderTier(tier1, ".tier-1-column");
    renderTier(tier2, ".tier-2-column");
    renderTier(tier3, ".tier-3-column");
    renderTier(tier4, ".tier-4-column");
    renderTier(tier5, ".tier-5-column");

    // Pokud chceš, můžu z těchto HT/LT polí rovnou generovat HTML — řekni ;)
    
  } catch (error) {
    console.error("Chyba při načítání JSON souboru:", error);
  }
}

// Spuštění
loadPlayerData();
