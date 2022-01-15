$('body').ready(function(){
    $('.param-connect a').on('click', function(){
        $('.navigation item-nav').removeClass('nav-active');
    })

    $('.forgot-pw').on('click', function(e){
        e.preventDefault();
        const id = '1';

        $.ajax({
            type: "POST",
            url: "/ajax/connection",
            data: {
                action: 'test',
                id: id
            },
            dataType: "json",
            success: (json) => {
                //L'objet est sérialisé sous form de chaine de caractère donc on "reconstruit" le json.
                const data = JSON.parse(json);
                if(data.success){
                    console.log(data);
                }

                const userMail = data.info_user;
                console.log();
                $('#email-connect').val(userMail);
            }
        });
    })

});