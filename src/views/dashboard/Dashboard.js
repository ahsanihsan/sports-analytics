import React, { Component } from "react";
import { CCard, CCardBody } from "@coreui/react";
import { get } from "../../helpers/request.js";
import { Spin, List, Card, Button } from "antd";
import Avatar from "antd/lib/avatar/avatar";
import moment from "moment";

export default class Dashboard extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isLoading: true,
      allMatches: [],
    };
  }
  componentDidMount() {
    this.liveMatches();
  }
  liveMatches = () => {
    get("https://dev132-cricket-live-scores-v1.p.rapidapi.com/matches.php", {
      "x-rapidapi-key": "f893ea82cdmshe13a300c1080d0bp182fbejsnd7bb8eef91d6",
      "Access-Control-Allow-Origin": "*",
    })
      .then((response) => {
        if (response && response.data) {
          this.setState({
            allMatches: response.data.matchList.matches,
            isLoading: false,
          });
        } else {
          this.setState({ allMatches: [], isLoading: false });
        }
      })
      .catch((error) => {
        this.setState({ allMatches: [], isLoading: false });
      });
  };
  render() {
    return (
      <div>
        {this.state.isLoading ? (
          <Spin />
        ) : (
          <Card>
            <List
              size="large"
              bordered
              dataSource={this.state.allMatches}
              renderItem={(item) => (
                <List.Item>
                  <List.Item.Meta
                    avatar={
                      <Avatar size={70} style={{ backgroundColor: "red" }}>
                        {item.status}
                      </Avatar>
                    }
                    title={item.series.name}
                    description={
                      <div>
                        {item.status === "UPCOMING"
                          ? "Match will started on " +
                            moment(item.startDateTime).format(
                              "MMMM Do YYYY, h:mm:ss a"
                            )
                          : item.matchSummaryText}
                      </div>
                    }
                  />
                  {item.status !== "UPCOMING" ? (
                    <Button
                      className="mr-2"
                      onClick={() =>
                        this.props.history.push({
                          pathname: "/live-match",
                          search: item.id + "/" + item.series.id,
                        })
                      }
                    >
                      Stream Match
                    </Button>
                  ) : undefined}
                  {!item.name.includes("Test") &&
                  !item.series.name.includes("KFC") &&
                  !item.series.name.includes("Women") ? (
                    <Button
                      className="mr-2"
                      type="primary"
                      onClick={() =>
                        this.props.history.push({
                          pathname: "/live-match-prediction",
                          search: item.id + "/" + item.series.id,
                        })
                      }
                    >
                      Predict Match
                    </Button>
                  ) : undefined}
                </List.Item>
              )}
            />
          </Card>
        )}
      </div>
    );
  }
}
