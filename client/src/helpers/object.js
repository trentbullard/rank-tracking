import _ from 'lodash';

export const isFalse = obj => (
  _.isUndefined(obj)
  || _.isNull(obj)
  || (_.isEmpty(obj) && (_.isString(obj) || _.isArray(obj) || _.isPlainObject(obj)))
  || obj === 'undefined'
  || obj === 'null'
  || obj === 'empty'
  || obj === 'false'
  || obj === '0'
  || obj === 0
  || obj === false
);

export const isTrue = obj => !isFalse(obj);
