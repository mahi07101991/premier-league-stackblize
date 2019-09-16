import getService from "../../services";

export function loadMatches() {
  return dispatch => {
    return getService(`http://localhost:5000/api/matches/0`, "GET")
      .then(response => {
        dispatch({ type: "LOAD_MATCHES", data: response.data, overview: true });
      })
      .catch(e => console.log(e));
  };
}
export function incMatches(page) {
  return dispatch => {
    return getService(`http://localhost:5000/api/matches/${page}`, "GET")
      .then(response => {
        dispatch({ type: "INC_MATCHES", data: response.data, overview: true });
      })
      .catch(e => console.log(e));
  };
}

export function decMatches(page) {
  return dispatch => {
    return getService(`http://localhost:5000/api/matches/${page}`, "GET")
      .then(response => {
        dispatch({ type: "DEC_MATCHES", data: response.data, overview: true });
      })
      .catch(e => console.log(e));
  };
}

export function searchMatches(value) {
  return dispatch => {
    return getService(`http://localhost:5000/api/matches/find/${value}`, "GET")
      .then(response => {
        dispatch({
          type: "LOAD_MATCHES",
          data: response.data,
          overview: false
        });
      })
      .catch(e => console.log(e));
  };
}
export function batsmanScores() {
  return dispatch => {
    return getService(`http://localhost:5000/api/batsmanscore`, "GET")
      .then(response => {
        dispatch({
          type: "LOAD_BATSMAN_SCORES",
          data: response.data
        });
      })
      .catch(e => console.log(e));
  };
}
export function updateMatchDetails(id) {
  return dispatch => {
    return getService(`http://localhost:5000/api/deliveries/${id}`, "GET")
      .then(response => {
        dispatch({
          type: "MATCHE_DETAILS",
          data: response.data
        });
      })
      .catch(e => console.log(e));
  };
}

export function pageDec() {
  return dispatch => {
    return dispatch({ type: "PAGE_DEC" });
  };
}
