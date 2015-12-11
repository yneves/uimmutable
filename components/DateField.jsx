/*!
**  uimmutable -- React components with Immutable powers.
**  Copyright (c) 2015 Yuri Neves Silveira <http://yneves.com>
**  Licensed under The MIT License <http://opensource.org/licenses/MIT>
**  Distributed on <http://github.com/yneves/uimmutable>
*/
// - -------------------------------------------------------------------- - //

"use strict";

var React = require("react-immutable");
var Immutable = require("immutable");
var classNames = require("classnames");

var Field = require("./Field.jsx");
var Value = require("./Value.jsx");

// - -------------------------------------------------------------------- - //

var DateField = React.createClass({
  
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
    label: React.PropTypes.string.isRequired,
    input: React.PropTypes.bool.isRequired,
    value: React.PropTypes.any,
    onChange: React.PropTypes.func,
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
    classes["date-field"] = true;
    classes[this.props.className] = !!this.props.className;
  
    var content;
    
    if (this.props.input) {
      content = (
        <input
          ref="input"
          type="date"
          value={this.props.value}
          onChange={this.handleChange} />
      );
      
    } else {
      content = (
        <Value
          className="date-value"
          path={this.props.path}
          name={this.props.name}
          value={this.props.value}
          format="date" />
      );
    }
  
    return (
      <Field ref="field"
        className={classNames(classes)}
        name={this.props.name}
        label={this.props.label}>
        
        {content}
      </Field>
    );
  },
  
});

// - -------------------------------------------------------------------- - //

module.exports = DateField;

// - -------------------------------------------------------------------- - //
