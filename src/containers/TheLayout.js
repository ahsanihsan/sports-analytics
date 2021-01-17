// import React, { useEffect, useState } from "react";

// const TheLayout = (props) => {

//   return (
//     <div className="c-app c-default-layout">
//       <TheSidebar />
//       <div className="c-wrapper">
//         <TheHeader {...props} />
//         <div className="c-body">
//           <TheContent />
//         </div>
//         <TheFooter />
//       </div>
//     </div>
//   );
// };

// export default TheLayout;

import React, { Component } from "react";
import { TheContent, TheSidebar, TheFooter, TheHeader } from "./index";

export default class TheLayout extends Component {
  constructor(props) {
    super(props);
  }

  static getDerivedStateFromProps(props, state) {
    const token = window.localStorage.getItem("@token");
    if (!token) props.history.goBack();
  }

  render() {
    return (
      <div className="c-app c-default-layout">
        <TheSidebar />
        <div className="c-wrapper">
          <TheHeader {...this.props} />
          <div className="c-body">
            <TheContent />
          </div>
          <TheFooter />
        </div>
      </div>
    );
  }
}
