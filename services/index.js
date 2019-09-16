import axios from "axios";

export default (url, type) => {
  const options = {
    url: url,
    headers: { Autorization: `Bearer ${localStorage.getItem("access_token")}` },
    method: type, // *GET, POST, PUT, DELETE, etc.
    mode: "cors", // no-cors, cors, *same-origin
    cache: "no-cache", // *default, no-cache, reload, force-cache, only-if-cached
    json: true
  };
  return axios.request(options);
};
