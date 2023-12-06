import axios from "axios";

export const BASE_URL_API = "https://api.mwbbazaar.com/api"

export default axios.create({
  baseURL: BASE_URL_API,
  headers: {
    // "Content-type": "multipart/form-data",
  },
});
