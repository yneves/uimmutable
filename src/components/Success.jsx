/*!
**  uimmutable -- UI components for Rey framework.
**  Copyright (c) 2016 Yuri Neves Silveira <http://yneves.com>
**  Licensed under The MIT License <http://opensource.org/licenses/MIT>
**  Distributed on <http://github.com/yneves/uimmutable>
*/
// - -------------------------------------------------------------------- - //

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
