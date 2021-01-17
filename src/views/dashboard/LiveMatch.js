import React, { Component } from "react";
import { CCard, CCardBody } from "@coreui/react";
import { get } from "../../helpers/request.js";
import { Spin, List, Card, Row, Col, Table } from "antd";
import Avatar from "antd/lib/avatar/avatar";
import moment from "moment";
import "./index.css";

export default class LiveMatch extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isLoading: true,
      match: "",
    };
  }
  componentDidMount() {
    console.log(this.props.history);
    let search = this.props.history.location.search;
    search = search.split("/");
    let matchID = search[0].replace("?", "");
    let seriesID = search[1];
    this.getMatchDetails(matchID, seriesID);
  }

  renderBatsman = (batsman) => {
    return (
      <div>
        <div>
          <span style={{ fontWeight: "bold" }}>Name:</span> {batsman.name}
        </div>
        <div className="mt-2">
          <span style={{ fontWeight: "bold" }}>Runs Scored:</span>{" "}
          {batsman.runs}
        </div>
        <div className="mt-2">
          <span style={{ fontWeight: "bold" }}>Balls Faced:</span>{" "}
          {batsman.ballsFaced}
        </div>
        <div className="mt-2">
          <span style={{ fontWeight: "bold" }}>Strike Rate:</span>{" "}
          {batsman.strikeRate}
        </div>
      </div>
    );
  };

  getMatchDetails = (matchID, seriesID) => {
    get(
      "https://dev132-cricket-live-scores-v1.p.rapidapi.com/matchdetail.php",
      {
        "x-rapidapi-key": "f893ea82cdmshe13a300c1080d0bp182fbejsnd7bb8eef91d6",
        useQueryString: true,
      },
      {
        seriesid: seriesID,
        matchid: matchID,
      }
    )
      .then((response) => {
        if (response && response.data) {
          this.setState({
            match: response.data.matchDetail,
            isLoading: false,
          });
        } else {
          this.setState({ match: "", isLoading: false });
        }
      })
      .catch((error) => {
        this.setState({ match: "", isLoading: false });
      });
  };
  mapData = (innings) => {
    let data = [];
    innings.map((item) => {
      item.isDeclared = item.isDeclared ? "Yes" : "No";
      data.push(item);
    });
    return innings;
  };
  render() {
    const columns = [
      {
        title: "Innings Name",
        dataIndex: "name",
        key: "name",
      },
      {
        title: "Team Name",
        dataIndex: "shortName",
        key: "shortName",
      },
      {
        title: "Wickets",
        dataIndex: "wickets",
        key: "wickets",
      },
      {
        title: "Runs",
        dataIndex: "runs",
        key: "runs",
      },
      {
        title: "Overs",
        dataIndex: "overs",
        key: "overs",
      },
      {
        title: "Declared",
        dataIndex: "isDeclared",
        key: "isDeclared",
      },
    ];
    const { match } = this.state;
    return (
      <div>
        {this.state.isLoading ? (
          <Spin />
        ) : (
          <div>
            <span style={{ fontWeight: "bold" }}>
              Toss Decision:{" "}
              <span style={{ fontWeight: "normal" }}>{match.tossMessage}</span>
            </span>
            <div style={{ fontWeight: "bold", marginTop: 10 }}>
              Match Result:{" "}
              <span style={{ fontWeight: "normal" }}>
                {match.matchSummary.matchSummaryText}
              </span>
            </div>
            <Row gutter={10} className="mt-3">
              <Col span={8}>
                <Card title="Team Batting">
                  <div>
                    <span style={{ fontWeight: "bold" }}>Score:</span>{" "}
                    {match.teamBatting.score}
                  </div>
                  <div className="mt-2">
                    <span style={{ fontWeight: "bold" }}>Short Name:</span>{" "}
                    {match.teamBatting.shortName}
                  </div>
                  <div className="mt-2">
                    <span style={{ fontWeight: "bold" }}>Team Name:</span>{" "}
                    {match.teamBatting.name}
                  </div>
                </Card>
              </Col>
              <Col span={8}>
                <Card title="Team Bowling">
                  <div>
                    <span style={{ fontWeight: "bold" }}>Score:</span>{" "}
                    {match.teamBowling.score}
                  </div>
                  <div className="mt-2">
                    <span style={{ fontWeight: "bold" }}>Short Name:</span>{" "}
                    {match.teamBowling.shortName}
                  </div>
                  <div className="mt-2">
                    <span style={{ fontWeight: "bold" }}>Team Name:</span>{" "}
                    {match.teamBowling.name}
                  </div>
                </Card>
              </Col>
              <Col span={8}>
                <Card title="Umpires">
                  <div>
                    <span style={{ fontWeight: "bold" }}>First Umpire:</span>{" "}
                    {match.umpires.firstUmpire.name}
                  </div>
                  <div className="mt-2">
                    <span style={{ fontWeight: "bold" }}>Second Umpire:</span>{" "}
                    {match.umpires.secondUmpire.name}
                  </div>
                  <div className="mt-2">
                    <span style={{ fontWeight: "bold" }}>Third Umpire:</span>{" "}
                    {match.umpires.thirdUmpire.name}
                  </div>
                </Card>
              </Col>
            </Row>
            <Row gutter={10} className="mt-2">
              <Col span={8}>
                <Card title="Striker">
                  {match.currentBatters[0].isFacing
                    ? this.renderBatsman(match.currentBatters[0])
                    : this.renderBatsman(match.currentBatters[1])}
                </Card>
              </Col>
              <Col span={8}>
                <Card title="Non Striker">
                  {match.currentBatters[0].isFacing
                    ? this.renderBatsman(match.currentBatters[1])
                    : this.renderBatsman(match.currentBatters[0])}
                </Card>
              </Col>
              <Col span={8}>
                <Card title="Bowler">
                  <div>
                    <span style={{ fontWeight: "bold" }}>Name:</span>{" "}
                    {match.bowler.name}
                  </div>
                  <div>
                    <span style={{ fontWeight: "bold" }}>Wickets:</span>{" "}
                    {match.bowler.wickets}
                  </div>
                  <div>
                    <span style={{ fontWeight: "bold" }}>Runs Against:</span>{" "}
                    {match.bowler.runsAgainst}
                  </div>
                  <div>
                    <span style={{ fontWeight: "bold" }}>Bowler Over:</span>{" "}
                    {match.bowler.bowlerOver}
                  </div>
                  <div>
                    <span style={{ fontWeight: "bold" }}>Economy:</span>{" "}
                    {match.bowler.economy}
                  </div>
                </Card>
              </Col>
            </Row>
            <Card title="Innings" className="mt-2">
              <Table
                dataSource={this.mapData(match.innings)}
                columns={columns}
              />
            </Card>
          </div>
        )}
      </div>
    );
  }
}
