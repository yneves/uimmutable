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

var FieldGroup = require("./FieldGroup.jsx");

// - -------------------------------------------------------------------- - //

var Fieldset = React.createClass({
  
  statics: {
    
    pickProps: function(path, field, values) {
      path = field.has("path") ? field.get("path") : path.push(field.get("name"));
      return {
        path: path,
        name: field.get("name"),
        label: field.get("label"),
        fields: field.get("fields"),
        className: field.get("className"),
        values: values
      };
    }
  },
  
  propTypes: {
    types: React.PropTypes.Map.isRequired,
    path: React.PropTypes.List.isRequired,
    name: React.PropTypes.string.isRequired,
    label: React.PropTypes.string.isRequired,
    fields: React.PropTypes.List.isRequired,
    values: React.PropTypes.Map.isRequired,
    input: React.PropTypes.bool.isRequired,
    onChange: React.PropTypes.func,
    className: React.PropTypes.string
  },
  
  render: function() {
    
    var classes = { fieldset: true };
    classes[this.props.className] = !!this.props.className;
    
    var extraProps = {
      input: this.props.input,
      onClick: this.props.onClick,
      onChange: this.props.onChange
    };
    
    return (
      <div data-field-name={this.props.name} className={classNames(classes)}>
        <fieldset>
          <legend>{this.props.label}</legend>
          <FieldGroup
            path={this.props.path}
            types={this.props.types}
            fields={this.props.fields}
            values={this.props.values} 
            extraProps={extraProps} />
        </fieldset>
      </div>
    );
  },
  
});

// - -------------------------------------------------------------------- - //

module.exports = Fieldset;

// - -------------------------------------------------------------------- - //
