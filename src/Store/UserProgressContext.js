import { createContext, useState } from "react";

const UserProgressContext = createContext({
    showSignModal: (type)=>{},
    hideSignModal: ()=>{},
});

export function UserProgressContextProvider({children}){
    const [userProgress, setUserProgress] = useState('');

    function showSignModal(type){
        setUserProgress(type);
    }
    function hideSignModal(){
        setUserProgress('');
    }

    const userProgressCtx = {
        progress: userProgress,
        showSignModal,
        hideSignModal,
    }
    return(
        <UserProgressContext.Provider value={userProgressCtx}>
            {children}
        </UserProgressContext.Provider>
    );
}

export default UserProgressContext;