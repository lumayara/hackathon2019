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
var _mRoles             = require('./m_roles.js').object;

//Modules

//General
var _mongoose			= require('mongoose');

var tranferObj             = {
    phone           : {
        type        : Number,
        required    : true,
    },
    value 		: {
        type		: Number,
        required	: true,
    },
    user			: {
        type        : _mongoose.Schema.Types.ObjectId,
        ref         : COLLECTIONS.USERS,
        required	: true,
    },
    name            : {
        type        : String,
        required    : true,
    },
    inserted        : {
        type        : Date,
        required    : true,
        default     : Date.now,
    },
};
var tranferModel          = new _mongoose.Schema(tranferObj);

module.exports 			= tranferModel;
