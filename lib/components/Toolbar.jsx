/*!
**  uimmutable -- React components with Immutable powers.
**  Copyright (c) 2015 Yuri Neves Silveira <http://yneves.com>
**  Licensed under The MIT License <http://opensource.org/licenses/MIT>
**  Distributed on <http://github.com/yneves/uimmutable>
*/
// - -------------------------------------------------------------------- - //

"use strict";

var { React, Immutable, classNames, getComponents } = require("../libs.js");

// - -------------------------------------------------------------------- - //

var Toolbar = React.createClass({
  
  statics: {
    
    pickProps: function(path, field, values) {
      path = field.has("path") ? field.get("path") : path.push(field.get("name"));
      return {
        path: path,
        name: field.get("name"),
        tools: field.get("tools"),
        className: field.get("className"),
        values: values,
      };
    },
    
    formatters: {}
  },
  
  propTypes: {
    path: React.PropTypes.List.isRequired,
    values: React.PropTypes.Map.isRequired,
    tools: React.PropTypes.List,
    className: React.PropTypes.string
  },
  
  getDefaultProps: function() {
    return {
      path: Immutable.List(),
      values: Immutable.Map()
    };
  },
  
  renderTool: function(tool, index) {
    
    var Component = getComponents()[tool.get("type")];
    
    if (!Component) {
      throw new Error("unknown component type (" + tool.get("type") + ")");
    }
    
    if (!Component.pickProps) {
      throw new Error("invalid component type (" + tool.get("type") + ")");
    }
    
    var props = Component.pickProps(this.props.path, tool, this.props.values);
    
    return (
      <div key={index} data-tool-name={tool.get("name")} className="tool">
        <Component {...props}
          onClick={this.props.onClick}
          onChange={this.props.onChange} />
      </div>
    );
  },
  
  render: function() {
    
    var classes = { toolbar: true };
    classes[this.props.className] = !!this.props.className;
    
    return (
      <div data-toolbar-name={this.props.name} className={classNames(classes)}>
        {this.props.tools.map(this.renderTool)}
      </div>
    );
  }
  
});

// - -------------------------------------------------------------------- - //

module.exports = Toolbar;

// - -------------------------------------------------------------------- - //
