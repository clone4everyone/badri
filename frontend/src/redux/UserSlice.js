import { createSlice } from "@reduxjs/toolkit";
const initialState = {
  user: null,
  currentCourse: null,
};
const UserSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    setLogin: (state, action) => {
      state.user = action.payload.user;
    },
    setLogOut: (state, action) => {
      localStorage.removeItem("token");
      console.log(state.user);
      console.log(state.user.user)
      state.user = null;
    },
    updateName:(state,action)=>{
      state.user.name=action.payload.name
      console.log(action.payload.name)
    },
    updateAvatar:(state,action)=>{
      state.user.avatar=action.payload.avatar
    }
  },
});

export const { setLogin, setLogOut, updateName, updateAvatar } =
  UserSlice.actions;
export default UserSlice.reducer;
