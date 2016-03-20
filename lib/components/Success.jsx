/*!
**  uimmutable -- React components with Immutable powers.
**  Copyright (c) 2015 Yuri Neves Silveira <http://yneves.com>
**  Licensed under The MIT License <http://opensource.org/licenses/MIT>
**  Distributed on <http://github.com/yneves/uimmutable>
*/
// - -------------------------------------------------------------------- - //

'use strict';

rey.component('uim.Success', [
  'React', 'Immutable', 'classNames', 'uim.Icon',
  function (React, Immutable, classNames, Icon) {

    return {

      propTypes: {
        label: React.PropTypes.string.isRequired,
        message: React.PropTypes.string,
        buttonLabel: React.PropTypes.string.isRequired,
        onClose: React.PropTypes.func.isRequired
      },

      getDefaultProps: function () {
        return {
          buttonLabel: 'OK'
        };
      },

      render: function () {
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

    };
  }
]);

// - -------------------------------------------------------------------- - //
