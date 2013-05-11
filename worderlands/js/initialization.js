/*----------------------------------------------------------------*/
/* GLOBALS
 * ----------------------------------------------------------------*/
var isInitialized  = null; // used to know if the game is opened for the first time
var currentLevel   = 0;    // stores the current level of the player
var currentFight   = 0;    // stores the current fight of the player
var playerHealth   = 0;    // stores the current health of the player
var playerGold     = 0;    // stores the current gold of the player
var playerProgress = [];   // stores the overall progress of the player
var totalSpend     = 0;    // stores the current amount the player will spend on items
/*----------------------------------------------------------------*/
/* UNKNOWNS
 * ----------------------------------------------------------------*/
var shop           = [];    // shop items
var shop_swiper    = null;  // swipper object for shop items
var enemies_swiper = null;  // swipper object for enemies
var $images        = [];    //

// Runs everytime app is opened.
// Will set some basic values if it's the first time app is opened.
function intitializeGame() {
  if (get_string("isInitialized") === null) {
    isInitialized = true;
    currentLevel  = 0;
    currentFight  = 0;
    playerGold    = 10000;
    playerHealth  = 100;
    loadLevel(0);
    saveAllGlobals();
  }
  else {
    getAllGlobals();
  }
}

// Save all global variables to Local Storage
function saveAllGlobals(){
  set_data("isInitialized", isInitialized);
  set_data("currentLevel", currentLevel);
  set_data("currentFight", currentFight);
  set_data("playerGold", playerGold);
  set_data("playerHealth", playerHealth);
  set_object("playerProgress", playerProgress);
}

// Load all global variables from Local Storage
function getAllGlobals(){
  isInitialized  = get_string("isInitialized");
  currentLevel   = get_integer("currentLevel");
  currentFight   = get_integer("currentFight");
  playerGold     = get_integer("playerGold");
  playerHealth   = get_integer("playerHealth");
  playerProgress = get_object("playerProgress");
}

// Loads a brand new level into playerProgress
// Does not reset player health, gold, or anything else
function loadLevel(levelNumber){
  playerProgress[levelNumber] =
    {
      level: levelNumber,
      complete: false,
      fights: null
    };
  playerProgress[levelNumber].fights = [];
  for (var i = 0; i < 4 + currentLevel; i++) {
    playerProgress[levelNumber].fights.push(
      { villan: villans[Math.floor(Math.random() * villans.length)], complete: false }
    );
  }
}

// Called every time a fight ends
function startLevel(){

}

function restartCurrentLevel(){

}