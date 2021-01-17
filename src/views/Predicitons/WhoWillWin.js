import React, { Component } from "react";
import {
  Button,
  Card,
  Col,
  Form,
  InputNumber,
  Row,
  Select,
  Spin,
  Table,
} from "antd";
import {
  cityAndVenue,
  MatchTypes,
  Months,
  Teams,
  Venue,
} from "../../helpers/Teams";
import constants from "../../helpers/constants";
import { post } from "../../helpers/request";
import { CWidgetDropdown } from "@coreui/react";
import ChartBarSimple from "../charts/ChartBarSimple";
import ChartLineSimple from "../charts/ChartLineSimple";
import { CChartBar } from "@coreui/react-chartjs";
import "./CustonCSS.css";

import { isMobile } from "react-device-detect";
import { getFlagImages } from "../../helpers/Flags";

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

  componentDidMount() {
    this.setState({
      venue: "Sharjah Cricket Stadium",
      team_a: "Pakistan",
      team_b: "India",
      runs: 100,
      wickets: 3,
      overs: 5,
      balls: 1,
      runs_last_5: 10,
      wickets_last_5: 0,
      fours_till_now: 0,
      sixes_till_now: 1,
      no_balls_till_now: 0,
      wide_balls_till_now: 0,
    });
  }

  handleSubmit = async (values) => {
    const dataA = {
      venue: values.venue,
      bat_team: values.team_a,
      bowl_team: values.team_b,
      runs: values.runs,
      wickets: values.wickets,
      overs: parseFloat(values.overs + "." + values.balls),
      runs_last_5: values.runs_last_5,
      wickets_last_5: values.wickets_last_5,
      fours_till_now: values.fours_till_now,
      sixes_till_now: values.sixes_till_now,
      no_balls_till_now: values.no_balls_till_now,
      wide_balls_till_now: values.wide_balls_till_now,
      target: 0,
    };

    this.setState({ isLoading: true });

    let teamAPrediction = await post(
      constants.URL.PREDICTION.PREDICT_MATCH_WITH_TARGET_ODI,
      dataA
    );
    const dataB = {
      venue: values.venue,
      bowl_team: values.team_a,
      bat_team: values.team_b,
      runs: values.runs,
      wickets: values.wickets,
      overs: parseFloat(values.overs + "." + values.balls),
      runs_last_5: values.runs_last_5,
      wickets_last_5: values.wickets_last_5,
      fours_till_now: values.fours_till_now,
      sixes_till_now: values.sixes_till_now,
      no_balls_till_now: values.no_balls_till_now,
      wide_balls_till_now: values.wide_balls_till_now,
      target: teamAPrediction.data.predictions.total + 1,
    };
    let teamBPrediction = await post(
      constants.URL.PREDICTION.PREDICT_MATCH_WITH_TARGET_ODI,
      dataB
    );

    if (
      teamAPrediction &&
      teamBPrediction &&
      teamAPrediction.data &&
      teamBPrediction.data
    ) {
      console.log("******* HELLO *******");
      console.log(teamAPrediction.data);
      console.log(teamBPrediction.data);
      console.log("******* HELLO *******");
      this.setState({
        teamAPrediction: teamAPrediction.data,
        teamBPrediction: teamBPrediction.data,
        isLoading: false,
        predicted: true,
      });
    } else {
      this.setState({ error: true, isLoading: false });
    }
    // this.setState({ isLoading: false });
    // let runRate = await post(constants.URL.PREDICTION.RUN_RATE, {
    //   match_type,
    //   batting_team:
    //     toss_won === team_a && toss_decision === "bat" ? team_a : team_b,
    //   bowling_team:
    //     toss_won === team_a && toss_decision === "field" ? team_a : team_b,
    //   city,
    //   month,
    // });
    // if (whoWillWin && runRate) {
    //   let previousMatches = whoWillWin.data.data;
    //   let matchHistory = [];
    //   previousMatches.map((item) => {
    //     matchHistory.push(item);
    //   });
    //   let totalScore = 0;
    //   let runRateRound = [];
    //   runRate.data.prediction.map((item) => {
    //     runRateRound.push(Math.round(item));
    //     const perTenOvers = item * 10;
    //     totalScore += perTenOvers;
    //   });
    //   this.setState({
    //     whoWillWin: whoWillWin.data,
    //     runRate: runRate.data,
    //     totalScore: Math.round(totalScore),
    //     matchHistory,
    //     isLoading: false,
    //   });
    // } else {
    //   this.setState({ error: true, isLoading: false });
    // }
  };

  mapVenue = () => {
    let venue = [];
    Venue.map((venueCity) => {
      venue.push(<Select.Option value={venueCity}>{venueCity}</Select.Option>);
    });
    return venue;
  };

  mapTeams = (team) => {
    let content = [];
    Teams.map((item) => {
      if (item !== team)
        content.push(<Select.Option value={item}>{item}</Select.Option>);
    });
    return content;
  };

  getWinner = () => {
    const { teamAPrediction, teamBPrediction } = this.state;
    if (teamAPrediction.predictions.total > teamBPrediction.predictions.total) {
      return this.state.team_a;
    } else {
      return this.state.team_b;
    }
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
        fixed: "left",
        dataIndex: "team_a",
        key: "team_a",
      },
      {
        title: "Team B",
        fixed: "left",
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

    const { teamAPrediction, teamBPrediction } = this.state;

    return (
      <div>
        <Row gutter={10}>
          <Col xxl={9} xl={9} md={9} sm={24} xs={24}>
            <Card title="Team Data" style={{ width: "100%", borderRadius: 10 }}>
              <Form
                initialValues={{
                  venue: "Sharjah Cricket Stadium",
                  team_a: "Pakistan",
                  team_b: "India",
                  runs: 100,
                  wickets: 3,
                  overs: 5,
                  balls: 1,
                  runs_last_5: 10,
                  wickets_last_5: 0,
                  fours_till_now: 0,
                  sixes_till_now: 1,
                  no_balls_till_now: 0,
                  wide_balls_till_now: 0,
                }}
                name="basic"
                onFinish={(values) => this.handleSubmit(values)}
              >
                <Row gutter={10}>
                  <Col span={12}>
                    <label>Batting Team</label>
                    <Form.Item
                      name="team_a"
                      rules={[
                        { required: true, message: "Please select team A!" },
                      ]}
                    >
                      <Select
                        optionFilterProp="children"
                        showSearch
                        filterOption={(input, option) =>
                          option.children
                            .toLowerCase()
                            .indexOf(input.toLowerCase()) >= 0
                        }
                        value={this.state.team_a}
                        onChange={(team_a) => this.setState({ team_a })}
                        placeholder="Select Team A"
                        style={{
                          width: "100%",
                          borderRadius: 10,
                        }}
                      >
                        {this.mapTeams(this.state.team_b)}
                      </Select>
                    </Form.Item>
                  </Col>
                  <Col span={12}>
                    <label>Bowling Team</label>
                    <Form.Item
                      name="team_b"
                      rules={[
                        { required: true, message: "Please select team B!" },
                      ]}
                    >
                      <Select
                        optionFilterProp="children"
                        showSearch
                        filterOption={(input, option) =>
                          option.children
                            .toLowerCase()
                            .indexOf(input.toLowerCase()) >= 0
                        }
                        value={this.state.team_b}
                        onChange={(team_b) => this.setState({ team_b })}
                        placeholder="Select Team B"
                        style={{
                          width: "100%",
                        }}
                      >
                        {this.mapTeams(this.state.team_a)}
                      </Select>
                    </Form.Item>
                  </Col>
                </Row>
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
                    optionFilterProp="children"
                    showSearch
                    filterOption={(input, option) =>
                      option.children
                        .toLowerCase()
                        .indexOf(input.toLowerCase()) >= 0
                    }
                    value={this.state.venue}
                    onChange={(venue) => this.setState({ venue })}
                    placeholder="Select Venue"
                    style={{
                      width: "100%",
                    }}
                  >
                    {this.mapVenue()}
                  </Select>
                </Form.Item>
                <Row gutter={10}>
                  <Col span={12}>
                    <label>Overs</label>
                    <Form.Item
                      name="overs"
                      rules={[
                        {
                          required: true,
                          message: "Please input total overs played till now!",
                        },
                      ]}
                    >
                      <InputNumber
                        placeholder="Enter Overs (0 - 49)"
                        onChange={(overs) => this.setState({ overs })}
                        style={{ width: "100%", marginTop: 5 }}
                        min={0}
                        max={49}
                      />
                    </Form.Item>
                  </Col>
                  <Col span={12}>
                    <label>Balls</label>
                    <Form.Item
                      name="balls"
                      rules={[
                        {
                          required: true,
                          message: "Please input balls of the current over!",
                        },
                      ]}
                    >
                      <InputNumber
                        placeholder="Enter Balls (1 - 5)"
                        onChange={(balls) => this.setState({ balls })}
                        style={{ width: "100%", marginTop: 5 }}
                        min={1}
                        max={6}
                      />
                    </Form.Item>
                  </Col>
                </Row>
                <Row gutter={10}>
                  <Col span={12}>
                    <label>Runs Till Now</label>
                    <Form.Item
                      name="runs"
                      rules={[
                        {
                          required: true,
                          message: "Please input runs made by team till now!",
                        },
                      ]}
                    >
                      <InputNumber
                        placeholder="Enter Runs (0-500)"
                        onChange={(runs) => this.setState({ runs })}
                        style={{ width: "100%", marginTop: 5 }}
                        min={0}
                        max={500}
                      />
                    </Form.Item>
                  </Col>
                  <Col span={12}>
                    <label>Wickets Till Now</label>
                    <Form.Item
                      name="wickets"
                      rules={[
                        {
                          required: true,
                          message: "Please input wickets taken till now!",
                        },
                      ]}
                    >
                      <InputNumber
                        placeholder="Enter Wickets (0-9)"
                        onChange={(wickets) => this.setState({ wickets })}
                        style={{ width: "100%", marginTop: 5 }}
                        min={0}
                        max={9}
                      />
                    </Form.Item>
                  </Col>
                </Row>
                <Row gutter={10}>
                  <Col span={12}>
                    <label>Fours Till Now</label>
                    <Form.Item
                      name="fours_till_now"
                      rules={[
                        {
                          required: true,
                          message: "Please input fours scored till now!",
                        },
                      ]}
                    >
                      <InputNumber
                        placeholder="Enter Fours (0-100)"
                        onChange={(fours) => this.setState({ fours })}
                        style={{ width: "100%", marginTop: 5 }}
                        min={0}
                        max={100}
                      />
                    </Form.Item>
                  </Col>
                  <Col span={12}>
                    <label>Sixes Till Now</label>
                    <Form.Item
                      name="sixes_till_now"
                      rules={[
                        {
                          required: true,
                          message: "Please input sixes scored till now!",
                        },
                      ]}
                    >
                      <InputNumber
                        placeholder="Enter Fours (0-100)"
                        onChange={(fours) => this.setState({ fours })}
                        style={{ width: "100%", marginTop: 5 }}
                        min={0}
                        max={100}
                      />
                    </Form.Item>
                  </Col>
                </Row>
                <Row gutter={10}>
                  <Col span={12}>
                    <label>Wide Balls Till Now</label>
                    <Form.Item
                      name="wide_balls_till_now"
                      rules={[
                        {
                          required: true,
                          message: "Please input wide balls till now!",
                        },
                      ]}
                    >
                      <InputNumber
                        placeholder="Wide balls till now (0-100)"
                        onChange={(wideBalls) => this.setState({ wideBalls })}
                        style={{ width: "100%", marginTop: 5 }}
                        min={0}
                        max={50}
                      />
                    </Form.Item>
                  </Col>
                  <Col span={12}>
                    <label>No Balls Till Now</label>
                    <Form.Item
                      name="no_balls_till_now"
                      rules={[
                        {
                          required: true,
                          message: "Please input no balls till now!",
                        },
                      ]}
                    >
                      <InputNumber
                        placeholder="No Balls Till now (0-9)"
                        onChange={(noBalls) => this.setState({ noBalls })}
                        style={{ width: "100%", marginTop: 5 }}
                        min={0}
                        max={50}
                      />
                    </Form.Item>
                  </Col>
                </Row>
                <Row gutter={10}>
                  <Col span={12}>
                    <label>Runs Last 5 Overs</label>
                    <Form.Item
                      name="runs_last_5"
                      rules={[
                        {
                          required: true,
                          message: "Please input runs scored in last 5 overs !",
                        },
                      ]}
                    >
                      <InputNumber
                        placeholder="Runs in last 5 overs (0-100)"
                        onChange={(fours) => this.setState({ fours })}
                        style={{ width: "100%", marginTop: 5 }}
                        min={0}
                        max={200}
                      />
                    </Form.Item>
                  </Col>
                  <Col span={12}>
                    <label>Wickets Last 5 Overs</label>
                    <Form.Item
                      name="wickets_last_5"
                      rules={[
                        {
                          required: true,
                          message:
                            "Please input wickets taken in last 5 overs !",
                        },
                      ]}
                    >
                      <InputNumber
                        placeholder="Wickets in last 5 overs (0-9)"
                        onChange={(fours) => this.setState({ fours })}
                        style={{ width: "100%", marginTop: 5 }}
                        min={0}
                        max={this.state.wickets}
                      />
                    </Form.Item>
                  </Col>
                </Row>
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
          <Col
            xxl={15}
            xl={15}
            md={15}
            sm={24}
            xs={24}
            style={{ marginTop: isMobile ? 20 : 0 }}
          >
            <Card
              title="Winner Team Prediction"
              style={{ width: "100%", borderRadius: 10 }}
            >
              {this.state.isLoading ? (
                <Spin />
              ) : this.state.predicted ? (
                <div
                  style={{
                    width: "100%",
                    alignItems: "center",
                    display: "flex",
                    flexDirection: "column",
                  }}
                >
                  <div style={{ alignSelf: "center" }}>
                    <img
                      src={getFlagImages(this.getWinner())}
                      style={{
                        width: 200,
                        height: 200,
                        alignSelf: "center",
                        marginBottom: 10,
                      }}
                    />
                  </div>
                  <div>
                    <span
                      style={{
                        fontSize: 25,
                        fontWeight: "bold",
                      }}
                    >
                      {this.getWinner()}
                    </span>
                    <span style={{ fontSize: 15 }}> will win this match</span>
                  </div>
                </div>
              ) : (
                <div>Please select values to continue.</div>
              )}
            </Card>
            <Card
              title="Batting Team Predicted Score"
              style={{ width: "100%", borderRadius: 10, marginTop: 10 }}
            >
              {this.state.isLoading ? (
                <Spin />
              ) : this.state.predicted ? (
                <div>
                  <Row gutter={10}>
                    <Col span={24}>
                      <CWidgetDropdown
                        color={
                          this.getWinner() === this.state.team_a
                            ? "gradient-success"
                            : "gradient-danger"
                        }
                        header={teamAPrediction.predictions.total}
                        text={this.state.team_a + " Score"}
                        footerSlot={
                          <ChartLineSimple
                            dataPoints={teamAPrediction.predictions.runrates}
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
                  </Row>
                </div>
              ) : (
                <div>Please select values to continue.</div>
              )}
            </Card>
            <Card
              title="Predicted Boundaries"
              style={{ width: "100%", borderRadius: 10, marginTop: 10 }}
            >
              {this.state.isLoading ? (
                <Spin />
              ) : this.state.predicted ? (
                <div>
                  <Row gutter={10}>
                    <Col span={12}>
                      <CWidgetDropdown
                        color="gradient-info"
                        header={teamAPrediction.predictions.total_sixes}
                        text="Total Sixes"
                        footerSlot={
                          <ChartLineSimple
                            dataPoints={teamAPrediction.predictions.runrates}
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
                        color="gradient-warning"
                        header={teamAPrediction.predictions.total_fours}
                        text={"Total Fours"}
                        footerSlot={
                          <ChartLineSimple
                            dataPoints={teamAPrediction.predictions.runrates}
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
                  </Row>
                </div>
              ) : (
                <div>Please select values to continue.</div>
              )}
            </Card>
            <Card
              title="Run Rate Prediction"
              style={{ width: "100%", borderRadius: 10, marginTop: 10 }}
            >
              {this.state.isLoading ? (
                <Spin />
              ) : this.state.predicted ? (
                <div>
                  <CChartBar
                    type="bar"
                    datasets={[
                      {
                        label: "Run Rate " + this.state.team_a,
                        backgroundColor: "#f87979",
                        data: teamAPrediction.predictions.runrates,
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
          scroll={{ x: 1500 }}
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
