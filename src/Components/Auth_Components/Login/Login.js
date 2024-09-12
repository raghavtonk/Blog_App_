import { useContext, useRef, useState } from "react";
import Modal from "../../../UI/Modal";
import UserProgressContext from "../../../Store/UserProgressContext";
import "./Login.css";
import feathercolor from "../../../medium/feather-pen_color.png";
import VisibilityOffIcon from "@mui/icons-material/VisibilityOff";
import VisibilityIcon from "@mui/icons-material/Visibility";
import sendAuthRequest from "../../../Funtions/authFetchFunctions";
import { useDispatch} from "react-redux";
import { usersDataActions } from "../../../Store/userDataReducer";
import Cookies from 'js-cookie';
import { blogsDataAction } from "../../../Store/BlogsDataReducer";

export default function Login() {
  const formRef = useRef(null);
  const dispatch = useDispatch();

  const [passwordState, setPasswordState] = useState({
    passwordType: "password",
    passwordIcon: <VisibilityOffIcon />,
  });
  const userProgressCtx = useContext(UserProgressContext);
  function handleCloseModal() {
    if (userProgressCtx.progress === "signIn") userProgressCtx.hideSignModal();
  }
  function handleGoToSignUp() {
    if (userProgressCtx.progress === "signIn") {
      userProgressCtx.showSignModal("signUp");
    }
  }

  function handleShowPassword() {
    
    if (passwordState.passwordType === "password") {
      setPasswordState({
        passwordIcon: <VisibilityIcon />,
        passwordType: "text",
      });
    } else {
      setPasswordState({
        passwordType: "password",
        passwordIcon: <VisibilityOffIcon />,
      });
    }
  }

  async function handleLoginSubmit(event) {
    event.preventDefault();
    const formdataRef = formRef.current;
    const fd = new FormData(formdataRef);
    const data = {
      loginId: fd.get("loginId"),
      password: fd.get("password"),
    };
    const config = {
      method: "POST",
      credentials: "include",
      withCredentials: true,
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    };
    try {
      const resData = await sendAuthRequest(
        "https://blog-app-backend-huph.onrender.com/auth/login",
        config
      );
      if (resData) {
        const dataOjt = {
          userId: resData.data._id,
          usersname: resData.data.name,
          username: resData.data.username,
          useremail: resData.data.email,
        };
        dispatch(usersDataActions.changeLoginStatus("login"));
        dispatch(usersDataActions.inputUsersData(dataOjt));
        Cookies.set('isUserLogin',true,{ expires: 1 });
        Cookies.set('userData', JSON.stringify(dataOjt),{ expires: 1 });
        dispatch(blogsDataAction.resetBlogData());
        handleCloseModal();
        formdataRef.reset();
      }
    } catch (error) {
      console.log("login promise fail", error);
    }
  }
  return (
    <Modal
      open={userProgressCtx.progress === "signIn"}
      onClose={handleCloseModal}
    >
      <div className="login-box">
        <img className="icon" src={feathercolor} alt="logo-icon" />

        <h2>Sign in </h2>
        <p>
          Start sharing your stories and ideas with the world. Sign in and make
          your voice heard.
        </p>
        <form ref={formRef} onSubmit={handleLoginSubmit}>
          <div className="input-group">
            <input type="text" placeholder="LoginId" name="loginId" required />
          </div>
          <div className="input-group">
            <input
              type={passwordState.passwordType}
              name="password"
              placeholder="Password"
              required
            />
            <span className="toggle-password" onClick={handleShowPassword}>
              {passwordState.passwordIcon}
            </span>
          </div>
          <div className="forgot-password">
            <a href="#">Forgot password?</a>
          </div>
          <button type="submit">Get Started</button>
        </form>
        <div className="alternative-signin">
          <button onClick={handleCloseModal}>close</button>
          <button onClick={handleGoToSignUp}>Or sign up </button>
        </div>
      </div>
    </Modal>
  );
}
