//--------------- React Imports ------------//

import React, { useRef, useState, useEffect } from "react";
import { useDispatch } from "react-redux";

//--------------- CSS Imports --------------//

import "./thememenu.css";

//------------- Component Imports ------------//

import ThemeAction from "../../redux/actions/ThemeAction";

//-------------- Required JSON Data Imports ---------------//

import mode_json_data from "../../assets/JsonData/mode_settings.json";
import color_json_data from "../../assets/JsonData/color_settings.json";

//-------------- Required Data Assignment --------------//

const mode_settings = mode_json_data;
const color_settings = color_json_data;

const clickOutsideRef = (content_ref, toggle_ref) => {
  document.addEventListener("mousedown", (e) => {
    // user click toggle
    if (toggle_ref.current && toggle_ref.current.contains(e.target)) {
      content_ref.current.classList.toggle("active");
    } else {
      // user click outside toggle and content
      if (content_ref.current && !content_ref.current.contains(e.target)) {
        content_ref.current.classList.remove("active");
      }
    }
  });
};

//------------------------------- Main Component ---------------------------//

const ThemeMenu = () => {
  const menu_ref = useRef(null);
  const menu_toggle_ref = useRef(null);

  clickOutsideRef(menu_ref, menu_toggle_ref);

  // Checking if menu active adding active class

  const setActiveMenu = () => menu_ref.current.classList.add("active");

  // Checking if meaning closed removing active class

  const closeMenu = () => menu_ref.current.classList.remove("active");
  const dispatch = useDispatch();

  //  Setting the default values of the theme

  const [currMode, setcurrMode] = useState("light");
  const [currColor, setcurrColor] = useState("blue");

  // Storing the mode selected by the user in localStorage

  const setMode = (mode) => {
    setcurrMode(mode.id);
    localStorage.setItem("themeMode", mode.class);
    dispatch(ThemeAction.setMode(mode.class));
  };

  // Storing the color selected by the user in localStorage

  const setColor = (color) => {
    setcurrColor(color.id);
    localStorage.setItem("colorMode", color.class);
    dispatch(ThemeAction.setColor(color.class));
  };

  // Fetching the modes and colors from localStorage on startup

  useEffect(() => {
    const themeClass = mode_settings.find(
      (e) => e.class === localStorage.getItem("themeMode", "theme-mode-light")
    );

    const colorClass = color_settings.find(
      (e) => e.class === localStorage.getItem("colorMode", "theme-mode-light")
    );

    if (themeClass !== undefined) setcurrMode(themeClass.id);

    if (colorClass !== undefined) setcurrColor(colorClass.id);
  }, []);

  return (
    <div>
      {/*---------------- Theme Menu Options Button---------------*/}
      <div className="theme_button" onClick={() => setActiveMenu()}>
        <button ref={menu_toggle_ref} className="dropdown__toggle">
          {/*---------------- Theme Menu Option Icon ---------------*/}
          {/* <i className="bx bx-palette toggle_icon"> </i> */}
          <span>Theme</span>
        </button>
      </div>

      {/*---------------- Theme Menu ---------------*/}

      <div ref={menu_ref} className="theme-menu">
        <h4>Theme settings</h4>

        {/*---------------- Theme Menu Closing Button ---------------*/}

        <button className="theme-menu__close" onClick={() => closeMenu()}>
          <i className="bx bx-x" />
        </button>

        {/*---------------- Mode Section ---------------*/}

        <div className="theme-menu__select">
          <span>Choose mode</span>
          <ul className="mode-list">
            {/*  Mapping the different modes */}

            {mode_settings.map((item, index) => (
              <li key={index} onClick={() => setMode(item)}>
                <div
                  className={`mode-list__color ${item.background} ${
                    item.id === currMode ? "active" : ""
                  }`}
                >
                  <i className="bx bx-check"></i>
                </div>
                <span>{item.name}</span>
              </li>
            ))}
          </ul>
        </div>

        {/*---------------- Mode Section ---------------*/}

        <div className="theme-menu__select">
          <span>Choose color</span>
          <ul className="mode-list">
            {/*  Mapping the different modes */}

            {color_settings.map((item, index) => (
              <li key={index} onClick={() => setColor(item)}>
                <div
                  className={`mode-list__color ${item.background} ${
                    item.id === currColor ? "active" : ""
                  }`}
                >
                  <i className="bx bx-check"></i>
                </div>
                <span>{item.name}</span>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
};

export default ThemeMenu;
