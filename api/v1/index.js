/*
@author: Aaron Elizondo
@email: elizondo2356@gmail.com
@github: aaroneg23
@description:
*/

var _app 		    = require('./modules/express.js').getDefaultApp();

_app.use('/models'	, require('./models'));
_app.use('/admin'	, require('./admin'));

module.exports 	= _app;
