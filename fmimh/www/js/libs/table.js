/*
Parametros para configurar la tabla
{
    columns     : array,        //Nombres de las columns
    showPaging  : boolean,      //Muestra controles de paginacion
    showSearch  : boolean,      //Muestra barra de busqueda
    showInfor   : boolean,      //Muestra informacion de paginas
    divId       : string,       //Div de la tabla
    records     : int,          //Numero de registros por pagina
    initialPage : int,          //Numero de pagina inicial
    searchField : string,       //Defecto del buscador
    labels      : {
        notResults : string,    //Leyenda cuando no hayan resultados
        search     : string     //Leyenda para buscar
        paging     : string,    //Leyenda de mostrando
    }
}

Ejemplo
//Se defina las opciones de la tabla
var tlib = tableManagerObj();
var opts = {
    columns     : ["Columna1"],
    showPaging  : true,
    showSearch  : false,
    showInfor   : true,
    divId       : "dHistoricTable",
    initialPage : 1,
    records     : 10,
    labels      : {
        notResults : "No se han encontrado servicios",
        search     : "Buscar servicio",
        paging     : "Mostrando servicios"
    }
};
//Basicamnete ese debe ser el formato de las columnaas al insertar
//usando el metodo tlib.setRegistersTable();
var model = [
    [{data:1, button:{class:"btn btn-info", icon:"icon-moover", pos:"before", id:"btn1"}}],
    [{data:2, button:{class:"btn btn-info", icon:"icon-moover", pos:"after", id:"btn2"}}],
    [{data:3, rowspan:1, color:blue, newTR}]
];
//Ópciones
//data : dato de la columna
//rowspan
//color color de fonfo
//newTR true y crea una nueva fila
//button se agrega un boton opciones: class, icon, pos, id
//Se crea la tabla, hay un callback para los listenes de buscador y paginacion
//y otro para los botones que se agreguen
tlib.newTable(opts, function(pData){//para paginacion y search
    var regs = {columns:model, entries:300}
    tlib.setRegistersTable(regs);
}, function(pBtnId){//para los botones

});
*/

