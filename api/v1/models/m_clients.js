/*
@author: Aaron Elizondo
@email: elizondo2356@gmail.com
@github: aaroneg23
@description:
*/

//Constants
// var GLOBALS 	    = require('../constants/globals.js');
// var CODESMSG	 	= require('../constants/codesmsg.js');
// var CODES	 	    = require('../constants/codes.js');
var COLLECTIONS     = require('../constants/collections.js');
// var MODELS          = require('../constants/models.js');

//Models

//Modules

//General
var _mongoose			= require('mongoose');

var schemaClients 	= new _mongoose.Schema({
	name 			: {
		type		: String,
		required	: false,
	},
	id 		: {
		type		: String,
		unique		: true,
		required	: true,
		index		: true
	},
	idType 		: {
		type		: String,
		required	: false,
	},
	businessName 	: {
		type		: String,
		required	: false,
	},
	phone 			: {
		type		: String,
		required	: false,
	},
	email 	    	: {
		type		: String,
		required	: false
	},
	favorite 	    : {
		type		: Boolean,
		required	: false,
		default		: false,
	},
	inserted 	    : {
		type		: Date,
		required	: true,
		default		: Date.now,
	},
});

module.exports = schemaClients
;
