import { useSelector } from "react-redux";
import Profile from "../Components/Profile-Components/ProfileComponent";
import Header from "../Components/Common-Components/Header/Header";

export default function ProfilePage() {
  const isLogin = useSelector((state) => state.usersData.isLogin);
  // if (!isLogin) {
  //   toast.error("Login to use this feature", {
  //     position: "bottom-right",
  //     autoClose: 5000,
  //   });
  //   return <Header />;
  // } else {
    return (
      <>
        <Header />
        <Profile />
      </>
    );
  // }
}
