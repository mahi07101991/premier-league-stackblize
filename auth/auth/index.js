import auth0 from "auth0-js";

class Auth {
  constructor(history) {
    this.history = history;
    this.userProfile = null;
    this.auth0 = new auth0.WebAuth({
      domain: "mahi07101991.auth0.com",
      clientID: "PbECXMRRhzC6cDNY1PzY5QvFu92sGJFd",
      redirectUri: "http://localhost:3000/callback",
      audience: "http://localhost:5000",
      responseType: "token id_token",
      scope: "openid profile email"
    });
  }

  login = () => {
    this.auth0.authorize();
  };

  handleAuthentication = () => {
    this.auth0.parseHash((err, authResult) => {
      if (authResult && authResult.accessToken && authResult.idToken) {
        this.setSession(authResult);
      } else if (err) {
        this.history.replace("/");
        console.log(err);
        alert(`Error: ${err.error}. Check the console for further details.`);
      }
    });
  };

  getAccessToken = () => {
    return localStorage.getItem("access_token");
  };

  getIdToken = () => {
    return localStorage.getItem("id_token");
  };

  setSession = authResult => {
    // Set isLoggedIn flag in localStorage
    localStorage.setItem("isLoggedIn", "true");

    // Set the time that the access token will expire at
    let expiresAt = JSON.stringify(
      authResult.expiresIn * 1000 + new Date().getTime()
    );
    localStorage.setItem("access_token", authResult.accessToken);
    localStorage.setItem("id_token", authResult.idToken);
    localStorage.setItem("expires_at", expiresAt);

    // navigate to the home route
    this.history.replace("/dashboard/overview");
  };
  getProfile = cb => {
    if (this.userProfile) return cb(this.userProfile);
    this.auth0.client.userInfo(this.getAccessToken(), (err, profile) => {
      if (profile) {
        this.userProfile = profile;
      }
      cb(err, profile);
    });
  };

  logout = () => {
    // Remove tokens and expiry time
    localStorage.removeItem("id_token");
    localStorage.removeItem("expires_at");
    localStorage.removeItem("access_token");

    // Remove user profile
    this.userProfile = null;

    // Remove isLoggedIn flag from localStorage
    localStorage.removeItem("isLoggedIn");
    this.auth0.logout({
      clientID: process.env.REACT_APP_AUTH0_CLIENT_ID,
      returnTo: "http://localhost:3000"
    });
  };

  isAuthenticated = () => {
    // Check whether the current time is past the
    // access token's expiry time
    let expiresAt = JSON.parse(localStorage.getItem("expires_at"));
    return new Date().getTime() < expiresAt;
  };
}

export default Auth;
