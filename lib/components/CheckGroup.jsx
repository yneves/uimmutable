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
var Checkbox = require("./Checkbox.jsx");

// - -------------------------------------------------------------------- - //

var CheckGroup = React.createClass({
  
  statics: {
    
    pickProps: function(path, field, values) {
      path = field.has("path") ? field.get("path") : path.push(field.get("name"));
      return {
        path: path,
        name: field.get("name"),
        label: field.get("label"),
        checkboxes: field.get("checkboxes"),
        className: field.get("className"),
        value: values.getIn(path)
      };
    }
  },
  
  propTypes: {
    path: React.PropTypes.List.isRequired,
    label: React.PropTypes.string,
    input: React.PropTypes.bool.isRequired,
    checkboxes: React.PropTypes.List.isRequired,
    values: React.PropTypes.Map.isRequired,
    onChange: React.PropTypes.func.isRequired,
    className: React.PropTypes.string
  },
  
  renderCheckbox: function(option, index) {
    
    var name = option.get("name") || index;
    var label = option.get("label") || name;
    var path = this.props.path.push(name);
    
    return (
      <Checkbox ref={name}
        key={index}
        path={path}
        name={name}
        label={label}
        checked={!!this.props.values.getIn(path)}
        disabled={option.get("disabled")}
        onChange={this.props.onChange} />
    );
  },
  
  render: function() {
    
    var classes = {};
    classes["check-group"] = true;
    classes[this.props.className] = !!this.props.className;
  
    return (
      <Field ref="field"
        name={this.props.name}
        label={this.props.label}
        className={classNames(classes)}>
        {this.props.checkboxes.map(this.renderCheckbox)}
      </Field>
    );
  },
  
});

// - -------------------------------------------------------------------- - //

module.exports = CheckGroup;

// - -------------------------------------------------------------------- - //
