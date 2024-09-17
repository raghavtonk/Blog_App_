import "./App.css";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { ModeSwitchContextProvider } from "./Store/modeSwitchContext";
import { UserProgressContextProvider } from "./Store/UserProgressContext";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import LandingPage from "./Routes/LandindPage";
import CreatePostPage from "./Routes/CreatePostPage";
import ProfilePage from "./Routes/ProfilePage";
import DeletedBlogPage from "./Routes/DeletedBlogPage";
function App() {
  return (
    <ModeSwitchContextProvider>
      <UserProgressContextProvider>
          <BrowserRouter>
            <Routes>
              <Route path="/" element={<LandingPage />} />
              <Route path="/create-post" element={<CreatePostPage />} />
              <Route path="/profile/:id" element={<ProfilePage/>} />
              <Route path="/deleted-blogs" element={<DeletedBlogPage/>}/>
            </Routes>
          </BrowserRouter>
          <ToastContainer />
      </UserProgressContextProvider>
    </ModeSwitchContextProvider>
  );
}

export default App;
