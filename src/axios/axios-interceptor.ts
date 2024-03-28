import axios from "axios";
import { baseUrl } from "../shared/baseUrl";

// const bearer_token = axios.post(
//   'https://login.salesforce.com/services/oauth2/token',
//   'grant_type=password&client_id=3MVG9n_HvETGhr3AazYjvGsJ70HSZv9TqYY81dRsIJyTi7.zPcREMYOSlUCAaSWvjnX8GF3.98xdTuLEGzPSJ&client_secret=C747F19398D0897C2196E1CB77FA4DA6B9827372853036FCD1D0C46DC12FB0DE&username=vishnukuppan1796@gmail.com&password=1hk16CS003',
//   {
//     headers: {
//       'Access-Control-Allow-Origin' : '*',
//       'Content-Type': 'application/x-www-form-urlencoded'
//     }
//   }
// ).then((res)=>{

//   debugger
// })

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
