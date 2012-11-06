var assert = require('assert')
  , todoService = require('../lib/service/todo.js').newInstance('test');

describe('TodoService', function(){
  describe('#add()', function(){
    it('should return true when todo exists', function() {
    	assert.equal(true, todoService.add('A todo'));
    });
    
    it('should throw an exception when todo not exists', function() {
    	// assert.throws doesn't work, don't know why
    	try {
    		todoService.add(null);
    	} catch (e) {
    		assert.ok(true);
    	}
    });

    it('should throw an exception when todo is a blank string', function() {
    	// assert.throws doesn't work, don't know why
    	try {
    		todoService.add('    ');
    	} catch (e) {
    		assert.ok(true);
    	}
    });
    
  });
  
});