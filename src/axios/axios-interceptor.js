import axios from "axios";
import { baseUrl } from "../shared/baseUrl";

const instance = axios.create({
  baseURL:
  baseUrl,
  headers: {
    'Access-Control-Allow-Origin' : '*',
    'Authorization':"Bearer 00D2w000001NWR3!ARYAQCpxEziq028sSMycan9eR1i2NN5gwSvBXPtmkYZBTSeoBRfJX94Hwns4Fmd3DVHAtrGV8oDj43n3zpq3AuSBDPqhnzKm",
    'Content-Type': 'application/json'
  },
  mode: 'no-cors'
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
