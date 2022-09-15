import axios from 'axios';
import StorageKey from '../constant/storage-key';

const axiosClient = axios.create({
  baseURL: 'http://localhost:8080/api/v1/',
  headers: {
    'Content-Type': 'application/json',
  },
});

//InterCeptor
// Add a request interceptor
axiosClient.interceptors.request.use(
  function (config) {
    const customHeaders = {};
    const accessToken = localStorage.getItem(StorageKey.TOKEN);
    console.log(accessToken);
    if (accessToken != null) {
      config.headers.Authorization = `Bearer ${accessToken}`;
    }

    return {
      ...config,
      headers: {
        ...customHeaders, // auto attach token
        ...config.headers, // but you can override for some requests
      },
    };
  },
  function (error) {
    return Promise.reject(error);
  }
);

// Add a response interceptor
axios.interceptors.response.use(
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

export default axiosClient;
