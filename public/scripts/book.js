var tooltips;

$(document).ready(function() {

  tooltips = tippy("a", {
    position: "right",
    animation: "scale",
    duration: 500,
    arrow: true,
    arrowSize: "big",
    trigger: "mouseenter focus",
    size: "big",
    theme: "light",
    followCursor: true,
    inertia: true
  });

});
