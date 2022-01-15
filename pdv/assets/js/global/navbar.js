$('body').ready(function(){

    $('#menu-burger').on('click', function(){
        if($(this).hasClass('clicked')){
            $('#menu-slide').addClass('d-flex').addClass('align-items-end').addClass('flex-column');
        }
        else{
            $('#menu-slide').removeClass('visible').addClass('invisible');
        }
    })

});