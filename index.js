/*!
**  uimmutable -- React components with Immutable powers.
**  Copyright (c) 2015 Yuri Neves Silveira <http://yneves.com>
**  Licensed under The MIT License <http://opensource.org/licenses/MIT>
**  Distributed on <http://github.com/yneves/uimmutable>
*/
// - -------------------------------------------------------------------- - //

"use strict";

var React = require("react");
var Immutable = require("immutable");

var ImmutableTypes = [
  "Iterable", "Seq", "Collection", "Map",
  "OrderedMap", "List", "Stack", "Set",
  "OrderedSet", "Record", "Range", "Repeat"
];
  
ImmutableTypes.forEach(function(type) {
  React.PropTypes[type] = React.PropTypes.instanceOf(Immutable[type]);
});

module.exports = React;

// - -------------------------------------------------------------------- - //
