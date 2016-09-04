/*!
**  uimmutable -- UI components for Rey framework.
**  Copyright (c) 2016 Yuri Neves Silveira <http://yneves.com>
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
      label: React.PropTypes.string,
      className: React.PropTypes.string,
      style: React.PropTypes.oneOfType([
        React.PropTypes.Map,
        React.PropTypes.object
      ])
    },

    render() {
      const style = Immutable.Map.isMap(this.props.style)
        ? this.props.style.toJS() : this.props.style;
      const classes = {
        field: true,
        [this.props.className]: !!this.props.className
      };
      return (
        <div data-field-name={this.props.name} style={style} className={classNames(classes)}>
          <label>{this.props.label}</label>
          {this.props.children}
        </div>
      );
    }
  })
]);

// - -------------------------------------------------------------------- - //
