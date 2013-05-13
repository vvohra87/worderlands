/*----------------------------------------------------------------*/
/* VILLANS
 * ----------------------------------------------------------------*/
var villans =
  [{
    name: "Simple Villan",
    description: "A hard hitter, he damages you by 5X every turn",
    max_health: 100,
    health_regen: 0,
    attack: 5,
    attack_reference: 100,
    attack_delta: 0,
    attack_probability: 100,
    defense: 0,
    defense_reference: "damage",
    value: 45
  },
  {
    name: "Increasing Attack",
    description: "A ranged fighter, she damages you by 3X every turn",
    max_health: 100,
    health_regen: 0,
    attack: 5,
    attack_reference: 100,
    attack_delta: 2,
    attack_probability: 100,
    defense: 0,
    defense_reference: "damage",
    value: 50
  },
  {
    name: "Health Regen",
    description: "A funny guy, he hits you only sometimes. But when he does, it damages you by 7X",
    max_health: 100,
    health_regen: 3,
    attack: 5,
    attack_reference: 100,
    attack_delta: 0,
    attack_probability: 100,
    defense: 0,
    defense_reference: "damage",
    value: 55
  },
  {
    name: "Damage based Attack",
    description: "A funny guy, he hits you only sometimes. But when he does, it damages you by 7X",
    max_health: 100,
    health_regen: 0,
    attack: 5,
    attack_reference: "damage",
    attack_delta: 0,
    attack_probability: 100,
    defense: 0,
    defense_reference: "damage",
    value: 50
  },
  {
    name: "Remaining Health based Attk",
    description: "mage description",
    max_health: 100,
    health_regen: 0,
    attack: 5,
    attack_reference: "current_health",
    attack_delta: 0,
    attack_probability: 100,
    defense: 0,
    defense_reference: "damage",
    value: 45
  },
  {
    name: "Health Lost based Attk",
    description: "A funny guy, he hits you only sometimes. But when he does, it damages you by 7X",
    max_health: 100,
    health_regen: 0,
    attack: 5,
    attack_reference: "Health Lost",
    attack_delta: 0,
    attack_probability: 100,
    defense: 0,
    defense_reference: "damage",
    value: 50
  }];

/*----------------------------------------------------------------*/
/* ITEMS
 * ----------------------------------------------------------------*/
var items =
  [{
    name: "Simple Dagger",
    slot: "weapon",
    description: "+20 base attack",
    cost: 100,
    attack_increase: 20, // absolute
    attack_multipler: 1, // multiplier
    attack_penetration: 0, // percentage
    attack_bingo_bonus: 0, // absolute
    health_regen: 0, // absolute
    health_base_increase: 0, // absolute
    damage_block: 0, // absolute
    damage_block_chance: 0, // percentage
    double_letters: 0, // absolute
    triple_letters: 0, // absolute
    double_words: 0, // absolute
    triple_words: 0, // absolute
    clear_board: 0 // absolute
  },
  {
    name: "Basic Sword",
    slot: "weapon",
    description: "200% attack",
    cost: 100,
    attack_increase: 0,
    attack_multipler: 2,
    attack_penetration: 0,
    attack_bingo_bonus: 0,
    health_regen: 0,
    health_base_increase: 0,
    damage_block: 0,
    damage_block_chance: 0,
    double_letters: 0,
    triple_letters: 0,
    double_words: 0,
    triple_words: 0,
    clear_board: 0
  },
  {
    name: "Axe of Rending",
    slot: "weapon",
    description: "100% defense mitigation",
    cost: 200,
    attack_increase: 0,
    attack_multipler: 1,
    attack_penetration: 100,
    attack_bingo_bonus: 0,
    health_regen: 0,
    health_base_increase: 0,
    damage_block: 0,
    damage_block_chance: 0,
    double_letters: 0,
    triple_letters: 0,
    double_words: 0,
    triple_words: 0,
    clear_board: 0
  },
  {
    name: "Lucky Dagger",
    slot: "weapon",
    description: "+50 attack on every Bingo",
    cost: 500,
    attack_increase: 0,
    attack_multipler: 1,
    attack_penetration: 0,
    attack_bingo_bonus: 50,
    health_regen: 0,
    health_base_increase: 0,
    damage_block: 0,
    damage_block_chance: 0,
    double_letters: 0,
    triple_letters: 0,
    double_words: 0,
    triple_words: 0,
    clear_board: 0
  },
  {
    name: "Minor Spell of Duplication",
    slot: "spell",
    description: "Gives you a single double letter randomly on the board.",
    cost: 200,
    attack_increase: 0,
    attack_multipler: 1,
    attack_penetration: 0,
    attack_bingo_bonus: 0,
    health_regen: 0,
    health_base_increase: 0,
    damage_block: 0,
    damage_block_chance: 0,
    double_letters: 1,
    triple_letters: 0,
    double_words: 0,
    triple_words: 0,
    clear_board: 0
  },
  {
    name: "Major Spell of Duplication",
    slot: "spell",
    description: "Gives you a single double word randomly on the board.",
    cost: 200,
    attack_increase: 0,
    attack_multipler: 1,
    attack_penetration: 0,
    attack_bingo_bonus: 0,
    health_regen: 0,
    health_base_increase: 0,
    damage_block: 0,
    damage_block_chance: 0,
    double_letters: 0,
    triple_letters: 0,
    double_words: 1,
    triple_words: 0,
    clear_board: 0
  },
  {
    name: "Minor Spell of Truplication",
    slot: "spell",
    description: "Gives you a single triple letter randomly on the board.",
    cost: 200,
    attack_increase: 0,
    attack_multipler: 1,
    attack_penetration: 0,
    attack_bingo_bonus: 0,
    health_regen: 0,
    health_base_increase: 0,
    damage_block: 0,
    damage_block_chance: 0,
    double_letters: 0,
    triple_letters: 1,
    double_words: 0,
    triple_words: 0,
    clear_board: 0
  },
  {
    name: "Major Spell of Truplication",
    slot: "spell",
    description: "Gives you a single triple word randomly on the board.",
    cost: 200,
    attack_increase: 0,
    attack_multipler: 1,
    attack_penetration: 0,
    attack_bingo_bonus: 0,
    health_regen: 0,
    health_base_increase: 0,
    damage_block: 0,
    damage_block_chance: 0,
    double_letters: 0,
    triple_letters: 0,
    double_words: 0,
    triple_words: 1,
    clear_board: 0
  },
  {
    name: "Round Wood Shield",
    slot: "shield",
    description: "+10 Block, 100% chance to block.",
    cost: 400,
    attack_increase: 0,
    attack_multipler: 1,
    attack_penetration: 0,
    attack_bingo_bonus: 0,
    health_regen: 0,
    health_base_increase: 0,
    damage_block: 10,
    damage_block_chance: 100,
    double_letters: 0,
    triple_letters: 0,
    double_words: 0,
    triple_words: 0,
    clear_board: 0
  },
  {
    name: "Kite Shield",
    slot: "shield",
    description: "+25 block, 50% chance to block.",
    cost: 500,
    attack_increase: 0,
    attack_multipler: 1,
    attack_penetration: 0,
    attack_bingo_bonus: 0,
    health_regen: 0,
    health_base_increase: 0,
    damage_block: 25,
    damage_block_chance: 50,
    double_letters: 0,
    triple_letters: 0,
    double_words: 0,
    triple_words: 0,
    clear_board: 0
  }];