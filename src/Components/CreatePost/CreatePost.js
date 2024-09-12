import { useSelector } from "react-redux";
import "./CreatePost.css";
import { useRef } from "react";
import { toast } from "react-toastify";
import sendBlogRequest from "../../Funtions/blogFetchFunction";

export default function CreatePost() {
    const formRef = useRef(null);
    const {loginUserData,isLogin} = useSelector((state)=>state.usersData);
    let name ='R'
    if(loginUserData.usersname){
        name = loginUserData?.usersname[0].toUpperCase();
    }
    async function handleCreateBlog(event){
        event.preventDefault();
        const formDataRef = formRef.current;
        if(!isLogin){
            toast.error('Login to use this feature.',{
                position: "bottom-right",
                autoClose:5000
            })
            formDataRef.reset();
            return;
        }
       
        const fd = new FormData(formDataRef);
        const data ={
            title: fd.get('blogTitle'),
            textBody: fd.get('blogBody'),
        }
        const config ={
            method: "POST",
            headers:{
                "Content-Type": "application/json",
            },
            credentials: "include",
            body:JSON.stringify(data),
        }
        try {
            const resData =  await sendBlogRequest({url:'https://blog-app-backend-huph.onrender.com/blog/create-blog',config});
            if(resData){
                formDataRef.reset();
                return;
            }
        } catch (error) {
            console.log('create blog promise fail',error);
        }
    }
  return (
    <>
      <section className="post-container">
        <form ref={formRef} onSubmit={handleCreateBlog}>
        <div className="post-title">
          <div className="user-icon">
            <span>{name}</span>
          </div>
          <input
            type="text"
            className="post-input"
            placeholder="Blog title ..."
            name="blogTitle"
            required
          />
        </div>

        <div className="post-body">
          <textarea
            rows="20"
            cols="50"
            maxLength="1000"
            type="textarea"
            className="post-input"
            placeholder="Blog body..."
            name="blogBody"
            required
          />
        </div>
        <div className="postButon-div">
          <button className="post-button">Post</button>
        </div>
        </form>
        
      </section>
    </>
  );
}
