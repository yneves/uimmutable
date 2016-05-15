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
