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

var Icon = require("./Icon.jsx");
var Link = require("./Link.jsx");
var Menu = require("./Menu.jsx");
var Value = require("./Value.jsx");
var Button = require("./Button.jsx");
var LinkButton = require("./LinkButton.jsx");
var SelectButton = require("./SelectButton.jsx");
var Renderer = require("./Renderer.jsx");

// - -------------------------------------------------------------------- - //

var Toolbar = React.createClass({
  
  propTypes: {
    path: React.PropTypes.List.isRequired,
    types: React.PropTypes.Map.isRequired,
    values: React.PropTypes.Map.isRequired,
    tools: React.PropTypes.List,
    className: React.PropTypes.string
  },
  
  getDefaultProps: function() {
    return {
      path: Immutable.List(),
      values: Immutable.Map(),
      types: Immutable.Map({
        Icon: Icon,
        Menu: Menu,
        Link: Link,
        Value: Value,
        Button: Button,
        LinkButton: LinkButton,
        SelectButton: SelectButton
      })
    };
  },
  
  renderTool: function(tool, index) {
    
    var extraProps = {
      onClick: this.props.onClick,
      onChange: this.props.onChange
    };
    
    return (
      <div key={index} data-tool-name={tool.get("name")} className="tool">
        <Renderer
          key={index}
          path={this.props.path}
          field={tool}
          values={this.props.values}
          types={this.props.types}
          extraProps={extraProps} />
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
