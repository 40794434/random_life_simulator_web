let player = JSON.parse(localStorage.getItem("player"));
 console.log(player.alive);
function displayInfo(){
    document.getElementById("nameDisplay").textContent = player.name;
    document.getElementById("ageDisplay").textContent = player.age;
    
    document.getElementById("happinessValue").textContent = player.stats.happiness;
    document.getElementById("wealthValue").textContent = player.stats.wealth;
    document.getElementById("healthValue").textContent = player.stats.health;
    document.getElementById("intelligenceValue").textContent = player.stats.intelligence;

    document.getElementById("happinessBar").value = player.stats.happiness;
    document.getElementById("wealthBar").value = player.stats.wealth;
    document.getElementById("healthBar").value = player.stats.health;
    document.getElementById("intelligenceBar").value = player.stats.intelligence;
}

let events = [
    { text: "You found money on the street.", effects: { wealth: +10 } },
    { text: "You got sick.", effects: { health: -15 } },
    { text: "You learned something new.", effects: { intelligence: +8 } },
    { text: "You had a great day!", effects: { happiness: +10 } }
];

function getRandomEvents(){
    let num = Math.floor(Math.random()* events.length);
    return events[num];
}

function applyEvents(effects){
    for(let stat in effects){
        player.stats[stat] += effects[stat];

        if(player.stats[stat] > 100){
            player.stats[stat] = 100;
        }
        if(player.stats[stat] < 0){
            player.stats[stat] = 0;
        }
    }
}

function addToEventHistory(text){
    let history = document.getElementById("eventHistory");

    let newEvent = document.createElement("p");
    newEvent.textContent = "Age "+ player.age + ": "+ text;

    history.prepend(newEvent);

}

document.getElementById("nextYearBtn").addEventListener("click", goNextYear);


function goNextYear(){
    player.age++;
    player.alive = true;
    let event = getRandomEvents();
    document.getElementById("eventText").textContent = event.text;

    applyEvents(event.effects);
    addToEventHistory(event.text);
    checkDeath();
    displayInfo();

    localStorage.setItem("player", JSON.stringify(player));
}
function checkDeath(){
    if(player.stats.health < 20){
        endGame("Poor Health");
    }
    else if(player.age > 85){
        endGame("Old age");
    }
}

function endGame(reason){
    player.alive = false;
    player.causeOfDeath = reason;

    localStorage.setItem("player",JSON.stringify(player));
    window.location.href = "summary.html";
}
displayInfo();




