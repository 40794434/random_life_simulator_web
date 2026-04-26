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
    changeAvatar();
}
function changeAvatar(){
    let image = document.getElementById("gameAvatar")
    let gender = player.gender.toLowerCase();
    let age = player.age;

    let stage = ""
    if(age >= 18 && age <= 29){
        stage = "1";
    }
    else if(age <= 55){
        stage = "2"
    }else{
        stage = "3"
    }
    image.src = `images/${gender.toLowerCase()}_${stage}.jpg`
}
let events = [
    //for 18-29
    {text: "You tried a new diet where you only eat air. Surprisingly effective? Not really.", maxAge: 29, effects: {health: -10, happiness: -5}},
    {text: "You attempted to cook yourself a fancy meal. The fire department now knows your name.", maxAge: 29, effects: {health: -5, wealth: -30, intelligence: +5}},
    {text: "You won a lifetime supply of potato chips. Your body is not ready. ",maxAge: 29, effects: {happiness: +20, health: -8}},
    {text: "You found out that 'free trial' means 'give us your credit card'. You feel betrayed. ", maxAge: 29,effects: {happiness: -12, intelligence: +10}},
    {text: "You successfully parallel parked on the first try. A miracle.",maxAge: 29,effects: {happiness: +15, intelligence: +5}},
    {text: "You realized that you're the 'weird one' in your friend group.", maxAge: 29,effects: {happiness: +10, intelligence:-2}},
    {text: "You accidentally joined a book club. Turns out, you loved reading! You've been missing out on so much interesting things.", maxAge: 29,effects: {intelligence: +10, happiness: +12}},
    {text: "You reconnected with an old friend over coffee. You spent three hours laughing about stupid things you did in school.", maxAge: 29, effects: {happiness: +25}},
    {text: "You helped a friend move apartments. They bought you pizza and beer. Your back hurts but your heart is full", maxAge: 29, effects:{happiness:+15, health: -3, wealth: +15}}, 
    {text: "You opened your phone for one quick check and somehow lost 2 hours of your life. No one knows where they went.", maxAge: 29, effects:{intelligence: -9, happiness: +5}},
    {text: "You bought something you didn't need but absolutely convinced yourself you did.", maxAge: 29,effects: {wealth: -10, happiness: +5}},
    {text: "You confidently explained something... and were completely wrong.",maxAge: 29, effects: {intelligence: -6, happiness:-5}},
    {text: "You watched an educational video and actually paid attention.",maxAge: 29, effects: {intelligence: +10}},
    {text: "You ate something that looked questionable. Your stomach has filed a complaint.", maxAge: 29,effects: {health: -10}},
    {text: "You stayed up all night watching random videos.", maxAge: 29,effects: { health: -15 } },
    {text: "You learned something new.", maxAge: 29,effects: { intelligence: +8 } },
    {text: "You accidentally sent a message to the wrong person. Social life damaged.",maxAge: 29, effects: { happiness: -10 } },
    {
        text: "A 'friend' offers you a totally legit investment. Definitely not a scam.",
        maxAge: 29, 
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
        maxAge: 29, 
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
        maxAge: 29, 
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
        text: "You see a massive online sale. Everything is '80% OFF'... including things you don't need.",
        maxAge: 29, 
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
    //for 30-55
    {text: "You decided to eat healthy this year. Your body is confused but grateful.", minAge: 30, maxAge: 55, effects: {health: +10}},
    {text: "You found money on the street.", minAge: 30, maxAge: 55, effects: { wealth: +10, happiness: +5} },
    {text: "You bought a lottery ticket. You didn't win. But 'maybe next time' keeps you going.", minAge: 30, maxAge: 55, effects: {wealth: -2, happiness:+5}},
    {text: "You found an old diary. Past you was very dramatic.", minAge: 30, maxAge: 55, effects: {happiness: + 5, intelligence: +3}},
    {text: "You finally understood a meme. It's no longer funny. You're old now.", minAge: 30, maxAge: 55, effects: {happiness: -8, intelligence: +10}},
    {text: "You googled 'how to be an adult' again. The answer is still 'We don't know either.'", minAge: 30, maxAge: 55, effects: {intelligence: +5, happiness: -5}},
    {text: "You bought a vaccum cleaner and got genuinely excited to tidy up.", minAge: 30, maxAge: 55, effects:{happiness: +10, wealth: -10, intelligence: +5}},
    {text: "You complained about teenagers being too loud. The transformation is complete.", minAge: 30, maxAge: 55, effects: {happiness: -2, intelligence: +5}},
    {text: "Your back hurts for literally no reason. The doctor says it's being 30+", minAge: 30, maxAge: 55, effects: {health: -10, happiness: -7}},
    {text: "You finally understands why your parents hated your music. It's called perspective.", minAge: 30, maxAge: 55, effects: {happiness: +5, intelligence: +4}},
    {text: "You forgot your own phone number. For a solid minute, you were lost.", minAge: 30, maxAge: 55, effects: {intelligence: -8, happiness: -8}},
    {text: "You saw someone famous in public. You played it cool, then texted everyone.", minAge: 30, maxAge: 55, effects: {happiness: +20}},
    
    {
        text: "You found a lump. It's probably nothing. Probably.",
        minAge: 30, maxAge: 55, 
        choices: [
            {
                text: "Go to the doctor",
                result: "It was nothing. You wasted a day but gained peace of mind.",
                effects: {health: +5, happiness: +10, wealth: -25}
            },
            {
                text: "Ignore",
                result: "It was nothing. But now you're paranoid about everything.",
                effects: {happiness: -15, intelligence: -5, health: -3}
            }
        ]
    },
    {
        text: "Your childhood friend wants to start a business together. It's a 'sure thing.'",
        minAge: 30, maxAge: 55, 
        choices: [
            {
                text: "Invest",
                result: "The business failed. The friendship survived. Barely.",
                effects: {wealth: -35, happiness: -10, intelligence: -8}
            },
            {
                text: "Politely decline",
                result: "They started without you and also failed. You dodged a bullet.",
                effects: {happiness: +10, intelligence: +10}
            }
        ]
    },
    {
        text: "You suddenly feel very motivated to improve your life.. which is suspicious.",
        minAge: 30, maxAge: 55, 
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
        minAge: 30, maxAge: 55, 
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
        text: "A small stay cat looks at you like you are its last hope.",
        minAge: 30, maxAge: 55, 
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
    },
    //56-80
    {text: "You saved a paper bag 'just in case'. It's your most prized possession now.", minAge: 56, effects: {happiness: +5, intelligence: +4}},
    {text: "You decided to take better care of your health.", minAge: 56, effects: {health: +10}},
    {text: "You went to bed at 7PM voluntarily. You woke up at 4AM. This is fine.", minAge: 56, effects: {health: +5, happiness: -5}},
    {text: "You tried to use a modern app. You accidentally called your grandson seven times.", minAge: 56, effects: {intelligence: -10, happiness: -12}}, 
    {text: "You complained that 'things were better in the old days.' No one disagreed. They just nodded sadly.", minAge: 56, effects: {happiness: -5, intelligence: +3}},
    {text: "You gave unsolicited advice to a stranger. They actually listened. Power.", minAge: 56, effects: {happiness: +12, intelligence: +3}},
    {text: "You discovered that napping is not a hobby, it's a lifestyle. And you love it.", minAge: 56, effects: {health: +5, happiness: +12}},
    {text: "You told the same story three times to the same person. They were too polite to stop you. ", minAge: 56, effects: {intelligence: -8, happiness: -4}}, 
    {
        text: "Someone asks for directions. You have lived here for 40 years and still don't know.",
        minAge: 56, 
        choices: [
            {
                text: "Give wrong directions confidently",
                result: "They'll figure it out eventually. Probably.",
                effects: {happiness: +5, intelligence: -10}
            },
            {
                text: "Admit you don't know",
                result: "You both pull out phones. Technology saves the day.",
                effects: {happiness: +3, intelligence: +5}
            }
        ]
    },

    {
        text: "You found an old love letter from decades ago. The memories rush back.",
        minAge: 56, 
        choices: [
            {
                text: "Reach out to them",
                result: "They're married with grandchildren. Awkward phone call. Regret.",
                effects: {happiness: -15, health: -5}
            },
            {
                text: "Keep the letter as a memory",
                result: "You smile and put it away. Some doors should stay closed.",
                effects: {happiness: +7, intelligence: +5}
            }
        ]
    },

    {
        text: "Your neighbour keeps asking for sugar. Every day. It's been six months.",
        minAge: 56, 
        choices: [
            {
                text: "Keep giving sugar",
                result: "You're their sugar provider now. This is your identity.",
                effects: {happiness: -5, wealth: -8}
            },
            {
                text: "Confront them",
                result: "They cry. You feel terrible. You give them more sugar.",
                effects: {happiness: -12, health:-5, wealth: -5}
            }
        ]
    },
    {
        text: "The new 'smart TV' is confusing you. There are too many buttons.",
        minAge: 56, 
        choices: [
            {
                text: "Call your grandkid for help",
                result: "They fixed it in 10 seconds. You feel ancient. ",
                effects: {happiness: +5, intelligence: -5}
            },
            {
                text: "Figure it out yourself",
                result: "You accidentally bought a movie. You don't know how. Help.",
                effects: {happiness: -12, intelligence:-8, wealth: -12}
            }
        ]
    },
    {
        text: "Your doctor says you need to exercise more. You'd rather not.",
        minAge: 56, 
        choices: [
            {
                text: "Join a senior yoga class",
                result: "You fell asleep during meditation. The instructor was offended.",
                effects: {happiness: +5, wealth: -12, health: +8}
            },
            {
                text: "Just walk more",
                result: "You walk to the mailbox and back. Doctor says 'try harder.'",
                effects: {happiness: -2, health: +3}
            }
        ]
    },
    {
        text: "Your grandchild asks to borrow money for 'a new phone.' You remember when phones were attached to walls.",
        minAge: 56, 
        choices: [
            {
                text: "Give them the money",
                result: "They thank you. Then they never call you.",
                effects: {happiness: -8, wealth: -25}
            },
            {
                text: "Say no and tell a long story instead",
                result: "They pretend to listen. You both learn something about patience.",
                effects: {happiness: +10, intelligence: -3}
            }
        ]
    },
     {
        text: "Your retirement hobby is getting out of hand. The garage is full of... something.",
        minAge: 56, 
        choices: [
            {
                text: "Sell everything online.",
                result: "You made some money. Mostly you made the garage emptier.",
                effects: {happiness: +8, wealth: +18, health: +5}
            },
            {
                text: "Keep collecting",
                result: "The garage is now a hoarder museum. You are the exhibit.",
                effects: {happiness: +5, wealth: -15, health: -8}
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
        text: "You tried to pet a wild raccoon. It was not friendly. It had opinions.",
        death: "An Overly Optimistic Wildlife Encounter"
    },
    {
        text: "You wanted to see if a fork in the microwave would really cause a problem. It did.",
        death: "a scientific experiment gone wrong"
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
    //for normal events
    //events filter by age
    let validEvents = events.filter(event=>{
        if(!event.minAge && !event.maxAge) return true;

        return player.age >= (event.minAge || 0) &&
               player.age <= (event.maxAge || 100);
    });

    if(validEvents.length===0){
        return events[Math.floor(Math.random()* events.length)];
    }
    return validEvents[Math.floor(Math.random()* validEvents.length)]    
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

function getStatsChangeText(effects){
    let text = "";

    for(let stat in effects){
        let value = effects[stat];
        let sign = value > 0 ? "+" : "";

        text += `${stat.toUpperCase()} ${sign} ${value}\n`;
    }

    return text;
}
function addToEventHistory(text){
    let history = document.getElementById("eventHistory");

    let newEvent = document.createElement("p");
    newEvent.innerHTML = "Age "+ player.age + ":<br> "+ text.replace(/\n/g, "<br>");

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
                                let statText = getStatsChangeText(choice.effects);

                                showPopup(statText,[
                                    {
                                        text: "OK",
                                        action: function(){
                                            applyEvents(choice.effects);

                                            addToEventHistory(
                                                event.text + "\n" +
                                                "Choice: "+choice.text + "\n"+
                                                "Result: "+choice.result
                                            );

                                            hidePopup();
                                            document.getElementById("nextYearBtn").disabled = false;
                                            afterEvent();
                                        }
                                    }
                                ])
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
        //first popup
        showPopup(event.text,[
            {
                text: "OK",
                action: function(){

                //second popup
                    let statText = getStatsChangeText(event.effects);
                    showPopup(statText, [
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
                    ]);
                }
            }
        ]);
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




