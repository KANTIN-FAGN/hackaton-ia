// Items de déchets avec leurs informations
const wasteItems = [
    {
        id: 1,
        name: "Bouteille en plastique",
        type: "recyclable",
        image: "./assets/bouteille-plastique.png",
        info: "Les bouteilles en plastique peuvent être recyclées pour créer de nouveaux produits. Un recyclage efficace peut économiser jusqu'à 75% d'énergie par rapport à la production de plastique neuf."
    },
    {
        id: 2,
        name: "Épluchures de légumes",
        type: "compostable",
        image: "./assets/legume.png",
        info: "Les déchets alimentaires comme les épluchures se décomposent naturellement et peuvent être transformés en compost riche en nutriments pour les plantes."
    },
    {
        id: 3,
        name: "Emballage alimentaire souillé",
        type: "trash",
        image: "./assets/souille.png",
        info: "Les emballages alimentaires contaminés par la nourriture sont généralement difficiles à recycler. L'idéal est de réduire leur utilisation."
    },
    {
        id: 4,
        name: "Boîte de conserve",
        type: "recyclable",
        image: "./assets/conserve.png",
        info: "Les boîtes de conserve sont faites d'acier ou d'aluminium, des matériaux parfaitement recyclables. Recycler une boîte de conserve économise assez d'énergie pour faire fonctionner une télévision pendant 3 heures."
    },
    {
        id: 6,
        name: "Couche jetable",
        type: "trash",
        image: "./assets/couche.png",
        info: "Les couches jetables contiennent du plastique et des matières absorbantes qui ne sont pas recyclables. Elles peuvent mettre jusqu'à 500 ans à se décomposer dans la nature."
    },
    {
        id: 7,
        name: "Journal",
        type: "recyclable",
        image: "./assets/journal.png",
        info: "Le papier journal se recycle facilement et peut être transformé en nouveau papier. Recycler une tonne de papier sauve environ 17 arbres."
    },
    {
        id: 8,
        name: "Coquilles d'œufs",
        type: "compostable",
        image: "./assets/oeuf.png",
        info: "Les coquilles d'œufs sont riches en calcium et se décomposent facilement dans le compost. Elles peuvent aussi être utilisées pour repousser les limaces du jardin."
    },
    {
        id: 9,
        name: "Ampoule cassée",
        type: "trash",
        image: "./assets/ampoule.png",
        info: "Les ampoules à incandescence cassées ne sont pas recyclables. Cependant, les ampoules LED et fluocompactes devraient être apportées à un point de collecte spécial car elles contiennent des matériaux dangereux."
    },
    {
        id: 10,
        name: "Bouteille en verre",
        type: "recyclable",
        image: "./assets/bouteille-verre.png",
        info: "Le verre est recyclable à l'infini sans perdre ses propriétés. Recycler une bouteille en verre économise assez d'énergie pour alimenter une ampoule pendant 4 heures."
    },
    {
        id: 11,
        name: "Restes de viande",
        type: "trash",
        image: "./assets/viande.png",
        info: "Les restes de viande ne doivent pas être mis au compost domestique car ils peuvent attirer des nuisibles et dégager des odeurs. Ils vont dans les ordures ménagères."
    },
    {
        id: 12,
        name: "Sachet de thé",
        type: "compostable",
        image: "./assets/the.png",
        info: "Les sachets de thé en papier sont compostables. Attention cependant aux sachets qui contiennent du plastique, qui doivent être séparés avant compostage."
    }
];

// Faits écologiques
const ecoFacts = [
    "Recycler une tonne de papier permet d'économiser 17 arbres, 4 000 kWh d'électricité et 26 000 litres d'eau.",
    "Chaque année, environ 8 millions de tonnes de plastique finissent dans les océans, causant des dommages irréparables à la vie marine.",
    "Le compostage peut réduire votre production de déchets ménagers jusqu'à 30% tout en créant un engrais naturel pour votre jardin.",
    "Une bouteille en plastique met entre 450 et 1000 ans à se décomposer dans la nature.",
    "Recycler une canette en aluminium économise assez d'énergie pour faire fonctionner un téléviseur pendant 3 heures.",
    "Un Français produit en moyenne 590 kg de déchets par an, dont seulement 43% sont recyclés ou compostés.",
    "Une pile jetée dans la nature peut polluer 1m³ de terre et 1000m³ d'eau pendant 50 ans.",
    "Les océans absorbent environ 30% du CO₂ que nous produisons, ce qui entraîne leur acidification.",
    "En France, près de 10 millions de tonnes de nourriture sont gaspillées chaque année, soit l'équivalent de 150kg par habitant.",
    "Le recyclage d'une tonne de plastique permet d'économiser l'équivalent de 2 tonnes de pétrole.",
    "Une famille de 4 personnes peut réduire ses émissions de CO₂ de 340 kg par an simplement en triant ses déchets."
];

