/* On Load Function */
$(function () {
  $($images).preloadImages();
  intitializeGame();
});

/* Home Page UI Initialization*/
$(document).delegate("#home", "pageinit", function () {
  $('#ptotem_logo').fadeIn().delay(2000).fadeOut(function () {
    $('#genii_logo').fadeIn().delay(2000).fadeOut(function () {
      $('#splashes').remove();
      $('#home_background').removeClass('faded');
      $('.main').fadeIn(function () {
        $('#home .right-btn').fadeIn();
      });
    });
  });
});

/* Context Page UI Initialization */
$(document).delegate("#context", "pageinit", function () {
  // Fade in the content
  $('.story-container').fadeIn(function () {
    // $('.level').html('Level ' + levels[currentLevel].id).animate({opacity: 1}, 1500);
    $('.level').html(levels[currentLevel].id + " " + levels[currentLevel].name).animate({opacity: 1}, 1500);
    $('#context .money').prepend(playerGold);
    $('#context .health').append(playerHealth);
    $('#enemies_context').append('<img src="' + bosses[currentLevel].file + '" class="character"/>');
    $('#enemies_details').append('<strong>Challenger:</strong><br/> ' + bosses[currentLevel].name + '<br/> and ' + playerProgress[currentLevel].fights.length + ' minions');
  });
});

/* Level Ladder Page Initialization UI*/
$(document).delegate("#level_ladder", "pageinit", function () {
  // Add each villan to the level ladder
  $.each(playerProgress[currentLevel].fights, function (index, fight) {
    if (index == currentFight) {
      $('.enemies-container .enemies-wrapper').append('<div class="currently_active enemies-slide"><table><tr><td><img src="img/characters/' + fight.villan.name + '.png" class="character"/></td><td class="enemy_name">Battle ' + (index + 1) + ' : <br>' + fight.villan.name.toProperCase() + '</td></tr><tr><td colspan="2" class="phrase">' + fight.villan.description + '</td></tr></table></div>');
    } else {
      if (index < currentFight) {
        $('.enemies-container .enemies-wrapper').append('<div class="completed enemies-slide"><table><tr><td><img src="img/characters/' + fight.villan.name + '.png" class="character"/><img src="img/dagger.png" style="float: left;margin-left:-6.5em;margin-top:1em;"/></td><td class="enemy_name">Battle ' + (index + 1) + ' : <br>' + fight.villan.name.toProperCase() + '</td></tr><tr><td colspan="2" class="phrase">' + fight.villan.description + '</td></tr></table></div>');
      } else {
        $('.enemies-container .enemies-wrapper').append('<div class="hidden enemies-slide"><table><tr><td><img src="img/characters/blank.png" class="character"/></td><td class="enemy_name">Battle ' + (index + 1) + ' : <br>???</td></tr><tr><td colspan="2" class="phrase">Finish the previous battle to unlock this enemy</td></tr></table></div>');
      }
    }
  });
  // Add the the boss last
  $('.enemies-container .enemies-wrapper').append('<div class="boss enemies-slide"><table><tr><td><img src="' + bosses[currentLevel].file + '" class="character"/></td><td class="enemy_name">Boss : <br>' + bosses[currentLevel].name + '</td></tr><tr><td colspan="2" class="phrase">' + bosses[currentLevel].description + '</td></tr></table></div>');
  // Wait for 2 secs then initialize swiper
  setTimeout(function () {
    enemies_swiper = $('.enemies-container').swiper({
      mode: 'horizontal',
      loop: false,
      slideClass: 'enemies-slide',
      wrapperClass: 'enemies-wrapper'
    });
    enemies_swiper.swipeTo( currentFight, currentFight * 500);
    $('#progress').animate({
      width: (100 * currentFight / (playerProgress[currentLevel].fights.length + 1)) + "%"
    });
    $('#victory_count').html(currentFight + " / " + (playerProgress[currentLevel].fights.length + 1) + " battles won.");
  }, 2000);
  // Fade in the content
  $('.enemies-container').fadeIn(function () {
    $('.level').html('Level ' + levels[currentLevel].id).animate({opacity: 1}, 1500);
    $('#second_page .money').prepend(playerGold);
    $('#second_page .health').append(playerHealth);
  });
});

/* Inventory Page UI Initialization */
$(document).delegate("#inventory", "pageinit", function () {
  // Set up shop items
  totalSpend = 0;
  $.each(items, function (index, item) {
    $('.swiper-wrapper').append('<div class="swiper-slide">' +
      '<table><tr>' +
      '<td><img src="img/items/' + item.name + '.png"/></td>' +
      '<td><strong>' + item.name.toProperCase() +
      '<br/> (Cost: ' + item.cost + ' <img src="img/gold.png" style="width:1em; vertical-align: middle;"/>)</strong>' +
      '<p>' + item.description + '</p>' +
      '</td></tr></table></div>');
  });
  // Wait for 2 secs then initialize swiper
  setTimeout(function () {
    shop_swiper = $('.swiper-container').swiper({
      mode: 'horizontal',
      loop: true
    });
    $('#equip').on('click', function () {
      var pickedItem = shop_swiper.activeSlide;
      /* Deduct the cost */
      if (playerGold - items[pickedItem].cost < 0) {
        alert("not enough money");
      } else {
        // check if already placed something in the same slot
        var currentText = $(".slot :eq("+items[pickedItem].slot+")").html();
        if (currentText !== "") {
          var currentItem = $.grep(items, function(i){ return i.name == currentText; })[0];
          totalSpend -= currentItem.cost;
        }
        $(".slot :eq("+items[pickedItem].slot+")").html(items[pickedItem].name);
        totalSpend += items[pickedItem].cost;
        set_data("playerGold", playerGold);
        $('#third_page .money').html('').append(playerGold + '<img src="img/gold.png"/>');
      }
      $('#third_page .current-spend').html('').append("Current Spend: " + totalSpend);
    });
  }, 2000);
  // Fade in the content
  $('#inventory .buttons').fadeIn();
  $('.level').html('Level ' + currentLevel).animate({opacity: 1}, 1500);
  $('#third_page .money').prepend(playerGold);
  $('#third_page .health').append(playerHealth);
});

/* Fight Page UI Initialization */
$(document).delegate("#fight", "pageinit", function () {
  game_setup();
  deal_tiles();
});