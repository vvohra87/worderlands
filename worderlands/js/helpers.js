/*----------------------------------------------------------------*/
/* JQuery helpers for DOM manipulations and Fight screen
 * ----------------------------------------------------------------*/
$.fn.swapClass      = function (removal, addition) {return this.removeClass(removal).addClass(addition)};
$.fn.copyimg        = function (source) {return this.css('background-image', source.css('background-image'))};
$.fn.clearimg       = function () {return this.css('background-image', "none")};
$.fn.xpos           = function () {return this.attr('id').split("__")[0].charAt(1)};
$.fn.ypos           = function () {return this.attr('id').split("__")[0].charAt(3)};
$.fn.extract_letter = function () {return (isfilled_or_active(this)) ? this.attr('id').split("__")[1].split("_")[2] : ""};
$.fn.extract_points = function () {return (isfilled_or_active(this)) ? parseInt(this.attr('id').split("__")[1].split("_")[3]) : 0};

/*----------------------------------------------------------------*/
/* Core JS Extentions
 * ----------------------------------------------------------------*/
String.prototype.toProperCase = function () {
  return this.replace(/\w\S*/g, function(txt){return txt.charAt(0).toUpperCase() + txt.substr(1).toLowerCase();});
};

/*----------------------------------------------------------------*/
/* Data helpers to access Local Storage
 * ----------------------------------------------------------------*/
function set_data(key, value) {
  window.localStorage.setItem(key, value);
}
function set_object(key, value) {
  window.localStorage.setItem(key, JSON.stringify(value));
}

function get_string(key) {
  return window.localStorage.getItem(key);
}

function get_integer(key) {
  return parseInt(window.localStorage.getItem(key))
}

function get_object(key) {
  return JSON.parse(window.localStorage.getItem(key));
}