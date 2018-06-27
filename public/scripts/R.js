$(document).ready(function() {
   
    // initialize navigation
   init_navigation();
   
   // initialize other stuff
   init();
    
});

function init_navigation() {
    
    // set up navigating
    function navigate(index) {
        // hide and show content
        $('#navigator > .item').each(function(item) {
            $($(this).attr('href')).hide(); 
        });
        $($($('#navigator > .item')[index]).attr('href')).show();
        // switch tabs
        $('#navigator > .item').removeClass('active');
        $($('#navigator > .item')[index]).addClass('active');
    }
    $('#navigator > .item').click(function(event) {
        // stop movement
        event.preventDefault();
        navigate($(this).index());
    });
    navigate(2);
    
}

function init() {
    
    // animate 'Doctor Who' text
    $('#doctor_extras_search').keydown(function() {
        window.scrollTo(0, $('#doctor_extras').offset().top);
    });
    
    // tooltip
    tippy('u', {
        allowTitleHTML: true,
        animateFill: true,
        arrow: true,
        arrowType: 'sharp',
        flip: true,
        size: 'large',
        duration: 200,
        animation: 'scale'
    });
    
}