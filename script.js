let draggedItem = null;
let highestLayer = 1;

const clothingItems = document.querySelectorAll(".clothing-item");
const characterArea = document.getElementById("character-area");


// Drag an item from the menu
clothingItems.forEach(function(item) {

    item.addEventListener("dragstart", function() {
        draggedItem = item;
    });

});


// Allow dropping inside the character area
characterArea.addEventListener("dragover", function(event) {
    event.preventDefault();
});


// Create a new movable clothing item
characterArea.addEventListener("drop", function(event) {

    event.preventDefault();

    if (!draggedItem) return;

    const newItem = document.createElement("img");

    newItem.src = draggedItem.src;
    newItem.classList.add("placed-item");

    const areaRect = characterArea.getBoundingClientRect();

    newItem.style.left =
        (event.clientX - areaRect.left - draggedItem.width / 2) + "px";

    newItem.style.top =
        (event.clientY - areaRect.top - draggedItem.height / 2) + "px";

    highestLayer++;
    newItem.style.zIndex = highestLayer;

    characterArea.appendChild(newItem);

    makeMovable(newItem);

    draggedItem = null;
});


// Make a placed item freely movable
function makeMovable(item) {

    let moving = false;
    let offsetX = 0;
    let offsetY = 0;


    item.addEventListener("mousedown", function(event) {

        moving = true;

        const rect = item.getBoundingClientRect();

        offsetX = event.clientX - rect.left;
        offsetY = event.clientY - rect.top;

        // Bring this item to the very front
        highestLayer++;
        item.style.zIndex = highestLayer;

        event.preventDefault();
    });


    document.addEventListener("mousemove", function(event) {

        if (!moving) return;

        const areaRect = characterArea.getBoundingClientRect();

        item.style.left =
            (event.clientX - areaRect.left - offsetX) + "px";

        item.style.top =
            (event.clientY - areaRect.top - offsetY) + "px";
    });


    document.addEventListener("mouseup", function() {

        moving = false;

    });
}


// Disable right-click menu
document.addEventListener("contextmenu", function(event) {
    event.preventDefault();
});
