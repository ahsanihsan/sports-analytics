import React, { Component } from "react";
import { Button, Card, Col, Form, Row, Select, Spin, Table } from "antd";
import { Players } from "../../helpers/Players";
import { cityAndVenue, MatchTypes, Months, Teams } from "../../helpers/Teams";
import constants from "../../helpers/constants";
import { post } from "../../helpers/request";
import { CChartLine } from "@coreui/react-chartjs";
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

  handleSubmit = async () => {
    this.setState({ isLoading: true });
    const {
      bat_team,
      batsman,
      bowling_team,
      city,
      month,
      match_type,
      venue,
    } = this.state;
    let batsmanScores = await post(
      constants.URL.PREDICTION.WHAT_SCORE_WILL_BATSMAN_MAKE,
      {
        bat_team,
        batsman,
        bowling_team,
        city,
        month,
        match_type,
        venue,
      }
    );

    if (batsmanScores) {
      this.setState({
        batsmanScores: batsmanScores.data,
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
      if (key === this.state.bat_team) {
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
              <Form name="basic" onFinish={() => this.handleSubmit()}>
                <label>Batting Team</label>
                <Form.Item
                  name="batting_team"
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
                    style={{ width: "100%", borderRadius: 10, marginTop: 5 }}
                  >
                    {this.renderTeams()}
                  </Select>
                </Form.Item>
                {this.state.bat_team ? (
                  <>
                    <label>Select Batsman</label>
                    <Form.Item
                      name="batsman"
                      rules={[
                        { required: true, message: "Please select a batsman!" },
                      ]}
                    >
                      <Select
                        value={this.state.batsman}
                        onChange={(batsman) => this.setState({ batsman })}
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
                  </>
                ) : undefined}
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
                    onChange={(bowling_team) => this.setState({ bowling_team })}
                    placeholder="Select Bowling Team"
                    style={{ width: "100%", borderRadius: 10, marginTop: 5 }}
                  >
                    {this.renderTeams()}
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
                    onChange={(match_type) => this.setState({ match_type })}
                    placeholder="Select Match Type"
                    style={{ width: "100%", borderRadius: 10, marginTop: 5 }}
                  >
                    {MatchTypes.map((item) => {
                      return <Select.Option value={item}>{item}</Select.Option>;
                    })}
                  </Select>
                </Form.Item>
                <label>City</label>
                <Form.Item
                  name="city"
                  rules={[{ required: true, message: "Please select city!" }]}
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
                    <Select
                      value={this.state.venue}
                      onChange={(venue) => this.setState({ venue })}
                      placeholder="Select Venue"
                      style={{ width: "100%", borderRadius: 10, marginTop: 5 }}
                    >
                      {this.mapVenue(this.state.city)}
                    </Select>
                  </>
                ) : undefined}
                <Button
                  type="primary"
                  style={{ width: "100%", marginTop: 20 }}
                  loading={this.state.isLoading}
                  onClick={() => this.handleSubmit()}
                >
                  Predict
                </Button>
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
                  <CChartLine
                    type="line"
                    datasets={[
                      {
                        label: "Run Rate of " + this.state.batsman,
                        backgroundColor: "rgb(228,102,81,0.9)",
                        data: this.state.batsmanScores.prediction,
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