// Variables du jeu
let score = 0;
let timeLeft = 60;
let level = 1;
let gameTimer;
let activeItems = [];
let itemInterval;
let isDragging = false;
let draggedItem = null;
let draggedItemRect = null;
let offsetX, offsetY;
let correctItems = 0;
let itemSpeed = 2000; // Temps entre l'apparition de nouveaux items en ms

// Éléments DOM
const gameArea = document.getElementById('game-area');
const startScreen = document.getElementById('start-screen');
const endScreen = document.getElementById('end-screen');
const resultsSection = document.getElementById('results');
const scoreDisplay = document.getElementById('score');
const timerDisplay = document.getElementById('timer');
const levelDisplay = document.getElementById('level');
const finalScoreDisplay = document.getElementById('final-score');
const co2SavedDisplay = document.getElementById('co2-saved');
const waterSavedDisplay = document.getElementById('water-saved');
const wasteReducedDisplay = document.getElementById('waste-reduced');
const treesEquivalentDisplay = document.getElementById('trees-equivalent');
const ecoFactDisplay = document.getElementById('eco-fact');
const infoModal = document.getElementById('info-modal');
const itemTitle = document.getElementById('item-title');
const itemImage = document.getElementById('item-image');
const itemInfo = document.getElementById('item-info');
const recyclingStatus = document.getElementById('recycling-status');
const compostStatus = document.getElementById('compost-status');
const trashStatus = document.getElementById('trash-status');

// Boutons
const startBtn = document.getElementById('start-btn');
const restartBtn = document.getElementById('restart-btn');
const closeModalBtn = document.getElementById('close-modal');

// Démarrer le jeu
startBtn.addEventListener('click', startGame);
restartBtn.addEventListener('click', restartGame);
closeModalBtn.addEventListener('click', closeModal);

// Fonction pour démarrer le jeu
function startGame() {
    startScreen.style.display = 'none';
    gameArea.style.display = 'block';
    score = 0;
    timeLeft = 60;
    level = 1;
    correctItems = 0;
    itemSpeed = 2000;
    updateScore();
    updateTimer();
    updateLevel();

    // Démarrer le timer
    gameTimer = setInterval(() => {
        timeLeft--;
        updateTimer();

        // Vérifier si le niveau doit changer
        checkLevelUp();

        if (timeLeft <= 0) {
            endGame();
        }
    }, 1000);

    // Générer les déchets
    itemInterval = setInterval(generateWasteItem, itemSpeed);

    // Configuration du jeu tactile
    setupTouchEvents();
}

// Vérifier s'il faut passer au niveau suivant
function checkLevelUp() {
    if (correctItems >= level * 5) {
        level++;
        updateLevel();

        // Augmenter la difficulté
        itemSpeed = Math.max(1000, 2000 - (level - 1) * 200);
        clearInterval(itemInterval);
        itemInterval = setInterval(generateWasteItem, itemSpeed);
    }
}

// Mettre à jour l'affichage du niveau
function updateLevel() {
    levelDisplay.textContent = level;
}

// Fin du jeu
function endGame() {
    clearInterval(gameTimer);
    clearInterval(itemInterval);

    // Supprimer tous les items
    activeItems.forEach(item => {
        if (item.element) {
            item.element.remove();
        }
    });
    activeItems = [];

    // Afficher l'écran de fin
    gameArea.style.display = 'none';
    endScreen.style.display = 'flex';
    finalScoreDisplay.innerHTML = `<p>Votre score: ${score} points</p><p>Niveau atteint: ${level}</p>`;

    // Calculer l'impact environnemental
    calculateImpact();

    // Afficher un fait écologique aléatoire
    ecoFactDisplay.textContent = ecoFacts[Math.floor(Math.random() * ecoFacts.length)];

    // Afficher les résultats
    resultsSection.style.display = 'block';
}

// Redémarrer le jeu
function restartGame() {
    endScreen.style.display = 'none';
    resultsSection.style.display = 'none';
    startGame();
}

