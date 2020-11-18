import React, { Component } from "react";
import { Button, Card, Col, notification, Row, Select, Spin } from "antd";
import { MatchTypes, Months, Teams } from "../../helpers/Teams";
import constants from "../../helpers/constants";
import { post } from "../../helpers/request";
import ChartBarSimple from "../charts/ChartBarSimple";
import ChartLineSimple from "../charts/ChartLineSimple";
import { CChartBar } from "@coreui/react-chartjs";
import { CWidgetDropdown } from "@coreui/react";
export default class RunRate extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isLoading: false,
    };
  }

  handleSubmit = () => {
    this.setState({ isLoading: true });
    const { batting_team, bowling_team, city, month, match_type } = this.state;
    post(constants.URL.PREDICTION.RUN_RATE, {
      batting_team,
      bowling_team,
      city,
      month,
      match_type,
    })
      .then((response) => {
        if (response && response.data) {
          console.log(response);
        }
        this.setState({ isLoading: false });
      })
      .catch((error) => {
        this.setState({ isLoading: false });
        notification.error({
          message:
            "There was a problem fetching users, for you. Our team is looking at the issue on our servers.",
        });
      });
  };
  onChange(bowling_team) {
    console.log("******this state******");
    console.log(bowling_team);
    console.log("******this state******");
  }
  render() {
    return (
      <div>
        <Row gutter={10}>
          <Col span={9}>
            <Card title="Team Data" style={{ width: "100%", borderRadius: 10 }}>
              <div>
                <label>Batting Team</label>
                <Select
                  onChange={(batting_team) => this.setState({ batting_team })}
                  placeholder="Select Batting Team"
                  style={{ width: "100%", borderRadius: 10, marginTop: 5 }}
                >
                  <Select.Option>Pakistan</Select.Option>
                </Select>
              </div>
              <div style={{ marginTop: 10 }}>
                <label>Bowling Team</label>
                <Select
                  onChange={(bowling_team) => this.onChange(bowling_team)}
                  placeholder="Select Bowling Team"
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
            <Card title="Run Rate" style={{ width: "100%", borderRadius: 10 }}>
              {this.state.isLoading ? (
                <Spin />
              ) : this.state.predicted ? (
                <div>
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
                <div>Please select values to diplay run rate.</div>
              )}
            </Card>
          </Col>
        </Row>
      </div>
    );
  }
}
