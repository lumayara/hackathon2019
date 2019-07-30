/*
elements : [
    {
        id          : String,// *** id para distinguir
        name        : String,// *** nombre a devolver en object
        type        : String,// *** mail || dropdown || number || text || input-mask || password
        required    : Boolen,// Si es un dato requerido o no
        disabled    : Boolean,//
        minChar     : Number,// cantidad minima de caracteres
        icon        : String,// icono a mostrar
        classDiv    : string
        msg         : {
            error       : String, //mensaje de error
            placeholder : String // placeholder a mostrar
        }

        opts        : Array,//Se usa solo en el dropdown
        mask        : String,// para el inputmask
    }
]
*/

function validateFormLib(pElements, pCallback) {

    var cm = {

        errorClass          : "form-control is-invalid",
        defaultClass        : "form-control",
        defaultClassDiv     : "input-group",
        nullValue           : "",

        validTypes          : ['email', 'number', 'text', 'password'],// 'dropdown', 'inputmask', 'select2', 'textarea'],
        elements            : null,
        invalidIndex        : -1,

        setDefaultDatabyName            : function (pData) {
            $.each(cm.elements, function( indexE, element ) {
                if (pData[element.name]){
                    if (element.type == "select2"){
                        $("#i"+element.id).val(pData[element.name]).trigger("change");
                    }
                    else{
                        $("#i"+element.id).val(pData[element.name]);
                    }
                }
            });
        },

        getHTMLInput                    : function (pId, pClassDiv, pType, pMsgError, pPlaceholder, pIcon, pValue) {
            var html = '';
            html += '<div id="d'+pId+'" class="'+cm.defaultClassDiv+' '+pClassDiv+'">';
            html += '   <div class="input-group-prepend">';
            html += '       <span class="input-group-text">';
            html += '           <i class="'+pIcon+'"></i>';
            html += '       </span>';
            html += '   </div>';
            html += '   <input id="i'+pId+'" type="'+pType+'" class="form-control" value="'+pValue+'" placeholder="'+pPlaceholder+'">';
            if (pMsgError){
            html += '   <div class="invalid-feedback">'+pMsgError+'</div>';
            }
            html += '</div>';
            return html;
        },

        getHTMLTextarea                 : function (pElement) {
            var html = '';
            html += '<div id="d'+pElement.id+'" class="'+cm.defaultClass+'">';
            html +=    '<textarea  id="i'+pElement.id+'" rows="'+pElement.rows+'" style="resize: none" class="form-control" placeholder="'+pElement.msg.placeholder+'"></textarea >';
            html +=    '<span class="'+pElement.icon+' form-control-feedback"></span>';
            if (pElement.msg.error){
            html +=    '<span id="s'+pElement.id+'" class="help-block fa fa-close" style="display:none">'+pElement.msg.error+'</span>';
            }
            html +=    '<span id="sc'+pElement.id+'" class="help-block fa fa-close" style="display:none"> Verifique caracteres especiales </span>';
            html += '</div>';
            return html;
        },

        getHTMLDropdown                 : function (pElement, pFlagSelect2, pIdSelected) {
            var html = "";
            html +=     '<div id="d'+pElement.id+'" class="'+cm.defaultClass+'">';
            if (pFlagSelect2){
            html +=         '<select id="i'+pElement.id+'" class="form-control" style="width: 100%; background-color: black;">';
            }
            else{
            html +=         '<select id="i'+pElement.id+'" class="form-control" >';
            if (!pIdSelected){
            html +=             '<option selected value="-1">'+pElement.msg.placeholder+'</option>';
            }else{
            html +=             '<option value="-1">'+pElement.msg.placeholder+'</option>';
            }
            }
            for (var i = 0; i < pElement.opts.length; i++) {
                var selected = ""
                if (pIdSelected == pElement.opts[i].id){
                    selected="selected";
                }
                html +=         '<option '+selected+' value="'+pElement.opts[i].id+'">'+pElement.opts[i].name+'</option>';
            }
            html +=         '</select>';
            html +=         '<span id="s'+pElement.id+'" class="help-block fa fa-close" style="display:none">'+pElement.msg.error+'</span>';

            html +=     '</div>';
            return html;
        },

        resetOptionsDropdown            : function (pOpts, pId,  pIdSelected, pReadOnly, pCallback) {
            $.each(cm.elements, function( index, element ) {
                if (element.id == pId) {
                    element.opts = pOpts;
                    var html = cm.getHTMLDropdown(element, false, pIdSelected, pReadOnly);
                    $("#"+element.id).html(html);
                    if (pCallback) { pCallback(); }
                    if (pReadOnly) $("#i"+element.id).attr('disabled', true);
                }
            });
        },

        destroy                         : function (pOpts, pId) {

        },

        makeElement                     : function (pElement) {
            if ( pElement.type == "email"
              || pElement.type == "number"
              || pElement.type == "text"
              || pElement.type == "password"
              || pElement.type == "inputmask"){

                var type = pElement.type;
                if (type == "email"){
                    type = "text";
                }
                var html = cm.getHTMLInput(pElement.id, pElement.classDiv, type, pElement.msg.error, pElement.msg.placeholder, pElement.icon, pElement.valueDefault);
                $("#"+pElement.id).html(html);
                if (type == "inputmask"){
                    var mask = pElement.mask;
                    if (pElement.maskType){
                        mask = { alias: pElement.maskType, inputFormat:  pElement.mask}
                    }
                    $("#i"+pElement.id).inputmask(mask);
                }
            }
            else if (pElement.type == "dropdown") {
                var html = cm.getHTMLDropdown(pElement);
                $("#"+pElement.id).html(html);
            }
            else if (pElement.type == "select2") {
                var html = cm.getHTMLDropdown(pElement, true);
                $("#"+pElement.id).html(html);
                $("#i"+pElement.id).attr("multiple", "multiple");
                $("#i"+pElement.id).select2({ placeholder:pElement.msg.placeholder});
                $("#i"+pElement.id).val(null).trigger("change");
            }
            else if (pElement.type == "textarea") {
                var html = cm.getHTMLTextarea(pElement, true);
                $("#"+pElement.id).html(html);
            }

        },

        readOnly                        : function (pFlag) {
            $.each(cm.elements, function( pIndex, pValue ) {
                if (pValue.valid){
                    $("#i"+pValue.id).attr('disabled', pFlag);
                }
            });
        },

        init                            : function (pElements, pCallback) {
            cm.elements = pElements;
            //Verifica que todos los elementos sean válidos.
            $.each(cm.elements, function( pIndex, pValue ) {
                cm.validateElement(pValue, function (pData) {
                    if (pData.status == CONSTANS.OK){
                        pElements[pIndex].valid = true;
                        //Verifica datos opcionales y de ser nulos establece un valor por defecto
                        if (!cm.elements[pIndex].minChar)         cm.elements[pIndex].minChar = 1;
                        if (!cm.elements[pIndex].msg.error)       cm.elements[pIndex].msg.error = null;
                        if (!cm.elements[pIndex].msg.placeholder) cm.elements[pIndex].msg.placeholder = '';
                        if (!cm.elements[pIndex].icon)            cm.elements[pIndex].msg.icon = '';
                        if (!cm.elements[pIndex].required)        cm.elements[pIndex].required = false;
                        if (!cm.elements[pIndex].valueDefault)    cm.elements[pIndex].valueDefault = '';
                        //Crea el HTML del elemento
                        cm.makeElement(cm.elements[pIndex]);
                    }
                    else{
                        pElements[pIndex].valid = false;
                    }
                });
            });
            if (pCallback)
                pCallback(cm.elements);
        },

        validateElement                 : function (pElement, pCallback) {
            if (pElement.id && pElement.name && pElement.type){
                var i = cm.validTypes.findIndex(function (pData) {
                    return (pData == pElement.type);
                });
                var data = {};
                if (i == mosp.invalidIndex) {
                    data.status = CONSTANS.ERROR;
                }
                else{
                    data.status = CONSTANS.OK;
                }
                pCallback(data);
            }
            else{
                pCallback({status:CONSTANS.ERROR});
            }
        },

        mFormSetDefaultInputs           : function (pId, pVal){
            if (!pVal) pVal="";
            $("#i"+pId).attr("class", cm.defaultClass);
            $("#i"+pId).val(pVal);
        },

        mFormVerifyTextInputs           : function (pId, pMinC){
            var val = $("#i"+pId).val();
            if (val && val != cm.nullValue && val.length >= pMinC ) {
                $("#i"+pId).attr('class', cm.defaultClass);
            }
            else{
                $("#i"+pId).attr('class', cm.errorClass);
                val = null;
            }
            return val;
        },

        setDefaultFormElement           : function (pElement) {
            if ( pElement.type == "email"
              || pElement.type == "number"
              || pElement.type == "text"
              || pElement.type == "password"
              || pElement.type == "inputmask"
              || pElement.type == "textarea"){
                cm.mFormSetDefaultInputs(pElement.id);
            }
            else if ( pElement.type == "select2"){
                // $("#i"+pElement.id).val(null).trigger("change");
                cm.mFormSetDefaultInputs(pElement.id);

            }
            else if ( pElement.type == "dropdown"){
                cm.mFormSetDefaultInputs(pElement.id, "-1");
            }
        },

        setDefaultForm                  : function (pId) {
            $.each(cm.elements, function( pIndex, pValue ) {
                cm.setDefaultFormElement(pValue);
            });
        },

        changeRequired                  : function (pId, pRequired) {
            $.each(cm.elements, function( pIndex, pValue ) {
                if (pValue.id == pId){
                    pValue.required = pRequired;
                }
            });
        },

        //Setea la forma sin errores
        setFormWithoutError                  : function (pId) {
            $.each(cm.elements, function( pIndex, pValue ) {
                $("#d"+pValue.id).attr("class", cm.defaultClass);
                $("#s"+pValue.id).hide();
            });
        },

        validateMail                    : function (pMail) {
            try {
                var str = pMail.split("@");
                if (str[0].length > 0){
                    str = str[1].split(".");
                    if (str[0].length > 0 && str[1].length > 0){
                        return true;
                    }
                }
                return false;
            }
            catch(err) {
                return false;
            }
        },

        verifyMail                      : function (pId) {
            var val = $("#i"+pId).val();
            if (!cm.validateMail(val)){
                $("#i"+pId).attr('class', cm.errorClass);
                val = null;
            }
            else{
                $("#i"+pId).attr('class', cm.defaultClass);
            }
            return val;
        },

        validateDropdown                : function (pId) {
            var val = $("#i"+pId).val();
            if (val && val != "-1"  ) {
                $("#i"+pId).attr('class', cm.defaultClass);
            }
            else{
                $("#i"+pId).attr('class', cm.errorClass);
                val = null;
            }
            return val;
        },

        validateMask                    : function (pValue) {
            var val = $("#i"+pValue.id).val();
            if ((pValue.maskc != val[pValue.mask.length-1]) && val.length > 0 ){
                $("#i"+pValue.id).attr('class', cm.defaultClass);
            }
            else{
                $("#i"+pValue.id).attr('class', cm.errorClass);
                val = null;
            }
            return val;
        },

        validateSelect2                 : function (pValue) {
            var val = $("#i"+pValue.id).val();
            if (val){
                $("#i"+pValue.id).attr('class', cm.defaultClass);
            }
            else{
                $("#i"+pValue.id).attr('class', cm.errorClass);
                val = null;
            }
            return val;
        },

        validateTextarea                : function (pValue) {
            var val = $("#i"+pValue.id).val();
            if (val){
                $("#i"+pValue.id).attr('class', cm.defaultClass);
            }
            else{
                $("#i"+pValue.id).attr('class', cm.errorClass);
                val = null;
            }
            return val;
        },

        /*
         * Dado un numero entero retorna el largo del numero
         */
        getLenghtNumber: function(pNumber) {
            var n = pNumber;
            var i;
            for (i = 1; 10 <= n; i++) {
                n = Math.trunc(n / 10);
            }
            return i;
        },

        verifyNumber: function(pValue) {
            var val = $("#i"+pValue.id).val();
            var length = cm.getLenghtNumber(parseInt(val));
            if (length == val.length){
                $("#i"+pValue.id).attr('class', cm.defaultClass);
                val = cm.mFormVerifyTextInputs(pValue.id, pValue.minChar);
            }
            else{
                $("#i"+pValue.id).attr('class', cm.errorClass);
                val = null;
            }
            return  val;
        },


        validateInput                   : function (pValue, pNotRequidedExeption) {
            var val = null;
            if (pValue.required || pNotRequidedExeption){
                if (pValue.type == "email"){
                    val = cm.verifyMail(pValue.id);
                } else if (pValue.type == "text" || pValue.type == "password" || pValue.type == "textarea"){
                    val = cm.mFormVerifyTextInputs(pValue.id, pValue.minChar);
                } else if (pValue.type == "number"){
                    val = cm.verifyNumber(pValue);
                } else if (pValue.type == "dropdown") {
                    val = cm.validateDropdown(pValue.id);
                } else if (pValue.type == "inputmask") {
                    val = cm.validateMask(pValue);
                } else if (pValue.type == "select2") {
                    val = cm.validateSelect2(pValue);
                }
            }
            //Caso especial para obtener info del slect cuando no es requerido
            else if (!pValue.required && pValue.type == "select2"){
                val = $("#i"+pValue.id).val();
            }
            else{
                cm.setDefaultFormElement(pValue);
            }
            return val;
        },

        validateForm                    : function (pCallback) {
            var data = {status: CONSTANS.OK, data:{}};
            $.each(cm.elements, function( pIndex, pValue ) {
                if (pValue.valid){
                    var notRequidedExeption = (!pValue.required && $("#i"+pValue.id).val() != cm.nullValue);
                    //No aplica para los siguientes
                    if (pValue.type == "select2" || pValue.type == "dropdown") notRequidedExeption = false;
                    var val = cm.validateInput(pValue, notRequidedExeption);
                    data.data[pValue.name] = val;
                    if ((pValue.required && !val) || (notRequidedExeption && !val)){
                        data.status = CONSTANS.ERROR;
                    }
                    if (!val){
                        delete data.data[pValue.name];
                    }
                }
                else{
                    if (pValue.required){
                        data.status = CONSTANS.ERROR;
                    }
                }
            });
            if (pCallback) pCallback(data);
        },

    };
    cm.init(pElements, pCallback);
    return cm;
}
