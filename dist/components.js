/*!
**  uimmutable -- UI components for Rey framework.
**  Copyright (c) 2016 Yuri Neves Silveira <http://yneves.com>
**  Licensed under The MIT License <http://opensource.org/licenses/MIT>
**  Distributed on <http://github.com/yneves/uimmutable>
*/
// - -------------------------------------------------------------------- - //

'use strict';

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

rey.factory('classNames', ['window', function (window) {
  return window.classNames;
}]);

/*!
**  uimmutable -- UI components for Rey framework.
**  Copyright (c) 2016 Yuri Neves Silveira <http://yneves.com>
**  Licensed under The MIT License <http://opensource.org/licenses/MIT>
**  Distributed on <http://github.com/yneves/uimmutable>
*/
// - -------------------------------------------------------------------- - //

'use strict';

rey.factory('uim.DateFormat', [function () {
  return {

    date: {
      input: 'DD/MM/YYYY',
      output: 'YYYY-MM-DD'
    },

    time: {
      input: 'HH:mm',
      output: 'HH:mm:ss'
    },

    datetime: {
      input: 'DD/MM/YYYY HH:mm',
      output: 'YYYY-MM-DD HH:mm:ss'
    }

  };
}]);

/*!
**  uimmutable -- UI components for Rey framework.
**  Copyright (c) 2016 Yuri Neves Silveira <http://yneves.com>
**  Licensed under The MIT License <http://opensource.org/licenses/MIT>
**  Distributed on <http://github.com/yneves/uimmutable>
*/
// - -------------------------------------------------------------------- - //

'use strict';

rey.factory('uim.DatePicker', [function () {
  return DatePicker;
}]);

/*!
**  uimmutable -- UI components for Rey framework.
**  Copyright (c) 2016 Yuri Neves Silveira <http://yneves.com>
**  Licensed under The MIT License <http://opensource.org/licenses/MIT>
**  Distributed on <http://github.com/yneves/uimmutable>
*/
// - -------------------------------------------------------------------- - //

'use strict';

rey.factory('moment', ['window', function (window) {
  return window.moment;
}]);

/*!
**  uimmutable -- UI components for Rey framework.
**  Copyright (c) 2016 Yuri Neves Silveira <http://yneves.com>
**  Licensed under The MIT License <http://opensource.org/licenses/MIT>
**  Distributed on <http://github.com/yneves/uimmutable>
*/
// - -------------------------------------------------------------------- - //

'use strict';

rey.factory('uim.ValueFormat', ['moment', 'uim.DateFormat', function (moment, DateFormat) {
  return {

    date: function date(value) {
      var date = moment(value, DateFormat.date.output);
      if (date.isValid()) {
        return date.format(DateFormat.date.input);
      }
    },

    time: function time(value) {
      var time = moment(value, DateFormat.time.output);
      if (time.isValid()) {
        return time.format(DateFormat.time.input);
      }
    },

    datetime: function datetime(value) {
      var datetime = moment(value, DateFormat.datetime.output);
      if (datetime.isValid()) {
        return datetime.format(DateFormat.datetime.input);
      }
    }

  };
}]);

/*!
**  uimmutable -- UI components for Rey framework.
**  Copyright (c) 2016 Yuri Neves Silveira <http://yneves.com>
**  Licensed under The MIT License <http://opensource.org/licenses/MIT>
**  Distributed on <http://github.com/yneves/uimmutable>
*/
// - -------------------------------------------------------------------- - //

'use strict';

rey.component('uim.Breadcrumb', ['React', 'Immutable', 'classNames', 'uim.LinkGroup', function (React, Immutable, classNames, LinkGroup) {
  return {

    statics: {
      pickProps: LinkGroup.pickProps
    },

    propTypes: {
      className: React.PropTypes.string
    },

    render: function render() {
      var classes = _defineProperty({
        breadcrumb: true
      }, this.props.className, this.props.className);
      return React.createElement(LinkGroup, _extends({}, this.props, { className: classNames(classes) }));
    }
  };
}]);

// - -------------------------------------------------------------------- - //

/*!
**  uimmutable -- UI components for Rey framework.
**  Copyright (c) 2016 Yuri Neves Silveira <http://yneves.com>
**  Licensed under The MIT License <http://opensource.org/licenses/MIT>
**  Distributed on <http://github.com/yneves/uimmutable>
*/
// - -------------------------------------------------------------------- - //

'use strict';

rey.component('uim.Failure', ['React', 'Immutable', 'classNames', 'uim.Icon', function (React, Immutable, classNames, Icon) {
  return {

    propTypes: {
      label: React.PropTypes.string.isRequired,
      message: React.PropTypes.string,
      buttonLabel: React.PropTypes.string.isRequired,
      onClose: React.PropTypes.func.isRequired
    },

    getDefaultProps: function getDefaultProps() {
      return {
        buttonLabel: 'OK'
      };
    },
    render: function render() {
      return React.createElement(
        'div',
        { className: 'dialog failure' },
        React.createElement(
          'header',
          null,
          React.createElement(Icon, { name: 'exclamation-circle' }),
          React.createElement(
            'h2',
            null,
            this.props.label
          )
        ),
        this.props.message ? React.createElement(
          'p',
          null,
          this.props.message
        ) : undefined,
        React.createElement(
          'footer',
          null,
          React.createElement(
            'button',
            { type: 'button', onClick: this.props.onClose },
            this.props.buttonLabel
          )
        )
      );
    }
  };
}]);

// - -------------------------------------------------------------------- - //

/*!
**  uimmutable -- UI components for Rey framework.
**  Copyright (c) 2016 Yuri Neves Silveira <http://yneves.com>
**  Licensed under The MIT License <http://opensource.org/licenses/MIT>
**  Distributed on <http://github.com/yneves/uimmutable>
*/
// - -------------------------------------------------------------------- - //

'use strict';

rey.component('uim.Button', ['React', 'Immutable', 'classNames', function (React, Immutable, classNames) {
  return {

    statics: {
      pickProps: function pickProps(path, field, values) {
        path = field.has('path') ? field.get('path') : path.push(field.get('name'));
        return {
          path: path,
          name: field.get('name'),
          label: field.get('label'),
          htmlType: field.get('htmlType'),
          disabled: field.get('disabled'),
          style: field.get('style'),
          className: field.get('className')
        };
      }
    },

    propTypes: {
      path: React.PropTypes.List.isRequired,
      name: React.PropTypes.string.isRequired,
      label: React.PropTypes.string.isRequired,
      disabled: React.PropTypes.bool.isRequired,
      htmlType: React.PropTypes.string.isRequired,
      onClick: React.PropTypes.func,
      className: React.PropTypes.string,
      style: React.PropTypes.oneOfType([React.PropTypes.Map, React.PropTypes.object])
    },

    getDefaultProps: function getDefaultProps() {
      return {
        path: Immutable.List(),
        htmlType: 'button',
        disabled: false
      };
    },
    handleClick: function handleClick(event) {
      if (this.props.onClick) {
        this.props.onClick({
          name: this.props.name,
          path: this.props.path,
          event: event
        });
      }
    },


    render: function render() {
      var style = Immutable.Map.isMap(this.props.style) ? this.props.style.toJS() : this.props.style;
      var classes = _defineProperty({
        button: true
      }, this.props.className, !!this.props.className);
      return React.createElement(
        'button',
        {
          style: style,
          'data-button-name': this.props.name,
          type: this.props.htmlType,
          disabled: this.props.disabled,
          className: classNames(classes),
          onClick: this.handleClick },
        this.props.label
      );
    }
  };
}]);

// - -------------------------------------------------------------------- - //

/*!
**  uimmutable -- UI components for Rey framework.
**  Copyright (c) 2016 Yuri Neves Silveira <http://yneves.com>
**  Licensed under The MIT License <http://opensource.org/licenses/MIT>
**  Distributed on <http://github.com/yneves/uimmutable>
*/
// - -------------------------------------------------------------------- - //

'use strict';

rey.component('uim.ButtonGroup', ['React', 'Immutable', 'classNames', 'uim.Button', function (React, Immutable, classNames, Button) {
  return {

    statics: {
      pickProps: function pickProps(path, field, values) {
        path = field.has('path') ? field.get('path') : path.push(field.get('name'));
        return {
          path: path,
          name: field.get('name'),
          label: field.get('label'),
          buttons: field.get('buttons'),
          className: field.get('className'),
          style: field.get('style'),
          value: values.getIn(path)
        };
      }
    },

    propTypes: {
      path: React.PropTypes.List.isRequired,
      buttons: React.PropTypes.List.isRequired,
      onClick: React.PropTypes.func.isRequired,
      className: React.PropTypes.string,
      style: React.PropTypes.oneOfType([React.PropTypes.Map, React.PropTypes.object])
    },

    handleClick: function handleClick(button, event) {
      if (this.props.onClick) {
        event.button = button;
        this.props.onClick(event);
      }
    },
    renderButton: function renderButton(button, index) {
      var props = Button.pickProps(this.props.path, button);
      return React.createElement(Button, _extends({ key: index }, props, { onClick: this.handleClick.bind(this, button) }));
    },
    render: function render() {
      var _classes3;

      var style = Immutable.Map.isMap(this.props.style) ? this.props.style.toJS() : this.props.style;
      var classes = (_classes3 = {}, _defineProperty(_classes3, 'button-group', true), _defineProperty(_classes3, this.props.className, !!this.props.className), _classes3);
      return React.createElement(
        'div',
        { 'data-field-name': this.props.name, style: style, className: classNames(classes) },
        this.props.buttons.map(this.renderButton)
      );
    }
  };
}]);

// - -------------------------------------------------------------------- - //

/*!
**  uimmutable -- UI components for Rey framework.
**  Copyright (c) 2016 Yuri Neves Silveira <http://yneves.com>
**  Licensed under The MIT License <http://opensource.org/licenses/MIT>
**  Distributed on <http://github.com/yneves/uimmutable>
*/
// - -------------------------------------------------------------------- - //

'use strict';

rey.component('uim.Checkbox', ['React', 'Immutable', 'classNames', function (React, Immutable, classNames) {
  return {

    statics: {
      pickProps: function pickProps(path, field, values) {
        path = field.has('path') ? field.get('path') : path.push(field.get('name'));
        return {
          path: path,
          name: field.get('name'),
          label: field.get('label'),
          className: field.get('className'),
          style: field.get('style'),
          disabled: field.get('disabled'),
          value: field.get('value'),
          checked: !!values.getIn(path)
        };
      }
    },

    propTypes: {
      path: React.PropTypes.List.isRequired,
      name: React.PropTypes.string.isRequired,
      label: React.PropTypes.string.isRequired,
      checked: React.PropTypes.bool.isRequired,
      onClick: React.PropTypes.func.isRequired,
      onChange: React.PropTypes.func.isRequired,
      value: React.PropTypes.any,
      disabled: React.PropTypes.bool,
      className: React.PropTypes.string,
      style: React.PropTypes.oneOfType([React.PropTypes.Map, React.PropTypes.object])
    },

    handleClick: function handleClick(event) {
      if (this.props.onClick) {
        this.props.onClick({
          name: this.props.name,
          path: this.props.path,
          value: this.refs.input.checked,
          event: event
        });
      }
    },
    handleChange: function handleChange(event) {
      if (this.props.onChange) {
        this.props.onChange({
          name: this.props.name,
          path: this.props.path,
          value: this.refs.input.checked,
          event: event
        });
      }
    },
    render: function render() {
      var style = Immutable.Map.isMap(this.props.style) ? this.props.style.toJS() : this.props.style;
      var classes = _defineProperty({
        checkbox: true,
        disabled: this.props.disabled
      }, this.props.className, !!this.props.className);
      return React.createElement(
        'label',
        { className: classNames(classes), style: style },
        React.createElement('input', { ref: 'input',
          type: 'checkbox',
          name: this.props.name,
          checked: this.props.checked,
          disabled: this.props.disabled,
          value: this.props.value,
          onClick: this.handleClick,
          onChange: this.handleChange }),
        React.createElement(
          'span',
          null,
          this.props.label
        )
      );
    }
  };
}]);

// - -------------------------------------------------------------------- - //

/*!
**  uimmutable -- UI components for Rey framework.
**  Copyright (c) 2016 Yuri Neves Silveira <http://yneves.com>
**  Licensed under The MIT License <http://opensource.org/licenses/MIT>
**  Distributed on <http://github.com/yneves/uimmutable>
*/
// - -------------------------------------------------------------------- - //

