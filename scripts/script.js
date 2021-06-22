const FRONT = "card-front";
const BACK = "card-back";
const CARD = "card";
const ICON = "icon";
let gameOverLayer = document.getElementById("gameOver");
let countTime = document.getElementById("timer");
let countMoves = document.getElementById("moves");
let endTime = document.querySelector(".endTime");
let endMoves = document.querySelector(".endMoves");
let interval;
let moves = 0;
let sec = 00;
let min = 00;
let hour = 00;

let madeAMove = false;

startGame();

function startGame() {
    countTime.innerHTML = "00:00:00";
    countMoves.innerHTML = "00";
    madeAMove = false;
    moves = 0;
    sec = 0;
    min = 0;
    hour = 0;

    initializeCards(game.createCardsFromTechs());
}

function initializeCards(cards) {
    let gameBoard = document.getElementById("gameBoard");
    gameBoard.innerHTML = "";
    game.cards.forEach((card) => {
        let cardElement = document.createElement("div");
        cardElement.id = card.id;
        cardElement.classList.add(CARD);
        cardElement.dataset.icon = card.icon;

        createCardContent(card, cardElement);

        cardElement.addEventListener("click", flipCard);
        gameBoard.appendChild(cardElement);
    });
}

function createCardContent(card, cardElement) {
    createCardFace(FRONT, card, cardElement);
    createCardFace(BACK, card, cardElement);
}

function createCardFace(face, card, element) {
    let cardElementFace = document.createElement("div");
    cardElementFace.classList.add(face);
    if (face === FRONT) {
        let iconElement = document.createElement("img");
        iconElement.classList.add(ICON);
        iconElement.src = "./assets/" + card.icon + ".png";
        cardElementFace.appendChild(iconElement);
    } else {
        cardElementFace.innerHTML = "&lt;/&gt;";
    }
    element.appendChild(cardElementFace);
}

function flipCard() {
    if (!madeAMove) {
        interval = setInterval(startTimer, 1000);
        madeAMove = true;
    }
    if (game.setCard(this.id)) {
        this.classList.add("flip");
        if (game.secondCard) {
            updateMove();
            if (game.checkMatch()) {
                game.clearCards();
                if (game.checkGameOver()) {
                    setTimeout(() => {
                        clearInterval(interval);
                        endTime.innerHTML = "Tempo de jogo: " + countTime.innerHTML;
                        endMoves.innerHTML = "Total de movimentos: " + moves;
                        gameOverLayer.style.display = "flex";
                    }, 200);
                }
            } else {
                setTimeout(() => {
                    let firstCardView = document.getElementById(game.firstCard.id);
                    let secondCardView = document.getElementById(game.secondCard.id);

                    firstCardView.classList.remove("flip");
                    secondCardView.classList.remove("flip");

                    game.unflipCards();
                }, 1000);
            }
        }
    }
}

function restart() {
    game.clearCards();
    startGame();
    let gameOverLayer = document.getElementById("gameOver");
    gameOverLayer.style.display = "none";
}

function startTimer() {
    sec = parseInt(sec);
    min = parseInt(min);
    hour = parseInt(hour);

    sec++;

    if (sec >= 60) {
        sec = 0;
        min += 1;
    }

    if (hour >= 60) {
        min = 0;
        hour += 1;
    }

    if (sec <= 9) {
        sec = "0" + sec;
    }

    if (min <= 9) {
        min = "0" + min;
    }

    if (hour <= 9) {
        hour = "0" + hour;
    }

    countTime.innerHTML = hour + ":" + min + ":" + sec;
}

function updateMove() {
    moves++;
    countMoves.innerHTML = moves;
}
