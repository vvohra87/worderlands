$.fn.swapClass = function (removal, addition) {return this.removeClass(removal).addClass(addition)};
$.fn.copyimg = function (source) {return this.css('background-image', source.css('background-image'))};
$.fn.clearimg = function () {return this.css('background-image', "none")};
$.fn.xpos = function () {return this.attr('id').split("__")[0].charAt(1)};
$.fn.ypos = function () {return this.attr('id').split("__")[0].charAt(3)};
$.fn.extract_letter = function () {return (isfilled_or_active(this)) ? this.attr('id').split("__")[1].split("_")[2] : ""};
$.fn.extract_points = function () {return (isfilled_or_active(this)) ? parseInt(this.attr('id').split("__")[1].split("_")[3]) : 0};