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

  //@DeleteMapping("/schedule/{id}")
  deleteSchedule(id) {
    const url = `/schedule/${id}`;
    return axiosClient.delete(url);
  },

  //item
  getSchedule(id) {
    const url = `/schedule/${id}`;
    return axiosClient.get(url);
  },

  //update to active checked
  updateStatustActiveChecked(id) {
    const url = `schedule-update-status-false/${id}`;
    return axiosClient.patch(url);
  },
};

export default scheduleAPI;