function tableManagerObj() {
    var cm = {

        page: 1,
        maxPage: 1,
        opts: {},
        cols: 0,
        callback: null,
        labels: {
            notResults: "No se encontraron resultados",
            search: "Buscar",
            paging: "Mostrando resultados",
        },

        /*
         * Crea una nueva tabla segun las opciones puestas,
         * las mismas se especifican al principio del archivo
         * el otro argumento es el callback llamado cuando cambia
         * la paginacion o el buscador
         */
        newTable: function(pOpts, pCallBack, pCallBackButtons) {
            //Guarda las opciones
            cm.opts = pOpts;
            cm.cols = pOpts.columns.length;
            if (pOpts.labels) {
                if (pOpts.labels.notResults) {
                    cm.labels.notResults = pOpts.labels.notResults;
                }
                if (pOpts.labels.search) {
                    cm.labels.search = pOpts.labels.search;
                }
                if (pOpts.labels.paging) {
                    cm.labels.paging = pOpts.labels.paging;
                }
            }
            //Si se especifica el argumento de pagina inicial
            (cm.opts.initialPage) ? cm.page = cm.opts.initialPage: cm.page = 1;
            //Genera el html de la tabla (caparazon)
            var html = cm.generateHtmlTable(pOpts);
            $("#" + pOpts.divId).html(html);
            if (pOpts.searchField) {
                $("#" + pOpts.divId + "search").val(pOpts.searchField);
            }
            //Inicializa los listeners de la tabla
            cm.initListeners(pOpts, pCallBack, pCallBackButtons);
            //Configura la paginacion de la tabla
            cm.pagControl(pOpts);
            //Carga la informacion inicial de la pagina
            pCallBack({ search: $('#' + pOpts.divId + 'search').val(), page: cm.page, records: pOpts.records });
        },

        /*
         * Genera el html de la tabla (caparazon)
         */
        generateHtmlTable: function(pOpts) {
            //Genera la barra de busqueda
            var htmlSearch = '';
            if (pOpts.showSearch) {
                htmlSearch += cm.getHtmlSearchTable(pOpts.divId);
            }
            var htmlInfo = cm.getHtmlInfoAndPagControl(pOpts);
            //genera la tabla
            var htmlBody = '';
            htmlBody += '<div name="' + pOpts.divId + 'tableDOM" class="table-responsive-xl">';
            htmlBody += '<table class="table table-borderless">';
            htmlBody += '<thead><tr style="background-color:#ddd;" >';
            for (var i = 0; i < pOpts.columns.length; i++) {
                htmlBody += '<th>' + pOpts.columns[i] + '</th>';
            }
            htmlBody += '</tr></thead>';
            //Genera la parte de informacion
            htmlBody += '<tbody id="' + pOpts.divId + 'tableData" align="left"></tbody>';
            htmlBody += '</table>';
            htmlBody += '</div>';
            var html = '<div>' + htmlSearch + htmlInfo + htmlBody + htmlInfo + '</div>';
            return html;
        },

        /*
         * Genera el html de la barra de busqueda
         */
        getHtmlSearchTable: function(divId) {
            var htmlSearch = '';
            htmlSearch += '<div class="row mt-2" name="' + divId + 'tableDOM">';
            htmlSearch += '<div class="col-sm-6 offset-sm-6">';
            htmlSearch += '<div class="input-group" >';
            htmlSearch += '<input id="' + divId + 'search" type="text" class="form-control" placeholder="' + cm.labels.search + '">';
            htmlSearch += '<div class="input-group-append"><span class="input-group-text"><i class="fa fa-search"></i></span></div>';
            htmlSearch += '</div>';
            htmlSearch += '</div>';
            htmlSearch += '</div>';
            return htmlSearch;
        },

        /*
         * Genera el html de la parte de informacion y la paginacion
         */
        getHtmlInfoAndPagControl: function(pOpts) {
            var htmlInfo = '';
            //Informacion de entries
            htmlInfo += '<div class="row mt-2 mb-2" name="' + pOpts.divId + 'tableDOM" style="width:100%;">';
            htmlInfo += '<div class="col-8 col-sm-6" align="left" >';
            if (pOpts.showInfor) {
                htmlInfo += '<p name="' + pOpts.divId + 'infoPage" class="table-text-info"> </p>';
            }
            htmlInfo += '</div>';
            //Inoformacion de paginacion
            htmlInfo += '<div class="col-4 col-sm-6 mobile-col-sm-6">';
            if (pOpts.showPaging) {

                htmlInfo += '<nav>';
                htmlInfo += '<ul class="pagination justify-content-end" style="margin: 0px">';
                htmlInfo += '<li class="page-item" name="' + pOpts.divId + 'antPag">';
                htmlInfo += '      <a class="page-link">';
                htmlInfo += '        <span aria-hidden="true">&laquo;</span>';
                htmlInfo += '        <span class="sr-only">Anterior</span>';
                htmlInfo += '      </a>';
                htmlInfo += '</li>';
                htmlInfo += '<li class="page-item" ><a name="' + pOpts.divId + 'nPag" class="page-link">' + cm.page + '</a></li>';
                htmlInfo += '<li class="page-item" name="' + pOpts.divId + 'sigPag">';
                htmlInfo += '      <a class="page-link">';
                htmlInfo += '        <span aria-hidden="true">&raquo;</span>';
                htmlInfo += '        <span class="sr-only">Siguiente</span>';
                htmlInfo += '      </a>';
                htmlInfo += '</li>';
                htmlInfo += '</ul>';
                htmlInfo += '</nav>';
            }
            htmlInfo += '</div>';
            htmlInfo += '</div>';
            return htmlInfo;
        },

        /*
         * Oculta o muestra los botones de pagina anterior o siguiente en la paginacion
         */
        pagControl: function(pOpts) {
            //Oculta el boton de pagina siguiente
            if (cm.page >= cm.maxPage) {
                $('li[name="' + pOpts.divId + 'sigPag"]').hide();
            }
            //Muestra el boton de pagina siguiente
            else {
                $('li[name="' + pOpts.divId + 'sigPag"]').show();
            }
            //Oculta el boton de pagina anterior
            if (cm.page <= 1) {
                $('li[name="' + pOpts.divId + 'antPag"]').hide();
            }
            //Muestra el boton de pagina anterior
            else {
                $('li[name="' + pOpts.divId + 'antPag"]').show();
            }
        },

        /*
         * Inicia los listeners de la tabla
         */
        initListeners: function(pOpts, pCallBack, pCallBackButtons) {
            //Listener para pagina anterior
            $("#" + pOpts.divId).on('click', 'li[name="' + pOpts.divId + 'antPag"]', function(e) {
                cm.page -= 1;
                $('a[name="' + pOpts.divId + 'nPag"]').html(cm.page);
                pCallBack({ search: $('#' + pOpts.divId + 'search').val(), page: cm.page, records: pOpts.records });
            });
            //Listener para pagina siguiente
            $("#" + pOpts.divId).on('click', 'li[name="' + pOpts.divId + 'sigPag"]', function(e) {
                cm.page += 1;
                $('a[name="' + pOpts.divId + 'nPag"]').html(cm.page);
                pCallBack({ search: $('#' + pOpts.divId + 'search').val(), page: cm.page, records: pOpts.records });
            });
            //Listener para el buscador
            $("#" + pOpts.divId).on('keyup', '#' + pOpts.divId + 'search', function(e) {
                if (e.keyCode == 13 ) {
                    cm.page = 1;
                    $('a[name="' + pOpts.divId + 'nPag"]').html(cm.page);
                    pCallBack({ search: $('#' + pOpts.divId + 'search').val(), page: cm.page, records: pOpts.records });
                }
                else if ($('#' + pOpts.divId + 'search').val() == ""){
                    cm.page = 1;
                    $('a[name="' + pOpts.divId + 'nPag"]').html(cm.page);
                    pCallBack({ search: $('#' + pOpts.divId + 'search').val(), page: cm.page, records: pOpts.records });
                }

            });
            //Listener para los botones de las tablas
            $("#" + pOpts.divId + "tableData").on('click', '.btn', function(e) {
                pCallBackButtons(e.target.id);
            });
            cm.callback = pCallBack;

        },

        manualCallback: function(pNotResetPage) {
            if (!pNotResetPage) cm.page = 1;
            $('a[name="' + cm.opts.divId + 'nPag"]').html(cm.page);
            cm.callback({ search: $('#' + cm.opts.divId + 'search').val(), page: cm.page , records: cm.opts.records });
        },


        /*
         * Setea las columnas de informacion,
         */
        setRegistersTable: function(pData) {
            cm.setMaxPage(pData.entries);
            if (pData.columns.length > 0) {
                var html = cm.generateRegistersTable(pData.columns);
                $("#" + cm.opts.divId + "tableData").html(html);
            } else {
                $("#" + cm.opts.divId + "tableData").html(cm.getNotResults());
            }
        },

        /*
         * Setea y configura el número máximo de página
         */
        setMaxPage: function(pEntries) {
            //calculo el maximo
            cm.maxPage = Math.ceil(pEntries / cm.opts.records);
            //Actualiza la info
            var info = "";
            if (pEntries > 0) {
                var maxRegShow = cm.page * cm.opts.records;
                if (maxRegShow > pEntries) {
                    maxRegShow = pEntries;
                }
                info = cm.labels.paging + " " + ((cm.page - 1) * cm.opts.records + 1) +
                    " a " + maxRegShow + " de " + pEntries;
            }
            $('p[name="' + cm.opts.divId + 'infoPage"]').html(info);
            //Actualiza control de paginacion
            cm.pagControl(cm.opts);
        },

        /*
         * Retorna el html con la informacion de las columnas
         */
        generateRegistersTable: function(pData) {
            var html = "";
            for (var i = 0; i < pData.length; i++) {
                html += "<tr style='background-color:" + pData[i][0].color + "'>";
                for (var j = 0; j < pData[i].length; j++) {
                    if (pData[i][j].newTR) {
                        html += "</tr><tr style='background-color:" + pData[i][0].color + "'>";
                    }
                    html += "<td";
                    if (pData[i][j].rowspan) {
                        html += " rowspan='" + pData[i][j].rowspan + "' ";
                    }
                    html += ">" + cm.generateRegister(pData[i][j]) + "</td>";
                }
                html += "</tr>";
            }
            return html;
        },

        /*
         * Genera el registro de una fila
         */
        generateRegister: function(pData) {
            var reg = "";
            reg += "<div align='left' class='row'>";
            if (pData.button) { //Si se debe agregar un botón
                // if (pData.button.pos == "after") {
                    // reg += "<div class='col-9'>" + pData.data + "</div>";
                    reg += "<div class='col-12'>" + cm.generateButton(pData.button) + "</div>";
                // } else {
                    // reg += "<div class='col-12'>" + cm.generateButton(pData.button) + "</div>";
                    // reg += "<div class='col-9' align='center'>" + pData.data + "</div>";
                // }
            } else { //Agrega solo el dato
                reg += "<div class='col-12'>" + pData.data + "</div>";
            }
            reg += "</div>";
            return reg;
        },

        /*
         * Genera el botón de una columna
         */
        generateButton: function(pButton) {
            return  "<button id='" + pButton.id + "' class='btn " + pButton.class + " btn-rounded'>" +
                "<i id='" + pButton.id + "' class='" + pButton.icon + "' role='button'></i>" +
                "</button>";
        },

        /*
         * Retorna un html indicando que no se devuelven resultados
         */
        getNotResults: function() {
            var html = '<tr align="center" class="odd"><td valign="top" colspan="' + cm.cols + '" class="dataTables_empty">' +
                cm.labels.notResults + '</td></tr>'
            return html;
        },

        /*
         * Retorna la página actual
         */
        getPage: function() {
            return cm.page
        }

    };
    return cm;
}
