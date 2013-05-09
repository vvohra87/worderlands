//TODO: Add the Levels ability

/* Data Arrays*/

/* Boss definitions
 * ----------------------------------------------------------------*/
var bosses = ["Learnsalot", "Paris Hilton", "Edword Mccolin"];
var boss_files = ["img/characters/learnsalot.png", "img/characters/paris", "img/characters/edword"];
var boss_phrases = ["A knight of the old order, his first attack deals 10 damage and with every subsequent turn the attack goes up by 5 damage",
    "A ranged fighter, she damages you by 3X every turn",
    "A funny guy, he hits you only sometimes. But when he does, it damages you by 7X"];

/*----------------------------------------------------------------*/
/* Character definitions
 * ----------------------------------------------------------------*/
var characters = ["knight", "archer", "jester", "priest", "mage", "courtesan"];
var phrases = ["A hard hitter, he damages you by 5X every turn",
    "A ranged fighter, she damages you by 3X every turn",
    "A funny guy, he hits you only sometimes. But when he does, it damages you by 7X",
    "priest",
    "mage",
    "courtesan"];

/*----------------------------------------------------------------*/
/* Item definitions
 * ----------------------------------------------------------------*/
var items = ["dagger", "sword", "axe", "scythe", "helm", "shield", "breastplate"];
var descriptions = ["Gives you 2 double letter scores on the board",
    "Gives you 2 triple letter scores on the board",
    "Gives you 2 double word scores on the board",
    "Gives you 2 triple word scores on the board",
    "Gives you upto 3 hints in the game",
    "Reduces damage to you by 10 every turn",
    "Reduces damage to you by 5 every turn"];
var costs = [50, 100, 200, 500, 200, 400, 200];
var slots = [1, 1, 1, 1, 2, 3, 4];

/*----------------------------------------------------------------*/

var $images = [];
//var current_level = get_integer("level_no");
var current_level = 1; //TODO: Remove this line once testing is complete and uncomment the previous line
var level_characters = [];
var level_victories = [];
var level_health = [];
var shop = [];
var gold;
var shop_swiper;
var enemies_swiper;

function seeding() {
    if (get_string("initialized") == null) {
        set_data("initialized", "true");
        set_data("level_no", "0");
        set_data("gold", "100000");
    }
}

// TODO: See if we need an algorithm in level_start;

function level_start(level_no, restart) {

    // If the Level hasn't been started yet or a restart is called
    if (get_integer("last_level") < level_no || restart) {

        // Randomly add characters to the level
        level_characters[level_no] = new Array();
        for (var i = 0; i < level_no + 4; i++) {
            level_characters[level_no].push(Math.floor(Math.random() * characters.length));
        }
        level_victories[level_no] = 3;
        level_health[level_no] = 100;
        gold = get_integer("gold");


        set_data("last_level", level_no); // Start the level and set last level to this level number
        set_data("victories_" + level_no, "3"); // Set the number of victories for the level to zero
        set_data("health_" + level_no, "100"); // Set the health of the player to max
        set_data("characters_" + level_no, level_characters[level_no].join(',')); // Put the selected characters into storage for the Level

        if (restart) {
            window.location.reload();
        }

    } else {

        // Extract the data which had been put into the level
        level_characters[level_no] = get_array("characters_" + level_no);
        level_victories[level_no] = get_integer("victories_" + level_no);
        level_health[level_no] = get_integer("health_" + level_no);
        gold = get_integer("gold");

    }

}

function enemy() {
    return characters[level_characters[current_level][get_integer("victories_" + current_level)]];
}

function set_up_shop() {
    for (var i = 0; i < 10; i++) {
        var item_no = Math.floor(Math.random() * items.length);
        shop.push(item_no);
        $('.swiper-wrapper').append('<div class="swiper-slide">' +
            '<table><tr>' +
            '<td><img src="img/items/' + items[item_no] + '.png"/></td>' +
            '<td><strong>' + items[item_no].toProperCase() +
            '<br/> (Cost: ' + costs[item_no] + ' <img src="img/gold.png" style="width:1em; vertical-align: middle;"/>)</strong>' +
            '<p>' + descriptions[item_no] + '</p>' +
            '</td></tr></table></div>');
    }
    setTimeout(function () {
        shop_swiper = $('.swiper-container').swiper({
            mode: 'horizontal',
            loop: true
        });
        $('#equip').on('click', function () {
            var picked_item = shop_swiper.activeSlide;

            /* Deduct the cost */
            if (gold - costs[shop[picked_item]] < 0) {
                alert("not enough money")
            } else {
                gold = gold - costs[shop[picked_item]];
                set_data("gold", gold);
                $('#third_page .money').html('').append(gold + '<img src="img/gold.png"/>');
//                $('#slot')

            }
            console.log(picked_item);
            console.log(costs);
            console.log(costs[shop[picked_item]]);
            console.log(items[shop[picked_item]]);
        });
    }, 2000);

}