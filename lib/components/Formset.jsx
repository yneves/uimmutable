/*!
**  uimmutable -- React components with Immutable powers.
**  Copyright (c) 2015 Yuri Neves Silveira <http://yneves.com>
**  Licensed under The MIT License <http://opensource.org/licenses/MIT>
**  Distributed on <http://github.com/yneves/uimmutable>
*/
// - -------------------------------------------------------------------- - //

"use strict";

var {React, Immutable, classNames} = require("../libs.js");

var FieldGroup = require("./FieldGroup.jsx");

// - -------------------------------------------------------------------- - //

var Formset = React.createClass({
  
  propTypes: {
    path: React.PropTypes.List.isRequired,
    name: React.PropTypes.string.isRequired,
    label: React.PropTypes.string,
    fields: React.PropTypes.List.isRequired,
    values: React.PropTypes.Map.isRequired,
    input: React.PropTypes.bool.isRequired,
    collapsible: React.PropTypes.bool.isRequired,
    onClick: React.PropTypes.func,
    onChange: React.PropTypes.func,
    className: React.PropTypes.string
  },
  
  getDefaultProps: function() {
    return {
      path: Immutable.List(),
      input: true,
      collapsible: false
    };
  },
  
  getInitialState: function() {
    return {
      collapsed: false
    };
  },
  
  handleClickTitle: function() {
    if (this.props.collapsible) {
      this.setState({
        collapsed: !this.state.collapsed
      });
    }
  },
  
  render: function() {
    
    var classes = { formset: true };
    classes[this.props.className] = !!this.props.className;
    
    var title;
    if (this.props.label) {
      title = (
        <h1 className="title" onClick={this.handleClickTitle}>
          <span>{this.props.label}</span>
        </h1>
      );
    }
    
    return (
      <div data-form-name={this.props.name} className={classNames(classes)}>
        {title}
        <FieldGroup
          path={this.props.path}
          input={this.props.input}
          fields={this.props.fields}
          values={this.props.values}
          collapsed={this.state.collapsed}
          onClick={this.props.onClick}
          onChange={this.props.onChange} />
      </div>
    );
  },
  
});

// - -------------------------------------------------------------------- - //

module.exports = Formset;

// - -------------------------------------------------------------------- - //
