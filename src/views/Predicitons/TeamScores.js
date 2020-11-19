import React, { Component } from "react";
import {
  Button,
  Card,
  Col,
  notification,
  Row,
  Select,
  Spin,
  Table,
} from "antd";
import { cityAndVenue, MatchTypes, Months, Teams } from "../../helpers/Teams";
import constants from "../../helpers/constants";
import { post } from "../../helpers/request";
import { CWidgetDropdown } from "@coreui/react";
import ChartBarSimple from "../charts/ChartBarSimple";
import ChartLineSimple from "../charts/ChartLineSimple";
import { CChartBar, CChartLine } from "@coreui/react-chartjs";

export default class TeamScores extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isLoading: false,
      team_a: "Pakistan",
      team_b: "India",
      month: "February",
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
    let whoWillWin = await post(constants.URL.PREDICTION.SCORE_OF_TEAMS, {
      team_a,
      team_b,
      city,
      month,
      match_type,
      toss_decision,
      venue,
      toss_won,
    });
    let runRateTeamA = await post(constants.URL.PREDICTION.RUN_RATE, {
      match_type,
      batting_team: team_a,
      bowling_team: team_b,
      city,
      month,
    });
    let runRateTeamB = await post(constants.URL.PREDICTION.RUN_RATE, {
      match_type,
      batting_team: team_b,
      bowling_team: team_a,
      city,
      month,
    });

    if (whoWillWin && runRateTeamA && runRateTeamB) {
      let previousMatches = whoWillWin.data.data;
      let matchHistory = [];
      previousMatches.map((item) => {
        matchHistory.push(item);
      });
      this.setState({
        whoWillWin: whoWillWin.data.prediction,
        runRateTeamA: runRateTeamA.data,
        runRateTeamB: runRateTeamB.data,
        matchHistory,
        isLoading: false,
        predicted: true,
      });
    } else {
      this.setState({ error: true, isLoading: false });
    }
  };

  mapVenue = (city) => {
    let venue = [];
    cityAndVenue.map((item) => {
      if (item.city === city) {
        item.venue.map((venueCity) => {
          venue.push(
            <Select.Option value={venueCity}>{venueCity}</Select.Option>
          );
        });
      }
    });
    return venue;
  };

  render() {
    const columns = [
      {
        title: "City",
        dataIndex: "city",
        key: "city",
      },
      {
        title: "Team A",
        dataIndex: "team_a",
        key: "team_a",
      },
      {
        title: "Team B",
        dataIndex: "team_b",
        key: "team_b",
      },
      {
        title: "Score Team A",
        dataIndex: "score_a",
        key: "score_a",
      },
      {
        title: "Score Team B",
        dataIndex: "score_b",
        key: "score_b",
      },
      {
        title: "Match Type",
        dataIndex: "match_type",
        key: "match_type",
      },
      {
        title: "Month",
        dataIndex: "month",
        key: "month",
      },
      {
        title: "Winner",
        dataIndex: "winner",
        key: "winner",
      },
      {
        title: "Venue",
        dataIndex: "venue",
        key: "venue",
      },
      {
        title: "Toss Won",
        dataIndex: "toss_won",
        key: "toss_won",
      },
      {
        title: "Toss Decision",
        dataIndex: "toss_decision",
        key: "toss_decision",
      },
    ];
    let arr = [];
    // arr.push(this.state.whoWillWin);

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
                <label>City</label>
                <Select
                  value={this.state.city}
                  onChange={(city) => this.setState({ city })}
                  placeholder="Select City"
                  style={{ width: "100%", borderRadius: 10, marginTop: 5 }}
                >
                  {cityAndVenue.map((item) => {
                    return (
                      <Select.Option value={item.city}>
                        {item.city}
                      </Select.Option>
                    );
                  })}
                </Select>
              </div>
              {this.state.city ? (
                <div style={{ marginTop: 10 }}>
                  <label>Venue</label>
                  <Select
                    value={this.state.venue}
                    onChange={(venue) => this.setState({ venue })}
                    placeholder="Select Venue"
                    style={{ width: "100%", borderRadius: 10, marginTop: 5 }}
                  >
                    {this.mapVenue(this.state.city)}
                  </Select>
                </div>
              ) : undefined}
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
                    <CWidgetDropdown
                      color="gradient-warning"
                      header={
                        this.state.whoWillWin.team_a >
                        this.state.whoWillWin.team_b
                          ? this.state.team_a
                          : this.state.team_b
                      }
                      style={{ width: "100%" }}
                      text="Winner Team"
                      footerSlot={
                        <ChartLineSimple
                          dataPoints={
                            this.state.whoWillWin.team_a >
                            this.state.whoWillWin.team_b
                              ? this.state.runRateTeamA.prediction
                              : this.state.runRateTeamB.prediction
                          }
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
                    <Row gutter={10}>
                      <Col span={12}>
                        <CWidgetDropdown
                          color="gradient-primary"
                          header={this.state.whoWillWin.team_a}
                          text={"Team " + this.state.team_a + " Total Score"}
                          footerSlot={
                            <ChartBarSimple
                              dataPoints={this.state.runRateTeamA.prediction}
                              className="mt-3 mx-3"
                              style={{ height: "70px" }}
                              backgroundColor="rgb(250, 250, 250, 0.5)"
                              label="Run Rate"
                              labels="runrate"
                            />
                          }
                        />
                      </Col>
                      <Col span={12}>
                        <CWidgetDropdown
                          color="gradient-primary"
                          header={this.state.whoWillWin.team_b}
                          text={"Team " + this.state.team_b + " Total Score"}
                          footerSlot={
                            <ChartBarSimple
                              dataPoints={this.state.runRateTeamB.prediction}
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
                  </Row>
                  <CChartLine
                    type="line"
                    datasets={[
                      {
                        label: "Run Rate of " + this.state.team_a,
                        backgroundColor: "rgb(228,102,81,0.9)",
                        data: this.state.runRateTeamA.prediction,
                      },
                      {
                        label: "Run Rate of " + this.state.team_b,
                        backgroundColor: "rgb(0,216,255,0.9)",
                        data: this.state.runRateTeamB.prediction,
                      },
                    ]}
                    options={{
                      tooltips: {
                        enabled: true,
                      },
                    }}
                    labels={["10", "20", "30", "40", "50"]}
                  />
                </div>
              ) : (
                <div>Please select values to continue.</div>
              )}
            </Card>
          </Col>
        </Row>
        <Card
          title="History"
          style={{
            width: "100%",
            borderRadius: 10,
            marginTop: 20,
            marginBottom: 20,
          }}
        >
          <Table columns={columns} dataSource={this.state.matchHistory} />
        </Card>
      </div>
    );
  }
}
