import React, { Component } from "react";
import { Button, Card, Col, notification, Row, Select } from "antd";
import { MatchTypes, Months, Teams } from "../../helpers/Teams";
import constants from "../../helpers/constants";
import { post } from "../../helpers/request";

export default class WhoWillWin extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isLoading: false,
    };
  }

  handleSubmit = () => {
    this.setState({ isLoading: true });
    const {
      team_a,
      team_b,
      city,
      month,
      match_type,
      toss_decision,
      venue,
    } = this.state;
    post(constants.URL.PREDICTION.WHO_WILL_WIN, {
      team_a,
      team_b,
      city,
      month,
      match_type,
      toss_decision,
      venue,
    })
      .then((response) => {
        if (response && response.data) {
          console.log(response);
        }
        this.setState({ isLoading: false });
      })
      .catch((error) => {
        this.setState({ isLoading: false });
        notification.error({
          message:
            "There was a problem fetching users, for you. Our team is looking at the issue on our servers.",
        });
      });
  };

  render() {
    return (
      <div>
        <Row gutter={10}>
          <Col span={9}>
            <Card title="Team Data" style={{ width: "100%", borderRadius: 10 }}>
              <div>
                <label>Team A</label>
                <Select
                  onChange={(team_a) => this.setState({ team_a })}
                  placeholder="Select Team A"
                  style={{ width: "100%", borderRadius: 10, marginTop: 5 }}
                >
                  <Select.Option>Pakistan</Select.Option>
                </Select>
              </div>
              <div style={{ marginTop: 10 }}>
                <label>Team B</label>
                <Select
                  onChange={(team_b) => this.setState({ team_b })}
                  placeholder="Select Team B"
                  style={{ width: "100%", borderRadius: 10, marginTop: 5 }}
                >
                  {Teams.map((item) => {
                    return <Select.Option value={item}>{item}</Select.Option>;
                  })}
                </Select>
              </div>
              <div style={{ marginTop: 10 }}>
                <label>Month</label>
                <Select
                  onChange={(month) => this.setState({ month })}
                  placeholder="Select Month"
                  style={{ width: "100%", borderRadius: 10, marginTop: 5 }}
                >
                  {Months.map((item) => {
                    return <Select.Option value={item}>{item}</Select.Option>;
                  })}
                </Select>
              </div>
              <div style={{ marginTop: 10 }}>
                <label>Match Type</label>
                <Select
                  onChange={(match_type) => this.setState({ match_type })}
                  placeholder="Select Match Type"
                  style={{ width: "100%", borderRadius: 10, marginTop: 5 }}
                >
                  {MatchTypes.map((item) => {
                    return <Select.Option value={item}>{item}</Select.Option>;
                  })}
                </Select>
              </div>
              <div style={{ marginTop: 10 }}>
                <label>City</label>
                <Select
                  onChange={(city) => this.setState({ city })}
                  placeholder="Select City"
                  style={{ width: "100%", borderRadius: 10, marginTop: 5 }}
                >
                  <Select.Option value="Karachi">Karachi</Select.Option>
                </Select>
              </div>
              <div style={{ marginTop: 10 }}>
                <label>Toss Decision</label>
                <Select
                  onChange={(toss_decision) => this.setState({ toss_decision })}
                  placeholder="Select Toss Decision"
                  style={{ width: "100%", borderRadius: 10, marginTop: 5 }}
                >
                  <Select.Option value="bat">Bat</Select.Option>
                  <Select.Option value="field">Field</Select.Option>
                </Select>
              </div>
              <div style={{ marginTop: 10 }}>
                <label>Venue</label>
                <Select
                  onChange={(venue) => this.setState({ venue })}
                  placeholder="Select Venue"
                  style={{ width: "100%", borderRadius: 10, marginTop: 5 }}
                >
                  <Select.Option value="National Stadium">
                    National Stadium
                  </Select.Option>
                </Select>
              </div>
              <Button
                type="primary"
                style={{ width: "100%", marginTop: 20 }}
                loading={this.state.isLoading}
                onClick={() => this.handleSubmit()}
              >
                Predict
              </Button>
            </Card>
          </Col>
          <Col span={15}>
            <Card
              title="Our Prediction"
              style={{ width: "100%", borderRadius: 10 }}
            ></Card>
          </Col>
        </Row>
      </div>
    );
  }
}
