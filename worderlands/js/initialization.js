/*----------------------------------------------------------------*/
/* GLOBALS
 * ----------------------------------------------------------------*/
var currentFight     = 0;    // stores the current fight of the player
var playerHealth     = 0;    // stores the current health of the player
var playerGold       = 0;    // stores the current gold of the player
var playerProgress   = [];   // stores the overall progress of the player
var currentInventory = []    // stores the currently purchased inventory
/*----------------------------------------------------------------*/
/* UNKNOWNS
 * ----------------------------------------------------------------*/
var shop           = [];    // shop items
var enemies_swiper = null;  // swipper object for enemies
var $images        = [];    //

// Runs everytime app is opened.
// Will set some basic values if it's the first time app is opened.
function newGame() {
  currentFight   = 0;
  playerHealth   = 100;
  playerGold     = 10000;
  playerProgress = [];
  nextFight();
  saveAllGlobals();
}

// Loads a brand new level into playerProgress
// Does not reset player health, gold, or anything else
function nextFight(){
  playerProgress[playerProgress.length] = {
    villan: villans[Math.floor(Math.random() * villans.length)],
    items: [],
    complete: false
  };
}

// Save all global variables to Local Storage
function saveAllGlobals(){
  set_data("currentFight", currentFight);
  set_data("playerGold", playerGold);
  set_data("playerHealth", playerHealth);
  set_object("playerProgress", playerProgress);
}

// Load all global variables from Local Storage
function getAllGlobals(){
  currentFight   = get_integer("currentFight");
  playerGold     = get_integer("playerGold");
  playerHealth   = get_integer("playerHealth");
  playerProgress = get_object("playerProgress");
}