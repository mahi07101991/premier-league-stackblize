import React, { Component } from "react";
import { Route, Redirect, Switch } from "react-router-dom";
import Dashboard from "./client/scripts/components/dashboard";
import Auth from "./auth/auth";
import Callback from "./auth/callback";

class Root extends Component {
  constructor(props) {
    super(props);
    this.auth = new Auth(this.props.history);
  }
  handleAuthentication = ({ location }) => {
    if (/access_token|id_token|error/.test(location.hash)) {
      this.auth.handleAuthentication();
    }
  };
  render() {
    return (
      <React.Fragment>
        <Switch>
          <Redirect exact={true} path="/" to={"/dashboard/overview"} />
          <Route
            path="/dashboard/:id"
            render={() => <Dashboard auth={this.auth} {...this.props} />}
          />
          <Route
            path="/callback"
            render={props => {
              this.handleAuthentication(props);
              return <Callback {...props} />;
            }}
          />
        </Switch>
      </React.Fragment>
    );
  }
}

export default Root;
