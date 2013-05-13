/* On Load Function */
$(function () {
  $($images).preloadImages();
  newGame();
});

/* Home Page UI Initialization*/
$(document).delegate("#home", "pageinit", function () {
  $("#new_game_button").click(function(){
    newGame();
    window.location.href = window.location.href + "#inventory";
  });
});

/* Inventory Page UI Initialization */
$(document).delegate("#inventory", "pageinit", function () {
  var shop_swiper = null;
  var totalSpend = 0;
  $.each(items, function (index, item) {
    $('.swiper-wrapper').append('<div class="swiper-slide">' +
      item.name.toProperCase() + ' - ' + item.cost + ' Gold' +
      '<br />' + item.description +
      ' <a href="#" data-role="button" class="equip">Use</a>' +
      '</div>');
  });
  setTimeout(function(){
    shop_swiper = $('.swiper-container').swiper({ mode: 'horizontal', loop: true });
  }, 1000);
  $('.swiper-wrapper').on('click', '.equip', function () {
    var pickedItem = shop_swiper.activeSlide;
    if (playerGold - items[pickedItem].cost < 0) {
      alert("not enough money");
    } else {
      // check if already placed something in the same slot
      var currentText = $(".slot[nature='" + items[pickedItem].slot + "']").text();
      if (currentText !== "") {
        var currentItem = $.grep(items, function(i){ return i.name == currentText; })[0];
        totalSpend -= currentItem.cost;
      }
      $(".slot[nature='" + items[pickedItem].slot + "']").text(items[pickedItem].name);
      totalSpend += items[pickedItem].cost;
    }
    $('.current-spend').html('').append("Current Spend: " + totalSpend);
  });

  $('#fight_number').html(currentFight + 1);
  $('#gold').html(playerGold);
  $('#health').html(playerHealth);
  $("#enemy_name").text(playerProgress[currentFight].villan.name);
  $("#enemy_desciption").text(playerProgress[currentFight].villan.description);
  $("#enemy_health").text(playerProgress[currentFight].villan.max_health);
  $("#enemy_health_regen").text(playerProgress[currentFight].villan.health_regen);
  $("#enemy_attack").text(playerProgress[currentFight].villan.attack);
  $("#enemy_attack_reference").text(playerProgress[currentFight].villan.attack_reference);
  $("#enemy_attack_delta").text(playerProgress[currentFight].villan.attack_delta);
  $("#attack_probability").text(playerProgress[currentFight].villan.attack_probability);
  $("#enemy_defense").text(playerProgress[currentFight].villan.defense);
  $("#enemy_defense_reference").text(playerProgress[currentFight].villan.defense_reference);
  $("#enemy_value").text(playerProgress[currentFight].villan.value);
  $(".fight_button").click(function(){
    $(".slot").each(function() {
      var name = $(this).text();
      var boughtItem = $.grep(items, function(i){ return i.name == name; })[0];
      currentInventory.push(boughtItem);
    });
    playerGold -= totalSpend;
    window.location.href = window.location.href.replace("inventory", "fight");
  });
});

/* Fight Page UI Initialization */
$(document).delegate("#fight", "pageinit", function () {
  game_setup();
  deal_tiles();
  $.each(currentInventory, function(index, item){
    if (item){
      $("#fight #items").append('<div class="equiped-item">' +
      item.name.toProperCase() +
      ': ' + item.description +
      '</div>');
    } else {
      $("#fight #items").append('<div class="equiped-item">Nothing Equipped</div>');
    }

  });
  $("#fight #enemy_name").text(playerProgress[currentFight].villan.name);
  $("#fight #enemy_desciption").text(playerProgress[currentFight].villan.description);
  $("#fight #enemy_health").text(playerProgress[currentFight].villan.max_health);
  $("#fight #enemy_health_regen").text(playerProgress[currentFight].villan.health_regen);
  $("#fight #enemy_attack").text(playerProgress[currentFight].villan.attack);
  $("#fight #enemy_attack_reference").text(playerProgress[currentFight].villan.attack_reference);
  $("#fight #enemy_attack_delta").text(playerProgress[currentFight].villan.attack_delta);
  $("#fight #attack_probability").text(playerProgress[currentFight].villan.attack_probability);
  $("#fight #enemy_defense").text(playerProgress[currentFight].villan.defense);
  $("#fight #enemy_defense_reference").text(playerProgress[currentFight].villan.defense_reference);
  $("#fight #enemy_value").text(playerProgress[currentFight].villan.value);
});
