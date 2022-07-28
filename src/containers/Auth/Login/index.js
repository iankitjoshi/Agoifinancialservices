import React, { Component } from "react";
import { withTranslation } from "react-i18next";
import { connect } from "react-redux";
import InputField from '../../../components/common/InputField';
import * as actions from '../actions';
import { validateLogin } from '../validations';
import {
  Grid,
  Button,
  FormControlLabel,
  Checkbox,
  CircularProgress,
} from '@material-ui/core';
import AuthWrapper from '../AuthWrapper'
import { rememberMe, getObject, saveObject } from "../../../utils";


class Login extends Component {
  state = {
    mobile_number: "",
    password: "",
    errors: {},
    checked: false,
  }


  handleChecked = () => {
    this.setState({ checked: !this.state.checked })
  }

  handleChange = (e) => {
    const { errors } = this.state
    let { value = "", name = "" } = e.target;
    this.setState({ [name]: value, errors: { ...errors, [name]: "" } });
  };

  isValid = () => {
    const { mobile_number, password } = this.state;
    const { isValid = true, errors = {} } = validateLogin({ mobile_number, password })
    this.setState({ errors });
    return isValid;
  }

  handleSubmit = (e) => {
    e.preventDefault();

    let { mobile_number, password, checked } = this.state;
    const { toast } = this.props;
    // this.props.history.push("/shares");
    
    if (this.isValid()) {
      const formData = {
        mobile_number : Number(mobile_number),
        password
      }
      this.props.login(formData).then((res) => {

        this.props.history.push("/shares");
        toast.success((res && res.message) || "Logged in successfully.");
        this.props.GetAdminDetails()
      }).catch(err => {
        toast.error(err.message || "Something went wrong.")
      })
    }
  };

  handleForgotPassword = () => {
    this.props.history.push("/forgot-password")
  }

  render() {
    const { isLoading } = this.props;
    const { errors, mobile_number, password } = this.state;

    return (
      <AuthWrapper>
        <form className="full-w login-custom custom-width" onSubmit={this.handleSubmit} method="POST" enctype="multipart/form-data">
          <h6 className="d-flex justify-content-center">Log In to Your Account</h6>
          <Grid item xs={12} sm={12} md={12} lg={12} className="mt-3 input-group">
            <InputField
              name="mobile_number"
              type="text"
              label="Mobile Number"
              fullWidth
              value={mobile_number}
              placeholder="Please Enter Mobile Number"
              onChange={this.handleChange}
              error={errors.mobile_number}
            />
          </Grid>
          <Grid item xs={12} sm={12} md={12} lg={12} className="my-3 input-group">
            <InputField
              className="password-input"
              name="password"
              fullWidth
              variant="outlined"
              type="password"
              label="Password"
              placeholder="Please Enter Password "
              value={password}
              onChange={this.handleChange}
              error={errors.password}
            />
          </Grid>
          <Grid item xs={12} sm={12} md={12} lg={12} className="text-center">
            <Button
              type="submit"
              variant="contained"
              className="button-btn new-btn-color"
              disabled={isLoading}
              fullWidth
            >
              {isLoading ? <CircularProgress size="26px" color="white" /> : "Log In"}
            </Button>
          </Grid>
        </form>
      </AuthWrapper>
    );
  }
}

function mapStateToProps(state) {
  return {
    isLoading: state.auth.isLoading
  }
}

function mapDispatchToProps(dispatch) {
  return {
    login: (data) => dispatch(actions.login(data)),
  }
}

export default withTranslation("translations")(connect(mapStateToProps, mapDispatchToProps)(Login));


