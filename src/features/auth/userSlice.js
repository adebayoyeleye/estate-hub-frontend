import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import authService from "../../services/auth";

import { setMessage } from "../../common/messageSlice";

const user = authService.getCurrentUser();

const initialState = user ? { isLoggedIn: true, user } : { isLoggedIn: false, user: null };

const userSlice = createSlice({
  name: 'user',
  initialState,
  extraReducers: builder => {
    builder
      .addCase(register.pending, (state, action) => {
        state.isLoggedIn = false;
        state.isLoading = true;
      })
      .addCase(register.fulfilled, (state, action) => {
        state.isLoggedIn = true;
        state.user = action.payload.user;
        state.isLoading = false;
      })
      .addCase(register.rejected, (state, action) => {
        state.isLoggedIn = false;
        state.user = null;
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
      })
      .addCase(logout.fulfilled, (state, action) => {
        state.isLoggedIn = false;
        state.user = null;
      })
  }
})



export const register = createAsyncThunk(
  "user/register",
  async ({ username, password }, thunkAPI) => {
    try {
      const response = await authService.createAccount(username, password);
      return response;
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
  async () => {
    await authService.logout();
  }
)

// export const selectUser = state => state.user;

export default userSlice.reducer

