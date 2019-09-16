import React, { PureComponent } from "react";

class index extends PureComponent {
  constructor(props) {
    super(props);
  }
  getRows = () => {
    var batsmanScores = [];
    debugger;
    console.log(this.props.batsmanScores);
    for (let i in this.props.batsmanScores)
      batsmanScores.push(this.props.batsmanScores[i]);
    batsmanScores = batsmanScores.map(item => {
      return {
        name: item._id,
        rank: item.total_runs,
        total_runs: item.total_runs
      };
    });
    batsmanScores = batsmanScores.sort((a, b) => b.rank - a.rank);
    return batsmanScores.map((item, i) => {
      return (
        <tr key={i + 1}>
          <td>{item.name}</td>
          <td>{i + 1}</td>
          <td>{item.total_runs}</td>
        </tr>
      );
    });
  };

  getTabletRows = () => {
    return this.props.batsmanScores.map((item, i) => {
      return (
        <tr key={i}>
          <td>
            <div className="row">
              <div class="col-sm heading-th">batsman name:</div>
              <div class="col-sm">{item._id}</div>
            </div>
          </td>

          <td>
            <div className="row">
              <div class="col-sm heading-th">Rank:</div>
              <div class="col-sm">{item.over}</div>
            </div>
          </td>
          <td>
            <div className="row">
              <div class="col-sm heading-th">Total Runs:</div>
              <div class="col-sm">{item.total_runs}</div>
            </div>
          </td>
        </tr>
      );
    });
  };
  render() {
     if(!this.props.batsmanScores) return <div>Loading...</div>
    return (
      <div>
        <table className="table table-bordered container">
          <thead>
            <tr className="heading-main">
              <th>batsman name</th>
              <th>Rank</th>
              <th>total runs</th>
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
