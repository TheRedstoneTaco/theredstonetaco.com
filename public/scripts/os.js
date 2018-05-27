// each list that I want to toggle
var lists = ["UX", "Development", "Core", "Garble"];

// on ready
$(document).ready(function() {

  // add a clicky for each list's title
  for (var i = 0; i < lists.length; i++) {
    $("#" + lists[i] + "-title").click(function() {
      $("#" + $(this)[0].id.replace("-title", "") + "-list").toggle();
    });
  }

});
