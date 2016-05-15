/*!
**  uimmutable -- React components with Immutable powers.
**  Copyright (c) 2015 Yuri Neves Silveira <http://yneves.com>
**  Licensed under The MIT License <http://opensource.org/licenses/MIT>
**  Distributed on <http://github.com/yneves/uimmutable>
*/
// - -------------------------------------------------------------------- - //

'use strict';

rey.component('uim.CheckGroup', [
  'React', 'Immutable', 'classNames', 'uim.Button', 'uim.Field',
  (React, Immutable, classNames, Button, Field) => ({

    statics: {

      pickProps(path, field, values) {
        path = field.has('path') ? field.get('path') : path.push(field.get('name'));
        return {
          path: path,
          name: field.get('name'),
          label: field.get('label'),
          checkboxes: field.get('checkboxes'),
          className: field.get('className'),
          style: field.get('style'),
          value: values.getIn(path)
        };
      }
    },

    propTypes: {
      path: React.PropTypes.List.isRequired,
      label: React.PropTypes.string,
      input: React.PropTypes.bool.isRequired,
      checkboxes: React.PropTypes.List.isRequired,
      values: React.PropTypes.Map.isRequired,
      onChange: React.PropTypes.func.isRequired,
      className: React.PropTypes.string,
      style: React.PropTypes.oneOfType([
        React.PropTypes.Map,
        React.PropTypes.object
      ])
    },

    renderCheckbox(option, index) {
      const name = option.get('name') || index;
      const label = option.get('label') || name;
      const path = this.props.path.push(name);
      return (
        <Checkbox ref={name}
          key={index}
          path={path}
          name={name}
          label={label}
          checked={!!this.props.values.getIn(path)}
          disabled={option.get('disabled')}
          onChange={this.props.onChange} />
      );
    },

    render() {
      const classes = {
        ['check-group']: true,
        [this.props.className]: !!this.props.className
      };
      return (
        <Field ref='field'
          name={this.props.name}
          label={this.props.label}
          style={this.props.style}
          className={classNames(classes)}>
          {this.props.checkboxes.map(this.renderCheckbox)}
        </Field>
      );
    }
  })
]);

// - -------------------------------------------------------------------- - //
