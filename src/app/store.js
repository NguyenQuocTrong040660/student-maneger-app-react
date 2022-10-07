import { configureStore } from '@reduxjs/toolkit';
import reducer from '../components/view/userSlice';
import scheduleReducer from '../reducers/scheduleReducer';

//bao gom tat ca reducer- you had
const rootReducer = {
  user: reducer,
  scheduleExport: scheduleReducer,
  // nơi lưu state,  khi action => return data =>data-> update trong uerSlice[inittial] = =state
};

//khai bao store
const store = configureStore({
  reducer: rootReducer,
});

export default store;
