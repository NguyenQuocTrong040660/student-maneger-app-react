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

  getUser(id) {
    const url = `/teacher/${id}`;
    return axiosClient.get(url);
  },
  checkRoleAdmin(data) {
    const url = '/checkRoleAmin';
    return axiosClient.get(url, { data });
  },
};

export default userApi;
