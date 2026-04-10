let player = JSON.parse(localStorage.getItem("player"));

//display player info
function displayInfo(){
    document.getElementById("summaryName").textContent = player.name;
    document.getElementById("finalAge").textContent = player.age;
    document.getElementById("endReason").textContent = player.causeOfDeath;

    document.getElementById("happinessValue").textContent = player.stats.happiness;
    document.getElementById("wealthValue").textContent = player.stats.wealth;
    document.getElementById("healthValue").textContent = player.stats.health;
    document.getElementById("intelligenceValue").textContent = player.stats.intelligence;

    document.getElementById("happinessBar").value = player.stats.happiness;
    document.getElementById("wealthBar").value = player.stats.wealth;
    document.getElementById("healthBar").value = player.stats.health;
    document.getElementById("intelligenceBar").value = player.stats.intelligence;
}

//write the life summary for the player's life
function writeLifeSummary(){
    let text = "";
    //intelligence
    if(player.stats.intelligence > 80){
        text += "You were actually quite smart. Very Impressive!";
    }else if(player.stats.intelligence < 20){
        text += "Let's just say... you've made quite 'interesting' decisions.";
    }

    //health
    if(player.stats.health < 30){
        text += "Your health choices were... quite questionable.";
    }

    //wealth
    if(player.stats.wealth > 75){
        text+= "You managed to become quite rich. Not bad. ";
    }
    else if(player.stats.wealth < 25){
        text += "Money was not really your thing. At all. ";
    }

    //happiness
    if(player.stats.happiness > 70){
        text += "At least you were happy most of the time. ";
    }else if(player.stats.happiness < 25){
        text += "Happiness... was a rare guest in your life. ";
    }

    return text;
}

function createEnding(){
    let endings = [
        "Life is hard. You made it harder. ",
        "Maybe next time, avoid suspicious investments. ",
        "Your story will be remembered... probably for the wrong reasons.",
        "At least it wasn't boring at all.",
        "Some choices were definitely questionables."
    ];
    let randomNum = Math.floor(Math.random()*endings.length);
    return endings[randomNum];
}

function displaySummary(){
    let summaryText = writeLifeSummary();
    let ending = createEnding();

    document.getElementById("lifeSummary").textContent = summaryText;
    document.getElementById("ending").textContent = ending;
}

function saveToGraveyard(){
    let graveyard = JSON.parse(localStorage.getItem("graveyard")) || [];

    graveyard.push(
        {
            name: player.name,
            age: player.age,
            cause: player.causeOfDeath,
            summary: writeLifeSummary()
        }
    );

    localStorage.setItem("graveyard", JSON.stringify(graveyard));
}

function playAgain(){
    localStorage.removeItem("player");
    window.location.href = "create.html";
}

displayInfo();
displaySummary();
saveToGraveyard();

document.getElementById("playAgainBtn").addEventListener("click", playAgain);