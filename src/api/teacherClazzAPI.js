import axiosClient from './axiosClient';

const teacherClazzAPI = {
  add(data) {
    const url = '/clazzs-teachers';
    return axiosClient.post(url, data);
  },

  update(data) {
    const url = '/update-clazz-teacher/';
    return axiosClient.put(url, data);
  },

  deleteTeacherClazz(id) {
    const url = `/delete-clazz-teacher/`;
    return axiosClient.post(url, id);
  },
};
export default teacherClazzAPI;
