import axios from "axios";
const instance = axios.create({
  baseURL:
    "https://vishnukuppan1796-dev-ed.my.salesforce.com/services/data/v49.0",
  headers: {
    'Access-Control-Allow-Origin' : '*',
    'Authorization':"Bearer 00D2w000001NWR3!ARYAQIK0LuzHrz96eusoZAJ4HkY5krtWAFujGiVI1adH6vefJZljAkJK9eXNCwD_DNpCtOaWkyQlg4vXJdtj6ZlTO9rxoqB3",
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
