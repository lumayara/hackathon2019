$( document ).ready(function(){
    if (plGlobals.isLogged()){
        plGlobals.rediret("app/home");
    }
    else{
        mosp.init();
    }
});

var mosp = {

    formElements        : [
        {
            id          : "formMail",
            name        : "email",
            type        : "email",
            classDiv    : "mb-3",
            required    : true,
            icon        : "fa fa-envelope",
            msg         : {
                error       : "Ingrese un email válido",
                placeholder : "Email"
            }
        },
        {
            id          : "formPass",
            name        : "password",
            type        : "password",
            classDiv    : "mb-4",
            required    : true,
            icon        : "fa fa-lock",
            minChar     : 8,
            msg         : {
                placeholder       : "Contraseña",
                error             : "Debe contener mínimo 8 caracteres"
            }
        },
    ],

    formLib             : null,

    init: function() {
        plGlobals.configLogin();
        mosp.formLib = validateFormLib(mosp.formElements, function(){
            $("#dLoad").hide();
            $("#dBody").show();
        });        

        $( document ).keyup(function(e){
            if (e.keyCode == 13){
                mosp.validateForm();
            }
        });

        $("#btn-login").click(function(){
            mosp.validateForm();
        });

        $("#btn-register").click(function(){
            plGlobals.rediret("app/register");
        });


        if (localStorage.getItem(CONSTANS.LOGINMSG)){
            plGlobals.notification({
                title       : "<b>Su sesión ha vencido</b>",
                message     : "<br>Ingrese nuevamente",
                type        : "danger",
            });
            localStorage.removeItem(CONSTANS.LOGINMSG);
        }
        mosp.setEmailForm();
    },

    setEmailForm        : function(){
        let userInfo = JSON.parse(localStorage.getItem(CONSTANS.USER));
        (userInfo && userInfo.email) ? mosp.formLib.setDefaultDatabyName({email:userInfo.email}) : null;
    },

    validateForm        : function () {
        mosp.formLib.validateForm(function (pData) {
            if (pData.status == CONSTANS.OK){
                mosp.requestLogin(pData.data);
            }
        });
    },

    requestLogin: function(pData) {
        $("#dError").hide();
        plGlobals.backEnd('POST', "/admin/user/auth" , pData,
            function(response) {
                if (response.status == CODES.OK){
                    localStorage.setItem(CONSTANS.TOKEN, response.token);
                    localStorage.setItem(CONSTANS.USER, JSON.stringify(response.user));
                    plGlobals.rediret("app");
                }
                else{
                    $("#dError").show();
                }
            }
        );
    },


};
