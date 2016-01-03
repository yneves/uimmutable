/*!
**  uimmutable -- React components with Immutable powers.
**  Copyright (c) 2015 Yuri Neves Silveira <http://yneves.com>
**  Licensed under The MIT License <http://opensource.org/licenses/MIT>
**  Distributed on <http://github.com/yneves/uimmutable>
*/
// - -------------------------------------------------------------------- - //

"use strict";

var libs = require("./libs.js");

var uim = {};

Object.keys(libs).forEach(function(key) {
  if (key === "getComponents") {
    var components = libs[key]();
    Object.keys(components).forEach(function(name) {
      uim[name] = components[name];
    });
  } else {
    uim[key] = libs[key];
  }
});

module.exports = uim;

// - -------------------------------------------------------------------- - //
