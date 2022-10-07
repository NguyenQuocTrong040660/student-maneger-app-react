import axios from 'axios';
import axiosClient from './axiosClient';

const scheduleAPI = {
  getAll(params) {
    const url = '/schedules';
    return axiosClient.get(url, { params });
  },

  Add(data) {
    const url = '/schedule';
    return axiosClient.post(url, data);
  },

  getSchedulesByWeek(id) {
    const url = `schedule-by-dates/${id}`;
    return axiosClient.post(url);
  },

  updateSchedule(id, data) {
    const url = `/schedule-update/${id}`;
    return axiosClient.put(url, data);
  },
};

export default scheduleAPI;
