import React, { PureComponent } from "react";

class index extends PureComponent {
  constructor(props) {
    super(props);
    this.paths = [
      { path: "/dashboard/overview", title: "Overview" },
      { path: "/dashboard/batsman-score", title: "Batsman Score" },
      { path: "/dashboard/batsman-ranking", title: "Batsman Ranking" },
      { path: "/dashboard/team-vs-team", title: "Team1 vs Team2" },
      { path: "/dashboard/batsman-score-chart", title: "Batsman Score Chart" },
      {
        path: "/dashboard/batsman-ranking-chart",
        title: "Batsman Ranking Chart"
      },
      { path: "/dashboard/team-vs-team-chart", title: "Team1 vs Team2 Chart" },
      { path: "/dashboard/manage-scores", title: "Manage Scores" },
      { path: "/dashboard/manage-team", title: "Manage Team" }
    ];
  }
  componentDidMount() {}
  goToPage = path => {
    window.innerWidth < 980 && this.props.hideSideBar();
    if (path === "/dashboard/overview") this.props.loadMatches();
    this.props.history.push(path);
  };
  render() {
    return (
      <nav id="sidebar" className={!this.props.toggle ? "active" : ""}>
        <ul className="list-unstyled components">
          <li className="first-li-elemet"></li>
          {this.paths.map((item, index) => {
            return (
              <li key={index}>
                <a
                  onClick={() => {
                    this.goToPage(item.path);
                  }}
                >
                  {item.title}
                </a>
              </li>
            );
          })}
        </ul>
        <ul className="list-unstyled CTAs">
          <li>
            <a className="download">Contact Us</a>
          </li>
          <li>
            <a className="article">Feedback</a>
          </li>
        </ul>
      </nav>
    );
  }
}

export default index;