// Générer un déchet aléatoire
function generateWasteItem() {
    if (activeItems.length >= 5) return; // Limiter le nombre d'items à l'écran

    const randomItem = wasteItems[Math.floor(Math.random() * wasteItems.length)];
    const element = document.createElement('div');
    element.className = 'waste-item';
    element.style.backgroundImage = `url('${randomItem.image}')`;
    element.style.left = `${Math.random() * (gameArea.offsetWidth - 100) + 50}px`;
    element.style.top = `${Math.random() * 200 + 50}px`;
    element.dataset.id = randomItem.id;

    gameArea.appendChild(element);

    // Configuration du drag & drop
    element.addEventListener('mousedown', dragStart);

    // Ajouter à la liste des items actifs
    activeItems.push({
        id: randomItem.id,
        element: element,
        data: randomItem
    });

    // Supprimer automatiquement après un certain temps
    setTimeout(() => {
        if (activeItems.length > 0) {
            const itemIndex = activeItems.findIndex(item => item.element === element);
            if (itemIndex !== -1 && element.parentNode) {
                element.remove();
                activeItems.splice(itemIndex, 1);
            }
        }
    }, 8000);
}

// Événements de glisser-déposer
function dragStart(e) {
    if (isDragging) return;

    isDragging = true;
    draggedItem = this;
    draggedItemRect = draggedItem.getBoundingClientRect();

    // Calculer le décalage pour que l'item suive le curseur correctement
    offsetX = e.clientX - draggedItemRect.left;
    offsetY = e.clientY - draggedItemRect.top;

    // Style pendant le glissement
    draggedItem.style.zIndex = 1000;

    document.addEventListener('mousemove', dragMove);
    document.addEventListener('mouseup', dragEnd);

    e.preventDefault();
}

function dragMove(e) {
    if (!isDragging) return;

    const gameAreaRect = gameArea.getBoundingClientRect();
    const x = e.clientX - gameAreaRect.left - offsetX;
    const y = e.clientY - gameAreaRect.top - offsetY;

    // Limiter aux frontières du jeu
    const maxX = gameAreaRect.width - draggedItemRect.width;
    const maxY = gameAreaRect.height - draggedItemRect.height;

    draggedItem.style.left = `${Math.max(0, Math.min(maxX, x))}px`;
    draggedItem.style.top = `${Math.max(0, Math.min(maxY, y))}px`;
}

function dragEnd(e) {
    if (!isDragging) return;

    document.removeEventListener('mousemove', dragMove);
    document.removeEventListener('mouseup', dragEnd);

    // Vérifier si l'item est au-dessus d'une poubelle
    const bins = document.querySelectorAll('.bin');
    let isDroppedInBin = false;

    bins.forEach(bin => {
        const binRect = bin.getBoundingClientRect();
        const itemRect = draggedItem.getBoundingClientRect();

        // Vérifier la collision
        if (
            itemRect.right > binRect.left &&
            itemRect.left < binRect.right &&
            itemRect.bottom > binRect.top &&
            itemRect.top < binRect.bottom
        ) {
            isDroppedInBin = true;
            handleItemDrop(draggedItem, bin);
        }
    });

    // Si non déposé dans une poubelle, retourner à la position initiale
    if (!isDroppedInBin) {
        draggedItem.style.zIndex = '';
    }

    isDragging = false;
    draggedItem = null;
}

// Gérer le dépôt d'un item dans une poubelle
function handleItemDrop(itemElement, bin) {
    const itemId = parseInt(itemElement.dataset.id);
    const itemData = wasteItems.find(item => item.id === itemId);
    const binType = bin.dataset.type;

    // Supprimer l'item de la liste active
    const itemIndex = activeItems.findIndex(item => item.id === itemId);
    if (itemIndex !== -1) {
        activeItems.splice(itemIndex, 1);
    }

    // Vérifier si le tri est correct
    if (itemData.type === binType) {
        score += 10 * level; // Plus de points aux niveaux supérieurs
        correctItems++;
        // Animation de bonne réponse
        bin.classList.add('correct');
        setTimeout(() => bin.classList.remove('correct'), 500);
    } else {
        score = Math.max(0, score - 5); // Ne pas descendre en dessous de 0

        // Afficher les informations sur l'item
        showItemInfo(itemData, binType);
    }

    updateScore();
    itemElement.remove();
}

