const menu = {

    init: function(){
        /* récupération du menu burger et gestion de ce dernier */
        burgerMenu = document.querySelector('#menu-burger');
        burgerMenu.addEventListener('click',menu.handleClickMenu);
    },

    handleClickMenu: function(event){
        const mainMenu = document.querySelector("#menu-slide");

        if(!this.getAttribute("class")) {
            this.setAttribute("class", "clicked");
        } else {
            this.removeAttribute("class");
        }
        // Variante avec x.classList, pas 100% compatible avant IE 11
        // burgerMenu.classList.toggle("clicked");
    
        // Créé l'effet pour le menu slide (compatible partout)
        if(mainMenu.getAttribute("class") != "visible") {
            mainMenu.setAttribute("class", "visible");
        } else {
            mainMenu.setAttribute("class", "invisible");
        }
        
        if(screen.width <= 1024) {
            var startX = 0; // Position de départ
            var distance = 100; // 100 px de swipe pour afficher le menu
        
            // Au premier point de contact
            window.addEventListener("touchstart", function(evt) {
                // Récupère les "touches" effectuées
                var touches = evt.changedTouches[0];
                startX = touches.pageX;
                between = 0;
            }, false);
        
            // Quand les points de contact sont en mouvement
            window.addEventListener("touchmove", function(evt) {
                // Limite les effets de bord avec le tactile...
                evt.preventDefault();
                evt.stopPropagation();
            }, false);
        
            // Quand le contact s'arrête
            window.addEventListener("touchend", function(evt) {
                var touches = evt.changedTouches[0];
                var between = touches.pageX - startX;
        
                // Détection de la direction
                if(between > 0) {
                    var orientation = "ltr";
                } else {
                    var orientation = "rtl";
                }
        
                // Modification du menu burger
                if(Math.abs(between) >= distance && orientation == "ltr" && mainMenu.getAttribute("class") != "visible") {
                        burgerMenu.setAttribute("class", "clicked");
                }
                if(Math.abs(between) >= distance && orientation == "rtl" && mainMenu.getAttribute("class") != "invisible") {
                        burgerMenu.removeAttribute("class");
                }
        
                // Créé l'effet pour le menu slide (compatible partout)
                if(Math.abs(between) >= distance && orientation == "ltr" && mainMenu.getAttribute("class") != "visible") {
                    mainMenu.setAttribute("class", "visible");
                }
                if(Math.abs(between) >= distance && orientation == "rtl" && mainMenu.getAttribute("class") != "invisible") {
                    mainMenu.setAttribute("class", "invisible");
                }            
            },false);
        }
    },

    handleClickBtn: function(event){      
        menu.crossAction();
        menu.menuAction();
    },

    crossAction: function(){
        const crossMenu = document.querySelector("#menu-burger");

        if(!crossMenu.getAttribute("class")) {
            crossMenu.setAttribute("class", "clicked");
        } else {
            crossMenu.removeAttribute("class");
        }
    },

    menuAction: function(){
        const mainMenu = document.querySelector("#menu");       

        if(mainMenu.getAttribute("class") != "invisible") {
            mainMenu.setAttribute("class", "invisible");
        } else {
            mainMenu.setAttribute("class", "invisible");
        }
    }
}

document.addEventListener("DOMContentLoaded", menu.init);