'use strict';

rey.component('uim.CheckGroup', ['React', 'Immutable', 'classNames', 'uim.Button', 'uim.Field', function (React, Immutable, classNames, Button, Field) {
  return {

    statics: {
      pickProps: function pickProps(path, field, values) {
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
      style: React.PropTypes.oneOfType([React.PropTypes.Map, React.PropTypes.object])
    },

    renderCheckbox: function renderCheckbox(option, index) {
      var name = option.get('name') || index;
      var label = option.get('label') || name;
      var path = this.props.path.push(name);
      return React.createElement(Checkbox, { ref: name,
        key: index,
        path: path,
        name: name,
        label: label,
        checked: !!this.props.values.getIn(path),
        disabled: option.get('disabled'),
        onChange: this.props.onChange });
    },
    render: function render() {
      var _classes5;

      var classes = (_classes5 = {}, _defineProperty(_classes5, 'check-group', true), _defineProperty(_classes5, this.props.className, !!this.props.className), _classes5);
      return React.createElement(
        Field,
        { ref: 'field',
          name: this.props.name,
          label: this.props.label,
          style: this.props.style,
          className: classNames(classes) },
        this.props.checkboxes.map(this.renderCheckbox)
      );
    }
  };
}]);

// - -------------------------------------------------------------------- - //

/*!
**  uimmutable -- UI components for Rey framework.
**  Copyright (c) 2016 Yuri Neves Silveira <http://yneves.com>
**  Licensed under The MIT License <http://opensource.org/licenses/MIT>
**  Distributed on <http://github.com/yneves/uimmutable>
*/
// - -------------------------------------------------------------------- - //

'use strict';

rey.component('uim.DateField', ['React', 'Immutable', 'classNames', 'uim.Value', 'uim.Field', 'uim.DatePicker', 'uim.DateFormat', function (React, Immutable, classNames, Value, Field, DatePicker, DateFormat) {
  return {

    statics: {
      pickProps: function pickProps(path, field, values) {
        path = field.has('path') ? field.get('path') : path.push(field.get('name'));
        return {
          path: path,
          name: field.get('name'),
          label: field.get('label'),
          className: field.get('className'),
          value: values.getIn(path),
          style: field.get('style'),
          inputFormat: field.get('inputFormat'),
          outputFormat: field.get('outputFormat'),
          placeholder: field.get('placeholder')
        };
      }
    },

    propTypes: {
      path: React.PropTypes.List.isRequired,
      label: React.PropTypes.string.isRequired,
      input: React.PropTypes.bool.isRequired,
      value: React.PropTypes.any,
      onChange: React.PropTypes.func,
      className: React.PropTypes.string,
      inputFormat: React.PropTypes.string.isRequired,
      outputFormat: React.PropTypes.string.isRequired,
      placeholder: React.PropTypes.string,
      style: React.PropTypes.oneOfType([React.PropTypes.Map, React.PropTypes.object])
    },

    getDefaultProps: function getDefaultProps() {
      return {
        inputFormat: DateFormat.date.input,
        outputFormat: DateFormat.date.output
      };
    },
    parseInput: function parseInput(date) {
      if (typeof date === 'string') {
        date = date.substr(0, this.props.outputFormat.length);
      }
      return date ? moment(date, this.props.outputFormat) : undefined;
    },
    parseOutput: function parseOutput(date) {
      return date.isValid() ? date.format(this.props.outputFormat) : undefined;
    },
    handleChange: function handleChange(value) {
      if (this.props.onChange) {
        this.props.onChange({
          name: this.props.name,
          path: this.props.path,
          value: this.parseOutput(value)
        });
      }
    },
    renderContent: function renderContent() {
      var content = void 0;
      if (this.props.input) {
        content = React.createElement(DatePicker, {
          dateFormat: this.props.inputFormat,
          selected: this.parseInput(this.props.value),
          onChange: this.handleChange,
          placeholderText: this.props.placeholder });
      } else {
        content = React.createElement(Value, {
          className: 'date-value',
          path: this.props.path,
          name: this.props.name,
          value: this.props.value,
          format: 'date' });
      }
      return content;
    },
    render: function render() {
      var _classes6;

      var classes = (_classes6 = {}, _defineProperty(_classes6, 'date-field', true), _defineProperty(_classes6, this.props.className, !!this.props.className), _classes6);
      return React.createElement(
        Field,
        { ref: 'field',
          name: this.props.name,
          label: this.props.label,
          style: this.props.style,
          className: classNames(classes) },
        this.renderContent()
      );
    }
  };
}]);

/*!
**  uimmutable -- UI components for Rey framework.
**  Copyright (c) 2016 Yuri Neves Silveira <http://yneves.com>
**  Licensed under The MIT License <http://opensource.org/licenses/MIT>
**  Distributed on <http://github.com/yneves/uimmutable>
*/
// - -------------------------------------------------------------------- - //

'use strict';

rey.component('uim.DateRangeField', ['React', 'Immutable', 'classNames', 'uim.Value', 'uim.Field', 'uim.DatePicker', 'uim.DateFormat', function (React, Immutable, classNames, Value, Field, DatePicker, DateFormat) {
  return {

    statics: {
      pickProps: function pickProps(path, field, values) {
        path = field.has('path') ? field.get('path') : path.push(field.get('name'));
        return {
          path: path,
          name: field.get('name'),
          label: field.get('label'),
          className: field.get('className'),
          value: values.getIn(path),
          style: field.get('style'),
          inputFormat: field.get('inputFormat'),
          outputFormat: field.get('outputFormat'),
          placeholder: field.get('placeholder')
        };
      }
    },

    propTypes: {
      path: React.PropTypes.List.isRequired,
      label: React.PropTypes.string.isRequired,
      input: React.PropTypes.bool.isRequired,
      value: React.PropTypes.List,
      onChange: React.PropTypes.func,
      placeholder: React.PropTypes.oneOfType([React.PropTypes.string, React.PropTypes.List]),
      className: React.PropTypes.string,
      inputFormat: React.PropTypes.string.isRequired,
      outputFormat: React.PropTypes.string.isRequired,
      style: React.PropTypes.oneOfType([React.PropTypes.Map, React.PropTypes.object])
    },

    getDefaultProps: function getDefaultProps() {
      return {
        inputFormat: DateFormat.date.input,
        outputFormat: DateFormat.date.output
      };
    },
    parseInput: function parseInput(value, index) {
      var date = void 0;
      if (Immutable.List.isList(value)) {
        date = value.get(index);
      } else if (index === 0 && rey.isString(value)) {
        date = value;
      }
      if (typeof date === 'string') {
        date = date.substr(0, this.props.outputFormat.length);
      }
      return date ? moment(date, this.props.outputFormat) : undefined;
    },
    parseOutput: function parseOutput(date) {
      return date && date.isValid() ? date.format(this.props.outputFormat) : undefined;
    },
    handleChange: function handleChange(value, index) {
      var newValue = void 0;
      if (Immutable.List.isList(this.props.value)) {
        newValue = this.props.value.set(index, this.parseOutput(value));
      } else {
        newValue = Immutable.List().set(index, this.parseOutput(value));
      }
      if (this.props.onChange) {
        this.props.onChange({
          name: this.props.name,
          path: this.props.path,
          value: newValue
        });
      }
    },
    getPlaceholder: function getPlaceholder(index) {
      var placeholder = void 0;
      if (rey.isString(this.props.placeholder)) {
        placeholder = this.props.placeholder;
      } else if (Immutable.List.isList(this.props.placeholder)) {
        placeholder = this.props.placeholder.get(index);
      }
      return placeholder;
    },
    renderContent: function renderContent() {
      var _this = this;

      var content = void 0;
      if (this.props.input) {
        var startDate = this.parseInput(this.props.value, 0);
        var endDate = this.parseInput(this.props.value, 1);
        content = [React.createElement(DatePicker, {
          key: 'startDate',
          ref: 'startDate',
          startDate: startDate,
          endDate: endDate,
          selected: startDate,
          dateFormat: this.props.inputFormat,
          isClearable: true,
          onBlur: function onBlur() {
            return _this.refs.startDate.setOpen(false);
          },
          onChange: function onChange(date) {
            return _this.handleChange(date, 0);
          },
          placeholderText: this.getPlaceholder(0) }), React.createElement(DatePicker, {
          key: 'endDate',
          ref: 'endDate',
          startDate: startDate,
          endDate: endDate,
          selected: endDate,
          isClearable: true,
          onBlur: function onBlur() {
            return _this.refs.endDate.setOpen(false);
          },
          dateFormat: this.props.inputFormat,
          onChange: function onChange(date) {
            return _this.handleChange(date, 1);
          },
          placeholderText: this.getPlaceholder(1) })];
      } else {
        content = React.createElement(Value, {
          className: 'date-range-value',
          path: this.props.path,
          name: this.props.name,
          value: this.props.value,
          format: 'date' });
      }
      return content;
    },
    render: function render() {
      var _classes7;

      var classes = (_classes7 = {}, _defineProperty(_classes7, 'date-range-field', true), _defineProperty(_classes7, this.props.className, !!this.props.className), _classes7);
      return React.createElement(
        Field,
        { ref: 'field',
          style: this.props.style,
          name: this.props.name,
          label: this.props.label,
          className: classNames(classes) },
        this.renderContent()
      );
    }
  };
}]);

/*!
**  uimmutable -- UI components for Rey framework.
**  Copyright (c) 2016 Yuri Neves Silveira <http://yneves.com>
**  Licensed under The MIT License <http://opensource.org/licenses/MIT>
**  Distributed on <http://github.com/yneves/uimmutable>
*/
// - -------------------------------------------------------------------- - //

'use strict';

rey.component('uim.Field', ['React', 'Immutable', 'classNames', function (React, Immutable, classNames) {
  return {

    propTypes: {
      name: React.PropTypes.string.isRequired,
      label: React.PropTypes.string,
      className: React.PropTypes.string,
      style: React.PropTypes.oneOfType([React.PropTypes.Map, React.PropTypes.object])
    },

    render: function render() {
      var style = Immutable.Map.isMap(this.props.style) ? this.props.style.toJS() : this.props.style;
      var classes = _defineProperty({
        field: true
      }, this.props.className, !!this.props.className);
      return React.createElement(
        'div',
        { 'data-field-name': this.props.name, style: style, className: classNames(classes) },
        React.createElement(
          'label',
          null,
          this.props.label
        ),
        this.props.children
      );
    }
  };
}]);

// - -------------------------------------------------------------------- - //

/*!
**  uimmutable -- UI components for Rey framework.
**  Copyright (c) 2016 Yuri Neves Silveira <http://yneves.com>
**  Licensed under The MIT License <http://opensource.org/licenses/MIT>
**  Distributed on <http://github.com/yneves/uimmutable>
*/
// - -------------------------------------------------------------------- - //

'use strict';

rey.component('uim.FieldGroup', ['React', 'Immutable', 'classNames', 'uim.IconButton', function (React, Immutable, classNames, IconButton) {
  return {

    statics: {
      pickProps: function pickProps(path, field, values) {
        path = field.has('path') ? field.get('path') : path.push(field.get('name'));
        return {
          path: path,
          name: field.get('name'),
          label: field.get('label'),
          fields: field.get('fields'),
          className: field.get('className'),
          style: field.get('style'),
          multiple: field.get('multiple'),
          values: values
        };
      }
    },

    propTypes: {
      path: React.PropTypes.List.isRequired,
      input: React.PropTypes.bool.isRequired,
      fields: React.PropTypes.List.isRequired,
      values: React.PropTypes.Map.isRequired,
      collapsed: React.PropTypes.bool.isRequired,
      multiple: React.PropTypes.bool.isRequired,
      className: React.PropTypes.string,
      style: React.PropTypes.oneOfType([React.PropTypes.Map, React.PropTypes.object]),
      onClick: React.PropTypes.func,
      onChange: React.PropTypes.func
    },

    getDefaultProps: function getDefaultProps() {
      return {
        path: Immutable.List(),
        input: true,
        collapsed: false,
        multiple: false
      };
    },
    onClickAddEntry: function onClickAddEntry(event) {
      if (this.props.onChange) {
        var entries = this.props.values.getIn(this.props.path);
        this.props.onChange({
          name: this.props.name,
          path: this.props.path.push(entries ? entries.size : 0),
          value: Immutable.Map(),
          event: event
        });
      }
    },
    onClickRemoveEntry: function onClickRemoveEntry(entryIndex, event) {
      if (this.props.onChange) {
        var entries = this.props.values.getIn(this.props.path);
        this.props.onChange({
          name: this.props.name,
          path: this.props.path.push(entryIndex),
          value: null,
          event: event
        });
      }
    },
    renderField: function renderField(path, field, index) {

      var Component = rey.deps.get('uim.' + field.get('type'));

      if (!Component) {
        console.error(new Error('unknown component type (' + field.get('type') + ')'));
      }

      if (!Component.pickProps) {
        console.error(new Error('invalid component type (' + field.get('type') + ')'));
      }

      var props = Component.pickProps(path, field, this.props.values);

      return React.createElement(Component, _extends({
        key: index
      }, props, {
        input: this.props.input,
        onClick: this.props.onClick,
        onChange: this.props.onChange }));
    },
    renderEntry: function renderEntry(entryIndex) {
      var _this2 = this;

      return React.createElement(
        'div',
        { key: entryIndex, className: 'field-group-entry' },
        this.props.input && React.createElement(
          'div',
          { className: 'field-group-entry-action' },
          React.createElement(IconButton, {
            name: 'removeFieldGroupEntry',
            icon: 'trash-o',
            onClick: this.onClickRemoveEntry.bind(this, entryIndex) })
        ),
        React.createElement(
          'div',
          { className: 'field-group-entry-fields' },
          this.props.fields.map(function (field, index) {
            return _this2.renderField(_this2.props.path.push(entryIndex), field, index);
          })
        )
      );
    },
    wrapEntries: function wrapEntries(children) {
      return React.createElement(
        'div',
        { className: 'field-group-entries' },
        children,
        React.createElement(
          'div',
          { className: 'field-group-entries-action' },
          React.createElement(IconButton, {
            name: 'addFieldGroupEntry',
            icon: 'plus',
            onClick: this.onClickAddEntry })
        )
      );
    },
    renderFields: function renderFields() {
      var _this3 = this;

      var content = void 0;
      if (this.props.multiple) {
        (function () {
          var children = [];
          var entries = _this3.props.values.getIn(_this3.props.path);
          if (Immutable.Map.isMap(entries)) {
            entries.forEach(function (entry, entryIndex) {
              if (Immutable.Map.isMap(entry)) {
                children.push(_this3.renderEntry(entryIndex));
              }
            }, _this3);
          }
          if (!children.length) {
            children = _this3.renderEntry(0);
          }
          content = _this3.wrapEntries(children);
        })();
      } else {
        content = this.props.fields.map(function (field, index) {
          return _this3.renderField(_this3.props.path, field, index);
        });
      }
      return content;
    },
    render: function render() {
      var _classes9;

      var style = this.props.style ? Immutable.Map.isMap(this.props.style) ? this.props.style.toJS() : this.props.style : {};
      var classes = (_classes9 = {}, _defineProperty(_classes9, 'field-group', true), _defineProperty(_classes9, 'field-group-multiple', !!this.props.multiple), _defineProperty(_classes9, this.props.className, !!this.props.className), _classes9);
      if (this.props.collapsed) {
        style.display = 'none';
      }
      return React.createElement(
        'div',
        { className: classNames(classes), style: style },
        this.renderFields()
      );
    }
  };
}]);

// - -------------------------------------------------------------------- - //

/*!
**  uimmutable -- UI components for Rey framework.
**  Copyright (c) 2016 Yuri Neves Silveira <http://yneves.com>
**  Licensed under The MIT License <http://opensource.org/licenses/MIT>
**  Distributed on <http://github.com/yneves/uimmutable>
*/
// - -------------------------------------------------------------------- - //

'use strict';

rey.component('uim.Fieldset', ['React', 'Immutable', 'classNames', 'uim.FieldGroup', function (React, Immutable, classNames, FieldGroup) {
  return {

    statics: {
      pickProps: function pickProps(path, field, values) {
        path = field.has('path') ? field.get('path') : path.push(field.get('name'));
        return {
          path: path,
          name: field.get('name'),
          label: field.get('label'),
          fields: field.get('fields'),
          className: field.get('className'),
          style: field.get('style'),
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
      style: React.PropTypes.oneOfType([React.PropTypes.Map, React.PropTypes.object]),
      onChange: React.PropTypes.func,
      className: React.PropTypes.string
    },

    getDefaultProps: function getDefaultProps() {
      return {
        path: Immutable.List(),
        input: true,
        collapsible: false,
        collapsed: false,
        multiple: false
      };
    },
    getInitialState: function getInitialState() {
      return {
        collapsed: this.props.collapsed
      };
    },
    handleClickLegend: function handleClickLegend() {
      if (this.props.collapsible) {
        this.setState({
          collapsed: !this.state.collapsed
        });
      }
    },
    render: function render() {
      var classes = _defineProperty({
        fieldset: true
      }, this.props.className, !!this.props.className);
      var style = Immutable.Map.isMap(this.props.style) ? this.props.style.toJS() : this.props.style;
      return React.createElement(
        'div',
        { 'data-fieldset-name': this.props.name, style: style, className: classNames(classes) },
        React.createElement(
          'fieldset',
          null,
          React.createElement(
            'legend',
            { onClick: this.handleClickLegend },
            this.props.label
          ),
          React.createElement(FieldGroup, {
            path: this.props.path,
            fields: this.props.fields,
            values: this.props.values,
            input: this.props.input,
            collapsed: this.state.collapsed,
            multiple: this.props.multiple,
            onClick: this.props.onClick,
            onChange: this.props.onChange })
        )
      );
    }
  };
}]);

// - -------------------------------------------------------------------- - //

/*!
**  uimmutable -- UI components for Rey framework.
**  Copyright (c) 2016 Yuri Neves Silveira <http://yneves.com>
**  Licensed under The MIT License <http://opensource.org/licenses/MIT>
**  Distributed on <http://github.com/yneves/uimmutable>
*/
// - -------------------------------------------------------------------- - //

'use strict';

rey.component('uim.FileField', ['React', 'Immutable', 'classNames', 'uim.Value', 'uim.Field', 'uim.Icon', function (React, Immutable, classNames, Value, Field, Icon) {
  return {

    statics: {
      pickProps: function pickProps(path, field, values) {
        path = field.has('path') ? field.get('path') : path.push(field.get('name'));
        return {
          path: path,
          name: field.get('name'),
          label: field.get('label'),
          className: field.get('className'),
          style: field.get('style'),
          multiple: field.get('multiple'),
          placeholder: field.get('placeholder'),
          value: values.getIn(path)
        };
      }
    },

    propTypes: {
      path: React.PropTypes.List.isRequired,
      name: React.PropTypes.string.isRequired,
      label: React.PropTypes.string,
      input: React.PropTypes.bool.isRequired,
      placeholder: React.PropTypes.string.isRequired,
      multiple: React.PropTypes.bool.isRequired,
      value: React.PropTypes.any,
      onChange: React.PropTypes.func,
      style: React.PropTypes.oneOfType([React.PropTypes.Map, React.PropTypes.object]),
      className: React.PropTypes.string
    },

    getInitialState: function getInitialState() {
      return {
        files: []
      };
    },
    getDefaultProps: function getDefaultProps() {
      return {
        multiple: false,
        placeholder: 'Browse file...'
      };
    },
    getFiles: function getFiles() {
      var files;
      if (this.props.input) {
        files = this.state.files;
      } else if (Immutable.List.isList(this.props.value)) {
        files = this.props.value.toJS();
      } else if (Immutable.Map.isMap(this.props.value)) {
        files = [this.props.value.toJS()];
      } else {
        files = [];
      }
      return files;
    },
    onBrowseFile: function onBrowseFile(event) {
      var files = Array.prototype.slice.call(this.refs.input.files);
      if (this.props.multiple) {
        files = this.state.files.concat(files);
      }
      this.setState({
        files: files
      }, this.handleChange.bind(this, event));
      this.refs.input.value = '';
    },
    handleChange: function handleChange(event) {
      if (this.props.onChange) {
        this.props.onChange({
          name: this.props.name,
          path: this.props.path,
          value: this.props.multiple ? this.state.files : this.state.files[0],
          event: event
        });
      }
    },
    renderInput: function renderInput() {
      if (this.props.input) {
        return React.createElement(
          'div',
          { className: 'file-field-input' },
          React.createElement(Icon, { name: 'cloud-upload' }),
          this.props.placeholder,
          React.createElement('input', {
            ref: 'input',
            type: 'file',
            multiple: this.props.multiple,
            onChange: this.onBrowseFile })
        );
      }
    },
    onClickFile: function onClickFile(file, event) {
      if (this.props.onClick) {
        this.props.onClick({
          name: this.props.name,
          path: this.props.path,
          value: file,
          event: event
        });
      }
    },
    onRemoveFile: function onRemoveFile(removedFile, event) {
      event.stopPropagation();
      this.setState({
        files: this.state.files.filter(function (file) {
          return file !== removedFile;
        })
      }, this.handleChange.bind(this, event));
    },
    renderFile: function renderFile(file, index) {
      return React.createElement(
        'div',
        { key: index, className: 'file-field-file', onClick: this.onClickFile.bind(this, file) },
        React.createElement(Icon, { name: 'file-o' }),
        file.name,
        this.props.input && React.createElement(Icon, { name: 'trash-o', onClick: this.onRemoveFile.bind(this, file) })
      );
    },
    renderContent: function renderContent() {
      return React.createElement(
        'div',
        { className: 'file-field-content' },
        this.renderInput(),
        this.getFiles().map(this.renderFile, this)
      );
    },
    render: function render() {
      var _classes11;

      var classes = (_classes11 = {}, _defineProperty(_classes11, 'file-field', true), _defineProperty(_classes11, this.props.className, !!this.props.className), _classes11);
      return React.createElement(
        Field,
        { ref: 'field',
          name: this.props.name,
          label: this.props.label,
          style: this.props.style,
          className: classNames(classes) },
        this.renderContent()
      );
    }
  };
}]);

// - -------------------------------------------------------------------- - //

/*!
**  uimmutable -- UI components for Rey framework.
**  Copyright (c) 2016 Yuri Neves Silveira <http://yneves.com>
**  Licensed under The MIT License <http://opensource.org/licenses/MIT>
**  Distributed on <http://github.com/yneves/uimmutable>
*/
// - -------------------------------------------------------------------- - //

'use strict';

rey.component('uim.Formset', ['React', 'Immutable', 'classNames', 'uim.FieldGroup', function (React, Immutable, classNames, FieldGroup) {
  return {

    propTypes: {
      path: React.PropTypes.List.isRequired,
      name: React.PropTypes.string.isRequired,
      label: React.PropTypes.node,
      fields: React.PropTypes.List.isRequired,
      values: React.PropTypes.Map.isRequired,
      input: React.PropTypes.bool.isRequired,
      collapsible: React.PropTypes.bool.isRequired,
      onClick: React.PropTypes.func,
      onChange: React.PropTypes.func,
      className: React.PropTypes.string,
      style: React.PropTypes.oneOfType([React.PropTypes.Map, React.PropTypes.object])
    },

    getDefaultProps: function getDefaultProps() {
      return {
        path: Immutable.List(),
        input: true,
        collapsible: false
      };
    },
    getInitialState: function getInitialState() {
      return {
        collapsed: false
      };
    },
    handleClickTitle: function handleClickTitle() {
      if (this.props.collapsible) {
        this.setState({
          collapsed: !this.state.collapsed
        });
      }
    },
    renderTitle: function renderTitle() {
      if (this.props.label) {
        return React.createElement(
          'h1',
          { className: 'title', onClick: this.handleClickTitle },
          React.createElement(
            'span',
            null,
            this.props.label
          )
        );
      }
    },
    render: function render() {
      var style = Immutable.Map.isMap(this.props.style) ? this.props.style.toJS() : this.props.style;
      var classes = _defineProperty({
        formset: true
      }, this.props.className, !!this.props.className);
      return React.createElement(
        'div',
        { 'data-form-name': this.props.name, style: style, className: classNames(classes) },
        this.renderTitle(),
        React.createElement(FieldGroup, {
          path: this.props.path,
          input: this.props.input,
          fields: this.props.fields,
          values: this.props.values,
          collapsed: this.state.collapsed,
          onClick: this.props.onClick,
          onChange: this.props.onChange })
      );
    }
  };
}]);

// - -------------------------------------------------------------------- - //

/*!
**  uimmutable -- UI components for Rey framework.
**  Copyright (c) 2016 Yuri Neves Silveira <http://yneves.com>
**  Licensed under The MIT License <http://opensource.org/licenses/MIT>
**  Distributed on <http://github.com/yneves/uimmutable>
*/
// - -------------------------------------------------------------------- - //

'use strict';

rey.component('uim.MemoField', ['React', 'Immutable', 'classNames', 'uim.Value', 'uim.Field', function (React, Immutable, classNames, Value, Field) {
  return {

    statics: {
      pickProps: function pickProps(path, field, values) {
        path = field.has('path') ? field.get('path') : path.push(field.get('name'));
        return {
          path: path,
          name: field.get('name'),
          label: field.get('label'),
          rows: field.get('rows'),
          cols: field.get('cols'),
          className: field.get('className'),
          style: field.get('style'),
          value: values.getIn(path)
        };
      }
    },

    propTypes: {
      path: React.PropTypes.List.isRequired,
      name: React.PropTypes.string.isRequired,
      label: React.PropTypes.string.isRequired,
      input: React.PropTypes.bool.isRequired,
      rows: React.PropTypes.number,
      cols: React.PropTypes.number,
      value: React.PropTypes.any,
      onChange: React.PropTypes.func,
      className: React.PropTypes.string,
      style: React.PropTypes.oneOfType([React.PropTypes.Map, React.PropTypes.object])
    },

    handleChange: function handleChange(event) {
      if (this.props.onChange) {
        this.props.onChange({
          name: this.props.name,
          path: this.props.path,
          value: this.refs.input.value,
          event: event
        });
      }
    },
    renderContent: function renderContent() {
      var content = void 0;
      if (this.props.input) {
        content = React.createElement('textarea', {
          ref: 'input',
          rows: this.props.rows,
          cols: this.props.cols,
          value: this.props.value || '',
          onChange: this.handleChange });
      } else {
        content = React.createElement(Value, {
          className: 'memo-value',
          path: this.props.path,
          name: this.props.name,
          value: this.props.value });
      }
      return content;
    },
    render: function render() {
      var _classes13;

      var classes = (_classes13 = {}, _defineProperty(_classes13, 'memo-field', true), _defineProperty(_classes13, this.props.className, !!this.props.className), _classes13);
      return React.createElement(
        Field,
        { ref: 'field',
          name: this.props.name,
          label: this.props.label,
          style: this.props.style,
          className: classNames(classes) },
        this.renderContent()
      );
    }
  };
}]);

// - -------------------------------------------------------------------- - //

/*!
**  uimmutable -- UI components for Rey framework.
**  Copyright (c) 2016 Yuri Neves Silveira <http://yneves.com>
**  Licensed under The MIT License <http://opensource.org/licenses/MIT>
**  Distributed on <http://github.com/yneves/uimmutable>
*/
// - -------------------------------------------------------------------- - //

'use strict';

rey.component('uim.PasswordField', ['React', 'Immutable', 'classNames', 'uim.Field', function (React, Immutable, classNames, Field) {
  return {

    statics: {
      pickProps: function pickProps(path, field, values) {
        path = field.has('path') ? field.get('path') : path.push(field.get('name'));
        return {
          path: path,
          name: field.get('name'),
          label: field.get('label'),
          className: field.get('className'),
          style: field.get('style'),
          empty: !values.getIn(path)
        };
      }
    },

    propTypes: {
      path: React.PropTypes.List.isRequired,
      name: React.PropTypes.string.isRequired,
      label: React.PropTypes.string.isRequired,
      empty: React.PropTypes.bool,
      onChange: React.PropTypes.func,
      className: React.PropTypes.string,
      style: React.PropTypes.oneOfType([React.PropTypes.Map, React.PropTypes.object])
    },

    componentDidUpdate: function componentDidUpdate() {
      if (this.props.empty) {
        this.refs.input.value = '';
      }
    },
    handleChange: function handleChange(event) {
      if (this.props.onChange) {
        this.props.onChange({
          name: this.props.name,
          path: this.props.path,
          value: this.refs.input.value,
          event: event
        });
      }
    },
    render: function render() {
      var _classes14;

      var classes = (_classes14 = {}, _defineProperty(_classes14, 'password-field', true), _defineProperty(_classes14, this.props.className, !!this.props.className), _classes14);
      return React.createElement(
        Field,
        { ref: 'field',
          name: this.props.name,
          label: this.props.label,
          style: this.props.style,
          className: classNames(classes) },
        React.createElement('input', {
          ref: 'input',
          type: 'password',
          onChange: this.handleChange })
      );
    }
  };
}]);

// - -------------------------------------------------------------------- - //

/*!
**  uimmutable -- UI components for Rey framework.
**  Copyright (c) 2016 Yuri Neves Silveira <http://yneves.com>
**  Licensed under The MIT License <http://opensource.org/licenses/MIT>
**  Distributed on <http://github.com/yneves/uimmutable>
*/
// - -------------------------------------------------------------------- - //

'use strict';

rey.component('uim.Radio', ['React', 'Immutable', 'classNames', function (React, Immutable, classNames) {
  return {

    propTypes: {
      path: React.PropTypes.List.isRequired,
      name: React.PropTypes.string.isRequired,
      label: React.PropTypes.string.isRequired,
      value: React.PropTypes.any.isRequired,
      checked: React.PropTypes.bool.isRequired,
      onChange: React.PropTypes.func.isRequired,
      disabled: React.PropTypes.bool,
      className: React.PropTypes.string,
      style: React.PropTypes.oneOfType([React.PropTypes.Map, React.PropTypes.object])
    },

    handleChange: function handleChange(event) {
      if (this.props.onChange) {
        this.props.onChange({
          name: this.props.name,
          path: this.props.path,
          value: this.refs.input.value,
          event: event
        });
      }
    },
    render: function render() {
      var style = Immutable.Map.isMap(this.props.style) ? this.props.style.toJS() : this.props.style;
      var classes = _defineProperty({
        radio: true,
        disabled: this.props.disabled
      }, this.props.className, !!this.props.className);
      return React.createElement(
        'label',
        { style: style, className: classNames(classes) },
        React.createElement('input', { ref: 'input',
          type: 'radio',
          name: this.props.name,
          value: this.props.value,
          checked: this.props.checked,
          disabled: this.props.disabled,
          onChange: this.handleChange }),
        React.createElement(
          'span',
          null,
          this.props.label
        )
      );
    }
  };
}]);

// - -------------------------------------------------------------------- - //

/*!
**  uimmutable -- UI components for Rey framework.
**  Copyright (c) 2016 Yuri Neves Silveira <http://yneves.com>
**  Licensed under The MIT License <http://opensource.org/licenses/MIT>
**  Distributed on <http://github.com/yneves/uimmutable>
*/
// - -------------------------------------------------------------------- - //

'use strict';

rey.component('uim.RadioGroup', ['React', 'Immutable', 'classNames', 'uim.Field', 'uim.Value', 'uim.Radio', function (React, Immutable, classNames, Field, Value, Radio) {
  return {

    statics: {
      pickProps: function pickProps(path, field, values) {
        path = field.has('path') ? field.get('path') : path.push(field.get('name'));
        return {
          path: path,
          name: field.get('name'),
          label: field.get('label'),
          options: field.get('options'),
          className: field.get('className'),
          style: field.get('style'),
          value: values.getIn(path)
        };
      }
    },

    propTypes: {
      path: React.PropTypes.List.isRequired,
      name: React.PropTypes.string.isRequired,
      label: React.PropTypes.string,
      input: React.PropTypes.bool.isRequired,
      options: React.PropTypes.List.isRequired,
      value: React.PropTypes.any,
      onChange: React.PropTypes.func.isRequired,
      className: React.PropTypes.string,
      style: React.PropTypes.oneOfType([React.PropTypes.Map, React.PropTypes.object])
    },

    renderRadio: function renderRadio(option, index) {
      return React.createElement(Radio, { ref: index,
        key: index,
        path: this.props.path,
        name: this.props.name,
        label: option.get('label'),
        value: option.get('value'),
        checked: this.props.value === option.get('value'),
        disabled: option.get('disabled'),
        onChange: this.props.onChange });
    },
    getSelectedLabel: function getSelectedLabel() {
      var value = this.props.value;
      var selected = this.props.options.find(function (option) {
        return option.get('value') === value;
      });
      if (selected) {
        return selected.get('label');
      }
    },
    renderContent: function renderContent() {
      var content = void 0;
      if (this.props.input) {
        content = this.props.options.map(this.renderRadio);
      } else {
        content = React.createElement(Value, {
          className: 'radio-value',
          path: this.props.path,
          name: this.props.name,
          value: this.getSelectedLabel() });
      }
      return content;
    },
    render: function render() {
      var _classes16;

      var classes = (_classes16 = {}, _defineProperty(_classes16, 'radio-group', true), _defineProperty(_classes16, this.props.className, !!this.props.className), _classes16);
      return React.createElement(
        Field,
        { ref: 'field',
          name: this.props.name,
          label: this.props.label,
          style: this.props.style,
          className: classNames(classes) },
        this.renderContent()
      );
    }
  };
}]);

// - -------------------------------------------------------------------- - //

/*!
**  uimmutable -- UI components for Rey framework.
**  Copyright (c) 2016 Yuri Neves Silveira <http://yneves.com>
**  Licensed under The MIT License <http://opensource.org/licenses/MIT>
**  Distributed on <http://github.com/yneves/uimmutable>
*/
// - -------------------------------------------------------------------- - //

'use strict';

rey.component('uim.SelectButton', ['React', 'Immutable', 'classNames', 'uim.Icon', 'uim.Value', function (React, Immutable, classNames, Icon, Value) {
  return {

    statics: {
      pickProps: function pickProps(path, field, values) {
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
          style: field.get('style'),
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
      onClick: React.PropTypes.func,
      className: React.PropTypes.string,
      style: React.PropTypes.oneOfType([React.PropTypes.Map, React.PropTypes.object])
    },

    getInitialState: function getInitialState() {
      return {
        showOptions: false
      };
    },
    getDefaultProps: function getDefaultProps() {
      return {
        path: Immutable.List(),
        disabled: false,
        multiple: false
      };
    },
    handleClickCaret: function handleClickCaret(event) {
      event.event.stopPropagation();
      this.setState({ showOptions: !this.state.showOptions });
    },
    getChangedValue: function getChangedValue(option) {
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
    handleClickOption: function handleClickOption(option, event) {
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
    handleClickValue: function handleClickValue(event) {
      if (this.props.onClick) {
        this.props.onClick({
          name: this.props.name,
          path: this.props.path,
          value: this.props.value,
          event: event.event
        });
      }
    },
    renderOptionIcon: function renderOptionIcon(option) {
      var icon;
      if (option.has('icon')) {
        icon = React.createElement(Icon, { key: 'icon', name: option.get('icon') });
      }
      return icon;
    },
    renderSelected: function renderSelected(option) {
      var selected;
      if (this.props.multiple) {
        if (this.props.value.indexOf(option.get('value')) !== -1) {
          selected = React.createElement(Icon, { name: 'check', className: 'icon-selected' });
        } else {
          selected = React.createElement(Icon, { name: 'check', className: 'icon-unselected' });
        }
      }
      return selected;
    },
    renderOption: function renderOption(option, index) {

      var classes = {};
      classes['select-button-option'] = true;
      classes['disabled'] = !!option.get('disabled');
      classes[option.get('className')] = !!option.get('className');

      var onClick = this.handleClickOption.bind(this, option);

      return React.createElement(
        'li',
        { key: index, className: classNames(classes), onClick: onClick },
        this.renderSelected(option),
        this.renderOptionIcon(option),
        option.get('label')
      );
    },
    isDisabled: function isDisabled() {
      return this.props.disabled || (this.props.disabledValues ? this.props.disabledValues.indexOf(this.props.value) !== -1 : false);
    },
    isSelected: function isSelected(option) {
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
    getSelectedOptions: function getSelectedOptions() {
      return this.props.options.filter(function (option) {
        return this.isSelected(option);
      }, this);
    },
    renderSelectedOption: function renderSelectedOption() {

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
        icon = this.renderOptionIcon(selectedOptions.get(0));
      } else if (this.props.blankValue) {
        classes['select-button-blank'] = true;
        value = this.props.blankValue;
      }

      return React.createElement(Value, {
        onClick: this.handleClickValue,
        className: classNames(classes),
        path: this.props.path,
        name: this.props.name,
        value: [icon, value] });
    },
    renderCaretIcon: function renderCaretIcon() {
      return React.createElement(Icon, {
        key: 'icon',
        name: 'caret-down',
        className: 'select-button-icon',
        onClick: this.handleClickCaret });
    },
    renderList: function renderList() {
      return React.createElement(
        'ul',
        { key: 'list' },
        this.props.options.map(this.renderOption)
      );
    },
    renderOptions: function renderOptions() {
      if (!this.isDisabled()) {
        return [this.renderCaretIcon(), this.renderList()];
      }
    },
    render: function render() {
      var _classes17;

      var style = Immutable.Map.isMap(this.props.style) ? this.props.style.toJS() : this.props.style;
      var classes = (_classes17 = {
        button: true,
        disabled: this.isDisabled()
      }, _defineProperty(_classes17, 'select-button', true), _defineProperty(_classes17, 'show-options', this.state.showOptions), _defineProperty(_classes17, this.props.className, !!this.props.className), _classes17);
      return React.createElement(
        'a',
        { 'data-button-name': this.props.name, className: classNames(classes), style: style },
        this.renderSelectedOption(),
        this.renderOptions()
      );
    }
  };
}]);

// - -------------------------------------------------------------------- - //

/*!
**  uimmutable -- UI components for Rey framework.
**  Copyright (c) 2016 Yuri Neves Silveira <http://yneves.com>
**  Licensed under The MIT License <http://opensource.org/licenses/MIT>
**  Distributed on <http://github.com/yneves/uimmutable>
*/
// - -------------------------------------------------------------------- - //

'use strict';

rey.component('uim.SelectButtonField', ['React', 'Immutable', 'classNames', 'uim.SelectButton', 'uim.Field', function (React, Immutable, classNames, SelectButton, Field) {
  return {

    statics: {
      pickProps: SelectButton.pickProps
    },

    propTypes: {
      path: React.PropTypes.List.isRequired,
      name: React.PropTypes.string.isRequired,
      label: React.PropTypes.string.isRequired,
      options: React.PropTypes.List.isRequired,
      disabled: React.PropTypes.bool.isRequired,
      disabledValues: React.PropTypes.List,
      blankValue: React.PropTypes.string,
      value: React.PropTypes.any,
      onChange: React.PropTypes.func,
      onClick: React.PropTypes.func,
      className: React.PropTypes.string,
      style: React.PropTypes.oneOfType([React.PropTypes.Map, React.PropTypes.object])
    },

    getDefaultProps: function getDefaultProps() {
      return {
        path: Immutable.List(),
        disabled: false
      };
    },
    render: function render() {
      var _classes18;

      var classes = (_classes18 = {}, _defineProperty(_classes18, 'select-button-field', true), _defineProperty(_classes18, this.props.className, !!this.props.className), _classes18);
      return React.createElement(
        Field,
        { ref: 'field',
          name: this.props.name,
          label: this.props.label,
          style: this.props.style,
          className: classNames(classes) },
        React.createElement(SelectButton, {
          path: this.props.path,
          name: this.props.name,
          options: this.props.options,
          value: this.props.value,
          disabled: this.props.disabled,
          disabledValues: this.props.disabledValues,
          onClick: this.props.onClick,
          onChange: this.props.onChange,
          className: this.props.className })
      );
    }
  };
}]);

// - -------------------------------------------------------------------- - //

/*!
**  uimmutable -- UI components for Rey framework.
**  Copyright (c) 2016 Yuri Neves Silveira <http://yneves.com>
**  Licensed under The MIT License <http://opensource.org/licenses/MIT>
**  Distributed on <http://github.com/yneves/uimmutable>
*/
// - -------------------------------------------------------------------- - //

'use strict';

rey.component('uim.SelectField', ['React', 'Immutable', 'classNames', 'uim.Value', 'uim.Field', function (React, Immutable, classNames, Value, Field) {
  return {

    statics: {
      pickProps: function pickProps(path, field, values) {
        path = field.has('path') ? field.get('path') : path.push(field.get('name'));
        return {
          path: path,
          name: field.get('name'),
          label: field.get('label'),
          options: field.get('options'),
          className: field.get('className'),
          style: field.get('style'),
          value: values.getIn(path)
        };
      }
    },

    propTypes: {
      path: React.PropTypes.List.isRequired,
      name: React.PropTypes.string.isRequired,
      label: React.PropTypes.string.isRequired,
      input: React.PropTypes.bool.isRequired,
      options: React.PropTypes.List.isRequired,
      value: React.PropTypes.any,
      onChange: React.PropTypes.func,
      className: React.PropTypes.string,
      style: React.PropTypes.oneOfType([React.PropTypes.Map, React.PropTypes.object])
    },

    handleChange: function handleChange(event) {
      if (this.props.onChange) {
        this.props.onChange({
          name: this.props.name,
          path: this.props.path,
          value: this.refs.input.value,
          event: event
        });
      }
    },
    renderOption: function renderOption(option, index) {
      return React.createElement(
        'option',
        { key: index, value: option.get('value') },
        option.get('label')
      );
    },
    getSelectedLabel: function getSelectedLabel() {
      var value = this.props.value;
      var selected = this.props.options.find(function (option) {
        return option.get('value') === value;
      });
      if (selected) {
        return selected.get('label');
      }
    },
    renderContent: function renderContent() {
      var content = void 0;
      if (this.props.input) {
        content = React.createElement(
          'select',
          { ref: 'input', value: this.props.value || '', onChange: this.handleChange },
          this.props.options.map(this.renderOption)
        );
      } else {
        content = React.createElement(Value, {
          className: 'select-value',
          path: this.props.path,
          name: this.props.name,
          value: this.getSelectedLabel() });
      }
      return content;
    },
    render: function render() {
      var _classes19;

      var classes = (_classes19 = {}, _defineProperty(_classes19, 'select-field', true), _defineProperty(_classes19, this.props.className, !!this.props.className), _classes19);
      return React.createElement(
        Field,
        { ref: 'field',
          name: this.props.name,
          label: this.props.label,
          style: this.props.style,
          className: classNames(classes) },
        this.renderContent()
      );
    }
  };
}]);

// - -------------------------------------------------------------------- - //

/*!
**  uimmutable -- UI components for Rey framework.
**  Copyright (c) 2016 Yuri Neves Silveira <http://yneves.com>
**  Licensed under The MIT License <http://opensource.org/licenses/MIT>
**  Distributed on <http://github.com/yneves/uimmutable>
*/
// - -------------------------------------------------------------------- - //

'use strict';

rey.component('uim.TextField', ['React', 'Immutable', 'classNames', 'uim.Value', 'uim.Field', function (React, Immutable, classNames, Value, Field) {
  return {

    statics: {
      pickProps: function pickProps(path, field, values) {
        path = field.has('path') ? field.get('path') : path.push(field.get('name'));
        return {
          path: path,
          name: field.get('name'),
          label: field.get('label'),
          className: field.get('className'),
          options: field.get('options'),
          style: field.get('style'),
          value: values.getIn(path)
        };
      }
    },

    propTypes: {
      path: React.PropTypes.List.isRequired,
      name: React.PropTypes.string.isRequired,
      label: React.PropTypes.string.isRequired,
      input: React.PropTypes.bool.isRequired,
      value: React.PropTypes.any,
      options: React.PropTypes.List,
      onChange: React.PropTypes.func,
      className: React.PropTypes.string,
      style: React.PropTypes.oneOfType([React.PropTypes.Map, React.PropTypes.object])
    },

    handleChange: function handleChange(event) {
      if (this.props.onChange) {
        this.props.onChange({
          name: this.props.name,
          path: this.props.path,
          value: this.refs.input.value,
          event: event
        });
      }
    },
    getId: function getId() {
      return this.props.path.toJS().join('-');
    },
    renderOptions: function renderOptions() {
      if (this.props.input && this.props.options) {
        return React.createElement(
          'datalist',
          { id: this.getId() + '-options' },
          this.props.options.map(function (option, index) {
            return React.createElement(
              'option',
              { key: index, value: option },
              option
            );
          })
        );
      }
    },
    renderContent: function renderContent() {
      var content = void 0;
      if (this.props.input) {
        content = React.createElement('input', {
          ref: 'input',
          type: 'text',
          value: this.props.value || '',
          list: this.getId() + '-options',
          onChange: this.handleChange });
      } else {
        content = React.createElement(Value, {
          className: 'text-value',
          path: this.props.path,
          name: this.props.name,
          value: this.props.value });
      }
      return content;
    },
    render: function render() {
      var _classes20;

      var classes = (_classes20 = {}, _defineProperty(_classes20, 'text-field', true), _defineProperty(_classes20, this.props.className, !!this.props.className), _classes20);
      return React.createElement(
        Field,
        { ref: 'field',
          name: this.props.name,
          label: this.props.label,
          style: this.props.style,
          className: classNames(classes) },
        this.renderContent(),
        this.renderOptions()
      );
    }
  };
}]);

// - -------------------------------------------------------------------- - //

/*!
**  uimmutable -- UI components for Rey framework.
**  Copyright (c) 2016 Yuri Neves Silveira <http://yneves.com>
**  Licensed under The MIT License <http://opensource.org/licenses/MIT>
**  Distributed on <http://github.com/yneves/uimmutable>
*/
// - -------------------------------------------------------------------- - //

'use strict';

rey.component('uim.TimeField', ['React', 'Immutable', 'classNames', 'uim.Value', 'uim.Field', function (React, Immutable, classNames, Value, Field) {
  return {

    statics: {
      pickProps: function pickProps(path, field, values) {
        path = field.has('path') ? field.get('path') : path.push(field.get('name'));
        return {
          path: path,
          name: field.get('name'),
          label: field.get('label'),
          className: field.get('className'),
          style: field.get('style'),
          value: values.getIn(path)
        };
      }
    },

    propTypes: {
      path: React.PropTypes.List.isRequired,
      name: React.PropTypes.string.isRequired,
      label: React.PropTypes.string.isRequired,
      input: React.PropTypes.bool.isRequired,
      value: React.PropTypes.any,
      onChange: React.PropTypes.func.isRequired,
      className: React.PropTypes.string,
      style: React.PropTypes.oneOfType([React.PropTypes.Map, React.PropTypes.object])
    },

    handleChange: function handleChange(event) {
      if (this.props.onChange) {
        this.props.onChange({
          name: this.props.name,
          path: this.props.path,
          value: this.refs.input.value,
          event: event
        });
      }
    },
    renderContent: function renderContent() {
      var content = void 0;
      if (this.props.input) {
        content = React.createElement('input', {
          ref: 'input',
          type: 'time',
          value: this.props.value,
          onChange: this.handleChange });
      } else {
        content = React.createElement(Value, {
          className: 'time-value',
          path: this.props.path,
          name: this.props.name,
          value: this.props.value });
      }
      return content;
    },
    render: function render() {
      var _classes21;

      var classes = (_classes21 = {}, _defineProperty(_classes21, 'time-field', true), _defineProperty(_classes21, this.props.className, !!this.props.className), _classes21);
      return React.createElement(
        Field,
        { ref: 'field',
          name: this.props.name,
          label: this.props.label,
          style: this.props.style,
          className: classNames(classes) },
        this.renderContent()
      );
    }
  };
}]);

/*!
**  uimmutable -- UI components for Rey framework.
**  Copyright (c) 2016 Yuri Neves Silveira <http://yneves.com>
**  Licensed under The MIT License <http://opensource.org/licenses/MIT>
**  Distributed on <http://github.com/yneves/uimmutable>
*/
// - -------------------------------------------------------------------- - //

'use strict';

rey.component('uim.Value', ['React', 'Immutable', 'classNames', 'uim.ValueFormat', function (React, Immutable, classNames, ValueFormat) {
  return {

    statics: {
      pickProps: function pickProps(path, field, values) {
        path = field.has('path') ? field.get('path') : path.push(field.get('name'));
        return {
          path: path,
          name: field.get('name'),
          format: field.get('format'),
          className: field.get('className'),
          style: field.get('style'),
          value: values.getIn(path),
          texts: field.get('texts')
        };
      }
    },

    propTypes: {
      path: React.PropTypes.List,
      name: React.PropTypes.string,
      value: React.PropTypes.any,
      texts: React.PropTypes.Map,
      format: React.PropTypes.string,
      className: React.PropTypes.string,
      style: React.PropTypes.oneOfType([React.PropTypes.Map, React.PropTypes.object]),
      onClick: React.PropTypes.func
    },

    handleClick: function handleClick(event) {
      if (this.props.onClick) {
        this.props.onClick({
          name: this.props.name,
          path: this.props.path,
          value: this.props.value,
          event: event
        });
      }
    },
    getValue: function getValue() {
      var value = void 0;
      if (this.props.value || this.props.value === 0) {
        if (this.props.format) {
          if (ValueFormat[this.props.format]) {
            value = ValueFormat[this.props.format](this.props.value);
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
      return value;
    },
    render: function render() {
      var style = Immutable.Map.isMap(this.props.style) ? this.props.style.toJS() : this.props.style;
      var classes = _defineProperty({
        value: true
      }, this.props.className, !!this.props.className);
      return React.createElement(
        'div',
        { className: classNames(classes), style: this.props.style, onClick: this.handleClick },
        this.getValue()
      );
    }
  };
}]);

// - -------------------------------------------------------------------- - //

/*!
**  uimmutable -- UI components for Rey framework.
**  Copyright (c) 2016 Yuri Neves Silveira <http://yneves.com>
**  Licensed under The MIT License <http://opensource.org/licenses/MIT>
**  Distributed on <http://github.com/yneves/uimmutable>
*/
// - -------------------------------------------------------------------- - //

'use strict';

rey.component('uim.Icon', ['React', 'Immutable', 'classNames', function (React, Immutable, classNames) {
  var globals = arguments.length <= 3 || arguments[3] === undefined ? {} : arguments[3];
  return {

    statics: {

      globals: globals,

      pickProps: function pickProps(path, field, values) {
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

    getDefaultProps: function getDefaultProps() {
      return {
        path: Immutable.List()
      };
    },
    handleClick: function handleClick(event) {
      if (this.props.onClick) {
        this.props.onClick({
          name: this.props.name,
          path: this.props.path,
          event: event
        });
      }
    },
    render: function render() {
      var _classes23;

      var icon = this.props.icon || this.props.name;
      var classes = (_classes23 = {
        icon: true
      }, _defineProperty(_classes23, globals.className || 'fa', true), _defineProperty(_classes23, this.props.className, !!this.props.className), _defineProperty(_classes23, (globals.classNamePrefix || 'fa-') + icon, true), _classes23);
      return React.createElement('span', { className: classNames(classes), onClick: this.handleClick });
    }
  };
}]);

// - -------------------------------------------------------------------- - //

/*!
**  uimmutable -- UI components for Rey framework.
**  Copyright (c) 2016 Yuri Neves Silveira <http://yneves.com>
**  Licensed under The MIT License <http://opensource.org/licenses/MIT>
**  Distributed on <http://github.com/yneves/uimmutable>
*/
// - -------------------------------------------------------------------- - //

'use strict';

rey.component('uim.IconButton', ['React', 'Immutable', 'classNames', 'uim.Icon', function (React, Immutable, classNames, Icon) {
  return {

    statics: {
      pickProps: function pickProps(path, field, values) {
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

    getDefaultProps: function getDefaultProps() {
      return {
        path: Immutable.List(),
        disabled: false
      };
    },
    handleClick: function handleClick(event) {
      if (this.props.onClick) {
        this.props.onClick({
          name: this.props.name,
          path: this.props.path,
          event: event
        });
      }
    },
    render: function render() {
      var _classes24;

      var classes = (_classes24 = {}, _defineProperty(_classes24, 'icon-button', true), _defineProperty(_classes24, this.props.className, !!this.props.className), _classes24);
      return React.createElement(Icon, {
        name: this.props.name,
        icon: this.props.icon,
        className: classNames(classes),
        'data-button-name': this.props.name,
        disabled: this.props.disabled,
        onClick: this.handleClick });
    }
  };
}]);

// - -------------------------------------------------------------------- - //

/*!
**  uimmutable -- UI components for Rey framework.
**  Copyright (c) 2016 Yuri Neves Silveira <http://yneves.com>
**  Licensed under The MIT License <http://opensource.org/licenses/MIT>
**  Distributed on <http://github.com/yneves/uimmutable>
*/
// - -------------------------------------------------------------------- - //

'use strict';

rey.component('uim.Link', ['React', 'Immutable', 'classNames', function (React, Immutable, classNames) {
  var globals = arguments.length <= 3 || arguments[3] === undefined ? {} : arguments[3];
  return {

    statics: {

      globals: globals,

      pickProps: function pickProps(path, field, values) {
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

    getDefaultProps: function getDefaultProps() {
      return {
        path: Immutable.List()
      };
    },
    handleClick: function handleClick(event) {
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
    render: function render() {
      var classes = _defineProperty({}, this.props.className, !!this.props.className);
      return React.createElement(
        'a',
        { name: this.props.name,
          href: this.props.href,
          className: classNames(classes),
          onClick: this.handleClick },
        this.props.label ? this.props.label : undefined,
        this.props.children ? this.props.children : undefined
      );
    }
  };
}]);

// - -------------------------------------------------------------------- - //

/*!
**  uimmutable -- UI components for Rey framework.
**  Copyright (c) 2016 Yuri Neves Silveira <http://yneves.com>
**  Licensed under The MIT License <http://opensource.org/licenses/MIT>
**  Distributed on <http://github.com/yneves/uimmutable>
*/
// - -------------------------------------------------------------------- - //

'use strict';

rey.component('uim.LinkButton', ['React', 'Immutable', 'classNames', 'uim.Link', function (React, Immutable, classNames, Link) {
  return {

    statics: {
      pickProps: function pickProps(path, field, values) {
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

    getDefaultProps: function getDefaultProps() {
      return {
        disabled: false
      };
    },
    handleClick: function handleClick(event) {
      if (this.props.onClick) {
        this.props.onClick({
          name: this.props.name,
          path: this.props.path,
          event: event
        });
      }
    },
    render: function render() {
      var _classes26;

      var classes = (_classes26 = {
        button: true
      }, _defineProperty(_classes26, 'link-button', true), _defineProperty(_classes26, this.props.className, !!this.props.className), _classes26);
      return React.createElement(Link, {
        name: this.props.name,
        href: this.props.href,
        label: this.props.label,
        className: classNames(classes),
        'data-button-name': this.props.name,
        disabled: this.props.disabled,
        onClick: this.handleClick });
    }
  };
}]);

// - -------------------------------------------------------------------- - //

/*!
**  uimmutable -- UI components for Rey framework.
**  Copyright (c) 2016 Yuri Neves Silveira <http://yneves.com>
**  Licensed under The MIT License <http://opensource.org/licenses/MIT>
**  Distributed on <http://github.com/yneves/uimmutable>
*/
// - -------------------------------------------------------------------- - //

'use strict';

rey.component('uim.LinkGroup', ['React', 'Immutable', 'classNames', 'uim.Link', 'uim.Icon', function (React, Immutable, classNames, Link, Icon) {
  return {

    statics: {
      pickProps: function pickProps(path, field, values) {
        path = field.has('path') ? field.get('path') : path.push(field.get('name'));
        return {
          path: path,
          name: field.get('name'),
          links: field.get('links'),
          className: field.get('className'),
          collapsed: field.get('collapsed')
        };
      }
    },

    propTypes: {
      path: React.PropTypes.List.isRequired,
      name: React.PropTypes.string.isRequired,
      links: React.PropTypes.List.isRequired,
      className: React.PropTypes.string,
      collapsed: React.PropTypes.bool.isRequired
    },

    getDefaultProps: function getDefaultProps() {
      return {
        path: Immutable.List(),
        links: Immutable.List(),
        collapsed: false
      };
    },
    renderIcon: function renderIcon(link) {
      if (link.has('icon')) {
        return React.createElement(Icon, { key: 'icon', name: link.get('icon') });
      }
    },
    renderLink: function renderLink(link, index) {
      return React.createElement(
        'li',
        { key: index, className: link.get('className') },
        React.createElement(
          Link,
          { name: link.get('name'), href: link.get('href'), className: link.get('className') },
          this.renderIcon(link),
          link.get('label')
        )
      );
    },
    render: function render() {
      var _classes27;

      var classes = (_classes27 = {}, _defineProperty(_classes27, 'link-group', true), _defineProperty(_classes27, this.props.className, !!this.props.className), _classes27);
      var style = {};
      if (this.props.collapsed) {
        style.display = 'none';
      }
      return React.createElement(
        'ul',
        { className: classNames(classes), style: style },
        this.props.links.map(this.renderLink)
      );
    }
  };
}]);

// - -------------------------------------------------------------------- - //

/*!
**  uimmutable -- UI components for Rey framework.
**  Copyright (c) 2016 Yuri Neves Silveira <http://yneves.com>
**  Licensed under The MIT License <http://opensource.org/licenses/MIT>
**  Distributed on <http://github.com/yneves/uimmutable>
*/
// - -------------------------------------------------------------------- - //

'use strict';

rey.component('uim.List', ['React', 'Immutable', 'classNames', 'uim.Table', 'uim.Formset', 'uim.Toolbar', 'uim.Pages', 'uim.SelectButton', function (React, Immutable, classNames, Table, Formset, Toolbar, Pages, SelectButton) {
  return {

    propTypes: {
      path: React.PropTypes.List.isRequired,
      name: React.PropTypes.string.isRequired,
      values: React.PropTypes.Map.isRequired,
      filter: React.PropTypes.oneOfType([React.PropTypes.List, React.PropTypes.node, React.PropTypes.bool]),
      header: React.PropTypes.oneOfType([React.PropTypes.List, React.PropTypes.node, React.PropTypes.bool]),
      footer: React.PropTypes.oneOfType([React.PropTypes.List, React.PropTypes.node, React.PropTypes.bool]),
      rows: React.PropTypes.List.isRequired,
      columns: React.PropTypes.List.isRequired,
      transformColumns: React.PropTypes.func,
      empty: React.PropTypes.node,
      onClick: React.PropTypes.func,
      onChange: React.PropTypes.func,
      className: React.PropTypes.string,
      style: React.PropTypes.oneOfType([React.PropTypes.Map, React.PropTypes.object])
    },

    getDefaultProps: function getDefaultProps() {
      return {
        rows: Immutable.List(),
        path: Immutable.List(),
        columns: Immutable.List(),
        header: true,
        footer: false
      };
    },
    renderFilter: function renderFilter() {
      if (this.props.filter) {
        var filter = this.props.filter;
        if (Immutable.List.isList(this.props.filter)) {
          filter = React.createElement(Formset, {
            name: 'filter',
            path: this.props.path,
            values: this.props.values,
            fields: this.props.filter,
            onClick: this.props.onClick,
            onChange: this.props.onChange });
        }
        return React.createElement(
          'div',
          { className: 'list-filter' },
          filter
        );
      }
    },
    renderLimit: function renderLimit() {
      if (this.props.limits.size) {
        return React.createElement(SelectButton, {
          name: 'limit',
          path: this.props.path.push('limit'),
          value: this.props.values.getIn(this.props.path.push('limit')),
          options: this.props.limits,
          onChange: this.props.onChange,
          className: 'select-limit' });
      }
    },
    renderPages: function renderPages() {
      if (this.props.pages > 1) {
        return React.createElement(
          'div',
          { className: 'list-pages' },
          React.createElement(Pages, {
            name: 'page',
            path: this.props.path.push('page'),
            value: Number(this.props.values.getIn(this.props.path.push('page'))),
            pages: this.props.pages,
            onChange: this.props.onChange }),
          this.renderLimit()
        );
      }
    },
    isEmpty: function isEmpty() {
      return this.props.rows.size === 0 && this.props.empty;
    },
    renderEmpty: function renderEmpty() {
      return React.createElement(
        'div',
        { className: 'list-empty' },
        React.createElement(
          'p',
          null,
          this.props.empty
        )
      );
    },
    renderHeader: function renderHeader() {
      var header = this.props.header;
      if (Immutable.List.isList(this.props.header)) {
        header = React.createElement(Toolbar, {
          name: 'header',
          path: this.props.path,
          tools: this.props.header,
          values: this.props.values,
          onClick: this.props.onClick,
          onChange: this.props.onChange });
      }
      return header;
    },
    renderFooter: function renderFooter() {
      var footer = this.props.footer;
      if (Immutable.List.isList(this.props.footer)) {
        footer = React.createElement(Toolbar, {
          name: 'footer',
          path: this.props.path,
          tools: this.props.footer,
          values: this.props.values,
          onClick: this.props.onClick,
          onChange: this.props.onChange });
      }
      return footer;
    },
    renderTable: function renderTable() {
      return React.createElement(
        'div',
        { className: 'list-table' },
        React.createElement(Table, {
          name: 'table',
          header: this.renderHeader(),
          footer: this.renderFooter(),
          rows: this.props.rows,
          columns: this.props.columns,
          transformColumns: this.props.transformColumns,
          onClick: this.props.onClick,
          onChange: this.props.onChange })
      );
    },
    render: function render() {
      var style = Immutable.Map.isMap(this.props.style) ? this.props.style.toJS() : this.props.style;
      var classes = _defineProperty({
        list: true
      }, this.props.className, !!this.props.className);
      return React.createElement(
        'div',
        { 'data-list-name': this.props.name, style: style, className: classNames(classes) },
        this.renderFilter(),
        this.isEmpty() ? this.renderEmpty() : this.renderTable(),
        this.renderPages()
      );
    }
  };
}]);

// - -------------------------------------------------------------------- - //

/*!
**  uimmutable -- UI components for Rey framework.
**  Copyright (c) 2016 Yuri Neves Silveira <http://yneves.com>
**  Licensed under The MIT License <http://opensource.org/licenses/MIT>
**  Distributed on <http://github.com/yneves/uimmutable>
*/
// - -------------------------------------------------------------------- - //

'use strict';

rey.component('uim.Pages', ['React', 'Immutable', 'classNames', 'uim.Icon', function (React, Immutable, classNames, Icon) {
  return {

    statics: {
      pickProps: function pickProps(path, field, values) {
        path = field.has('path') ? field.get('path') : path.push(field.get('name'));
        return {
          path: path,
          name: field.get('name'),
          pages: field.get('pages'),
          range: field.get('range'),
          value: Number(values.getIn(path)),
          className: field.get('className'),
          style: field.get('style')
        };
      }
    },

    propTypes: {
      name: React.PropTypes.string.isRequired,
      path: React.PropTypes.List.isRequired,
      value: React.PropTypes.number.isRequired,
      pages: React.PropTypes.number.isRequired,
      range: React.PropTypes.number.isRequired,
      onChange: React.PropTypes.func,
      className: React.PropTypes.string,
      style: React.PropTypes.oneOfType([React.PropTypes.Map, React.PropTypes.object])
    },

    getDefaultProps: function getDefaultProps() {
      return {
        path: Immutable.List(),
        value: 1,
        pages: 1,
        range: 5
      };
    },
    handleClick: function handleClick(event, page) {
      if (page && page !== this.props.value) {
        if (this.props.onChange) {
          this.props.onChange({
            name: this.props.name,
            path: this.props.path,
            value: page,
            event: event
          });
        }
      }
    },
    renderPages: function renderPages() {
      var _this4 = this;

      var parts = [];
      var pages = this.props.pages;
      var current = this.props.value;
      var previous = current > 1;
      var next = current < pages;
      var first = Math.max(1, current - this.props.range);
      var last = Math.min(pages, current + this.props.range);

      if (previous) {
        parts.push(React.createElement(
          'li',
          { key: 'previous', onClick: function onClick(e) {
              return _this4.handleClick(e, current - 1);
            } },
          React.createElement(Icon, { name: 'previous', icon: 'chevron-left' })
        ));
      }

      var _loop = function _loop(i) {
        parts.push(React.createElement(
          'li',
          { key: i,
            onClick: function onClick(e) {
              return _this4.handleClick(e, i);
            },
            className: current === i ? 'current' : '' },
          i.toString()
        ));
      };

      for (var i = first; i <= last; i++) {
        _loop(i);
      }

      if (next) {
        parts.push(React.createElement(
          'li',
          { key: 'next', onClick: function onClick(e) {
              return _this4.handleClick(e, current + 1);
            } },
          React.createElement(Icon, { name: 'next', icon: 'chevron-right' })
        ));
      }

      return parts;
    },
    render: function render() {
      var style = Immutable.Map.isMap(this.props.style) ? this.props.style.toJS() : this.props.style;
      var classes = _defineProperty({
        pages: true
      }, this.props.className, !!this.props.className);
      return React.createElement(
        'ul',
        { style: style, className: classNames(classes) },
        this.renderPages()
      );
    }
  };
}]);

// - -------------------------------------------------------------------- - //

/*!
**  uimmutable -- UI components for Rey framework.
**  Copyright (c) 2016 Yuri Neves Silveira <http://yneves.com>
**  Licensed under The MIT License <http://opensource.org/licenses/MIT>
**  Distributed on <http://github.com/yneves/uimmutable>
*/
// - -------------------------------------------------------------------- - //

'use strict';

rey.component('uim.Table', ['React', 'Immutable', 'classNames', function (React, Immutable, classNames) {
  return {

    statics: {
      pickProps: function pickProps(path, field, values) {
        path = field.has('path') ? field.get('path') : path.push(field.get('name'));
        return {
          path: path,
          name: field.get('name'),
          rows: field.get('rows'),
          columns: field.get('columns'),
          header: field.get('header'),
          footer: field.get('footer'),
          className: field.get('className'),
          style: field.get('style')
        };
      }
    },

    propTypes: {
      path: React.PropTypes.List.isRequired,
      name: React.PropTypes.string.isRequired,
      header: React.PropTypes.oneOfType([React.PropTypes.node, React.PropTypes.bool]),
      footer: React.PropTypes.oneOfType([React.PropTypes.node, React.PropTypes.bool]),
      rows: React.PropTypes.List.isRequired,
      columns: React.PropTypes.List.isRequired,
      transformColumns: React.PropTypes.func,
      onClick: React.PropTypes.func,
      onChange: React.PropTypes.func,
      className: React.PropTypes.string,
      style: React.PropTypes.oneOfType([React.PropTypes.Map, React.PropTypes.object])
    },

    getDefaultProps: function getDefaultProps() {
      return {
        path: Immutable.List(),
        rows: Immutable.List(),
        columns: Immutable.List(),
        header: true,
        footer: false
      };
    },
    handleClick: function handleClick(row, column, event) {
      if (this.props.onClick) {
        event.row = row;
        event.column = column;
        this.props.onClick(event);
      }
    },
    isValidTarget: function isValidTarget(target) {
      return target.hasAttribute('data-row-index') && target.hasAttribute('data-column-index');
    },
    findTarget: function findTarget(event) {
      var target = event.target;
      while (!this.isValidTarget(target)) {
        target = target.parentNode;
        if (target === document.body) {
          break;
        }
      }
      if (this.isValidTarget(target)) {
        return target;
      }
    },
    handleClickBody: function handleClickBody(event) {
      var target = this.findTarget(event);
      if (target) {

        var rowIndex = Number(target.getAttribute('data-row-index'));
        var colIndex = Number(target.getAttribute('data-column-index'));
        var row = this.props.rows.get(rowIndex);
        var column = this.props.columns.get(colIndex);

        if (this.props.onClick) {
          this.props.onClick({
            name: this.props.name,
            path: this.props.path,
            row: row,
            column: column,
            event: event
          });
        }
      }
    },
    handleChange: function handleChange(row, column, event) {
      if (this.props.onChange) {
        event.row = row;
        event.column = column;
        this.props.onChange(event);
      }
    },
    renderHeadCol: function renderHeadCol(column, index) {
      var style = {};
      if (column.get('width')) {
        style.width = column.get('width');
      }
      return React.createElement(
        'th',
        { key: index,
          style: style,
          className: 'table-column',
          'data-column-index': index,
          'data-column-name': column.get('name') },
        column.get('label')
      );
    },
    renderCol: function renderCol(row, rowIndex, column, colIndex) {

      var Component = rey.deps.get('uim.' + column.get('type'));

      if (!Component) {
        throw new Error('unknown component type (' + column.get('type') + ')');
      }

      if (!Component.pickProps) {
        throw new Error('invalid component type (' + column.get('type') + ')');
      }

      var props = Component.pickProps(this.props.path, column, row);

      return React.createElement(
        'td',
        { key: colIndex,
          className: 'table-column',
          'data-row-index': rowIndex,
          'data-column-index': colIndex,
          'data-column-name': column.get('name') },
        React.createElement(Component, _extends({}, props, {
          onClick: this.handleClick.bind(this, row, column),
          onChange: this.handleChange.bind(this, row, column) }))
      );
    },
    renderRow: function renderRow(row, rowIndex) {
      var _this5 = this;

      return React.createElement(
        'tr',
        { key: rowIndex, className: 'table-row', 'data-row-index': rowIndex },
        this.getColumns(row, rowIndex).map(function (column, colIndex) {
          return _this5.renderCol(row, rowIndex, column, colIndex);
        })
      );
    },
    getColumns: function getColumns(row, rowIndex) {
      var columns = this.props.columns;
      if (this.props.transformColumns) {
        columns = this.props.transformColumns(columns, row, rowIndex);
      }
      return columns;
    },
    renderBody: function renderBody() {
      var classes = {
        'table-body': true,
        'no-foot': !this.props.footer
      };
      return React.createElement(
        'tbody',
        { className: classNames(classes), onClick: this.handleClickBody },
        this.props.rows.map(this.renderRow)
      );
    },
    renderHeader: function renderHeader() {
      if (this.props.header) {
        var content = void 0;
        if (this.props.header === true) {
          content = React.createElement(
            'tr',
            { className: 'table-head table-row' },
            this.getColumns().map(this.renderHeadCol)
          );
        } else {
          content = React.createElement(
            'tr',
            { className: 'table-head table-custom-head table-row' },
            React.createElement(
              'th',
              { className: 'table-column', colSpan: this.props.columns.size },
              this.props.header
            )
          );
        }
        return React.createElement(
          'thead',
          null,
          content
        );
      }
    },
    renderFooter: function renderFooter() {
      if (this.props.footer) {
        return React.createElement(
          'tfoot',
          null,
          React.createElement(
            'tr',
            { className: 'table-foot table-custom-foot table-row' },
            React.createElement(
              'td',
              { className: 'table-column', colSpan: this.props.columns.size },
              this.props.footer
            )
          )
        );
      }
    },
    render: function render() {
      var style = Immutable.Map.isMap(this.props.style) ? this.props.style.toJS() : this.props.style;
      var classes = _defineProperty({
        table: true
      }, this.props.className, !!this.props.className);
      return React.createElement(
        'table',
        { 'data-table-name': this.props.name, style: style, className: classNames(classes), cellSpacing: 0 },
        this.renderHeader(),
        this.renderBody(),
        this.renderFooter()
      );
    }
  };
}]);

// - -------------------------------------------------------------------- - //

/*!
**  uimmutable -- UI components for Rey framework.
**  Copyright (c) 2016 Yuri Neves Silveira <http://yneves.com>
**  Licensed under The MIT License <http://opensource.org/licenses/MIT>
**  Distributed on <http://github.com/yneves/uimmutable>
*/
// - -------------------------------------------------------------------- - //

'use strict';

rey.component('uim.Loading', ['React', function (React) {
  return {
    render: function render() {
      return React.createElement(
        'div',
        { className: 'loading' },
        React.createElement('span', { className: 'fa fa-spinner fa-spin' })
      );
    }
  };
}]);

// - -------------------------------------------------------------------- - //

/*!
**  uimmutable -- UI components for Rey framework.
**  Copyright (c) 2016 Yuri Neves Silveira <http://yneves.com>
**  Licensed under The MIT License <http://opensource.org/licenses/MIT>
**  Distributed on <http://github.com/yneves/uimmutable>
*/
// - -------------------------------------------------------------------- - //

'use strict';

rey.component('uim.MenuButton', ['React', 'Immutable', 'classNames', 'uim.Icon', 'uim.LinkGroup', 'uim.IconButton', function (React, Immutable, classNames, Icon, LinkGroup, IconButton) {
  return {

    statics: {
      pickProps: function pickProps(path, field, values) {
        path = field.has('path') ? field.get('path') : path.push(field.get('name'));
        return {
          path: path,
          name: field.get('name'),
          icon: field.get('icon'),
          links: field.get('links'),
          groups: field.get('groups'),
          button: field.get('button'),
          counter: field.get('counter'),
          className: field.get('className')
        };
      }
    },

    propTypes: {
      path: React.PropTypes.List.isRequired,
      name: React.PropTypes.string.isRequired,
      icon: React.PropTypes.string.isRequired,
      button: React.PropTypes.bool.isRequired,
      links: React.PropTypes.List,
      groups: React.PropTypes.List,
      counter: React.PropTypes.number,
      className: React.PropTypes.string
    },

    getDefaultProps: function getDefaultProps() {
      return {
        path: Immutable.List(),
        icon: 'bars',
        button: false
      };
    },
    getInitialState: function getInitialState() {
      return {
        showMenu: false
      };
    },
    handleClick: function handleClick() {
      this.setState({ showMenu: !this.state.showMenu });
    },
    renderIcon: function renderIcon() {
      var icon = void 0;
      if (this.props.button) {
        icon = React.createElement(IconButton, {
          name: this.props.icon,
          icon: this.props.icon,
          onClick: this.handleClick });
      } else {
        icon = React.createElement(Icon, { name: this.props.icon, onClick: this.handleClick });
      }
      return icon;
    },
    renderCounter: function renderCounter() {
      if (this.props.counter) {
        return React.createElement(
          'div',
          { className: 'menu-button-counter', onClick: this.handleClick },
          this.props.counter
        );
      }
    },
    renderMenu: function renderMenu() {
      var _this6 = this;

      var content = void 0;
      if (this.props.groups) {
        content = this.props.groups.map(function (group, index) {
          return React.createElement(
            'div',
            { key: index, className: 'menu-button-group' },
            group.get('label') && React.createElement(
              'h2',
              null,
              group.get('label')
            ),
            React.createElement(LinkGroup, {
              name: _this6.props.name + '-' + index + '-links',
              path: _this6.props.path.concat(index, 'links'),
              links: group.get('links'),
              className: 'menu-button-links' })
          );
        });
      } else if (this.props.links) {
        content = React.createElement(LinkGroup, {
          name: this.props.name + '-links',
          path: this.props.path.push('links'),
          links: this.props.links,
          className: 'menu-button-links' });
      }
      return React.createElement(
        'div',
        { className: 'menu-button-dropdown' },
        content
      );
    },
    render: function render() {
      var _classes31;

      var classes = (_classes31 = {
        show: this.state.showMenu
      }, _defineProperty(_classes31, 'menu-button', true), _defineProperty(_classes31, this.props.className, !!this.props.className), _classes31);
      return React.createElement(
        'div',
        { className: classNames(classes) },
        this.renderCounter(),
        this.renderIcon(),
        this.renderMenu()
      );
    }
  };
}]);

// - -------------------------------------------------------------------- - //

/*!
**  uimmutable -- UI components for Rey framework.
**  Copyright (c) 2016 Yuri Neves Silveira <http://yneves.com>
**  Licensed under The MIT License <http://opensource.org/licenses/MIT>
**  Distributed on <http://github.com/yneves/uimmutable>
*/
// - -------------------------------------------------------------------- - //

'use strict';

rey.component('uim.Menuset', ['React', 'Immutable', 'classNames', 'uim.LinkGroup', function (React, Immutable, classNames, LinkGroup) {
  return {

    statics: {
      pickProps: function pickProps(path, field, values) {
        path = field.has('path') ? field.get('path') : path.push(field.get('name'));
        return {
          path: path,
          name: field.get('name'),
          label: field.get('label'),
          links: field.get('links'),
          className: field.get('className'),
          collapsible: field.get('collapsible'),
          collapsed: field.get('collapsed')
        };
      }
    },

    propTypes: {
      path: React.PropTypes.List.isRequired,
      name: React.PropTypes.string.isRequired,
      label: React.PropTypes.string.isRequired,
      links: React.PropTypes.List.isRequired,
      collapsible: React.PropTypes.bool.isRequired,
      collapsed: React.PropTypes.bool.isRequired,
      className: React.PropTypes.string
    },

    getDefaultProps: function getDefaultProps() {
      return {
        path: Immutable.List(),
        collapsible: false,
        collapsed: false
      };
    },
    getInitialState: function getInitialState() {
      return {
        collapsed: this.props.collapsed
      };
    },
    handleClickLegend: function handleClickLegend() {
      if (this.props.collapsible) {
        this.setState({
          collapsed: !this.state.collapsed
        });
      }
    },
    renderLabel: function renderLabel() {
      if (this.props.label) {
        return React.createElement(
          'legend',
          { onClick: this.handleClickLegend },
          this.props.label
        );
      }
    },
    render: function render() {
      var classes = _defineProperty({
        menuset: true
      }, this.props.className, !!this.props.className);
      return React.createElement(
        'div',
        { 'data-menu-name': this.props.name, className: classNames(classes) },
        React.createElement(
          'fieldset',
          null,
          this.renderLabel(),
          React.createElement(LinkGroup, {
            name: this.props.name,
            path: this.props.path,
            links: this.props.links,
            collapsed: this.state.collapsed })
        )
      );
    }
  };
}]);

// - -------------------------------------------------------------------- - //

/*!
**  uimmutable -- UI components for Rey framework.
**  Copyright (c) 2016 Yuri Neves Silveira <http://yneves.com>
**  Licensed under The MIT License <http://opensource.org/licenses/MIT>
**  Distributed on <http://github.com/yneves/uimmutable>
*/
// - -------------------------------------------------------------------- - //

'use strict';

rey.component('uim.Overlay', ['React', 'Immutable', 'classNames', function (React, Immutable, classNames) {
  return {
    render: function render() {
      return React.createElement(
        'div',
        { className: 'overlay' },
        React.createElement(
          'div',
          { className: 'overlay-container' },
          this.props.children
        )
      );
    }
  };
}]);

// - -------------------------------------------------------------------- - //

/*!
**  uimmutable -- UI components for Rey framework.
**  Copyright (c) 2016 Yuri Neves Silveira <http://yneves.com>
**  Licensed under The MIT License <http://opensource.org/licenses/MIT>
**  Distributed on <http://github.com/yneves/uimmutable>
*/
// - -------------------------------------------------------------------- - //

'use strict';

rey.component('uim.Success', ['React', 'Immutable', 'classNames', 'uim.Icon', function (React, Immutable, classNames, Icon) {
  return {

    propTypes: {
      label: React.PropTypes.string.isRequired,
      message: React.PropTypes.string,
      buttonLabel: React.PropTypes.string.isRequired,
      onClose: React.PropTypes.func.isRequired
    },

    getDefaultProps: function getDefaultProps() {
      return {
        buttonLabel: 'OK'
      };
    },
    render: function render() {
      return React.createElement(
        'div',
        { className: 'dialog success' },
        React.createElement(
          'header',
          null,
          React.createElement(Icon, { name: 'check-circle-o' }),
          React.createElement(
            'h2',
            null,
            this.props.label
          )
        ),
        this.props.message ? React.createElement(
          'p',
          null,
          this.props.message
        ) : undefined,
        React.createElement(
          'footer',
          null,
          React.createElement(
            'button',
            { type: 'button', onClick: this.props.onClose },
            this.props.buttonLabel
          )
        )
      );
    }
  };
}]);

// - -------------------------------------------------------------------- - //

/*!
**  uimmutable -- UI components for Rey framework.
**  Copyright (c) 2016 Yuri Neves Silveira <http://yneves.com>
**  Licensed under The MIT License <http://opensource.org/licenses/MIT>
**  Distributed on <http://github.com/yneves/uimmutable>
*/
// - -------------------------------------------------------------------- - //

'use strict';

rey.component('uim.Toolbar', ['React', 'Immutable', 'classNames', function (React, Immutable, classNames) {
  return {

    statics: {
      pickProps: function pickProps(path, field, values) {
        path = field.has('path') ? field.get('path') : path.push(field.get('name'));
        return {
          path: path,
          name: field.get('name'),
          tools: field.get('tools'),
          className: field.get('className'),
          values: values
        };
      }
    },

    propTypes: {
      path: React.PropTypes.List.isRequired,
      values: React.PropTypes.Map.isRequired,
      tools: React.PropTypes.List,
      className: React.PropTypes.string,
      onClick: React.PropTypes.func,
      onChange: React.PropTypes.func
    },

    getDefaultProps: function getDefaultProps() {
      return {
        path: Immutable.List(),
        tools: Immutable.List(),
        values: Immutable.Map()
      };
    },
    renderTool: function renderTool(tool, index) {

      var Component = rey.deps.get('uim.' + tool.get('type'));

      if (!Component) {
        console.error(new Error('unknown component type (' + tool.get('type') + ')'));
      }

      if (!Component.pickProps) {
        console.error(new Error('invalid component type (' + tool.get('type') + ')'));
      }

      var props = Component.pickProps(this.props.path, tool, this.props.values);

      return React.createElement(
        'div',
        { key: index, 'data-tool-name': tool.get('name'), className: 'tool' },
        React.createElement(Component, _extends({}, props, {
          onClick: this.props.onClick,
          onChange: this.props.onChange }))
      );
    },


    render: function render() {

      var classes = _defineProperty({
        toolbar: true
      }, this.props.className, !!this.props.className);

      return React.createElement(
        'div',
        { 'data-toolbar-name': this.props.name, className: classNames(classes) },
        this.props.tools.map(this.renderTool)
      );
    }
  };
}]);

// - -------------------------------------------------------------------- - //

/*!
**  uimmutable -- UI components for Rey framework.
**  Copyright (c) 2016 Yuri Neves Silveira <http://yneves.com>
**  Licensed under The MIT License <http://opensource.org/licenses/MIT>
**  Distributed on <http://github.com/yneves/uimmutable>
*/
// - -------------------------------------------------------------------- - //

'use strict';

rey.component('uim.View', ['React', 'Immutable', 'classNames', 'ReactCSSTransitionGroup', 'uim.Loading', 'uim.Toolbar', 'uim.Overlay', function (React, Immutable, classNames, CSSTransitionGroup, Loading, Toolbar, Overlay) {
  return {

    propTypes: {
      header: React.PropTypes.any,
      footer: React.PropTypes.any,
      overlay: React.PropTypes.any,
      isLoading: React.PropTypes.bool,
      className: React.PropTypes.string
    },

    renderOverlay: function renderOverlay() {
      var hasOverlay = Immutable.List.isList(this.props.overlay) ? !!this.props.overlay.size : !!this.props.overlay;
      if (hasOverlay) {
        return React.createElement(
          Overlay,
          null,
          this.props.overlay
        );
      }
    },
    renderHeader: function renderHeader() {
      var header = void 0;
      if (Immutable.List.isList(this.props.header)) {
        header = React.createElement(Toolbar, {
          name: 'header',
          tools: this.props.header,
          onClick: this.props.onClick });
      } else if (this.props.header) {
        header = this.props.header;
      }
      if (header) {
        return React.createElement(
          'header',
          { className: 'header' },
          React.createElement(
            'div',
            { className: 'header-center' },
            header
          )
        );
      }
    },
    renderFooter: function renderFooter() {
      var footer = void 0;
      if (Immutable.List.isList(this.props.footer)) {
        footer = React.createElement(Toolbar, {
          name: 'footer',
          tools: this.props.footer,
          onClick: this.props.onClick });
      } else if (this.props.footer) {
        footer = this.props.footer;
      }
      if (footer) {
        return React.createElement(
          'footer',
          { className: 'footer' },
          React.createElement(
            'div',
            { className: 'footer-center' },
            footer
          )
        );
      }
    },
    render: function render() {
      var classes = _defineProperty({
        view: true
      }, this.props.className, !!this.props.className);
      return React.createElement(
        'div',
        { className: classNames(classes) },
        this.renderHeader(),
        React.createElement(
          'main',
          null,
          this.props.children,
          this.props.isLoading ? React.createElement(Loading, null) : undefined
        ),
        this.renderFooter(),
        React.createElement(
          CSSTransitionGroup,
          {
            transitionName: 'overlay',
            transitionEnterTimeout: 400,
            transitionLeaveTimeout: 120 },
          this.renderOverlay()
        )
      );
    }
  };
}]);

// - -------------------------------------------------------------------- - //
