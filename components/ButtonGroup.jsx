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

var Button = require("./Button.jsx");

// - -------------------------------------------------------------------- - //

var ButtonGroup = React.createClass({
  
  statics: {
    
    pickProps: function(path, field, values) {
      path = field.has("path") ? field.get("path") : path.push(field.get("name"));
      return {
        path: path,
        name: field.get("name"),
        label: field.get("label"),
        buttons: field.get("buttons"),
        className: field.get("className"),
        value: values.getIn(path)
      };
    }
  },
  
  propTypes: {
    path: React.PropTypes.List.isRequired,
    buttons: React.PropTypes.List.isRequired,
    onClick: React.PropTypes.func.isRequired,
    className: React.PropTypes.string
  },
  
  handleClick: function(button, event) {
    if (this.props.onClick) {
      event.button = button;
      this.props.onClick(event);
    }
  },
  
  renderButton: function(button, index) {
    var props = Button.pickProps(this.props.path, button);
    return (
      <Button key={index} {...props} onClick={this.handleClick.bind(this, button)} />
    );
  },
  
  render: function() {
    
    var classes = {};
    classes["button-group"] = true;
    classes[this.props.className] = !!this.props.className;
  
    return (
      <div data-field-name={this.props.name} className={classNames(classes)}>
        {this.props.buttons.map(this.renderButton)}
      </div>
    );
  },
  
});

// - -------------------------------------------------------------------- - //

module.exports = ButtonGroup;

// - -------------------------------------------------------------------- - //
