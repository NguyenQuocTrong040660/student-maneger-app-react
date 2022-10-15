import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import userApi from '../../api/userApi';
import StorageKey from '../../constant/storage-key';

//Acttion  register
export const register = createAsyncThunk('users/register', async (payload) => {
  //call Api
  const data = await userApi.register(payload);
  // save data local stroge
  //Store Token
  localStorage.setItem(StorageKey.TOKEN, data.jwt);
  //
  localStorage.setItem(StorageKey.USER, JSON.stringify(data.user));
  //return user data
  return data.user;
});

//Action login
export const login = createAsyncThunk('users/login', async (payload) => {
  //call Api
  const data = await userApi.login(payload);
  console.log(data);

  // save data local stroge
  //Store Token
  localStorage.setItem(StorageKey.TOKEN, data.data.token);
  //
  localStorage.setItem(StorageKey.USER, JSON.stringify(data.data));

  //return user data
  return data.data;
});

const userSlice = createSlice({
  //
  name: 'user',
  initialState: {
    current: JSON.parse(localStorage.getItem(StorageKey.USER)) || {},
    settings: {},
  },

  reducers: {
    logout(state) {
      //clear localstorage
      localStorage.removeItem(StorageKey.USER);
      localStorage.removeItem(StorageKey.TOKEN);
      state.current = {};
    },
  },
  //hander
  extraReducers: {
    // 'uers/login/fulfilled'
    [login.fulfilled]: (state, action) => {
      state.current = action.payload; //== login , data.user
    },
  },
});

const { actions, reducer } = userSlice;
export const { logout } = actions;
export default reducer;
