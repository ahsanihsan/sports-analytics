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
import { Players } from "../../helpers/Players";
import {
  cityAndVenue,
  MatchTypes,
  Months,
  Teams,
  Venue,
} from "../../helpers/Teams";
import constants from "../../helpers/constants";
import { post } from "../../helpers/request";
import { CChartBar, CChartLine } from "@coreui/react-chartjs";
import { isMobile } from "react-device-detect";

export default class BatsmanScores extends Component {
  constructor(props) {
    super(props);
    this.state = {
      teams: [],

      // city: "Sharjah",
      // month: "October",
      // match_type: "ODI",
      // bat_team: "Pakistan",
      // bowling_team: "India",
      // batsman: "Mohammad Hafeez",
      // venue: "Sharjah Cricket Stadium",
    };
  }

  handleSubmit = async (values) => {
    values.over = values.over + "." + values.balls;
    values.total_singles_by_striker_till_now =
      values.score_by_striker_till_now -
      (values.total_fours_by_striker_till_now * 4 +
        values.total_sixes_by_striker_till_now * 6);
    this.setState({ isLoading: true });
    let batsmanScores = await post(
      constants.URL.PREDICTION.WHAT_SCORE_WILL_BATSMAN_MAKE,
      values
    );
    this.setState({ isLoading: false });
    if (batsmanScores && batsmanScores.status === 200) {
      this.setState({
        batsmanScores: batsmanScores.data.predictions,
        isLoading: false,
        predicted: true,
      });
    } else {
      this.setState({ error: true, isLoading: false });
    }
  };

  componentDidMount() {
    this.setState({ bating_team: "Pakistan", striker: "Azhar Ali" });
  }

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

  renderTeams = () => {
    let teams = [];
    for (let key in Players) {
      this.state.teams.push(key);
      teams.push(<Select.Option value={key}>{key}</Select.Option>);
    }
    return teams;
  };

