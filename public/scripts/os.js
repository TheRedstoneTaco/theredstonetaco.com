var form;

// on ready
$(document).ready(function() {
  
  // computer, setup the page
  setupPage();

});

var setupPage = function() {
  
  // computer, hide all elements that are shy!
  $(".hideme").hide();
  
  // computer, setup the accordion dropdowns!
  $('.ui.accordion').accordion();
  
  // computer, setup the vertical menu for clicking
  $('.ui.menu').on('click', '.item', function(e) {
    $(this)
      .addClass('active')
      .siblings('.item')
      .removeClass('active');
    $(".section").hide();
    $($(this).attr("href")).show();
    e.preventDefault();
  });
  
  // computer, stop topic form from redirecting us! (also intialize animations)
  $("#topicAddAlert").hide();
  $("#topicForm").submit(ajaxSubmit);
  $("#topicForm").submit(function(event) {
    $("#topicAddAlert").show();
    $("#topicForm").hide();
  });
  
  // computer, enable all the voting functionality!
  $(".yesform, .noform").click(function() {
    $(this).submit();
  });
  $(".yesform").click(function() {
    $(this).replaceWith("<h1 class=\"alert alert-danger\">YES! :D</h1>");
  });
  $(".noform").click(function() {
    $(this).replaceWith("<h1 class=\"alert alert-primary\">no :(</h1>");
  });
  $(".yesform, .noform").submit(ajaxSubmit);
  
}

function ajaxSubmit(event) {
  event.preventDefault();
  $.ajax({
      url: $(this).attr("action"),
      type: "POST",
      error: function (jXHR, textStatus, errorThrown) {
          console.log(errorThrown);
      },
      data: $(this).serialize()
  });
}