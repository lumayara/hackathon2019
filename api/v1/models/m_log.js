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

var logSchema = new _mongoose.Schema({
	user			: {
        type        : _mongoose.Schema.Types.ObjectId,
        ref         : COLLECTIONS.USERS,
        required	: false,
    },
    session         : {
        type		:  _mongoose.Schema.Types.ObjectId,
        ref         : COLLECTIONS.SESSIONS,
		required	: false,
    },
	org         	: {
        type		:  _mongoose.Schema.Types.ObjectId,
        ref         : COLLECTIONS.ORG,
		required	: false,
    },
    method          : {
        type		: String,
        required	: true,
		enum        : GLOBALS.HTTP_METHODS
    },
    body            : {
        type		: Object,
        required	: true,
    },
    response        : {
        type        : Object,
        required    : false,
    },
    url            : {
        type		: String,
        required	: true,
    },
    status         : {
        type		: Number,
        required	: true,
    },
	inserted       : {
        type        : Date,
        required    : true,
        default     : Date.now,
    },
});

module.exports = logSchema;
