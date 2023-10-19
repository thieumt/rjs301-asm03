import { showPopup, hidePopup} from '../store';

export const showPopupAction = () => (dispatch, getState) => {
   const stateImg = getState().popup.isPopupState;
   if (stateImg === false) {
     dispatch(showPopup());
   }
 };
 
 export const hidePopupAction = () => (dispatch, getState) => {
   const stateImg = getState().popup.isPopupState;
   if (stateImg === true) {
     dispatch(hidePopup());
   }
 };