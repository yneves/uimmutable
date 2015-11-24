/*!
**  uimmutable -- React components with Immutable powers.
**  Copyright (c) 2015 Yuri Neves Silveira <http://yneves.com>
**  Licensed under The MIT License <http://opensource.org/licenses/MIT>
**  Distributed on <http://github.com/yneves/uimmutable>
*/
// - -------------------------------------------------------------------- - //

"use strict";

var React = require("react-immutable");
var classNames = require("classnames");

var Link = require("./Link.jsx");
var Icon = require("./Icon.jsx");

// - -------------------------------------------------------------------- - //

var Menu = React.createClass({
  
  statics: {
    
    pickProps: function(path, field, values) {
      return {
        name: field.get("name"),
        icon: field.get("icon"),
        links: field.get("links"),
        className: field.get("className")
      };
    }
  },
  
  propTypes: {
    name: React.PropTypes.string.isRequired,
    icon: React.PropTypes.string.isRequired,
    links: React.PropTypes.List.isRequired,
    className: React.PropTypes.string
  },
  
  getDefaultProps: function() {
    return {
      icon: "bars"
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
  
  renderLink: function(link, index) {
    
    return (
      <li key={index}>
        <Link href={link.get("href")}>
          {link.get("label")}
        </Link>
      </li>
    );
  },
  
  render: function() {
    var classes = { menu: true, show: this.state.showMenu };
    
    return (
      <div className={classNames(classes)}>
        <Icon name={this.props.icon} onClick={this.handleClick} />
        <ul>
          {this.props.links.map(this.renderLink)}
        </ul>
      </div>
    );
  },
  
});

// - -------------------------------------------------------------------- - //

module.exports = Menu;

// - -------------------------------------------------------------------- - //
