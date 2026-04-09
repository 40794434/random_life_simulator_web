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
    { text: "You found money on the street.", effects: { wealth: +10, happiness: +5} },
    { text: "You stayed up all night watching random videos.", effects: { health: -15 } },
    { text: "You learned something new.", effects: { intelligence: +8 } },
    { text: "You accidentally sent a message to the wrong person. Social life damaged.", effects: { happiness: -10 } },
    {
        text: "A 'friend' offers you a totally legit investment. Definitely not a scam.",
        choices:[
            {
                text: "Invest it",
                result: "Congratulations, you have successfully donated your money.",
                effects: {wealth: -25, intelligence: +5}
            },
            {
                text: "No thanks",
                result: "You successfully avoided financial disaster. Your future self is proud.",
                effects: {intelligence: +15}
            }
        ]
    }

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

function showPopup(text, buttons){
    let popup = document.getElementById("eventPopUp");
    let popupText = document.getElementById("modalText");
    let popupBtns = document.getElementById("modalBtns");

    popupText.textContent = text;
    popupBtns.innerHTML = "";

    buttons.forEach(btn => {
        let button = document.createElement("button");
        button.textContent = btn.text;
        button.addEventListener("click",btn.action);
        popupBtns.appendChild(button);
    });
    popup.classList.remove("hidden");
}

function hidePopup(){
    document.getElementById("eventPopUp").classList.add("hidden");
}

function afterEvent(){
    checkDeath();
    displayInfo();

    localStorage.setItem("player", JSON.stringify(player));
}

document.getElementById("nextYearBtn").addEventListener("click", goNextYear);


function goNextYear(){
    player.age++;
    // player.alive = true;
    let event = getRandomEvents();

    //disable button during popup
    document.getElementById("nextYearBtn").disabled=true;
    //if the events have choices feature
    if(event.choices){
        showPopup(event.text, event.choices.map(choice=>(
            {
                text: choice.text,
                action: function(){
                    //result after choosing
                    showPopup(choice.result,[
                        {
                            text: "OK",
                            action: function(){
                                applyEvents(choice.effects);

                                addToEventHistory(
                                    event.text + "->" +
                                    choice.text + "->"+
                                    choice.result
                                );

                                hidePopup();
                                document.getElementById("nextYearBtn").disabled = false;
                                afterEvent();
                            }
                        }
                    ])
                }
            }
        )

        ))
    }
    //if the events do not have choices feature (simple events)
    else{
        showPopup(event.text,[
            {
                text: "OK",
                action: function(){
                    applyEvents(event.effects);
                    addToEventHistory(event.text);
                    hidePopup();
                    document.getElementById("nextYearBtn").disabled = false;
                    afterEvent();
                }
            }
        ])
    }

    
}
function checkDeath(){
    if(player.stats.health < 20){
        endGame("Your body gave up on your questionable life choices");
    }
    else if(player.age > 85){
        endGame("Old age (U actually made it, impressive!)");
    }
}

function endGame(reason){
    player.alive = false;
    player.causeOfDeath = reason;

    localStorage.setItem("player",JSON.stringify(player));
    window.location.href = "summary.html";
}
displayInfo();




