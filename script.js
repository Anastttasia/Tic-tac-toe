let stop = false;

let arrData = document.querySelectorAll("[data-num]");
let arr = [null, null, null, null, null, null, null, null, null];

let concat = (a, b, c) =>{
    let result = arr[a] + arr[b] + arr[c];

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

let changeColorAndStop = (a, b, c) => {
    arrData[a].style.color = "red";
    arrData[b].style.color = "red";
    arrData[c].style.color = "red";

    stop = true;
}

 addEventListener("click", function(event){
    if (event.target.className === "cell" && event.target.textContent === ""){
        event.target.style.color = "back";
        event.target.innerHTML = "x";

        arr[event.target.dataset.num] = "x";

        console.log(arr);
       
    }
    else{
        // return
    }


})