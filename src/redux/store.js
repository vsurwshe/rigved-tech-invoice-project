import { createStore, applyMiddleware, compose, combineReducers } from 'redux';
import thunk from "redux-thunk";
import logger from 'redux-logger';
import { reducer as reduxFormReducer } from 'redux-form';
import LoginState from "./reducer/LoginState";

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



const reducer = combineReducers({
  form: reduxFormReducer, // mounted under "form"
  LoginState
});

const enhancer= compose(applyMiddleware(thunk, logger));

const store = createStore(reducer, persistedState, enhancer);

store.subscribe(()=> saveToLocalStorage(store.getState()))

export default store
