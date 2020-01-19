import {
  } from '../../actions';
  
  const initialState = {

  };
  
  // ////////////////////
  // Reducers //////////
  // //////////////////
  export default function feedActions(state = initialState, action) {
    switch (action.type) {
    //   case TOGGLE_FLYOUT:
    //     // If we clicked the same button that opened the flyout, it should close.
    //     const newFlyoutValue =  action.flyout !== state.activeFlyout
    //       ? action.flyout
    //       : null;
  
    //     return {
    //       ...state,
    //       activeFlyout: newFlyoutValue,
    //     };
  
    //   case CHANGE_MOOD:
    //     return {
    //       ...state, 
    //       mood: action.mood
    //     }
  
      default:
        return state;
    }
  }
  
  
  // ////////////////////
  // Selectors /////////
  // //////////////////
  