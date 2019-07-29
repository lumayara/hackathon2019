/*
@author: Aaron Elizondo
@email: elizondo2356@gmail.com
@github: aaroneg23
@description:
*/

//Constants
var GLOBALS 	    = require('../../constants/globals.js');
// var CODESMSG	 	= require('../../constants/codesmsg.js');
var CODES	 	    = require('../../constants/codes.js');
// var COLLECTIONS     = require('../../constants/collections.js');
var MODELS          = require('../../constants/models.js');

//Models
var _mModels		= require('../../models/models.js');

//Modules
// var _Mcommon 		= require('../../modules/common.js');

//General
var _dftsRoles 		= require('./dftsRoles.js');

var orgMethods     = {

    newOrg      : function (pData, pCallback) {
        _mModels.do({
            collection  : MODELS.ORG,
            action		: GLOBALS.FUCTIONS_MODELS.INSERT,
            data    	: pData
        }, function (org) {
            if (org.status == CODES.OK){
                orgMethods.insertRoles(org.data._id, _dftsRoles.getRoles(), 0, pCallback);
            }
            else{
                pCallback(org);
            }
        });
    },

    insertRoles      : function (pOrg, pRoles, pIndex, pCallback) {
        if (pRoles.length > pIndex){
            pRoles[pIndex].org = pOrg;
            _mModels.do({
                collection  : MODELS.ROLES,
                action		: GLOBALS.FUCTIONS_MODELS.INSERT,
                data    	: pRoles[pIndex]
            }, function (result) {
                if (result.status == CODES.OK){
                    pIndex++;
                    orgMethods.insertRoles(pOrg, pRoles, pIndex, pCallback);
                }
                else{
                    pCallback(result)
                }
            });
        }
        else{
            pCallback({status:CODES.OK, org:pOrg});
        }
    },

};

module.exports  = orgMethods;
