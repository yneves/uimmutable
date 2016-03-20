/*!
**  uimmutable -- React components with Immutable powers.
**  Copyright (c) 2015 Yuri Neves Silveira <http://yneves.com>
**  Licensed under The MIT License <http://opensource.org/licenses/MIT>
**  Distributed on <http://github.com/yneves/uimmutable>
*/
// - -------------------------------------------------------------------- - //

'use strict';

rey.component('uim.Menu', [
  'React', 'Immutable', 'classNames', 'uim.Icon', 'uim.LinkGroup', 'uim.IconButton',
  function (React, Immutable, classNames, Icon, LinkGroup, IconButton) {

    return {

      statics: {

        pickProps: function (path, field, values) {
          path = field.has('path') ? field.get('path') : path.push(field.get('name'));
          return {
            path: path,
            name: field.get('name'),
            icon: field.get('icon'),
            links: field.get('links'),
            button: field.get('button'),
            counter: field.get('counter'),
            className: field.get('className')
          };
        }
      },

      propTypes: {
        path: React.PropTypes.List.isRequired,
        name: React.PropTypes.string.isRequired,
        icon: React.PropTypes.string.isRequired,
        links: React.PropTypes.List.isRequired,
        button: React.PropTypes.bool.isRequired,
        counter: React.PropTypes.number,
        className: React.PropTypes.string
      },

      getDefaultProps: function () {
        return {
          path: Immutable.List(),
          icon: 'bars',
          button: false
        };
      },

      getInitialState: function () {
        return {
          showMenu: false
        };
      },

      handleClick: function () {
        this.setState({ showMenu: !this.state.showMenu });
      },

      renderIcon: function () {
        var icon;
        if (this.props.button) {
          icon = (
            <IconButton
              name={this.props.icon}
              icon={this.props.icon}
              onClick={this.handleClick} />
          );
        } else {
          icon = (
            <Icon name={this.props.icon} onClick={this.handleClick} />
          );
        }
        return icon;
      },

      renderCounter: function () {
        if (this.props.counter) {
          return (
            <div className='menu-counter' onClick={this.handleClick}>
              {this.props.counter}
            </div>
          );
        }
      },

      render: function () {
        var classes = { menu: true, show: this.state.showMenu };
        classes[this.props.className] = !!this.props.className;

        return (
          <div className={classNames(classes)}>
            {this.renderCounter()}
            {this.renderIcon()}
            <LinkGroup
              name={this.props.name + '-links'}
              path={this.props.path.push('links')}
              links={this.props.links}
              className='menu-links' />
          </div>
        );
      }

    };
  }
]);

// - -------------------------------------------------------------------- - //
