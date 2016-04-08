/*!
**  uimmutable -- React components with Immutable powers.
**  Copyright (c) 2015 Yuri Neves Silveira <http://yneves.com>
**  Licensed under The MIT License <http://opensource.org/licenses/MIT>
**  Distributed on <http://github.com/yneves/uimmutable>
*/
// - -------------------------------------------------------------------- - //

'use strict';

rey.component('uim.Fieldset', [
  'React', 'Immutable', 'classNames', 'uim.FieldGroup',
  function (React, Immutable, classNames, FieldGroup) {

    return {

      statics: {

        pickProps: function (path, field, values) {
          path = field.has('path') ? field.get('path') : path.push(field.get('name'));
          return {
            path: path,
            name: field.get('name'),
            label: field.get('label'),
            fields: field.get('fields'),
            className: field.get('className'),
            multiple: field.get('multiple'),
            collapsible: field.get('collapsible'),
            collapsed: field.get('collapsed'),
            values: values
          };
        }
      },

      propTypes: {
        path: React.PropTypes.List.isRequired,
        name: React.PropTypes.string.isRequired,
        label: React.PropTypes.string.isRequired,
        fields: React.PropTypes.List.isRequired,
        values: React.PropTypes.Map.isRequired,
        collapsible: React.PropTypes.bool.isRequired,
        collapsed: React.PropTypes.bool.isRequired,
        multiple: React.PropTypes.bool.isRequired,
        input: React.PropTypes.bool.isRequired,
        onChange: React.PropTypes.func,
        className: React.PropTypes.string
      },

      getDefaultProps: function () {
        return {
          path: Immutable.List(),
          input: true,
          collapsible: false,
          collapsed: false,
          multiple: false
        };
      },

      getInitialState: function () {
        return {
          collapsed: this.props.collapsed
        };
      },

      handleClickLegend: function () {
        if (this.props.collapsible) {
          this.setState({
            collapsed: !this.state.collapsed
          });
        }
      },

      render: function () {

        var classes = { fieldset: true };
        classes[this.props.className] = !!this.props.className;

        return (
          <div data-field-name={this.props.name} className={classNames(classes)}>
            <fieldset>
              <legend onClick={this.handleClickLegend}>
                {this.props.label}
              </legend>
              <FieldGroup
                path={this.props.path}
                fields={this.props.fields}
                values={this.props.values}
                input={this.props.input}
                collapsed={this.state.collapsed}
                multiple={this.props.multiple}
                onClick={this.props.onClick}
                onChange={this.props.onChange} />
            </fieldset>
          </div>
        );
      }

    };
  }
]);

// - -------------------------------------------------------------------- - //
