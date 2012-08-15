/** 
* @fileOverview Dictionary for i18n (express-examples/sqlite)
*
* @author Rodolfo Campos <camposer at gmail dot com>
* @version 1.0
*/

/**
 * English words (values not defined because the app uses english keywords)
 */ 
this.en = {};

/**
 * Spanish words 
 */ 
this.es = { 
	'Id': 'Id',
	'Name': 'Nombre',
	'Operation': 'Operación',
	'Add user': 'Agregar usuario',
	'Modify user': 'Modificar usuario', 
	'Delete': 'Eliminar',
	'Cancel': 'Cancelar',
	'Accept': 'Aceptar',
	'Delete user': 'Eliminar usuario',
	'The user will be permanently deleted and cannot be recovered. Are you sure?': 'El usuario será eliminado permanentemente. ¿Está seguro?'
}

/**
 * Default language to be used
 */ 
$.i18n.setDictionary(this.es);
