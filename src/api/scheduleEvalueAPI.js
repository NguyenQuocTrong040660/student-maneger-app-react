import axiosClient from './axiosClient';

const scheduleEvalueAPI = {
  getAll(params) {
    const url = '/schedules-evalue/';
    return axiosClient.get(url, { params });
  },

  add(data) {
    const url = '/schedules-evalue/';
    return axiosClient.post(url, data);
  },

  getById(id) {
    const url = `/schedules-evalue/${id}`;
    return axiosClient.get(url);
  },

  getBySchduleId(id) {
    const url = `schedules-evalue-by-schedule/${id}`;
    return axiosClient.get(url);
  },

  updatescheduleEvalue(id, data) {
    const url = `/update-schedule-value/${id}`;
    return axiosClient.put(url, data);
  },
};
export default scheduleEvalueAPI;
