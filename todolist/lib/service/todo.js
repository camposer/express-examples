var stringUtil = require('../util/string');

this.newInstance = function() {
	return new Impl();
}

function Impl() { 

};

Impl.prototype.add = function(todo) {
	if (!todo || stringUtil.trim(todo) == '') 
		throw new Error('Todo cannot be empty');
	
	return true;
}