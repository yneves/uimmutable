// - -------------------------------------------------------------------- - //

"use strict";

var React = require("react-immutable");
var Immutable = require("immutable");
var classNames = require("classnames");

// - -------------------------------------------------------------------- - //

var Value = React.createClass({
  
  statics: {
    
    pickProps: function(path, field, values) {
      path = field.has("path") ? field.get("path") : path.push(field.get("name"));
      return {
        path: path,
        name: field.get("name"),
        format: field.get("format"),
        className: field.get("className"),
        value: values.getIn(path)
      };
    },
    
    formatters: {
      
      id: function(val) {
        return "#" + val;
      },
      
      date: function(val) {
        var parts = val.split("-");
        return parts[2] + "/" + parts[1] + "/" + parts[0];
      }
      
    }
  },
  
  propTypes: {
    path: React.PropTypes.List,
    name: React.PropTypes.string,
    value: React.PropTypes.any,
    format: React.PropTypes.string,
    className: React.PropTypes.string
  },
  
  render: function() {
    
    var classes = { value: true };
    classes[this.props.className] = !!this.props.className;
    
    var value;
    
    if (this.props.value || this.props.value === 0) {
      if (this.props.format) {
        if (Value.formatters[this.props.format]) {
          value = Value.formatters[this.props.format](this.props.value);
        } else {
          throw new Error("unknown format (" + this.props.format + ")");
        }
        
      } else {
        value = this.props.value;
      }
      
    } else {
      value = "-";
    }
    
    return (
      <div className={classNames(classes)}>
        {value}
      </div>
    );
  }
  
});

// - -------------------------------------------------------------------- - //

module.exports = Value;

// - -------------------------------------------------------------------- - //
