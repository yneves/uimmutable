// - -------------------------------------------------------------------- - //

"use strict";

var React = require("react-immutable");
var Immutable = require("immutable");
var classNames = require("classnames");

// - -------------------------------------------------------------------- - //

var Checkbox = React.createClass({
  
  propTypes: {
    path: React.PropTypes.List.isRequired,
    name: React.PropTypes.string.isRequired,
    label: React.PropTypes.string.isRequired,
    checked: React.PropTypes.bool.isRequired,
    onChange: React.PropTypes.func.isRequired,
    disabled: React.PropTypes.bool,
    className: React.PropTypes.string
  },
  
  handleChange: function(event) {
    if (this.props.onChange) {
      this.props.onChange({
        name: this.props.name,
        path: this.props.path,
        value: this.refs.input.checked,
        event: event
      });
    }
  },
  
  render: function() {
    
    var classes = { checkbox: true, disabled: this.props.disabled };
    classes[this.props.className] = !!this.props.className;
    
    return (
      <label className={classNames(classes)}>
        <input ref="input"
          type="checkbox"
          name={this.props.name}
          checked={this.props.checked}
          disabled={this.props.disabled}
          onChange={this.handleChange} />
        <span>{this.props.label}</span>
      </label>
    );
  }
  
});

// - -------------------------------------------------------------------- - //

module.exports = Checkbox;

// - -------------------------------------------------------------------- - //
