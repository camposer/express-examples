// $ node test/qunit/testrunner.js
var runner = require("qunit");

runner.run({
    code : "./lib/helloworld.js",
    tests : "./test/qunit/helloworld.js"
});
