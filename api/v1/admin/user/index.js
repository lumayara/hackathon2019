/*
@author: Aaron Elizondo
@email: elizondo2356@gmail.com
@github: aaroneg23
@description:
*/

//Constants
var GLOBALS 	    = require('../../constants/globals.js');
// var CODESMSG	 	= require('../../constants/codesmsg.js');
var CODES	 	    = require('../../constants/codes.js');
// var COLLECTIONS     = require('../../constants/collections.js');
// var MODELS          = require('../../constants/models.js');
var MODELS          = require('../../constants/models.js');

//Modules

//Models
// var _Mcommon 		= require('../../modules/common.js');
var _mModels		= require('../../models/models.js');
var _Mcommands	 	= require('../../modules/commands.js');

//General
var _userMethods    = require('./userMethods.js');
var _app 		    = require('../../modules/express.js').getDefaultApp();


/**
 * POST
 * para crear un nuevo cliente
 */
// _app.post('/invite', function (req, res) {
// 	//Informacion por defecto
// 	req.body.state = 'active',
// 	req.body.penddings = {
// 		emailVerification : true,
// 	};
// 	_userMethods.insert(req.body, function(status){
// 		_Mcommands.sendResponse(status, req, res);
// 	});
// });

/**
 * POST
 * para login
 */
_app.post('/auth', function (req, res) {
	_userMethods.auth(req.body, function(pAuth){
		if (pAuth.status == CODES.OK){
			_userMethods.addSession({
                user		: pAuth.user,
                org			: pAuth.user.orgs[0].org,
                device 		: req.headers[GLOBALS.H_DEVICE],
                ip 			: req.xlog.ip,
                keepOpen	: req.body.keepOpen,
                browser		: req.body.browser,
                updated     : new Date().toISOString()
            }, function (result) {
				_Mcommands.sendResponse(result, req, res);
            });
		}
		else{
			_Mcommands.sendResponse(pAuth, req, res);
		}
	});
});



module.exports = _app;
