
import React from 'react'
import ScrollRestoration from '../components/common/ScrollRestoration'
import { isLoggedIn } from '../utils'
import { Route, Redirect } from 'react-router-dom'
import toast from '../plugins/toast'
import AppWrapper from '../containers/Common'
import Notification from 'components/common/Notification'

const PrivateRoute = ({ component: Component, ...rest }) => {
  return <Route
    {...rest}
    render={(props) => {
      return !isLoggedIn("agoi-token") ? (
        <Redirect to='/login' />
      ) : (
        <AppWrapper toast={toast} {...props} >
          <ScrollRestoration {...props}>
            <Component {...props} {...rest} toast={toast} KycNotification={<Notification />} />
          </ScrollRestoration>
        </AppWrapper>
      );
    }}
  />
};

export default PrivateRoute