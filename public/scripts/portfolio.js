var knowledges = ['Semantic UI', 'Bootstrap 4', 'jQuery', 'AJAX', 'NodeJS', 'Mongoose', 'Express']

// on ready
$(document).ready(function() {
  
  // animate landing section
  animate_landing();
  
  // who needs default Skype API settings, anyway?!?
  // who needs actual css, anyway!??!?
  undoBadStuff();
  
  // allow people to like the page!
  initLiking();
  
  // knowledge section stuff
  init_knowledge();
  
});

// animate landing section
function animate_landing() {
  
  var views = $("#stats_views_count");
  var likes = $("#stats_likes_count");
  var viewCount = parseInt(views.text());
  var likeCount = parseInt(likes.text());
  views.text(0);
  likes.text(0);
  var tmpViews = 0;
  var tmpLikes = 0;
  var fillFps = 20;
  var secondsToFill = 2;
  var viewsIncrementBy = Math.floor(((viewCount - 1) / fillFps) * (1 / secondsToFill)) + 1;
  var likesIncrementBy = Math.floor(((likeCount - 1) / fillFps) * (1 / secondsToFill)) + 1;
  
  var viewFiller = setInterval(function() {
    tmpViews += viewsIncrementBy;
    if (tmpViews >= viewCount) {
      clearInterval(viewFiller);
      tmpViews -= viewsIncrementBy;
      var viewFiller_slow = setInterval(function() {
        tmpViews ++;
        if (tmpViews >= viewCount) {
          clearInterval(viewFiller_slow)
          $("#stats_views").addClass("animated tada");
        }
        views.text(tmpViews);
      }, 1000 / fillFps);
    }
    views.text(tmpViews);
  }, 1000 / fillFps);
  
  var likeFiller = setInterval(function() {
    tmpLikes += likesIncrementBy;
    if (tmpLikes >= likeCount) {
      clearInterval(likeFiller);
      tmpLikes -= likesIncrementBy;
      var likeFiller_slow = setInterval(function() {
        tmpLikes ++;
        if (tmpLikes >= likeCount) {
          clearInterval(likeFiller_slow);
          $("#stats_likes").addClass("animated tada");
        }
        likes.text(tmpLikes);
      }, 1000 / fillFps);
    }
    likes.text(tmpLikes);
  }, 1000 / fillFps);
  
}

function undoBadStuff() {
  // manually set skype button text
  setTimeout(function() {
    $(".lwc-chat-button").text("Skype Me! :)");
  }, 1000);
  // manually set #stats height, couldn't figure out positioning stuff
  $("#stats").height($("#landing").height());
}

function initLiking() {
  // when form submits
  $(".like-form").submit(function(e) {
    
    // dont refresh the page
    e.preventDefault();
    // if we don't want more of this nonsense, stop it here
    if (this.like_doSubmit == "no") { 
        return;
    }
    // stop nonsense after first offense
    this.like_doSubmit = "no";
    // show them, DO NOT do that nonsense again
    $("#stats_likes").css("background-color", "#333333").css("color", "red");
    $("#stats_likes_count").text(parseInt($("#stats_likes_count").text()) + 1);
    $("#stats_likes").css("cursor", "not-allowed");
    $("#stats_likes_info").text("You liked the page!");

    // do some nonsense on the database
    $.ajax({
      url: document.querySelector(".like-form").action,
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

function init_knowledge() {
  var knowledge_carousel = $(".main-carousel").flickity({
    wrapAround: true,
    contain: true,
    accessibility: true,
    pageDots: true
  });
  var w = $('.img-div').width();
  var h = $('.img-div').height();
  var lesser = ((w < h) * w) + ((w > h) * h);
  $("#knowledge_carousel .carousel-cell .img-div img")
    // .width(lesser)
    // .height(lesser);
  $('#knowledge_carousel_text').text(knowledges[0]);
  knowledge_carousel.on('select.flickity', function(event, index) {
    $('#knowledge_carousel_text').text(knowledges[index]);
  });
}