let defaultState = {
  matches: [],
  deliveries: [],
  page: 0 + 1,
  overview: true,
  batsmanScores: null
};

function action(state = defaultState, action) {
  switch (action.type) {
    case "LOAD_MATCHES":
      return {
        ...state,
        page: 1,
        matches: action.data.matches,
        totalMatches: action.data.totalMatches,
        pageNumber: 1,
        overview: action.overview
      };
    case "LOAD_DELIVERIES":
      return { ...state, deliveries: action.deliveries };
    case "INC_MATCHES":
      return {
        ...state,
        page: state.page + 1,
        matches: action.data.matches,
        totalMatches: action.data.totalMatches,
        pageNumber: action.data.page,
        overview: action.overview
      };
    case "DEC_MATCHES":
      return {
        ...state,
        page: state.page - 1,
        matches: action.data.matches,
        totalMatches: action.data.totalMatches,
        pageNumber: action.data.page,
        overview: action.overview
      };
    case "MATCHE_DETAILS":
      return {
        ...state,
        matchDetails: action.data.match
      };
    case "LOAD_BATSMAN_SCORES":
      return {
        ...state,
        batsmanScores: action.data.scores
      };
    default:
      return state;
  }
}

export default action;
