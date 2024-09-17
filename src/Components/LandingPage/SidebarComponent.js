import { useEffect, useState } from "react";
import sendBlogRequest from "../../Funtions/blogFetchFunction";
import { useSelector } from "react-redux";
import followUserState from "../../Funtions/followUserState";
import { toast } from "react-toastify";
import Loader from "../Common-Components/Loader/Loader";

const Getconfig = {
  method: "GET",
  credentials: "include",
};

export default function Sidebar() {
  const [loadingUserId, setLoadingUserId] = useState(null);
  const [allUsers, setAllUsers] = useState(null);
  const isLogin = useSelector((state) => state.usersData.isLogin);
  const [followingData, setFollowingData] = useState([]);
  const [reresnder, setReresnder] = useState(0);
  useEffect(() => {
    async function fetchData() {
      try {
        const resUserData = await followUserState({
          url: "https://blog-app-backend-huph.onrender.com/auth/getUsers",
          config: Getconfig,
        });

        if (resUserData.status === 200) {
          setAllUsers(resUserData.data);
        }
        const resFollowData = await followUserState({
          url: "https://blog-app-backend-huph.onrender.com/follow/follow-list?skip=0",
          config: Getconfig,
        });

        if (resFollowData) {
          setFollowingData(resFollowData.data);
        }
      } catch (error) {
        console.log("Get user promise fail", error);
      }
    }
    fetchData();
  }, [isLogin, reresnder]);

  async function handleFollowbtn(event) {
    if (!isLogin) {
      toast.error("Login to use this feature", {
        position: "bottom-right",
        autoClose: 5000,
      });
      return;
    }
    const userId = event.target.id;
    setLoadingUserId(userId);
    try {
      const resData = await followUserState({
        url: "https://blog-app-backend-huph.onrender.com/follow/follow-user",
        config: {
          method: "POST",
          credentials: "include",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            followingUserId: event.target.id,
          }),
        },
      });
      if (resData) {
        toast.success(resData.message, {
          position: "bottom-right",
          autoClose: 5000,
        });
        setReresnder(Math.random(100));
      }
    } catch (error) {
      console.log("failed in follow user", error);
    }
    setLoadingUserId(null);
  }
  async function handleUnfollowbtn(event) {
    if (!isLogin) {
      toast.error("Login to use this feature", {
        position: "bottom-right",
        autoClose: 5000,
      });
      return;
    }
    const userId = event.target.id;
    setLoadingUserId(userId);
    try {
      const resData = await followUserState({
        url: "https://blog-app-backend-huph.onrender.com/follow//unfollow-user",
        config: {
          method: "POST",
          credentials: "include",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            followingUserId: event.target.id,
          }),
        },
      });
      if (resData) {
        toast.success(resData.message, {
          position: "bottom-right",
          autoClose: 5000,
        });
        setReresnder(Math.random(100));
      }
    } catch (error) {
      console.log("failed in unfollow user", error);
    }
    setLoadingUserId(null);
  }
  const isUserFollowed = (userId) =>
    followingData?.some((follow) => follow._id === userId);
  return (
    <aside className="sidebar">
      <div className="sidebar-title">New on InspireLink</div>
      <hr />

      <div className="user-list">
        {allUsers &&
          allUsers.map((item) => (
            <div className="user" key={item._id}>
              <div className="avatar">{item?.name[0].toUpperCase()}</div>
              <div className="user-info">
                <div className="username">{item?.name}</div>
                <div className="handle">@{item?.username}</div>
              </div>
              {isUserFollowed(item._id) ? (
                <button
                  className="follow-btn"
                  id={item._id}
                  onClick={handleUnfollowbtn}
                >
                  {loadingUserId === item._id ? <Loader /> : "Unfollow"}
                </button>
              ) : (
                <button
                  className="follow-btn"
                  id={item._id}
                  onClick={handleFollowbtn}
                >
                  {loadingUserId === item._id ? <Loader /> : "Follow"}
                </button>
              )}
            </div>
          ))}
      </div>
    </aside>
  );
}
