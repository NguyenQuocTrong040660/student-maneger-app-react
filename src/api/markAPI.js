import axiosClient from './axiosClient';

const markAPI = {
  getAll(params) {
    const url = '/marks';
    return axiosClient.get(url, { params });
  },

  addMark(data) {
    const url = '/mark';
    return axiosClient.post(url, data);
  },

  getAllMarkByConditions(subject, semester, student) {
    const url = `mark-by-subject-semester-studentid/${subject}/${semester}/${student}`;
    return axiosClient.get(url);
  },

  delete(id) {
    const url = `/delete-mark/${id}`;
    return axiosClient.delete(url);
  },
};
export default markAPI;
