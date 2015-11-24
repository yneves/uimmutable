// - -------------------------------------------------------------------- - //

"use strict";

var React = require("react-immutable");
var Router = require("../../routes/Router.js");
var classNames = require("classnames");

// - -------------------------------------------------------------------- - //

var Link = React.createClass({
  
  statics: {
    
    pickProps: function(path, field, values) {
      path = field.has("path") ? field.get("path") : path.push(field.get("name"));
      return {
        path: path,
        name: field.get("name"),
        href: field.get("href"),
        label: field.get("label"),
        className: field.get("className")
      };
    }
  },
  
  propTypes: {
    name: React.PropTypes.string,
    href: React.PropTypes.string.isRequired,
    label: React.PropTypes.string,
    onClick: React.PropTypes.func,
    className: React.PropTypes.string
  },
  
  handleClick: function(event) {
    if (this.props.onClick) {
      this.props.onClick(event);
    }
    if (Link.globalClickHandler) {
      Link.globalClickHandler(event, this.props.href);
    }
  },
  
  render: function() {
    var classes = {};
    classes[this.props.className] = !!this.props.className;
    return (
      <a name={this.props.name} href={this.props.href} className={classNames(classes)} onClick={this.handleClick}>
        {this.props.label ? this.props.label : undefined}
        {this.props.children ? this.props.children : undefined}
      </a>
    );
  },
  
});

// - -------------------------------------------------------------------- - //

module.exports = Link;

// - -------------------------------------------------------------------- - //
