var pos = 0;
var bot1pos = 0;
var bot2pos = 0;
var chance = 0;
var playerWon = false;
var hasLost = false;
var i = 0;

var corners = [{top:"10px",left:"10px"},
    {top:"10px",right:"10px"},
    {bottom:"10px",left:"10px"},
    {bottom:"10px",right:"10px"},
]

var candies = ["https://staging.svgrepo.com/show/396012/chocolate-bar.svg", "https://images.vexels.com/media/users/3/151764/isolated/preview/92d2906e912546f5bdac53c1f6370385-gumdrop-candy-icon.png", "https://cdn-icons-png.flaticon.com/512/290/290412.png", "https://cdn-icons-png.flaticon.com/512/119/119538.png"];

var specialSpaces = {5: -3,
    12:-4,
    18: 5,
    23: -8,
    27: 2,
}

let player = document.getElementById("playerPieceDiv");
let bot1 = document.getElementById("bot1Div");
let bot2 = document.getElementById("bot2Div");

document.body.addEventListener("keydown", rollDice);
document.body.addEventListener("keyup", obliterateDice);

//creating squares and giving random colors
for (i =0; i < 30; i++){
    let square = document.createElement("div");
    square.setAttribute("id", "square"+i);
    board.appendChild(square);
    var randomColor = getRandomColor();
    var text = document.createElement("p");
    text.innerHTML = i;
    text.style.position = "absolute";
    square.appendChild(text);
    square.setAttribute("style","justify-content: center;  position: relative; align-items: center;display: flex;border-radius:10px; height: 150px; width:150px; background-color: " + randomColor);
    randomCandy("square"+i);
    if (specialSpaces[i] !== undefined){
        let currentSquare = document.getElementById("square" + i);
        currentSquare.style.border = "5px";
        currentSquare.style.borderStyle = "solid";
        currentSquare.style.borderColor = "gold";
    }
}

function isItSpecial(position, character){
    if (specialSpaces[position] !== undefined){
    let movement = specialSpaces[position];
    let characterName = "Player";
    if (character == bot1){
        characterName = "Bot 1";
    }
    else if (character == bot2){
        characterName = "Bot 2";
    }
    if (movement > 0){
        alert("Special Space landed on!! " + characterName + " moves forward " + movement + " spaces!!");
    }
    else {
        alert("Special Space landed on!! " + characterName + " moves backward " + Math.abs(movement) + " spaces...");
    }
    position = position + movement;
    if (position >= 30){
        winBox.appendChild(character);
        position = 30;
    }
    else{
        document.getElementById("square" + pos).appendChild(character);
    }
    }
    return position;
}

let winBox = document.createElement("div");
winBox.setAttribute("id", "square30");
board.appendChild(winBox);
winBox.setAttribute("style", "position: relative");
winBox.innerHTML = "WIN!";

function randomCandy(element){
    let cornerChance = (Math.floor(Math.random()*4));
    let candyChance = (Math.floor(Math.random()*4));
    let chosenCandy = candies[candyChance];
    let chosenCorner = corners[cornerChance];
    let candy = document.createElement("img")
    candy.src = chosenCandy;
    candy.style.position = "absolute";
    candy.style.height = "50px";
    candy.style.width = "50px";
    candy.style.zIndex = "998";
    Object.assign(candy.style, chosenCorner);
    document.getElementById(element).appendChild(candy);
}


function getRandomColor(){
    var letters = '0123456789ABCDEF';
    var color = '#';
    for (var i = 0; i < 6; i++){
        color += letters[Math.floor(Math.random()*16)];
    }
    return color;
}

let start = document.getElementById("square0");
start.appendChild(player);
start.appendChild(bot1);
start.appendChild(bot2);

function randomSelector(square){ 
    var selectedColor = getRandomColor(); 
    square.style.backgroundColor = selectedColor;
}

