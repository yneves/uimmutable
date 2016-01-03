/*!
**  uimmutable -- React components with Immutable powers.
**  Copyright (c) 2015 Yuri Neves Silveira <http://yneves.com>
**  Licensed under The MIT License <http://opensource.org/licenses/MIT>
**  Distributed on <http://github.com/yneves/uimmutable>
*/
// - -------------------------------------------------------------------- - //

"use strict";

var {React, Immutable, classNames} = require("../libs.js");

// - -------------------------------------------------------------------- - //

var Loading = React.createClass({
  
  render: function() {
    return (
      <div className="loading">
        <span className="fa fa-spinner fa-spin" />
      </div>
    );
  }
  
});

// - -------------------------------------------------------------------- - //

module.exports = Loading;

// - -------------------------------------------------------------------- - //
