/*
@author: Aaron Elizondo
@email: elizondo2356@gmail.com
@github: aaroneg23
@description: Manage the token creation and auth
*/

//Constants
var GLOBALS 	    = require('../constants/globals.js');
// var CODESMSG	 	= require('../constants/codesmsg.js');
var CODES	 	    = require('../constants/codes.js');
// var COLLECTIONS     = require('../constants/collections.js');
// var MODELS          = require('../constants/models.js');

//Models

//Modules
var _Mcommon 		= require('./common.js');

//General
var _jsonwebtoken	= require('jsonwebtoken');

module.exports  	= {

	signJWT				: function(pObject, pCallback){
		_jsonwebtoken.sign(pObject, GLOBALS.SECRET_JWT, {
			expiresIn: GLOBALS.EXPIRED_TIME_JWT,
			algorithm: GLOBALS.ALGORITHM_JWT
		}, function(err, token) {
		  	if (err){
		    	pCallback({status:CODES.ERROR_INVALID_TOKEN, err:err});
			}
			else if (token){
		    	pCallback({status:CODES.OK, token:token});
			}
			else{
		    	pCallback({status:CODES.ERROR_INVALID_TOKEN});
			}
		});
	},

	verifyJWT			: function(pData, pCallback){
		_jsonwebtoken.verify(pData.token, GLOBALS.SECRET_JWT, {
			algorithm: GLOBALS.ALGORITHM_JWT,
			ignoreExpiration : pData.ignoreExpiration
		}, function(err, decoded) {
		  	if (err){
		    	pCallback({status:CODES.ERROR_INVALID_TOKEN, err:err});
			}
			else if (decoded){
		    	pCallback({status:CODES.OK, data:decoded});
			}
			else{
		    	pCallback({status:CODES.ERROR_INVALID_TOKEN});
			}
		});
	},

}
