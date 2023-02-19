let stop = false;
let resultGameText = 0;
let arrData = document.querySelectorAll("[data-num]");

let resultGame = document.querySelector('.container');

let divParent = document.createElement('div');
let textResult = document.createElement('div');
let buttonAgain = document.createElement('button');

textResult.innerText = "Тут будет результат";
buttonAgain.innerText = "Еще раз!";

divParent.appendChild(buttonAgain);
divParent.appendChild(textResult);

resultGame.appendChild(divParent);

function restart() {
    for (var i = 0; i < arrData.length; i++) {
        arrData[i].textContent = null;
        arrData[i].style.color = "black";
    };
    stop = false;
    textResult.innerText = "Тут будет результат";
}

buttonAgain.addEventListener("click", restart)

//конкатинация элементов массива arr в строки
let concat = (a, b, c) => {
    let result = arrData[a].textContent + arrData[b].textContent + arrData[c].textContent;

    if (result === "xxx" || result === "ooo") {
        return result;
    }

    switch (result) {
        case "xxnull":
            return ["x", c];

        case "xnullx":
            return ["x", b];

        case "nullxx":
            return ["x", a];

        case "oonull":
            return ["o", c];

        case "onullo":
            return ["o", b];

        case "nulloo":
            return ["o", a];
    }
}

let changeColorAndStop = (a, b, c, winner) => {
    
    arrData[a].style.color = "red";
    arrData[b].style.color = "red";
    arrData[c].style.color = "red";

    stop = true;
    textResult.innerText = "Победил : " + winner;
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
        randElement.textContent = "o"
        break;
    };

    return canMove;
};


for (var i = 0; i < arrData.length; i++) {
    arrData[i].addEventListener("click", function (event) {

        if (stop === true) {
            return
        }
    
        if (event.target.textContent) return;

        if (event.target.className === "cell" && event.target.textContent === "") {
            event.target.style.color = "back";
            event.target.textContent = "x";  
        }
    
        checkWin();
    
        if (stop === true) {
            return
        }
    
        botMove();
        checkWin();
    
    })
};

