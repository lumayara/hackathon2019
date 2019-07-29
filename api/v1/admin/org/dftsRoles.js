/*
@author: Aaron Elizondo
@email: elizondo2356@gmail.com
@github: aaroneg23
@description:
*/

//Constants
var GLOBALS 	    = require('../../constants/globals.js');
// var CODESMSG	 	= require('../../constants/codesmsg.js');
// var CODES	 	    = require('../../constants/codes.js');
// var COLLECTIONS     = require('../../constants/collections.js');
// var MODELS          = require('../../constants/models.js');

//Models
// var _mModels		= require('../../models/models.js');

//Modules
var _Mcommon 		= require('../../modules/common.js');

//General

var roles     = [
    {
        name                : GLOBALS.ROLES_OWNER,
        type                : GLOBALS.ROLES_OWNER,
        permits	            : [],
    },
    {
        name                : GLOBALS.ROLES_ADMIN,
        type                : GLOBALS.ROLES_ADMIN,
        permits	            : [],
    }
];

module.exports  = {
    getRoles    : function () {
        let out;
        out = roles;
        return roles;
    }
};
