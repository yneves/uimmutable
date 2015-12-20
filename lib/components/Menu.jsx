/*!
**  uimmutable -- React components with Immutable powers.
**  Copyright (c) 2015 Yuri Neves Silveira <http://yneves.com>
**  Licensed under The MIT License <http://opensource.org/licenses/MIT>
**  Distributed on <http://github.com/yneves/uimmutable>
*/
// - -------------------------------------------------------------------- - //

"use strict";

var {React, Immutable, classNames} = require("../libs.js");

var Icon = require("./Icon.jsx");
var LinkGroup = require("./LinkGroup.jsx");
var IconButton = require("./IconButton.jsx");

// - -------------------------------------------------------------------- - //

var Menu = React.createClass({
  
  statics: {
    
    pickProps: function(path, field, values) {
      path = field.has("path") ? field.get("path") : path.push(field.get("name"));
      return {
        path: path,
        name: field.get("name"),
        icon: field.get("icon"),
        links: field.get("links"),
        button: field.get("button"),
        className: field.get("className")
      };
    }
  },
  
  propTypes: {
    path: React.PropTypes.List.isRequired,
    name: React.PropTypes.string.isRequired,
    icon: React.PropTypes.string.isRequired,
    links: React.PropTypes.List.isRequired,
    button: React.PropTypes.bool.isRequired,
    className: React.PropTypes.string
  },
  
  getDefaultProps: function() {
    return {
      path: Immutable.List(),
      icon: "bars",
      button: false
    };
  },
  
  getInitialState: function() {
    return {
      showMenu: false
    };
  },
  
  handleClick: function() {
    this.setState({ showMenu: !this.state.showMenu });
  },
  
  renderIcon: function() {
    if (this.props.button) {
      return (
        <IconButton
          name={this.props.icon}
          icon={this.props.icon}
          onClick={this.handleClick} />
      );
    } else {
      return (
        <Icon name={this.props.icon} onClick={this.handleClick} />
      );
    }
  },
  
  render: function() {
    var classes = { menu: true, show: this.state.showMenu };
    classes[this.props.className] = !!this.props.className;
    
    return (
      <div className={classNames(classes)}>
        {this.renderIcon()}
        <LinkGroup
          name={this.props.name + "-links"}
          path={this.props.path.push("links")}
          links={this.props.links}
          className="menu-links" />
      </div>
    );
  },
  
});

// - -------------------------------------------------------------------- - //

module.exports = Menu;

// - -------------------------------------------------------------------- - //
