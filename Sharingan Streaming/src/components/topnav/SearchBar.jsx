import React, { useRef, useState } from "react";
import { fetchSearch } from "../../server/fetch_anime";
import SearchItems from "./SearchItems";

import "./topnav.css";

const clickOutsideRef = (content_ref, toggle_ref) => {
  document.addEventListener("mousedown", (e) => {
    if (toggle_ref.current && toggle_ref.current.contains(e.target)) {
      const element = document.getElementsByClassName("dataResult");
      element[0].classList.add("notactive");
    } else if (content_ref.current && !content_ref.current.contains(e.target)) {
      const element = document.getElementsByClassName("dataResult");
      element[0].classList.add("notActive");
    } else {
      const element = document.getElementsByClassName("dataResult");
      if (element[0]) element[0].classList.remove("notActive");
    }
  });
};

const SearchBar = () => {
  const search_ref = useRef(null);
  const menu_ref = useRef(null);
  const [searchResults, setSearchResults] = useState([]);
  clickOutsideRef(menu_ref, search_ref);
  const handleOnChange = async (e) => {
    const searchWord = e.target.value;
    let url = `https://api.consumet.org/anime/gogoanime/${searchWord}`;
    let data = await fetchSearch(url);
    setSearchResults(data[0].results);
  };
  return (
    <div style={{ position: "relative" }}>
      <div className="topnav__search" ref={search_ref}>
        <input
          type="text"
          placeholder="Search here..."
          onChange={handleOnChange}
          id="search_input"
        />
        <i className="bx bx-search"></i>
      </div>

      <div className="dataResult" ref={menu_ref}>
        {searchResults &&
          searchResults.map((data, key) => {
            return <SearchItems key={key} Data={data} />;
          })}
      </div>
    </div>
  );
};

export default SearchBar;
