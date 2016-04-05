/*!
**  uimmutable -- React components with Immutable powers.
**  Copyright (c) 2015 Yuri Neves Silveira <http://yneves.com>
**  Licensed under The MIT License <http://opensource.org/licenses/MIT>
**  Distributed on <http://github.com/yneves/uimmutable>
*/
// - -------------------------------------------------------------------- - //

'use strict';

rey.component('uim.List', [
  'React', 'Immutable', 'classNames', 'uim.Toolbar', 'uim.Paginator',
  function (React, Immutable, classNames, Toolbar, Paginator) {

    return {

      statics: {

        pickProps: function (path, field, values) {
          path = field.has('path') ? field.get('path') : path.push(field.get('name'));
          return {
            path: path,
            name: field.get('name'),
            label: field.get('label'),
            data: field.get('data'),
            columns: field.get('columns'),
            header: field.get('header'),
            footer: field.get('footer'),
            empty: field.get('empty'),
            className: field.get('className')
          };
        }
      },

      propTypes: {
        path: React.PropTypes.List.isRequired,
        name: React.PropTypes.string.isRequired,
        data: React.PropTypes.Map.isRequired,
        rows: React.PropTypes.List,
        columns: React.PropTypes.List.isRequired,
        header: React.PropTypes.bool.isRequired,
        footer: React.PropTypes.any,
        pageUrl: React.PropTypes.string,
        empty: React.PropTypes.any,
        onClick: React.PropTypes.func,
        onChange: React.PropTypes.func,
        className: React.PropTypes.string,
        transformColumnsWith: React.PropTypes.func
      },

      getDefaultProps: function () {
        return {
          data: Immutable.Map(),
          path: Immutable.List(),
          columns: Immutable.List(),
          header: true
        };
      },

      handleClick: function (row, column, event) {
        if (this.props.onClick) {
          event.row = row;
          event.column = column;
          this.props.onClick(event);
        }
      },

      isValidTarget: function (target) {
        return (
          target.hasAttribute('data-row-index') &&
          target.hasAttribute('data-column-index')
        );
      },

      handleClickBody: function (event) {

        var target = event.target;

        while (!this.isValidTarget(target)) {
          target = target.parentNode;
          if (target === document.body) {
            break;
          }
        }

        if (this.isValidTarget(target)) {

          var rowIndex = Number(target.getAttribute('data-row-index'));
          var colIndex = Number(target.getAttribute('data-column-index'));

          var row = this.getRow(rowIndex);
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

      handleChange: function (row, column, event) {
        if (this.props.onChange) {
          event.row = row;
          event.column = column;
          this.props.onChange(event);
        }
      },

      renderHeadCol: function (column, index) {
        return (
          <div key={index}
            className='list-column'
            data-column-index={index}
            data-column-name={column.get('name')}>
            {column.get('label')}
          </div>
        );
      },

      renderCol: function (row, rowIndex, column, colIndex) {

        var Component = rey.inject('uim.' + column.get('type'));

        if (!Component) {
          throw new Error('unknown component type (' + column.get('type') + ')');
        }

        if (!Component.pickProps) {
          throw new Error('invalid component type (' + column.get('type') + ')');
        }

        var props = Component.pickProps(this.props.path, column, row);

        return (
          <div key={colIndex}
            className='list-column'
            data-row-index={rowIndex}
            data-column-index={colIndex}
            data-column-name={column.get('name')}>
            <Component
              {...props}
              onClick={this.handleClick.bind(this, row, column)}
              onChange={this.handleChange.bind(this, row, column)} />
          </div>
        );
      },

      renderRow: function (row, rowIndex) {

        var columns = this.props.columns;
        if (this.props.transformColumnsWith) {
          columns = this.props.transformColumnsWith(columns, row);
        }

        return (
          <div key={rowIndex} className='list-row' data-row-index={rowIndex}>
            {columns.map(function (column, colIndex) {
              return this.renderCol(row, rowIndex, column, colIndex);
            }, this)}
          </div>
        );
      },

      getRow: function (index) {
        var row;
        if (Immutable.List.isList(this.props.rows)) {
          row = this.props.rows.get(index);
        } else if (Immutable.List.isList(this.props.data.get('rows'))) {
          row = this.props.data.getIn(['rows', index]);
        }
        return row;
      },

      getRows: function () {
        var rows = this.props.rows;
        if (!Immutable.List.isList(rows)) {
          rows = this.props.data.get('rows');
        }
        if (!Immutable.List.isList(rows)) {
          rows = Immutable.List();
        }
        return rows;
      },

      countRows: function () {
        var count = 0;
        if (this.props.data.has('count')) {
          count = this.props.data.get('count');
        } else {
          count = this.getRows().size;
        }
        return count;
      },

      renderBody: function () {
        var classes = {'list-body': true, 'no-foot': !this.props.footer };
        return (
          <div key='body' className={classNames(classes)} onClick={this.handleClickBody}>
            {this.getRows().map(this.renderRow)}
          </div>
        );
      },

      renderHeader: function () {

        var content;

        if (this.props.header === true) {

          content = (
            <div key='head' className='list-head list-row'>
              {this.props.columns.map(this.renderHeadCol)}
            </div>
          );

        } else if (Immutable.List.isList(this.props.header)) {

          content = (
            <div key='head' className='list-head list-row'>
              <Toolbar
                name='header'
                path={this.props.path.push('header')}
                tools={this.props.header}
                values={this.props.data}
                onClick={this.props.onClick}
                onChange={this.props.onChange} />
            </div>
          );

        } else if (this.props.header) {

          content = (
            <div key='head' className='list-head list-row'>
              {this.props.header}
            </div>
          );

        }

        return content;
      },

      renderFooter: function () {

        var content;

        if (Immutable.List.isList(this.props.footer)) {

          content = (
            <div key='foot' className='list-foot list-row'>
              <Toolbar
                name='footer'
                path={this.props.path.push('footer')}
                tools={this.props.footer}
                values={this.props.data}
                onClick={this.props.onClick}
                onChange={this.props.onChange} />
            </div>
          );

        } else if (this.props.footer) {

          content = (
            <div key='foot' className='list-foot list-row'>
              <div className='list-column'>
                {this.props.footer}
              </div>
            </div>
          );
        }

        return content;
      },

      renderPages: function () {

        var content;

        if (this.props.data.has('pages') && this.props.data.has('page')) {

          var count = this.countRows();
          var page = count > 0 ? Number(this.props.data.get('page')) || 1 : 0;
          var pages = count > 0 ? Number(this.props.data.get('pages')) || 1 : 0;

          if (pages > 1) {
            content = (
              <Paginator
                key='pages'
                page={page}
                pages={pages}
                pageUrl={this.props.pageUrl} />
            );
          }
        }

        return content;
      },

      render: function () {

        var classes = { list: true };
        classes[this.props.className] = !!this.props.className;

        var content;

        if (this.countRows() > 0 || !this.props.empty) {

          content = [
            this.renderHeader(),
            this.renderBody(),
            this.renderFooter(),
            this.renderPages()
          ];

        } else {
          content = (
            <div className='list-empty'>{this.props.empty}</div>
          )
        }

        return (
          <div data-list-name={this.props.name} className={classNames(classes)}>
            {content}
          </div>
        );
      }

    };
  }
]);

// - -------------------------------------------------------------------- - //
