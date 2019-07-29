/*
@author: Aaron Elizondo
@email: elizondo2356@gmail.com
@github: aaroneg23
@description:
*/

//Constants
var GLOBALS 	    = require('../constants/globals.js');
// var CODESMSG	 	= require('../constants/codesmsg.js');
// var CODES	 	    = require('../constants/codes.js');
var COLLECTIONS     = require('../constants/collections.js');
// var MODELS          = require('../constants/models.js');

//Models

//Modules

//General
var _mongoose			= require('mongoose');

var roleObj				= {

	org 			: {
		type		: _mongoose.Schema.Types.ObjectId,
		ref			: COLLECTIONS.ORG,
		required	: true,
	},

	name			: {
		type		: String,
		required	: true,
	},

	type			: {
		type		: String,
		required	: true,
		enum		: GLOBALS.ROLES_TYPES
	},

	permits 		: [{
		action		: {
			type		: String,
			required	: true,
		}
	}],

	inserted 	    : {
		type		: Date,
		required	: true,
		default		: Date.now,
	},
};


module.exports 			= {
	object 				: roleObj,
	
	schema 				: function () {
		var roleSchema	= new _mongoose.Schema(roleObj);
		return roleSchema;
	},
};
