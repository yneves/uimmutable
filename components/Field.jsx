// - -------------------------------------------------------------------- - //

"use strict";

var React = require("react-immutable");
var Immutable = require("immutable");
var classNames = require("classnames");

// - -------------------------------------------------------------------- - //

var Field = React.createClass({
  
  propTypes: {
    name: React.PropTypes.string.isRequired,
    label: React.PropTypes.string.isRequired,
    className: React.PropTypes.string
  },
  
  render: function() {
    
    var classes = { field: true };
    classes[this.props.className] = !!this.props.className;
    
    return (
      <div data-field-name={this.props.name} className={classNames(classes)}>
        <label>{this.props.label}</label>
        {this.props.children}
      </div>
    );
  }
  
});

// - -------------------------------------------------------------------- - //

module.exports = Field;

// - -------------------------------------------------------------------- - //
