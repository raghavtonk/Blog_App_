import "./LandingPageComponent.css";
import Sidebar from "./SidebarComponent";
import BlogComponent from "./BlogMainComponent";

export default function LandingPageComponent() {
   
   
  return (
    <>
      <div className="container">
        <Sidebar />
        <BlogComponent />
      </div>
    </>
  );
}
