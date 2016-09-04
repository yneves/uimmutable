/*!
**  uimmutable -- UI components for Rey framework.
**  Copyright (c) 2016 Yuri Neves Silveira <http://yneves.com>
**  Licensed under The MIT License <http://opensource.org/licenses/MIT>
**  Distributed on <http://github.com/yneves/uimmutable>
*/
// - -------------------------------------------------------------------- - //

'use strict';

rey.factory('uim.DateFormat', [() => ({

  date: {
    input: 'DD/MM/YYYY',
    output: 'YYYY-MM-DD'
  },

  time: {
    input: 'HH:mm',
    output: 'HH:mm:ss'
  },

  datetime: {
    input: 'DD/MM/YYYY HH:mm',
    output: 'YYYY-MM-DD HH:mm:ss'
  }

})]);