function rollDice(e){
    if (e.key == "e" || e.key == "E"){
        let diceCount = document.querySelectorAll("#diceImage")
        if (diceCount.length < 1) {
        //Dice creation
        let dice = document.createElement("img");
        dice.src = "https://cdn.pixabay.com/animation/2024/10/29/00/46/00-46-41-84_512.gif";
        dice.setAttribute("style", "height: 500px; width: 500px; position:absolute;");
        dice.style.top = "200px";
        dice.style.left = "700px";
        dice.style.zIndex = "10000";
        dice.setAttribute("id", "diceImage");
        let controlText = document.getElementById("controls");
        document.body.insertBefore(dice, controlText );
        console.log("dice added");
        let outcome = document.getElementById("outcomeTitle");
        outcome.remove();
        }
    }
}
function obliterateDice(e){
    if (e.key == "e" || e.key == "E"){
        let dice = document.getElementById("diceImage");
        dice.remove();

        let outcomeCount = document.querySelectorAll("#outcomeTitle");
            if (outcomeCount.length < 1){
            var chance  = Math.floor((Math.random()*6)+1);
            let targetPos = pos + chance;
            while (pos <targetPos && pos < 30){
                pos++;
                let crossingSquare = document.getElementById("square" + pos);
                crossingSquare.appendChild(player)
            }
            pos = isItSpecial(pos, player);

            if (pos >= 30 && playerWon == false){
                winBox.appendChild(player);
                if (hasLost == false){
                alert("YOU WIN!!!!!");
                localStorage.setItem("playerPosition", pos);
            localStorage.setItem("bot1Position", bot1pos);
            localStorage.setItem("bot2Position", bot2pos);

            window.location.href = "winPage.html"

                winInterval = setInterval (function(){
                    for (let x = 0; x < 30; x++){
                        randomSelector(document.getElementById("square" + x));
                    }
                }, 200);
                }
                playerWon = true;
            }
            else{
            let currentSquare = document.getElementById("square"+pos);
            currentSquare.appendChild(player);
            }
            if (pos < 30){
            botsMove();
            }
        console.log(chance);
        console.log(pos);

        let outcome  = document.createElement("h2");
        outcome.innerHTML = "You rolled a... " + chance;
        let controlText = document.getElementById("controls");
        document.body.insertBefore(outcome, controlText );
        outcome.setAttribute("style", "background-color:  rgb(255, 255, 255); width: fit-content");
        outcome.setAttribute("id", "outcomeTitle");
            }
    }
}
function botsMove(){
    chance  = Math.floor((Math.random()*6)+1);
    bot1pos = bot1pos + chance;
    bot1pos = isItSpecial(bot1pos, bot1);
    chance  = Math.floor((Math.random()*6)+1);
    bot2pos = bot2pos + chance;
    bot2pos = isItSpecial(bot2pos, bot2);
    if (bot1pos >= 30){
            winBox.appendChild(bot1);
            bot1pos = 30;
            if (hasLost == false && playerWon == false){
            alert("You lose...");
            //https://www.csestack.org/javascript-localstorage-pass-data-web-page/
            localStorage.setItem("playerPosition", pos);
            localStorage.setItem("bot1Position", bot1pos);
            localStorage.setItem("bot2Position", bot2pos);

            window.location.href = "losePage.html"
            }
            hasLost = true;
        }
            else{
            let currentSquare = document.getElementById("square"+bot1pos);
            currentSquare.appendChild(bot1);
            }
    if (bot2pos >= 30){
            winBox.appendChild(bot2);
            bot2pos = 30;
            if (hasLost == false && playerWon == false){
            alert("You lose...");
            //https://www.csestack.org/javascript-localstorage-pass-data-web-page/
            localStorage.setItem("playerPosition", pos);
            localStorage.setItem("bot1Position", bot1pos);
            localStorage.setItem("bot2Position", bot2pos);

            window.location.href = "losePage.html"
            }
            hasLost = true;
        }
    else{
        let currentSquare = document.getElementById("square"+bot2pos);
        currentSquare.appendChild(bot2);
        }
}

function resetBoard(){
    bot1pos = 0;
    bot2pos = 0;
    pos = 0;
    let start = document.getElementById("square0");
    start.appendChild(player);
    start.appendChild(bot1);
    start.appendChild(bot2);
    hasLost = false;
    playerWon = false;
    clearInterval(winInterval);
}
