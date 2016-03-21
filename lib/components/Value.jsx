/*!
**  uimmutable -- React components with Immutable powers.
**  Copyright (c) 2015 Yuri Neves Silveira <http://yneves.com>
**  Licensed under The MIT License <http://opensource.org/licenses/MIT>
**  Distributed on <http://github.com/yneves/uimmutable>
*/
// - -------------------------------------------------------------------- - //

'use strict';

rey.component('uim.Value', [
  'React', 'Immutable', 'classNames',
  function (React, Immutable, classNames) {

    var Formatters = {};

    return {

      statics: {

        pickProps: function (path, field, values) {
          path = field.has('path') ? field.get('path') : path.push(field.get('name'));
          return {
            path: path,
            name: field.get('name'),
            format: field.get('format'),
            className: field.get('className'),
            value: values.getIn(path),
            texts: field.get('texts')
          };
        },

        formatters: Formatters
      },

      propTypes: {
        path: React.PropTypes.List,
        name: React.PropTypes.string,
        value: React.PropTypes.any,
        texts: React.PropTypes.Map,
        format: React.PropTypes.string,
        className: React.PropTypes.string,
        onClick: React.PropTypes.func
      },

      handleClick: function (event) {
        if (this.props.onClick) {
          this.props.onClick({
            name: this.props.name,
            path: this.props.path,
            value: this.props.value,
            event: event
          });
        }
      },

      render: function () {

        var classes = { value: true };
        classes[this.props.className] = !!this.props.className;

        var value;

        if (this.props.value || this.props.value === 0) {
          if (this.props.format) {
            if (Formatters[this.props.format]) {
              value = Formatters[this.props.format](this.props.value);
            } else {
              throw new Error('unknown format (' + this.props.format + ')');
            }

          } else {
            value = this.props.value;
          }

        } else {
          value = '-';
        }

        if (this.props.texts) {
          value = this.props.texts.get(value);
        }

        return (
          <div className={classNames(classes)} onClick={this.handleClick}>
            {value}
          </div>
        );
      }

    };
  }
]);

// - -------------------------------------------------------------------- - //
