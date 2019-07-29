/*
@author: Aaron Elizondo
@email: elizondo2356@gmail.com
@github: aaroneg23
@description:
*/

//Constants
//Models
//Modules
//General

var codesmsg 			= {

	//OK:Codigo para exito en todas las operaciones
	'100' 					: "ok",
	//ERROR_DB:Codigo de error para fallo de conexion con base de datos
	'201' 					: "error: can't connect with the database",
	//ERROR_ROLE: Fallo al encontrar el rol
	'202'					: "error: invalid role code",
	//ERROR_INVALID_DATA : Informacion invalida o incompleta
	'203' 					: "error: invalid or imcomplete information",
	//ERROR_ENCRYPT : Error encryptando informacion
	'204'					: "error: can't encrypt the information",
	//ERROR_CLIENTNOTEXITS :Cliente no existe
	'205'					: "error: client not exists",
	//ERROR_DENCRYPT : informacion a comparar no coincide
	'206'					: "error: invalid dencrypt information",
	//ERROR_INVALID_TOKEN : token envalido
	'207'   				: "error: invalid token",
	//ERROR_CLIENTBLOCKED	: Cliente inactico
	'208'					: "error: client is inactive",
	//ERROR_NOTEXITSDATA
	'209'   				: "error: not exist data",
	//ERROR_MODEL
	'210'					: "error: validation model",
	//ERROR_MODELNOTEXITS
	'211'					: "error: model not is valid",
	//ERROR_ACTIONNOTEXITS
	'212'					: "error: action not is valid",
	//ERROR_INVALIDSESSION
	'213'					: "error: invalid session",
	//ERROR_QUERY
	'214'					: "error: invalid query",


};

module.exports 			= codesmsg;
