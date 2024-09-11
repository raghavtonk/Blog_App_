import feather_outline from "../../../medium/feather-pen_outline.png"
import feather_color from "../../../medium/feather-pen_color.png"
import HomeIcon from '@mui/icons-material/Home';
import AddBoxOutlinedIcon from '@mui/icons-material/AddBoxOutlined';
import AccountBoxOutlinedIcon from '@mui/icons-material/AccountBoxOutlined';
import SwitchMode from "./SwitchMode";
import { useContext, useEffect } from "react";
import modeSwitchContext from "../../../Store/modeSwitchContext";
import './Header.css'
import UserProgressContext from "../../../Store/UserProgressContext";
import Register from "../../Auth_Components/Register/Register";
import Login from "../../Auth_Components/Login/Login";
import { useDispatch, useSelector } from "react-redux";
import sendAuthRequest from "../../../Funtions/authFetchFunctions";
import { usersDataActions } from "../../../Store/userDataReducer";
import { Link } from "react-router-dom";
import Cookies from 'js-cookie';

export default function Header(){
    const {isLogin,loginUserData} = useSelector((state)=>state.usersData)
    const dispatch = useDispatch()
    const modeSwitchCtx = useContext(modeSwitchContext);
    const userProgressCtx = useContext(UserProgressContext)
    let imgSrc = feather_color
    if(modeSwitchCtx.darkMode){
     imgSrc = feather_outline;
    }
    useEffect(()=>{
        const isUserLogin = Cookies.get('isUserLogin');
        const userData = Cookies.get('userData');
        if(isUserLogin){
            dispatch(usersDataActions.changeLoginStatus('login'));
            dispatch(usersDataActions.inputUsersData(JSON.parse(userData)))
        }
        if(!isUserLogin){
          dispatch(usersDataActions.changeLoginStatus('logout'))
        }
    },[])
    function handleGoToSignIn(){
        userProgressCtx.showSignModal('signIn');
    }
    async function handleSignOut(){
        const config={
            method: "POST",
            credentials: "include",
            headers: {
                'Content-Type': 'application/json',
              },
        }
        try {
            const resData = await sendAuthRequest('https://blog-app-backend-huph.onrender.com/auth/logout', config)
            if(resData){
                dispatch(usersDataActions.changeLoginStatus('logout'));
                dispatch(usersDataActions.inputUsersData({}));
                Cookies.remove('isUserLogin');
                Cookies.remove('userData');
            }
        } catch (error) {
            console.log('signout promise fail',error);
        }
    }
   
    return(
        <nav>
            <div className="header-left-side">
                <img src={imgSrc} alt="logo icon" id="logo_icon"/>
                <h2>InspireLink</h2>
            </div>
            <div className="header-middle-side">
                <Link to='/' className="text-link"><HomeIcon/></Link>
                {/* <SearchIcon/> */}
                <Link to='/create-post' className="text-link"><AddBoxOutlinedIcon/></Link>
                <Link to={'/profile/' + loginUserData.userId} className="text-link"><AccountBoxOutlinedIcon/></Link>
            </div>
            <div className="header-right-side">
                {!isLogin && <button className="text-button signIn-button" onClick={handleGoToSignIn}>Sign In</button>}
                {isLogin && <button className="text-button signIn-button" onClick={handleSignOut}>Sign Out</button>}
                Switch Mode <SwitchMode/>
            </div>
            <Register/>
            <Login/>
        </nav>
    )
}