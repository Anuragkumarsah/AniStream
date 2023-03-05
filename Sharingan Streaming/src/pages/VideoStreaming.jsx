import React, { useEffect, useState, useRef, useCallback } from "react";
import { useLocation } from "react-router-dom";
import ReactPlayer from "react-player";
import { fetchVideo, fetchSearch } from "../server/fetch_anime";
import "./Stream.css";
import LoadingScreen from "./LoadingScreen";
import EpisodeBox from "./EpisodeBox";

export default function Stream() {
  const [data, setData] = useState([]);
  const episodeList = useRef();
  const { state } = useLocation();
  const { animeId, skipTo } = state;
  // console.log(skipTo);
  const [canSkip, setCanSkip] = useState(false);
  // const [episode, setEpisode] = useState(window.location.pathname.split("/").slice(-1)[0]);
  const episodeId = window.location.pathname.split("/").slice(-1)[0];
  const currentEp = episodeId.split("-").slice(-1)[0];

  const [played, setPlayed] = useState(0);
  const animeTitle = useRef();
  const playerRef = useRef();

  useEffect(() => {
    // setPlayed(0);
    if (window.localStorage.getItem(episodeId)) {
      // console.log(episodeId);
      setPlayed(() => JSON.parse(window.localStorage.getItem(episodeId)));
      // console.log(JSON.parse(window.localStorage.getItem(episodeId)));
    }
    getVideo();
    getEpisodes();
    // played.current = 0;

    //eslint-disable-next-line
  }, [episodeId, currentEp]);

  useEffect(() => {
    if (playerRef.current) playerRef.current.seekTo(skipTo, "seconds");
    // console.log(skipTo);
    setCanSkip(() => false);
    //eslint-disable-next-line
  }, [canSkip]);
  const getVideo = async () => {
    const url = `https://api.consumet.org/anime/gogoanime/watch/${episodeId}`;
    const video = await fetchVideo(url);
    // console.log(video);
    if (!video) getVideo();
    setData(video);
  };
  const getEpisodes = async () => {
    const url = `https://api.consumet.org/anime/gogoanime/info/${animeId}`;
    let details = await fetchSearch(url);
    // console.log(details);
    episodeList.current = details[0].episodes;
    animeTitle.current = details[0].title;
  };

  const onReady = useCallback(() => {
    setCanSkip(() => true);
    //eslint-disable-next-line
  }, [playerRef.current]);

  // if (episodeList) console.log(episodeList);
  return (
    <div className="player-wrapper">
      {data !== undefined && data.url !== undefined ? (
        <ReactPlayer
          ref={playerRef}
          className="reactplayer"
          width="100%"
          url={data.url}
          controls={true}
          onReady={onReady}
          playing={true}
          onProgress={(progress) => {
            if (played <= progress.playedSeconds) {
              setPlayed((played) => progress.playedSeconds);
              // const watchedUpTo = played;
              window.localStorage.setItem(
                window.location.pathname.split("/").slice(-1)[0],
                JSON.stringify(progress.playedSeconds)
              );
              console.log(progress.playedSeconds);
            }
          }}
        />
      ) : (
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
      )}
      {animeTitle.current && (
        <div className="anime_title">{animeTitle.current}</div>
      )}
      <div className="episode-list">
        {episodeList.current !== undefined &&
          episodeList.current.map((data, key) => {
            return (
              <EpisodeBox
                key={key}
                data={data}
                animeId={animeId}
                currentEp={currentEp}
                setPlayed={setPlayed}
              />
            );
          })}
      </div>
    </div>
  );
}
