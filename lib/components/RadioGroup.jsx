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
var Radio = require("./Radio.jsx");
var Value = require("./Value.jsx");

// - -------------------------------------------------------------------- - //

var RadioGroup = React.createClass({
  
  statics: {
    
    pickProps: function(path, field, values) {
      path = field.has("path") ? field.get("path") : path.push(field.get("name"));
      return {
        path: path,
        name: field.get("name"),
        label: field.get("label"),
        options: field.get("options"),
        className: field.get("className"),
        value: values.getIn(path)
      };
    }
  },
  
  propTypes: {
    path: React.PropTypes.List.isRequired,
    name: React.PropTypes.string.isRequired,
    label: React.PropTypes.string,
    input: React.PropTypes.bool.isRequired,
    options: React.PropTypes.List.isRequired,
    value: React.PropTypes.any,
    onChange: React.PropTypes.func.isRequired,
    className: React.PropTypes.string
  },
  
  renderRadio: function(option, index) {
    
    return (
      <Radio ref={index}
        key={index}
        path={this.props.path}
        name={this.props.name}
        label={option.get("label")}
        value={option.get("value")}
        checked={this.props.value === option.get("value")}
        disabled={option.get("disabled")}
        onChange={this.props.onChange} />
    );
  },
  
  getSelectedLabel: function() {
    var value = this.props.value;
    var selected = this.props.options.find(function(option) {
      return option.get("value") === value;
    });
    if (selected) {
      return selected.get("label");
    }
  },
  
  render: function() {
    
    var classes = {};
    classes["radio-group"] = true;
    classes[this.props.className] = !!this.props.className;
    
    var content;
    
    if (this.props.input) {
      content = this.props.options.map(this.renderRadio);
      
    } else {
      content = (
        <Value
          className="radio-value"
          path={this.props.path}
          name={this.props.name}
          value={this.getSelectedLabel()} />
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

module.exports = RadioGroup;

// - -------------------------------------------------------------------- - //