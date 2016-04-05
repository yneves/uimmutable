/*!
**  uimmutable -- React components with Immutable powers.
**  Copyright (c) 2015 Yuri Neves Silveira <http://yneves.com>
**  Licensed under The MIT License <http://opensource.org/licenses/MIT>
**  Distributed on <http://github.com/yneves/uimmutable>
*/
// - -------------------------------------------------------------------- - //

'use strict';

rey.component('uim.SelectButton', [
  'React', 'Immutable', 'classNames', 'uim.Icon', 'uim.Value',
  function (React, Immutable, classNames, Icon, Value) {

    return {

      statics: {

        pickProps: function (path, field, values) {
          path = field.has('path') ? field.get('path') : path.push(field.get('name'));
          return {
            path: path,
            label: field.get('label'),
            name: field.get('name'),
            options: field.get('options'),
            disabled: field.get('disabled'),
            disabledValues: field.get('disabledValues'),
            className: field.get('className'),
            blankValue: field.get('blankValue'),
            multiple: field.get('multiple'),
            value: values.getIn(path)
          };
        }
      },

      propTypes: {
        path: React.PropTypes.List.isRequired,
        name: React.PropTypes.string.isRequired,
        options: React.PropTypes.List.isRequired,
        disabled: React.PropTypes.bool.isRequired,
        multiple: React.PropTypes.bool.isRequired,
        disabledValues: React.PropTypes.List,
        blankValue: React.PropTypes.string,
        value: React.PropTypes.any,
        onChange: React.PropTypes.func,
        className: React.PropTypes.string
      },

      getInitialState: function () {
        return {
          showOptions: false
        };
      },

      getDefaultProps: function () {
        return {
          path: Immutable.List(),
          disabled: false,
          multiple: false
        };
      },

      handleClickCaret: function (event) {
        event.event.stopPropagation();
        this.setState({ showOptions: !this.state.showOptions });
      },

      getChangedValue: function (option) {
        var value;
        if (this.props.multiple) {
          var index = this.props.value.indexOf(option.get('value'));
          if (index === -1) {
            value = this.props.value.push(option.get('value'));
          } else {
            value = this.props.value.delete(index);
          }
        } else {
          value = option.get('value');
        }
        return value;
      },

      handleClickOption: function (option, event) {
        event.stopPropagation();
        if (!option.get('disabled')) {
          if (!this.props.multiple) {
            this.setState({ showOptions: !this.state.showOptions });
          }

          if (this.props.onChange) {
            this.props.onChange({
              name: this.props.name,
              path: this.props.path,
              value: this.getChangedValue(option),
              option: option,
              event: event
            });
          }
        }
      },

      handleClickValue: function (event) {
        if (this.props.onClick) {
          this.props.onClick({
            name: this.props.name,
            path: this.props.path,
            value: this.props.value,
            event: event.event
          });
        }
      },

      renderIcon: function (option) {
        var icon;
        if (option.has('icon')) {
          icon = (
            <Icon key='icon' name={option.get('icon')} />
          );
        }
        return icon;
      },

      renderSelected: function (option) {
        var selected;
        if (this.props.multiple) {
          if (this.props.value.indexOf(option.get('value')) !== -1) {
            selected = (
              <Icon name='check' className='icon-selected' />
            );
          } else {
            selected = (
              <Icon name='check' className='icon-unselected' />
            );
          }
        }
        return selected;
      },

      renderOption: function (option, index) {

        var classes = {};
        classes['select-button-option'] = true;
        classes['disabled'] = !!option.get('disabled');
        classes[option.get('className')] = !!option.get('className');

        var onClick = this.handleClickOption.bind(this, option);

        return (
          <li key={index} className={classNames(classes)} onClick={onClick}>
            {this.renderSelected(option)}
            {this.renderIcon(option)}
            {option.get('label')}
          </li>
        );
      },

      isDisabled: function () {
        return this.props.disabled || (this.props.disabledValues ?
          this.props.disabledValues.indexOf(this.props.value) !== -1 :
          false);
      },

      isSelected: function (option) {
        var selected = false;
        if (this.props.value || this.props.value === 0) {
          if (this.props.multiple) {
            if (this.props.value.indexOf(option.get('value')) !== -1) {
              selected = true;
            }
          } else if (option.get('value') === this.props.value) {
            selected = true;
          }
        }
        return selected;
      },

      getSelectedOptions: function () {
        return this.props.options.filter(function (option) {
          return this.isSelected(option);
        }, this);
      },

      renderSelectedOption: function () {

        var classes = {};
        classes['select-button-value'] = true;

        var selectedOptions = this.getSelectedOptions();
        var value;
        var icon;

        if (selectedOptions.size > 1) {
          value = selectedOptions.map(function (option) {
            return option.get('selectedLabel') || option.get('label');
          }).join(', ');

        } else if (selectedOptions.size > 0) {
          classes[selectedOptions.getIn([0, 'className'])] = !!selectedOptions.getIn([0, 'className']);
          value = selectedOptions.getIn([0, 'selectedLabel']) || selectedOptions.getIn([0, 'label']);
          icon = this.renderIcon(selectedOptions.get(0));

        } else if (this.props.blankValue) {
          classes['select-button-blank'] = true;
          value = this.props.blankValue;
        }

        return (
          <Value
            onClick={this.handleClickValue}
            className={classNames(classes)}
            path={this.props.path}
            name={this.props.name}
            value={[icon, value]} />
        );
      },

      renderOptions: function () {
        if (!this.isDisabled()) {
          return ([
            <Icon key='icon' name='caret-down' onClick={this.handleClickCaret} />
            ,
            <ul key='list'>
              {this.props.options.map(this.renderOption)}
            </ul>
          ]);
        }
      },

      render: function () {

        var classes = {};
        classes['select-button'] = true;
        classes['show-options'] = this.state.showOptions;
        classes['disabled'] = this.isDisabled();
        classes[this.props.className] = !!this.props.className;

        return (
          <button data-button-name={this.props.name} className={classNames(classes)} type='button'>
            {this.renderSelectedOption()}
            {this.renderOptions()}
          </button>
        );
      }

    };
  }
]);

// - -------------------------------------------------------------------- - //
