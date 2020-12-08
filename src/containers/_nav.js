export const getNavBar = (isAdmin) => {
  if (isAdmin)
    return [
      {
        _tag: "CSidebarNavItem",
        name: "Dashboard",
        to: "/dashboard",
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
        name: "Batsman Score",
        to: "/batsman-scores",
      },
    ];
  else
    return [
      {
        _tag: "CSidebarNavItem",
        name: "Dashboard",
        to: "/dashboard",
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
        name: "Batsman Score",
        to: "/batsman-scores",
      },
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
