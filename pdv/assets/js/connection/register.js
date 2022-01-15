$('body').ready(function(){
  
    $('.pwd').parent().addClass('d-flex flex-column mb-3');
    $('#register_password_first').parent().addClass('input-login-item pass-1');
    $('#register_password_second').parent().addClass('input-login-item pass-2').css('position', 'absolute');
    $('#register-form label').addClass('form-label').css('width', '20rem');

    const cross = `
        <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" fill="currentColor" class="bi bi-x bi-x-input" viewBox="0 0 16 16">
            <path d="M4.646 4.646a.5.5 0 0 1 .708 0L8 7.293l2.646-2.647a.5.5 0 0 1 .708.708L8.707 8l2.647 2.646a.5.5 0 0 1-.708.708L8 8.707l-2.646 2.647a.5.5 0 0 1-.708-.708L7.293 8 4.646 5.354a.5.5 0 0 1 0-.708z"></path>
        </svg>`;

    const check = `
        <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" fill="currentColor" class="bi bi-check bi-check-input" viewBox="0 0 16 16">
            <path d="M10.97 4.97a.75.75 0 0 1 1.07 1.05l-3.99 4.99a.75.75 0 0 1-1.08.02L4.324 8.384a.75.75 0 1 1 1.06-1.06l2.094 2.093 3.473-4.425a.267.267 0 0 1 .02-.022z"></path>
        </svg>`;

    
    /* Gestion input mail
    ----------------------*/
    $('#register_email').on('click', function(){
        if($('.mail svg')){
            $('.mail svg').remove();
        }
    })

    $('#register_email').on('blur', function(){
        //Si validation existe déjà, on supprime
        $('#register_email .div-error').remove();

        //Si email valide
        const email = $(this).val();
        if(isEmail(email) == true){
            $('.mail .div-error').remove();
            $('.mail').append(check);
        }

        //Si email invalide
        else{
            let errorMsg = `
                <div class="div-error d-flex justify-content-center">
                    <em class="text-center">Le format de l'e-mail est invalide (exemple: exemple@exemple.fr)</em>
                </div>`;
            $('.mail').append(cross).append(errorMsg);
        }
    })

    /* Gestion input password
    --------------------------*/
    $('#register_password_first').on('click', function(){
        if($('.pass-1 svg')){
            $('.pass-1 svg').remove();
        }
    })

    $('#register_password_first').on('blur', function(){
        //Si validation existe déjà, on supprime
        $('.pass-1 .div-error').remove();
        
        //Si password valide
        const password = $(this).val();
        
        if(isPassword(password) == true){
            $('.pass-1').append(check);

            if($('.pass-2 svg')){
                $('.pass-2 svg').remove();
            }

            const password = $(this).val();
            const repeatPassword = $('#register_password_second').val();
            if(repeatPassword === password){
                $('.pass-2').append(check);
                $('.pass-2 .div-error').remove();
            }
            else{
                $('.pass-2').append(cross);
            }
        }
        //Si email invalide
        else{
            let errorMsg = `
                <div class="div-error d-flex justify-content-center">
                    <em class="text-center">Votre mot de passe doit être composé de 8 caractères minimum avec au moins 1 majuscule et 1 chiffre</em>
                </div>`;
            $('.pass-1').append(cross).append(errorMsg);
        }
    })

    /* Gestion input repeat password
    ---------------------------------*/
    $('#register_password_second').on('click', function(){
        if($('.pass-2 svg')){
            $('.pass-2 svg').remove();
        }
    })

    $('#register_password_second').on('blur', function(){
        //Si validation existe déjà, on supprime
        $('.pass-2 .div-error').remove();
        $('.pass-2 svg').remove();        

        const password = $('#register_password_first').val();
        const repeatPassword = $(this).val();
        
        if(repeatPassword === password){
            $('.pass-2').append(check);
        }
        //Si email invalide
        else{
            let errorMsg = `
                <div class="div-error d-flex justify-content-center">
                    <em class="text-center">Vos mots de passe doivent être identique</em>
                </div>`;
            $('.pass-2').append(cross).append(errorMsg);
        }
    })

    /* $('.inscription').on('click',function(){
        console.log('test');
    }) */

    $('#register-form').on('submit', function(e){
		e.preventDefault();
		$.ajax({
            url: '/inscription/ajax',
            data: {
                action: 'register',
            	mail: $('#register_mail').val(),
            	// agence: $('#agence-source').val()
            },
            type: 'POST',
            dataType: "json",
            success: (data) => {
                if(data['success']){
                	
                }
                //notify(data)
            },
            error: (data) =>{
            	//notify(data)
            }
        })

        /* $.post('{{path('register_ajax')}}',
        ) */
    })


                          /*---------------*/
                         /*---Fonctions---*/
                        /*---------------*/


    function isEmail(email) {
        const regex = /^([a-zA-Z0-9_\.\-\+])+\@(([a-zA-Z0-9\-])+\.)+([a-zA-Z0-9]{2,4})+$/;
        return (regex.test(email)) ? true : false;
    }

    function isPassword(password) {
        const regex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[a-zA-Z\d]{8,}$/;
        return (regex.test(password)) ? true : false;
    } 
});
