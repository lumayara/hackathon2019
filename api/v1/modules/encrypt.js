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
var _Mcommon 		= require('./common.js');

//General
var _bcrypt 		= require('bcryptjs');
const saltRounds 	= 10;

module.exports  	= {

	encrypt				: function(pString, pCallback){
		_bcrypt.hash(pString, saltRounds, function(err, hash) {
		  	if (err){
		    	pCallback({status:CODES.ERROR_ENCRYPT, err:err});
			}
			else if (hash){
		    	pCallback({status:CODES.OK, hash:hash});
			}
			else{
		    	pCallback({status:CODES.ERROR_ENCRYPT});
			}
		});
	},

	compare				: function(pInfor, pHash, pCallback){
		_bcrypt.compare(pInfor, pHash, function(err, res) {
		  	if (err){
		    	pCallback({status:CODES.ERROR_DENCRYPT, err:err});
			}
			else if (res){
		    	pCallback({status:CODES.OK, res:res});
			}
			else{
		    	pCallback({status:CODES.ERROR_DENCRYPT});
			}
		});
	},

}
