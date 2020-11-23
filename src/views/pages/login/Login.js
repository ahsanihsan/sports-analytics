import React, { Component } from "react";
import { Link } from "react-router-dom";
import {
  CButton,
  CCard,
  CCardBody,
  CCardGroup,
  CCol,
  CContainer,
  CForm,
  CInput,
  CInputGroup,
  CInputGroupPrepend,
  CInputGroupText,
  CRow,
} from "@coreui/react";
import CIcon from "@coreui/icons-react";
import constants from "../../../helpers/constants";

import { Button, message, notification } from "antd";
import { post } from "../../../helpers/request";
import "./index.css";

class Login extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isLoading: false,
      email: "ahsan.ihsan@outlook.com",
      password: "ahsan11343",
    };
  }
  handleSubmit = () => {
    const { email, password } = this.state;
    if (email && password) {
      this.setState({ isLoading: true });
      post(constants.URL.AUTHENTICATION.SIGN_IN, {
        email,
        password,
      })
        .then((response) => {
          this.setState({ isLoading: false });
          if (response && response.status === 200) {
            window.localStorage.setItem("@token", response.data.accessToken);
            window.localStorage.setItem("@role", response.data.roles[0]);
            this.props.history.push("/dashboard");
          } else {
            notification.error({
              message: response.data.message,
            });
          }
        })
        .catch((error) => {
          this.setState({ isLoading: false });
          notification.error({
            message:
              "There is a problem with our website, please try again later.",
          });
        });
    } else {
      message.error("Please enter all data to continue");
    }
  };
  render() {
    return (
      <div className="c-app c-default-layout flex-row main-bg-container">
        <CContainer>
          <div
            style={{
              display: "flex",
              justifyContent: "center",
              marginTop: 100,
              alignItems: "center",
            }}
          >
            <img
              src={require("../../../assets/icons/logo.png")}
              style={{ width: 200, height: 200 }}
            />
            <p style={{ color: "#fff", marginTop: 50, fontSize: 50 }}>
              Sports Analytics
            </p>
          </div>
          <CRow className="justify-content-center" style={{ marginTop: 60 }}>
            <CCol md="8">
              <CCardGroup>
                <CCard className="p-4">
                  <CCardBody>
                    <CForm>
                      <h1>Login</h1>
                      <p className="text-muted">Sign In to your account</p>
                      <CInputGroup className="mb-3">
                        <CInputGroupPrepend>
                          <CInputGroupText>
                            <CIcon name="cil-user" />
                          </CInputGroupText>
                        </CInputGroupPrepend>
                        <CInput
                          type="text"
                          value={this.state.email}
                          onChange={(event) =>
                            this.setState({ email: event.target.value })
                          }
                          placeholder="Email"
                          autoComplete="email"
                        />
                      </CInputGroup>
                      <CInputGroup className="mb-4">
                        <CInputGroupPrepend>
                          <CInputGroupText>
                            <CIcon name="cil-lock-locked" />
                          </CInputGroupText>
                        </CInputGroupPrepend>
                        <CInput
                          value={this.state.password}
                          onChange={(event) =>
                            this.setState({ password: event.target.value })
                          }
                          type="password"
                          placeholder="Password"
                          autoComplete="current-password"
                        />
                      </CInputGroup>
                      <CRow>
                        <CCol xs="6">
                          <Button
                            loading={this.state.isLoading}
                            type="primary"
                            className="px-4"
                            onClick={() => this.handleSubmit()}
                          >
                            Login
                          </Button>
                        </CCol>
                        {/* <CCol xs="6" className="text-right">
                          <CButton color="link" className="px-0">
                            Forgot password?
                          </CButton>
                        </CCol> */}
                      </CRow>
                    </CForm>
                  </CCardBody>
                </CCard>
                <CCard
                  className="text-white py-5 d-md-down-none"
                  style={{ width: "44%" }}
                >
                  <CCardBody className="text-center">
                    <div>
                      <h2>Sign up</h2>
                      <p
                        style={{
                          color: "#768192",
                          marginTop: 20,
                          marginBottom: 20,
                        }}
                      >
                        Our website offers you the best prediction regarding any
                        case that you want, using the best and most efficient
                        algorithms and by predicting the cases using the
                        previous data of all the players, teams and matches.
                      </p>
                      <Button
                        type="primary"
                        className="px-4"
                        onClick={() => this.props.history.push("/register")}
                      >
                        Register Now!
                      </Button>
                      {/* <Link to="/register">
                        <CButton
                          color="primary"
                          className="mt-3"
                          active
                          tabIndex={-1}
                        >
                          Register Now!
                        </CButton>
                      </Link> */}
                    </div>
                  </CCardBody>
                </CCard>
              </CCardGroup>
            </CCol>
          </CRow>
        </CContainer>
      </div>
    );
  }
}

export default Login;
