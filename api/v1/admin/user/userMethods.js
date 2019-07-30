/*
@author: Aaron Elizondo
@email: elizondo2356@gmail.com
@github: aaroneg23
@description:
*/

//Constants
var GLOBALS 	    = require('../../constants/globals.js');
var CODESMSG	 	= require('../../constants/codesmsg.js');
var CODES	 	    = require('../../constants/codes.js');
var COLLECTIONS     = require('../../constants/collections.js');
var MODELS          = require('../../constants/models.js');

//Models
var _mModels		= require('../../models/models.js');

//Modules
var _Mcommon 		= require('../../modules/common.js');
var _MEncrypt 		= require('../../modules/encrypt.js');
var _Mjwt 			= require('../../modules/jwt.js');

//General

var userMethods     = {
    insert   : function (pData, pCallback) {
        _mModels.do({
            collection  : MODELS.ROLES,
            action		: GLOBALS.FUCTIONS_MODELS.FINDONE,
            filters    	: {_id:pData.role}
        }, function (resultRoles) {

        _mModels.do({
            collection  : MODELS.ORG,
            action		: GLOBALS.FUCTIONS_MODELS.FINDONE,
            filters    	: {_id:pData.org}
        }, function (resultOrg) {
			if (resultOrg.status == CODES.OK && resultRoles.status == CODES.OK){
                pData.orgs = [ {org: resultOrg.data, role:resultRoles.data} ];
				_MEncrypt.encrypt(pData.password, function(pEData){
					if (pEData.status == CODES.OK){
						pData.password = pEData.hash;
                        _mModels.do({
                            collection  : MODELS.USERS,
                            action		: GLOBALS.FUCTIONS_MODELS.INSERT,
                            data    	: pData
                        }, function (pIData) {
                            pCallback(pIData);
                        });
					}
					else{
		    			pCallback(pEData);
					}
				});
			}
			else{
                 (resultOrg.status != CODES.OK) ? pCallback(resultOrg):pCallback(resultRoles);
			}

        }); });
    },

    auth    			: function(pData, pCallback){
        _mModels.do({
            collection  : MODELS.USERS,
            action		: GLOBALS.FUCTIONS_MODELS.FINDONE,
            filters    	: { phone: pData.phone },
            select      : 'orgs name email lastName penddings state password phone',
        }, function (result) {
            if (result.status == CODES.OK){
				if (result.data.state != GLOBALS.USER_BLOCKED){
					_MEncrypt.compare(pData.password, result.data.password, function(pCompare){
						if (pCompare.status == CODES.OK){
                            result.data.password = undefined;
							pCallback({status:CODES.OK, user:result.data});
						}
						else{
			    			pCallback(pCompare);
						}
					});
				}
				else{
		    		pCallback({status:CODES.ERROR_CLIENTBLOCKED, user:result.data});
				}
			}
			else{
		    	pCallback({status:CODES.ERROR_CLIENTNOTEXITS});
			}
        });
    },

    addSession    		: function(pData, pCallback){
        _mModels.do({
            collection  : MODELS.SESSIONS,
            action		: GLOBALS.FUCTIONS_MODELS.INSERT,
            data    	: pData
        }, function (pStatusSession) {
            if (pStatusSession.status == CODES.OK) {
                var user = Object.assign({org:pData.user.orgs[0].org, role:pData.user.orgs[0].role}, pData.user);
                user = Object.assign({org:user.org, role:user.role}, user._doc);
                user.orgs = undefined;
                _Mjwt.signJWT({user:user, session:pStatusSession.data._id, ip:pStatusSession.data.ip}, function(pStatusJWT){
                    user.role.permits = undefined;
                    if (pStatusJWT.status == CODES.OK) pStatusJWT.user = user;
                    pCallback(pStatusJWT);
                });
            }
            else {
                pCallback(pStatusSession);
            }
        });

    },

};

module.exports  = userMethods;
