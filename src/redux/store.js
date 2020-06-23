import { createStore, applyMiddleware } from 'redux';
import thunk from "redux-thunk";
import logger from 'redux-logger';

const initialState = {
  sidebarShow: 'responsive',
  role:""
}

const changeState = (state = initialState, action) => {
  switch (action.type) {
    case 'set':
      return {...state}
    case 'USER_LOGIN':
      return {...state,role:action.role}
    default:
      return state
  }
}

const store = createStore(changeState,  applyMiddleware(thunk, logger))
export default store