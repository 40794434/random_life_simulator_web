function getRandomNum(min,max){
    return Math.floor(Math.random()*(max-min+1))+min;
}

function getRandomGender(){
    let genders = ["female", "male"];
    let randomNum = Math.floor(Math.random()*genders.length);
    let genderResult = genders[randomNum];

    let image = document.getElementById("character-avatar");
    image.src = `images/${genderResult}_1.jpg`;
    return genderResult;
}
function generateRandomStats(){
    return{
        happiness: getRandomNum(10,90),
        health: getRandomNum(40,80),
        wealth: getRandomNum(10,90),
        intelligence: getRandomNum(10,90)
    };
}



let stats = generateRandomStats();
let gender = getRandomGender();

document.getElementById("gender").textContent = gender;
document.getElementById("happiness").textContent = stats.happiness;

document.getElementById("wealth").textContent = stats.wealth;

document.getElementById("health").textContent = stats.health;

document.getElementById("intelligence").textContent = stats.intelligence;

document.getElementById("beginGame").addEventListener("click", startLife);

// function changeAvatar(){
//     let image = document.getElementById("character-avatar");
//     let genderInput = document.getElementById("gender");
//     let gender = genderInput.value.toLowerCase();

//     image.src = `images/${gender}_1.jpg`;
//     print(image.src);
// }
// changeAvatar();
function startLife(){
    let nameInput = document.getElementById("Name").value;
    console.log(nameInput);

    if(nameInput === ""){
        alert("Please enter a name for your character!");
        return;
    }
    let player = {
        name: nameInput,
        gender: gender,
        age: 18,
        alive: true,
        stats: stats
    };
    console.log(player);
    localStorage.setItem("player", JSON.stringify(player));

    window.location.href = "game.html";
}

