// - -------------------------------------------------------------------- - //

"use strict";

var React = require("react-immutable");
var Immutable = require("immutable");
var classNames = require("classnames");

// - -------------------------------------------------------------------- - //

var Icon = React.createClass({
  
  statics: {
    
    className: "fa",
    classNamePrefix: "fa-",
    
    pickProps: function(path, field, values) {
      path = field.has("path") ? field.get("path") : path.push(field.get("name"));
      return {
        path: path,
        name: field.get("name"),
        icon: field.get("icon"),
        className: field.get("className")
      };
    }
  },
  
  propTypes: {
    path: React.PropTypes.List.isRequired,
    name: React.PropTypes.string.isRequired,
    icon: React.PropTypes.string,
    className: React.PropTypes.string,
    onClick: React.PropTypes.func
  },
  
  getDefaultProps: function() {
    return {
      path: Immutable.List()
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
    
    var classes = { icon: true };
    classes[Icon.className] = true;
    classes[this.props.className] = !!this.props.className;
    
    if (this.props.icon) {
      classes[Icon.classNamePrefix + this.props.icon] = true;
      
    } else if (this.props.name) {
      classes[Icon.classNamePrefix + this.props.name] = true;
    }
    
    return (
      <span className={classNames(classes)} onClick={this.handleClick} />
    );
  },
  
});

// - -------------------------------------------------------------------- - //

module.exports = Icon;

// - -------------------------------------------------------------------- - //
