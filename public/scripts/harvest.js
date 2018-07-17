$(document).ready(function() {
    
    // navigation
    $('.navigator').click(function(event) {
        
        event.preventDefault();
        
        $('.navigator').removeClass('active');
        $(this).addClass('active');
        
        if ($(this).attr('href')) {
            
            $('.section').hide();
            $($(this).attr('href')).show();
            
        }
        
        // sticky
        $('#about_sticky').sticky({
            context: '#about_context'
        });
        
        // message
        $('.message .close').unbind().on('click', function() {
            $(this).closest('.message').transition('fade');
        });
        
    });
    
    // dropdown
    $('.ui.dropdown').dropdown();
    
    // navigate to home
    $('.section').hide();
    $('#children').show();
    
});