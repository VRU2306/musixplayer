import axios from "axios";

let axiosMod = axios.create({
  baseURL: "https://musicclone.herokuapp.com/"
});

export default axiosMod;