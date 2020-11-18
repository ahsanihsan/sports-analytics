import React, { useState, useEffect } from "react";
import { CRow } from "@coreui/react";

import usersData from "./UsersData";
import { notification, Table } from "antd";
import { get } from "../../helpers/request";
import constants from "../../helpers/constants";

class Users extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      isLoading: true,
    };
  }
  componentDidMount() {
    get(constants.URL.USER.GET_ALL_USERS)
      .then((response) => {
        if (response && response.data) {
          let users = response.data;
          users.map((item) => {
            item.roles = item.roles[0].name;
          });
          console.log(users);
          this.setState({ users, isLoading: false });
        }
      })
      .catch((error) => {
        notification.error({
          message:
            "There was a problem fetching users, for you. Our team is looking at the issue on our servers.",
        });
      });
  }
  render() {
    const columns = [
      {
        title: "First Name",
        dataIndex: "fname",
        key: "fname",
      },
      {
        title: "Last Name",
        dataIndex: "lname",
        key: "lname",
      },
      {
        title: "Email",
        dataIndex: "email",
        key: "email",
      },
      {
        title: "Role",
        dataIndex: "roles",
        key: "roles",
      },
    ];
    return (
      <CRow>
        <Table
          dataSource={this.state.users}
          columns={columns}
          bordered
          loading={this.state.isLoading}
          style={{ width: "100%" }}
        />
      </CRow>
    );
  }
}

export default Users;
