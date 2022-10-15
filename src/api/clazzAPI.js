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

  add(data) {
    const url = `/clazz`;
    return axiosClient.post(url, data);
  },

  update(id, data) {
    const url = `/clazz/${id}`;
    return axiosClient.put(url, data);
  },

  deleteClazz(id, data) {
    const url = `/clazz-delete/${id}`;
    return axiosClient.put(url, data);
  },
};

export default clazzAPI;
