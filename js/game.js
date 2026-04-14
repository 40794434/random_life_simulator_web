let player = JSON.parse(localStorage.getItem("player"));
 console.log(player.alive);
let isMuted = false;
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
    {text: "You opened your phone for one quick check and somehow lost 2 hours of your life. No one knows where they went.", effects:{intelligence: -9, happiness: +5}},
    {text: "You bought something you didn't need but absolutely convinced yourself you did.", effects: {wealth: -10, happiness: +5}},
    {text: "You confidently explained something... and were completely wrong.", effects: {intelligence: -6, happiness:-5}},
    {text: "You watched an educational video and actually paid attention.", effects: {intelligence: +10}},
    {text: "You ate something that looked questionable. Your stomach has filed a complaint.", effects: {health: -10}},
    {text: "You decided to eat healthy this year. Your body is confused but grateful.", effects: {health: +10}},
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
    },
    {
        text: "While walking down the street, you spot a wallet lying on the ground. Nobody is around.",
        choices:[{
            text: "Return it like a hero",
            result: "The owner was very grateful and called you a 'rare human being'. You will remember this compliment forever. ",
            effects: {happiness: +20}
        },
        {
            text: "Take the money.",
            result: "You gained some cash, but every time you hear footsteps behind you... you panic a little.",
            effects: {wealth: +15, happiness: -8}
        }
        ]
    },
    {
        text: "A friend invites you out for a night of questionable decisions and expensive food.",
        choices:[
            {
                text: "Go out",
                result: "You laughed, ate too much, and then questioned your life choices at 2AM. Worth it.",
                effects: {happiness: +15, wealth: -15}
            },
            {
                text: "Stay at home. ",
                result: "You stayed at home, saved money, and watched videos you won't remember tomorrow.",
                effects: {wealth: +6, happiness: -9}
            }
        ]
    },
    {
        text: "You suddenly feel very motivated to improve your life.. which is suspicious.",
        choices: [
            {
                text: "Exercise",
                result: "You worked out and felt like a whole new person.",
                effects: {health: +15}
            },
            {
                text: "Take a nap instead",
                result: "You took a nap which is so powerful that it felt like time travel.",
                effects: {happiness: +10, health: -5}
            }
        ]
    },
    {
        text: "You made a mistake at work. It's small... for now. No one has noticed yet.",
        choices: [
            {
                text: "Fix it immediately",
                result: "You fixed it quietly. No one noticed. You feel like a secret genius.",
                effects: {intelligence: +10}
            },
            {
                text: "Ignore it and pray",
                result: "It came back later. Bigger. Worse.",
                effects: {happiness: -12, intelligence: -15}
            }
        ]
    },
    {
        text: "You see a massive online sale. Everything is '80% OFF'... including things you don't need.",
        choices:[
            {
                text: "Buy everything",
                result: "You now own things you didn't know existed. Your wallet is crying.",
                effects: {wealth: -20, happiness: +12}
            },
            {
                text: "Close the tab",
                result: "You resisted temptation. This is character development.",
                effects: {wealth: +6, intelligence: +15}
            }
        ]
    },
    {
        text: "A small stay cat looks at you like you are its last hope.",
        choices: [
            {
                text: "Adopt it",
                result: "It became your emotional support companion. You are now responsible.",
                effects: {happiness: +15, wealth: -6}
            },
            {
                text: "Walk away",
                result: "You walked away... but the guilt stayed with you.",
                effects: {happiness: -6}
            }
        ]
    }

];

let rareEvents = [
    {
        text: "You randomly became famous overnight.",
        effects: {happiness: +20, wealth: +15}
    },
    {
        text: "You won a lottery you don't remember entering.",
        effects: {wealth: +25}
    },
    {
        text: "You trusted a 'life hack' from online. It ruined your entire week. ",
        effects: {happiness: -15, intelligence: -5}
    },
    {
        text: "You tried a dangerous viral challenge. It did not go well.",
        death: "a completely avoidable internet challenge"
    },
    {
        text: "You accidentally sent your boss a meme... meant for your friend.",
        effects: {happiness: -20, wealth:-10}
    }
];

function getRandomEvents(){
    //5% chance for rare events
    if(Math.random()<0.05){
        let index = Math.floor(Math.random()*rareEvents.length);
        return rareEvents[index];
    }

    //for the normal events
    let num = Math.floor(Math.random()* events.length);
    return events[num];
}

function applyEvents(effects){
    let isDecrease = false;
    let isIncrease = false;

    for(let stat in effects){
        let change = effects[stat];

        player.stats[stat] += change;

        if(change > 0){
            isIncrease = true;
        }
        if(change < 0){
            isDecrease = true;
        }


        if(player.stats[stat] > 100){
            player.stats[stat] = 100;
        }
        if(player.stats[stat] < 0){
            player.stats[stat] = 0;
        }
    }

    if(isIncrease){
        playSound("increaseEffect");
    }
    else if(isDecrease){
        playSound("decreaseEffect");
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

    if(event.death){
        showPopup(event.text,[
            {
                text: "OK",
                action: function(){
                    endGame(event.death);
                }
            }
        ]);
        return;
    }
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
                                    event.text + "-> You chooses '" +
                                    choice.text + "' ->"+
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
    playSound("deathEffect");

    player.alive = false;
    player.causeOfDeath = reason;

    localStorage.setItem("player",JSON.stringify(player));
    setTimeout(()=>{
        window.location.href = "summary.html";
    }, 800);
}

let icon = document.getElementById("icon");

document.getElementById("muteBtn").addEventListener("click", function(){
    isMuted = !isMuted;
    if(isMuted){
        icon.classList.remove("fa-volume");
        icon.classList.add("fa-volume-off");
    }
    else{
        icon.classList.remove("fa-volume-off");
        icon.classList.add("fa-volume");
    }
});

function playSound(soundId){
    if(isMuted) return;

    let sound = document.getElementById(soundId);
    if(sound){
        sound.currentTime= 0;
        sound.play();
    }
}
displayInfo();




