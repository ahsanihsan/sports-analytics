export const getNavBar = (isAdmin) => {
  if (isAdmin)
    return [
      {
        _tag: "CSidebarNavItem",
        name: "Matches",
        to: "/matches",
        // icon: "cil-speedometer",
      },
      {
        _tag: "CSidebarNavItem",
        name: "Users",
        to: "/users",
        // icon: "cil-user",
      },
      {
        _tag: "CSidebarNavItem",
        name: "Match Prediction ODI",
        to: "/odi",
        // icon: "cil-hand-peace",
      },
      {
        _tag: "CSidebarNavItem",
        name: "Match Prediction T20",
        to: "/t20",
        // icon: "cil-hand-peace",
      },
      {
        _tag: "CSidebarNavItem",
        name: "Batsman Score ODI",
        to: "/batsman-scores-odi",
      },
      {
        _tag: "CSidebarNavItem",
        name: "Batsman Score T20",
        to: "/batsman-scores-t20",
      },
    ];
  else
    return [
      {
        _tag: "CSidebarNavItem",
        name: "Matches",
        to: "/matches",
        // icon: "cil-speedometer",
      },
      {
        _tag: "CSidebarNavItem",
        name: "Match Prediction ODI",
        to: "/odi",
        // icon: "cil-hand-peace",
      },
      {
        _tag: "CSidebarNavItem",
        name: "Match Prediction T20",
        to: "/t20",
        // icon: "cil-hand-peace",
      },
      {
        _tag: "CSidebarNavItem",
        name: "Batsman Score ODI",
        to: "/batsman-scores-odi",
      },
      {
        _tag: "CSidebarNavItem",
        name: "Batsman Score T20",
        to: "/batsman-scores-t20",
      },
      // {
      //   _tag: "CSidebarNavItem",
      //   name: "Users",
      //   to: "/users",
      //   // icon: "cil-user",
      // },
      // {
      //   _tag: "CSidebarNavItem",
      //   name: "Run Rate",
      //   to: "/runrate",
      // },
      // {
      //   _tag: "CSidebarNavItem",
      //   name: "Team Scores",
      //   to: "/score-of-teams",
      // },
      // // {
      // //   _tag: "CSidebarNavItem",
      // //   name: "Batsman Gets Bowled",
      // //   to: "/batsman-gets-bowled",
      // // },
      // {
      //   _tag: "CSidebarNavItem",
      //   name: "Batsman Scores",
      //   to: "/batsman-scores",
      // },
    ];
};
