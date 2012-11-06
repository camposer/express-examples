/**
 * @see http://es.kioskea.net/faq/2540-javascript-la-funcion-trim
 */
this.trim = function(myString) {
	return myString.replace(/^\s+/g,'').replace(/\s+$/g,'')
}