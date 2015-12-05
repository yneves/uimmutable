/*!
**  uimmutable -- React components with Immutable powers.
**  Copyright (c) 2015 Yuri Neves Silveira <http://yneves.com>
**  Licensed under The MIT License <http://opensource.org/licenses/MIT>
**  Distributed on <http://github.com/yneves/uimmutable>
*/
// - -------------------------------------------------------------------- - //

"use strict";

var React = require("react-immutable");
var Immutable = require("immutable");
var classNames = require("classnames");

var Icon = require("./Icon.jsx");
var Link = require("./Link.jsx");
var Menu = require("./Menu.jsx");
var Button = require("./Button.jsx");
var LinkButton = require("./LinkButton.jsx");
var SelectButton = require("./SelectButton.jsx");
var Value = require("./Value.jsx");
var Renderer = require("./Renderer.jsx");
var Paginator = require("./Paginator.jsx");

// - -------------------------------------------------------------------- - //

var List = React.createClass({
  
  propTypes: {
    path: React.PropTypes.List.isRequired,
    name: React.PropTypes.string.isRequired,
    data: React.PropTypes.Map.isRequired,
    columns: React.PropTypes.List.isRequired,
    pageUrl: React.PropTypes.string,
    emptyText: React.PropTypes.any,
    onClick: React.PropTypes.func,
    onChange: React.PropTypes.func,
    className: React.PropTypes.string
  },
  
  getDefaultProps: function() {
    return {
      data: Immutable.Map(),
      path: Immutable.List(),
      columns: Immutable.List(),
      types: Immutable.Map({
        Icon: Icon,
        Menu: Menu,
        Link: Link,
        Value: Value,
        Button: Button,
        LinkButton: LinkButton,
        SelectButton: SelectButton
      })
    };
  },
  
  handleClick: function(row, column, event) {
    if (this.props.onClick) {
      event.row = row;
      event.column = column;
      this.props.onClick(event);
    }
  },
  
  handleClickRow: function(row, event) {
    if (this.props.onClick) {
      this.props.onClick({
        name: this.props.name,
        path: this.props.path,
        row: row,
        event: event
      });
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
      <div key={index} data-column-name={column.get("name")} className="list-column">
        {column.get("label")}
      </div>
    );
  },
  
  renderCol: function(row, column, index) {
    var extraProps = {
      onClick: this.handleClick.bind(this, row, column),
      onChange: this.handleChange.bind(this, row, column)
    };
    return (
      <div key={index} data-column-name={column.get("name")} className="list-column">
        <Renderer
          key={index}
          path={this.props.path}
          field={column}
          values={row}
          types={this.props.types}
          extraProps={extraProps} />
      </div>
    );
  },
  
  renderRow: function(row, index) {
    return (
      <div key={index} className="list-row" onClick={this.handleClickRow.bind(this, row)}>
        {this.props.columns.map(this.renderCol.bind(this, row))}
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
      content = [
        <div key="head" className="list-head list-row">
          {this.props.columns.map(this.renderHeadCol)}
        </div>
        ,
        <div key="body" className="list-body">
          {rows.map(this.renderRow)}
        </div>
      ];
      
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
  
});

// - -------------------------------------------------------------------- - //

module.exports = List;

// - -------------------------------------------------------------------- - //
