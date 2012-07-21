// For all http states see: http://www.w3.org/Protocols/rfc2616/rfc2616-sec10.html
var HTTP_CODE_OK = 200
  , HTTP_CODE_UNAUTHORIZED = 401
  , HTTP_CODE_FORBIDDEN = 403
  , HTTP_CODE_NOT_FOUND = 404
  , HTTP_CODE_METHOD_NOT_ALLOWED = 405
  , HTTP_CODE_PRECONDITION_FAILED = 412;

var JSON_RESPONSE_HEADER = {'Content-Type': 'application/json; charset=utf-8'};

var ok = function(res) {
  res.writeHead(HTTP_CODE_OK, this.JSON_RESPONSE_HEADER);
};

var nok = function(res, code) {
  res.writeHead(code, JSON_RESPONSE_HEADER);
};

this.call = function(res, params, validate, execute) {
  if (validate(params)) {
    if (params != null) {
      execute(params, function(result) { // TODO: Add extra parameter for error msg
        if (result) 
          ok(res); 
        else 
          nok(res, HTTP_CODE_FORBIDDEN); 

        res.end(JSON.stringify(result)); 
      });
    } else {
      execute(function(result) { // TODO: Add extra parameter for error msg
        if (result) 
          ok(res); 
        else 
          nok(res, HTTP_CODE_FORBIDDEN); 

        res.end(JSON.stringify(result)); 
      });
    }
  } else {
    nok(res, HTTP_CODE_PRECONDITION_FAILED); 
    res.end(); 
  }
};


