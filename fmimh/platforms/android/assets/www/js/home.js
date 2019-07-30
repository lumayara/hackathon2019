$( document ).ready(function(){
  mosp.init();
});

var mosp = {


    modals                      : [
    ],
    thisPage                    : "P2P",

    requestData                 : null,

    init: function() {

        if (localStorage.getItem(CONSTANS.TRANSFERMSG)){
            plGlobals.notification({
                title       : "<b>Transferencia realizada</b>",
                type        : "success",
            });
            localStorage.removeItem(CONSTANS.TRANSFERMSG);
        }

        plGlobals.configPage(mosp.modals,mosp.thisPage,function(){
            mosp.initListeners();
        });

        $("#titleHome").text("Bienvenid@ "+JSON.parse(localStorage.getItem(CONSTANS.USER)).name)
    },


    initListeners: function() {
        $("#btn-tranfer").click(function(){
            mosp.validateForm();
        });

        $("#btn-p2p").click(function(){
            plGlobals.rediret("app/p2p");
        });

        $("#btn-tranfers").click(function(){
            plGlobals.rediret("app/tranfers");
        });

        $("#btn-payments").click(function(){
            plGlobals.rediret("app/pays");
        });
        
        
    },


};
