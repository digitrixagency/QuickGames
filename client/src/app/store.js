import { configureStore } from '@reduxjs/toolkit';
import usersReducer from '../slice/userSlice'; //Different name imported
import userSlice from '../slice/userSlice';

export const store = configureStore({ //default importing gives error
  reducer: {
    // user: usersReducer,
    user: userSlice,
  },
})

export default store;