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

var Renderer = require("./Renderer.jsx");

// - -------------------------------------------------------------------- - //

var FieldGroup = React.createClass({
  
  propTypes: {
    path: React.PropTypes.List.isRequired,
    types: React.PropTypes.object.isRequired,
    fields: React.PropTypes.List.isRequired,
    values: React.PropTypes.Map.isRequired,
    extraProps: React.PropTypes.object,
    className: React.PropTypes.string
  },
  
  renderField: function(field, index) {
    
    return (
      <Renderer
        key={index}
        path={this.props.path}
        field={field}
        values={this.props.values}
        types={this.props.types}
        extraProps={this.props.extraProps} />
    );
  },
  
  render: function() {
    
    var classes = { "field-group": true };
    classes[this.props.className] = !!this.props.className;
    
    return (
      <div className={classNames(classes)}>
        {this.props.fields.map(this.renderField)}
      </div>
    );
  },
  
});

// - -------------------------------------------------------------------- - //

module.exports = FieldGroup;

// - -------------------------------------------------------------------- - //
