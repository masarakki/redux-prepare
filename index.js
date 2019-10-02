import React from 'react';
import { connect, useStore, useDispatch } from 'react-redux';
import _ from 'lodash';

const config = {
  preparing: null,
  notFound: null,
};

export default config;

export const prepare = (fetches) => (Component) => {
  const Wrapper = ({props, fetches}) => {

    if (fetches.some((func, key) => props[key] === null)) {
      return config.notFound;
    }

    const preparings = fetches.filter((func, key) => props[key] === undefined);
    if (preparings.size() > 0) {
      preparings.each(func => func());
      return config.preparing;
    }
    return <Component {...props} />;
  };

  return connect(null, fetches, (state, fetches, props) => ({ fetches: _(fetches), props }))(Wrapper);
};
