export default {
  URL: {
    MAIN_URL: "http://localhost:8080/",
    // MAIN_URL: "http://29c9dbd57d62.ngrok.io/",
    // MAIN_URL: "https://sports-analytics-fyp.herokuapp.com/",
    USER: {
      GET_ALL_USERS: "users/all",
      BLACK_LIST_USER: "users/black-list/",
      CHANGE_USER_ROLE: "users/change-role/",
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
      PREDICT_MATCH_T20: "prediction/predict_match_T20",
      WHAT_SCORE_WILL_BATSMAN_MAKE: "prediction/batsman_performance",

      // Revised URLS
      PREDICT_MATCH_WITH_TARGET_ODI: "/prediction/predict_match_with_target",
      PREDICT_MATCH_WITH_TARGET_T20:
        "/prediction/predict_match_with_target_t20",
      PREDICT_BATSMAN_WITH_TARGET_ODI: "/prediction/predict_batsman_score",
      PREDICT_BATSMAN_WITH_TARGET_T20: "/prediction/predict_batsman_score_t20",
    },
  },
};
