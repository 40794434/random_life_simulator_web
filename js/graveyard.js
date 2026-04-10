let graveyard = JSON.parse(localStorage.getItem("graveyard"))||[];

function displayGraveyard(){
    let box = document.getElementById("graveContainer");

    box.innerHTML = "";

    if(graveyard.length === 0){
        box.innerHTML = "<p>No lives recorded yet... go live one first.</p>";
        return;
    }

    graveyard.forEach(person => {
        let card = document.createElement("div");
        card.classList.add("grave-card");

        card.innerHTML = `
        <h3>${person.name}</h3>
        <p>Lived to age ${person.age}</p>
        <p>Cause of death: ${person.cause}</p>
        <p>Life Summary: ${person.summary}</p>
        `;

        box.appendChild(card);
    });
}

//clear button
function clear(){
    localStorage.removeItem("graveyard");
    location.reload();
}
document.getElementById("clear").addEventListener("click",clear);

displayGraveyard();
