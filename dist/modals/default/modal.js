function modalDefaultObj(pData, pCB) {

    var cm = {
        //Opciones de configuracion
        data: {},
        cb: null,
        idModal: "default-modal",
        /*
        Se ejecuta cuando se crea un objeto de la biblioteca
        Configura y establece las opciones
        */
        show: function() {
            $("#"+cm.idModal).modal({ backdrop: 'static', keyboard: false });
            $("#"+cm.idModal).modal("show");
        },

        init: function(pData, pCB) {
            cm.data = pData;
            cm.cb = pCB;
            $("button[name='btn-close-modal']").click(function () {
                cm.close();
            });
        },

        close: function() {
            $("#"+cm.idModal).modal('hide');
        },

    };
    cm.init(pData, pCB);
    return cm;
}
