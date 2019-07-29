/*
@author: Aaron Elizondo
@email: elizondo2356@gmail.com
@github: aaroneg23
@description:
*/

//Constants
var GLOBALS 	    = require('../constants/globals.js');
var CODESMSG	 	= require('../constants/codesmsg.js');
var CODES	 	    = require('../constants/codes.js');
// var COLLECTIONS     = require('../constants/collections.js');
var MODELS          = require('../constants/models.js');

//Modelos
var _mModels 		= require('../models/models.js');

//Modules
//General

var commands  	= {

    sendResponse    : function (pData, pReq, pRes) {
        pReq.xlog.body = pReq.body;
        pReq.xlog.status= pData.status;
        pData.msg = CODESMSG[pData.status];
        if (pReq.xlog.update && pReq.xlog.update.token) pData.token = pReq.xlog.update.token;
        pRes.status(CODES.HTTP_OK).send(pData);
        if (pReq.xlog.body && pReq.xlog.body.password){
            delete pReq.xlog.body.password;
        };
        if (!pReq.xlog.body) pReq.xlog.body = {};
        var body = {
            collection  : MODELS.LOG,
            action		: GLOBALS.FUCTIONS_MODELS.INSERT,
            data    	: pReq.xlog
        }
        _mModels.do(body, function(data){});
    },

};

module.exports = commands;
