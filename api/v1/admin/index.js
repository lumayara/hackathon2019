/*
@author: Aaron Elizondo
@email: elizondo2356@gmail.com
@github: aaroneg23
@description:
*/

//Constants
var GLOBALS 	    = require('../constants/globals.js');
// var CODESMSG	 	= require('../../constants/codesmsg.js');
var CODES	 	    = require('../constants/codes.js');
// var COLLECTIONS     = require('../../constants/collections.js');
var MODELS          = require('../constants/models.js');

//Modules

//Models
// var _Mcommon 		= require('../../modules/common.js');
var _mModels		= require('../models/models.js');
var _Mcommands	 	= require('../modules/commands.js');

//General
var _orgMethods     = require('./org/orgMethods.js');
var _userMethods    = require('./user/userMethods.js');
var _app 		    = require('../modules/express.js').getDefaultApp();

_app.use('/user', require('./user'));
_app.use('/tranfers', require('./tranfers'));
_app.use('/org', require('./org'));

/**
 * POST
 * para crear un nuevo cliente
 */
_app.post('/newAccount', function (req, res) {
    _orgMethods.newOrg({name:req.body.orgName}, function (result) {
        if (result.status == CODES.OK){
            _mModels.do({
                collection  : MODELS.ROLES,
                action		: GLOBALS.FUCTIONS_MODELS.FINDONE,
                filters    	: {
                    org     : result.org,
                    type    : GLOBALS.ROLES_OWNER
                },
                select      : '_id'
            }, function (resultRole) {
                req.body.state = 'active',
            	req.body.penddings = {
            		emailVerification : true,
            	};
                req.body.org = result.org;
                req.body.role = resultRole.data._id;
                _userMethods.insert(req.body, function (resultUser) {
                    _Mcommands.sendResponse(resultUser, req, res);
                });
            });
        }
        else {
            _Mcommands.sendResponse(result, req, res);
        }
    });
});

module.exports 	= _app;
