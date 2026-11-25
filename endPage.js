var playerPosition = localStorage.getItem("playerPosition");
var bot1Position = localStorage.getItem("bot1Position");
var bot2Position = localStorage.getItem("bot2Position");

var playerPosition = Number(playerPosition);
var bot1Position = Number(bot1Position);
var bot2Position = Number(bot2Position);

let secondPlaceText = document.getElementById("secondPlace");
let thirdPlaceText = document.getElementById("thirdPlace");
let firstPlaceText = document.getElementById("firstPlace");

var first;
var second;
var third;

var firstScore;
var secondScore;
var thirdScore;

function hoverSize(element){
        element.style.transition = "transform 0.2s ease";

    element.style.transform = "scale(1.2)";
}
function returnNormal(element){
    element.style.transition = "transform 0.2s ease";
    element.style.transform = "scale(1)";
}

if (playerPosition >= bot1Position && playerPosition >= bot2Position){
    first = "Player";
    firstScore = playerPosition;
    if (bot1Position >= bot2Position){
        second = "Bot 1";
        third = "Bot 2";
        secondScore = bot1Position;
        thirdScore = bot2Position;
    }
    else {
        second = "Bot 2";
        third = "Bot 1";
        secondScore = bot2Position;
        thirdScore = bot1Position;
    }
}
if (bot1Position >= playerPosition && bot1Position >= bot2Position){
    first = "Bot 1";
    firstScore = bot1Position;
    if (playerPosition >= bot2Position){
        second = "Player";
        third = "Bot 2";
        secondScore = playerPosition;
        thirdScore = bot2Position;
    }
    else {
        second = "Bot 2";
        third = "Player";
        secondScore = bot2Position;
        thirdScore = playerPosition;
    }
}
if (bot2Position >= bot1Position && bot2Position >= playerPosition){
    first = "Bot 2";
    firstScore = bot2Position;
    if (playerPosition >= bot1Position){
        second = "Player";
        third = "Bot 1";
        secondScore = playerPosition;
        thirdScore = bot1Position;
    }
    else {
        second = "Bot 1";
        third = "Player";
        secondScore = bot1Position;
        thirdScore = playerPosition;
    }
}

firstPlaceText.innerText = first + "\n" + firstScore + "/30";
secondPlaceText.innerText = second + "\n" + secondScore + "/30";
thirdPlaceText.innerText = third + "\n" + thirdScore + "/30";