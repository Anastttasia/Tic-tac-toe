let coll = document.getElementsByClassName('buttonExercise');

for(let i = 0; i < coll.length; i++){
    coll[i].nextElementSibling.style.display = "none";
    coll[i].addEventListener('click', function(event) {
        let clickedButton = event.target;
        let contentElement = event.target.nextElementSibling;

        if(contentElement.style.display == "none") {
            contentElement.style.display = "block";
            clickedButton.innerText = ' ^ Свернуть';
        }
        else {
            contentElement.style.display = "none";
            clickedButton.innerText = 'v Задание';
        }
    })



}