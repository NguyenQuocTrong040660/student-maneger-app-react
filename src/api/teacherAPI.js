import axiosClient from './axiosClient';

const teacherAPI = {
  getALL(params) {
    const url = '/teachers';
    return axiosClient.get(url, { params });
  },

  add(data) {
    const url = '/auth/register';
    return axiosClient.post(url, data);
  },

  update(id, data) {
    const url = `/teacher/${id}`;
    return axiosClient.put(url, data);
  },

  deleteTeacher(id, data) {
    const url = `/teacher-delete/${id}`;
    return axiosClient.put(url, data);
  },
};
export default teacherAPI;
