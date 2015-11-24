// - -------------------------------------------------------------------- - //

"use strict";

var React = require("react-immutable");
var Immutable = require("immutable");
var classNames = require("classnames");

var Field = require("./Field.jsx");
var Radio = require("./Radio.jsx");

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
  
  render: function() {
    
    var classes = {};
    classes["radio-group"] = true;
    classes[this.props.className] = !!this.props.className;
  
    return (
      <Field ref="field"
        name={this.props.name}
        label={this.props.label}
        className={classNames(classes)}>
        {this.props.options.map(this.renderRadio)}
      </Field>
    );
  },
  
});

// - -------------------------------------------------------------------- - //

module.exports = RadioGroup;

// - -------------------------------------------------------------------- - //
