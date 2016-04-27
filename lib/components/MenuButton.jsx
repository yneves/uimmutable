/*!
**  uimmutable -- React components with Immutable powers.
**  Copyright (c) 2015 Yuri Neves Silveira <http://yneves.com>
**  Licensed under The MIT License <http://opensource.org/licenses/MIT>
**  Distributed on <http://github.com/yneves/uimmutable>
*/
// - -------------------------------------------------------------------- - //

'use strict';

rey.component('uim.MenuButton', [
  'React', 'Immutable', 'classNames', 'uim.Icon', 'uim.LinkGroup', 'uim.IconButton',
  (React, Immutable, classNames, Icon, LinkGroup, IconButton) => ({

    statics: {

      pickProps(path, field, values) {
        path = field.has('path') ? field.get('path') : path.push(field.get('name'));
        return {
          path: path,
          name: field.get('name'),
          icon: field.get('icon'),
          links: field.get('links'),
          groups: field.get('groups'),
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
      button: React.PropTypes.bool.isRequired,
      links: React.PropTypes.List,
      groups: React.PropTypes.List,
      counter: React.PropTypes.number,
      className: React.PropTypes.string
    },

    getDefaultProps() {
      return {
        path: Immutable.List(),
        icon: 'bars',
        button: false
      };
    },

    getInitialState() {
      return {
        showMenu: false
      };
    },

    handleClick() {
      this.setState({ showMenu: !this.state.showMenu });
    },

    renderIcon() {
      let icon;
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

    renderCounter() {
      if (this.props.counter) {
        return (
          <div className='menu-button-counter' onClick={this.handleClick}>
            {this.props.counter}
          </div>
        );
      }
    },

    renderMenu() {
      let content;
      if (this.props.groups) {
        content = this.props.groups.map((group, index) => (
          <div key={index} className='menu-button-group'>
            {group.get('label') && <h2>{group.get('label')}</h2>}
            <LinkGroup
              name={this.props.name + '-' + index + '-links'}
              path={this.props.path.concat(index, 'links')}
              links={group.get('links')}
              className='menu-button-links' />
          </div>
        ));
      } else if (this.props.links) {
        content = (
          <LinkGroup
            name={this.props.name + '-links'}
            path={this.props.path.push('links')}
            links={this.props.links}
            className='menu-button-links' />
        );
      }
      return (
        <div className='menu-button-dropdown'>
          {content}
        </div>
      );
    },

    render() {
      const classes = {
        show: this.state.showMenu,
        ['menu-button']: true,
        [this.props.className]: !!this.props.className
      };
      return (
        <div className={classNames(classes)}>
          {this.renderCounter()}
          {this.renderIcon()}
          {this.renderMenu()}
        </div>
      );
    }
  })
]);

// - -------------------------------------------------------------------- - //
