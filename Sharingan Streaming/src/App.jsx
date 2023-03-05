//-------------- React Imports -----------//
import React, { useEffect } from "react";
import { BrowserRouter } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";

//------------- CSS Imports -------------//

import "./App.css";
import "bootstrap/dist/css/bootstrap.min.css";

//------------- Component Imports ------------//

import ThemeAction from "./redux/actions/ThemeAction";
import TopNav from "./components/topnav/TopNav";
import Router from "./components/Router";
// import Sidebar from "./components/sidebar/Sidebar.jsx";

//-------------- Required Functionalities / Main Functional Component  --------------//

const Layout = () => {
  const themeReducer = useSelector((state) => state.ThemeReducer);
  const dispatch = useDispatch();

  useEffect(() => {
    const themeClass = localStorage.getItem("themeMode", "theme-mode-light");
    const colorClass = localStorage.getItem("colorMode", "theme-mode-light");

    dispatch(ThemeAction.setMode(themeClass));
    dispatch(ThemeAction.setColor(colorClass));
  }, [dispatch]);

  //------------------- Component Renders ----------------//

  return (
    <div className={`layout ${themeReducer.mode} ${themeReducer.color}`}>
      <div className="layout__content">
        <BrowserRouter>
          <TopNav
            mode={themeReducer.mode === "theme-mode-dark" ? "dark" : "light"}
          />
          <div className=" layout_container row">
            <div className="layout__content-main col-12">
              <Router />
            </div>
          </div>
        </BrowserRouter>
      </div>
    </div>
  );
};

export default Layout;
