$(function() {
    plGlobals.queryProps = plGlobals.getQueryString();
    plGlobals.listeners();
    plGlobals.config();
});

var CODES    = {
    OK              : 100,
    ERROR           : 200,
};

var CONSTANS    = {

    PRINT                   : false,
    IS_MOBILE               : false,

    OK                      : 100,
    ERROR                   : 200,
    FOOTER                  : 'includes/footer.html',
    HEADER                  : 'includes/header.html',
    NAV                     : 'includes/nav.html',
    LOADER_MODAL            : 'modals/loader/modal.html',
    PAGE_ICON               : 'img/icon.png',
    PAGE_TITLE              : '',
    DELAY_NOTIF_UPDATE      : 3000,
    NOT_SHOW_LOADER         : [
    ],
    FORMAT                  : /[',"%-]/,
    //Local Storage
    TOKEN                   : "tokenoauth",
    USER                    : "user_info",
    LOGINMSG                : "login_msg",
    TRANSFERMSG             : "transfer_msg",

    API_VERSION             : "/api/v1",
    LOCAL_END_POINT         : "http://localhost:5000",

};

var plGlobals   = { 
    queryProps          : null,
    middleDelay         : 500,
    longDelay           : 1000,
    delayFloatNotif     : 5000,
    endPoint            : "",      
    restHeightContent   : 100,
    actualPage          : null,
    role                : null,
    loader              : loaderModalObj(),
    loaderCount         : 0,
    

    getDateFormat: function(pDate, pWithHour) {
        let date = new Date(pDate);
        let year    = date .getFullYear();
        let month   = ((date.getMonth()+1) > 9) ? (date.getMonth()+1) : "0"+(date.getMonth()+1);
        let day     = ((date.getDate()) > 9) ? (date.getDate()) : "0"+(date.getDate());
        let out = year + "/" + month + "/" + day;
        if (pWithHour){
            let hour     = ((date.getHours()) > 9) ? (date.getHours()) : "0"+(date.getHours());
            let minutes     = ((date.getMinutes()) > 9) ? (date.getMinutes()) : "0"+(date.getMinutes());
            out += " " + hour + ":" + minutes
        }
        return out;
    },

    isLogged: function() {
        return (localStorage.getItem(CONSTANS.TOKEN)) ?
            true :
            false ;
    },

    config: function() {
        if (window.location.origin.includes("localhost")) {
            plGlobals.endPoint = CONSTANS.LOCAL_END_POINT;
            CONSTANS.PRINT = true;
        }
        else{
            plGlobals.endPoint = window.location.origin;
        }

        plGlobals.endPoint+=CONSTANS.API_VERSION;

        if (CONSTANS.IS_MOBILE){
            plGlobals.endPoint="https://fmimh.herokuapp.com"+CONSTANS.API_VERSION;
            CONSTANS.PRINT = false;
        }
    },
    
    setLocalStarageNull: function() {
        localStorage.removeItem(CONSTANS.TOKEN);
    },

    logout: function() {
        plGlobals.setLocalStarageNull();
        plGlobals.rediret("app");
        return 0;
    },

    listeners : function () {
        $("#dHeader").on('click', '#btn-logout', function () {
            plGlobals.logout();
        });
    },

    rediret: function(pPage) {
        var url = pPage; 
        (CONSTANS.IS_MOBILE) ? url += "/index.html" : null;
        window.location.href = url;
    },

    rediretError: function(pPage) {
        var page = "error?"
        if (plGlobals.actualPage) page+="back="+plGlobals.actualPage;
        plGlobals.rediret(page);
    },

    rediret500: function() {
        plGlobals.rediret("app/500");
    },

    rediretLogin: function() {
        plGlobals.setLocalStarageNull();
        localStorage.setItem(CONSTANS.LOGINMSG, true);
        setTimeout(function(){ plGlobals.rediret('app') }, plGlobals.longDelay);
    },

    configLogin: function () {
        var modals = new Array();
        modals.push(CONSTANS.LOADER_MODAL);
        $.each(modals, function( index , path ) {
            $.get(path, '', function (data) { $("#dModals").append(data); });
        });
    },

    configPage: function (pModals, pId, pCallback) {
        let user = JSON.parse(localStorage.getItem(CONSTANS.USER));
        console.log(user);

        // 
        if (plGlobals.isLogged()){
            pModals.push(CONSTANS.LOADER_MODAL);
            $.each(pModals, function( index , path ) {
                $.get(path, '', function (data) { $("#dModals").append(data); });
            });
            $('#dNav').load(CONSTANS.NAV, function () {
               $('#dHeader').load(CONSTANS.HEADER, function () {
                    $('#dFooter').load(CONSTANS.FOOTER, function () {
                        if (user._id = "5d40857cfc3d150004605bd0"){
                            $("#img-avatar").html('<img  class="img-avatar" src="img/avatars/maria.png">');
                        }
                        $('#page-title').text(CONSTANS.PAGE_TITLE);
                        $('#page-icon').attr("href", CONSTANS.PAGE_ICON);
                        $("#dLoad").hide();
                        $("div[name='hideLoading']").show();
                        $("#dFooter").show();
                        $("#nav-"+pId).attr("class", "nav-link active");
                        if (pCallback) pCallback();
                    });
                });
            });
        }
        else{
            plGlobals.rediretLogin();
        }
    },

    // acitva las opciones del sidebar.
    showAllowPages: function(pAllowIds, pId) {
        for (var i = 0; i < pAllowIds.length; i++) {
            $('#sidebar-'+pAllowIds[i]).show();
        }
        $('#sidebar-'+pId).attr("class", "active");
    },

    backEnd: function(type, url, params, callback, error, upload) {
        plGlobals.showLodr(url);
        urlRequest = plGlobals.endPoint + url;
        $.ajax({
            headers: {
                token: localStorage.getItem(CONSTANS.TOKEN),
                device: "browser"
            },
            dataType: 'json',
            contentType: 'application/json',
            method: type,
            url: urlRequest,
            data: type == 'GET' ? params : JSON.stringify(params),
            timeout: upload ? 240000 : 10000,
            success: function(response, status) {
                plGlobals.hideLodr();
                plGlobals.log('REQUEST: '+url);
                plGlobals.log(params);
                plGlobals.log(response);
                plGlobals.log('<<<<<<<<<<!>>>>>>>>>>');
                if (callback) {
                    if (response.status == 207 || response.status == 213){
                        plGlobals.rediretLogin();
                    }
                    else{
                        callback(response);
                    }
                }
            },
            error: function(xhr, status, err) {
                plGlobals.hideLodr();
                plGlobals.log('REQUEST: '+url);
                plGlobals.log(JSON.stringify(params));
                plGlobals.log(status);
                plGlobals.log('<<<<<<<<<<!>>>>>>>>>>');
                if (error) {
                    error(err, status);
                } else {
                    plGlobals.rediret500();
                }
            }
        });
    },

    showLodr : function (pUrl) {
        var flag = true;
        $.each(CONSTANS.NOT_SHOW_LOADER, function(index, url){
            if (pUrl == url) flag = false;
        });
        if (flag){
            plGlobals.loaderCount++;
            plGlobals.loader.show();
        }
    },

    hideLodr : function (pUrl) {
        plGlobals.loaderCount--;
        if (plGlobals.loaderCount == 0){
            plGlobals.loader.hide();
        }
    },

    /*
    {
        icon            : string,
        title           : string,
        message         : string,
        position        : "top" | "bottom",
        align           : "left" | "center" | "right",
        delay           : int,
        type            : "danger" | "info" | "warning" | "success",
    }   
    */
    notification: function(pOpts) {
        if (pOpts){ 
        $.notify({
            // options
            icon: (pOpts.icon) ? pOpts.icon : "",
            title: (pOpts.title) ? pOpts.title : "",
            message: (pOpts.message) ? pOpts.message : "",
        },{
            // settings
            element: 'body',
            position: null,
            type: (pOpts.type) ? pOpts.type : "info",
            allow_dismiss: true,
            newest_on_top: false,
            showProgressbar: false,
            placement: {
                from: (pOpts.position) ? pOpts.position : "top",
                align: (pOpts.align) ? pOpts.align : "right"
            },
            offset: {
                x: 10,
                y: 65            
            },
            spacing: 20,
            z_index: 1031,
            delay: (pOpts.delay) ? pOpts.delay : CONSTANS.DELAY_NOTIF_UPDATE,
            timer: 1000,
            url_target: '_blank',
            mouse_over: null,
            animate: {
                enter: 'animated fadeInDown',
                exit: 'animated fadeOutUp'
            },
            onShow: null,
            onShown: null,
            onClose: null,
            onClosed: null,
            icon_type: 'class',
            template: '<div data-notify="container " class="animated fadeIn col-xs-10 col-sm-4 alert alert-{0}" role="alert">' +
                '<button type="button" aria-hidden="true" class="close" data-notify="dismiss">×</button>' +
                '<span data-notify="icon"></span> ' +
                '<span data-notify="title">{1}</span> ' +
                '<span data-notify="message">{2}</span>' +
                '<div class="progress" data-notify="progressbar">' +
                    '<div class="progress-bar progress-bar-{0}" role="progressbar" aria-valuenow="0" aria-valuemin="0" aria-valuemax="100" style="width: 0%;"></div>' +
                '</div>' +
                '<a href="{3}" target="{4}" data-notify="url"></a>' +
            '</div>' 
        });
        }
        
    },

    log             : function (pData){
        if (CONSTANS.PRINT){
            console.log(pData);
        }
    }, 
    
    getQueryString: function() {
        var query_string = {};
        var query = window.location.search.substring(1);
        var vars = query.split("&");
        for (var i = 0, len = vars.length; i < len; i++) {
            var pair = vars[i].split("=");

            switch(typeof query_string[pair[0]] ){
                case "undefined":
                    query_string[pair[0]] = decodeURIComponent(pair[1]);
                    break;
                case "string":  
                    var arr = [query_string[pair[0]], decodeURIComponent(pair[1])];
                    query_string[pair[0]] = arr;
                    break;
                default :
                    query_string[pair[0]].push(decodeURIComponent(pair[1]));
                    break; 
            }
        }
        return query_string;
    }
};
