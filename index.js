/*
@author: Aaron Elizondo
@email: elizondo2356@gmail.com
@github: aaroneg23
@description:
*/

//Constants
var PORT            = process.env.PORT || 5000;
// var GLOBALS 	    = require('./api/v1/constants/globals.js');
// var CODESMSG	 	= require('./api/v1/constants/codesmsg.js');
var CODES	 	    = require('./api/v1/constants/codes.js');
// var COLLECTIONS     = require('./api/v1/constants/collections.js');

//Config
const express       = require('express');
const http          = require('http');
const path          = require('path');
const helmet        = require('helmet');

//Models

//Modules
var _Mcommon	 	= require('./api/v1/modules/common.js');
var _Mcommands	 	= require('./api/v1/modules/commands.js');
var _MauthRequest	= require('./api/v1/modules/authRequest.js');

//General
var _ip             = require('ipware')().get_ip;
var _app 		    = require('./api/v1/modules/express.js').getDefaultApp();

var voiceRouter = require('./lib/hack');

//Configuracion express
_app.set('port', PORT);
_app.use(express.static(path.join(__dirname, 'dist')));
_app.use(express.json());
_app.use('/voice', voiceRouter);

_app.use('/api', function(req, res, next) {
    // Verificación del token
    req.xlog = {
        method : req.method,
        url    : req.originalUrl,
        ip     : _ip(req).clientIp,
    };
    _Mcommon.log('<<<<<<<<<<!>>>>>>>>>> ');
    _Mcommon.log('Request Type : '+req.method);
    _Mcommon.log('Request URL  : '+req.originalUrl);
    _Mcommon.log('Request IP   : '+_ip(req).clientIp);
    _MauthRequest.auth(req, res, function (pData) {
        if (pData.status == CODES.OK){
            next();
        }
        else{
            _Mcommands.sendResponse(pData, req, res)
        }
    });
}, require('./api'));

const server = http.createServer(_app);
_app.listen(PORT, function () {
	_Mcommon.log('Server is running')
});

