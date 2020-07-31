import axios from "axios"
import {API_URL, AlertColor} from '../../assets/config/Config';
import { UNAUTHORIZED, OKSTATUS, CONFLICTSTATUS } from "../../assets/config/CodeMap";

const LoginUser=(userData) =>{
    const headerConfig={
        headers:{ "Content-Type":"application/json" }
    }
    return (dispatch) => {
            return axios.post(API_URL + "/authentication/signIn", userData,headerConfig)
            .then(response => {
                    if(response.status=== UNAUTHORIZED){
                        dispatch(loadMessage(AlertColor.danger ,response.headers.message));
                    }else{
                        dispatch(loadMessage(AlertColor.success,response.headers.message))
                        dispatch(setAuthrizations(response.data))
                    }
            }).catch(err => {
                    dispatch(loadMessage(AlertColor.danger, 'Something went worng..!'));
            })
        }
}

const LogoutUser=()=>{
    return (dispatch) => {
        dispatch(clearData())
    }
}

const RegisterUser=(userData, authorizationKey)=>{
    const headerConfig={
        headers: { 
            "Content-Type":"application/json" ,
            "Authorization": authorizationKey
        }
    }

    return(dispatch)=>{
        return axios.post(API_URL + "/registration/registration", userData,headerConfig)
        .then(response => {
                if(response.data.status !== OKSTATUS){
                    dispatch(loadMessage(AlertColor.danger,response.headers.message));
                }else{
                    dispatch(loadMessage(AlertColor.success,response.headers.message))
                    dispatch(saveUser(userData))
                }})
        .catch(error => { 
            if(error && error.response && error.response.status.toString() === CONFLICTSTATUS){
                dispatch(loadMessage(AlertColor.danger, error.response.headers.message));
            }else{
                dispatch(loadMessage(AlertColor.danger, 'Something went worng..!'));
            }
        })
    }
}


//--------------------- Types Actions
export function setAuthrizations(data){
    return{
        type:"SET_ACCOUNT_ID",
        account_id :data.AccountId,
        authorization: data.Authorization 
    }
}

export function clearData(){
    return{
        type:"CLEAR_DATA"
    }
}

export function loadMessage(color,message){
    return{
        type:"CHANGE_MASSAGE",
        message,
        color
    }
}

export function saveUser(saveUserData){
    return{
        type:"USER_SAVED",
        saveUserData
    }
}



export {
    LoginUser,
    LogoutUser,
    RegisterUser
}