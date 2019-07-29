/*
@author: Aaron Elizondo
@email: elizondo2356@gmail.com
@github: aaroneg23
@description:
*/

//Constants
// var GLOBALS 	    = require('../constants/globals.js');
// var CODESMSG	 	= require('../constants/codesmsg.js');
var CODES	 	    = require('../constants/codes.js');
// var COLLECTIONS     = require('../constants/collections.js');
// var MODELS          = require('../constants/models.js');

//Models

//Modules
var _Mmongo			= require('./mongodb.js');
var _Mcommon 		= require('./common.js');

//General

var defaultMethods = {

    INSERT	            : function(pData, pCallback){
        _Mmongo.connectDB(function (pStatusDB) {
            if (pStatusDB.status == CODES.OK){
                var reg   = new pData.model(pData.data);
                reg.save(function (err, data) {
                    defaultMethods.respond(pData, CODES.ERROR_MODEL, err, data, pCallback);
                });
            }
            else {
                pCallback(pStatusDB);
            }
        });
    },

    FIND                : function(pData, pCallback){
        _Mmongo.connectDB(function (pStatusDB) {
            if (pStatusDB.status == CODES.OK){
                
                var query = pData.model.find(pData.filters);
                if (pData.perPage>=0 && pData.page>=0) {
                    query.limit(pData.perPage)
                    query.skip(pData.perPage * pData.page)
                }
                if (pData.count){
                    pData.model.countDocuments(pData.filters, function (err, count) {
                        if (count){
                             pData.count = count;
                             defaultMethods.doQuery(query, CODES.ERROR_NOTEXITSDATA, pData, pCallback);
                        }
                        else {
                             pData.count = -1;
                             defaultMethods.doQuery(query, CODES.ERROR_NOTEXITSDATA, pData, pCallback);
                        }
                    });
                }
                else{ 
                    defaultMethods.doQuery(query, CODES.ERROR_NOTEXITSDATA, pData, pCallback);
                }
            }
            else {
                pCallback(pStatusDB);
            }
        });
    },

    FINDONE		        : function(pData, pCallback){
        _Mmongo.connectDB(function (pStatusDB) {
            if (pStatusDB.status == CODES.OK){
                var query = pData.model.findOne(pData.filters);
                defaultMethods.doQuery(query, CODES.ERROR_NOTEXITSDATA, pData, pCallback);
            }
            else {
                pCallback(pStatusDB);
            }
        });
    },

    DELETEONE			: function(pData, pCallback){
        _Mmongo.connectDB(function (pStatusDB) {
            if (pStatusDB.status == CODES.OK){
                var query = pData.model.findOneAndRemove(pData.filters);
                defaultMethods.doQuery(query, CODES.ERROR_NOTEXITSDATA, pData, pCallback);
            }
            else {
                pCallback(pStatusDB);
            }
        });
    },

    DELETE  			: function(pData, pCallback){
        _Mmongo.connectDB(function (pStatusDB) {
            if (pStatusDB.status == CODES.OK){
                var query = pData.model.deleteMany(pData.filters);
                defaultMethods.doQuery(query, CODES.ERROR_NOTEXITSDATA, pData, pCallback);
            }
            else {
                pCallback(pStatusDB);
            }
        });
    },

    UPDATEONE			: function(pData, pCallback){
        _Mmongo.connectDB(function (pStatusDB) {
            if (pStatusDB.status == CODES.OK){
                var query = pData.model.updateOne(pData.filters, pData.data);
                defaultMethods.doQuery(query, CODES.ERROR_NOTEXITSDATA, pData, pCallback);
            }
            else {
                pCallback(pStatusDB);
            }
        });
    },

    UPDATE				: function(pData, pCallback){
        _Mmongo.connectDB(function (pStatusDB) {
            if (pStatusDB.status == CODES.OK){
                var query = pData.model.updateMany(pData.filters, pData.data);
                defaultMethods.doQuery(query, CODES.ERROR_NOTEXITSDATA, pData, pCallback);
            }
            else {
                pCallback(pStatusDB);
            }
        });
    },

    doQuery             : function(pQuery, pCodeError, pData, pCallback){
        try {
            if (pData.populate) pQuery.populate(pData.populate);
            if (pData.select) pQuery.select(pData.select);
            if (pData.sort) pQuery.sort(pData.sort);
            pQuery.exec(function (err, data) {
                defaultMethods.respond(pData, pCodeError, err, data, pCallback);
            });
        }
        catch(err) {
            pCallback({status:CODES.ERROR_QUERY, err:err});
        }
    },

    respond             : function functionName(pOpts, pCode, pErr, pData, pCallback) {
        if (pErr){
            _Mcommon.log("Action: "+pOpts.action+" - Colletion: "+pOpts.collection+" - Status: Error 1");
            pCallback({status:pCode, err:pErr});
        }
        else if (pData){
            _Mcommon.log("Action: "+pOpts.action+" - Colletion: "+pOpts.collection+" - Status: Ok");
            var r = {status:CODES.OK, data:pData};            
            if (pOpts.count) { r.count = pOpts.count };
            pCallback(r);
        }
        else{
            _Mcommon.log("Action: "+pOpts.action+" - Colletion: "+pOpts.collection+" - Status: Error 2");
            pCallback({status:pCode});
        }
    }

}

module.exports = defaultMethods;
