// on ready
$(document).ready(function() {
  
  // computer, setup the page
  setupPage();

});

var setupPage = function() {
  
  // computer, setup the vertical menu for clicking
  $('.ui.menu').on('click', '.item', function() {
    if(!$(this).hasClass('dropdown')) {
      $(this)
        .addClass('active')
        .siblings('.item')
        .removeClass('active');
    }
  });
  
  // computer, stop forms from redirecting us! (also intialize animations)
  $("#topicAddAlert").hide();
  ajaxSubmit("#topicForm", null, function() {
    $("#topicAddAlert").show();
    $("#topicForm").hide();
  });
  
}

function ajaxSubmit(selector, check, afterSubmit) {
    $(selector).submit(function(e) {
        e.preventDefault();
        if (check) {
            if (!check()) {
                return;
            }
        }
        $.ajax({
            url: $(selector).attr("action"),
            type: $(selector).attr("method"),
            error: function (jXHR, textStatus, errorThrown) {
                console.log(errorThrown);
            },
            data: $(selector).serialize()
        });
        if (afterSubmit) {
            afterSubmit();
        }
    });
}