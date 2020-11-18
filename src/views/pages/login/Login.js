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

import { message, notification } from "antd";
import { post } from "../../../helpers/request";

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
    const { isLoading, email, password } = this.state;
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
            this.props.history.push("/dashboard");
          } else {
            notification.error({
              message: response.data.message,
            });
          }
        })
        .catch((error) => {
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
      <div className="c-app c-default-layout flex-row align-items-center">
        <CContainer>
          <CRow className="justify-content-center">
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
                          <CButton
                            color="primary"
                            className="px-4"
                            onClick={() => this.handleSubmit()}
                          >
                            Login
                          </CButton>
                        </CCol>
                        <CCol xs="6" className="text-right">
                          <CButton color="link" className="px-0">
                            Forgot password?
                          </CButton>
                        </CCol>
                      </CRow>
                    </CForm>
                  </CCardBody>
                </CCard>
                <CCard
                  className="text-white bg-primary py-5 d-md-down-none"
                  style={{ width: "44%" }}
                >
                  <CCardBody className="text-center">
                    <div>
                      <h2>Sign up</h2>
                      <p>
                        Lorem ipsum dolor sit amet, consectetur adipisicing
                        elit, sed do eiusmod tempor incididunt ut labore et
                        dolore magna aliqua.
                      </p>
                      <Link to="/register">
                        <CButton
                          color="primary"
                          className="mt-3"
                          active
                          tabIndex={-1}
                        >
                          Register Now!
                        </CButton>
                      </Link>
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
