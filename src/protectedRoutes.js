import React from "react";
import ReportsView from "./ReportsView";


const protectedRoutes  = [
  { 
  name: "Reports", 
  path: "/reports", 
  exact: true, 
  main: (props) => <ReportsView {...props} />,
  public: false 
  },
];

export default protectedRoutes ;
