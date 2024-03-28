import * as ActionTypes from './ActionTypes';

export const Feedback = (state = { errMess: null, feedback:{}}, action:any) => {
    
    switch (action.type) {
      case ActionTypes.ADD_FEEDBACK:
        return {...state, errMess: null, feedback: action.payload};
  
      case ActionTypes.FEEDBACK_FAILED:
        return {...state, errMess: action.payload,feedback: action.payload};
      default:
        return state;
    }
  };