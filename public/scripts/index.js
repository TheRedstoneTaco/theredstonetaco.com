// to stop form submission after one like
var like_doSubmit = true;

$(document).ready(function() {
   
    // animate the landing section
    animate_landing();
    
    // initialize liking ability
    init_liking();
    
});

function animate_landing() {
    
    // init counting
    var views = parseInt($($(".landing_stats_views_count")[0]).text());
    var likes = parseInt($($(".landing_stats_likes_count")[0]).text());
    $(".landing_stats_views_count").text(0);
    $(".landing_stats_likes_count").text(0);
    var tmpViews = 0;
    var tmpLikes = 0;
    // count up views and likes from 0 to current
    var viewCounter = setInterval(function() {
        tmpViews += Math.floor(((views - 1) / 20) * (1 / 3));
        if (tmpViews >= views) {
            $(".landing_stats_views_text").addClass("animated tada");
            clearInterval(viewCounter);
            var viewCounter_slow = setInterval(function() {
                tmpViews ++;
                if (tmpViews >= views) {
                    clearInterval(viewCounter_slow);
                }
                $(".landing_stats_views_count").text(tmpViews);
            }, 1000 / 30);
        }
        $(".landing_stats_views_count").text(tmpViews);
    }, 1000 / 20);
    var likeCounter = setInterval(function() {
        tmpLikes += Math.floor(((likes - 1) / 20) * (1 / 3));
        if (tmpLikes >= likes) {
            $(".landing_stats_likes_text").addClass("animated tada");
            clearInterval(likeCounter);
            var likeCounter_slow = setInterval(function() {
                tmpLikes ++;
                if (tmpLikes >= likes) {
                    clearInterval(likeCounter_slow);
                }
                $(".landing_stats_likes_count").text(tmpLikes);
            }, 1000 / 30);
        }
        $(".landing_stats_likes_count").text(tmpLikes);
    }, 1000 / 20);
    
    // animate arrows
    var curArrow = 0;
    setInterval(function() {
        $(".landing_arrow").css("color", "#f48642");
        $($(".landing_arrow")[curArrow + 5]).css("color", "white");
        curArrow = (curArrow + 1) % ($(".landing_arrow").length / 2);
    }, 1000 / 10);
    
    // set animation durations
    var durationMs = 3000;
    $("div").css("animation-duration", durationMs/1000 + "s")
    
    // initialize images
    var imgs;
    if ($(window).width() >= 992) {
        imgs = $("#landing_lgplus .landing_taco img");
    } else {
        imgs = $("#landing_mdminus .landing_taco img");
    }
    imgs.fadeTo(0, 0);
    $(imgs[0]).fadeTo(0, 1);
    for (var i = 0; i < imgs.length; i++) {
        $(imgs[i]).css("z-index", i + 1).css("position", "absolute");
    }
    // set interval for picture fadeshow!
    var curImgIndex = 0;
    setInterval(function() {
        $(imgs[curImgIndex]).fadeTo(1000, 0);
        curImgIndex = (curImgIndex + 1) % imgs.length;
        $(imgs[curImgIndex]).fadeTo(1000, 1);
    }, 2500);
    
    // now animate all the stuffs!
    $(".landing_taco").addClass("animated bounceInDown");
    $(".landing_stats").addClass("animated bounceInLeft");
    $(".landing_text").addClass("animated bounceInDown");
    $(".landing_arrows").addClass("animated bounceInRight");
    
    // after animation is done...
    setTimeout(function() {
        
        // reset width to undo those scrollbars
        $("#landing_lgplus").css("width", "98vw");
        
    }, durationMs + 500);
    
}

function init_liking() {
    // when form submits
    $(".like-form").submit(function(e) {
        
        console.log(1);
        // dont refresh the page
        e.preventDefault();
        // if we don't want more of this nonsense, stop it here
        if (!like_doSubmit) { 
            return;
        }
        // stop nonsense after first offense
        like_doSubmit = false;
        console.log(2);

        // do some nonsense on the database
        $.ajax({
            url : "/index/like",
            type: "PUT",
            error: function (jXHR, textStatus, errorThrown) {
                console.log(errorThrown);
            },
            success: function(data, textStatus, jXHR) {
                console.log(data, textStatus, jXHR);
            }
        });
        // make it look like it updated without refreshing the page
        var likeCounters = $(".landing_stats_likes_count");
        likeCounters.text(parseInt($(likeCounters[0]).text()) + 1);
        // make it not look like it will allow any more submissions
        $(".landing_stats_likes").addClass("disabled");
        $(".landing_stats_likes_info").text("YOU HAVE LIKED THIS PAGE!").css("color", "red");
        
    });
}