import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';

//Acttion  register
export const addScheduleReducer = (schedule) => {
  return {
    type: 'ADD_SCHEDULE',
    payload: schedule,
  };
};

const initialState = {
  list: [],
  setting: {},
};

const scheduleReducer = (state = initialState, addScheduleReducer) => {
  const newList = [...state?.list];
  newList.push(addScheduleReducer.payload);
  return { ...state, newList };
};

export default scheduleReducer;
