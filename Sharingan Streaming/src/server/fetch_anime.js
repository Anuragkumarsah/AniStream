import axios from "axios";

export const fetchedRecent = async (url, pagenumber) => {
  let list = [];
  axios({
    method: "GET",
    url: url,
    params: { type: 1, page: pagenumber },
  }).then((res) => {
    console.log(res.data);
    list.concat(res.data.result);
  });
  return list;
};

export const fetchVideo = async (url) => {
  try {
    const Video = await fetch(url);
    console.log("Video");
    const source = Video.data.sources;
    console.log(Video);
    return source[0];
  } catch (err) {
    console.log("Connection Error");
  }
};

export const fetchSearch = async (url) => {
  let Data = [];
  let data = await fetch(url);
  let dataJson = await data.json();
  Data.push(dataJson);
  return Data;
};
