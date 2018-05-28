$(document).ready(function() {
   
    // animate the landing section
    animate_landing();
    
});

function animate_landing() {
    
    // set animation duration
    var durationMs = 3000;
    $("div").css("animation-duration", durationMs/1000 + "s");
    
    // now animate all the stuffs!
    $(".landing_taco").addClass("animated bounceInDown");
    $(".landing_stats").addClass("animated bounceInLeft");
    $(".landing_text").addClass("animated bounceInDown");
    $(".landing_arrows").addClass("animated bounceInRight");
    
    // reset width to undo those scrollbars!
    setTimeout(function() {
        $("#landing_lgplus").css("width", "99vw");
    }, durationMs);
}