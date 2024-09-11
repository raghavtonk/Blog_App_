import { useEffect, useRef } from "react";
import { createPortal } from "react-dom";

export default function Modal({children,open,onClose }){
    const dailog = useRef();
    useEffect(()=>{
        const model = dailog.current
        if(open){
            model.showModal();
        }
        return ()=> model.close()
    },[open])
    return createPortal(
        <dialog ref={dailog} className='modal-container' onClose={onClose}>
            {children} 
        </dialog>,
        document.getElementById('modal')
    )
}
