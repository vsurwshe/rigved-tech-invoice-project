import { createStore, applyMiddleware, compose } from 'redux';
import thunk from "redux-thunk";
import logger from 'redux-logger';

// this function save state into local storage.
const saveToLocalStorage=(state)=>{
  try{
    const seralizedState= JSON.stringify(state);
    localStorage.setItem("state",seralizedState);
  }catch(error){
    console.error("Error Occured in saveing value to storage",error);
  }
}

// this functions return the state value form local stoage.
const loadFormLocalStorgae=()=>{
  try{
    const serializedState= localStorage.getItem("state");
    if(serializedState === null){
      return undefined;
    }
    return JSON.parse(serializedState);
  }catch(error){
    console.error("Error Occured in fetching value from storage",error)
    return undefined;
  }
}

// this is creating perseting state values with store
const persistedState= loadFormLocalStorgae();

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
      localStorage.setItem('account_id',action.account_id)
      return { ...state, account_id: action.account_id, authorization: action.authorization }
    case "CHANGE_MASSAGE":
      return { ...state, common_message: action.message }
    default:
      return state
  }
}

const enhancer= compose(applyMiddleware(thunk, logger));

const store = createStore(changeState, persistedState, enhancer);

store.subscribe(()=> saveToLocalStorage(store.getState()))

export default store
