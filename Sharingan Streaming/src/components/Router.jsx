//-------------- React Imports -------------//
import React from "react";
import { Route, Routes } from "react-router-dom";

//---------------- Component Imports ------------//

import Stream from "../pages/VideoStreaming";
import RecentUpload from "./recent-uploads/RecentUploads";
// import RecentUploadDubs from "./recent-uploads/RecentUploadDubs";
import Details from "../pages/Details";

//---------------- Main Functional Component --------------//

const Router = () => {
  return (
    <Routes>
      <Route path="/" exact element={<RecentUpload type="1" />} />
      <Route path="/recent-dubs" element={<RecentUpload type="2" />} />
      <Route path="/popular" element={<RecentUpload type="3" />} />
      <Route path="/vidcdn/watch/:episodeId" element={<Stream />} />
      <Route path="/anime/:animeTitle" element={<Details />}></Route>
    </Routes>
  );
};

export default Router;
