let activeItem = null;

let offsetX = 0;
let offsetY = 0;

let highestLayer = 10;


/* FIND ALL CLOTHING */

const clothingItems = document.querySelectorAll(".clothing-item");


/* START DRAGGING */

clothingItems.forEach(function(item) {

    item.addEventListener("mousedown", function(event) {

        event.preventDefault();

        activeItem = item;


        /* BRING ITEM TO FRONT */

        highestLayer++;

        activeItem.style.zIndex = highestLayer;


        /* FIND ITEM'S CURRENT POSITION */

        const rect = activeItem.getBoundingClientRect();

        offsetX = event.clientX - rect.left;
        offsetY = event.clientY - rect.top;

    });

});


/* MOVE ITEM */

document.addEventListener("mousemove", function(event) {

    if (activeItem === null) {
        return;
    }


    const gameRect = document
        .getElementById("game")
        .getBoundingClientRect();


    /* NEW POSITION */

    const newLeft =
        event.clientX
        - gameRect.left
        - offsetX;


    const newTop =
        event.clientY
        - gameRect.top
        - offsetY;


    activeItem.style.left = newLeft + "px";
    activeItem.style.top = newTop + "px";


    /*
        Since the item is positioned relative to #left-menu,
        we need to move it into the game coordinate system.
    */

    if (activeItem.parentElement !== document.getElementById("game")) {

        document
            .getElementById("game")
            .appendChild(activeItem);

    }

});


/* STOP DRAGGING */

document.addEventListener("mouseup", function() {

    activeItem = null;

});


/* DISABLE RIGHT CLICK */

document.addEventListener("contextmenu", function(event) {

    event.preventDefault();

});
