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
import { message } from "antd";
import { post } from "../../../helpers/request";
import constants from "../../../helpers/constants";

<<<<<<< HEAD
export default class Register extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      isLoading: false,
      username: "ahsanihsan",
      fname: "Ahsan",
      lname: "Ihsan",
      email: "ahsan.ihsan@outlook.com",
      password: "ahsan11343",
      confirmPassword: "ahsan11343",
    };
  }
  handleSubmit = () => {
    const {
      isLoading,
      username,
      fname,
      lname,
      email,
      password,
      confirmPassword,
    } = this.state;
    if (username && fname && lname && password && confirmPassword) {
      this.setState({ isLoading: true });
      post(constants.URL.AUTHENTICATION.SIGN_UP, {
        username,
        fname,
        lname,
        password,
        email,
      })
        .then((response) => {
          console.log("****** RESPONSE *****");
          console.log(response);
          console.log("****** RESPONSE *****");
        })
        .catch((error) => {
          console.log("****** ERROR *****");
          console.log(error);
          console.log("****** ERROR *****");
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
                        <CInputGroupText>
                          <CIcon name="cil-user" />
                        </CInputGroupText>
                      </CInputGroupPrepend>
                      <CInput
                        type="text"
                        placeholder="Username"
                        value={this.state.username}
                        autoComplete="username"
                        onChange={(event) =>
                          this.setState({ username: event.target.value })
                        }
                      />
                    </CInputGroup>
                    <CInputGroup className="mb-3">
                      <CInputGroupPrepend>
                        <CInputGroupText>@</CInputGroupText>
                      </CInputGroupPrepend>
                      <CInput
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
                    <CButton
                      color="success"
                      block
                      onClick={() => this.handleSubmit()}
                    >
                      Create Account
                    </CButton>
                  </CForm>
                </CCardBody>
              </CCard>
            </CCol>
          </CRow>
        </CContainer>
      </div>
    );
  }
=======
const Register = () => {
  return (
    <div className="c-app c-default-layout flex-row align-items-center">
      <CContainer>
        <CRow className="justify-content-center">
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
                    <CInput type="text" placeholder="Username" autoComplete="username" />
                  </CInputGroup>
                  <CInputGroup className="mb-3">
                    <CInputGroupPrepend>
                      <CInputGroupText>@</CInputGroupText>
                    </CInputGroupPrepend>
                    <CInput type="text" placeholder="Email" autoComplete="email" />
                  </CInputGroup>
                  <CInputGroup className="mb-3">
                    <CInputGroupPrepend>
                      <CInputGroupText>
                        <CIcon name="cil-lock-locked" />
                      </CInputGroupText>
                    </CInputGroupPrepend>
                    <CInput type="password" placeholder="Password" autoComplete="new-password" />
                  </CInputGroup>
                  <CInputGroup className="mb-4">
                    <CInputGroupPrepend>
                      <CInputGroupText>
                        <CIcon name="cil-lock-locked" />
                      </CInputGroupText>
                    </CInputGroupPrepend>
                    <CInput type="password" placeholder="Repeat password" autoComplete="new-password" />
                  </CInputGroup>
                  <CButton color="success" block>Create Account</CButton>
                </CForm>
              </CCardBody>
            </CCard>
          </CCol>
        </CRow>
      </CContainer>
    </div>
  )
>>>>>>> 9226148467e7a6b3519d94d99fcc66ccfc010f6c
}
