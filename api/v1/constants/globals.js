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

var globals  			= {

	SECRET_JWT					: 'SECRET_JWT',
	// EXPIRED_TIME_JWT 			: '15000',//1 day
	EXPIRED_TIME_JWT 			: '864000000',//10 day
	ALGORITHM_JWT				: 'HS256',
	JWT_EXPIRED					: 'TokenExpiredError',

	PRINT						: true,

	FUCTIONS_MODELS		: {
		INSERT					: 'INSERT',
		DELETEONE				: 'DELETEONE',
		DELETE					: 'DELETE',
		UPDATEONE				: 'UPDATEONE',
		UPDATE					: 'UPDATE',
		FINDONE					: 'FINDONE',
		FIND					: 'FIND',
	},

	H_DEVICE					: 'device',

	EXEC_AUTH					: [
		'/api/v1/admin/user/auth',
		'/api/v1/admin/newAccount',
		'/api/v1/admin/tranfers/backend',
	],

	HTTP_METHODS				: ["POST"],

	ALLOW_DEVICES				: ["postman", "browser", "backend"],
	ALLOW_STATES				: ["active", "logout"],
	DEFAULT_STATE				: "active",
	USER_STATES					: ["wait","declined","accept","active","blocked"],
	DFT_USER_STATE				: "active",
	ROLES_TYPES					: ["owner","admin","user"],
	ROLES_OWNER					: "owner",
	ROLES_ADMIN					: "admin",
	ROLES_USER					: "user",
	USER_BLOCKED				: "blocked",

	XML_BILL_TYPES				: ["FacturaElectronica","TiqueteElectronico", "NotaCreditoElectronica", "NotaDebitoElectronica"],
	XML_BILL_TYPES_SUM			: ["FacturaElectronica","TiqueteElectronico"],
	XML_BILL_TYPES_REST			: ["NotaCreditoElectronica"],

};

module.exports 			= globals;
