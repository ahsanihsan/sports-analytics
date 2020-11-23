import React, { Component } from "react";
import { Button, Card, Col, Form, Row, Select, Spin, Table } from "antd";
import { cityAndVenue, MatchTypes, Months, Teams } from "../../helpers/Teams";
import constants from "../../helpers/constants";
import { post } from "../../helpers/request";
import { CWidgetDropdown } from "@coreui/react";
import ChartBarSimple from "../charts/ChartBarSimple";
import ChartLineSimple from "../charts/ChartLineSimple";
import { CChartBar } from "@coreui/react-chartjs";
import "./CustonCSS.css";

export default class WhoWillWin extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isLoading: false,
      // team_a: "Pakistan",
      // team_b: "India",
      // month: "February",
      // match_type: "ODI",
      // city: "Karachi",
      // toss_won: "Pakistan",
      // toss_decision: "bat",
      // venue: "National Stadium",
      team_a: "",
      team_b: "",
      month: "",
      match_type: "",
      city: "",
      toss_won: "",
      toss_decision: "",
      venue: "",
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
      let previousMatches = whoWillWin.data.data;
      let matchHistory = [];
      previousMatches.map((item) => {
        matchHistory.push(item);
      });
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

    return (
      <div>
        <Row gutter={10}>
          <Col span={9}>
            <Card title="Team Data" style={{ width: "100%", borderRadius: 10 }}>
              <Form name="basic" onFinish={() => this.handleSubmit()}>
                <label>Team A</label>
                <Form.Item
                  name="team_a"
                  rules={[{ required: true, message: "Please select team A!" }]}
                >
                  <Select
                    value={this.state.team_a}
                    onChange={(team_a) => this.setState({ team_a })}
                    placeholder="Select Team A"
                    style={{ width: "100%", borderRadius: 10, marginTop: 5 }}
                  >
                    <Select.Option value="Pakistan">Pakistan</Select.Option>
                  </Select>
                </Form.Item>
                <label>Team B</label>
                <Form.Item
                  name="team_b"
                  rules={[{ required: true, message: "Please select team B!" }]}
                >
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
                </Form.Item>
                <label>Month</label>
                <Form.Item
                  name="month"
                  rules={[
                    { required: true, message: "Please select a month!" },
                  ]}
                >
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
                </Form.Item>
                <label>Match Type</label>
                <Form.Item
                  name="match_type"
                  rules={[
                    { required: true, message: "Please select match type!" },
                  ]}
                >
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
                </Form.Item>
                {this.state.team_a && this.state.team_b ? (
                  <>
                    <label>Toss Won</label>
                    <Form.Item
                      name="toss_won"
                      rules={[
                        {
                          required: true,
                          message: "Please select which team won the toss!",
                        },
                      ]}
                    >
                      <Select
                        value={this.state.toss_won}
                        onChange={(toss_won) => this.setState({ toss_won })}
                        placeholder="Select Toss Winning Team"
                        style={{
                          width: "100%",
                          borderRadius: 10,
                          marginTop: 5,
                        }}
                      >
                        <Select.Option value={this.state.team_a}>
                          {this.state.team_a}
                        </Select.Option>
                        <Select.Option value={this.state.team_b}>
                          {this.state.team_b}
                        </Select.Option>
                      </Select>
                    </Form.Item>
                  </>
                ) : undefined}
                <label>Toss Decision</label>
                <Form.Item
                  name="toss_decision"
                  rules={[
                    {
                      required: true,
                      message: "Please select what toss decision was made!",
                    },
                  ]}
                >
                  <Select
                    value={this.state.toss_decision}
                    onChange={(toss_decision) =>
                      this.setState({ toss_decision })
                    }
                    placeholder="Select Toss Decision"
                    style={{ width: "100%", borderRadius: 10, marginTop: 5 }}
                  >
                    <Select.Option value="bat">Bat</Select.Option>
                    <Select.Option value="field">Field</Select.Option>
                  </Select>
                </Form.Item>
                <label>City</label>
                <Form.Item
                  name="city"
                  rules={[
                    {
                      required: true,
                      message: "Please select a city!",
                    },
                  ]}
                >
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
                </Form.Item>
                {this.state.city ? (
                  <>
                    <label>Venue</label>
                    <Form.Item
                      name="venue"
                      rules={[
                        {
                          required: true,
                          message: "Please select venue!",
                        },
                      ]}
                    >
                      <Select
                        value={this.state.venue}
                        onChange={(venue) => this.setState({ venue })}
                        placeholder="Select Venue"
                        style={{
                          width: "100%",
                          borderRadius: 10,
                          marginTop: 5,
                        }}
                      >
                        {this.mapVenue(this.state.city)}
                      </Select>
                    </Form.Item>
                  </>
                ) : undefined}
                <Form.Item>
                  <Button
                    type="primary"
                    htmlType="submit"
                    style={{ width: "100%" }}
                    loading={this.state.isLoading}
                  >
                    Predict
                  </Button>
                </Form.Item>
              </Form>
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
