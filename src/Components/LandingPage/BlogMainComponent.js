import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import sendBlogRequest from "../../Funtions/blogFetchFunction";
import { blogsDataAction } from "../../Store/BlogsDataReducer";
import convertMilliseconds from "../../Funtions/ConvertMillisecond";
import Loader from "../Common-Components/Loader/Loader";

const Getconfig = {
  method: "GET",
  credentials: "include",
};
export default function BlogComponent() {
  const [isLoading, setIsLoading] = useState(false);
  const isLogin = useSelector((state) => state.usersData.isLogin);
  const { blogData, skip } = useSelector((state) => state.blogsData.allBlogs);
  const dispatch = useDispatch();

  useEffect(() => {
    async function fetchData() {
      setIsLoading(true);
      try {
        const resData = await sendBlogRequest({
          url: `https://blog-app-backend-huph.onrender.com/blog/get-blogs?skip=${skip}`,
          config: Getconfig,
        });

        if (resData.status === 200) {
          dispatch(blogsDataAction.addAllBlogs(resData.data));
        }
      } catch (error) {
        console.log("Get Blog promise fail", error);
      }
      setIsLoading(false);
    }
    if (!isLogin) dispatch(blogsDataAction.resetBlogData());
    fetchData();
  }, [skip, dispatch, isLogin]);

  function handleMoreDataCall() {
    dispatch(blogsDataAction.changeSkipValue());
  }
  return (
    <>
      {blogData && (
        <div className="main-feed">
          {blogData.map((item) => {
            const currentTime = Date.now();
            const milliseconds = item.creationDateTime;

            const time = convertMilliseconds(currentTime - milliseconds);
            return (
              <div className="post" key={item._id}>
                <div className="user-info-post">
                  <div className="avatar">
                    {item?.userId.name[0].toUpperCase()}
                  </div>
                  <div className="user-details-post">
                    <span className="username">{item?.userId.name}</span>
                    <span className="handle">
                      @{item?.userId.username}
                    </span> • {time}
                  </div>
                </div>
                <div className="post-content">
                  <p className="post-content-title">{item?.title}</p>
                  <hr className="horizontal-line" />
                  <p className="post-content-body">{item?.textBody}</p>
                </div>
                <div className="post-actions">
                  <button className="like">❤ 1</button>
                  <button className="retweet">🔁</button>
                  <button className="comment">💬</button>
                </div>
              </div>
            );
          })}
          {isLoading === true ? (
            <Loader cssClass="loader" loaderSize="3rem" />
          ) : (
            <button className="load-data-btn" onClick={handleMoreDataCall}>
              Load Blog...
            </button>
          )}
        </div>
      )}
    </>
  );
}
