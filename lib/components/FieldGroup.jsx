/*!
**  uimmutable -- React components with Immutable powers.
**  Copyright (c) 2015 Yuri Neves Silveira <http://yneves.com>
**  Licensed under The MIT License <http://opensource.org/licenses/MIT>
**  Distributed on <http://github.com/yneves/uimmutable>
*/
// - -------------------------------------------------------------------- - //

"use strict";

var {React, Immutable, classNames, getComponents} = require("../libs.js");

// - -------------------------------------------------------------------- - //

var FieldGroup = React.createClass({
  
  propTypes: {
    path: React.PropTypes.List.isRequired,
    input: React.PropTypes.bool.isRequired,
    fields: React.PropTypes.List.isRequired,
    values: React.PropTypes.Map.isRequired,
    collapsed: React.PropTypes.bool.isRequired,
    className: React.PropTypes.string,
    onClick: React.PropTypes.func,
    onChange: React.PropTypes.func
  },
  
  getDefaultProps: function() {
    return {
      path: Immutable.List(),
      input: true,
      collapsed: false
    };
  },
  
  renderField: function(field, index) {
    
    var Component = getComponents()[field.get("type")];
    
    if (!Component) {
      throw new Error("unknown component type (" + field.get("type") + ")");
    }
    
    if (!Component.pickProps) {
      throw new Error("invalid component type (" + field.get("type") + ")");
    }
    
    var props = Component.pickProps(this.props.path, field, this.props.values);
    
    return (
      <Component
        key={index}
        {...props}
        input={this.props.input}
        onClick={this.props.onClick}
        onChange={this.props.onChange} />
    );
  },
  
  render: function() {
    
    var classes = { "field-group": true };
    classes[this.props.className] = !!this.props.className;
    
    var style = {};
    if (this.props.collapsed) {
      style.display = "none";
    }
    
    return (
      <div className={classNames(classes)} style={style}>
        {this.props.fields.map(this.renderField)}
      </div>
    );
  },
  
});

// - -------------------------------------------------------------------- - //

module.exports = FieldGroup;

// - -------------------------------------------------------------------- - //
