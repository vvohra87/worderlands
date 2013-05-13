/*----------------------------------------------------------------*/
/* FIGHT RELATED
 * ----------------------------------------------------------------*/
var fight, attack, damage, enemy_health

/*----------------------------------------------------------------*/
/* BOARD RELATED
 * ----------------------------------------------------------------*/
var grid_size    = 9; // Max 9. If it goes higher than that, adjust the location check algorithm
var letters      = ["a", "a", "a", "a", "a", "a", "a", "a", "b", "b", "c", "c", "d", "d", "d", "d", "e", "e", "e", "e", "e", "e", "e", "e", "e", "e", "e", "e", "f", "f", "g", "g", "g", "h", "h", "i", "i", "i", "i", "i", "i", "i", "i", "i", "j", "k", "l", "l", "l", "l", "m", "m", "n", "n", "n", "n", "n", "n", "o", "o", "o", "o", "o", "o", "o", "o", "p", "p", "q", "r", "r", "r", "r", "r", "r", "s", "s", "s", "s", "t", "t", "t", "t", "t", "t", "u", "u", "u", "u", "v", "v", "w", "w", "x", "y", "z", "z"];
var char_pts     = [1, 1, 1, 1, 1, 1, 1, 1, 3, 3, 3, 3, 2, 2, 2, 2, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 4, 4, 2, 2, 2, 4, 4, 1, 1, 1, 1, 1, 1, 1, 1, 1, 8, 5, 1, 1, 1, 1, 3, 3, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 3, 3, 10, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 4, 4, 4, 4, 8, 4, 10, 10];
var new_board    = true;
var multipliers  = null;
var bonus        = 50;
var error_array  = [];
var wordscores   = [];
var wordlist     = [];
var i, j;

function game_setup() {
  fight        = playerProgress[currentFight]
  attack       = 0;
  damage       = 5;
  enemy_health = fight.villan.max_health;

  multipliers = ["2L", "2L", "3L", "2W"]
  var grid = [], size = (grid_size * grid_size);
  for (i = 1; i < (size + 1); i++) grid.push(i);
  for (j = 0; j < multipliers.length; j++) {
    var tmp = grid[size - j - 1];
    var tmp2 = Math.floor(Math.random() * (size - j - 1  ));
    grid[size - j - 1] = grid[tmp2];
    grid[tmp2] = tmp;
  }
  var random = grid.slice(Math.max((grid.length - multipliers.length), 1));
  for (i = 1; i < (grid_size + 1); i++) { // Set up an empty board with multipliers
    for (j = 1; j < (grid_size + 1); j++) {
      var loc = ((i - 1) * grid_size + j - 1);
      if (random.indexOf(loc) > -1) {
        var index = Math.floor(Math.random() * multipliers.length);
        $('#board').append('<div class="empty square" id="x' + i + 'y' + j + '">' + multipliers[index] + '</div>');
        multipliers.splice(index, 1);
        random.splice(random.indexOf(loc), 1);
      } else {
        $('#board').append('<div class="empty square" id="x' + i + 'y' + j + '"></div>');
      }
    }
  }
  for (i = 1; i < grid_size; i++) // Set up an empty rack
    $('#rack').append('<div class="empty tile"></div>');

  $('#fight #health_value').html(playerHealth);
  $('#fight #attack_value').html(attack);
  $('#fight #damage_value').html(damage);
  $('#fight #enemy_health').html(enemy_health);
  $('#fight #enemy_name').html(fight.villan.name);
  bind_tiles();
  bind_buttons();
}

function deal_tiles() {
  $.each($('.empty.tile'), function (num, elm) {           // Loop through the empty slots on the rack
    var index = Math.floor(Math.random() * letters.length); // No need to check for empty array given grid_size<10. If grid_size > 10, check for empty letters array
    $(elm).css('background-image', 'url("img/tiles/' + letters[index] + '.jpg")').swapClass('empty', 'racked').attr('id', 'char_' + index + '_' + letters[index] + '_' + char_pts[index]);
    letters.splice(index, 1);
    char_pts.splice(index, 1);
  });
}

