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

// - -------------------------------------------------------------------- - //

var Button = React.createClass({
  
  statics: {
    
    pickProps: function(path, field, values) {
      path = field.has("path") ? field.get("path") : path.push(field.get("name"));
      return {
        path: path,
        name: field.get("name"),
        label: field.get("label"),
        htmlType: field.get("htmlType"),
        disabled: field.get("disabled"),
        className: field.get("className")
      };
    }
  },
  
  propTypes: {
    path: React.PropTypes.List.isRequired,
    name: React.PropTypes.string.isRequired,
    label: React.PropTypes.string.isRequired,
    disabled: React.PropTypes.bool.isRequired,
    htmlType: React.PropTypes.string.isRequired,
    onClick: React.PropTypes.func,
    className: React.PropTypes.string
  },
  
  getDefaultProps: function() {
    return {
      path: Immutable.List(),
      htmlType: "button",
      disabled: false
    };
  },
  
  handleClick: function(event) {
    if (this.props.onClick) {
      this.props.onClick({
        name: this.props.name,
        path: this.props.path,
        event: event
      });
    }
  },
  
  render: function() {
    
    var classes = { button: true };
    classes[this.props.className] = !!this.props.className;
    
    return (
      <button
        data-button-name={this.props.name}
        type={this.props.htmlType}
        disabled={this.props.disabled}
        className={classNames(classes)}
        onClick={this.handleClick}>
        {this.props.label}
      </button>
    );
  }
  
});

// - -------------------------------------------------------------------- - //

module.exports = Button;

// - -------------------------------------------------------------------- - //
