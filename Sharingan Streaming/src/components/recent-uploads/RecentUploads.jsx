import React, { useEffect, useState } from "react";
import LoadingScreen from "../../pages/LoadingScreen";
import { fetchedRecent } from "../../server/fetch_anime";
import Sidebar from "../sidebar/Sidebar.jsx";
import Cards from "./Cards";
import "./recentUploads.css";

const RecentUploadSubs = ({ type }) => {
  const [subData, setSubData] = useState({ Data: [] });
  const [dubData, setDubData] = useState({ Data: [] });
  const [pageNumber, setPageNumber] = useState(1);

  let sub_url = `https://api.consumet.org/anime/gogoanime/recent-episode`;
  let dub_url = `https://api.consumet.org/anime/gogoanime/recent-episodes`;
  function incrementPage() {
    setPageNumber((pageNumber) => pageNumber);
  }
  async function getAnime(url, setState, Data) {
    let list = await fetchedRecent(url, pageNumber);
    console.log(list);
    // setState({ Data: [...Data.Data, ...list] });
  }
  useEffect(() => {
    if (subData.Data[0] === undefined && dubData.Data[0] === undefined) {
      getAnime(sub_url, setSubData, subData);
      getAnime(dub_url, setDubData, dubData);
    } else if (type === "1") {
      getAnime(sub_url, setSubData, subData);
    } else if (type === "2") {
      getAnime(dub_url, setDubData, dubData);
    }
    //eslint-disable-next-line
  }, [pageNumber]);

  const render = (Data, header_title) => {
    return (
      <>
        <div className="page_title not-selectable">{header_title}</div>
        <div className="card_container row not-selectable">
          {
            <div className="row">
              {Data.Data.map((Data, index) => (
                <Cards key={index} Data={Data} type={type} />
              ))}
              {Data && (
                <button
                  style={{
                    backgroundColor: "var(--main-bg)",
                    border: "1px solid var(--txt-color)",
                  }}
                  onClick={incrementPage}
                >
                  Load More
                </button>
              )}
            </div>
          }
        </div>
      </>
    );
  };

  const renderSwitch = (type) => {
    switch (type) {
      case "1":
        return render(subData, "Recent Subbed Anime");
      case "2":
        return render(dubData, "Recent Dubbed Anime");
      default:
        return (
          <div
            style={{
              height: "400px",
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            <LoadingScreen />
          </div>
        );
    }
  };

  return (
    <div className="not-selectable">
      <Sidebar />
      {subData.Data[0] !== undefined && dubData.Data[0] !== undefined
        ? renderSwitch(type)
        : renderSwitch("0")}
    </div>
  );
};

export default RecentUploadSubs;
