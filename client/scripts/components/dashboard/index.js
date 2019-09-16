import React, { Component } from "react";
import SideNavigation from "../side-navigation";
import { Route } from "react-router-dom";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import * as actions from "../../../../redux/actions";
import { withRouter } from "react-router";
import NavBar from "../navbar";
import Overview from "../overview";
import MatchDetails from "../match-details";
import BatsmanScore from "../batsman-score";
import BatsmanRanking from "../batsman-ranking";
import TeamvsTeam from "../team-vs-team";
import BatsmanScoreChart from "../batsman-score-chart";
import BatsmanRankingChart from "../batsman-ranking-chart";
import TeamvsTeamChart from "../team-vs-team-chart";
import ManageScores from "../manage-scores";
import ManageTeam from "../manage-team";
import Footer from "../footer";
class index extends Component {
  constructor(props) {
    super(props);
    this.state = {
      toggle: true
    };
  }
  componentWillMount() {
    this.props.actions.loadMatches(1);
    this.props.actions.batsmanScores();
  }
  componentDidMount() {}
  toggleBar = () => {
    this.setState({ toggle: !this.state.toggle });
  };
  render() {
    return (
      <React.Fragment>
        <div className="container-container">
          <NavBar
            {...this.props}
            auth={this.props.auth}
            searchMatches={this.props.actions.searchMatches}
          />
        </div>
        <div className="wrapper">
          <SideNavigation
            toggle={this.state.toggle}
            {...this.props}
            hideSideBar={() => {
              this.toggleBar();
            }}
            loadMatches={this.props.actions.loadMatches}
          />
          <div id="content">
            <div className="floating-title">
              <button
                type="button"
                id="sidebarCollapse"
                className={
                  this.state.toggle ? "navbar-btn" : "navbar-btn active"
                }
                onClick={() => this.toggleBar()}
              >
                <span />
                <span />
                <span />
              </button>

              {this.state.toggle === true && window.innerWidth < 768 && (
                <h2>
                  {this.props.match.params.id
                    ? this.props.match.params.id.replace(/-/g, " ")
                    : " "}
                </h2>
              )}
              {window.innerWidth > 768 && (
                <h2>
                  {this.props.match.params.id
                    ? this.props.match.params.id.replace(/-/g, " ")
                    : " "}
                </h2>
              )}
            </div>
            <div className="container-fluid">
              {this.state.toggle === true && window.innerWidth < 768 && (
                <>
                  <Route
                    path={"/dashboard/overview"}
                    render={props => (
                      <Overview
                        {...props}
                        totalMatches={this.props.totalMatches}
                        matches={this.props.matches}
                        page={this.props.page}
                        decMatches={this.props.actions.decMatches}
                        incMatches={this.props.actions.incMatches}
                        pageNumber={this.props.page}
                        overview={this.props.overview}
                        searchMatches={this.props.actions.searchMatches}
                        updateMatchDetails={this.props.actions.searchMatches}
                      />
                    )}
                  />
                  <Route
                    path={"/dashboard/match/:id"}
                    render={props => (
                      <MatchDetails
                        {...props}
                        updateMatchDetails={
                          this.props.actions.updateMatchDetails
                        }
                        matchDetails={this.props.matchDetails}
                      />
                    )}
                  />
                  <Route
                    path={"/dashboard/batsman-score"}
                    render={props => (
                      <BatsmanScore batsmanScores={this.props.batsmanScores} />
                    )}
                  />
                  <Route
                    path={"/dashboard/batsman-ranking"}
                    render={props => (
                      <BatsmanRanking
                        batsmanScores={this.props.batsmanScores}
                      />
                    )}
                  />
                  <Route
                    path={"/dashboard/team-vs-team"}
                    component={TeamvsTeam}
                  />
                  <Route
                    path={"/dashboard/batsman-score-chart"}
                    component={BatsmanScoreChart}
                  />
                  <Route
                    path={"/dashboard/batsman-ranking-chart"}
                    component={BatsmanRankingChart}
                  />
                  <Route
                    path={"/dashboard/team-vs-team-chart"}
                    component={TeamvsTeamChart}
                  />
                  <Route
                    path={"/dashboard/manage-scores"}
                    component={ManageScores}
                  />
                  <Route
                    path={"/dashboard/manage-team"}
                    component={ManageTeam}
                  />
                </>
              )}
              {window.innerWidth > 768 && (
                <>
                  <Route
                    path={"/dashboard/overview"}
                    render={props => (
                      <Overview
                        {...props}
                        totalMatches={this.props.totalMatches}
                        matches={this.props.matches}
                        page={this.props.page}
                        decMatches={this.props.actions.decMatches}
                        incMatches={this.props.actions.incMatches}
                        pageNumber={this.props.page}
                        overview={this.props.overview}
                        searchMatches={this.props.actions.searchMatches}
                        updateMatchDetails={
                          this.props.actions.updateMatchDetails
                        }
                      />
                    )}
                  />
                  <Route
                    path={"/dashboard/match/:id"}
                    render={props => (
                      <MatchDetails
                        {...props}
                        updateMatchDetails={
                          this.props.actions.updateMatchDetails
                        }
                        matchDetails={this.props.matchDetails}
                      />
                    )}
                  />
                  <Route
                    path={"/dashboard/batsman-score"}
                    render={props => (
                      <BatsmanScore batsmanScores={this.props.batsmanScores} />
                    )}
                  />
                  <Route
                    path={"/dashboard/batsman-ranking"}
                    render={props => (
                      <BatsmanRanking
                        batsmanScores={this.props.batsmanScores}
                      />
                    )}
                  />
                  <Route
                    path={"/dashboard/team-vs-team"}
                    component={TeamvsTeam}
                  />
                  <Route
                    path={"/dashboard/batsman-score-chart"}
                    component={BatsmanScoreChart}
                  />
                  <Route
                    path={"/dashboard/batsman-ranking-chart"}
                    component={BatsmanRankingChart}
                  />
                  <Route
                    path={"/dashboard/team-vs-team-chart"}
                    component={TeamvsTeamChart}
                  />
                  <Route
                    path={"/dashboard/manage-scores"}
                    component={ManageScores}
                  />
                  <Route
                    path={"/dashboard/manage-team"}
                    component={ManageTeam}
                  />
                </>
              )}
            </div>
          </div>
        </div>
        <Footer />
      </React.Fragment>
    );
  }
}

const mapStateToProps = state => {
  return {
    matches: state.matches,
    page: state.page,
    totalMatches: state.totalMatches,
    pageNumber: state.page,
    overview: state.overview,
    matchDetails: state.matchDetails,
    batsmanScores: state.batsmanScores
  };
};

const mapDispatchToProps = dispatch => ({
  actions: bindActionCreators(actions, dispatch)
});
export default connect(
  mapStateToProps,
  mapDispatchToProps
)(withRouter(index));
