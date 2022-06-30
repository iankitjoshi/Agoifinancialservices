import React, { Component } from "react"
import { BrowserRouter, Switch, Route } from "react-router-dom"
import PublicRoute from './PublicRoute'
import PrivateRoute from './PrivateRoute'

import Login from '../containers/Auth/Login'
import NotFound from '../containers/NotFound'
import User from "../containers/User"
import Shares from "containers/Share"
import SingleUserDetails from "containers/User/SingleUserDetails/userDetails"
import KYC from "containers/KYC"
import SingleKYCDetails from '../containers/KYC/SingleKYC/singleKYC';
import Settings from "../containers/Settings"
import Order from "containers/Order"



class Routes extends Component {
  state = {
    severity: 'success'
  }
  idleTimer = null

  notification = (message, severity) => {
    this.setState({ severity }, () => {
      this.not.open(message)
    })
  }

  render() {
    return (
      <React.Fragment>
        <BrowserRouter>
          <Switch>
            <PublicRoute exact path="/" component={Login} notification={this.notification} />
            <PublicRoute exact path="/login" component={Login} notification={this.notification} />

            <PrivateRoute exact path="/shares" component={Shares} notification={this.notification} />
            
            <PrivateRoute exact path="/user" component={User} notification={this.notification} />
            <PrivateRoute exact path="/user/:userId" component={SingleUserDetails} notification={this.notification} />
            
            <PrivateRoute exact path="/kyc" component={KYC} notification={this.notification} />
            <PrivateRoute exact path="/kyc/:kycId" component={SingleKYCDetails} notification={this.notification} />
            <PrivateRoute exact path="/order" component={Order} notification={this.notification} />
            <PrivateRoute exact path="/settings" component={Settings} notification={this.notification} />

            <Route component={NotFound} />
          </Switch>
        </BrowserRouter>
      </React.Fragment>

    );
  }
}

export default Routes;
