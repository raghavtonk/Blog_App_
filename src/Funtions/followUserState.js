import { toast } from "react-toastify";

export default function followUserState({url,config}){
    return new Promise(async(resolve,reject)=>{
        try{
            const response = await fetch(url,config);
            const resData = await response.json();
        
            if(resData.status >= 200 && resData.status < 205){
                resolve(resData);
            }
            else if( resData.status === 400){
                let errorMsg = 'Message: ' + resData?.message;
                if(resData.error )
                    errorMsg += " error: " + resData?.error;
                toast.error(errorMsg,{
                    position: "bottom-right",
                    autoClose: 5000
                });
                reject(false)
            }
            else if(resData.status === 500){
                let errorMsg = 'Message: ' + resData?.message;
                if(resData.error )
                    errorMsg += " error: " + resData?.error;
                toast.error(errorMsg,{
                    position: "bottom-right",
                    autoClose: 5000
                });
                reject(false)
            }
        } catch (error) {
            console.log(error)
            reject(false)
        }
    })
}