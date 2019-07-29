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

var userObj             = {
    name			: {
        type		: String,
        required	: false,
    },
    lastName		: {
        type		: String,
        required	: false,
    },
    email			: {
        type		: String,
        required	: true,
        unique		: true,
    },
    password		: {
        type		: String,
        required	: true,
    },
    state 			: {
        type		: String,
        required	: true,
        enum        : GLOBALS.USER_STATES
    },
    penddings 		: {
        type		: Object,
        required	: true,
    },
    orgs            : [{
        org			: {
            type        : _mongoose.Schema.Types.ObjectId,
            ref         : COLLECTIONS.ORG,
            required	: true,
        },
        role        :  _mRoles,
    }],
    inserted        : {
        type        : Date,
        required    : true,
        default     : Date.now,
    },
};
var userSchema          = new _mongoose.Schema(userObj);

module.exports 			= userSchema;
