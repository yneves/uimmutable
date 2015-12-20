/*!
**  uimmutable -- React components with Immutable powers.
**  Copyright (c) 2015 Yuri Neves Silveira <http://yneves.com>
**  Licensed under The MIT License <http://opensource.org/licenses/MIT>
**  Distributed on <http://github.com/yneves/uimmutable>
*/
// - -------------------------------------------------------------------- - //

"use strict";

var {React, Immutable, classNames} = require("../libs.js");

// - -------------------------------------------------------------------- - //

var Renderer = React.createClass({
  
  propTypes: {
    path: React.PropTypes.List.isRequired,
    types: React.PropTypes.Map.isRequired,
    field: React.PropTypes.Map.isRequired,
    values: React.PropTypes.Map.isRequired,
    extraTypes: React.PropTypes.Map.isRequired,
    extraProps: React.PropTypes.object
  },
  
  getDefaultProps: function() {
    return {
      path: Immutable.List(),
      types: Immutable.Map(),
      extraTypes: Immutable.Map()
    };
  },
  
  getComponent: function() {
    var type = this.props.field.get("type");
    var Component;
    if (this.props.types.has(type)) {
      Component = this.props.types.get(type);
    } else if (this.props.extraTypes.has(type)) {
      Component = this.props.extraTypes.get(type);
    }
    if (!Component) {
      throw new Error("unknown component type (" + type + ")");
    }
    return Component;
  },
  
  render: function() {
    var Component = this.getComponent();
    var props = Component.pickProps(this.props.path, this.props.field, this.props.values);
    return (
      <Component types={this.props.types} {...props} {...this.props.extraProps} />
    );
  }
  
});

// - -------------------------------------------------------------------- - //

module.exports = Renderer;

// - -------------------------------------------------------------------- - //
