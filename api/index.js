/*
@author: Aaron Elizondo
@email: elizondo2356@gmail.com
@github: aaroneg23
@description:
*/

var _app 		    = require('./v1/modules/express.js').getDefaultApp();

_app.use('/v1', require('./v1'));

module.exports 	= _app;
