import React, { Component } from "react";
import Callback from "../../../../auth/callback";
class index extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }
  componentWillMount() {
    window.addEventListener("resize", event => {
      this.setState({
        width: event,
        empty: false
      });
    });
  }
  goToDetailPage = id => {
    if (this.props.updateMatchDetails(id))
      this.props.history.push(`/dashboard/match/${id}`);
  };
  getRows = () => {
    var matches = [];
    for (let i in this.props.matches) matches.push(this.props.matches[i]);
    return matches.map((item, i) => {
      return (
        <tr key={i}>
          <td>{item.season}</td>
          <td>{item.city}</td>
          <td>{item.date}</td>
          <td>{item.team1}</td>
          <td>{item.team2}</td>
          <td>{item.winner}</td>
          <td>{item.venue}</td>
          <td>
            <a
              onClick={() => {
                this.goToDetailPage(item.id);
              }}
              title="View More"
            >
              <i className="fa fa-chevron-circle-right" aria-hidden="true"></i>
            </a>
          </td>
        </tr>
      );
    });
  };

  getDateFilter = () => {
    return (
      <div className="dropdown">
        <a
          className="btn filter-date dropdown-toggle"
          href="#"
          role="button"
          id="dropdownMenuLink"
          data-toggle="dropdown"
          aria-haspopup="true"
          aria-expanded="false"
        >
          Season
        </a>
        <div className="dropdown-menu" aria-labelledby="dropdownMenuLink">
          {[
            2008,
            2009,
            2010,
            2011,
            2012,
            2013,
            2014,
            2015,
            2016,
            2017,
            2018,
            2019
          ].map(item => {
            return (
              <a
                className="dropdown-item"
                key={item}
                onClick={() => {
                  this.props.searchMatches(item);
                }}
              >
                {item}
              </a>
            );
          })}
        </div>
      </div>
    );
  };
  getTabletRows = () => {
    return this.props.matches.map((item, i) => {
      return (
        <tr key={i}>
          <td>
            <div className="row">
              <div class="col-sm heading-th">season:</div>
              <div class="col-sm">{item.season}</div>
            </div>
          </td>
          <td>
            <div className="row">
              <div class="col-sm heading-th">city:</div>
              <div class="col-sm">{item.city}</div>
            </div>
          </td>
          <td>
            <div className="row">
              <div class="col-sm heading-th">date:</div>
              <div class="col-sm">{item.date}</div>
            </div>
          </td>
          <td>
            <div className="row">
              <div class="col-sm heading-th">team1:</div>
              <div class="col-sm">{item.team1}</div>
            </div>
          </td>
          <td>
            <div className="row">
              <div class="col-sm heading-th">team2:</div>
              <div class="col-sm">{item.team2}</div>
            </div>
          </td>
          <td>
            <div className="row">
              <div class="col-sm heading-th">winner:</div>
              <div class="col-sm">{item.winner}</div>
            </div>
          </td>
          <td>
            <div className="row">
              <div class="col-sm heading-th">venue:</div>
              <div class="col-sm">{item.venue}</div>
            </div>
          </td>
          <td>
            <div className="row">
              <div class="col-sm heading-th">View More</div>
              <div class="col-sm">
                <a
                  onClick={() => {
                    this.goToDetailPage(item.id);
                  }}
                  title="Click Here for More Details"
                >
                  <i
                    className="fa fa-chevron-circle-right"
                    aria-hidden="true"
                  ></i>
                </a>
              </div>
            </div>
          </td>
        </tr>
      );
    });
  };
  render() {
    if (this.props.matches === []) {
      return <Callback />;
    }
    return (
      <div>
        <div id="pagination">
          <span>
            {this.props.matches.length > 0 &&
              `${this.props.pageNumber} - ${this.props.matches.length} of ${this.props.totalMatches}`}
          </span>
          {this.props.overview === true && (
            <a
              onClick={() => {
                if (this.props.page > 0) {
                  this.props.decMatches(this.props.page - 1);
                }
              }}
            >
              <span class="fa fa-chevron-left"></span>
            </a>
          )}
          {this.props.overview === true && (
            <a
              onClick={() => {
                if (this.props.page >= 0) {
                  this.props.incMatches(this.props.page + 1);
                }
              }}
            >
              <span class="fa fa-chevron-right"></span>
            </a>
          )}
        </div>
        <table className="table table-bordered">
          <thead>
            <tr className="heading-main">
              <th>{this.getDateFilter()}</th>
              <th>city</th>
              <th>date</th>
              <th>team1</th>
              <th>team2</th>
              <th>winner</th>
              <th>venues</th>
              <th></th>
            </tr>
          </thead>
          <tbody>
            {window.innerWidth > 1100 ? this.getRows() : this.getTabletRows()}
          </tbody>
        </table>

        {this.props.matches.length === 0 && (
          <div className="alert alert-danger">{"Records not found"}</div>
        )}
      </div>
    );
  }
}

export default index;
