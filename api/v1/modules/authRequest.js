/*
@author: Aaron Elizondo
@email: elizondo2356@gmail.com
@github: aaroneg23
@description:
*/

//Constants
var GLOBALS 	    = require('../constants/globals.js');
// var CODESMSG	 	= require('../constants/codesmsg.js');
var CODES	 	    = require('../constants/codes.js');
// var COLLECTIONS     = require('../constants/collections.js');
var MODELS          = require('../constants/models.js');

//Models
var _mModels 		= require('../models/models.js');

//Modules
var _Mjwt 			= require('./jwt.js');

//General

var authRequest  	= {

    verifyToken         : function (pReq, pData, pCallback) {
        _Mjwt.verifyJWT(pData, function (result) {
            if (result.status == CODES.OK){
                pReq.xlog.session = result.data.session;
                pReq.xlog.user    = result.data.user.id;
                pReq.xlog.org     = result.data.org
            }
            pCallback(result);
        });

    },

    verifySession       : function (pReq, pFilters, pCallback) {
        if (!GLOBALS.EXEC_AUTH.includes(pReq.originalUrl)){
            _mModels.do({
                collection  : MODELS.SESSIONS,
                action		: GLOBALS.FUCTIONS_MODELS.FINDONE,
                filters    	: pFilters
            }, function (pData) {
                if (pData.status == CODES.OK){
                    if (pData.data.ip == pReq.xlog.ip && pReq.headers[GLOBALS.H_DEVICE] == pData.data.device){
                        pCallback({status:CODES.OK, session:pData.data});
                    }
                    else{
                        pCallback({status:CODES.ERROR_INVALIDSESSION});
                    }
                }
                else{
                    pCallback({status:CODES.ERROR_INVALIDSESSION});
                }
            });
        }
        else{
            pCallback({status:CODES.OK});
        }
    },

    verifyKeepOpen      : function (pReq, pCallback) {
        authRequest.verifyToken(pReq, {token:pReq.headers.token, ignoreExpiration:true}, function (token) {
        if (token.status == CODES.OK){
            authRequest.verifySession(pReq, {_id:token.data.session, keepOpen:true}, function (session) {
            if (session.status == CODES.OK){
                var ms = Math.abs(new Date(session.session.updated)-new Date());
                if (ms>parseInt(GLOBALS.EXPIRED_TIME_JWT)){
                    _Mjwt.signJWT({user:token.data.user, session:token.data.session, ip:token.data.ip}, function(jwt){
                        pReq.xlog.update = {token:jwt.token};
                        session.session.updated = new Date().toISOString();
                        _mModels.do({
                            action      : GLOBALS.FUCTIONS_MODELS.UPDATEONE,
                            collection  : MODELS.SESSIONS,
                            data        : session.session,
                            filters     : {_id:token.data.session}
                        });
                        pCallback({status:CODES.OK});
                    });
                }
                else {
                    pCallback({status:CODES.ERROR_INVALIDSESSION});
                }
            }
            else {
                pCallback({status:CODES.ERROR_INVALIDSESSION});
            }
            });
        }
        else {
            pCallback({status:CODES.ERROR_INVALIDSESSION});
        }
        });
    },

    verifyPermits       : function (pRole, pCallback) {
        
    },

    auth                : function (pReq, pRes, pCallback) {
        if (!GLOBALS.EXEC_AUTH.includes(pReq.originalUrl)){
            authRequest.verifyToken(pReq, {token:pReq.headers.token}, function (data) {
                var updateJWT = data.err && data.err.name == GLOBALS.JWT_EXPIRED;
                if (data.status == CODES.OK){
                    authRequest.verifySession(pReq, {_id:data.data.session}, function (result) {
                        if (pCallback) pCallback(result);
                    });
                }
                else if (updateJWT){
                    authRequest.verifyKeepOpen(pReq, function (result) {
                        if (pCallback) pCallback(result);
                    });
                }
                else{
                    if (pCallback) pCallback(data);
                }
            });
        }
        else{
            pCallback({status:CODES.OK});
        }
    },

};

module.exports = authRequest;
