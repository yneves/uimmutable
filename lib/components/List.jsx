/*!
**  uimmutable -- React components with Immutable powers.
**  Copyright (c) 2015 Yuri Neves Silveira <http://yneves.com>
**  Licensed under The MIT License <http://opensource.org/licenses/MIT>
**  Distributed on <http://github.com/yneves/uimmutable>
*/
// - -------------------------------------------------------------------- - //

"use strict";

rey.component("uim.List", [
  "React", "Immutable", "classNames", "uim.Toolbar", "uim.Paginator",
  function(React, Immutable, classNames, Toolbar, Paginator) {

    return {
      
      propTypes: {
        path: React.PropTypes.List.isRequired,
        name: React.PropTypes.string.isRequired,
        data: React.PropTypes.Map.isRequired,
        columns: React.PropTypes.List.isRequired,
        header: React.PropTypes.bool.isRequired,
        footer: React.PropTypes.any,
        pageUrl: React.PropTypes.string,
        emptyText: React.PropTypes.any,
        onClick: React.PropTypes.func,
        onChange: React.PropTypes.func,
        className: React.PropTypes.string,
        transformColumnsWith: React.PropTypes.func
      },
      
      getDefaultProps: function() {
        return {
          data: Immutable.Map(),
          path: Immutable.List(),
          columns: Immutable.List(),
          header: true
        };
      },
      
      handleClick: function(row, column, event) {
        if (this.props.onClick) {
          event.row = row;
          event.column = column;
          this.props.onClick(event);
        }
      },
      
      handleClickBody: function(event) {
        
        var target = event.target;
        
        while (!target.hasAttribute("data-row-index") || !target.hasAttribute("data-column-index")) {
          target = target.parentNode;
          if (target === document.body) {
            break;
          }
        }
        
        if (target.hasAttribute("data-row-index") && target.hasAttribute("data-column-index")) {
          
          var rowIndex = Number(target.getAttribute("data-row-index"));
          var colIndex = Number(target.getAttribute("data-column-index"));
          
          var row = this.props.data.getIn(["rows", rowIndex]);
          var column = row.getIn(["columns", colIndex]);
          
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
      
      handleChange: function(row, column, event) {
        if (this.props.onChange) {
          event.row = row;
          event.column = column;
          this.props.onChange(event);
        }
      },
      
      renderHeadCol: function(column, index) {
        return (
          <div key={index}
            className="list-column"
            data-column-index={index}
            data-column-name={column.get("name")}>
            {column.get("label")}
          </div>
        );
      },
      
      renderCol: function(row, rowIndex, column, colIndex) {
        
        var Component = rey.inject(column.get("type"));
        
        if (!Component) {
          throw new Error("unknown component type (" + column.get("type") + ")");
        }
        
        if (!Component.pickProps) {
          throw new Error("invalid component type (" + column.get("type") + ")");
        }
        
        var props = Component.pickProps(this.props.path, column, row);
        
        return (
          <div key={colIndex}
            className="list-column"
            data-row-index={rowIndex}
            data-column-index={colIndex}
            data-column-name={column.get("name")}>
            <Component
              {...props}
              onClick={this.handleClick.bind(this, row, column)}
              onChange={this.handleChange.bind(this, row, column)} />
          </div>
        );
      },
      
      renderRow: function(row, rowIndex) {
        
        var columns = this.props.columns;
        
        if (this.props.transformColumnsWith) {
          columns = this.props.transformColumnsWith(columns, row);
        }
        
        return (
          <div key={rowIndex} className="list-row" data-row-index={rowIndex}>
            {columns.map(function(column, colIndex) {
              return this.renderCol(row, rowIndex, column, colIndex);
            }, this)}
          </div>
        );
      },
      
      renderBody: function() {
        var classes = {"list-body": true, "no-foot": !this.props.footer };
        return (
          <div key="body" className={classNames(classes)} onClick={this.handleClickBody}>
            {this.props.data.get("rows").map(this.renderRow)}
          </div>
        );
      },
      
      render: function() {
        
        var classes = { list: true };
        classes[this.props.className] = !!this.props.className;
        
        var content;
        
        var rows = this.props.data.get("rows");
        var count = Number(this.props.data.get("count")) || rows.size;
        var page = count > 0 ? Number(this.props.data.get("page")) || 1 : 0;
        var pages = count > 0 ? Number(this.props.data.get("pages")) || 1 : 0;
        
        if (count > 0) {
          
          content = [];
          
          if (this.props.header === true) {
            content.push(
              <div key="head" className="list-head list-row">
                {this.props.columns.map(this.renderHeadCol)}
              </div>
            );
            
          } else if (Immutable.List.isList(this.props.header)) {
            content.push(
              <div key="head" className="list-head list-row">
                <Toolbar
                  name="header"
                  path={this.props.path.push("header")}
                  tools={this.props.header}
                  values={this.props.data}
                  onClick={this.props.onClick}
                  onChange={this.props.onChange} />
              </div>
            );
          
          } else if (this.props.header) {
            content.push(
              <div key="head" className="list-head list-row">
                {this.props.header}
              </div>
            );
          }
          
          content.push(this.renderBody());
          
        if (Immutable.List.isList(this.props.footer)) {
          content.push(
            <div key="foot" className="list-foot list-row">
              <Toolbar
                name="footer"
                path={this.props.path.push("footer")}
                tools={this.props.footer}
                values={this.props.data}
                onClick={this.props.onClick}
                onChange={this.props.onChange} />
            </div>
          );
        
        } else if (this.props.footer) {
            content.push(
              <div key="foot" className="list-foot list-row">
                <div className="list-column">
                  {this.props.footer}
                </div>
              </div>
            );
          }
          
          if (pages > 1) {
            content.push(
              <Paginator
                key="pages"
                page={page}
                pages={pages}
                pageUrl={this.props.pageUrl} />
            );
          }
          
        } else {
          content = (
            <div className="list-empty">{this.props.emptyText}</div>
          )
        }
        
        return (
          <div data-list-name={this.props.name} className={classNames(classes)}>
            {content}
          </div>
        );
      },
      
    };
  }
]);

// - -------------------------------------------------------------------- - //