// Afficher les informations sur un item mal trié
function showItemInfo(itemData, selectedBinType) {
    itemTitle.textContent = itemData.name;
    itemImage.style.backgroundImage = `url('${itemData.image}')`;
    itemInfo.textContent = itemData.info;

    // Réinitialiser les statuts
    recyclingStatus.textContent = "";
    compostStatus.textContent = "";
    trashStatus.textContent = "";

    // Définir le statut correct et incorrect
    if (itemData.type === "recyclable") {
        recyclingStatus.textContent = "✓ CORRECT";
        recyclingStatus.style.color = "#4CAF50";
    } else if (selectedBinType === "recyclable") {
        recyclingStatus.textContent = "✗ INCORRECT";
        recyclingStatus.style.color = "#F44336";
    }

    if (itemData.type === "compostable") {
        compostStatus.textContent = "✓ CORRECT";
        compostStatus.style.color = "#4CAF50";
    } else if (selectedBinType === "compostable") {
        compostStatus.textContent = "✗ INCORRECT";
        compostStatus.style.color = "#F44336";
    }

    if (itemData.type === "trash") {
        trashStatus.textContent = "✓ CORRECT";
        trashStatus.style.color = "#4CAF50";
    } else if (selectedBinType === "trash") {
        trashStatus.textContent = "✗ INCORRECT";
        trashStatus.style.color = "#F44336";
    }

    infoModal.style.display = 'flex';
}

function closeModal() {
    infoModal.style.display = 'none';
}

// Calculer l'impact environnemental
function calculateImpact() {
    // Calculer l'impact en fonction du score et du niveau
    const impactMultiplier = score / 10 * (1 + (level - 1) * 0.2);

    const co2Saved = (impactMultiplier * 0.5).toFixed(1);
    const waterSaved = Math.round(impactMultiplier * 10);
    const wasteReduced = (impactMultiplier * 0.2).toFixed(1);
    const treesEquivalent = (impactMultiplier * 0.05).toFixed(2);

    // Animer les compteurs
    animateCounter(co2SavedDisplay, 0, co2Saved, 1);
    animateCounter(waterSavedDisplay, 0, waterSaved);
    animateCounter(wasteReducedDisplay, 0, wasteReduced, 1);
    animateCounter(treesEquivalentDisplay, 0, treesEquivalent, 2);
}

// Animer les compteurs
function animateCounter(element, start, end, decimals = 0) {
    const duration = 1500; // ms
    const steps = 30;
    const stepValue = (end - start) / steps;
    let current = start;
    let step = 0;

    const timer = setInterval(() => {
        step++;
        current += stepValue;

        if (step >= steps) {
            clearInterval(timer);
            current = end;
        }

        element.textContent = decimals === 0 ?
            Math.round(current) :
            parseFloat(current).toFixed(decimals);

    }, duration / steps);
}

// Mettre à jour l'affichage du score
function updateScore() {
    scoreDisplay.textContent = score;
}

// Mettre à jour l'affichage du timer
function updateTimer() {
    timerDisplay.textContent = timeLeft;
}

// Configuration des événements tactiles pour les appareils mobiles
function setupTouchEvents() {
    gameArea.addEventListener('touchstart', handleTouchStart, {passive: false});
    gameArea.addEventListener('touchmove', handleTouchMove, {passive: false});
    gameArea.addEventListener('touchend', handleTouchEnd);
}

function handleTouchStart(e) {
    if (isDragging) return;

    const touch = e.touches[0];
    const itemElement = document.elementFromPoint(touch.clientX, touch.clientY);

    if (itemElement && itemElement.classList.contains('waste-item')) {
        isDragging = true;
        draggedItem = itemElement;
        draggedItemRect = draggedItem.getBoundingClientRect();

        offsetX = touch.clientX - draggedItemRect.left;
        offsetY = touch.clientY - draggedItemRect.top;

        draggedItem.style.zIndex = 1000;
    }

    e.preventDefault();
}

function handleTouchMove(e) {
    if (!isDragging) return;

    const touch = e.touches[0];
    const gameAreaRect = gameArea.getBoundingClientRect();
    const x = touch.clientX - gameAreaRect.left - offsetX;
    const y = touch.clientY - gameAreaRect.top - offsetY;

    const maxX = gameAreaRect.width - draggedItemRect.width;
    const maxY = gameAreaRect.height - draggedItemRect.height;

    draggedItem.style.left = `${Math.max(0, Math.min(maxX, x))}px`;
    draggedItem.style.top = `${Math.max(0, Math.min(maxY, y))}px`;

    e.preventDefault();
}

function handleTouchEnd(e) {
    if (!isDragging) return;

    const touch = e.changedTouches[0];
    const elementBelow = document.elementFromPoint(touch.clientX, touch.clientY);

    if (elementBelow && elementBelow.closest('.bin')) {
        handleItemDrop(draggedItem, elementBelow.closest('.bin'));
    } else {
        draggedItem.style.zIndex = '';
    }

    isDragging = false;
    draggedItem = null;
}