  renderBatsmen = () => {
    let players = [];
    for (let key in Players) {
      if (key === this.state.bating_team) {
        Players[key].batsmen.map((item) =>
          players.push(<Select.Option value={item}>{item}</Select.Option>)
        );
      }
    }
    return players;
  };
  renderBowler = () => {
    let players = [];
    for (let key in Players) {
      if (key === this.state.bowling_team) {
        Players[key].bowlers.map((item) =>
          players.push(<Select.Option value={item}>{item}</Select.Option>)
        );
      }
    }
    return players;
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
        dataIndex: " bat_team",
        key: " bat_team",
      },
      {
        title: "Team B",
        dataIndex: "bowling_team",
        key: "bowling_team",
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
          <Col xxl={9} xl={9} md={9} sm={24} xs={24}>
            <Card title="Team Data" style={{ width: "100%", borderRadius: 10 }}>
              <Form
                name="basic"
                onFinish={(values) => this.handleSubmit(values)}
                initialValues={{
                  venue: "Sheikh Zayed Stadium",
                  bating_team: "Pakistan",
                  striker: "Azhar Ali",
                  bowling_team: "India",
                  over: 10,
                  balls: 1,
                  score_by_striker_till_now: 16,
                  balls_played_by_striker_till_now: 10,

                  total_fours_by_striker_till_now: 2,
                  total_sixes_by_striker_till_now: 0,

                  total_singles_by_striker_till_now: 8,

                  total_dots_by_striker_till_now: 0,
                  total_batting_team_score_till_now: 100,
                }}
              >
                <Row gutter={10}>
                  <Col span={12}>
                    <label>Batting Team</label>
                    <Form.Item
                      name="bating_team"
                      rules={[
                        {
                          required: true,
                          message: "Please select a batting team!",
                        },
                      ]}
                    >
                      <Select
                        value={this.state.bat_team}
                        onChange={(bat_team) => this.setState({ bat_team })}
                        placeholder="Select Batting Team"
                        style={{
                          width: "100%",
                          borderRadius: 10,
                          marginTop: 5,
                        }}
                      >
                        {this.renderTeams()}
                      </Select>
                    </Form.Item>
                  </Col>
                  <Col span={12}>
                    <label>Bowling Team</label>
                    <Form.Item
                      name="bowling_team"
                      rules={[
                        {
                          required: true,
                          message: "Please select a bowling team!",
                        },
                      ]}
                    >
                      <Select
                        value={this.state.bowling_team}
                        onChange={(bowling_team) =>
                          this.setState({ bowling_team })
                        }
                        placeholder="Select Bowling Team"
                        style={{
                          width: "100%",
                          borderRadius: 10,
                          marginTop: 5,
                        }}
                      >
                        {this.renderTeams()}
                      </Select>
                    </Form.Item>
                  </Col>
                </Row>
                <Row gutter={10}>
                  <Col span={12}>
                    <label>Select Batsman</label>
                    <Form.Item
                      name="striker"
                      rules={[
                        { required: true, message: "Please select a batsman!" },
                      ]}
                    >
                      <Select
                        value={this.state.striker}
                        onChange={(striker) => this.setState({ striker })}
                        placeholder="Select Batsman"
                        style={{
                          width: "100%",
                          borderRadius: 10,
                          marginTop: 5,
                        }}
                      >
                        {this.renderBatsmen()}
                      </Select>
                    </Form.Item>
                  </Col>
                  <Col span={12}>
                    <label>Venue</label>
                    <Form.Item
                      name="venue"
                      rules={[
                        { required: true, message: "Please select venue!" },
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
                        {Venue.map((item) => {
                          return (
                            <Select.Option value={item}>{item}</Select.Option>
                          );
                        })}
                      </Select>
                    </Form.Item>
                  </Col>
                </Row>
                <Row gutter={10}>
                  <Col span={12}>
                    <label>Overs</label>
                    <Form.Item
                      name="over"
                      rules={[
                        {
                          required: true,
                          message: "Please input total overs played till now!",
                        },
                      ]}
                    >
                      <InputNumber
                        placeholder="Enter Overs (0 - 49)"
                        onChange={(over) => this.setState({ over })}
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
                    <label>Balls Played By Striker</label>
                    <Form.Item
                      name="balls_played_by_striker_till_now"
                      rules={[
                        {
                          required: true,
                          message:
                            "Please input total balls played by striker till now!",
                        },
                      ]}
                    >
                      <InputNumber
                        placeholder="Enter Balls Played"
                        style={{ width: "100%", marginTop: 5 }}
                        min={0}
                      />
                    </Form.Item>
                  </Col>
                  <Col span={12}>
                    <label>Score By Striker</label>
                    <Form.Item
                      name="score_by_striker_till_now"
                      rules={[
                        {
                          required: true,
                          message:
                            "Please input total score by the batsman till now!",
                        },
                      ]}
                    >
                      <InputNumber
                        placeholder="Enter Score By Striker"
                        style={{ width: "100%", marginTop: 5 }}
                        min={0}
                      />
                    </Form.Item>
                  </Col>
                </Row>
                <Row gutter={10}>
                  <Col span={12}>
                    <label>Total Fours By Striker</label>
                    <Form.Item
                      name="total_fours_by_striker_till_now"
                      rules={[
                        {
                          required: true,
                          message:
                            "Please input total fours by striker till now!",
                        },
                      ]}
                    >
                      <InputNumber
                        placeholder="Enter Sixes By Striker"
                        style={{ width: "100%", marginTop: 5 }}
                        min={0}
                      />
                    </Form.Item>
                  </Col>
                  <Col span={12}>
                    <label>Total Sixes By Striker</label>
                    <Form.Item
                      name="total_sixes_by_striker_till_now"
                      rules={[
                        {
                          required: true,
                          message:
                            "Please input total sixes by the batsman till now!",
                        },
                      ]}
                    >
                      <InputNumber
                        placeholder="Enter Sixes By Striker"
                        style={{ width: "100%", marginTop: 5 }}
                        min={0}
                      />
                    </Form.Item>
                  </Col>
                </Row>
                <Row gutter={10}>
                  <Col span={12}>
                    <label>Total Dots By Striker</label>
                    <Form.Item
                      name="total_dots_by_striker_till_now"
                      rules={[
                        {
                          required: true,
                          message:
                            "Please input total dots by striker till now!",
                        },
                      ]}
                    >
                      <InputNumber
                        placeholder="Enter Dots By Striker"
                        style={{ width: "100%", marginTop: 5 }}
                        min={0}
                      />
                    </Form.Item>
                  </Col>
                  <Col span={12}>
                    <label>Total Score By Team</label>
                    <Form.Item
                      name="total_batting_team_score_till_now"
                      rules={[
                        {
                          required: true,
                          message:
                            "Please input total score by the team till now!",
                        },
                      ]}
                    >
                      <InputNumber
                        placeholder="Enter Total Score By Team"
                        style={{ width: "100%", marginTop: 5 }}
                        min={0}
                      />
                    </Form.Item>
                  </Col>
                </Row>
                {/* <Row gutter={10}>
                  <Col span={12}>
                  <label>Overs Till Now</label>
                <Form.Item
                  name="over"
                  rules={[{ required: true, message: "Please enter overs of the match!" }]}
                >
                  <InputNumber placeholder="Enter Overs (1-" />
                </Form.Item>
                  </Col>
                  <Col span={12}></Col>
                </Row> */}
                <Button
                  type="primary"
                  style={{ width: "100%", marginTop: 20 }}
                  loading={this.state.isLoading}
                  htmlType="submit"
                >
                  Predict
                </Button>
              </Form>
            </Card>
          </Col>
          <Col span={15}>
            <Card
              title="Batsman Score"
              style={{ width: "100%", borderRadius: 10 }}
            >
              {this.state.isLoading ? (
                <Spin />
              ) : this.state.predicted ? (
                <div>
                  <CChartBar
                    type="bar"
                    datasets={[
                      {
                        label: "Runs By " + this.state.striker,
                        backgroundColor: "rgb(228,102,81,0.9)",
                        data: this.state.batsmanScores.total,
                      },
                    ]}
                    options={{
                      tooltips: {
                        enabled: true,
                      },
                    }}
                    labels={["1", "2", "3", "4", "5", "6", "7", "8", "9", "10"]}
                  />
                </div>
              ) : (
                <div>Please select values to continue.</div>
              )}
            </Card>
            <Card
              title="Batsman Fours"
              style={{ width: "100%", borderRadius: 10, marginTop: 10 }}
            >
              {this.state.isLoading ? (
                <Spin />
              ) : this.state.predicted ? (
                <div>
                  <CChartLine
                    type="line"
                    datasets={[
                      {
                        label: "Fours By " + this.state.striker,
                        backgroundColor: "rgb(228,102,81,0.9)",
                        data: this.state.batsmanScores.total_fours,
                      },
                    ]}
                    options={{
                      tooltips: {
                        enabled: true,
                      },
                    }}
                    labels={["1", "2", "3", "4", "5", "6", "7", "8", "9", "10"]}
                  />
                </div>
              ) : (
                <div>Please select values to continue.</div>
              )}
            </Card>
            <Card
              title="Batsman Sixes"
              style={{ width: "100%", borderRadius: 10, marginTop: 10 }}
            >
              {this.state.isLoading ? (
                <Spin />
              ) : this.state.predicted ? (
                <div>
                  <CChartLine
                    type="line"
                    datasets={[
                      {
                        label: "Sixes By " + this.state.striker,
                        backgroundColor: "rgb(228,102,81,0.9)",
                        data: this.state.batsmanScores.total_sixes,
                      },
                    ]}
                    options={{
                      tooltips: {
                        enabled: true,
                      },
                    }}
                    labels={["1", "2", "3", "4", "5", "6", "7", "8", "9", "10"]}
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
