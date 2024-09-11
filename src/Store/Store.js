import { configureStore } from "@reduxjs/toolkit"
import userDataReducer from "./userDataReducer";
import BlogDataReducer from "./BlogsDataReducer";

 const Store = configureStore({
    reducer:{
        usersData: userDataReducer,
        blogsData: BlogDataReducer,
    }
});
export default Store