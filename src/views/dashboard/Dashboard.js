import React, { lazy } from "react";
import { CCard, CCardBody } from "@coreui/react";

const WidgetsDropdown = lazy(() => import("../widgets/WidgetsDropdown.js"));

const Dashboard = () => {
  return (
    <>
      <WidgetsDropdown />
    </>
  );
};

export default Dashboard;
