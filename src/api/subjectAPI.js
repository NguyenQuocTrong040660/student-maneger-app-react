import axiosClient from './axiosClient';
const subjectAPI = {
  getAll(params) {
    const url = '/subjects';
    return axiosClient.get(url, { params });
  },
};
export default subjectAPI;
