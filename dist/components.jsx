/*!
**  uimmutable -- React components with Immutable powers.
**  Copyright (c) 2015 Yuri Neves Silveira <http://yneves.com>
**  Licensed under The MIT License <http://opensource.org/licenses/MIT>
**  Distributed on <http://github.com/yneves/uimmutable>
*/
// - -------------------------------------------------------------------- - //

'use strict';

rey.factory('uim.DateFormat', [() => ({

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

})]);

/*!
**  uimmutable -- React components with Immutable powers.
**  Copyright (c) 2015 Yuri Neves Silveira <http://yneves.com>
**  Licensed under The MIT License <http://opensource.org/licenses/MIT>
**  Distributed on <http://github.com/yneves/uimmutable>
*/
// - -------------------------------------------------------------------- - //

'use strict';

rey.factory('uim.DatePicker', [() => (DatePicker)]);

/*!
**  uimmutable -- React components with Immutable powers.
**  Copyright (c) 2015 Yuri Neves Silveira <http://yneves.com>
**  Licensed under The MIT License <http://opensource.org/licenses/MIT>
**  Distributed on <http://github.com/yneves/uimmutable>
*/
// - -------------------------------------------------------------------- - //

'use strict';

rey.factory('moment', [() => (moment)]);

/*!
**  uimmutable -- React components with Immutable powers.
**  Copyright (c) 2015 Yuri Neves Silveira <http://yneves.com>
**  Licensed under The MIT License <http://opensource.org/licenses/MIT>
**  Distributed on <http://github.com/yneves/uimmutable>
*/
// - -------------------------------------------------------------------- - //

'use strict';

rey.factory('uim.ValueFormat', [
  'moment', 'uim.DateFormat',
  (moment, DateFormat) => ({

    date: (value) => {
      const date = moment(value, DateFormat.date.output);
      if (date.isValid()) {
        return date.format(DateFormat.date.input);
      }
    },

    time: (value) => {
      const time = moment(value, DateFormat.time.output);
      if (time.isValid()) {
        return time.format(DateFormat.time.input);
      }
    },

    datetime: (value) => {
      const datetime = moment(value, DateFormat.datetime.output);
      if (datetime.isValid()) {
        return datetime.format(DateFormat.datetime.input);
      }
    }

  })
]);

/*!
**  uimmutable -- React components with Immutable powers.
**  Copyright (c) 2015 Yuri Neves Silveira <http://yneves.com>
**  Licensed under The MIT License <http://opensource.org/licenses/MIT>
**  Distributed on <http://github.com/yneves/uimmutable>
*/
// - -------------------------------------------------------------------- - //

'use strict';

rey.component('uim.Breadcrumb', [
  'React', 'Immutable', 'classNames', 'uim.LinkGroup',
  (React, Immutable, classNames, LinkGroup) => ({

    statics: {
      pickProps: LinkGroup.pickProps
    },

    propTypes: {
      className: React.PropTypes.string
    },

    render() {
      const classes = {
        breadcrumb: true,
        [this.props.className]: this.props.className
      };
      return (
        <LinkGroup {...this.props} className={classNames(classes)} />
      );
    }
  })
]);

// - -------------------------------------------------------------------- - //

/*!
**  uimmutable -- React components with Immutable powers.
**  Copyright (c) 2015 Yuri Neves Silveira <http://yneves.com>
**  Licensed under The MIT License <http://opensource.org/licenses/MIT>
**  Distributed on <http://github.com/yneves/uimmutable>
*/
// - -------------------------------------------------------------------- - //

'use strict';

rey.component('uim.Failure', [
  'React', 'Immutable', 'classNames', 'uim.Icon',
  (React, Immutable, classNames, Icon) => ({

    propTypes: {
      label: React.PropTypes.string.isRequired,
      message: React.PropTypes.string,
      buttonLabel: React.PropTypes.string.isRequired,
      onClose: React.PropTypes.func.isRequired
    },

    getDefaultProps() {
      return {
        buttonLabel: 'OK'
      };
    },

    render() {
      return (
        <div className='dialog failure'>
          <header>
            <Icon name='exclamation-circle' />
            <h2>{this.props.label}</h2>
          </header>
          { this.props.message ? <p>{this.props.message}</p> : undefined }
          <footer>
            <button type='button' onClick={this.props.onClose}>
              {this.props.buttonLabel}
            </button>
          </footer>
        </div>
      );
    }
  })
]);

// - -------------------------------------------------------------------- - //

/*!
**  uimmutable -- React components with Immutable powers.
**  Copyright (c) 2015 Yuri Neves Silveira <http://yneves.com>
**  Licensed under The MIT License <http://opensource.org/licenses/MIT>
**  Distributed on <http://github.com/yneves/uimmutable>
*/
// - -------------------------------------------------------------------- - //

'use strict';

