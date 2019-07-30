$( document ).ready(function(){
  mosp.init();
});

var mosp = {

    optsTable: {
        columns     : ["Fecha", "Monto", "Nombre"],
        showPaging  : true,
        showSearch  : false,
        showInfor   : true,
        divId       : "dTranfers",
        initialPage : 1,
        searchField : "",
        records     : 25,
        labels: {
            notResults  : "No se han encontrado transferencias",
            search      : "Buscar",
            paging      : "Tranferencia"
        }
    },

    tableFilters        : {
        count       : true,
        phone      : JSON.parse(localStorage.getItem(CONSTANS.USER)).phone
    },

    modals                      : [
    ],
    thisPage                    : "tranfers",


    init: function() {
             console.log(JSON.parse(localStorage.getItem(CONSTANS.USER)));

        plGlobals.configPage(mosp.modals,mosp.thisPage,function(){
            mosp.initListeners();
            mosp.startTable();
        });
    },


    initListeners: function() {

    },

    /*
     *  Se utiliza para inicializar la tabla, se configura
     * y establecen callbacks para la actualizacion
     */
    startTable: function() {
        //Variable gloabal para guardar la tabla
        mosp.tlib = tableManagerObj();
        //Se inicializa la nueva tabla
        mosp.tlib.newTable(mosp.optsTable,
            //callback para cambio de paginacion y buscador
            function(pData) {
                pData.page--;
                //Se establecene los filtros
                mosp.tableFilters.page = pData.page;
                (pData.search && pData.search.length>0)  ? mosp.tableFilters.search = pData.search : delete mosp.tableFilters.search;
                mosp.tableFilters.perPage = pData.records;
                //Se actualiza la tabla
                mosp.cbTable();
            },
            //Callback para manejar eventos de botones
            function(buttonId) {
                
            }
        );
    },

    //Se usa para la actualizacion de la informacion de la tabla
    cbTable: function() {
        //Muestra el loader
        console.log(mosp.tableFilters);
        plGlobals.backEnd("POST", "/admin/tranfers/phoneList", mosp.tableFilters,
            function(response) {
                mosp.requestData = response;
                var rows = new Array();
                $.each(response.data, function(index, file){
                    col = new Array();
                    col[0] = { data: plGlobals.getDateFormat(file.inserted, true)};
                    col[1] = { data: file.value};
                    col[2] = { data: file.name };
                    rows[rows.length] = col;
                });
                mosp.tlib.setRegistersTable({ columns: rows, entries: response.count });
            }
        );
    },


};
