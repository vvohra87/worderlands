/* On Load Function */

$(function () {
    $($images).preloadImages();
    seeding();
});

/* Home Page Initialization UI*/

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

/* Context Page Initialization UI*/

$(document).delegate("#context", "pageinit", function () {

    // Start the Last Played Level
    level_start(current_level, false);

    // Fade in the content
    $('.story-container').fadeIn(function () {
        $('.level').html('Level 0' + current_level).animate({opacity: 1}, 1500);
        $('#context .money').prepend(gold);
        $('#context .health').append(level_health[current_level]);
        $('#enemies_context').append('<img src="' + boss_files[current_level - 1] + '" class="character"/>');
        $('#enemies_details').append('<strong>Challenger:</strong><br/> ' + bosses[current_level - 1] + '<br/> and ' + level_characters[current_level].length + ' minions');
    });

});

/* Level Ladder Page Initialization UI*/

$(document).delegate("#level_ladder", "pageinit", function () {

    // Start the Last Played Level
    level_start(current_level, false);

    // Add each character to the ladder
    $.each(level_characters[current_level], function (index, value) {
        if (index == parseInt(level_victories[current_level])) {
            $('.enemies-container .enemies-wrapper').append('<div class="currently_active enemies-slide"><table><tr><td><img src="img/characters/' + characters[value] + '.png" class="character"/></td><td class="enemy_name">Battle ' + (index + 1) + ' : <br>' + characters[parseInt(value)].toProperCase() + '</td></tr><tr><td colspan="2" class="phrase">' + phrases[value] + '</td></tr></table></div>');
        } else {
            if (index < parseInt(level_victories[current_level])) {
                $('.enemies-container .enemies-wrapper').append('<div class="completed enemies-slide"><table><tr><td><img src="img/characters/' + characters[value] + '.png" class="character"/><img src="img/dagger.png" style="float: left;margin-left:-6.5em;margin-top:1em;"/></td><td class="enemy_name">Battle ' + (index + 1) + ' : <br>' + characters[parseInt(value)].toProperCase() + '</td></tr><tr><td colspan="2" class="phrase">' + phrases[value] + '</td></tr></table></div>');
            } else {
                $('.enemies-container .enemies-wrapper').append('<div class="hidden enemies-slide"><table><tr><td><img src="img/characters/blank.png" class="character"/></td><td class="enemy_name">Battle ' + (index + 1) + ' : <br>???</td></tr><tr><td colspan="2" class="phrase">Finish the previous battle to unlock this enemy</td></tr></table></div>');
            }
        }
    });
    $('.enemies-container .enemies-wrapper').append('<div class="boss enemies-slide"><table><tr><td><img src="' + boss_files[current_level - 1] + '" class="character"/></td><td class="enemy_name">Boss : <br>' + bosses[current_level - 1] + '</td></tr><tr><td colspan="2" class="phrase">' + boss_phrases[current_level - 1] + '</td></tr></table></div>');

    setTimeout(function () {
        enemies_swiper = $('.enemies-container').swiper({
            mode: 'horizontal',
            loop: false,
            slideClass: 'enemies-slide',
            wrapperClass: 'enemies-wrapper'
        });
        enemies_swiper.swipeTo(level_victories[current_level], level_victories[current_level] * 500);
        $('#progress').animate({
            width: (100 * level_victories[current_level] / (level_characters[current_level].length + 1)) + "%"
        });
        $('#victory_count').html(level_victories[current_level] + " out of " + (level_characters[current_level].length + 1) + " battles won");
    }, 2000);

    // Fade in the content
    $('.enemies-container').fadeIn(function () {
        $('.level').html('Level 0' + current_level).animate({opacity: 1}, 1500);
        $('#second_page .money').prepend(gold);
        $('#second_page .health').append(level_health[current_level]);
    });


});

/* Inventory Page Initialization UI*/

$(document).delegate("#inventory", "pageinit", function () {

    // Start the Last Played Level
    level_start(current_level, false);
    // Set up shop
    set_up_shop();
    // Fade in the content
    $('#inventory .buttons').fadeIn();
    $('.level').html('Level 0' + current_level).animate({opacity: 1}, 1500);
    $('#third_page .money').prepend(gold);
    $('#third_page .health').append(level_health[current_level]);

});
