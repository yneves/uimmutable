/*!
**  uimmutable -- React components with Immutable powers.
**  Copyright (c) 2015 Yuri Neves Silveira <http://yneves.com>
**  Licensed under The MIT License <http://opensource.org/licenses/MIT>
**  Distributed on <http://github.com/yneves/uimmutable>
*/
// - -------------------------------------------------------------------- - //

"use strict";

rey.component("uim.LinkGroup", [
  "React", "Immutable", "classNames", "uim.Link", "uim.Icon",
  function(React, Immutable, classNames, Link, Icon) {
  
    return {
      
      statics: {
        
        pickProps: function(path, field, values) {
          path = field.has("path") ? field.get("path") : path.push(field.get("name"));
          return {
            path: path,
            name: field.get("name"),
            links: field.get("links"),
            className: field.get("className")
          };
        }
      },
      
      propTypes: {
        path: React.PropTypes.List.isRequired,
        name: React.PropTypes.string.isRequired,
        links: React.PropTypes.List.isRequired,
        className: React.PropTypes.string
      },
      
      getDefaultProps: function() {
        return {
          path: Immutable.List(),
          links: Immutable.List()
        };
      },
      
      renderIcon: function(link) {
        var icon;
        if (link.has("icon")) {
          icon = (
            <Icon key="icon" name={link.get("icon")} />
          );
        }
        return icon;
      },
      
      renderLink: function(link, index) {
        
        return (
          <li key={index}>
            <Link name={link.get("name")} href={link.get("href")}>
              {this.renderIcon(link)}
              {link.get("label")}
            </Link>
          </li>
        );
      },
      
      render: function() {
        var classes = { "link-group": true };
        classes[this.props.className] = !!this.props.className;
        
        return (
          <ul className={classNames(classes)}>
            {this.props.links.map(this.renderLink)}
          </ul>
        );
      },
      
    };
  }
]);

// - -------------------------------------------------------------------- - //
