/** 
* @fileOverview Common JS for REST services (express-examples/sqlite)
*
* @author Rodolfo Campos <camposer at gmail dot com>
* @version 1.0
*/

/**
 * HTTP codes 
 * @see For all HTTP codes refer to: http://www.w3.org/Protocols/rfc2616/rfc2616-sec10.html 
 */
var HTTP_CODE_OK = 200
  , HTTP_CODE_UNAUTHORIZED = 401
  , HTTP_CODE_FORBIDDEN = 403
  , HTTP_CODE_NOT_FOUND = 404
  , HTTP_CODE_METHOD_NOT_ALLOWED = 405
  , HTTP_CODE_PRECONDITION_FAILED = 412;

/** 
 * JSON Content-Type HTTP Header
 * @field
 */
var JSON_RESPONSE_HEADER = {'Content-Type': 'application/json; charset=utf-8'};

/** 
 * Writes HTTP code 200 and Content-Type for JSON in HTTP response headers
 * @function 
 * @param {HttpResponse} res HTTP response 
 * @param {Number} code HTTP code to be written in header
 */
var ok = function(res) {
  res.writeHead(HTTP_CODE_OK, this.JSON_RESPONSE_HEADER);
};

/** 
 * Writes HTTP code 4XX (error) and Content-Type for JSON in HTTP response headers
 * @function 
 * @param {HttpResponse} res HTTP response 
 * @param {Number} code HTTP code to be written into header
 */
var nok = function(res, code) {
  res.writeHead(code, JSON_RESPONSE_HEADER);
};

/**
 * Executes validate method using params, if true, calls execute method, if not, returns HTTP code 412
 * @param {HttpResponse} res HttpResponse object
 * @param {Mixed|Object} params Can be value or object (JSON)
 * @param {Function([params])} validate Function used for validation, if returns true everything is OK, 
 *   if not something went wrong and call returns HTTP_CODE_PRECONDITION_FAILED(412)
 * @param {Function(params, callback)|Function(callback)} execute Function executed if validate=true. 
 *   Parameters (params) can be value (e.g. String) or Object (JSON). Callback should receive 
 *   one parameter (result) 
 *   
 * @example 
 * common.call(
 *   res, 
 *   params.name, 
 *   function(name) { 
 *     var valid = true;
 *
 *     if (name == null) 
 *       valid = false; 
 * 
 *     return valid;
 *   },
 *   function(params, callback) {
 *     // ...
 *     // Get result
 *     callback(result);
 *   }
 * );
 */
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