function bind_tiles() {
    $(document).on('click', '.racked.tile', function () {
        $(this).swapClass('racked', 'picked').css('opacity', '1.0');
        $('.picked.tile').not($(this)).swapClass('picked', 'racked');
        $('.racked.tile').not($(this)).css('opacity', '0.4');
    });
    $(document).on('click', '.picked.tile', function () {
        $(this).swapClass('picked', 'racked');
        reset_rack();
    });
    $(document).on('click', '.empty.square', function () {
        var $picked_tile = $('.picked.tile').first(), picked_tile_id = $picked_tile.attr("id");
        var $square = $(this), square_id = $square.attr("id");
        if ($picked_tile.length == 1) {
            var active_id = square_id + "__" + picked_tile_id;
            $square.swapClass('empty', 'active').copyimg($picked_tile).attr('id', active_id);
            $picked_tile.swapClass('picked', 'placed').clearimg();
            var placement_check = check_placement();
            error_array = placement_check[1];
            if (error_array.length == 0) error_array = check_wordlist(placement_check[0])[2];
        }
        reset_rack();
        console.log(error_array);
    });
    $(document).on('click', '.active.square', function () {
        var $square = $(this), decoded_id = $square.attr('id').split("__"), square_id = decoded_id[0];
        var $unracked_tile = $('#' + decoded_id[1]);
        var $picked_tile = $('.picked.tile').first(), picked_tile_id = $picked_tile.attr("id");
        if ($picked_tile.length == 1) {
            var active_id = square_id + "__" + picked_tile_id;
            $unracked_tile.swapClass('placed', 'racked').copyimg($square);
            $square.copyimg($picked_tile).attr('id', active_id);
            $picked_tile.swapClass('picked', 'placed').clearimg();
        } else {
            $unracked_tile.swapClass('placed', 'picked').copyimg($square);
            $square.swapClass('active', 'empty').clearimg().attr('id', decoded_id[0]);
            $('.racked.tile').css('opacity', '0.4');
        }
        error_array = check_wordlist(check_placement()[0])[2];
    });
}

function bind_buttons() {
  $(document).on('click', '#reset', function () {
    $.each($('.active.square'), function (num, elm) {
      var decoded_id = $(elm).attr('id').split("__");
      var $unracked_tile = $('#' + decoded_id[1]);
      $unracked_tile.swapClass('placed', 'racked').copyimg($(elm));
      $(elm).swapClass('active', 'empty').clearimg().attr('id', decoded_id[0]);
    });
    reset_rack();
  });
  $(document).on('click', '#play', function () {
    if ($('.active.square').length == 0) error_array.push("You need to play a word"); // check if a word has been played
    if (error_array.length == 0) {
      $('.active.square').swapClass('active', 'filled'); //finalize the board
      $('.tile.placed').swapClass('placed', 'empty'); //finalize the rack
      attack_the_enemy();
      if (parseInt($('#fight #enemy_health').html()) > 0) {
        take_damage();
        if (parseInt($('#fight #health_value').html()) < 0) alert("You Lost");
      } else {
        alert("You won");
      }
      new_board = false;
      attack = 0;
      deal_tiles();
    } else {
      alert(error_array.join());
    }
    error_array = [];
  });
  $(document).on('click', '#pass', function () {
    take_damage();
    if (parseInt($('#health_value').html()) < 0) alert("You Lost");
  });
}

function parse_backwards(positionx, positiony, direction) {
    var elm;
    if (direction == "row") {
        elm = ((isfilled(positionx, (parseInt(positiony) - 1))) ? parse_backwards(positionx, (parseInt(positiony) - 1), direction) : $('[id^=x' + positionx + 'y' + positiony + ']'));
    } else {
        elm = ((isfilled((parseInt(positionx) - 1), positiony)) ? parse_backwards((parseInt(positionx) - 1), positiony, direction) : $('[id^=x' + positionx + 'y' + positiony + ']'));
    }
    return elm;
}

