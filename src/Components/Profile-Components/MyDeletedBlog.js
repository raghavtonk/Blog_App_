import "./MyBlogs.css";
import {useDispatch, useSelector } from "react-redux";
import sendBlogRequest from "../../Funtions/blogFetchFunction";
import convertMilliseconds from "../../Funtions/ConvertMillisecond";
import { blogsDataAction } from "../../Store/BlogsDataReducer";
import { useEffect, useState} from "react";

const Getconfig = {
  method: "GET",
  credentials: "include",
};

export default function MyDeletedBlogs() {

  const { loginUserData } = useSelector((state) => state.usersData);
  const [deletedBlogs,setDeletedBlogs] = useState([]);
const dispatch = useDispatch();
  useEffect(() => {
    async function fetchData() {
      try {
        const resData = await sendBlogRequest({
          url: `https://blog-app-backend-huph.onrender.com/blog/read-deleted-blog`,
          config: Getconfig,
        });
        if (resData.status == 200 && resData.data) {
          setDeletedBlogs((prevstate)=>[...prevstate, ...resData.data]);
        }
      } catch (error){
        console.log("Get deleted Blog promise fail", error);
      }
    }
    fetchData();
  }, []);

  async function handleRestoreBlogs(event) {
    if(window.confirm('Are you sure you want to restore this blog?') === true){
      try {
        const resData = await sendBlogRequest({
          url: "https://blog-app-backend-huph.onrender.com/blog/restore-blog",
          config: {
            method: "POST",
            credentials: "include",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({ blogId: event.target.id }),
          },
        });
        if (resData.status == 200) {
            setDeletedBlogs((prevState)=>prevState.filter((blog)=>event.target.id !== blog._id))
            dispatch(blogsDataAction.resetMyBlogData());
        }
      } catch (error) {
        console.log("Delete Blog promise fail", error);
      }
    }
  }

  return (
    <>
      {deletedBlogs?.length === 0 && (
        <div className="no-posts-section">
          <p>No blogs deleted yet</p>
        </div>
      )}
      {deletedBlogs.length !== 0 && deletedBlogs && (
        <div className="main-feed">
          {deletedBlogs.map((item) => {
            const currentTime = Date.now();
            const milliseconds = item.creationDateTime;
            const time = convertMilliseconds(currentTime - milliseconds);

          

            return (
              <div className="post-myBlog" key={item._id}>
                <div className="user-info-post">
                  <div className="avatar">
                    {loginUserData.usersname[0].toUpperCase() || 'D'} 
                  </div>
                  <div className="user-details-post">
                    <span className="username">{loginUserData.usersname || 'Test_username'}</span>
                    <span className="handle">
                      @{loginUserData?.username|| 'Test'}
                    </span> • {time}
                  </div>
                </div>

                <div className="post-content">
                 
                      <p className="post-content-title">{item?.title}</p>
                      <hr className="horizontal-line" />
                      <p className="post-content-body">{item?.textBody}</p>
    
                </div>

               
                  <div className="my-post-actions">
                    
                    <button
                      className="my-post-button"
                      id={item?._id}
                      onClick={handleRestoreBlogs}
                    >
                        Restore Blog
                    </button>
                  </div>
              </div>
            );
          })}
         
        </div>
      )}
    </>
  );
}
