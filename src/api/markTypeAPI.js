import axiosClient from './axiosClient';

const markTypeAPI = {
  getAll(params) {
    const url = '/mark-types';
    return axiosClient.get(url, { params });
  },
};
export default markTypeAPI;
