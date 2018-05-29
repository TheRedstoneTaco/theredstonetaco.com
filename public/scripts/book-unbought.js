$(document).ready(function() {
    var sections = $(".list-group-item");
    for (var i = 1; i < sections.length; i++) {
    	$(sections[i]).addClass("disabled").css("background-color", "#777777").css("color", "white");
    }
});