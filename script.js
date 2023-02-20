let isGameStopped = false;

let arrData = document.querySelectorAll("[data-num]");


let playerFigure = 'x';
let botFigure = 'o';




let choiceFigure = () =>{
    let modalBack = document.createElement('div');
    modalBack.className = 'modalWindowBackground';

    let choiceContainer = document.createElement('div');
    choiceContainer.className = 'resultContainer';

    let textChoce = document.createElement('div');
    textChoce.className = 'textResult';
    textChoce.innerText = 'Выберите фигуру';
    
    let cross = document.createElement('div');
    cross.className = 'figursModalWindow';
    cross.innerText = 'x';

    let zero = document.createElement('div');
    zero.className = 'figursModalWindow';
    zero.innerText = 'o';

    let contaonerFigure = document.createElement('div');
    contaonerFigure.className = 'contaonerFigure';
    contaonerFigure.appendChild(cross);
    contaonerFigure.appendChild(zero);

    choiceContainer.appendChild(textChoce);
    choiceContainer.appendChild(contaonerFigure);

    modalBack.appendChild(choiceContainer);
    document.body.appendChild(modalBack);

    cross.addEventListener("click", deleteResultModal)
      

    if(zero.addEventListener("click", deleteResultModal)){
        playerFigure = 'o';
        botFigure = 'x';
    }
    
}

choiceFigure();

function clearGameCells() {
    for (var i = 0; i < arrData.length; i++) {
        arrData[i].textContent = null;
        arrData[i].style.color = "black";
    };
}


//конкатинация элементов массива arrData в строки
let concat = (a, b, c) => {
    let result = arrData[a].textContent + arrData[b].textContent + arrData[c].textContent;

    if (result === "xxx" || result === "ooo") {
        return result;
    }
}

let changeColorAndStop = (a, b, c, winner) => {

    arrData[a].style.color = "red";
    arrData[b].style.color = "red";
    arrData[c].style.color = "red";

    isGameStopped = true;

    openModalWindow(winner);
}

let checkWin = () => {
    for (let i = 0; i < 3; i++) {
        let result = concat(i, i + 3, i + 6);

        if (result === "xxx") {
            changeColorAndStop(i, i + 3, i + 6, 'X');
        }
        if (result === "ooo") {
            changeColorAndStop(i, i + 3, i + 6, 'O');
        }
    }

    for (let i = 0; i <= 6; i += 3) {
        let result = concat(i, i + 1, i + 2);
        if (result === "xxx") {
            changeColorAndStop(i, i + 1, i + 2, 'X');
        }
        if (result === "ooo") {
            changeColorAndStop(i, i + 1, i + 2, 'O');
        }
    }

    result = concat(0, 4, 8);
    if (result === "xxx") {
        changeColorAndStop(0, 4, 8, 'X');
    };
    if (result === "ooo") {
        changeColorAndStop(0, 4, 8, 'O');
    };

    result = concat(2, 4, 6);
    if (result === "xxx") {
        changeColorAndStop(2, 4, 6, 'X');
    };
    if (result === "ooo") {
        changeColorAndStop(2, 4, 6, 'O');
    };
};

function botMove() {

    var canMove = false;

    for (var i = 0; i < arrData.length; i++) {
        if (!arrData[i].textContent) {
            canMove = true;
            break;
        }
    };

    while (canMove) {
        randIndex = Math.floor(Math.random() * arrData.length);
        randElement = arrData[randIndex];
        if (randElement.textContent) continue;
        randElement.textContent = botFigure;
        break;
    };

    return canMove;
};

function restartGame() {
    deleteResultModal();
    clearGameCells();
    isGameStopped = false;
}

// MODAL WINDOWS
function openModalWindow(winner) {

    let modalBackground = document.createElement('div');
    modalBackground.className = 'modalWindowBackground';

    let resultContainer = document.createElement('div');
    resultContainer.className = 'resultContainer';

    let textResult = document.createElement('div');
    textResult.className = 'textResult';
    textResult.innerText = "Победил : " + winner;

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
    modalWindow.remove();   
}




//INIT GAME
for (var i = 0; i < arrData.length; i++) {

    arrData[i].addEventListener("click", function (event) {

        if (isGameStopped) return;

        if (event.target.textContent) return;

        event.target.style.color = "black";
        event.target.textContent = playerFigure;

        checkWin();

        if (isGameStopped) return;

        botMove();
        checkWin();

    })
};

