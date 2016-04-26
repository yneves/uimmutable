/*!
**  uimmutable -- React components with Immutable powers.
**  Copyright (c) 2015 Yuri Neves Silveira <http://yneves.com>
**  Licensed under The MIT License <http://opensource.org/licenses/MIT>
**  Distributed on <http://github.com/yneves/uimmutable>
*/
// - -------------------------------------------------------------------- - //

'use strict';

rey.component('uim.Link', [
  'React', 'Immutable', 'classNames',
  (React, Immutable, classNames, globals = {}) => ({

    statics: {

      globals: globals,

      pickProps(path, field, values) {
        path = field.has('path') ? field.get('path') : path.push(field.get('name'));
        return {
          path: path,
          name: field.get('name'),
          href: field.get('href'),
          label: field.get('label'),
          className: field.get('className')
        };
      }
    },

    propTypes: {
      name: React.PropTypes.string,
      path: React.PropTypes.List.isRequired,
      href: React.PropTypes.string.isRequired,
      label: React.PropTypes.string,
      onClick: React.PropTypes.func,
      className: React.PropTypes.string
    },

    getDefaultProps() {
      return {
        path: Immutable.List()
      };
    },

    handleClick(event) {
      if (this.props.onClick) {
        this.props.onClick({
          name: this.props.name,
          path: this.props.path,
          event: event
        });
      }
      if (globals.clickHandler) {
        globals.clickHandler(event, this.props.href);
      }
    },

    render() {
      const classes = {
        [this.props.className]: !!this.props.className
      };
      return (
        <a name={this.props.name}
          href={this.props.href}
          className={classNames(classes)}
          onClick={this.handleClick}>
          {this.props.label ? this.props.label : undefined}
          {this.props.children ? this.props.children : undefined}
        </a>
      );
    }
  })
]);

// - -------------------------------------------------------------------- - //
