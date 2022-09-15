import axiosClient from './axiosClient';

const clazzAPI = {
  getAll(params) {
    const url = '/clazzs';
    return axiosClient.get(url, { params });
  },

  get(id) {
    const url = '/categories/${id}';
    return axiosClient.get(url);
  },

  add(data) {
    const url = '/categories';
    return axiosClient.post(url, data);
  },

  update(data) {
    const url = '/categories/${data.id}';
    return axiosClient.patch(url, data);
  },

  remove(id) {
    const url = '/categories/${id}';
    return axiosClient.delete(url);
  },
};

export default clazzAPI;
