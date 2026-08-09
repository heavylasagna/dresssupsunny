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

        document.body.style.backgroundColor = "#b3afcc";

        themeButton.textContent = "☾";

        darkMode = false;

    }

});


/* =========================
   DISABLE RIGHT CLICK
   ========================= */

/*
    Disable the browser's right-click menu
    specifically on the entire game.
*/

const game = document.getElementById("game");

game.addEventListener("contextmenu", function(event) {

    event.preventDefault();

    return false;

});


/*
    Also disable it on every element currently
    inside the game.
*/

const gameElements = game.querySelectorAll("*");

gameElements.forEach(function(element) {

    element.addEventListener("contextmenu", function(event) {

        event.preventDefault();

        event.stopPropagation();

        return false;

    });

});


/*
    Keep it disabled if clothing elements are
    moved around by JavaScript.
*/

document.addEventListener("contextmenu", function(event) {

    if (event.target.closest("#game")) {

        event.preventDefault();

        return false;

    }

});
