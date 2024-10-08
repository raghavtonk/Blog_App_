import { useEffect, useState } from "react";
import MyBlogs from "./MyBlogs";
import "./ProfileComponent.css";
import { useSelector } from "react-redux";
import followUserState from "../../Funtions/followUserState";
import { Link } from "react-router-dom";

export default function Profile() {
  const { isLogin, loginUserData } = useSelector((state) => state.usersData);
  const [totalFollowerSum, setTotalFollowerSum] = useState(0);
  const [totalFollowingSum, setTotalFollowingSum] = useState(0);
  let avatar = "";
  let name = "";
  useEffect(() => {
    async function fetchData() {
      const totalFollowingData = await followUserState({
        url: "https://blog-app-backend-huph.onrender.com/follow/follow-sum",
        config: {
          method: "GET",
          credentials: "include",
        },
      });
      if (totalFollowingData.data) {
        setTotalFollowingSum(totalFollowingData?.data[0].totalFollowings);
      }
      const totalFollowerData = await followUserState({
        url: "https://blog-app-backend-huph.onrender.com/follow/follower-sum",
        config: {
          method: "GET",
          credentials: "include",
        },
      });

      if (totalFollowerData.data.length !== 0) {
        setTotalFollowerSum(totalFollowerData?.data[0].totalFollower);
      }
    }

    fetchData();
  }, []);

  if (loginUserData.usersname) {
    avatar = loginUserData?.usersname[0].toUpperCase();
    name =
      loginUserData?.usersname[0].toUpperCase() +
      loginUserData?.usersname.slice(1);
  }
  if (loginUserData == {} || isLogin === false) {
    return <div className="no-login">Login to use this feature</div>;
  } else
    return (
      <>
        {loginUserData && (
          <div className="profile-section-contener-myBlog">
            <div className="profile-section-myBlog">
              <div className="profile-left">
                <div className="avatar-contener-myBlog">
                  <div className="avatar-myBlog">{avatar}</div>
                </div>
                <div className="profile-info-myBlog">
                  <h1>{name}</h1>
                  <p>@{loginUserData?.username}</p>
                  <p>
                    {totalFollowingSum} Following {totalFollowerSum} Follower
                  </p>
                </div>
              </div>
              <Link to='/deleted-blogs' className="deletedBlogbtn text-link text-button">Deleted Blog</Link>
            </div>

            <hr className="hr-myblog" />
            <div className="posts-section">
              <MyBlogs />
            </div>
          </div>
        )}
      </>
    );
}
