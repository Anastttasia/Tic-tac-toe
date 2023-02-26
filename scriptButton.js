let coll = document.getElementsByClassName('buttonExercise');
let navigation = document.getElementsByClassName('buttonNavgation');
let contentElements = document.getElementsByClassName('visibleContainer');

for (let i = 0; i < coll.length; i++) {
    coll[i].nextElementSibling.style.display = "none";
    coll[i].addEventListener('click', function (event) {
        let clickedButton = event.target;
        let contentElement = event.target.nextElementSibling;

        if (contentElement.style.display == "none") {
            contentElement.style.display = "block";
            clickedButton.innerText = ' ^ Свернуть';
        }
        else {
            contentElement.style.display = "none";
            clickedButton.innerText = 'v Задание';
        }
    })
}

for (let i = 0; i < navigation.length; i++) {
    if (i != 0) contentElements[i].style.display = "none";
    navigation[i].addEventListener('click', function (event) {

        let navigationElements = document.getElementsByClassName('buttonNavgation');
        let contentElements = document.getElementsByClassName('visibleContainer');
        let clickedElement = event.target;

        for (let j = 0; j < navigationElements.length; j++) {
            if (clickedElement === navigationElements[j]) {
                contentElements[j].style.display = "block";
            }
            else {
                contentElements[j].style.display = "none";
            }
        }
    })
}