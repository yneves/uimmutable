/*!
**  uimmutable -- React components with Immutable powers.
**  Copyright (c) 2015 Yuri Neves Silveira <http://yneves.com>
**  Licensed under The MIT License <http://opensource.org/licenses/MIT>
**  Distributed on <http://github.com/yneves/uimmutable>
*/
// - -------------------------------------------------------------------- - //

"use strict";

rey.component("uim.Toolbar", [
  "React", "Immutable", "classNames",
  function(React, Immutable, classNames) {

    return {

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
        className: React.PropTypes.string,
        onClick: React.PropTypes.func,
        onChange: React.PropTypes.func
      },
      
      getDefaultProps: function() {
        return {
          path: Immutable.List(),
          tools: Immutable.List(),
          values: Immutable.Map()
        };
      },
      
      renderTool: function(tool, index) {
        
        var Component = getComponents()[tool.get("type")];
        
        if (!Component) {
          console.error(new Error("unknown component type (" + tool.get("type") + ")"));
        }
        
        if (!Component.pickProps) {
          console.error(new Error("invalid component type (" + tool.get("type") + ")"));
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
      
    };
  }
]);

// - -------------------------------------------------------------------- - //
