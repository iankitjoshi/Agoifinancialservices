
import React from 'react'
import ScrollRestoration from '../components/common/ScrollRestoration'
import PublicMain from '../containers/PublicMain'
import { isLoggedIn } from '../utils'
import { Route, Redirect } from 'react-router-dom'
import toast from '../plugins/toast'


const PublicRoute = ({ component: Component, path }) => {
  return (
    <Route
      exact
      path={path}
      render={(props) => {
        return isLoggedIn("agoi-token") && path == "/login" ? (
          <Redirect to="/shares" />
        ) : path === "/" ? <Redirect to="/login" /> : (
          <PublicMain {...props}>
            <ScrollRestoration {...props}>
              <Component {...props} toast={toast} />
            </ScrollRestoration>
          </PublicMain>
        );
      }}
    ></Route>
  );
};

export default PublicRoute