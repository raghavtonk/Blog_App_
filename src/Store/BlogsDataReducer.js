import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  allBlogs: {
    inputArrSize: 0,
    blogData: [],
    skip: 0,
  },
  myBlogs: {
    inputArrSize: 0,
    skip: 0,
    blogData: [],
  },
};
const BlogsDataReducer = createSlice({
  name: "blogsData",
  initialState,
  reducers: {
    changeSkipValue: (state) => {
      state.allBlogs.skip += state.allBlogs.inputArrSize;
    },
    resetBlogData: (state) => {
      state.allBlogs = {
        inputArrSize: 0,
        blogData: [],
        skip: 0,
      };
    },
    addAllBlogs: (state, action) => {
      const prevState = state.allBlogs.blogData;
      const newData = action.payload;
      // Function to compare two objects deeply
      function deepCompare(obj1, obj2) {
        return JSON.stringify(obj1) === JSON.stringify(obj2);
      }
      // Check if any element in newData exists in prevState
      const check = newData.some((element) => {
        return prevState.find((item) => deepCompare(element, item));
      });
      if (!check) {
        state.allBlogs.blogData = [...prevState, ...newData];
        state.allBlogs.inputArrSize = newData.length;
      } 
    },
    changeMyBlogSkip:(state)=>{
      state.myBlogs.skip += state.myBlogs.inputArrSize;
    },
    resetMyBlogData: (state) => {
      state.myBlogs = {
        inputArrSize: 0,
        blogData: [],
        skip: 0,
      };
    },
    addMyBlogs: (state, action) => {
      const prevState = state.myBlogs.blogData;
      const newData = action.payload;
      // Function to compare two objects deeply
      function deepCompare(obj1, obj2) {
        return JSON.stringify(obj1) === JSON.stringify(obj2);
      }
      // Check if any element in newData exists in prevState
      const check = newData.some((element) => {
        return prevState.find((item) => deepCompare(element, item));
      });
      if (!check) {
        state.myBlogs.blogData = [...prevState, ...newData];
        state.myBlogs.inputArrSize = newData.length;
      } 
    },
    deleteMyBlog:(state,action)=>{
      const id = action.payload;
      state.myBlogs.blogData = state.myBlogs.blogData.filter(
        (blog) => blog._id !== id
      );
    },
    editMyBlog: (state,action)=>{
      const { blogId, title, textBody } = action.payload;
      const blogIndex = state.myBlogs.blogData.findIndex(
        (blog) => blog._id === blogId
      );
      if (blogIndex !== -1) {
        state.myBlogs.blogData[blogIndex] = {
          ...state.myBlogs.blogData[blogIndex],
          title,
          textBody,
        };
      }
    }
  },
});

export const blogsDataAction = BlogsDataReducer.actions;
export default BlogsDataReducer.reducer;
