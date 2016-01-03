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

var Checkbox = React.createClass({
  
  statics: {
    
    pickProps: function(path, field, values) {
      path = field.has("path") ? field.get("path") : path.push(field.get("name"));
      return {
        path: path,
        name: field.get("name"),
        label: field.get("label"),
        className: field.get("className"),
        disabled: field.get("disabled"),
        value: field.get("value"),
        checked: !!values.getIn(path)
      };
    }
  },
  
  propTypes: {
    path: React.PropTypes.List.isRequired,
    name: React.PropTypes.string.isRequired,
    label: React.PropTypes.string.isRequired,
    checked: React.PropTypes.bool.isRequired,
    onClick: React.PropTypes.func.isRequired,
    onChange: React.PropTypes.func.isRequired,
    value: React.PropTypes.any,
    disabled: React.PropTypes.bool,
    className: React.PropTypes.string
  },
  
  handleClick: function(event) {
    if (this.props.onClick) {
      this.props.onClick({
        name: this.props.name,
        path: this.props.path,
        value: this.refs.input.checked,
        event: event
      });
    }
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
          value={this.props.value}
          onClick={this.handleClick}
          onChange={this.handleChange} />
        <span>{this.props.label}</span>
      </label>
    );
  }
  
});

// - -------------------------------------------------------------------- - //

module.exports = Checkbox;

// - -------------------------------------------------------------------- - //