function allthesame(arr) {
    var L = arr.length - 1;
    if (L > 0) {
        while (L)
            if (arr[L--] !== arr[L]) return false;
    }
    return true;
}

function isfilled(x, y) {
  return $('[id^=x' + x + 'y' + y + ']').hasClass('filled');
}

function isfilled_or_active(elm) {
  return ($(elm).hasClass('filled') || $(elm).hasClass('active'));
}
function reset_rack() {
  $('.picked.tile').swapClass('picked', 'racked');
  $('.racked.tile').css('opacity', '1.0');
}

function attack_the_enemy() {
  $('#fight #enemy_health').html(parseInt($('#fight #enemy_health').html()) - parseInt($('#fight #attack_value').html()));
  $('#fight #attack_value').html(0);
}

function take_damage() {
  $('#fight #health_value').html(parseInt($('#fight #health_value').html()) - parseInt($('#fight #damage_value').html()));
}

function checkDictionary(theWord) {
  theWord = theWord.toLowerCase();
  if (theWord.length == 2) return (D2.indexOf(theWord) != -1);
  first3 = theWord.replace(/^(...).*/, "$1");
  if (typeof(D[first3]) == "undefined") return false;
  var theEntry = D[first3];
  if (!theEntry.match(/,$/)) {
    // We've not looked at this entry before - uncompress it, etc.
    theEntry = theEntry.replace(/W/g, "le");
    theEntry = theEntry.replace(/K/g, "al");
    theEntry = theEntry.replace(/F/g, "man");
    theEntry = theEntry.replace(/U/g, "ous");
    theEntry = theEntry.replace(/M/g, "ment");
    theEntry = theEntry.replace(/B/g, "able");
    theEntry = theEntry.replace(/C/g, "ic");
    theEntry = theEntry.replace(/X/g, "on");
    theEntry = theEntry.replace(/Q/g, "ng");
    theEntry = theEntry.replace(/R/g, "ier");
    theEntry = theEntry.replace(/S/g, "st");
    theEntry = theEntry.replace(/Y/g, "ly");
    theEntry = theEntry.replace(/J/g, "ally");
    theEntry = theEntry.replace(/E/g, "es");
    theEntry = theEntry.replace(/L/g, "less");
    theEntry = theEntry.replace(/Z/g, "ies");
    theEntry = theEntry.replace(/P/g, "tic");
    theEntry = theEntry.replace(/I/g, "iti");
    theEntry = theEntry.replace(/V/g, "tion");
    theEntry = theEntry.replace(/H/g, "zation");
    theEntry = theEntry.replace(/A/g, "abiliti");
    theEntry = theEntry.replace(/O/g, "ologi");
    theEntry = theEntry.replace(/T/g, "est");
    theEntry = theEntry.replace(/D/g, "ed");
    theEntry = theEntry.replace(/N/g, "ness");
    theEntry = theEntry.replace(/G/g, "ing");
    theEntry = "," + theEntry + ",";
    // May have prefixes on prefixes, so need to repeat the replace.
    var more = true;
    while (more) {
        var theLength = theEntry.length;
        theEntry = theEntry.replace(/(,[a-z]+)\+/g, "$1$1");
        theEntry = theEntry.replace(/(,[a-z])([a-z]*)0/g, "$1$2$1");
        theEntry = theEntry.replace(/(,[a-z]{2})([a-z]*)1/g, "$1$2$1");
        theEntry = theEntry.replace(/(,[a-z]{3})([a-z]*)2/g, "$1$2$1");
        theEntry = theEntry.replace(/(,[a-z]{4})([a-z]*)3/g, "$1$2$1");
        theEntry = theEntry.replace(/(,[a-z]{5})([a-z]*)4/g, "$1$2$1");
        theEntry = theEntry.replace(/(,[a-z]{6})([a-z]*)5/g, "$1$2$1");
        theEntry = theEntry.replace(/(,[a-z]{7})([a-z]*)6/g, "$1$2$1");
        theEntry = theEntry.replace(/(,[a-z]{8})([a-z]*)7/g, "$1$2$1");
        theEntry = theEntry.replace(/(,[a-z]{9})([a-z]*)8/g, "$1$2$1");
        theEntry = theEntry.replace(/(,[a-z]{10})([a-z]*)9/g, "$1$2$1");
        more = (theLength != theEntry.length);
      }
    D[first3] = theEntry;
  }
  rest = theWord.replace(/^...?/, "");
  return (D[first3].indexOf("," + rest + ",") != -1);
}

