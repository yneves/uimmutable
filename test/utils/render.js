// - -------------------------------------------------------------------- - //

'use strict';

var fs = require('fs');
var jsdom = require('mocha-jsdom');
var React = require('react-immutable');
var ReactTools = require('react-tools');
var TestUtils = require('react-addons-test-utils');

require.extensions['.jsx'] = function (module, filename) {
  var input = fs.readFileSync(filename).toString();
  var output = ReactTools.transformWithDetails(input, {});
  return module._compile(output.code, filename);
};

jsdom();

module.exports = function (component, props) {
  var element = React.createElement(component, props);
  return TestUtils.renderIntoDocument(element);
};

// - -------------------------------------------------------------------- - //
