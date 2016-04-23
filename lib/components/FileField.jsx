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
  function (React, Immutable, classNames, Value, Field, Icon) {

    return {

      statics: {

        pickProps: function (path, field, values) {
          path = field.has('path') ? field.get('path') : path.push(field.get('name'));
          return {
            path: path,
            name: field.get('name'),
            label: field.get('label'),
            className: field.get('className'),
            multiple: field.get('multiple'),
            placeholder: field.get('placeholder'),
            value: values.getIn(path)
          };
        }
      },

      propTypes: {
        path: React.PropTypes.List.isRequired,
        name: React.PropTypes.string.isRequired,
        label: React.PropTypes.string.isRequired,
        input: React.PropTypes.bool.isRequired,
        placeholder: React.PropTypes.string.isRequired,
        multiple: React.PropTypes.bool.isRequired,
        value: React.PropTypes.any,
        onChange: React.PropTypes.func,
        className: React.PropTypes.string
      },

      getInitialState: function () {
        return {
          files: []
        };
      },

      getDefaultProps: function () {
        return {
          multiple: false,
          placeholder: 'Browse file...'
        };
      },

      getFiles: function () {
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

      onBrowseFile: function (event) {
        var files = Array.prototype.slice.call(this.refs.input.files);
        if (this.props.multiple) {
          files = this.state.files.concat(files);
        }
        this.setState({
          files: files
        }, this.handleChange.bind(this, event));
        this.refs.input.value = '';
      },

      handleChange: function (event) {
        if (this.props.onChange) {
          this.props.onChange({
            name: this.props.name,
            path: this.props.path,
            value: this.props.multiple ? this.state.files : this.state.files[0],
            event: event
          });
        }
      },

      renderInput: function () {
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

      onClickFile: function (file, event) {
        if (this.props.onClick) {
          this.props.onClick({
            name: this.props.name,
            path: this.props.path,
            value: file,
            event: event
          });
        }
      },

      onRemoveFile: function (removedFile, event) {
        event.stopPropagation();
        this.setState({
          files: this.state.files.filter(function (file) {
            return file !== removedFile;
          })
        }, this.handleChange.bind(this, event));
      },

      renderFile: function (file, index) {
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

      renderContent: function () {
        return (
          <div className='file-field-content'>
            {this.renderInput()}
            {this.getFiles().map(this.renderFile, this)}
          </div>
        );
      },

      render: function () {

        var classes = {};
        classes['file-field'] = true;
        classes[this.props.className] = !!this.props.className;

        return (
          <Field ref='field'
            name={this.props.name}
            label={this.props.label}
            className={classNames(classes)}>
            {this.renderContent()}
          </Field>
        );
      }
    };
  }
]);

// - -------------------------------------------------------------------- - //
