/*!
**  uimmutable -- React components with Immutable powers.
**  Copyright (c) 2015 Yuri Neves Silveira <http://yneves.com>
**  Licensed under The MIT License <http://opensource.org/licenses/MIT>
**  Distributed on <http://github.com/yneves/uimmutable>
*/
// - -------------------------------------------------------------------- - //

'use strict';

rey.component('uim.LinkButton', [
  'React', 'Immutable', 'classNames', 'uim.Link',
  (React, Immutable, classNames, Link) => ({

    statics: {

      pickProps(path, field, values) {
        path = field.has('path') ? field.get('path') : path.push(field.get('name'));
        return {
          path: path,
          name: field.get('name'),
          href: field.get('href'),
          label: field.get('label'),
          disabled: field.get('disabled'),
          className: field.get('className')
        };
      }
    },

    propTypes: {
      path: React.PropTypes.List.isRequired,
      name: React.PropTypes.string.isRequired,
      label: React.PropTypes.string.isRequired,
      disabled: React.PropTypes.bool.isRequired,
      onClick: React.PropTypes.func,
      className: React.PropTypes.string
    },

    getDefaultProps() {
      return {
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
        button: true,
        ['link-button']: true,
        [this.props.className]: !!this.props.className
      };
      return (
        <Link
          name={this.props.name}
          href={this.props.href}
          label={this.props.label}
          className={classNames(classes)}
          data-button-name={this.props.name}
          disabled={this.props.disabled}
          onClick={this.handleClick} />
      );
    }
  })
]);

// - -------------------------------------------------------------------- - //
