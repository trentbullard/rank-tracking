import _ from 'lodash';

export const isEmpty = obj => _.isUndefined(obj) || _.isNull(obj) || _.isEmpty(obj) || obj === 'undefined' || obj === 'null' || obj === 'empty';
