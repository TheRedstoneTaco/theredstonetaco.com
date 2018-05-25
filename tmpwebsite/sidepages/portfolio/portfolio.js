// on ready
$(document).ready(function() {
});

function pageInit() {
  // clicking settings
  window.addEventListener('touchstart', function() {
    $(window).trigger("click");
  });
}

// to do animations on scrolling
function bindScrolls() {

  // on scroll
  document.addEventListener("scroll", function() {

    scrollPosition = document.documentElement.scrollTop;

  });
}

function scrolledTo(query) {
  return (scrollPosition + ($(window).height() * 1.0)) >= (document.querySelector(query).offsetTop);
}
