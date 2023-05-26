import { createSlice } from '@reduxjs/toolkit'
import { login } from "../../services/auth";


export const userSlice = createSlice({
  name: 'user',
  initialState: {
    message: '',
  },
  reducers: {
    userLoaded: (state, action) => {
      state.message = action.payload
    },
  }
})

// The function below is called a thunk and allows us to perform async logic. It
// can be dispatched like a regular action: `dispatch(incrementAsync(10))`. This
// will call the thunk with the `dispatch` function as the first argument. Async
// code can then be executed and other actions can be dispatched
export const loginAsync = (username, password) => async (dispatch) => {
  try {
    dispatch(userLoaded("Logging in..."))
    const response = await login(username, password);
    dispatch(userLoaded(response))
  } catch (err) {
    console.log(err);
  }
}

export const { userLoaded } = userSlice.actions

export const selectUser = state => state.user;

export default userSlice.reducer

