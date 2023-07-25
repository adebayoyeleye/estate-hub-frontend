import { configureStore } from '@reduxjs/toolkit'
import userReducer from '../features/auth/userSlice'
import messageReducer from "../common/messageSlice";

export default configureStore({
  reducer: {
    user: userReducer,
    message: messageReducer,
  }
})