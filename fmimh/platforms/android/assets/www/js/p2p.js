$( document ).ready(function(){
  mosp.init();
});

var mosp = {


    modals                      : [
    ],
    thisPage                    : "P2P",

    requestData                 : null,

    formElements        : [
        {
            id          : "formPhone",
            name        : "phone",
            type        : "number",
            classDiv    : "mb-3",
            required    : true,
            minChar     : 8,
            icon        : "fa fa-phone",
            msg         : {
                error       : "Digite un número teléfonico",
                placeholder : "Teléfono"
            }
        },
        {
            id          : "formValue",
            name        : "value",
            type        : "number",
            classDiv    : "mb-4",
            required    : true,
            icon        : "fa fa-dollar",
            minChar     : 1,
            msg         : {
                placeholder       : "Monto",
                error             : "Digite un monto"
            }
        },
    ],

    formLib             : null,

    init: function() {
        let userInfo = JSON.parse(localStorage.getItem(CONSTANS.USER));
        console.log(userInfo);
        plGlobals.configPage(mosp.modals,mosp.thisPage,function(){
            mosp.initListeners();
            mosp.formLib = validateFormLib(mosp.formElements);
            // mosp.startTable();
        });
    },


    initListeners: function() {
        $("#btn-tranfer").click(function(){
            mosp.validateForm();
        });
    },

    validateForm        : function () {
        mosp.formLib.validateForm(function (pData) {
            if (pData.status == CONSTANS.OK){
                mosp.requestTranfer(pData.data);
            }
        });
    },

    requestTranfer: function(pData) {
        console.log(pData);
        let userInfo = JSON.parse(localStorage.getItem(CONSTANS.USER));
        pData.user = userInfo._id;
        pData.name = userInfo.name;
        $("#dErrorTranfer").hide();
        plGlobals.backEnd('POST', "/admin/tranfers" , pData,
            function(response) {
                if (response.status == CODES.OK){
                    localStorage.setItem(CONSTANS.TRANSFERMSG, true);
                    plGlobals.rediret("app/home");
                }
                else{
                    $("#dErrorTranfer").show();
                }
            }
        );
    },


};
