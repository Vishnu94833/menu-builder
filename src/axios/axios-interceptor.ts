import axios from "axios";
import { baseUrl } from "../shared/baseUrl";

const instance = axios.create({
  baseURL:
  baseUrl,
  headers: {
    'Access-Control-Allow-Origin' : '*',
    'Authorization':"Bearer 00D2w000001NWR3!ARYAQPqUrxXnPUelWd8URFOskeXim7d8nog8ReOckjkpycfSlZ0BILoPin7A6tWsR99uRtTd7gLIlMlfJ_Z0O7Y0.plBXKGs",
    'Content-Type': 'application/json'
  }
});

// Add a request interceptor
instance.interceptors.request.use(
  function (config) {
    // Do something before request is sent
    return config;
  },
  function (error) {
    // Do something with request error
    return Promise.reject(error);
  }
);

// Add a response interceptor
instance.interceptors.response.use(
  function (response) {
    // Any status code that lie within the range of 2xx cause this function to trigger
    // Do something with response data
    return response;
  },
  function (error) {
    // Any status codes that falls outside the range of 2xx cause this function to trigger
    // Do something with response error
    return Promise.reject(error);
  }
);

export default instance;
