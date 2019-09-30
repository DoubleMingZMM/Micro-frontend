import React from 'react';
import BasicLayout from './BasicLayout';
import AuthLayout from './AuthLayout';

const LOGIN_PATHNAME = '/auth/login';

export default props => {
  const { location, children } = props;
  const { pathname } = location;

  if (pathname === LOGIN_PATHNAME) {
    return <AuthLayout>{children}</AuthLayout>;
  }
  return <BasicLayout>{children}</BasicLayout>;
};
