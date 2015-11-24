// - -------------------------------------------------------------------- - //

"use strict";

var React = require("react-immutable");
var Icon = require("./Icon.jsx");

// - -------------------------------------------------------------------- - //

var Failure = React.createClass({
  
  propTypes: {
    label: React.PropTypes.string.isRequired,
    message: React.PropTypes.string,
    buttonLabel: React.PropTypes.string.isRequired,
    onClose: React.PropTypes.func.isRequired
  },
  
  getDefaultProps: function() {
    return {
      buttonLabel: "OK"
    };
  },
  
  render: function() {
    return (
      <div className="dialog failure">
        <header>
          <Icon name="exclamation-circle" />
          <h2>{this.props.label}</h2>
        </header>
        { this.props.message ? <p>{this.props.message}</p> : undefined }
        <footer>
          <button type="button" onClick={this.props.onClose}>
            {this.props.buttonLabel}
          </button>
        </footer>
      </div>
    );
  }
  
});

// - -------------------------------------------------------------------- - //

module.exports = Failure;

// - -------------------------------------------------------------------- - //
