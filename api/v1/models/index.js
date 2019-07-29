/*
@author: Aaron Elizondo
@email: elizondo2356@gmail.com
@github: aaroneg23
@description:
*/

//Constants
// var GLOBALS 	    = require('../constants/globals.js');
// var CODESMSG	 	= require('../constants/codesmsg.js');
// var CODES	 	    = require('../constants/codes.js');
// var COLLECTIONS     = require('../constants/collections.js');
// var MODELS          = require('../constants/models.js');

//Modules
var _Mcommands	 	= require('../modules/commands.js');

//General
var _models	 	    = require('./models.js');
var _app 		    = require('../modules/express.js').getDefaultApp();

_app.post('/', function (req, res) {
    _models.do(req.body, function(pData){
        _Mcommands.sendResponse(pData, req, res);
	});
});


module.exports = _app;
