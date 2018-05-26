// for animations
var scrollPosition = 0;
var animationMs = 1000;
var intro = "Hi, I'm Dustin and I love Jesus!"
, introIndex = 0;
var cursorState = 0;
var aboutAnimated = false;
var projectsAnimated = false;
var bottomAnimated = false;
var carousel, caption, flickity, onSelect;


/**
  Main functions
*/

$(window).ready(function() {

  // set up everything involving animations
  initAnimationStuffs();

  // smooth and accurate anchor scrolling
  initAnchors();

  // size about page thumbnail and video correctly
  initSizes();

});

function initAnimationStuffs() {
  
  // invisble everything
  $("nav, #front-page, #about, #work, #projects, #bottom").fadeTo(0, 0);

  // go ahead and animate front page
  animateFrontPage();

  // bind scrolling
  $(document).scroll(function() {

    scrollPosition = document.documentElement.scrollTop;

    // when needed, animate
    if (!aboutAnimated) {
      if (scrolledTo("#about")) {
        animateAbout();
        aboutAnimated = true;
      }
    }

    if (!projectsAnimated) {
      if (scrolledTo("#projects")) {
        animateProjects();
        projectsAnimated = true;
      }
    }

    if (!bottomAnimated) {
      if (scrolledTo("#bottom")) {
        animateBottom();
        bottomAnimated = true;
      }
    }

  });

}

function initAnchors() {
  $("#front-page_arrow_arrow").click(function(event) {
    // prevent default scrolling animation
    event.preventDefault();
    // use custom animation to smoothly scroll to target
    smoothScrollTo($(this.hash));
  })
  .mouseenter(function() {
    $(this).text("scroll down");
  })
  .mouseleave(function() {
    $(this).text("V");
  });
}

function initSizes() {
  $("#about #about_thumbnail1").height($("#about #about_p1").height());
  $("#about #about_youtubevideo1").height($("#about #about_p2").height());
}






/**
  Side functions
*/

function animateFrontPage() {

  // fade in page
  $("nav, #front-page").fadeTo(animationMs, 1);

  // initalize text to nothing
  $("#front-page_title").text("");
  // start animating text
  var animatingFrontPageTitle = setInterval(function() {
    // display and increment accorindgly
    $("#front-page_title").text(
      intro.slice(0, introIndex + 1) + "|"
    );
    introIndex ++;

    // if done, stop animating text and start animating cursor
    if (introIndex === intro.length) {
      clearInterval(animatingFrontPageTitle);
      var animatingFrontPageTitleCursor = setInterval(function() {
        document.querySelector("#front-page_title").innerHTML =
          intro + '<span id="front-page_title_cursor">|</span>'
          $("#front-page_title_cursor").css("opacity", cursorState);
          cursorState = (cursorState + 1) % 2;
      }, 1000 / 2);
    }

  }, 1000 / 15);

}

function animateAbout() {
  $("#about").fadeTo(animationMs, 1)
  $("#about").addClass("animated fadeInUp");
}

function animateProjects() {
  $("#projects").fadeTo(animationMs, 1);
  $("#projects").addClass("animated fadeInUp");
}

function animateBottom() {
  $("#bottom").fadeTo(animationMs, 1);
  $("#bottom").addClass("animated fadeInUp");
}

// courtesy of https://stackoverflow.com/questions/15857802/how-do-i-navigate-to-slightly-above-an-anchor-tag
function smoothScrollTo(target) {
  target = target.length ? target : $('[id=' + this.hash.slice(1) +']');
  if (target.length) {
    $("html, body").animate({
        scrollTop: (target.offset().top - 50)
      }, 750);
    return;
  }

}

function scrolledTo(query) {
  return (scrollPosition + ($(window).height() * 1.0)) >= (document.querySelector(query).offsetTop);
}