function check_placement() {
  var xarray = [], yarray = [], direction = "none", touching = false, errors = [];
  $.each($('.active.square'), function (num, elm) {
    xarray.push($(elm).xpos());
    yarray.push($(elm).ypos());
  });
  if (allthesame(xarray)) direction = "row";
  if (allthesame(yarray)) direction = "column";
  if (direction == "none") errors.push("Your letters must be in a line");
  if (!new_board) {
    $.each(xarray, function (numx, elmx) {
      $.each(yarray, function (numy, elmy) {
        if (isfilled((parseInt(elmx) - 1), elmy) || isfilled((parseInt(elmx) + 1), elmy) || isfilled(elmx, (parseInt(elmy) - 1)) || isfilled(elmx, (parseInt(elmy) + 1))) touching = true; // check if this letter is touching an existing word;
      })
    });
    if (!touching) errors.push("Your letters must connect to an existing word");
  }
  return [direction, errors];
}

function check_wordlist(direction) {
    var total = 0, errors = [];
    wordlist = [], wordscores = [];
    if (direction == "row") {
        build_the_words($('.active.square').first(), "row");
        $.each($('.active.square'), function (num, elm) {
            build_the_words(elm, "column");
        });
        attack = 0;
    } else {
        build_the_words($('.active.square').first(), "column");
        $.each($('.active.square'), function (num, elm) {
            build_the_words(elm, "row");
        });
        attack = 0;
    }
    $.each(wordlist, function (num, elm) {
        if (!checkDictionary(elm)) errors.push(elm + " is not a valid word");
    });// check the wordlist;
    for (var i in wordscores) total += parseInt(wordscores[i]);
    if ($('.racked.tile').length == 0) total += bonus;
    $('#attack_value').html(total);
    return [wordlist, total, errors];
}

function build_the_words(elm, direction) {
  var letter_multiplier = 1, word_multiplier = 1;
  var root_letter = parse_backwards($(elm).xpos(), $(elm).ypos(), direction);
  var primary = ((direction == "column") ? root_letter.xpos() : root_letter.ypos());
  var word = "", word_score = 0, word_ended = false;
  for (i = primary; i < grid_size + 1; i++) {
    var $square = ((direction == "column") ? $('[id^=x' + i + 'y' + root_letter.ypos() + ']') : $('[id^=x' + root_letter.xpos() + 'y' + i + ']'));
    if (isfilled_or_active($square) && !word_ended) {
      word += $square.extract_letter();
      if ($square.text().charAt(1) == 'L') letter_multiplier = parseInt($square.text().charAt(0));
      if ($square.text().charAt(1) == 'W') word_multiplier = parseInt($square.text().charAt(0));
      word_score += $square.extract_points() * letter_multiplier;
    } else{
      word_ended=true;
    }
  }
  word_score = word_score * word_multiplier;
  if (word.length > 1) {
      wordlist.push(word);
      wordscores.push(word_score);
  }
  console.log(word);
}

function game_over(){

}