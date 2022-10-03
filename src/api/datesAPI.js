import axiosClient from './axiosClient';

const datesAPI = {
  getDatesByNowDay(data) {
    const url = `/get-date-by-now-date?date=${data}`;
    return axiosClient.post(url);
  },

  getWeeksForLecture(params) {
    const url = '/dates/weeks';
    return axiosClient.post(url, { params });
  },

  //=>Lecture , get dates from week
  getDatesByWeek(week) {
    const url = `/dates-from-week/${week}`;
    return axiosClient.post(url);
  },
};
export default datesAPI;
