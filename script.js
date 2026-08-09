let activeItem = null;

let offsetX = 0;
let offsetY = 0;

let highestLayer = 10;


/* =========================
   CLOTHING DRAGGING
   ========================= */

const clothingItems = document.querySelectorAll(".clothing-item");

clothingItems.forEach(function(item) {

    item.addEventListener("mousedown", function(event) {

        event.preventDefault();

        activeItem = item;

        /* Bring clicked item to the front */

        highestLayer++;

        activeItem.style.zIndex = highestLayer;


        /* Remember where we grabbed it */

        const rect = activeItem.getBoundingClientRect();

        offsetX = event.clientX - rect.left;
        offsetY = event.clientY - rect.top;

    });

});


/* Move clothing */

document.addEventListener("mousemove", function(event) {

    if (activeItem === null) {
        return;
    }

    const game = document.getElementById("game");

    const gameRect = game.getBoundingClientRect();


    activeItem.style.left =
        (event.clientX - gameRect.left - offsetX) + "px";

    activeItem.style.top =
        (event.clientY - gameRect.top - offsetY) + "px";


    /* Move the clothing item out of its menu */

    if (activeItem.parentElement !== game) {

        game.appendChild(activeItem);

    }

});


/* Stop dragging */

document.addEventListener("mouseup", function() {

    activeItem = null;

});


/* =========================
   THEME SWITCH
   ========================= */

const themeButton = document.getElementById("theme-button");

let darkMode = false;

themeButton.addEventListener("click", function() {

    const game = document.getElementById("game");


    if (darkMode === false) {

        /* DARK THEME */

        game.style.backgroundImage =
            'url("assets/фон 2.png")';

        document.body.style.backgroundColor = "#050505";

        themeButton.textContent = "☀";

        darkMode = true;

    } else {

        /* LIGHT THEME */

        game.style.backgroundImage =
            'url("assets/фон 1.png")';

        document.body.style.backgroundColor = "#ffeef8";

        themeButton.textContent = "☾";

        darkMode = false;

    }

});


/* =========================
   DISABLE RIGHT CLICK
   ========================= */

document.addEventListener("contextmenu", function(event) {

    event.preventDefault();

});
