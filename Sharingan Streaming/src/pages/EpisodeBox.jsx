import React from "react";
import { useNavigate } from "react-router-dom";
import "./EpisodeBox.css";
function EpisodeBox({ data, animeId, currentEp, setPlayed }) {
  const episodeNumber = data.number;
  if (parseInt(currentEp) === parseInt(episodeNumber)) {
    const element = document.getElementsByClassName(episodeNumber);
    if (element[0]) {
      element[0].classList.add("current");
    }
  } else {
    const element = document.getElementsByClassName(episodeNumber);
    if (element[0]) {
      element[0].classList.remove("current");
    }
  }
  // console.log(data);
  const history = useNavigate();
  const navigateTo = async () => {
    const episodeId = data.id;
    let skipTo = 0;
    setPlayed(() => 0);
    if (window.localStorage.getItem(episodeId)) {
      skipTo = JSON.parse(window.localStorage.getItem(episodeId));
      console.log(skipTo);
    }
    history(`/vidcdn/watch/${data.id}`, {
      state: { animeId: animeId, skipTo: skipTo === undefined ? 0 : skipTo },
    });
    const element = document.getElementsByClassName(currentEp);
    element[0].classList.remove("current");
  };
  return (
    <div className={`ep-box ${episodeNumber}`} onClick={navigateTo}>
      <p className="ep-number">{data.number}</p>
    </div>
  );
}

export default EpisodeBox;
