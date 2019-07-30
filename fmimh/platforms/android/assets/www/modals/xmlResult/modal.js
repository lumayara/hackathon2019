function xmlResultModalObj(pData, pCB) {

    var cm = {
        //Opciones de configuracion
        data            : {},
        cb              : null,
        idModal         : "xmlResultModal",
        idModalClose    : "btnClose-xmlResultModal",
        resulTypes      : [
            {id:"ok"        , icon: "<span class='fa fa-check-circle'></span>", c:0, htmlId:"#mXML-ok", text:"Agregada", color:"#4dbd74"}, 
            {id:"repeat"    , icon: "<span class='fa fa-exclamation-circle'></span>", c:0, htmlId:"#mXML-repeat", text:"Repetida", color:"#ffc107"}, 
            {id:"error"     , icon: "<span class='fa fa-times-circle'></span>", c:0, htmlId:"#mXML-error", text:"Error", color:"red"}
        ],


        show: function(pData) {
            $("#"+cm.idModal).modal({ backdrop: 'static', keyboard: false });
            $("#"+cm.idModal).modal("show");
            for (var i = cm.resulTypes.length - 1; i >= 0; i--) {
                cm.resulTypes[i].c = 0;
            }
            cm.proccessData(pData);

        },

        getHTML: function(pId, pResultType) {
            let html = "";
            html += '   <div class="col-6">';
            html += '       <h7 style="color:'+pResultType.color+'">'+pResultType.icon+" "+pResultType.text+'</h7>';
            html += '   </div>';
            html += '   <div class="col-6">';
            html += '       <h7 style="color:'+pResultType.color+'">'+((pId) ? pId : "desconocida") +'</h7>';
            html += '   </div>';

            return html;
        },

        setHTML: function(pHTML) {
            $("#mXML-results").html(pHTML);
            for (var j = cm.resulTypes.length - 1; j >= 0; j--) {
                $(cm.resulTypes[j].htmlId).html(cm.resulTypes[j].c)
            }
        },

        proccessData: function(pData) {
            let html        = "";
            for (var i = pData.length - 1; i >= 0; i--) {
                for (var j = cm.resulTypes.length - 1; j >= 0; j--) {
                    if (cm.resulTypes[j].id == pData[i].result){
                        cm.resulTypes[j].c ++;
                        if (cm.resulTypes[j].id != "error"){
                            html += cm.getHTML(pData[i].id, cm.resulTypes[j]);
                        }
                    }
                }
            }
            cm.setHTML(html);
        },

        init: function(pData, pCB) {
            cm.data = pData;
            cm.cb = pCB;
            $("#dModals").on('click', '#'+cm.idModalClose, function () {
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
