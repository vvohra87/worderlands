/*----------------------------------------------------------------*/
/* LEVELS
 * ----------------------------------------------------------------*/
var levels =
  [{
    name: "Tutorial",
    id: "01",
    reward: 1000
  },
  {
    name: "Prelude",
    id: "02",
    reward: 2000
  },
  {
    name: "English Invasion",
    id: "03",
    reward: 3000
  }];

/*----------------------------------------------------------------*/
/* BOSSES
 * ----------------------------------------------------------------*/
var bosses =
  [{
    name: "Learnsalot",
    file: "img/characters/learnsalot.png",
    description: "A knight of the old order, his first attack deals 10 damage and with every subsequent turn the attack goes up by 5 damage"
  },
  {
    name: "Paris Hilton",
    file: "img/characters/paris.png",
    description: "A ranged fighter, she damages you by 3X every turn"
  },
  {
    name: "Edword Mccolin",
    file: "img/characters/edword.png",
    description: "A funny guy, he hits you only sometimes. But when he does, it damages you by 7X"
  }];

/*----------------------------------------------------------------*/
/* VILLANS
 * ----------------------------------------------------------------*/
var villans =
  [{
    name: "knight",
    description: "A hard hitter, he damages you by 5X every turn",
    max_health: 100
  },
  {
    name: "archer",
    description: "A ranged fighter, she damages you by 3X every turn",
    max_health: 100
  },
  {
    name: "jester",
    description: "A funny guy, he hits you only sometimes. But when he does, it damages you by 7X",
    max_health: 100
  },
  {
    name: "priest",
    description: "priest description",
    max_health: 100
  },
  {
    name: "mage",
    description: "mage description",
    max_health: 100
  },
  {
    name: "courtesan",
    description: "courtesan description",
    max_health: 100
  }];

/*----------------------------------------------------------------*/
/* ITEMS
 * ----------------------------------------------------------------*/
var items =
  [{
    name: "dagger",
    slot: 3,
    description: "Gives you 2 double letter scores on the board",
    cost: 50
  },
  {
    name: "sword",
    slot: 3,
    description: "Gives you 2 triple letter scores on the board",
    cost: 100
  },
  {
    name: "axe",
    slot: 3,
    description: "Gives you 2 double word scores on the board",
    cost: 200
  },
  {
    name: "scythe",
    slot: 3,
    description: "Gives you 2 triple word scores on the board",
    cost: 500
  },
  {
    name: "helm",
    slot: 1,
    description: "Gives you upto 3 hints in the game",
    cost: 200
  },
  {
    name: "shield",
    slot: 5,
    description: "Reduces damage to you by 10 every turn",
    cost: 400
  },
  {
    name: "breastplate",
    slot: 4,
    description: "Reduces damage to you by 5 every turn",
    cost: 200
  }];