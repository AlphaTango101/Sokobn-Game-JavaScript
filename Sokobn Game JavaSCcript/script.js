oldPosition = "30/20";

function addDivElements(){
    for (let i = 0; i < 629; i++)
    {
        let newDiv = document.createElement("div");
        newDiv.setAttribute("id", determineIdValue(i));
        document.getElementById("container").appendChild(newDiv);
    }
}

function spawnObjectivesAndObjects(){
    changeColour("36/12", "purple")
    changeColour("26/22", "purple")
    changeColour("11/11", "purple")
    changeColour("35/11", "green")
    changeColour("14/26", "green")
    changeColour("42/18", "green")
}

function determineIdValue(number){
    let xValue = 10 + number - 37 * Math.floor(number / 37);
    let yValue = 10 + Math.floor(number / 37);
    return "" + xValue  + "/" + yValue;
}

function changeColour (idValue, colour) {
    document.getElementById(idValue).classList.add(colour);
}

function resetColour (idValue) {
    document.getElementById(idValue).removeAttribute('class')
}

function outOfBoundsCheck(idValue) {
    let coordinates = idValue.split("/");
    if (coordinates[0] > 9 && coordinates[1] > 9 && coordinates[0] < 47 && coordinates[1] < 27) {
        return true
    }
    return false
}

//next pos in bound -> next pos colour -> if next pos moveable check it can be moved -> moveable next in bound
function colourLogic(direction, colour, position, enabled) {
    let idValue = newId(direction, position)
    if (outOfBoundsCheck(idValue) && enabled)
    {
        switch (document.getElementById(idValue).className) {
            case "purple": // objective
                if (colour == "green"){
                    idValue && resetColour(idValue);
                    changeColour(idValue, "blue")
                }
                break;
            case "green": // moveable object
                let moveId = newId(direction, idValue)
                if (outOfBoundsCheck(moveId)) {
                    enabled = colourLogic(direction, "green", idValue, enabled)
                    if (enabled) {
                        oldPosition && resetColour(oldPosition);
                        idValue && resetColour(idValue);
                        changeColour(idValue, colour)
                        oldPosition = idValue;
                    }
                } else {
                    oldPosition && resetColour(oldPosition);
                    idValue && resetColour(idValue);
                    changeColour(oldPosition, "green")
                    changeColour(idValue, colour)
                    oldPosition = idValue;
                }
                break;
            case "blue": // completed objective
                console.log("confirm")
                return false;
                break;
            default: // normal open space
                oldPosition && resetColour(oldPosition);
                changeColour(idValue, colour)
                if (colour == "orange") {
                    oldPosition = idValue;
                }
                break;
        }
    }
    return true;
}

function newId(direction, position){
    let coordinates = position.split("/")
    switch (direction){
        case "-1/0": //left
        return "" + coordinates[0]-1 + "/" + coordinates[1];
            break;
        case "1/0": //right
        return "" + coordinates[0]-(-1) + "/" + coordinates[1];
            break;
        case "0/-1": //up
        return "" + coordinates[0] + "/" + (coordinates[1]-1);
            break;
        case "0/1": //down
        return "" + coordinates[0] + "/" + (coordinates[1]-(-1));
            break;
    }
    return "" + coordinates[0] + "/" + coordinates[1];
}

document.addEventListener("keydown", function(e) {
    if (!(document.getElementById("36/12").className == "blue" && document.getElementById("26/22").className == "blue" && document.getElementById("11/11").className == "blue")) {
        switch (event.key) {
            case "ArrowLeft":
                e.preventDefault();
                colourLogic("-1/0", "orange", oldPosition, true)
                break;
            case "ArrowRight":
                e.preventDefault();
                colourLogic("1/0", "orange", oldPosition, true)
                break;
            case "ArrowUp":
                e.preventDefault();
                colourLogic("0/-1", "orange", oldPosition, true)
                break;
            case "ArrowDown":
                e.preventDefault();
                colourLogic("0/1", "orange", oldPosition, true)
                break;
        }
    }
})

addDivElements();
spawnObjectivesAndObjects()