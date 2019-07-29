/*
@author: Aaron Elizondo
@email: elizondo2356@gmail.com
@github: aaroneg23
@description: Manage the database (connections, configuration, redundancy)
*/

//Constants
// var GLOBALS 	    = require('../constants/globals.js');
// var CODESMSG	 	= require('../constants/codesmsg.js');
var CODES	 	    = require('../constants/codes.js');
// var COLLECTIONS     = require('../constants/collections.js');
// var MODELS          = require('../constants/models.js');

//Models

//Modules
var _Mcommon 		= require('./common.js');

//General
var _mongoose 		= require('mongoose');


var dbmanager 		= {
	//dir de la base de datos
	db 						: process.env.MONGODB_URI,

	options 				: {
		useNewUrlParser: true,
		useCreateIndex: true
	},

	/*
	Funcion para conectarse con la base de datos
	debe de pasaese un callback el cual responde con el codigo de la operacion
	*/
	connectDB 		: function(pCallback){
		if(!_mongoose.connection.readyState){
			_mongoose.connect(dbmanager.db, dbmanager.options).then(
			  	() => {
			  		//Operacion exitosa
			  		pCallback({status:CODES.OK});
			  	},
			  	err => {
			  		pCallback({status:CODES.ERROR_DB});
			  	}
			);
		}
		else{
	  		pCallback({status:CODES.OK});
		}
	},

};

module.exports 		= dbmanager;
