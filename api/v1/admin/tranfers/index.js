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
var _app 		    = require('../../modules/express.js').getDefaultApp();
// var _listMethod 	= require('./list.js');
// var _reportMethod 	= require('./report.js');
// var _listbillsMethod 	= require('./listbills.js');
// var _favoriteMethod 	= require('./favorite.js');
// var _ignoreMethod 	= require('./ignore.js');


_app.post('/', function (req, res) {
	_mModels.do({
	    collection  : MODELS.TRANFERS,
	    action		: GLOBALS.FUCTIONS_MODELS.INSERT,
	    data    	: req.body
	}, function (result) {
		_Mcommands.sendResponse(result, req, res);
	});
});

_app.post('/list', function (req, res) {

	var filters = {
        "user":  req.body.userid
	}

    _mModels.do({
        collection  : MODELS.TRANFERS,
        action      : GLOBALS.FUCTIONS_MODELS.FIND,
        filters     : filters,
        perPage     : req.body.perPage,
        page        : req.body.page,
        count       : true
	}, function (result) {
		_Mcommands.sendResponse(result, req, res);
	});
});

_app.post('/phoneList', function (req, res) {

	var filters = {
        "phone":  req.body.phone
	}

    _mModels.do({
        collection  : MODELS.TRANFERS,
        action      : GLOBALS.FUCTIONS_MODELS.FIND,
        filters     : filters,
        perPage     : req.body.perPage,
        page        : req.body.page,
        count       : true
	}, function (result) {
		_Mcommands.sendResponse(result, req, res);
	});
});


module.exports = _app;
