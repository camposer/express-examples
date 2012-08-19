/** 
* @fileOverview Dictionary for i18n (express-examples/sqlite)
*
* @author Rodolfo Campos <camposer at gmail dot com>
* @version 1.0
*/

/**
 * English words 
 */ 
var en = { }

/**
 * Spanish words 
 */ 
var es = { 
	'Id': 'Id',
	'Name': 'Nombre',
	'Operation': 'Operación',
	'Add user': 'Agregar usuario',
	'Modify user': 'Modificar usuario', 
	'Delete': 'Eliminar',
	'Cancel': 'Cancelar',
	'Accept': 'Aceptar',
	'Delete user': 'Eliminar usuario',
	'The user will be permanently deleted and cannot be recovered. Are you sure?': 'El usuario será eliminado permanentemente. ¿Está seguro?', 
	'List of users': 'Lista de usuarios',
	'Select a language': 'Seleccione un idioma',
	'English': 'Inglés',
	'Spanish': 'Español',
	'You have to specify a valid name': 'Debe ingresar un nombre válido'
}

/**
 * Default language to be used
 */ 
var lang = '';

this.setLanguage = function(iso) {
	eval('lang = ' + iso);

	// Setting default language to use in JS inside HTMLs
	if (typeof $ != 'undefined')
		$.i18n.setDictionary(lang);		
}

/**
 * Resolves server-side values
 */
this._ = function(key) {
	var value = key;

	if (lang[key])
		value = lang[key];

	return value;
}
