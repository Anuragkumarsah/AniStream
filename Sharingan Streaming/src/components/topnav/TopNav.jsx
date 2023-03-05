import React from "react";

import "./topnav.css";
// import Dropdown from "../dropdown/Dropdown";

// import ThemeMenu from "../thememenu/ThemeMenu";
import { useEffect } from "react";
import SearchBar from "./SearchBar";
import { useNavigate } from "react-router-dom";

const Topnav = (props) => {
  useEffect(() => {
    const element = document.getElementsByClassName("topnav");

    if (props.mode === "dark") {
      element[0].classList.add("dark-nav");
    }
    if (element[0] && props.mode === "light") {
      element[0].classList.remove("dark-nav");
    }
  }, [props.mode]);
  const history = useNavigate();
  const toHome = () => {
    history("/");
  };

  return (
    <div className="topnav">
      <i
        className="bx bxs-home"
        style={{
          width: "50px",
          fontSize: "1.5rem",
          alignItems: "center",
          display: "flex",
          justifyContent: "center",
          justifySelf: "left",
          marginRight: "50px",
        }}
        onClick={toHome}
      ></i>
      <SearchBar />
    </div>
  );
};

export default Topnav;
