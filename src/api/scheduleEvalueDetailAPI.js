import axiosClient from './axiosClient';

const scheduleEvalueDetailAPI = {
  getAll(params) {
    const url = '/detail-evalue';
    return axiosClient.get(url, { params });
  },

  add(data) {
    const url = '/save-detail-evalue';
    return axiosClient.post(url, data);
  },

  getById(id) {
    const url = `/save-detail-evalue/${id}`;
    return axiosClient.get(url);
  },

  getAllByIdScheduleEvalue(id) {
    const url = `/gets-by-schedule-evalueID/${id}`;
    return axiosClient.get(url);
  },

  deleteDetailEvalue(id) {
    const url = `/delete-detail-evalue/${id}`;
    return axiosClient.delete(url);
  },
};
export default scheduleEvalueDetailAPI;
