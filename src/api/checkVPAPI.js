import React from 'react';
import axiosClient from './axiosClient';

const checkVPAPI = {
  //call All of CheckVP
  getAll(params) {
    const url = '/check-vps';
    return axiosClient.get(url, { params });
  },

  //Post data to Server CheckVP
  add(data) {
    const url = '/check-vp';
    return axiosClient.post(url, data);
  },

  deleteById(id) {
    const url = `/check-vp/${id}`;
    return axiosClient.delete(url);
  },
};

export default checkVPAPI;
