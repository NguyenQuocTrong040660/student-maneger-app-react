import axiosClient from './axiosClient';

const teacherAPI = {
  getALL(params) {
    const url = '/teachers';
    return axiosClient.get(url, { params });
  },
};
export default teacherAPI;
