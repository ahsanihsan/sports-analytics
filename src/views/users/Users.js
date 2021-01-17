import React, { useState, useEffect } from "react";
import { CRow } from "@coreui/react";

import usersData from "./UsersData";
import { notification, Popconfirm, Select, Table } from "antd";
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
    this.getUsers();
  }
  changeRole = (role) => {};
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
        title: "Ban User",
        key: "action",
        render: (text, record) => {
          const isBan = record.isBlackListed === "Yes";
          console.log(record);
          return (
            <div>
              <Popconfirm
                disabled={record.roles === "admin"}
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
                    color: record.roles === "user" ? "#1890ff" : "#e4e4e4",
                    cursor: "pointer",
                    textDecorationLine:
                      record.roles === "user" ? "underline" : undefined,
                  }}
                >
                  {isBan ? "Unban" : "Ban"}
                </p>
              </Popconfirm>
            </div>
          );
        },
      },
      {
        title: "Change User Role",
        key: "change_user_role",
        render: (text, record) => {
          return (
            <Select
              style={{ width: "100%" }}
              placeholder="Select Role"
              defaultValue={record.roles}
              onChange={(value) => this.changeRole(value)}
            >
              <Select.Option value="admin">Admin</Select.Option>
              <Select.Option value="user">User</Select.Option>
            </Select>
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
