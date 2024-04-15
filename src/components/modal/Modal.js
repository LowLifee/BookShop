import { Orders } from '../../App';
import { useContext, useEffect } from 'react';

import './modal.css';

const Modal = () => {

   const active = useContext(Orders);
   const { popupToggle, popupActive } = active;

   useEffect(() => {
      if(popupActive){
         document.querySelector('body').style.overflow = 'hidden';
      }else{
         document.querySelector('body').style.overflow = '';
      }
      
   }, [active])

   return (
      <div
         className="popup"
         style={{ display: popupActive ? 'flex' : 'none' }}>
         <div className="modal-wrapper">
            <span onClick={popupToggle}>X</span>
            <h2>Успешно отправлено!</h2>
            <button onClick={popupToggle}>Закрыть</button>
         </div>
      </div>
   )
}

export default Modal;