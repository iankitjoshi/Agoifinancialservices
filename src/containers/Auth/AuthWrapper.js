import React from "react";
import { Grid } from '@material-ui/core';
import logo from '../../assets/images/logo.png'

export default function AuthWrapper(props) {
  return (
    <div className="inner-width">
      <Grid className="d-flex login-custom-width">
        <Grid  className="form-wrapper d-flex align-items-center">
          {props.children}
        </Grid>
      </Grid>
    </div>
  )
}