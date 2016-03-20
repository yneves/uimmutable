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
  function (React, Immutable, classNames, IconButton) {

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
        onClick: React.PropTypes.func,
        onChange: React.PropTypes.func
      },

      getDefaultProps: function () {
        return {
          path: Immutable.List(),
          input: true,
          collapsed: false,
          multiple: false
        };
      },

      onClickAddEntry: function (event) {
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

      onClickRemoveEntry: function (entryIndex, event) {
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

      renderField: function (path, field, index) {

        var Component = rey.inject('uim.' + field.get('type'));

        if (!Component) {
          console.error(new Error('unknown component type (' + field.get('type') + ')'));
        }

        if (!Component.pickProps) {
          console.error(new Error('invalid component type (' + field.get('type') + ')'));
        }

        var props = Component.pickProps(path, field, this.props.values);

        return (
          <Component
            key={index}
            {...props}
            input={this.props.input}
            onClick={this.props.onClick}
            onChange={this.props.onChange} />
        );
      },

      renderEntry: function (entryIndex) {
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
              {this.props.fields.map(function (field, index) {
                return this.renderField(this.props.path.push(entryIndex), field, index);
              }, this)}
            </div>
          </div>
        );
      },

      wrapEntries: function (children) {
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

      renderFields: function () {

        var content;

        if (this.props.multiple) {

          var children = [];

          var entries = this.props.values.getIn(this.props.path);
          if (Immutable.Map.isMap(entries)) {
            entries.forEach(function (entry, entryIndex) {
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
          content = this.props.fields.map(function (field, index) {
            return this.renderField(this.props.path, field, index);
          }, this);
        }

        return content;
      },

      render: function () {

        var classes = { 'field-group': true };
        classes['field-group-multiple'] = !!this.props.multiple;
        classes[this.props.className] = !!this.props.className;

        var style = {};
        if (this.props.collapsed) {
          style.display = 'none';
        }

        return (
          <div className={classNames(classes)} style={style}>
            {this.renderFields()}
          </div>
        );
      }

    };
  }
]);

// - -------------------------------------------------------------------- - //
