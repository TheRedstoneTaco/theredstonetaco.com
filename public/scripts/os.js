// on ready
$(document).ready(function() {
  
  // computer, setup the page
  setupPage();

});

var setupPage = function() {
  
  // computer, setup the accordion dropdowns!
  $('.ui.accordion').accordion();
  
  // computer, setup the vertical menu for clicking
  $('.ui.menu').on('click', '.item', function() {
    if(!$(this).hasClass('dropdown')) {
      $(this)
            .addClass('active')
            .siblings('.item')
            .removeClass('active');
    }
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
    $(this).css({
      backgroundColor: "#444444",
      color: "#ff2222"
    }).text("VOTED!");
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