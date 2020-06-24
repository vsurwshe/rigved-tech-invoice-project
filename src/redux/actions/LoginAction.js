import axios from "axios"
import {API_URL} from '../../assets/config/Config';

const LoginUser=(userData) =>{
        return (dispatch) => {
            return axios.post(API_URL + "/authentication/signIn", {
                userName: userData.userName,
                password: userData.password
            }).then(response => {
                    dispatch(loadMessage('success', 'Login Successfull'))
                    dispatch(setAuthrizations(response.data))
            }).catch(err => {
                    dispatch(loadMessage('danger', 'Sorry you are not provied vaild credtional'));
            })
        }
}



export function setAuthrizations(data){
    return{
        type:"SET_ACCOUNT_ID",
        account_id :data.AccountId,
        authorization: data.Authorization 
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