/*!
**  uimmutable -- React components with Immutable powers.
**  Copyright (c) 2015 Yuri Neves Silveira <http://yneves.com>
**  Licensed under The MIT License <http://opensource.org/licenses/MIT>
**  Distributed on <http://github.com/yneves/uimmutable>
*/
// - -------------------------------------------------------------------- - //

'use strict';

rey.component('uim.Field', [
  'React', 'Immutable', 'classNames',
  (React, Immutable, classNames) => ({

    propTypes: {
      name: React.PropTypes.string.isRequired,
      label: React.PropTypes.string.isRequired,
      className: React.PropTypes.string
    },

    render() {
      const classes = {
        field: true,
        [this.props.className]: !!this.props.className
      };
      return (
        <div data-field-name={this.props.name} className={classNames(classes)}>
          <label>{this.props.label}</label>
          {this.props.children}
        </div>
      );
    }
  })
]);

// - -------------------------------------------------------------------- - //
