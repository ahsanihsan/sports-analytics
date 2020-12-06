export default {
  URL: {
    MAIN_URL: "http://192.168.18.2:8080/",
    // MAIN_URL: "http://29c9dbd57d62.ngrok.io/",
    // MAIN_URL: "https://sports-analytics-fyp.herokuapp.com/",
    USER: {
      GET_ALL_USERS: "users/all",
      BLACK_LIST_USER: "users/black-list/",
    },
    AUTHENTICATION: {
      SIGN_UP: "auth/signup",
      SIGN_IN: "auth/signin",
    },
    PREDICTION: {
      WHO_WILL_WIN: "prediction/who_will_win",
      WILL_BATSMAN_GET_OUT: "prediction/will_batsman_get_out",
      WHAT_SCORE_WILL_BATSMAN_MAKE: "prediction/what_score_batsman_makes",
      RUN_RATE: "prediction/run_rate",
      SCORE_OF_TEAMS: "prediction/score_of_teams",
      PREDICT_MATCH: "prediction/predict_match",
    },
  },
};
