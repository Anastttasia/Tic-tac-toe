let isGameStopped = false;

let cellElementsArray = document.querySelectorAll("[data-num]");

let scoreBot = 0;
let scorePlayer = 0;

let playerFigure = 'x';
let botFigure = 'o';

let isBotTurn = false;


//STAFF
function clearGameCells() {
    for (var i = 0; i < cellElementsArray.length; i++) {
        cellElementsArray[i].textContent = null;
        cellElementsArray[i].style.color = "white";
    };
}

//конкатинация элементов массива cellElementsArray в строки
function concat(a, b, c) {
    let result = cellElementsArray[a].textContent + cellElementsArray[b].textContent + cellElementsArray[c].textContent;

    if (result === "xxx" || result === "ooo") {
        return result;
    }
}

function changeElementsColor(a, b, c) {

    cellElementsArray[a].style.color = "red";
    cellElementsArray[b].style.color = "red";
    cellElementsArray[c].style.color = "red";

}

// MODAL WINDOWS
function createChoiceWindow() {
    isGameStopped = true;
    let modalBG = document.createElement('div');
    modalBG.className = 'modalWindowBackground';

    let choiceContainer = document.createElement('div');
    choiceContainer.className = 'resultContainer';

    let textChoice = document.createElement('div');
    textChoice.className = 'textResult';
    textChoice.innerText = 'Выберите фигуру';
    textChoice.style.color = 'black';
    
    let  createFigureCross = document.createElement('div');
    createFigureCross.className = 'figuresModalWindow';
    createFigureCross.innerText = 'x';

    let createFigureZero = document.createElement('div');
    createFigureZero.className = 'figuresModalWindow';
    createFigureZero.innerText = 'o';

    let containerFigures = document.createElement('div');
    containerFigures.className = 'containerFigures';
    containerFigures.appendChild(createFigureCross);
    containerFigures.appendChild(createFigureZero);

    choiceContainer.appendChild(textChoice);
    choiceContainer.appendChild(containerFigures);

    modalBG.appendChild(choiceContainer);
    document.body.appendChild(modalBG);

    createFigureCross.addEventListener("click", function (event) {
        playerFigure = 'x';
        botFigure = 'o';
        isGameStopped = false;
        deleteResultModal()
    })
      

    createFigureZero.addEventListener("click", function (event) {  
        playerFigure = 'o';
        botFigure = 'x';
        isBotTurn = true;
        isGameStopped = false;
        deleteResultModal()
    })
    
}

function openResultWindow(winner) {

    let modalBackground = document.createElement('div');
    modalBackground.className = 'modalWindowBackground';

    let resultContainer = document.createElement('div');
    resultContainer.className = 'resultContainer';

    let textResult = document.createElement('div');
    textResult.className = 'textResult';
    textResult.innerText = "Победил : " + winner;
    textResult.style.color = "black";

    resultContainer.appendChild(textResult);

    let buttonAgain = document.createElement('button');
    buttonAgain.className = 'buttonAgain';
    buttonAgain.innerText = "Еще раз!";
    buttonAgain.addEventListener("click", restartGame);

    let buttonClose = document.createElement('button');
    buttonClose.className = 'buttonJustClose';
    buttonClose.innerText = "Просто закрыть";
    buttonClose.addEventListener("click", deleteResultModal);

    resultContainer.appendChild(buttonAgain);
    resultContainer.appendChild(buttonClose);
    
    modalBackground.appendChild(resultContainer);
    document.body.appendChild(modalBackground);
}

function deleteResultModal() {
    let modalWindow = document.querySelector('.modalWindowBackground');
    if (modalWindow) modalWindow.remove();   
}


//GAME LOGIC

function getWinner() {
    let result = '';

    for (let i = 0; i < 3; i++) {
        result = concat(i, i + 3, i + 6);

        if (result === "xxx") {
            changeElementsColor(i, i + 3, i + 6);
            return 'x';
        }

        if (result === "ooo") {
            changeElementsColor(i, i + 3, i + 6);
            return 'o';
        }
    }

    for (let i = 0; i <= 6; i += 3) {
        result = concat(i, i + 1, i + 2);

        if (result === "xxx") {
            changeElementsColor(i, i + 1, i + 2);
            return 'x';
        }

        if (result === "ooo") {
            changeElementsColor(i, i + 1, i + 2);
            return 'o';
        }
    }

    result = concat(0, 4, 8);
    if (result === "xxx") {
        changeElementsColor(0, 4, 8);
        return 'x';
    }

    if (result === "ooo") {
        changeElementsColor(0, 4, 8);
        return 'o';
    }

    result = concat(2, 4, 6);
    if (result === "xxx") {
        changeElementsColor(2, 4, 6);
        return 'x';
    }

    if (result === "ooo") {
        changeElementsColor(2, 4, 6);
        return 'o';
    }

    return '';

};

function checkEmptyFields() {
    var canMove = false;
    for (var i = 0; i < cellElementsArray.length; i++) {
        if (!cellElementsArray[i].textContent) {
            canMove = true;
            break;
        }
    }
    return canMove;
}

function setGameScore(winner) {

    if(winner == playerFigure) {
        scorePlayer = scorePlayer + 1;
    }
    else if(winner == botFigure) {
        scoreBot = scoreBot + 1;
    }
    let infoBlock = document.querySelector('.infoBlock');
    infoBlock.innerText = scorePlayer + ':' + scoreBot;

}

function botMove() {

    while (true) {
        randIndex = Math.floor(Math.random() * cellElementsArray.length);
        randElement = cellElementsArray[randIndex];
        if (randElement.textContent) continue;
        randElement.textContent = botFigure;
        break;
    }

    isBotTurn = false;
}

function restartGame() {
    deleteResultModal();
    clearGameCells();
    isGameStopped = false;
    createChoiceWindow();
}

//INIT GAME
createChoiceWindow();

for (var i = 0; i < cellElementsArray.length; i++) {

    cellElementsArray[i].addEventListener("click", function (event) {

        if (isGameStopped || isBotTurn) return;

        if (event.target.textContent) return;

        event.target.style.color = "white";
        event.target.textContent = playerFigure;
        isBotTurn = true;
    })
}

setInterval(function() {
    if (isGameStopped) return;

    let winner = getWinner();
    if (!checkEmptyFields() || winner != '') {
        isGameStopped = true;

        if (winner != '') { 
            setGameScore(winner);
            openResultWindow(winner);
        }
        else {
            openResultWindow('Ничья');
        }
    }

    if (isBotTurn && !isGameStopped) {
        botMove();
    }

}, 300);

