// - -------------------------------------------------------------------- - //

"use strict";

var React = require("react-immutable");

// - -------------------------------------------------------------------- - //

var Overlay = React.createClass({
  
  render: function() {
    return (
      <div className="overlay">
        <div className="overlay-container">
          {this.props.children}
        </div>
      </div>
    );
  }
  
});

// - -------------------------------------------------------------------- - //

module.exports = Overlay;

// - -------------------------------------------------------------------- - //
