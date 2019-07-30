/*
@author: Aaron Elizondo
@email: elizondo2356@gmail.com
@github: aaroneg23
@description:
*/

//Contants
var GLOBALS 	    = require('../constants/globals.js');
// var CODESMSG	 	= require('../constants/codesmsg.js');
var CODES	 	    = require('../constants/codes.js');
var COLLECTIONS     = require('../constants/collections.js');
// var MODELS          = require('../constants/models.js');

//Models
var _mOrg 	 	    = require('../models/m_organization.js');
var _mRoles 	 	= require('../models/m_roles.js').schema();
var _mUsers 	    = require('../models/m_user.js');
var _mLog 	 	    = require('../models/m_log.js');
var _mSessions      = require('../models/m_sessions.js');
var _mTranfers      = require('../models/m_transfers.js');

//Modules
var _Mdftmethods    = require('../modules/defaultMethods.js');

//General
var _mongoose		= require('mongoose');


var models          = {
    ROLES           : _mongoose.model(COLLECTIONS.ROLES         , _mRoles),
    USERS           : _mongoose.model(COLLECTIONS.USERS         , _mUsers),
    LOG             : _mongoose.model(COLLECTIONS.LOG           , _mLog),
    SESSIONS        : _mongoose.model(COLLECTIONS.SESSIONS      , _mSessions),
    ORG             : _mongoose.model(COLLECTIONS.ORG           , _mOrg),
    TRANFERS        : _mongoose.model(COLLECTIONS.TRANFERS      , _mTranfers),
}

module.exports      = {
    do              : function functionName(pOpts, pCallback) {
        var action  = GLOBALS.FUCTIONS_MODELS[pOpts.action];
        var model   = models[pOpts.collection];
        if (model) {
            if (action){
                pOpts.model = model;
                _Mdftmethods[action](pOpts, function(pData){
                    if (pCallback) pCallback(pData);
                });
            }
            else{
                if (pCallback) pCallback({status:CODES.ERROR_ACTIONNOTEXITS});
            }
        }
        else{
            if (pCallback) pCallback({status:CODES.ERROR_MODELNOTEXITS});
        }
    }
};
