/*!
**  uimmutable -- React components with Immutable powers.
**  Copyright (c) 2015 Yuri Neves Silveira <http://yneves.com>
**  Licensed under The MIT License <http://opensource.org/licenses/MIT>
**  Distributed on <http://github.com/yneves/uimmutable>
*/
// - -------------------------------------------------------------------- - //

"use strict";

var {React, Immutable, classNames} = require("../libs.js");

var Field = require("./Field.jsx");
var Value = require("./Value.jsx");

// - -------------------------------------------------------------------- - //

var TimeField = React.createClass({
  
  statics: {
    
    pickProps: function(path, field, values) {
      path = field.has("path") ? field.get("path") : path.push(field.get("name"));
      return {
        path: path,
        name: field.get("name"),
        label: field.get("label"),
        className: field.get("className"),
        value: values.getIn(path)
      };
    }
  },
  
  propTypes: {
    path: React.PropTypes.List.isRequired,
    name: React.PropTypes.string.isRequired,
    label: React.PropTypes.string.isRequired,
    input: React.PropTypes.bool.isRequired,
    value: React.PropTypes.any,
    onChange: React.PropTypes.func.isRequired,
    className: React.PropTypes.string
  },
  
  handleChange: function(event) {
    if (this.props.onChange) {
      this.props.onChange({
        name: this.props.name,
        path: this.props.path,
        value: this.refs.input.value,
        event: event
      });
    }
  },
  
  render: function() {
    
    var classes = {};
    classes["time-field"] = true;
    classes[this.props.className] = !!this.props.className;
    
    var content;
    
    if (this.props.input) {
      content = (
        <input
          ref="input"
          type="time"
          value={this.props.value}
          onChange={this.handleChange} />
      );
      
    } else {
      content = (
        <Value
          className="time-value"
          path={this.props.path}
          name={this.props.name}
          value={this.props.value} />
      );
    }
  
    return (
      <Field ref="field"
        name={this.props.name}
        label={this.props.label}
        className={classNames(classes)}>
        
        {content}
      </Field>
    );
  },
  
});

// - -------------------------------------------------------------------- - //

module.exports = TimeField;

// - -------------------------------------------------------------------- - //
