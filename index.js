import React, { Component } from "react";
import ReactDOM from "react-dom";
import { Provider } from "react-redux";
import thunk from "redux-thunk";
import reducers from "./redux/reducer";
import { createStore, applyMiddleware } from "redux";
import * as serviceWorker from "./serviceWorker";
import "./index.css";
import "jquery/dist/jquery";
import "popper.js/dist/popper.min.js";
import "bootstrap/dist/js/bootstrap";
import Root from "./app";
import { Route, Switch } from "react-router";
import { Router } from "react-router";
import { history } from "./history";

function saveToLocalStorage(state) {
  try {
    const serializedState = JSON.stringify(state);
    localStorage.setItem("state", serializedState);
  } catch (e) {
    console.log(e);
  }
}

function loadFromLocalStorage() {
  try {
    const serializedState = localStorage.getItem("state");
    if (serializedState === null) return undefined;
    return JSON.parse(serializedState);
  } catch (e) {
    console.log(e);
    return undefined;
  }
}
const persistedState = loadFromLocalStorage();

let store = createStore(reducers, persistedState, applyMiddleware(thunk));

store.subscribe(() => saveToLocalStorage(store.getState()));
class App extends Component {
  constructor(props) {
    super(props);
  }
  render() {
    return (
      <Provider store={store}>
        <Router history={history}>
          <Switch>
            <Route component={Root} />
          </Switch>
        </Router>
      </Provider>
    );
  }
}

ReactDOM.render(<App />, document.getElementById("root"));

serviceWorker.unregister();
