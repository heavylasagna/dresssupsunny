let draggedItem = null;

const clothingItems = document.querySelectorAll(".clothing-item");
const characterArea = document.getElementById("character-area");

clothingItems.forEach(function(item) {

    item.addEventListener("dragstart", function() {
        draggedItem = item;
    });

});

characterArea.addEventListener("dragover", function(event) {
    event.preventDefault();
});

characterArea.addEventListener("drop", function(event) {

    event.preventDefault();

    if (!draggedItem) return;

    const newItem = document.createElement("img");

    newItem.src = draggedItem.src;
    newItem.classList.add("placed-item");

    const areaRect = characterArea.getBoundingClientRect();

    newItem.style.left = (event.clientX - areaRect.left - draggedItem.width / 2) + "px";
    newItem.style.top = (event.clientY - areaRect.top - draggedItem.height / 2) + "px";

    characterArea.appendChild(newItem);

    draggedItem = null;
});
