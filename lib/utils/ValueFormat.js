/*!
**  uimmutable -- React components with Immutable powers.
**  Copyright (c) 2015 Yuri Neves Silveira <http://yneves.com>
**  Licensed under The MIT License <http://opensource.org/licenses/MIT>
**  Distributed on <http://github.com/yneves/uimmutable>
*/
// - -------------------------------------------------------------------- - //

'use strict';

rey.factory('uim.ValueFormat', [
  'moment', 'uim.DateFormat',
  (moment, DateFormat) => ({

    date: (value) => {
      const date = moment(value, DateFormat.date.output);
      if (date.isValid()) {
        return date.format(DateFormat.date.input);
      }
    },

    time: (value) => {
      const time = moment(value, DateFormat.time.output);
      if (time.isValid()) {
        return time.format(DateFormat.time.input);
      }
    },

    datetime: (value) => {
      const datetime = moment(value, DateFormat.datetime.output);
      if (datetime.isValid()) {
        return datetime.format(DateFormat.datetime.input);
      }
    }

  })
]);