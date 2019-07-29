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

var codes  				= {

	HTTP_OK						: 200,
	//Codigo para exito en todas las operaciones
	OK 							: 100,
	//Codigo de error para fallo de conexion con base de datos
	ERROR_DB 					: 201,
	//Fallo al encontrar el rol
	ERROR_ROLE					: 202,
	//Error la informacion no es valida
	ERROR_INVALID_DATA 			: 203,
	//Error encryptando informacion
	ERROR_ENCRYPT 				: 204,
	//Cliente no existe
	ERROR_CLIENTNOTEXITS 		: 205,
	//Informacion de login no valida
	ERROR_DENCRYPT				: 206,
	//Token invalido
	ERROR_INVALID_TOKEN			: 207,
	//Cliente inactico
	ERROR_CLIENTBLOCKED			: 208,
	//Cliente inactico
	ERROR_NOTEXITSDATA			: 209,
	//Validation model error
	ERROR_MODEL					: 210,
	//El modelo no existe
	ERROR_MODELNOTEXITS			: 211,
	//La accion no existe
	ERROR_ACTIONNOTEXITS 		: 212,
	//Error al crear la sesion
	ERROR_INVALIDSESSION		: 213,
	//Error al ejecutar query
	ERROR_QUERY					: 214,
};

module.exports 			= codes;
