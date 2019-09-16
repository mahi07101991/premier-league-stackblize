import React, { Component } from "react";

class index extends Component {
  constructor(props) {
    super(props);
    this.state = {
      profile: {}
    };
    this.search = React.createRef();
  }
  componentWillMount() {
    if (this.props.auth.isAuthenticated()) {
      this.setState({ profile: {} });
      const { userProfile, getProfile } = this.props.auth;
      if (!userProfile) {
        getProfile((err, profile) => {
          this.setState({ profile });
        });
      } else {
        this.setState({ profile: userProfile });
      }
    }
  }
  goTo(route) {
    this.props.history.push(`/${route}`);
  }

  login() {
    this.props.auth.login();
  }

  logout() {
    this.props.auth.logout();
  }
  searchMatches = () => {
    let value = this.search.current.value;
    if (this.search.current.value == "") return false;
    this.props.searchMatches(value);
  };

  render() {
    return (
      <nav className="navbar navbar-expand-lg navbar-light bg-dark">
        <a className="navbar-brand" href="#">
          <img
            src="https://cdn.worldvectorlogo.com/logos/phoenix-36.svg"
            width={30}
            height={30}
            alt="Premier League"
          />
          <span style={{ color: "#fff" }}>Premier League</span>
        </a>

        <button
          className="navbar-toggler"
          type="button"
          style={{ background: "#fff" }}
          data-toggle="collapse"
          data-target="#navbarSupportedContent"
          aria-controls="navbarSupportedContent"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span className="navbar-toggler-icon" />
        </button>
        <div className="collapse navbar-collapse" id="navbarSupportedContent">
          <ul className="navbar-nav ml-auto">
            <li className="nav-item active">
              {this.props.auth.isAuthenticated() ? (
                <div className="">
                  <a class="nav-link">
                    <span>
                      {this.state.profile ? (
                        <img width="22px" src={this.state.profile.picture} />
                      ) : null}
                    </span>
                    <span style={{ marginLeft: "4px", color: "#fff" }}>
                      {this.state.profile ? this.state.profile.name : null}
                    </span>
                  </a>
                </div>
              ) : (
                ""
              )}
            </li>
            <li className="nav-item active">
              {!this.props.auth.isAuthenticated() ? (
                <a
                  className="nav-link active"
                  onClick={() => {
                    this.login();
                  }}
                >
                  <span className="white">Login&nbsp;&nbsp;</span>
                </a>
              ) : (
                <a
                  className="nav-link active"
                  onClick={() => {
                    this.logout();
                  }}
                >
                  <span className="green">Logout</span>
                </a>
              )}
            </li>
          </ul>
          <div className="form-inline my-2 my-lg-0">
            <input
              className="form-control mr-sm-2 search-input"
              type="search"
              placeholder="Search"
              aria-label="Search"
              style={{ borderRadius: "0px", borderBottom: "2px solid crimson" }}
              ref={this.search}
              onKeyUp={e => {
                if (e.keyCode === 13) this.searchMatches();
              }}
            />
            <button
              className="btn btn-outline-success my-2 my-sm-0"
              type="submit"
              style={{ color: "white", borderColor: "white" }}
              onClick={() => {
                this.searchMatches();
              }}
            >
              Go
            </button>
          </div>
        </div>
      </nav>
    );
  }
}

export default index;
