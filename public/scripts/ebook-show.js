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
    initRating();
    
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

function initRating() {
    $("#rating_add").submit(function(e) {
        e
    });
}