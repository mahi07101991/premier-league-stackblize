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
    return batsmanScores.map((item, i) => {
      return (
        <tr key={i}>
          <td>{item._id}</td>
          <td>{item.over}</td>
          <td>{item.ball}</td>
          <td>{item.is_super_over}</td>
          <td>{item.wide_runs}</td>
          <td>{item.bye_runs}</td>
          <td>{item.legbye_runs}</td>
          <td>{item.noball_runs}</td>
          <td>{item.penalty_runs}</td>
          <td>{item.batsman_runs}</td>
          <td>{item.extra_runs}</td>
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
              <div class="col-sm heading-th">over:</div>
              <div class="col-sm">{item.over}</div>
            </div>
          </td>

          <td>
            <div className="row">
              <div class="col-sm heading-th">ball:</div>
              <div class="col-sm">{item.ball}</div>
            </div>
          </td>

          <td>
            <div className="row">
              <div class="col-sm heading-th">is super over:</div>
              <div class="col-sm">{item.is_super_over}</div>
            </div>
          </td>

          <td>
            <div className="row">
              <div class="col-sm heading-th">wide runs:</div>
              <div class="col-sm">{item.wide_runs}</div>
            </div>
          </td>

          <td>
            <div className="row">
              <div class="col-sm heading-th">bye runs:</div>
              <div class="col-sm">{item.bye_runs}</div>
            </div>
          </td>

          <td>
            <div className="row">
              <div class="col-sm heading-th">legbye runs:</div>
              <div class="col-sm">{item.legbye_runs}</div>
            </div>
          </td>

          <td>
            <div className="row">
              <div class="col-sm heading-th">noball runs:</div>
              <div class="col-sm">{item.noball_runs}</div>
            </div>
          </td>

          <td>
            <div className="row">
              <div class="col-sm heading-th">penalty runs:</div>
              <div class="col-sm">{item.penalty_runs}</div>
            </div>
          </td>

          <td>
            <div className="row">
              <div class="col-sm heading-th">batsman runs:</div>
              <div class="col-sm">{item.batsman_runs}</div>
            </div>
          </td>

          <td>
            <div className="row">
              <div class="col-sm heading-th">extra runs:</div>
              <div class="col-sm">{item.extra_runs}</div>
            </div>
          </td>

          <td>
            <div className="row">
              <div class="col-sm heading-th">total runs:</div>
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
        <table className="table table-bordered">
          <thead>
            <tr className="heading-main">
              <th>batsman name</th>
              <th>over</th>
              <th>ball</th>
              <th>is super over</th>
              <th>wide runs</th>
              <th>bye runs</th>
              <th>legbye runs</th>
              <th>noball runs</th>
              <th>penalty runs</th>
              <th>batsman runs</th>
              <th>extra runs</th>
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
