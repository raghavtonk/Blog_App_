import { useContext, useRef, useState } from "react";
import Modal from "../../../UI/Modal";
import UserProgressContext from "../../../Store/UserProgressContext";
import feathercolor from "../../../medium/feather-pen_color.png";
import VisibilityOffIcon from "@mui/icons-material/VisibilityOff";
import VisibilityIcon from "@mui/icons-material/Visibility";
import "./Register.css";
import sendAuthRequest from "../../../Funtions/authFetchFunctions";

export default function Register() {
    const formRef = useRef(null);
  const userProgressCtx = useContext(UserProgressContext);
  const [passwordState, setPasswordState] = useState({
    passwordType: "password",
    passwordIcon: <VisibilityOffIcon />,
  });
  function handleCloseModal() {
    if (userProgressCtx.progress === "signUp") userProgressCtx.hideSignModal();
  }
  function handleGoToSignIn() {
    if (userProgressCtx.progress === "signUp")
      userProgressCtx.showSignModal("signIn");
  }
  function handleShowPassword() {
    console.log("show");
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
  async function handleRegisterSubmit(event) {
    event.preventDefault();
    const formdataRef = formRef.current
    const fd = new FormData(formdataRef);
    const data = {
      name: fd.get("name"),
      username: fd.get("username"),
      email: fd.get("email"),
      password: fd.get("password"),
    };
    console.log("dataobj", data);
    const config = {
      method: "POST",
      credentials: "include",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    };
    try {
       const resData = await sendAuthRequest("https://blog-app-backend-huph.onrender.com/auth/register", config);
       if(resData){
        handleGoToSignIn();
        formdataRef.reset();
       }
    } catch (error) {
        console.log('register promise fail',error)
    }
    
  }
  return (
    <Modal
      open={userProgressCtx.progress === "signUp"}
      onClose={handleCloseModal}
    >
      <div className="login-box">
        <img className="icon" src={feathercolor} alt="logo-icon" />

        <h2>Sign up </h2>
        <p>
          Join our community and start crafting your own narrative. Sign up and
          let your creativity flow.
        </p>
        <form ref={formRef} onSubmit={handleRegisterSubmit}>
          <div className="input-group">
            <input type="text" placeholder="Name" name="name" required />
          </div>
          <div className="input-group">
            <input
              type="text"
              placeholder="User Name"
              name="username"
              required
            />
          </div>
          <div className="input-group">
            <input type="text" placeholder="Email" name="email" required />
          </div>
          <div className="input-group">
            <input
              type={passwordState.passwordType}
              placeholder="Password"
              name="password"
              required
            />
            <span className="toggle-password" onClick={handleShowPassword}>
              {passwordState.passwordIcon}
            </span>
          </div>
         
          <button type="submit" >
            Get Started
          </button>
        </form>
        <div className="alternative-signin">
          <button onClick={handleCloseModal}>close</button>
          <button onClick={handleGoToSignIn}>Or sign in </button>
        </div>
      </div>
    </Modal>
  );
}
