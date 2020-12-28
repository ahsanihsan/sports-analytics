import React, { useState, useEffect } from "react";
import { CRow } from "@coreui/react";

import usersData from "./UsersData";
import { notification, Popconfirm, Table } from "antd";
import { get, post } from "../../helpers/request";
import constants from "../../helpers/constants";

class Users extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      isLoading: true,
    };
  }
  getUsers = () => {
    get(constants.URL.USER.GET_ALL_USERS)
      .then((response) => {
        if (response && response.data) {
          let users = response.data;
          users.map((item) => {
            item.roles = item.roles[0].name;
            item.isBlackListed = item.isBlackListed ? "Yes" : "No";
          });
          this.setState({ users, isLoading: false });
        }
      })
      .catch((error) => {
        notification.error({
          message:
            "There was a problem fetching users, for you. Our team is looking at the issue on our servers.",
        });
      });
  };

  blackListUser = (id) => {
    this.setState({ isLoading: true });
    post(constants.URL.USER.BLACK_LIST_USER + id)
      .then((response) => {
        if (response && response.data) {
          this.getUsers();
        }
      })
      .catch((error) => {
        notification.error({
          message:
            "There was a problem fetching users, for you. Our team is looking at the issue on our servers.",
        });
      });
  };
  componentDidMount() {
    // const role = window.localStorage.getItem("@role");
    // const isAdmin = role === "ROLE_ADMIN";
    // if (!isAdmin) this.props.history.goBack();
    // if (isAdmin)
    this.getUsers();
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
      {
        title: "Blacklisted",
        dataIndex: "isBlackListed",
        key: "isBlackListed",
      },
      {
        title: "Action",
        key: "action",
        render: (text, record) => {
          console.log(record);
          const isBan = record.isBlackListed === "Yes";
          return (
            <div>
              <Popconfirm
                onConfirm={() => this.blackListUser(record._id)}
                title={
                  "Are you sure you would like to " +
                  (isBan ? "unban " : "ban ") +
                  record.fname +
                  " from sports analytics?"
                }
                okText="Yes"
                cancelText="No"
              >
                <p
                  style={{
                    color: "#1890ff",
                    cursor: "pointer",
                    textDecorationLine: "underline",
                  }}
                >
                  {isBan ? "Unban" : "Ban"}
                </p>
              </Popconfirm>
            </div>
          );
        },
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
