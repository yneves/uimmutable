/*!
**  uimmutable -- React components with Immutable powers.
**  Copyright (c) 2015 Yuri Neves Silveira <http://yneves.com>
**  Licensed under The MIT License <http://opensource.org/licenses/MIT>
**  Distributed on <http://github.com/yneves/uimmutable>
*/
// - -------------------------------------------------------------------- - //

"use strict";

var {React, Immutable, classNames} = require("../libs.js");

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
    path: React.PropTypes.List.isRequired,
    name: React.PropTypes.string.isRequired,
    label: React.PropTypes.string.isRequired,
    fields: React.PropTypes.List.isRequired,
    values: React.PropTypes.Map.isRequired,
    collapsible: React.PropTypes.bool.isRequired,
    input: React.PropTypes.bool.isRequired,
    onChange: React.PropTypes.func,
    className: React.PropTypes.string
  },
  
  getDefaultProps: function() {
    return {
      path: Immutable.List(),
      input: true,
      collapsible: false
    };
  },
  
  getInitialState: function() {
    return {
      collapsed: false
    };
  },
  
  handleClickLegend: function() {
    if (this.props.collapsible) {
      this.setState({
        collapsed: !this.state.collapsed
      });
    }
  },
  
  render: function() {
    
    var classes = { fieldset: true };
    classes[this.props.className] = !!this.props.className;
    
    return (
      <div data-field-name={this.props.name} className={classNames(classes)}>
        <fieldset>
          <legend onClick={this.handleClickLegend}>
            {this.props.label}
          </legend>
          <FieldGroup
            path={this.props.path}
            fields={this.props.fields}
            values={this.props.values} 
            input={this.props.input}
            collapsed={this.state.collapsed}
            onClick={this.props.onClick}
            onChange={this.props.onChange} />
        </fieldset>
      </div>
    );
  }
  
});

// - -------------------------------------------------------------------- - //

module.exports = Fieldset;

// - -------------------------------------------------------------------- - //
