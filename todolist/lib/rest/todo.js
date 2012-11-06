const HTTP_CODE_OK = 200;
const JSON_RESPONSE_HEADER = {'Content-Type': 'application/json; charset=utf-8'};

this.getAll = function(req, res) {
	var result = 'Hola'; 
	res.writeHead(200, this.JSON_RESPONSE_HEADER);
	res.end(JSON.stringify(result));
}

this.getById = function(req, res) {
	var result = 'Hola'; 
	res.writeHead(200, this.JSON_RESPONSE_HEADER);
	res.end(JSON.stringify(result));
}

this.add = function(req, res) {
	var result = 'Hola'; 
	res.writeHead(200, this.JSON_RESPONSE_HEADER);
	res.end(JSON.stringify(result));
}

this.modify = function(req, res) {
	var result = 'Hola'; 
	res.writeHead(200, this.JSON_RESPONSE_HEADER);
	res.end(JSON.stringify(result));
}

this.remove = function(req, res) {
	var result = 'Hola'; 
	res.writeHead(200, this.JSON_RESPONSE_HEADER);
	res.end(JSON.stringify(result));
}