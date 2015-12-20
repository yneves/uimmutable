// - -------------------------------------------------------------------- - //

"use strict";

var { React, Immutable, classNames, CSSTransitionGroup } = require("../libs.js");

var Loading = require("./Loading.jsx");
var Toolbar = require("./Toolbar.jsx");
var Overlay = require("./Overlay.jsx");

// - -------------------------------------------------------------------- - //

var View = React.createClass({
  
  propTypes: {
    header: React.PropTypes.any,
    footer: React.PropTypes.any,
    overlay: React.PropTypes.any,
    isLoading: React.PropTypes.bool,
    className: React.PropTypes.string
  },
  
  renderOverlay: function() {
    if (this.props.overlay) {
      return (
        <Overlay>
          {this.props.overlay}
        </Overlay>
      );
    }
  },
  
  renderHeader: function() {
    
    var header;
    
    if (Immutable.List.isList(this.props.header)) {
      header = (
        <Toolbar
          name="header"
          tools={this.props.header}
          onClick={this.props.onClick} />
      );
      
    } else if (this.props.header) {
      header = this.props.header;
    }
    
    if (header) {
      return (
        <header className="header">
          <div className="header-center">
            {header}
          </div>
        </header>
      );
    }
  },
  
  renderFooter: function() {
    
    var footer;
    
    if (Immutable.List.isList(this.props.footer)) {
      footer = (
        <Toolbar
          name="footer"
          tools={this.props.footer}
          onClick={this.props.onClick} />
      );
      
    } else if (this.props.footer) {
      footer = this.props.footer;
    }
    
    if (footer) {
      return (
        <footer className="footer">
          <div className="footer-center">
            {footer}
          </div>
        </footer>
      );
    }
  },
  
  render: function() {
    
    var classes = { view: true };
    classes[this.props.className] = !!this.props.className;
    
    return (
      <div className={classNames(classes)}>
        {this.renderHeader()}
        <main>
          {this.props.children}
          {this.props.isLoading ? <Loading /> : undefined }
        </main>
        {this.renderFooter()}
        <CSSTransitionGroup
          transitionName="overlay"
          transitionEnterTimeout={400}
          transitionLeaveTimeout={120}>
          {this.renderOverlay()}
        </CSSTransitionGroup>
      </div>
    );
  },
  
});

// - -------------------------------------------------------------------- - //

module.exports = View;

// - -------------------------------------------------------------------- - //
