/*!
**  uimmutable -- UI components for Rey framework.
**  Copyright (c) 2016 Yuri Neves Silveira <http://yneves.com>
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

      const Component = rey.deps.get('uim.' + tool.get('type'));

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
