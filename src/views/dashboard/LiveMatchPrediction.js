import React, { Component } from "react";
import { get, post } from "../../helpers/request.js";
import { Spin, List, Card, Row, Col, Table } from "antd";
import "./index.css";
import constants from "../../helpers/constants.js";

import { CWidgetDropdown } from "@coreui/react";
import ChartLineSimple from "../charts/ChartLineSimple";
import { CChartBar } from "@coreui/react-chartjs";
import { getFlagImages } from "../../helpers/Flags";

export default class LiveMatchPrediction extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isLoading: true,
      match: "",
    };
  }

  componentDidMount() {
    let search = this.props.history.location.search;
    search = search.split("/");
    let matchID = search[0].replace("?", "");
    let seriesID = search[1];
    this.getMatchDetails(matchID, seriesID);
  }

  handleSubmit = async (values) => {
    this.setState({ isLoading: true });

    let teamAPrediction = await post(
      constants.URL.PREDICTION.PREDICT_MATCH_WITH_TARGET_ODI,
      values
    );

    let dataB = {
      venue: "Shere Bangla National Stadium",
      bat_team: values.bat_team,
      bowl_team: values.bowl_team,
      runs: 0,
      wickets: 0,
      overs: 0.1,
      runs_last_5: 0,
      wickets_last_5: 0,
      fours_till_now: 0,
      sixes_till_now: 0,
      no_balls_till_now: 0,
      wide_balls_till_now: 0,
      target: 0,
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
      this.setState({
        teamAPrediction: teamAPrediction.data,
        teamBPrediction: teamBPrediction.data,
        historyTeamA: teamAPrediction.data.data,
        historyTeamB: teamBPrediction.data.data,
        team_a: values.bat_team,
        team_b: values.bowl_team,
      });
    } else {
      this.setState({ error: true, isLoading: false });
    }
  };

  handleSubmitSecondIteration = async (values) => {
    this.setState({ isLoading: true });

    let teamAPrediction = await post(
      constants.URL.PREDICTION.PREDICT_MATCH_WITH_TARGET_ODI,
      values
    );

    let dataB = {
      venue: "Shere Bangla National Stadium",
      bat_team: values.bowl_team,
      bowl_team: values.bat_team,
      runs: 0,
      wickets: 0,
      overs: 0.1,
      runs_last_5: 0,
      wickets_last_5: 0,
      fours_till_now: 0,
      sixes_till_now: 0,
      no_balls_till_now: 0,
      wide_balls_till_now: 0,
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
      this.setState({
        teamAPredictionSecondIteration: teamAPrediction.data,
        teamBPredictionSecondIteration: teamBPrediction.data,
        historyTeamA: teamAPrediction.data.data,
        historyTeamB: teamBPrediction.data.data,
        team_a_second_iteration: values.bat_team,
        team_b_second_iteration: values.bowl_team,
        isLoading: false,
        predicted: true,
      });
    } else {
      this.setState({ error: true, isLoading: false });
    }
  };

  getMatchDetails = (matchID, seriesID) => {
    get(
      "https://dev132-cricket-live-scores-v1.p.rapidapi.com/matchdetail.php",
      {
        "x-rapidapi-key": "f893ea82cdmshe13a300c1080d0bp182fbejsnd7bb8eef91d6",
        useQueryString: true,
        "Access-Control-Allow-Origin": "*",
      },
      {
        seriesid: seriesID,
        matchid: matchID,
      }
    )
      .then((response) => {
        if (response && response.data) {
          get(
            "https://dev132-cricket-live-scores-v1.p.rapidapi.com/match.php",
            {
              "x-rapidapi-key":
                "f893ea82cdmshe13a300c1080d0bp182fbejsnd7bb8eef91d6",
              useQueryString: true,
              "Access-Control-Allow-Origin": "*",
            },
            {
              seriesid: response.data.matchDetail.matchSummary.series.id,
              matchid: response.data.matchDetail.matchSummary.id,
            }
          )
            .then((matchResponse) => {
              let match = matchResponse.data.match;
              let teamA = match.awayTeam.name;
              let teamB = match.homeTeam.name;
              teamA = teamA.substring(0, teamA.length - 4);
              teamB = teamB.substring(0, teamB.length - 4);

              // if (match.status === "UPCOMING") {
              let values = {
                venue: "Shere Bangla National Stadium",
                bat_team: teamA,
                bowl_team: teamB,
                runs: 0,
                wickets: 0,
                overs: 0.1,
                runs_last_5: 0,
                wickets_last_5: 0,
                fours_till_now: 0,
                sixes_till_now: 0,
                no_balls_till_now: 0,
                wide_balls_till_now: 0,
                target: 0,
              };
              this.handleSubmit(values);
              let valuesSecondIteration = {
                venue: "Shere Bangla National Stadium",
                bat_team: teamB,
                bowl_team: teamA,
                runs: 0,
                wickets: 0,
                overs: 0.1,
                runs_last_5: 0,
                wickets_last_5: 0,
                fours_till_now: 0,
                sixes_till_now: 0,
                no_balls_till_now: 0,
                wide_balls_till_now: 0,
                target: 0,
              };
              this.handleSubmitSecondIteration(valuesSecondIteration);
              // }
            })
            .catch((error) => {
              console.log(error);
              console.log(error);
              console.log(error);
              console.log(error);
            });
        } else {
          this.setState({ match: "", isLoading: false });
        }
      })
      .catch((error) => {
        this.setState({ match: "", isLoading: false });
      });
  };

  getWinner = () => {
    const { teamAPrediction, teamBPrediction } = this.state;
    if (teamAPrediction.predictions.total > teamBPrediction.predictions.total) {
      return this.state.team_a;
    } else {
      return this.state.team_b;
    }
  };

  getWinnerSecond = () => {
    const {
      teamAPredictionSecondIteration,
      teamBPredictionSecondIteration,
    } = this.state;
    if (
      teamAPredictionSecondIteration.predictions.total >
      teamBPredictionSecondIteration.predictions.total
    ) {
      return this.state.team_a_second_iteration;
    } else {
      return this.state.team_b_second_iteration;
    }
  };

  render() {
    const { teamAPrediction, teamAPredictionSecondIteration } = this.state;

    const columns = [
      {
        title: "Batting Team",
        fixed: "left",
        dataIndex: "bat_team",
        key: "bat_team",
      },
      {
        title: "Bowling Team",
        fixed: "left",
        dataIndex: "bowl_team",
        key: "bowl_team",
      },
      {
        title: "Batsman",
        dataIndex: "batsman",
        key: "batsman",
      },
      {
        title: "Bowler",
        dataIndex: "bowler",
        key: "bowler",
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
        title: "Overs",
        dataIndex: "overs",
        key: "overs",
      },
      {
        title: "Runs Till Now",
        dataIndex: "runs",
        key: "runs",
      },
      {
        title: "Wickets Till Now",
        dataIndex: "wickets",
        key: "wickets",
      },
      {
        title: "Total Score",
        dataIndex: "total",
        key: "total",
      },
    ];
    return (
      <div>
        {this.state.isLoading ? (
          <Spin />
        ) : (
          <div>
            <Row gutter={10}>
              <Col span={12}>
                <h2>Stats Predicted if {this.state.team_a} bats first</h2>
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
                        <span style={{ fontSize: 15 }}>
                          {" "}
                          will win this match
                        </span>
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
                                dataPoints={
                                  teamAPrediction.predictions.runrates
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
                                dataPoints={
                                  teamAPrediction.predictions.runrates
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
                        </Col>
                        <Col span={12}>
                          <CWidgetDropdown
                            color="gradient-warning"
                            header={teamAPrediction.predictions.total_fours}
                            text={"Total Fours"}
                            footerSlot={
                              <ChartLineSimple
                                dataPoints={
                                  teamAPrediction.predictions.runrates
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
              <Col span={12}>
                <h2>Stats Predicted if {this.state.team_b} bats first</h2>
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
                          src={getFlagImages(this.getWinnerSecond())}
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
                          {this.getWinnerSecond()}
                        </span>
                        <span style={{ fontSize: 15 }}>
                          {" "}
                          will win this match
                        </span>
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
                              this.getWinnerSecond() ===
                              this.state.team_a_second_iteration
                                ? "gradient-success"
                                : "gradient-danger"
                            }
                            header={
                              teamAPredictionSecondIteration.predictions.total
                            }
                            text={this.state.team_a_second_iteration + " Score"}
                            footerSlot={
                              <ChartLineSimple
                                dataPoints={
                                  teamAPredictionSecondIteration.predictions
                                    .runrates
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
                            header={
                              teamAPredictionSecondIteration.predictions
                                .total_sixes
                            }
                            text="Total Sixes"
                            footerSlot={
                              <ChartLineSimple
                                dataPoints={
                                  teamAPredictionSecondIteration.predictions
                                    .runrates
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
                        </Col>
                        <Col span={12}>
                          <CWidgetDropdown
                            color="gradient-warning"
                            header={
                              teamAPredictionSecondIteration.predictions
                                .total_fours
                            }
                            text={"Total Fours"}
                            footerSlot={
                              <ChartLineSimple
                                dataPoints={
                                  teamAPredictionSecondIteration.predictions
                                    .runrates
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
                            label:
                              "Run Rate " + this.state.team_a_second_iteration,
                            backgroundColor: "#f87979",
                            data:
                              teamAPredictionSecondIteration.predictions
                                .runrates,
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
              title="History Team A"
              scroll={{ x: 1500 }}
              style={{
                width: "100%",
                borderRadius: 10,
                marginTop: 20,
                marginBottom: 20,
              }}
            >
              <Table columns={columns} dataSource={this.state.historyTeamA} />
            </Card>
            <Card
              title="History Team B"
              scroll={{ x: 1500 }}
              style={{
                width: "100%",
                borderRadius: 10,
                marginTop: 20,
                marginBottom: 20,
              }}
            >
              <Table columns={columns} dataSource={this.state.historyTeamB} />
            </Card>
          </div>
        )}
      </div>
    );
  }
}
