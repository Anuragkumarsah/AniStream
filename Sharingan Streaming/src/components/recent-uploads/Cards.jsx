import React from "react";
import "./Cards.css";
import { useNavigate } from "react-router-dom";
// import { fetchSearch } from "../../server/fetch_anime";

export default function Cards({ Data }) {
  // const [details, setDetails] = useState();
  // const url = `https://gogoanime.herokuapp.com/anime-details/${Data.animeId}`;
  // if (type === "3") {
  //   const getDetails = async () => {
  //     const data = await fetchSearch(url);
  //     setDetails(data);
  //   };
  //   getDetails();
  // }
  const history = useNavigate();
  const navigateTo = () => {
    history(`/vidcdn/watch/${Data.episodeId}`, {
      state: { animeId: Data.id, currentEP: Data.episodeNumber },
    });
  };
  return (
    <div className="card not-selectable" onClick={navigateTo}>
      <img src={Data.image} alt="" className="card-img-top" />
      <div className="card-footer">
        <h5 className="card-text">{Data.title}</h5>
        <p className="episode">EP {Data.episodeNumber}</p>
      </div>
    </div>
  );
}
