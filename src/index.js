/*!
**  uimmutable -- UI components for Rey framework.
**  Copyright (c) 2016 Yuri Neves Silveira <http://yneves.com>
**  Licensed under The MIT License <http://opensource.org/licenses/MIT>
**  Distributed on <http://github.com/yneves/uimmutable>
*/
// - -------------------------------------------------------------------- - //

import rey from 'rey';
import moment from 'moment';
import window from 'global/window';
import classNames from 'classnames';
import DatePicker from 'react-datepicker';
import DateFormat from './utils/DateFormat.js';
import ValueFormat from './utils/ValueFormat.js';

window.moment = moment;

rey.factory('moment', [() => (moment)]);
rey.factory('classNames', [() => (classNames)]);
rey.factory('uim.DatePicker', [() => (DatePicker)]);
rey.factory('uim.DateFormat', [() => DateFormat]);
rey.factory('uim.ValueFormat', [() => ValueFormat]);

export default rey;
