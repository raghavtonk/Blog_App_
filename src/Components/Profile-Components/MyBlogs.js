import "./MyBlogs.css";
import { useDispatch, useSelector } from "react-redux";
import sendBlogRequest from "../../Funtions/blogFetchFunction";
import convertMilliseconds from "../../Funtions/ConvertMillisecond";
import { blogsDataAction } from "../../Store/BlogsDataReducer";
import { useEffect, useState } from "react";

const Getconfig = {
  method: "GET",
  credentials: "include",
};

export default function MyBlogs() {
  const [isEdit, setIsEdit] = useState(false);
  const [editBlog, setEditBlog] = useState(null); 
  const [formData, setFormData] = useState({ title: "", textBody: "" }); 

  const { isLogin, loginUserData } = useSelector((state) => state.usersData);
  const { blogData, skip } = useSelector((state) => state.blogsData.myBlogs);
  const dispatch = useDispatch();

  useEffect(() => {
    async function fetchData() {
      try {
        const resData = await sendBlogRequest({
          url: `https://blog-app-backend-huph.onrender.com/blog/get-myblogs?skip=${skip}`,
          config: Getconfig,
        });
        if (resData.status == 200 && resData.data) {
          dispatch(blogsDataAction.addMyBlogs(resData.data));
        }
      } catch (error) {
        console.log("Get Blog promise fail", error);
      }
    }
    if (!isLogin) dispatch(blogsDataAction.resetMyBlogData());
    fetchData();
  }, [skip, dispatch, isLogin]);

  function handleMoreDataCall() {
    dispatch(blogsDataAction.changeMyBlogSkip());
  }

  async function handleDeleteMyBlog(event) {
    try {
      const resData = await sendBlogRequest({
        url: "https://blog-app-backend-huph.onrender.com/blog/delete-blog",
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
        dispatch(blogsDataAction.deleteMyBlog(event.target.id));
      }
    } catch (error) {
      console.log("Delete Blog promise fail", error);
    }
  }


  function handleEditMyBlog(event) {
    const blogId = event.target.id;
    const blogToEdit = blogData.find((blog) => blog._id === blogId);
    if (blogToEdit) {
      setEditBlog(blogToEdit); 
      setFormData({
        title: blogToEdit.title,
        textBody: blogToEdit.textBody,
      });
      setIsEdit(true); 
    }
  }


  function handleInputChange(event) {
    const { name, value } = event.target;
    setFormData((prevFormData) => ({
      ...prevFormData,
      [name]: value,
    }));
  }

  // Submit edited blog
  async function handleSubmitBlog(event) {
    event.preventDefault();
    try {
      const resData = await sendBlogRequest({
        url: "https://blog-app-backend-huph.onrender.com/blog/edit-blog",
        config: {
          method: "POST",
          credentials: "include",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            blogId: editBlog._id,
            newTitle: formData.title,
            newTextBody: formData.textBody,
          }),
        },
      });
      if (resData.status == 200) {
        dispatch(
          blogsDataAction.editMyBlog({
            blogId: editBlog._id,
            title: formData.title,
            textBody: formData.textBody,
          })
        );
        setIsEdit(false); // Exit edit mode
        setEditBlog(null); // Clear the edited blog
      }
    } catch (error) {
      if (
        error.message === "Blog cannot be edited after 30mins of creation time"
      ) {
        setIsEdit(false);
        setEditBlog(null);
      }
      console.log("Edit Blog promise fail", error);
    }
  }

  return (
    <>
      {blogData.length === 0 && (
        <div className="no-posts-section">
          <p>No post yet</p>
        </div>
      )}
      {blogData.length !== 0 && blogData && (
        <div className="main-feed">
          {blogData.map((item) => {
            const currentTime = Date.now();
            const milliseconds = item.creationDateTime;
            const time = convertMilliseconds(currentTime - milliseconds);

            const isCurrentBlogEdit = editBlog && editBlog._id === item._id;

            return (
              <div className="post-myBlog" key={item._id}>
                <div className="user-info-post">
                  <div className="avatar">
                    {loginUserData.usersname[0].toUpperCase()}
                  </div>
                  <div className="user-details-post">
                    <span className="username">{loginUserData.usersname}</span>
                    <span className="handle">
                      @{loginUserData.username}
                    </span> • {time}
                  </div>
                </div>

                <div className="post-content">
                  {isCurrentBlogEdit ? (
                    <form onSubmit={handleSubmitBlog}>
                      <div className="post-title">
                        <input
                          type="text"
                          name="title"
                          className="post-input"
                          value={formData.title}
                          onChange={handleInputChange}
                        />
                      </div>
                      <div className="post-body">
                        <textarea
                          rows="20"
                          cols="50"
                          maxLength="1000"
                          type="textarea"
                          className="post-input"
                          name="textBody"
                          value={formData.textBody}
                          onChange={handleInputChange}
                        />
                      </div>
                      <div className="postButon-div">
                        <button className="my-post-button" type="submit">
                          Submit
                        </button>
                      </div>
                    </form>
                  ) : (
                    <>
                      <p className="post-content-title">{item?.title}</p>
                      <hr className="horizontal-line" />
                      <p className="post-content-body">{item?.textBody}</p>
                    </>
                  )}
                </div>

                {!isCurrentBlogEdit && (
                  <div className="my-post-actions">
                    <button
                      className="my-post-button"
                      id={item?._id}
                      onClick={handleEditMyBlog}
                    >
                      Edit
                    </button>
                    <button
                      className="my-post-button"
                      id={item?._id}
                      onClick={handleDeleteMyBlog}
                    >
                      Delete
                    </button>
                  </div>
                )}
              </div>
            );
          })}
          <button className="load-data-btn" onClick={handleMoreDataCall}>
            Load Blog...
          </button>
        </div>
      )}
    </>
  );
}
