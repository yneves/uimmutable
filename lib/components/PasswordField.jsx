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

// - -------------------------------------------------------------------- - //

var PasswordField = React.createClass({
  
  statics: {
    
    pickProps: function(path, field, values) {
      path = field.has("path") ? field.get("path") : path.push(field.get("name"));
      return {
        path: path,
        name: field.get("name"),
        label: field.get("label"),
        className: field.get("className"),
        empty: !values.getIn(path)
      };
    }
  },
  
  propTypes: {
    path: React.PropTypes.List.isRequired,
    name: React.PropTypes.string.isRequired,
    label: React.PropTypes.string.isRequired,
    empty: React.PropTypes.bool,
    onChange: React.PropTypes.func,
    className: React.PropTypes.string
  },
  
  componentDidUpdate: function() {
    if (this.props.empty) {
      this.refs.input.value = "";
    }
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
    classes["password-field"] = true;
    classes[this.props.className] = !!this.props.className;
    
    var content = (
      <input
        ref="input"
        type="password"
        onChange={this.handleChange} />
    );
    
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

module.exports = PasswordField;

// - -------------------------------------------------------------------- - //
