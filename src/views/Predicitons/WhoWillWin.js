import React, { Component } from "react";
import { Button, Card, Col, notification, Row, Select, Spin } from "antd";
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

  handleSubmit = async () => {
    this.setState({ isLoading: true });
    const {
      team_a,
      team_b,
      city,
      month,
      match_type,
      toss_decision,
      venue,
      toss_won,
    } = this.state;
    let whoWillWin = await post(constants.URL.PREDICTION.WHO_WILL_WIN, {
      team_a,
      team_b,
      city,
      month,
      match_type,
      toss_decision,
      venue,
      toss_won,
    });
    let runRate = await post(constants.URL.PREDICTION.RUN_RATE, {
      match_type,
      batting_team:
        toss_won === team_a && toss_decision === "bat" ? team_a : team_b,
      bowling_team:
        toss_won === team_a && toss_decision === "field" ? team_a : team_b,
      city,
      month,
    });

    if (whoWillWin && runRate) {
      this.setState({
        whoWillWin: whoWillWin.data,
        runRate: runRate.data,
        isLoading: false,
        predicted: true,
      });
    } else {
      this.setState({ error: true, isLoading: false });
    }
    // .then((response) => {
    //   if (response && response.data) {
    //     console.log(response);
    //   }
    //   this.setState({ isLoading: false });
    // })
    // .catch((error) => {
    //   this.setState({ isLoading: false });
    //   notification.error({
    //     message:
    //       "There was a problem fetching users, for you. Our team is looking at the issue on our servers.",
    //   });
    // });
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
                  <Select.Option value="Pakistan">Pakistan</Select.Option>
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
              {this.state.team_a && this.state.team_b ? (
                <div style={{ marginTop: 10 }}>
                  <label>Toss Won</label>
                  <Select
                    onChange={(toss_won) => this.setState({ toss_won })}
                    placeholder="Select Toss Winning Team"
                    style={{ width: "100%", borderRadius: 10, marginTop: 5 }}
                  >
                    <Select.Option value={this.state.team_a}>
                      {this.state.team_a}
                    </Select.Option>
                    <Select.Option value={this.state.team_b}>
                      {this.state.team_b}
                    </Select.Option>
                  </Select>
                </div>
              ) : undefined}
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
            >
              {this.state.isLoading ? (
                <Spin />
              ) : this.state.predicted ? (
                <div>
                  <p>Who Will Win</p>
                </div>
              ) : (
                <div>Please select values to continue.</div>
              )}
            </Card>
          </Col>
        </Row>
      </div>
    );
  }
}
