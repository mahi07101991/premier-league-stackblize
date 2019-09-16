import React, { Component } from "react";

class index extends Component {
  constructor(props) {
    super(props);
  }
  componentDidMount() {
    console.log(this.props.matchDetails);
  }
  getRows = () => {
    var matches = [];
    for (let i in this.props.matchDetails)
      matches.push(this.props.matchDetails[i]);
    return matches.map((item, i) => {
      return (
        <tr key={i}>
          {[
            "inning",
            "batting_team",
            "bowling_team",
            "over",
            "ball",
            "batsman",
            "non_striker",
            "bowler",
            "is_super_over",
            "wide_runs",
            "bye_runs",
            "legbye_runs",
            "noball_runs",
            "penalty_runs",
            "batsman_runs",
            "extra_runs",
            "total_runs",
            "player_dismissed",
            "dismissal_kind",
            "fielder"
          ].map(index => {
            return <td>{item[index]}</td>;
          })}
        </tr>
      );
    });
  };
  getTabletRows = () => {
    return this.props.matchDetails.map((item, i) => {
      return (
        <tr key={i}>
          {[
            "inning",
            "batting_team",
            "bowling_team",
            "over",
            "ball",
            "batsman",
            "non_striker",
            "bowler",
            "is_super_over",
            "wide_runs",
            "bye_runs",
            "legbye_runs",
            "noball_runs",
            "penalty_runs",
            "batsman_runs",
            "extra_runs",
            "total_runs",
            "player_dismissed",
            "dismissal_kind",
            "fielder"
          ].map(index => {
            return (
              <td>
                <div className="row">
                  <div class="col-sm heading-th">{index}</div>
                  <div class="col-sm">{item[index]}</div>
                </div>
              </td>
            );
          })}
        </tr>
      );
    });
  };
  render() {
    if (!this.props.matchDetails) {
      return <div>Loading...</div>;
    }
    return (
      <div>
        <h2 className="team-title" style={{ border: "none" }}>
          {`${this.props.matchDetails[0].batting_team} - ${this.props.matchDetails[0].bowling_team}`}
        </h2>
        <table className="table table-bordered">
          <thead>
            <tr className="heading-main">
              <th>inning</th>
              <th>batting team</th>
              <th>bowling team</th>
              <th>over</th>
              <th>ball</th>
              <th>batsman</th>
              <th>non striker</th>
              <th>bowler</th>
              <th>is super over</th>
              <th>wide runs</th>
              <th>bye runs</th>
              <th>legbye runs</th>
              <th>noball runs</th>
              <th>penalty runs</th>
              <th>batsman runs</th>
              <th>extra runs</th>
              <th>total runs</th>
              <th>player dismissed</th>
              <th>dismissal kind</th>
              <th>fielder</th>
            </tr>
          </thead>
          <tbody>
            {window.innerWidth > 1100 ? this.getRows() : this.getTabletRows()}
          </tbody>
        </table>
      </div>
    );
  }
}

export default index;
