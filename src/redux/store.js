import { createStore, applyMiddleware } from 'redux';
import thunk from "redux-thunk";
import logger from 'redux-logger';

const initialState = {
  sidebarShow: 'responsive',
  role: "",
  account_id: "",
  authorization: "",
  common_message: ""
}

const changeState = (state = initialState, action) => {
  switch (action.type) {
    case 'set':
      return { ...state }
    case 'USER_LOGIN':
      return { ...state, role: action.role }
    case "SET_ACCOUNT_ID":
      return { ...state, account_id: action.account_id, authorization: action.authorization }
    case "CHANGE_MASSAGE":
      return { ...state, common_message: action.message }
    default:
      return state
  }
}

const store = createStore(changeState, applyMiddleware(thunk, logger))
export default store