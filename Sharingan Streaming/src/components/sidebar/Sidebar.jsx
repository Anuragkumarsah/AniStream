import React from "react";
import "./sidebar.css";

import sidebar_items from "../../assets/JsonData/sidebar_routes.json";
import ThemeMenu from "../thememenu/ThemeMenu";
import { useNavigate } from "react-router-dom";

const SidebarItem = (props) => {
  const history = useNavigate();
  const navigateTo = () =>
    history(props.path, {
      state: {},
    });
  return (
    <div className="sidebar__item">
      <div className={"sidebar__item-inner"} onClick={navigateTo}>
        <span>{props.title}</span>
      </div>
    </div>
  );
};

const Sidebar = (props) => {
  return (
    <div className="sidebar">
      <div className="sidebar__item">
        <ThemeMenu className="sidebar__item-inner" />
      </div>
      {sidebar_items.map((item, key) => (
        <SidebarItem key={key} title={item.display_name} path={item.route} />
      ))}
    </div>
  );
};

export default Sidebar;
