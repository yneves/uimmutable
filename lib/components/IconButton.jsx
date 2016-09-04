/*!
**  uimmutable -- UI components for Rey framework.
**  Copyright (c) 2016 Yuri Neves Silveira <http://yneves.com>
**  Licensed under The MIT License <http://opensource.org/licenses/MIT>
**  Distributed on <http://github.com/yneves/uimmutable>
*/
// - -------------------------------------------------------------------- - //

'use strict';

rey.component('uim.IconButton', [
  'React', 'Immutable', 'classNames', 'uim.Icon',
  (React, Immutable, classNames, Icon) => ({

    statics: {

      pickProps(path, field, values) {
        path = field.has('path') ? field.get('path') : path.push(field.get('name'));
        return {
          path: path,
          name: field.get('name'),
          icon: field.get('icon'),
          disabled: field.get('disabled'),
          className: field.get('className')
        };
      }
    },

    propTypes: {
      path: React.PropTypes.List.isRequired,
      name: React.PropTypes.string.isRequired,
      icon: React.PropTypes.string.isRequired,
      disabled: React.PropTypes.bool.isRequired,
      onClick: React.PropTypes.func,
      className: React.PropTypes.string
    },

    getDefaultProps() {
      return {
        path: Immutable.List(),
        disabled: false
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
      const classes = {
        ['icon-button']: true,
        [this.props.className]: !!this.props.className
      };
      return (
        <Icon
          name={this.props.name}
          icon={this.props.icon}
          className={classNames(classes)}
          data-button-name={this.props.name}
          disabled={this.props.disabled}
          onClick={this.handleClick} />
      );
    }
  })
]);

// - -------------------------------------------------------------------- - //
