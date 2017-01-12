/*!
**  uimmutable -- UI components for Rey framework.
**  Copyright (c) 2016 Yuri Neves Silveira <http://yneves.com>
**  Licensed under The MIT License <http://opensource.org/licenses/MIT>
**  Distributed on <http://github.com/yneves/uimmutable>
*/
// - -------------------------------------------------------------------- - //

'use strict';

rey.component('uim.Icon', [
  'React', 'Immutable', 'classNames',
  (React, Immutable, classNames, globals = {}) => ({

    statics: {

      globals: globals,

      pickProps(path, field, values) {
        path = field.has('path') ? field.get('path') : path.push(field.get('name'));
        return {
          path: path,
          name: field.get('name'),
          icon: field.get('icon'),
          className: field.get('className')
        };
      }
    },

    propTypes: {
      path: React.PropTypes.List.isRequired,
      name: React.PropTypes.string.isRequired,
      icon: React.PropTypes.string,
      className: React.PropTypes.string,
      onClick: React.PropTypes.func
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
    },

    render() {
      const icon = this.props.icon || this.props.name;
      const classes = {
        icon: true,
        [globals.className || 'fa']: true,
        [this.props.className]: !!this.props.className,
        [(globals.classNamePrefix || 'fa-') + icon]: true
      };
      return (
        <span className={classNames(classes)} onClick={this.handleClick} />
      );
    }
  })
]);

// - -------------------------------------------------------------------- - //
