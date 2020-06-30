import axios from "axios"
import {API_URL} from '../../assets/config/Config';
import { UNAUTHORIZED } from "../../assets/config/CodeMap";

const LoginUser=(userData) =>{
        return (dispatch) => {
            return axios.post(API_URL + "/authentication/signIn", {
                userName: userData.userName,
                password: userData.password
            },{
                "Content-Type":"application/json"
            }).then(response => {
                    console.log(response.headers)
                    if(response.headers.status=== UNAUTHORIZED){
                        dispatch(loadMessage(response.headers.message));
                    }else{
                        dispatch(loadMessage(response.headers.message))
                        dispatch(setAuthrizations(response.data))
                    }
            }).catch(err => {
                    dispatch(loadMessage('danger', 'Something went worng..!'));
            })
        }
}

const LogoutUser=()=>{
    return (dispatch) => {
        dispatch(clearData())
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

export function loadMessage(message){
    return{
        type:"CHANGE_MASSAGE",
        message
    }
}





export {
    LoginUser
}