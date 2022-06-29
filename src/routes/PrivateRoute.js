
import React from 'react'
import ScrollRestoration from '../components/common/ScrollRestoration'
import { isLoggedIn } from '../utils'
import { Route, Redirect } from 'react-router-dom'
import toast from '../plugins/toast'
import AppWrapper from '../containers/Common'

const PrivateRoute = ({ component: Component, ...rest }) => {
  return <Route
    {...rest}
    render={(props) => {
      return isLoggedIn("top-challenge-token") ? (
        <Redirect to='/login' />
      ) : (
        <AppWrapper toast={toast} {...props} >
          <ScrollRestoration {...props}>
            <Component {...props} {...rest} toast={toast} />
          </ScrollRestoration>
        </AppWrapper>
      );
    }}
  />
};

export default PrivateRoute