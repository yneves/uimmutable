/*!
**  uimmutable -- UI components for Rey framework.
**  Copyright (c) 2016 Yuri Neves Silveira <http://yneves.com>
**  Licensed under The MIT License <http://opensource.org/licenses/MIT>
**  Distributed on <http://github.com/yneves/uimmutable>
*/
// - -------------------------------------------------------------------- - //

rey.component('uim.View', [
  'React', 'Immutable', 'classNames', 'ReactCSSTransitionGroup', 'uim.Loading', 'uim.Toolbar', 'uim.Overlay',
  (React, Immutable, classNames, CSSTransitionGroup, Loading, Toolbar, Overlay) => ({

    propTypes: {
      header: React.PropTypes.any,
      footer: React.PropTypes.any,
      overlay: React.PropTypes.any,
      isLoading: React.PropTypes.bool,
      className: React.PropTypes.string,
      onClick: React.PropTypes.func
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
