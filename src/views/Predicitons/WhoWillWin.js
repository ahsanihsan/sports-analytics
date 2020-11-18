import React, { Component } from "react";
import { Button, Card, Col, notification, Row, Select, Spin } from "antd";
import { MatchTypes, Months, Teams } from "../../helpers/Teams";
import constants from "../../helpers/constants";
import { post } from "../../helpers/request";
import { CWidgetDropdown } from "@coreui/react";
import ChartBarSimple from "../charts/ChartBarSimple";
import ChartLineSimple from "../charts/ChartLineSimple";
import { CChartBar } from "@coreui/react-chartjs";

export default class WhoWillWin extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isLoading: false,
      team_a: "Pakistan",
      team_b: "India",
      month: "January",
      match_type: "ODI",
      city: "Karachi",
      toss_won: "Pakistan",
      toss_decision: "bat",
      venue: "National Stadium",
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

    let teamScore = await post(constants.URL.PREDICTION.SCORE_OF_TEAMS, {
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
      let totalScore = 0;
      let runRateRound = [];
      runRate.data.prediction.map((item) => {
        runRateRound.push(Math.round(item));
        const perTenOvers = item * 10;
        totalScore += perTenOvers;
      });
      this.setState({
        whoWillWin: whoWillWin.data,
        runRate: runRate.data,
        totalScore: Math.round(totalScore),
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
                  value={this.state.team_a}
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
                  value={this.state.team_b}
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
                  value={this.state.month}
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
                  value={this.state.match_type}
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
                  value={this.state.city}
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
                    value={this.state.toss_won}
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
                  value={this.state.toss_decision}
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
                  value={this.state.venue}
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
              title="Winner Team Prediction"
              style={{ width: "100%", borderRadius: 10 }}
            >
              {this.state.isLoading ? (
                <Spin />
              ) : this.state.predicted ? (
                <div>
                  <Row gutter={10}>
                    <Col span={12}>
                      <CWidgetDropdown
                        color="gradient-warning"
                        header={this.state.whoWillWin.prediction}
                        text="Winner Team"
                        footerSlot={
                          <ChartLineSimple
                            dataPoints={this.state.runRate.prediction}
                            className="mt-3"
                            style={{ height: "70px" }}
                            backgroundColor="rgba(255,255,255,.2)"
                            options={{
                              elements: { line: { borderWidth: 2.5 } },
                            }}
                            pointHoverBackgroundColor="warning"
                            label="Run Rate"
                            labels="runrate"
                          />
                        }
                      />
                    </Col>
                    <Col span={12}>
                      <CWidgetDropdown
                        color="gradient-primary"
                        header={this.state.totalScore}
                        text="Team Total Score"
                        footerSlot={
                          <ChartBarSimple
                            dataPoints={this.state.runRate.prediction}
                            className="mt-3 mx-3"
                            style={{ height: "70px" }}
                            backgroundColor="rgb(250, 250, 250, 0.5)"
                            label="Run Rate"
                            labels="runrate"
                          />
                        }
                      />
                    </Col>
                  </Row>
                  <CChartBar
                    type="bar"
                    datasets={[
                      {
                        label: "Run Rate",
                        backgroundColor: "#f87979",
                        data: this.state.runRate.prediction,
                      },
                    ]}
                    labels={["10", "20", "30", "40", "50"]}
                    options={{
                      tooltips: {
                        enabled: true,
                      },
                    }}
                  />
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
