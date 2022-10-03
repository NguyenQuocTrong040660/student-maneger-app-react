import axiosClient from './axiosClient';

const clazzAPI = {
  getAll(params) {
    const url = '/clazzs';
    return axiosClient.get(url, { params });
  },

  //table clazz-teacher => get record have role Quan Nhiem
  getClazzTeacher(id) {
    const url = `/clazz-teacher/${id}`;
    return axiosClient.get(url);
  },

  getClazz(id) {
    const url = `/clazz/${id}`;
    return axiosClient.get(url);
  },

  getClazzByTeacherId(id) {
    const url = `/clazz-teacher/${id}`;
    return axiosClient.post(url);
  },
};

export default clazzAPI;
