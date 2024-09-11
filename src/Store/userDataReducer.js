import { createSlice } from "@reduxjs/toolkit"

const initialState = {
    isLogin: null,
    loginUserData: {},
}

const userDataSlicer  = createSlice({
    name: 'usersData',
    initialState,
    reducers:{
        changeLoginStatus: (state,action)=>{
            if(action.payload === 'login')
                state.isLogin = true
            else if(action.payload === 'logout')
            state.isLogin = false;
        },
        inputUsersData:(state,action)=>{
            state.loginUserData = action.payload;
        },
    },
});

export const usersDataActions = userDataSlicer.actions;
export default  userDataSlicer.reducer;