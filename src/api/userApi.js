import axiosClient from './axiosClient';

const userApi = {
  //Api fuv Register
  register(data) {
    const url = '/auth/local/register';
    return axiosClient.post(url, data);
  },
  //APi func longin
  login(data) {
    const url = 'auth/login';
    return axiosClient.post(url, data);
  },
};

export default userApi;
