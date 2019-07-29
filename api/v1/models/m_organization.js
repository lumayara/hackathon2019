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

var schemaOrg 		= new _mongoose.Schema({
	name			: {
		type		: String,
		required	: false,
		unique		: false,
	},
	owner 			: {
		type		: _mongoose.Schema.Types.ObjectId,
		ref			: COLLECTIONS.USERS,
		required	: false,
	},
	inserted 	    : {
		type		: Date,
		required	: true,
		default		: Date.now,
	},
});

module.exports = schemaOrg;
