function loaderModalObj() {

    var cm = {
        //Opciones de configuracion
        idModal: "loader-modal",
        showing: false,  
        timestamp: Date.now(), 
        ms: 1000,   
        block: false,

        lock: function() {
            cm.block=true;
        },

        unlock: function() {
            cm.block=false;
        },

        show: function() {
            if (!cm.block){
                cm.timestamp = Date.now();
                $('#'+cm.idModal).modal({ backdrop: 'static', keyboard: false });
                $('#'+cm.idModal).modal("show");
            }
        },

        hide: function() {
            if (!cm.block){
                var rest = Date.now() - cm.timestamp;
                var ms = cm.ms-rest;
                if (ms<0){
                    ms = 0;
                }
                setTimeout(function(){
                    $('#'+cm.idModal).modal("hide");
                },ms);
            }
        },

    };
    return cm;
}
