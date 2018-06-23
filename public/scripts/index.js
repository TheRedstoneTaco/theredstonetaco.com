$(document).ready(function() {
    
    // remove dimmer
    setTimeout(function() {
        $('#loader').remove();
    }, 0);
    
    // anchor defaults
    $('a').each(function() {
        $(this).click(function(event) {
            if ($(this).attr('href') == undefined) {
                event.preventDefault();
            } else {
                $('html, body').animate({
                	scrollTop: $($(this).attr('href')).offset().top
                }, 1000);
            }
        })
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
   
});