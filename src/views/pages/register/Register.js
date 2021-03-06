import React from "react";
import {
  CButton,
  CCard,
  CCardBody,
  CCardFooter,
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
import { Button, message, notification } from "antd";
import { post } from "../../../helpers/request";
import constants from "../../../helpers/constants";
import "../login/index.css";
import { validateEmail } from "../../../helpers/Validators";

export default class Register extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      isLoading: false,
      fname: "",
      lname: "",
      email: "",
      password: "",
      confirmPassword: "",
    };
  }
  handleSubmit = () => {
    const {
      isLoading,
      fname,
      lname,
      email,
      password,
      confirmPassword,
    } = this.state;
    if (!validateEmail(email)) {
      message.error("Please enter a valid email address");
      return false;
    }
    if (password !== confirmPassword) {
      message.error("Passwords do not match");
      return false;
    }
    if (fname && lname && password && confirmPassword) {
      this.setState({ isLoading: true });
      post(constants.URL.AUTHENTICATION.SIGN_UP, {
        fname,
        lname,
        password,
        email,
      })
        .then((response) => {
          if (response && response.status === 200) {
            notification.success({
              message: "You have been registered with Sports analytics.",
            });
            setTimeout(() => {
              this.props.history.goBack();
              this.setState({ isLoading: false });
            }, 1000);
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
            <CCol md="9" lg="7" xl="6">
              <CCard className="mx-4">
                <CCardBody className="p-4">
                  <CForm>
                    <h1>Register</h1>
                    <p className="text-muted">Create your account</p>
                    <CInputGroup className="mb-3">
                      <CInputGroupPrepend>
                        <CInputGroupText>
                          <CIcon name="cil-user" />
                        </CInputGroupText>
                      </CInputGroupPrepend>
                      <CInput
                        type="text"
                        placeholder="First Name"
                        autoComplete="firstname"
                        value={this.state.fname}
                        onChange={(event) =>
                          this.setState({ fname: event.target.value })
                        }
                      />
                    </CInputGroup>
                    <CInputGroup className="mb-3">
                      <CInputGroupPrepend>
                        <CInputGroupText>
                          <CIcon name="cil-user" />
                        </CInputGroupText>
                      </CInputGroupPrepend>
                      <CInput
                        type="text"
                        placeholder="Last Name"
                        autoComplete="lname"
                        value={this.state.lname}
                        onChange={(event) =>
                          this.setState({ lname: event.target.value })
                        }
                      />
                    </CInputGroup>
                    <CInputGroup className="mb-3">
                      <CInputGroupPrepend>
                        <CInputGroupText>@</CInputGroupText>
                      </CInputGroupPrepend>
                      <CInput
                        value={this.state.email}
                        onChange={(event) =>
                          this.setState({ email: event.target.value })
                        }
                        type="text"
                        placeholder="Email"
                        autoComplete="email"
                      />
                    </CInputGroup>
                    <CInputGroup className="mb-3">
                      <CInputGroupPrepend>
                        <CInputGroupText>
                          <CIcon name="cil-lock-locked" />
                        </CInputGroupText>
                      </CInputGroupPrepend>
                      <CInput
                        type="password"
                        placeholder="Password"
                        autoComplete="new-password"
                        value={this.state.password}
                        onChange={(event) =>
                          this.setState({ password: event.target.value })
                        }
                      />
                    </CInputGroup>
                    <CInputGroup className="mb-4">
                      <CInputGroupPrepend>
                        <CInputGroupText>
                          <CIcon name="cil-lock-locked" />
                        </CInputGroupText>
                      </CInputGroupPrepend>
                      <CInput
                        type="password"
                        placeholder="Repeat password"
                        autoComplete="new-password"
                        value={this.state.confirmPassword}
                        onChange={(event) =>
                          this.setState({ confirmPassword: event.target.value })
                        }
                      />
                    </CInputGroup>
                    <Button
                      type="primary"
                      block
                      loading={this.state.isLoading}
                      onClick={() => {
                        this.handleSubmit();
                      }}
                    >
                      Create Account
                    </Button>
                  </CForm>
                </CCardBody>
              </CCard>
            </CCol>
          </CRow>
        </CContainer>
      </div>
    );
  }
}
