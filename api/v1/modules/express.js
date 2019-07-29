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

//Models

//Modules

//General
var _bodyParser 	= require('body-parser');
var _express 		= require('express');
var _helmet         = require('helmet');

var m_express  	= {
	getDefaultApp : function (pSchema, pCollection) {
		let app = _express();
		app.use(_helmet());
		app.use(_bodyParser.urlencoded({ extended: false }));
		app.use(_bodyParser.json());
		return app;
	}
};

module.exports = m_express;
