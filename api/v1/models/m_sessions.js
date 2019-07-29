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

var sessionSchema = new _mongoose.Schema({
	user			: {
        type		: _mongoose.Schema.Types.ObjectId,
        ref			: COLLECTIONS.USERS,
        required	: true,
    },
	org				: {
        type		: _mongoose.Schema.Types.ObjectId,
        ref			: COLLECTIONS.ORG,
        required	: true,
    },
    ip              : {
        type		: String,
		required	: true,
    },
    keepOpen      	: {
        type		: Boolean,
		required	: false,
    },
    device          : {
        type		: String,
        required	: true,
        enum        : GLOBALS.ALLOW_DEVICES
    },
    state           : {
        type        : String,
        required    : true,
        enum        : GLOBALS.ALLOW_STATES,
        default     : GLOBALS.DEFAULT_STATE
    },
    browser         : {
        type		: String,
        required	: false,
    },
	updated 	    : {
		type		: String,
		required	: true,
	},
	inserted       : {
        type        : Date,
        required    : true,
        default     : Date.now,
    },});

module.exports = sessionSchema;
