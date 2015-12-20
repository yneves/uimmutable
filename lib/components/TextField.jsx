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

var TextField = React.createClass({
  
  statics: {
    
    pickProps: function(path, field, values) {
      path = field.has("path") ? field.get("path") : path.push(field.get("name"));
      return {
        path: path,
        name: field.get("name"),
        label: field.get("label"),
        className: field.get("className"),
        options: field.get("options"),
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
    options: React.PropTypes.List,
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
  
  getId: function() {
    return this.props.path.toJS().join("-");
  },
  
  renderOptions: function() {
    if (this.props.input && this.props.options) {
      return (
        <datalist id={this.getId() + "-options"}>
          {this.props.options.map(function(option, index) {
            return (
              <option key={index} value={option}>{option}</option>
            );
          })}
        </datalist>
      )
    }
  },
  
  render: function() {
    
    var classes = {};
    classes["text-field"] = true;
    classes[this.props.className] = !!this.props.className;
  
    var content;
    
    if (this.props.input) {
      content = (
        <input
          ref="input"
          type="text"
          value={this.props.value}
          list={this.getId() + "-options"}
          onChange={this.handleChange} />
      );
      
    } else {
      content = (
        <Value
          className="text-value"
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
        {this.renderOptions()}
      </Field>
    );
  },
  
});

// - -------------------------------------------------------------------- - //

module.exports = TextField;

// - -------------------------------------------------------------------- - //
