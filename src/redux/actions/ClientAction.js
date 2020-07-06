import {API_URL, AlertColor} from '../../assets/config/Config';
import { OKSTATUS, CONFLICTSTATUS } from "../../assets/config/CodeMap";
import Axios from "axios";


const HeaderConfig=(authroizationKey,userData)=>{
    return{
        data:userData ? userData : {},
        headers: { 
            'Content-Type': 'application/json',
            Authorization: authroizationKey 
        }
    }
}


const GetClientList=(firstIndex, lastIndex,authroizationKey)=>{
    return(dispatch)=>{
        return createInstance()
            .get('/client/clientList/'+firstIndex+'/'+lastIndex,HeaderConfig(authroizationKey))
            .then(response => {
                if(response.data.status !== OKSTATUS){
                    dispatch(loadMessage(AlertColor.danger ,response.headers.message));
                }else{
                    dispatch(loadMessage(AlertColor.success,response.headers.message))
                    dispatch(SaveClientList(response.data))
                }
            })
            .catch(error => { 
                if(error.response.status.toString() === CONFLICTSTATUS){
                    dispatch(loadMessage(AlertColor.danger, error.response.headers.message));
                }else{
                    dispatch(loadMessage(AlertColor.danger, 'Something went worng..!'));
                }
            })
    }
}

const SaveClient=(userData,authroizationKey)=>{
    return(dispatch)=>{

    }
}

const GetClientDetailsById=(clientId, authroizationKey)=>{
    return(dispatch)=>{

    }
}


function createInstance() {
    let instance = Axios.create({
      baseURL: API_URL,
    });
    return instance;
}


//------------------------------------

export function SaveClientList(clientList){
    return{
        type: "SAVE_CLIENT_LIST",
        clientList
    }
}


export function SaveClientDetails(clientDetails){
    return{
        type: "SAVE_CLIENT_DETAILS",
        clientDetails
    }
}


export function loadMessage(color,message){
    return{
        type:"CHANGE_MASSAGE",
        message,
        color
    }
}




export{
    GetClientList,
    SaveClient,
    GetClientDetailsById

}

