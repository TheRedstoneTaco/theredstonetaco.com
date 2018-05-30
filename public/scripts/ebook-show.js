$(document).ready(function() {
    
    // initialize one-time form submission
    initOnceForm(".like-form", "PUT", function() {
        $(".like_button").css({
            "background-color": "#444",
            "color": "red",
            "cursor": "not-allowed"
        });
        $(".likes_count").text(parseInt($($(".likes_count")[0]).text()) + 1);
    });
    
    // initialize the rating stuffs
    ajaxSubmit("#rating_add", function() {
        return $("#rating_add_input").val() >= 0 && $("#rating_add_input").val() <= 5;
    }, function() {
        $("#rating_add_text").text("RATED: " + $("#rating_add_input").val());
        $("#rating_add").remove();
    });
    ajaxSubmit("#rating_edit", function() {
        return $("#rating_edit_input").val() >= 0 && $("#rating_edit_input").val() <= 5;
    }, function() {
        $("#rating_current").text("RATED: " + $("#rating_edit_input").val());
        $("#rating_edit_text").remove();
        $("#rating_edit").remove();
    });
    
    // initialize all the review stuffs
    ajaxSubmit("#review_add", null, function() {
        $("#review_added").addClass("review_added_text").text($("#review_add_content").val());
        $("#review_leave_title, #review_add").remove();
    });
    ajaxSubmit("#review_edit", null, function() {
        $("#review_edited_title").text("You edited your review!");
        $("#review_edited").addClass("review_edited_text").text($("#review_edit_content").val());
        $("#review_edit_title, #review_edit").remove();
    });
    
});

// to submit a form only once
function initOnceForm(selector, method, callback) {
    
    var form = $(selector);
    
    form.submit(function(event) {
        
        event.preventDefault();
        if (form.doSubmit == "no") {
            return;
        }
        
        $.ajax({
            url: form.attr("action"),
            type: method,
            error: function (jXHR, textStatus, errorThrown) {
                console.log(errorThrown);
            }
        });
        
        callback();
        
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
        console.log(1);
        console.log($(selector).attr("method"));
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