rey.component('uim.Button', [
  'React', 'Immutable', 'classNames',
  (React, Immutable, classNames) => ({

    statics: {

      pickProps(path, field, values) {
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
      style: React.PropTypes.oneOfType([
        React.PropTypes.Map,
        React.PropTypes.object
      ])
    },

    getDefaultProps() {
      return {
        path: Immutable.List(),
        htmlType: 'button',
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

    render: function () {
      const style = Immutable.Map.isMap(this.props.style)
        ? this.props.style.toJS() : this.props.style;
      const classes = {
        button: true,
        [this.props.className]: !!this.props.className
      };
      return (
        <button
          style={style}
          data-button-name={this.props.name}
          type={this.props.htmlType}
          disabled={this.props.disabled}
          className={classNames(classes)}
          onClick={this.handleClick}>
          {this.props.label}
        </button>
      );
    }
  })
]);

// - -------------------------------------------------------------------- - //

/*!
**  uimmutable -- React components with Immutable powers.
**  Copyright (c) 2015 Yuri Neves Silveira <http://yneves.com>
**  Licensed under The MIT License <http://opensource.org/licenses/MIT>
**  Distributed on <http://github.com/yneves/uimmutable>
*/
// - -------------------------------------------------------------------- - //

'use strict';

rey.component('uim.ButtonGroup', [
  'React', 'Immutable', 'classNames', 'uim.Button',
  (React, Immutable, classNames, Button) => ({

    statics: {

      pickProps(path, field, values) {
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
      style: React.PropTypes.oneOfType([
        React.PropTypes.Map,
        React.PropTypes.object
      ])
    },

    handleClick(button, event) {
      if (this.props.onClick) {
        event.button = button;
        this.props.onClick(event);
      }
    },

    renderButton(button, index) {
      const props = Button.pickProps(this.props.path, button);
      return (
        <Button key={index} {...props} onClick={this.handleClick.bind(this, button)} />
      );
    },

    render() {
      const style = Immutable.Map.isMap(this.props.style)
        ? this.props.style.toJS() : this.props.style;
      const classes = {
        ['button-group']: true,
        [this.props.className]: !!this.props.className
      };
      return (
        <div data-field-name={this.props.name} style={style} className={classNames(classes)}>
          {this.props.buttons.map(this.renderButton)}
        </div>
      );
    }
  })
]);

// - -------------------------------------------------------------------- - //

/*!
**  uimmutable -- React components with Immutable powers.
**  Copyright (c) 2015 Yuri Neves Silveira <http://yneves.com>
**  Licensed under The MIT License <http://opensource.org/licenses/MIT>
**  Distributed on <http://github.com/yneves/uimmutable>
*/
// - -------------------------------------------------------------------- - //

'use strict';

rey.component('uim.Checkbox', [
  'React', 'Immutable', 'classNames',
  (React, Immutable, classNames) => ({

    statics: {

      pickProps(path, field, values) {
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
      style: React.PropTypes.oneOfType([
        React.PropTypes.Map,
        React.PropTypes.object
      ])
    },

    handleClick(event) {
      if (this.props.onClick) {
        this.props.onClick({
          name: this.props.name,
          path: this.props.path,
          value: this.refs.input.checked,
          event: event
        });
      }
    },

    handleChange(event) {
      if (this.props.onChange) {
        this.props.onChange({
          name: this.props.name,
          path: this.props.path,
          value: this.refs.input.checked,
          event: event
        });
      }
    },

    render() {
      const style = Immutable.Map.isMap(this.props.style)
        ? this.props.style.toJS() : this.props.style;
      const classes = {
        checkbox: true,
        disabled: this.props.disabled,
        [this.props.className]: !!this.props.className
      };
      return (
        <label className={classNames(classes)} style={style}>
          <input ref='input'
            type='checkbox'
            name={this.props.name}
            checked={this.props.checked}
            disabled={this.props.disabled}
            value={this.props.value}
            onClick={this.handleClick}
            onChange={this.handleChange} />
          <span>{this.props.label}</span>
        </label>
      );
    }
  })
]);

// - -------------------------------------------------------------------- - //

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

/*!
**  uimmutable -- React components with Immutable powers.
**  Copyright (c) 2015 Yuri Neves Silveira <http://yneves.com>
**  Licensed under The MIT License <http://opensource.org/licenses/MIT>
**  Distributed on <http://github.com/yneves/uimmutable>
*/
// - -------------------------------------------------------------------- - //

'use strict';

rey.component('uim.DateField', [
  'React', 'Immutable', 'classNames',
  'uim.Value', 'uim.Field', 'uim.DatePicker', 'uim.DateFormat',
  (React, Immutable, classNames, Value, Field, DatePicker, DateFormat) => ({

    statics: {

      pickProps(path, field, values) {
        path = field.has('path') ? field.get('path') : path.push(field.get('name'));
        return {
          path: path,
          name: field.get('name'),
          label: field.get('label'),
          className: field.get('className'),
          value: values.getIn(path),
          style: field.get('style'),
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
      placeholder: React.PropTypes.string,
      style: React.PropTypes.oneOfType([
        React.PropTypes.Map,
        React.PropTypes.object
      ])
    },

    parseInput(date) {
      return date ? moment(date, DateFormat.date.output) : undefined;
    },

    parseOutput(date) {
      return date.isValid() ? date.format(DateFormat.date.output) : undefined;
    },

    handleChange(value) {
      if (this.props.onChange) {
        this.props.onChange({
          name: this.props.name,
          path: this.props.path,
          value: this.parseOutput(value)
        });
      }
    },

    renderContent() {
      let content;
      if (this.props.input) {
        content = (
          <DatePicker
            dateFormat={DateFormat.date.input}
            selected={this.parseInput(this.props.value)}
            onChange={this.handleChange}
            placeholderText={this.props.placeholder} />
        );
      } else {
        content = (
          <Value
            className='date-value'
            path={this.props.path}
            name={this.props.name}
            value={this.props.value}
            format='date' />
        );
      }
      return content;
    },

    render() {
      const classes = {
        ['date-field']: true,
        [this.props.className]: !!this.props.className
      };
      return (
        <Field ref='field'
          name={this.props.name}
          label={this.props.label}
          style={this.props.style}
          className={classNames(classes)}>
          {this.renderContent()}
        </Field>
      );
    }
  })
]);

/*!
**  uimmutable -- React components with Immutable powers.
**  Copyright (c) 2015 Yuri Neves Silveira <http://yneves.com>
**  Licensed under The MIT License <http://opensource.org/licenses/MIT>
**  Distributed on <http://github.com/yneves/uimmutable>
*/
// - -------------------------------------------------------------------- - //

'use strict';

rey.component('uim.DateRangeField', [
  'React', 'Immutable', 'classNames',
  'uim.Value', 'uim.Field', 'uim.DatePicker', 'uim.DateFormat',
  (React, Immutable, classNames, Value, Field, DatePicker, DateFormat) => ({

    statics: {

      pickProps(path, field, values) {
        path = field.has('path') ? field.get('path') : path.push(field.get('name'));
        return {
          path: path,
          name: field.get('name'),
          label: field.get('label'),
          className: field.get('className'),
          value: values.getIn(path),
          style: field.get('style'),
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
      placeholder: React.PropTypes.oneOfType([
        React.PropTypes.string,
        React.PropTypes.List
      ]),
      className: React.PropTypes.string,
      style: React.PropTypes.oneOfType([
        React.PropTypes.Map,
        React.PropTypes.object
      ])
    },

    parseInput(value, index) {
      let date;
      if (Immutable.List.isList(value)) {
        date = value.get(index);
      } else if (index === 0 && rey.isString(value)) {
        date = value;
      }
      return date ? moment(date, DateFormat.date.output) : undefined;
    },

    parseOutput(date) {
      return date && date.isValid() ? date.format(DateFormat.date.output) : undefined;
    },

    handleChange(value, index) {
      let newValue;
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

    getPlaceholder(index) {
      let placeholder;
      if (rey.isString(this.props.placeholder)) {
        placeholder = this.props.placeholder;
      } else if (Immutable.List.isList(this.props.placeholder)) {
        placeholder = this.props.placeholder.get(index);
      }
      return placeholder;
    },

    renderContent() {
      let content;
      if (this.props.input) {
        const startDate = this.parseInput(this.props.value, 0);
        const endDate = this.parseInput(this.props.value, 1);
        content = [
          <DatePicker
            key='startDate'
            ref='startDate'
            startDate={startDate}
            endDate={endDate}
            selected={startDate}
            dateFormat={DateFormat.date.input}
            isClearable={true}
            onBlur={() => this.refs.startDate.setOpen(false)}
            onChange={(date) => this.handleChange(date, 0)}
            placeholderText={this.getPlaceholder(0)} />
          ,
          <DatePicker
            key='endDate'
            ref='endDate'
            startDate={startDate}
            endDate={endDate}
            selected={endDate}
            isClearable={true}
            onBlur={() => this.refs.endDate.setOpen(false)}
            dateFormat={DateFormat.date.input}
            onChange={(date) => this.handleChange(date, 1)}
            placeholderText={this.getPlaceholder(1)} />
        ];
      } else {
        content = (
          <Value
            className='date-range-value'
            path={this.props.path}
            name={this.props.name}
            value={this.props.value}
            format='date' />
        );
      }
      return content;
    },

    render() {
      const classes = {
        ['date-range-field']: true,
        [this.props.className]: !!this.props.className
      };
      return (
        <Field ref='field'
          style={this.props.style}
          name={this.props.name}
          label={this.props.label}
          className={classNames(classes)}>
          {this.renderContent()}
        </Field>
      );
    }
  })
]);

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

/*!
**  uimmutable -- React components with Immutable powers.
**  Copyright (c) 2015 Yuri Neves Silveira <http://yneves.com>
**  Licensed under The MIT License <http://opensource.org/licenses/MIT>
**  Distributed on <http://github.com/yneves/uimmutable>
*/
// - -------------------------------------------------------------------- - //

'use strict';

rey.component('uim.FieldGroup', [
  'React', 'Immutable', 'classNames', 'uim.IconButton',
  (React, Immutable, classNames, IconButton) => ({

    statics: {

      pickProps(path, field, values) {
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
      style: React.PropTypes.oneOfType([
        React.PropTypes.Map,
        React.PropTypes.object
      ]),
      onClick: React.PropTypes.func,
      onChange: React.PropTypes.func
    },

    getDefaultProps() {
      return {
        path: Immutable.List(),
        input: true,
        collapsed: false,
        multiple: false
      };
    },

    onClickAddEntry(event) {
      if (this.props.onChange) {
        const entries = this.props.values.getIn(this.props.path);
        this.props.onChange({
          name: this.props.name,
          path: this.props.path.push(entries ? entries.size : 0),
          value: Immutable.Map(),
          event: event
        });
      }
    },

    onClickRemoveEntry(entryIndex, event) {
      if (this.props.onChange) {
        const entries = this.props.values.getIn(this.props.path);
        this.props.onChange({
          name: this.props.name,
          path: this.props.path.push(entryIndex),
          value: null,
          event: event
        });
      }
    },

    renderField(path, field, index) {

      const Component = rey.inject('uim.' + field.get('type'));

      if (!Component) {
        console.error(new Error('unknown component type (' + field.get('type') + ')'));
      }

      if (!Component.pickProps) {
        console.error(new Error('invalid component type (' + field.get('type') + ')'));
      }

      const props = Component.pickProps(path, field, this.props.values);

      return (
        <Component
          key={index}
          {...props}
          input={this.props.input}
          onClick={this.props.onClick}
          onChange={this.props.onChange} />
      );
    },

    renderEntry(entryIndex) {
      return (
        <div key={entryIndex} className='field-group-entry'>
          {this.props.input && (
            <div className='field-group-entry-action'>
              <IconButton
                name='removeFieldGroupEntry'
                icon='trash-o'
                onClick={this.onClickRemoveEntry.bind(this, entryIndex)}/>
            </div>
          )}
          <div className='field-group-entry-fields'>
            {this.props.fields.map((field, index) => (
              this.renderField(this.props.path.push(entryIndex), field, index)
            ))}
          </div>
        </div>
      );
    },

    wrapEntries(children) {
      return (
        <div className='field-group-entries'>
          {children}
          <div className='field-group-entries-action'>
            <IconButton
              name='addFieldGroupEntry'
              icon='plus'
              onClick={this.onClickAddEntry}/>
          </div>
        </div>
      );
    },

    renderFields() {
      let content;
      if (this.props.multiple) {
        let children = [];
        const entries = this.props.values.getIn(this.props.path);
        if (Immutable.Map.isMap(entries)) {
          entries.forEach((entry, entryIndex) => {
            if (Immutable.Map.isMap(entry)) {
              children.push(this.renderEntry(entryIndex));
            }
          }, this);
        }
        if (!children.length) {
          children = this.renderEntry(0);
        }
        content = this.wrapEntries(children);
      } else {
        content = this.props.fields.map((field, index) => (
          this.renderField(this.props.path, field, index)
        ));
      }
      return content;
    },

    render() {
      const style = Immutable.Map.isMap(this.props.style)
        ? this.props.style.toJS() : this.props.style;
      const classes = {
        ['field-group']: true,
        ['field-group-multiple']: !!this.props.multiple,
        [this.props.className]: !!this.props.className
      };
      if (this.props.collapsed) {
        style.display = 'none';
      }
      return (
        <div className={classNames(classes)} style={style}>
          {this.renderFields()}
        </div>
      );
    }
  })
]);

// - -------------------------------------------------------------------- - //

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
  (React, Immutable, classNames, FieldGroup) => ({

    statics: {

      pickProps(path, field, values) {
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
      style: React.PropTypes.oneOfType([
        React.PropTypes.Map,
        React.PropTypes.object
      ]),
      onChange: React.PropTypes.func,
      className: React.PropTypes.string
    },

    getDefaultProps() {
      return {
        path: Immutable.List(),
        input: true,
        collapsible: false,
        collapsed: false,
        multiple: false
      };
    },

    getInitialState() {
      return {
        collapsed: this.props.collapsed
      };
    },

    handleClickLegend() {
      if (this.props.collapsible) {
        this.setState({
          collapsed: !this.state.collapsed
        });
      }
    },

    render() {
      const classes = {
        fieldset: true,
        [this.props.className]: !!this.props.className
      };
      const style = Immutable.Map.isMap(this.props.style)
        ? this.props.style.toJS() : this.props.style;
      return (
        <div data-fieldset-name={this.props.name} style={style} className={classNames(classes)}>
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
  })
]);

// - -------------------------------------------------------------------- - //

/*!
**  uimmutable -- React components with Immutable powers.
**  Copyright (c) 2015 Yuri Neves Silveira <http://yneves.com>
**  Licensed under The MIT License <http://opensource.org/licenses/MIT>
**  Distributed on <http://github.com/yneves/uimmutable>
*/
// - -------------------------------------------------------------------- - //

'use strict';

rey.component('uim.FileField', [
  'React', 'Immutable', 'classNames',
  'uim.Value', 'uim.Field', 'uim.Icon',
  (React, Immutable, classNames, Value, Field, Icon) => ({

    statics: {

      pickProps(path, field, values) {
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
      style: React.PropTypes.oneOfType([
        React.PropTypes.Map,
        React.PropTypes.object
      ]),
      className: React.PropTypes.string
    },

    getInitialState() {
      return {
        files: []
      };
    },

    getDefaultProps() {
      return {
        multiple: false,
        placeholder: 'Browse file...'
      };
    },

    getFiles() {
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

    onBrowseFile(event) {
      var files = Array.prototype.slice.call(this.refs.input.files);
      if (this.props.multiple) {
        files = this.state.files.concat(files);
      }
      this.setState({
        files: files
      }, this.handleChange.bind(this, event));
      this.refs.input.value = '';
    },

    handleChange(event) {
      if (this.props.onChange) {
        this.props.onChange({
          name: this.props.name,
          path: this.props.path,
          value: this.props.multiple ? this.state.files : this.state.files[0],
          event: event
        });
      }
    },

    renderInput() {
      if (this.props.input) {
        return (
          <div className='file-field-input'>
            <Icon name='cloud-upload' />
            {this.props.placeholder}
            <input
              ref='input'
              type='file'
              multiple={this.props.multiple}
              onChange={this.onBrowseFile} />
          </div>
        );
      }
    },

    onClickFile(file, event) {
      if (this.props.onClick) {
        this.props.onClick({
          name: this.props.name,
          path: this.props.path,
          value: file,
          event: event
        });
      }
    },

    onRemoveFile(removedFile, event) {
      event.stopPropagation();
      this.setState({
        files: this.state.files.filter((file) => (file !== removedFile))
      }, this.handleChange.bind(this, event));
    },

    renderFile(file, index) {
      return (
        <div key={index} className='file-field-file' onClick={this.onClickFile.bind(this, file)}>
          <Icon name='file-o' />
          {file.name}
          {this.props.input && (
            <Icon name='trash-o' onClick={this.onRemoveFile.bind(this, file)} />
          )}
        </div>
      );
    },

    renderContent() {
      return (
        <div className='file-field-content'>
          {this.renderInput()}
          {this.getFiles().map(this.renderFile, this)}
        </div>
      );
    },

    render() {
      const classes = {
        ['file-field']: true,
        [this.props.className]: !!this.props.className
      };
      return (
        <Field ref='field'
          name={this.props.name}
          label={this.props.label}
          style={this.props.style}
          className={classNames(classes)}>
          {this.renderContent()}
        </Field>
      );
    }
  })
]);

// - -------------------------------------------------------------------- - //

/*!
**  uimmutable -- React components with Immutable powers.
**  Copyright (c) 2015 Yuri Neves Silveira <http://yneves.com>
**  Licensed under The MIT License <http://opensource.org/licenses/MIT>
**  Distributed on <http://github.com/yneves/uimmutable>
*/
// - -------------------------------------------------------------------- - //

'use strict';

rey.component('uim.Formset', [
  'React', 'Immutable', 'classNames', 'uim.FieldGroup',
  (React, Immutable, classNames, FieldGroup) => ({

    propTypes: {
      path: React.PropTypes.List.isRequired,
      name: React.PropTypes.string.isRequired,
      label: React.PropTypes.string,
      fields: React.PropTypes.List.isRequired,
      values: React.PropTypes.Map.isRequired,
      input: React.PropTypes.bool.isRequired,
      collapsible: React.PropTypes.bool.isRequired,
      onClick: React.PropTypes.func,
      onChange: React.PropTypes.func,
      className: React.PropTypes.string,
      style: React.PropTypes.oneOfType([
        React.PropTypes.Map,
        React.PropTypes.object
      ])
    },

    getDefaultProps() {
      return {
        path: Immutable.List(),
        input: true,
        collapsible: false
      };
    },

    getInitialState() {
      return {
        collapsed: false
      };
    },

    handleClickTitle() {
      if (this.props.collapsible) {
        this.setState({
          collapsed: !this.state.collapsed
        });
      }
    },

    renderTitle() {
      if (this.props.label) {
        return (
          <h1 className='title' onClick={this.handleClickTitle}>
            <span>{this.props.label}</span>
          </h1>
        );
      }
    },

    render() {
      const style = Immutable.Map.isMap(this.props.style)
        ? this.props.style.toJS() : this.props.style;
      const classes = {
        formset: true,
        [this.props.className]: !!this.props.className
      };
      return (
        <div data-form-name={this.props.name} style={style} className={classNames(classes)}>
          {this.renderTitle()}
          <FieldGroup
            path={this.props.path}
            input={this.props.input}
            fields={this.props.fields}
            values={this.props.values}
            collapsed={this.state.collapsed}
            onClick={this.props.onClick}
            onChange={this.props.onChange} />
        </div>
      );
    }
  })
]);

// - -------------------------------------------------------------------- - //

/*!
**  uimmutable -- React components with Immutable powers.
**  Copyright (c) 2015 Yuri Neves Silveira <http://yneves.com>
**  Licensed under The MIT License <http://opensource.org/licenses/MIT>
**  Distributed on <http://github.com/yneves/uimmutable>
*/
// - -------------------------------------------------------------------- - //

'use strict';

rey.component('uim.MemoField', [
  'React', 'Immutable', 'classNames', 'uim.Value', 'uim.Field',
  (React, Immutable, classNames, Value, Field) => ({

    statics: {

      pickProps(path, field, values) {
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
      style: React.PropTypes.oneOfType([
        React.PropTypes.Map,
        React.PropTypes.object
      ])
    },

    handleChange(event) {
      if (this.props.onChange) {
        this.props.onChange({
          name: this.props.name,
          path: this.props.path,
          value: this.refs.input.value,
          event: event
        });
      }
    },

    renderContent() {
      let content;
      if (this.props.input) {
        content = (
          <textarea
            ref='input'
            rows={this.props.rows}
            cols={this.props.cols}
            value={this.props.value || ''}
            onChange={this.handleChange} />
        );
      } else {
        content = (
          <Value
            className='memo-value'
            path={this.props.path}
            name={this.props.name}
            value={this.props.value} />
        );
      }
      return content;
    },

    render() {
      const classes = {
        ['memo-field']: true,
        [this.props.className]: !!this.props.className
      };
      return (
        <Field ref='field'
          name={this.props.name}
          label={this.props.label}
          style={this.props.style}
          className={classNames(classes)}>
          {this.renderContent()}
        </Field>
      );
    }
  })
]);

// - -------------------------------------------------------------------- - //

/*!
**  uimmutable -- React components with Immutable powers.
**  Copyright (c) 2015 Yuri Neves Silveira <http://yneves.com>
**  Licensed under The MIT License <http://opensource.org/licenses/MIT>
**  Distributed on <http://github.com/yneves/uimmutable>
*/
// - -------------------------------------------------------------------- - //

'use strict';

rey.component('uim.PasswordField', [
  'React', 'Immutable', 'classNames', 'uim.Field',
  (React, Immutable, classNames, Field) => ({

    statics: {

      pickProps(path, field, values) {
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
      style: React.PropTypes.oneOfType([
        React.PropTypes.Map,
        React.PropTypes.object
      ])
    },

    componentDidUpdate() {
      if (this.props.empty) {
        this.refs.input.value = '';
      }
    },

    handleChange(event) {
      if (this.props.onChange) {
        this.props.onChange({
          name: this.props.name,
          path: this.props.path,
          value: this.refs.input.value,
          event: event
        });
      }
    },

    render() {
      const classes = {
        ['password-field']: true,
        [this.props.className]: !!this.props.className
      };
      return (
        <Field ref='field'
          name={this.props.name}
          label={this.props.label}
          style={this.props.style}
          className={classNames(classes)}>
          <input
            ref='input'
            type='password'
            onChange={this.handleChange} />
        </Field>
      );
    }
  })
]);

// - -------------------------------------------------------------------- - //

/*!
**  uimmutable -- React components with Immutable powers.
**  Copyright (c) 2015 Yuri Neves Silveira <http://yneves.com>
**  Licensed under The MIT License <http://opensource.org/licenses/MIT>
**  Distributed on <http://github.com/yneves/uimmutable>
*/
// - -------------------------------------------------------------------- - //

'use strict';

rey.component('uim.Radio', [
  'React', 'Immutable', 'classNames',
  (React, Immutable, classNames) => ({

    propTypes: {
      path: React.PropTypes.List.isRequired,
      name: React.PropTypes.string.isRequired,
      label: React.PropTypes.string.isRequired,
      value: React.PropTypes.any.isRequired,
      checked: React.PropTypes.bool.isRequired,
      onChange: React.PropTypes.func.isRequired,
      disabled: React.PropTypes.bool,
      className: React.PropTypes.string,
      style: React.PropTypes.oneOfType([
        React.PropTypes.Map,
        React.PropTypes.object
      ])
    },

    handleChange(event) {
      if (this.props.onChange) {
        this.props.onChange({
          name: this.props.name,
          path: this.props.path,
          value: this.refs.input.value,
          event: event
        });
      }
    },

    render() {
      const style = Immutable.Map.isMap(this.props.style)
        ? this.props.style.toJS() : this.props.style;
      const classes = {
        radio: true,
        disabled: this.props.disabled,
        [this.props.className]: !!this.props.className
      };
      return (
        <label style={style} className={classNames(classes)}>
          <input ref='input'
            type='radio'
            name={this.props.name}
            value={this.props.value}
            checked={this.props.checked}
            disabled={this.props.disabled}
            onChange={this.handleChange} />
          <span>{this.props.label}</span>
        </label>
      );
    }
  })
]);

// - -------------------------------------------------------------------- - //

/*!
**  uimmutable -- React components with Immutable powers.
**  Copyright (c) 2015 Yuri Neves Silveira <http://yneves.com>
**  Licensed under The MIT License <http://opensource.org/licenses/MIT>
**  Distributed on <http://github.com/yneves/uimmutable>
*/
// - -------------------------------------------------------------------- - //

'use strict';

rey.component('uim.RadioGroup', [
  'React', 'Immutable', 'classNames', 'uim.Field', 'uim.Value', 'uim.Radio',
  (React, Immutable, classNames, Field, Value, Radio) => ({

    statics: {

      pickProps(path, field, values) {
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
      style: React.PropTypes.oneOfType([
        React.PropTypes.Map,
        React.PropTypes.object
      ])
    },

    renderRadio(option, index) {
      return (
        <Radio ref={index}
          key={index}
          path={this.props.path}
          name={this.props.name}
          label={option.get('label')}
          value={option.get('value')}
          checked={this.props.value === option.get('value')}
          disabled={option.get('disabled')}
          onChange={this.props.onChange} />
      );
    },

    getSelectedLabel() {
      const value = this.props.value;
      const selected = this.props.options.find((option) => {
        return option.get('value') === value;
      });
      if (selected) {
        return selected.get('label');
      }
    },

    renderContent() {
      let content;
      if (this.props.input) {
        content = this.props.options.map(this.renderRadio);
      } else {
        content = (
          <Value
            className='radio-value'
            path={this.props.path}
            name={this.props.name}
            value={this.getSelectedLabel()} />
        );
      }
      return content;
    },

    render() {
      const classes = {
        ['radio-group']: true,
        [this.props.className]: !!this.props.className
      };
      return (
        <Field ref='field'
          name={this.props.name}
          label={this.props.label}
          style={this.props.style}
          className={classNames(classes)}>
          {this.renderContent()}
        </Field>
      );
    }
  })
]);

// - -------------------------------------------------------------------- - //

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
  (React, Immutable, classNames, Icon, Value) => ({

    statics: {

      pickProps(path, field, values) {
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
      style: React.PropTypes.oneOfType([
        React.PropTypes.Map,
        React.PropTypes.object
      ])
    },

    getInitialState() {
      return {
        showOptions: false
      };
    },

    getDefaultProps() {
      return {
        path: Immutable.List(),
        disabled: false,
        multiple: false
      };
    },

    handleClickCaret(event) {
      event.event.stopPropagation();
      this.setState({ showOptions: !this.state.showOptions });
    },

    getChangedValue(option) {
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

    handleClickOption(option, event) {
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

    handleClickValue(event) {
      if (this.props.onClick) {
        this.props.onClick({
          name: this.props.name,
          path: this.props.path,
          value: this.props.value,
          event: event.event
        });
      }
    },

    renderOptionIcon(option) {
      var icon;
      if (option.has('icon')) {
        icon = (
          <Icon key='icon' name={option.get('icon')} />
        );
      }
      return icon;
    },

    renderSelected(option) {
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

    renderOption(option, index) {

      var classes = {};
      classes['select-button-option'] = true;
      classes['disabled'] = !!option.get('disabled');
      classes[option.get('className')] = !!option.get('className');

      var onClick = this.handleClickOption.bind(this, option);

      return (
        <li key={index} className={classNames(classes)} onClick={onClick}>
          {this.renderSelected(option)}
          {this.renderOptionIcon(option)}
          {option.get('label')}
        </li>
      );
    },

    isDisabled() {
      return this.props.disabled || (this.props.disabledValues ?
        this.props.disabledValues.indexOf(this.props.value) !== -1 :
        false);
    },

    isSelected(option) {
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

    getSelectedOptions() {
      return this.props.options.filter(function (option) {
        return this.isSelected(option);
      }, this);
    },

    renderSelectedOption() {

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

      return (
        <Value
          onClick={this.handleClickValue}
          className={classNames(classes)}
          path={this.props.path}
          name={this.props.name}
          value={[icon, value]} />
      );
    },

    renderCaretIcon() {
      return (
        <Icon
          key='icon'
          name='caret-down'
          className='select-button-icon'
          onClick={this.handleClickCaret} />
      );
    },

    renderList() {
      return (
        <ul key='list'>
          {this.props.options.map(this.renderOption)}
        </ul>
      );
    },

    renderOptions() {
      if (!this.isDisabled()) {
        return ([this.renderCaretIcon(), this.renderList()]);
      }
    },

    render() {
      const style = Immutable.Map.isMap(this.props.style)
        ? this.props.style.toJS() : this.props.style;
      const classes = {
        button: true,
        disabled: this.isDisabled(),
        ['select-button']: true,
        ['show-options']: this.state.showOptions,
        [this.props.className]: !!this.props.className
      };
      return (
        <a data-button-name={this.props.name} className={classNames(classes)} style={style}>
          {this.renderSelectedOption()}
          {this.renderOptions()}
        </a>
      );
    }
  })
]);

// - -------------------------------------------------------------------- - //

/*!
**  uimmutable -- React components with Immutable powers.
**  Copyright (c) 2015 Yuri Neves Silveira <http://yneves.com>
**  Licensed under The MIT License <http://opensource.org/licenses/MIT>
**  Distributed on <http://github.com/yneves/uimmutable>
*/
// - -------------------------------------------------------------------- - //

'use strict';

rey.component('uim.SelectButtonField', [
  'React', 'Immutable', 'classNames', 'uim.SelectButton', 'uim.Field',
  (React, Immutable, classNames, SelectButton, Field) => ({

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
      style: React.PropTypes.oneOfType([
        React.PropTypes.Map,
        React.PropTypes.object
      ])
    },

    getDefaultProps() {
      return {
        path: Immutable.List(),
        disabled: false
      };
    },

    render() {
      const classes = {
        ['select-button-field']: true,
        [this.props.className]: !!this.props.className
      };
      return (
        <Field ref='field'
          name={this.props.name}
          label={this.props.label}
          style={this.props.style}
          className={classNames(classes)}>
          <SelectButton
            path={this.props.path}
            name={this.props.name}
            options={this.props.options}
            value={this.props.value}
            disabled={this.props.disabled}
            disabledValues={this.props.disabledValues}
            onClick={this.props.onClick}
            onChange={this.props.onChange}
            className={this.props.className} />
        </Field>
      );
    }
  })
]);

// - -------------------------------------------------------------------- - //

/*!
**  uimmutable -- React components with Immutable powers.
**  Copyright (c) 2015 Yuri Neves Silveira <http://yneves.com>
**  Licensed under The MIT License <http://opensource.org/licenses/MIT>
**  Distributed on <http://github.com/yneves/uimmutable>
*/
// - -------------------------------------------------------------------- - //

'use strict';

rey.component('uim.SelectField', [
  'React', 'Immutable', 'classNames', 'uim.Value', 'uim.Field',
  (React, Immutable, classNames, Value, Field) => ({

    statics: {

      pickProps(path, field, values) {
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
      style: React.PropTypes.oneOfType([
        React.PropTypes.Map,
        React.PropTypes.object
      ])
    },

    handleChange(event) {
      if (this.props.onChange) {
        this.props.onChange({
          name: this.props.name,
          path: this.props.path,
          value: this.refs.input.value,
          event: event
        });
      }
    },

    renderOption(option, index) {
      return (
        <option key={index} value={option.get('value')}>
          {option.get('label')}
        </option>
      );
    },

    getSelectedLabel() {
      const value = this.props.value;
      const selected = this.props.options.find(function (option) {
        return option.get('value') === value;
      });
      if (selected) {
        return selected.get('label');
      }
    },

    renderContent() {
      let content;
      if (this.props.input) {
        content = (
          <select ref='input' value={this.props.value || ''} onChange={this.handleChange}>
            {this.props.options.map(this.renderOption)}
          </select>
        );
      } else {
        content = (
          <Value
            className='select-value'
            path={this.props.path}
            name={this.props.name}
            value={this.getSelectedLabel()} />
        );
      }
      return content;
    },

    render() {
      const classes = {
        ['select-field']: true,
        [this.props.className]: !!this.props.className
      };
      return (
        <Field ref='field'
          name={this.props.name}
          label={this.props.label}
          style={this.props.style}
          className={classNames(classes)}>
          {this.renderContent()}
        </Field>
      );
    }
  })
]);

// - -------------------------------------------------------------------- - //

/*!
**  uimmutable -- React components with Immutable powers.
**  Copyright (c) 2015 Yuri Neves Silveira <http://yneves.com>
**  Licensed under The MIT License <http://opensource.org/licenses/MIT>
**  Distributed on <http://github.com/yneves/uimmutable>
*/
// - -------------------------------------------------------------------- - //

'use strict';

rey.component('uim.TextField', [
  'React', 'Immutable', 'classNames', 'uim.Value', 'uim.Field',
  (React, Immutable, classNames, Value, Field)  => ({

    statics: {

      pickProps(path, field, values) {
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
      style: React.PropTypes.oneOfType([
        React.PropTypes.Map,
        React.PropTypes.object
      ])
    },

    handleChange(event) {
      if (this.props.onChange) {
        this.props.onChange({
          name: this.props.name,
          path: this.props.path,
          value: this.refs.input.value,
          event: event
        });
      }
    },

    getId() {
      return this.props.path.toJS().join('-');
    },

    renderOptions() {
      if (this.props.input && this.props.options) {
        return (
          <datalist id={this.getId() + '-options'}>
            {this.props.options.map(function (option, index) {
              return (
                <option key={index} value={option}>{option}</option>
              );
            })}
          </datalist>
        )
      }
    },

    renderContent() {
      let content;
      if (this.props.input) {
        content = (
          <input
            ref='input'
            type='text'
            value={this.props.value || ''}
            list={this.getId() + '-options'}
            onChange={this.handleChange} />
        );
      } else {
        content = (
          <Value
            className='text-value'
            path={this.props.path}
            name={this.props.name}
            value={this.props.value} />
        );
      }
      return content;
    },

    render() {
      const classes = {
        ['text-field']: true,
        [this.props.className]: !!this.props.className
      };
      return (
        <Field ref='field'
          name={this.props.name}
          label={this.props.label}
          style={this.props.style}
          className={classNames(classes)}>
          {this.renderContent()}
          {this.renderOptions()}
        </Field>
      );
    }
  })
]);

// - -------------------------------------------------------------------- - //

/*!
**  uimmutable -- React components with Immutable powers.
**  Copyright (c) 2015 Yuri Neves Silveira <http://yneves.com>
**  Licensed under The MIT License <http://opensource.org/licenses/MIT>
**  Distributed on <http://github.com/yneves/uimmutable>
*/
// - -------------------------------------------------------------------- - //

'use strict';

rey.component('uim.TimeField', [
  'React', 'Immutable', 'classNames', 'uim.Value', 'uim.Field',
  (React, Immutable, classNames, Value, Field) => ({

    statics: {

      pickProps(path, field, values) {
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
      style: React.PropTypes.oneOfType([
        React.PropTypes.Map,
        React.PropTypes.object
      ])
    },

    handleChange(event) {
      if (this.props.onChange) {
        this.props.onChange({
          name: this.props.name,
          path: this.props.path,
          value: this.refs.input.value,
          event: event
        });
      }
    },

    renderContent() {
      let content;
      if (this.props.input) {
        content = (
          <input
            ref='input'
            type='time'
            value={this.props.value}
            onChange={this.handleChange} />
        );
      } else {
        content = (
          <Value
            className='time-value'
            path={this.props.path}
            name={this.props.name}
            value={this.props.value} />
        );
      }
      return content;
    },

    render() {
      const classes = {
        ['time-field']: true,
        [this.props.className]: !!this.props.className
      };
      return (
        <Field ref='field'
          name={this.props.name}
          label={this.props.label}
          style={this.props.style}
          className={classNames(classes)}>
          {this.renderContent()}
        </Field>
      );
    }
  })
]);

/*!
**  uimmutable -- React components with Immutable powers.
**  Copyright (c) 2015 Yuri Neves Silveira <http://yneves.com>
**  Licensed under The MIT License <http://opensource.org/licenses/MIT>
**  Distributed on <http://github.com/yneves/uimmutable>
*/
// - -------------------------------------------------------------------- - //

'use strict';

rey.component('uim.Value', [
  'React', 'Immutable', 'classNames', 'uim.ValueFormat',
  (React, Immutable, classNames, ValueFormat) => ({

    statics: {

      pickProps(path, field, values) {
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
      style: React.PropTypes.oneOfType([
        React.PropTypes.Map,
        React.PropTypes.object
      ]),
      onClick: React.PropTypes.func
    },

    handleClick(event) {
      if (this.props.onClick) {
        this.props.onClick({
          name: this.props.name,
          path: this.props.path,
          value: this.props.value,
          event: event
        });
      }
    },

    getValue() {
      let value;
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
      return value
    },

    render() {
      const style = Immutable.Map.isMap(this.props.style)
        ? this.props.style.toJS() : this.props.style;
      const classes = {
        value: true,
        [this.props.className]: !!this.props.className
      };
      return (
        <div className={classNames(classes)} style={this.props.style} onClick={this.handleClick}>
          {this.getValue()}
        </div>
      );
    }
  })
]);

// - -------------------------------------------------------------------- - //

/*!
**  uimmutable -- React components with Immutable powers.
**  Copyright (c) 2015 Yuri Neves Silveira <http://yneves.com>
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

/*!
**  uimmutable -- React components with Immutable powers.
**  Copyright (c) 2015 Yuri Neves Silveira <http://yneves.com>
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

/*!
**  uimmutable -- React components with Immutable powers.
**  Copyright (c) 2015 Yuri Neves Silveira <http://yneves.com>
**  Licensed under The MIT License <http://opensource.org/licenses/MIT>
**  Distributed on <http://github.com/yneves/uimmutable>
*/
// - -------------------------------------------------------------------- - //

'use strict';

rey.component('uim.Link', [
  'React', 'Immutable', 'classNames',
  (React, Immutable, classNames, globals = {}) => ({

    statics: {

      globals: globals,

      pickProps(path, field, values) {
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
      if (globals.clickHandler) {
        globals.clickHandler(event, this.props.href);
      }
    },

    render() {
      const classes = {
        [this.props.className]: !!this.props.className
      };
      return (
        <a name={this.props.name}
          href={this.props.href}
          className={classNames(classes)}
          onClick={this.handleClick}>
          {this.props.label ? this.props.label : undefined}
          {this.props.children ? this.props.children : undefined}
        </a>
      );
    }
  })
]);

// - -------------------------------------------------------------------- - //

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

/*!
**  uimmutable -- React components with Immutable powers.
**  Copyright (c) 2015 Yuri Neves Silveira <http://yneves.com>
**  Licensed under The MIT License <http://opensource.org/licenses/MIT>
**  Distributed on <http://github.com/yneves/uimmutable>
*/
// - -------------------------------------------------------------------- - //

'use strict';

rey.component('uim.LinkGroup', [
  'React', 'Immutable', 'classNames', 'uim.Link', 'uim.Icon',
  (React, Immutable, classNames, Link, Icon) => ({

    statics: {

      pickProps(path, field, values) {
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

    getDefaultProps() {
      return {
        path: Immutable.List(),
        links: Immutable.List(),
        collapsed: false
      };
    },

    renderIcon(link) {
      if (link.has('icon')) {
        return (
          <Icon key='icon' name={link.get('icon')} />
        );
      }
    },

    renderLink(link, index) {
      return (
        <li key={index} className={link.get('className')}>
          <Link name={link.get('name')} href={link.get('href')} className={link.get('className')}>
            {this.renderIcon(link)}
            {link.get('label')}
          </Link>
        </li>
      );
    },

    render() {
      const classes = {
        ['link-group']: true,
        [this.props.className]: !!this.props.className
      };
      let style = {};
      if (this.props.collapsed) {
        style.display = 'none';
      }
      return (
        <ul className={classNames(classes)} style={style}>
          {this.props.links.map(this.renderLink)}
        </ul>
      );
    }
  })
]);

// - -------------------------------------------------------------------- - //

/*!
**  uimmutable -- React components with Immutable powers.
**  Copyright (c) 2015 Yuri Neves Silveira <http://yneves.com>
**  Licensed under The MIT License <http://opensource.org/licenses/MIT>
**  Distributed on <http://github.com/yneves/uimmutable>
*/
// - -------------------------------------------------------------------- - //

'use strict';

rey.component('uim.List', [
  'React', 'Immutable', 'classNames',
  'uim.Table', 'uim.Formset', 'uim.Toolbar',
  'uim.Pages', 'uim.SelectButton',
  (React, Immutable, classNames, Table, Formset, Toolbar, Pages, SelectButton) => ({

    propTypes: {
      path: React.PropTypes.List.isRequired,
      name: React.PropTypes.string.isRequired,
      values: React.PropTypes.Map.isRequired,
      filter: React.PropTypes.oneOfType([
        React.PropTypes.List,
        React.PropTypes.node,
        React.PropTypes.bool
      ]),
      header: React.PropTypes.oneOfType([
        React.PropTypes.List,
        React.PropTypes.node,
        React.PropTypes.bool
      ]),
      footer: React.PropTypes.oneOfType([
        React.PropTypes.List,
        React.PropTypes.node,
        React.PropTypes.bool
      ]),
      rows: React.PropTypes.List.isRequired,
      columns: React.PropTypes.List.isRequired,
      transformColumns: React.PropTypes.func,
      empty: React.PropTypes.node,
      onClick: React.PropTypes.func,
      onChange: React.PropTypes.func,
      className: React.PropTypes.string,
      style: React.PropTypes.oneOfType([
        React.PropTypes.Map,
        React.PropTypes.object
      ])
    },

    getDefaultProps() {
      return {
        rows: Immutable.List(),
        path: Immutable.List(),
        columns: Immutable.List(),
        header: true,
        footer: false
      };
    },

    renderFilter() {
      if (this.props.filter) {
        let filter = this.props.filter;
        if (Immutable.List.isList(this.props.filter)) {
          filter = (
            <Formset
              name='filter'
              path={this.props.path}
              values={this.props.values}
              fields={this.props.filter}
              onClick={this.props.onClick}
              onChange={this.props.onChange} />
          );
        }
        return (
          <div className='list-filter'>
            {filter}
          </div>
        );
      }
    },

    renderLimit() {
      if (this.props.limits.size) {
        return (
          <SelectButton
            name='limit'
            path={this.props.path.push('limit')}
            value={this.props.values.getIn(this.props.path.push('limit'))}
            options={this.props.limits}
            onChange={this.props.onChange}
            className='select-limit'/>
        );
      }
    },

    renderPages() {
      if (this.props.pages > 1) {
        return (
          <div className='list-pages'>
            <Pages
              name='page'
              path={this.props.path.push('page')}
              value={Number(this.props.values.getIn(this.props.path.push('page')))}
              pages={this.props.pages}
              onChange={this.props.onChange} />
            {this.renderLimit()}
          </div>
        );
      }
    },

    isEmpty() {
      return this.props.rows.size === 0 && this.props.empty;
    },

    renderEmpty() {
      return (
        <div className='list-empty'>
          <p>{this.props.empty}</p>
        </div>
      );
    },

    renderHeader() {
      let header = this.props.header;
      if (Immutable.List.isList(this.props.header)) {
        header = (
          <Toolbar
            name='header'
            path={this.props.path}
            tools={this.props.header}
            values={this.props.values}
            onClick={this.props.onClick}
            onChange={this.props.onChange} />
        );
      }
      return header;
    },

    renderFooter() {
      let footer = this.props.footer;
      if (Immutable.List.isList(this.props.footer)) {
        footer = (
          <Toolbar
            name='footer'
            path={this.props.path}
            tools={this.props.footer}
            values={this.props.values}
            onClick={this.props.onClick}
            onChange={this.props.onChange} />
        );
      }
      return footer;
    },

    renderTable() {
      return (
        <div className='list-table'>
          <Table
            name='table'
            header={this.renderHeader()}
            footer={this.renderFooter()}
            rows={this.props.rows}
            columns={this.props.columns}
            transformColumns={this.props.transformColumns}
            onClick={this.props.onClick}
            onChange={this.props.onChange} />
        </div>
      );
    },

    render() {
      const style = Immutable.Map.isMap(this.props.style)
        ? this.props.style.toJS() : this.props.style;
      const classes = {
        list: true,
        [this.props.className]: !!this.props.className
      };
      return (
        <div data-list-name={this.props.name} style={style} className={classNames(classes)}>
          {this.renderFilter()}
          {this.isEmpty() ? this.renderEmpty() : this.renderTable()}
          {this.renderPages()}
        </div>
      );
    }
  })
]);

// - -------------------------------------------------------------------- - //

/*!
**  uimmutable -- React components with Immutable powers.
**  Copyright (c) 2015 Yuri Neves Silveira <http://yneves.com>
**  Licensed under The MIT License <http://opensource.org/licenses/MIT>
**  Distributed on <http://github.com/yneves/uimmutable>
*/
// - -------------------------------------------------------------------- - //

'use strict';

rey.component('uim.Pages', [
  'React', 'Immutable', 'classNames', 'uim.Icon',
  (React, Immutable, classNames, Icon) => ({

    statics: {

      pickProps(path, field, values) {
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
      style: React.PropTypes.oneOfType([
        React.PropTypes.Map,
        React.PropTypes.object
      ])
    },

    getDefaultProps() {
      return {
        path: Immutable.List(),
        value: 1,
        pages: 1,
        range: 5
      };
    },

    handleClick(event, page) {
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

    renderPages() {

      const parts = [];
      const pages = this.props.pages;
      const current = this.props.value;
      const previous = current > 1;
      const next = current < pages;
      const first = Math.max(1, current - this.props.range);
      const last = Math.min(pages, current + this.props.range);

      if (previous) {
        parts.push(
          <li key='previous' onClick={(e) => this.handleClick(e, current - 1)}>
            <Icon name='previous' icon='chevron-left' />
         </li>
        );
      }

      for (let i = first; i <= last; i++) {
        parts.push(
          <li key={i}
            onClick={(e) => this.handleClick(e, i)}
            className={current === i ? 'current' : ''}>
            {i.toString()}
          </li>
        );
      }

      if (next) {
        parts.push(
          <li key='next' onClick={(e) => this.handleClick(e, current + 1)}>
            <Icon name='next' icon='chevron-right' />
          </li>
        );
      }

      return parts;
    },

    render() {
      const style = Immutable.Map.isMap(this.props.style)
        ? this.props.style.toJS() : this.props.style;
      const classes = {
         pages: true,
         [this.props.className]: !!this.props.className
       };
      return (
        <ul style={style} className={classNames(classes)}>
           {this.renderPages()}
         </ul>
      );
    }
  })
]);

// - -------------------------------------------------------------------- - //

/*!
**  uimmutable -- React components with Immutable powers.
**  Copyright (c) 2015 Yuri Neves Silveira <http://yneves.com>
**  Licensed under The MIT License <http://opensource.org/licenses/MIT>
**  Distributed on <http://github.com/yneves/uimmutable>
*/
// - -------------------------------------------------------------------- - //

'use strict';

rey.component('uim.Table', [
  'React', 'Immutable', 'classNames',
  (React, Immutable, classNames) => ({

    statics: {

      pickProps(path, field, values) {
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
      header: React.PropTypes.oneOfType([
        React.PropTypes.node,
        React.PropTypes.bool
      ]),
      footer: React.PropTypes.oneOfType([
        React.PropTypes.node,
        React.PropTypes.bool
      ]),
      rows: React.PropTypes.List.isRequired,
      columns: React.PropTypes.List.isRequired,
      transformColumns: React.PropTypes.func,
      onClick: React.PropTypes.func,
      onChange: React.PropTypes.func,
      className: React.PropTypes.string,
      style: React.PropTypes.oneOfType([
        React.PropTypes.Map,
        React.PropTypes.object
      ])
    },

    getDefaultProps() {
      return {
        path: Immutable.List(),
        rows: Immutable.List(),
        columns: Immutable.List(),
        header: true,
        footer: false
      };
    },

    handleClick(row, column, event) {
      if (this.props.onClick) {
        event.row = row;
        event.column = column;
        this.props.onClick(event);
      }
    },

    isValidTarget(target) {
      return (
        target.hasAttribute('data-row-index') &&
        target.hasAttribute('data-column-index')
      );
    },

    findTarget(event) {
      let target = event.target;
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

    handleClickBody(event) {
      const target = this.findTarget(event);
      if (target) {

        const rowIndex = Number(target.getAttribute('data-row-index'));
        const colIndex = Number(target.getAttribute('data-column-index'));
        const row = this.props.rows.get(rowIndex);
        const column = this.props.columns.get(colIndex);

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

    handleChange(row, column, event) {
      if (this.props.onChange) {
        event.row = row;
        event.column = column;
        this.props.onChange(event);
      }
    },

    renderHeadCol(column, index) {
      const style = {};
      if (column.get('width')) {
        style.width = column.get('width');
      }
      return (
        <th key={index}
          style={style}
          className='table-column'
          data-column-index={index}
          data-column-name={column.get('name')}>
          {column.get('label')}
        </th>
      );
    },

    renderCol(row, rowIndex, column, colIndex) {

      const Component = rey.inject('uim.' + column.get('type'));

      if (!Component) {
        throw new Error('unknown component type (' + column.get('type') + ')');
      }

      if (!Component.pickProps) {
        throw new Error('invalid component type (' + column.get('type') + ')');
      }

      const props = Component.pickProps(this.props.path, column, row);

      return (
        <td key={colIndex}
          className='table-column'
          data-row-index={rowIndex}
          data-column-index={colIndex}
          data-column-name={column.get('name')}>
          <Component
            {...props}
            onClick={this.handleClick.bind(this, row, column)}
            onChange={this.handleChange.bind(this, row, column)} />
        </td>
      );
    },

    renderRow(row, rowIndex) {
      return (
        <tr key={rowIndex} className='table-row' data-row-index={rowIndex}>
          {this.getColumns(row, rowIndex).map((column, colIndex) => (
            this.renderCol(row, rowIndex, column, colIndex)
          ))}
        </tr>
      );
    },

    getColumns(row, rowIndex) {
      let columns = this.props.columns;
      if (this.props.transformColumns) {
        columns = this.props.transformColumns(columns, row, rowIndex);
      }
      return columns;
    },

    renderBody() {
      const classes = {
        'table-body': true,
        'no-foot': !this.props.footer
      };
      return (
        <tbody className={classNames(classes)} onClick={this.handleClickBody}>
          {this.props.rows.map(this.renderRow)}
        </tbody>
      );
    },

    renderHeader() {
      if (this.props.header) {
        let content;
        if (this.props.header === true) {
          content = (
            <tr className='table-head table-row'>
              {this.getColumns().map(this.renderHeadCol)}
            </tr>
          );
        } else {
          content = (
            <tr className='table-head table-custom-head table-row'>
              <th className='table-column' colSpan={this.props.columns.size}>
                {this.props.header}
              </th>
            </tr>
          );
        }
        return (
          <thead>
            {content}
          </thead>
        );
      }
    },

    renderFooter() {
      if (this.props.footer) {
        return (
          <tfoot>
            <tr className='table-foot table-custom-foot table-row'>
              <td className='table-column' colSpan={this.props.columns.size}>
                {this.props.footer}
              </td>
            </tr>
          </tfoot>
        );
      }
    },

    render() {
      const style = Immutable.Map.isMap(this.props.style)
        ? this.props.style.toJS() : this.props.style;
      const classes = {
        table: true,
        [this.props.className]: !!this.props.className
      };
      return (
        <table data-table-name={this.props.name} style={style} className={classNames(classes)} cellSpacing={0}>
          {this.renderHeader()}
          {this.renderBody()}
          {this.renderFooter()}
        </table>
      );
    }
  })
]);

// - -------------------------------------------------------------------- - //

/*!
**  uimmutable -- React components with Immutable powers.
**  Copyright (c) 2015 Yuri Neves Silveira <http://yneves.com>
**  Licensed under The MIT License <http://opensource.org/licenses/MIT>
**  Distributed on <http://github.com/yneves/uimmutable>
*/
// - -------------------------------------------------------------------- - //

'use strict';

rey.component('uim.Loading', [
  'React',
  (React) => ({

    render() {
      return (
        <div className='loading'>
          <span className='fa fa-spinner fa-spin' />
        </div>
      );
    }
  })
]);

// - -------------------------------------------------------------------- - //

/*!
**  uimmutable -- React components with Immutable powers.
**  Copyright (c) 2015 Yuri Neves Silveira <http://yneves.com>
**  Licensed under The MIT License <http://opensource.org/licenses/MIT>
**  Distributed on <http://github.com/yneves/uimmutable>
*/
// - -------------------------------------------------------------------- - //

'use strict';

rey.component('uim.MenuButton', [
  'React', 'Immutable', 'classNames', 'uim.Icon', 'uim.LinkGroup', 'uim.IconButton',
  (React, Immutable, classNames, Icon, LinkGroup, IconButton) => ({

    statics: {

      pickProps(path, field, values) {
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

    getDefaultProps() {
      return {
        path: Immutable.List(),
        icon: 'bars',
        button: false
      };
    },

    getInitialState() {
      return {
        showMenu: false
      };
    },

    handleClick() {
      this.setState({ showMenu: !this.state.showMenu });
    },

    renderIcon() {
      let icon;
      if (this.props.button) {
        icon = (
          <IconButton
            name={this.props.icon}
            icon={this.props.icon}
            onClick={this.handleClick} />
        );
      } else {
        icon = (
          <Icon name={this.props.icon} onClick={this.handleClick} />
        );
      }
      return icon;
    },

    renderCounter() {
      if (this.props.counter) {
        return (
          <div className='menu-button-counter' onClick={this.handleClick}>
            {this.props.counter}
          </div>
        );
      }
    },

    renderMenu() {
      let content;
      if (this.props.groups) {
        content = this.props.groups.map((group, index) => (
          <div key={index} className='menu-button-group'>
            {group.get('label') && <h2>{group.get('label')}</h2>}
            <LinkGroup
              name={this.props.name + '-' + index + '-links'}
              path={this.props.path.concat(index, 'links')}
              links={group.get('links')}
              className='menu-button-links' />
          </div>
        ));
      } else if (this.props.links) {
        content = (
          <LinkGroup
            name={this.props.name + '-links'}
            path={this.props.path.push('links')}
            links={this.props.links}
            className='menu-button-links' />
        );
      }
      return (
        <div className='menu-button-dropdown'>
          {content}
        </div>
      );
    },

    render() {
      const classes = {
        show: this.state.showMenu,
        ['menu-button']: true,
        [this.props.className]: !!this.props.className
      };
      return (
        <div className={classNames(classes)}>
          {this.renderCounter()}
          {this.renderIcon()}
          {this.renderMenu()}
        </div>
      );
    }
  })
]);

// - -------------------------------------------------------------------- - //

/*!
**  uimmutable -- React components with Immutable powers.
**  Copyright (c) 2015 Yuri Neves Silveira <http://yneves.com>
**  Licensed under The MIT License <http://opensource.org/licenses/MIT>
**  Distributed on <http://github.com/yneves/uimmutable>
*/
// - -------------------------------------------------------------------- - //

'use strict';

rey.component('uim.Menuset', [
  'React', 'Immutable', 'classNames', 'uim.LinkGroup',
  (React, Immutable, classNames, LinkGroup) => ({

    statics: {

      pickProps(path, field, values) {
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

    getDefaultProps() {
      return {
        path: Immutable.List(),
        collapsible: false,
        collapsed: false
      };
    },

    getInitialState() {
      return {
        collapsed: this.props.collapsed
      };
    },

    handleClickLegend() {
      if (this.props.collapsible) {
        this.setState({
          collapsed: !this.state.collapsed
        });
      }
    },

    renderLabel() {
      if (this.props.label) {
        return (
          <legend onClick={this.handleClickLegend}>
            {this.props.label}
          </legend>
        );
      }
    },

    render() {
      const classes = {
        menuset: true,
        [this.props.className]: !!this.props.className
      };
      return (
        <div data-menu-name={this.props.name} className={classNames(classes)}>
          <fieldset>
            {this.renderLabel()}
            <LinkGroup
              name={this.props.name}
              path={this.props.path}
              links={this.props.links}
              collapsed={this.state.collapsed} />
          </fieldset>
        </div>
      );
    }
  })
]);

// - -------------------------------------------------------------------- - //

/*!
**  uimmutable -- React components with Immutable powers.
**  Copyright (c) 2015 Yuri Neves Silveira <http://yneves.com>
**  Licensed under The MIT License <http://opensource.org/licenses/MIT>
**  Distributed on <http://github.com/yneves/uimmutable>
*/
// - -------------------------------------------------------------------- - //

'use strict';

rey.component('uim.Overlay', [
  'React', 'Immutable', 'classNames',
  (React, Immutable, classNames) => ({

    render() {
      return (
        <div className='overlay'>
          <div className='overlay-container'>
            {this.props.children}
          </div>
        </div>
      );
    }
  })
]);

// - -------------------------------------------------------------------- - //

/*!
**  uimmutable -- React components with Immutable powers.
**  Copyright (c) 2015 Yuri Neves Silveira <http://yneves.com>
**  Licensed under The MIT License <http://opensource.org/licenses/MIT>
**  Distributed on <http://github.com/yneves/uimmutable>
*/
// - -------------------------------------------------------------------- - //

'use strict';

rey.component('uim.Success', [
  'React', 'Immutable', 'classNames', 'uim.Icon',
  (React, Immutable, classNames, Icon) => ({

    propTypes: {
      label: React.PropTypes.string.isRequired,
      message: React.PropTypes.string,
      buttonLabel: React.PropTypes.string.isRequired,
      onClose: React.PropTypes.func.isRequired
    },

    getDefaultProps() {
      return {
        buttonLabel: 'OK'
      };
    },

    render() {
      return (
        <div className='dialog success'>
          <header>
            <Icon name='check-circle-o' />
            <h2>{this.props.label}</h2>
          </header>
          { this.props.message ? <p>{this.props.message}</p> : undefined }
          <footer>
            <button type='button' onClick={this.props.onClose}>
              {this.props.buttonLabel}
            </button>
          </footer>
        </div>
      );
    }
  })
]);

// - -------------------------------------------------------------------- - //

/*!
**  uimmutable -- React components with Immutable powers.
**  Copyright (c) 2015 Yuri Neves Silveira <http://yneves.com>
**  Licensed under The MIT License <http://opensource.org/licenses/MIT>
**  Distributed on <http://github.com/yneves/uimmutable>
*/
// - -------------------------------------------------------------------- - //

'use strict';

rey.component('uim.Toolbar', [
  'React', 'Immutable', 'classNames',
  (React, Immutable, classNames) => ({

    statics: {

      pickProps(path, field, values) {
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

    getDefaultProps() {
      return {
        path: Immutable.List(),
        tools: Immutable.List(),
        values: Immutable.Map()
      };
    },

    renderTool(tool, index) {

      const Component = rey.inject('uim.' + tool.get('type'));

      if (!Component) {
        console.error(new Error('unknown component type (' + tool.get('type') + ')'));
      }

      if (!Component.pickProps) {
        console.error(new Error('invalid component type (' + tool.get('type') + ')'));
      }

      const props = Component.pickProps(this.props.path, tool, this.props.values);

      return (
        <div key={index} data-tool-name={tool.get('name')} className='tool'>
          <Component {...props}
            onClick={this.props.onClick}
            onChange={this.props.onChange} />
        </div>
      );
    },

    render: function () {

      const classes = {
        toolbar: true,
        [this.props.className]: !!this.props.className
      };

      return (
        <div data-toolbar-name={this.props.name} className={classNames(classes)}>
          {this.props.tools.map(this.renderTool)}
        </div>
      );
    }
  })
]);

// - -------------------------------------------------------------------- - //

// - -------------------------------------------------------------------- - //

'use strict';

rey.component('uim.View', [
  'React', 'Immutable', 'classNames', 'CSSTransitionGroup', 'uim.Loading', 'uim.Toolbar', 'uim.Overlay',
  (React, Immutable, classNames, CSSTransitionGroup, Loading, Toolbar, Overlay ) => ({

    propTypes: {
      header: React.PropTypes.any,
      footer: React.PropTypes.any,
      overlay: React.PropTypes.any,
      isLoading: React.PropTypes.bool,
      className: React.PropTypes.string
    },

    renderOverlay() {
      const hasOverlay = Immutable.List.isList(this.props.overlay)
        ? !!this.props.overlay.size : !!this.props.overlay;
      if (hasOverlay) {
        return (
          <Overlay>
            {this.props.overlay}
          </Overlay>
        );
      }
    },

    renderHeader() {
      let header;
      if (Immutable.List.isList(this.props.header)) {
        header = (
          <Toolbar
            name='header'
            tools={this.props.header}
            onClick={this.props.onClick} />
        );
      } else if (this.props.header) {
        header = this.props.header;
      }
      if (header) {
        return (
          <header className='header'>
            <div className='header-center'>
              {header}
            </div>
          </header>
        );
      }
    },

    renderFooter() {
      let footer;
      if (Immutable.List.isList(this.props.footer)) {
        footer = (
          <Toolbar
            name='footer'
            tools={this.props.footer}
            onClick={this.props.onClick} />
        );
      } else if (this.props.footer) {
        footer = this.props.footer;
      }
      if (footer) {
        return (
          <footer className='footer'>
            <div className='footer-center'>
              {footer}
            </div>
          </footer>
        );
      }
    },

    render() {
      const classes = {
        view: true,
        [this.props.className]: !!this.props.className
      };
      return (
        <div className={classNames(classes)}>
          {this.renderHeader()}
          <main>
            {this.props.children}
            {this.props.isLoading ? <Loading /> : undefined }
          </main>
          {this.renderFooter()}
          <CSSTransitionGroup
            transitionName='overlay'
            transitionEnterTimeout={400}
            transitionLeaveTimeout={120}>
            {this.renderOverlay()}
          </CSSTransitionGroup>
        </div>
      );
    }
  })
]);

// - -------------------------------------------------------------------- - //
