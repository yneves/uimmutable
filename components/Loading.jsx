// - -------------------------------------------------------------------- - //

"use strict";

var React = require("react-immutable");

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
