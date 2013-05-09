// TitleCase Helper

String.prototype.toProperCase = function () {
    return this.replace(/\w\S*/g, function(txt){return txt.charAt(0).toUpperCase() + txt.substr(1).toLowerCase();});
};

// Data Helpers

function set_data(key, value) {
    window.localStorage.setItem(key, value);
}
function get_string(key) {
    return window.localStorage.getItem(key);
}
function get_integer(key) {
    return parseInt(window.localStorage.getItem(key))
}

function get_array(key) {
    return window.localStorage.getItem(key).split(",")
}
