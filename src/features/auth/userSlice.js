import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import authService from '../../services/auth';

import { setMessage } from '../../common/messageSlice';

const initialState = { isLoggedIn: false, user: null, isLoading: false };

const userSlice = createSlice({
  name: 'user',
  initialState,
  extraReducers: (builder) => {
    builder
      .addCase(getCurrentUser.pending, (state, action) => {
        state.isLoading = true;
      })
      .addCase(getCurrentUser.fulfilled, (state, action) => {
        return action.payload;
      })
      .addCase(register.pending, (state, action) => {
        state.isLoggedIn = false;
        state.isLoading = true;
      })
      .addCase(register.fulfilled, (state, action) => {
        // state.isLoggedIn = true;  // Should not be needed !!
        // state.user = action.payload.user;
        state.isLoading = false;
      })
      .addCase(register.rejected, (state, action) => {
        state.isLoggedIn = false;
        state.user = null;
        state.isLoading = false;
      })
      .addCase(login.pending, (state, action) => {
        state.isLoggedIn = false;
        state.isLoading = true;
      })
      .addCase(login.fulfilled, (state, action) => {
        state.isLoggedIn = true;
        state.user = action.payload.user;
        state.isLoading = false;
      })
      .addCase(login.rejected, (state, action) => {
        state.isLoggedIn = false;
        state.user = null;
        state.isLoading = false;
      })
      .addCase(logout.pending, (state, action) => {
        state.isLoading = true;
      })
      .addCase(logout.fulfilled, (state, action) => {
        state.isLoggedIn = false;
        state.user = null;
        state.isLoading = false;
      })
      .addCase(logout.rejected, (state, action) => {
        state.isLoading = false;
      })
  }
});

export const getCurrentUser = createAsyncThunk(
  'user/getCurrentUser',
  async () => {
    try {
      const user = await authService.getCurrentUser();
      return { isLoggedIn: true, user, isLoading: false };
    } catch (error) {
      console.error("authService.getCurrentUser() in userSlice failed: ", error);
      return { isLoggedIn: false, user: null, isLoading: false };
    }
  }
);

export const register = createAsyncThunk(
  "user/register",
  async ({ username, password }, thunkAPI) => {
    try {
      const response = await authService.createAccount(username, password);
      thunkAPI.dispatch(setMessage(response.message));
      // return { user: {email: username} };  // Should not be needed !!
    } catch (error) {
      const message = (error.response && error.response.data && error.response.data.message)
        || error.message
        || error.toString();
      thunkAPI.dispatch(setMessage(message));
      return thunkAPI.rejectWithValue();
    }
  }
)


export const login = createAsyncThunk(
  "user/login",
  async ({ username, password }, thunkAPI) => {
    try {
      const data = await authService.login(username, password);
      return { user: data };
    } catch (error) {
      const message = (error.response && error.response.data && error.response.data.message)
        || error.message
        || error.toString();
      thunkAPI.dispatch(setMessage(message));
      return thunkAPI.rejectWithValue();
    }
  }
)


export const logout = createAsyncThunk(
  "user/logout",
  async (_, thunkAPI) => {
    try {
      const message = await authService.logout();
      return message;
    } catch (error) {
      const message = (error.response && error.response.data && error.response.data.message)
        || error.message
        || error.toString();
      thunkAPI.dispatch(setMessage(message));
      return thunkAPI.rejectWithValue();
    }
  }
)

// export const selectUser = state => state.user;

export default userSlice.reducer

