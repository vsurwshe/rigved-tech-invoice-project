import {AlertColor} from '../../assets/config/Config';
import {CONFLICTSTATUS, STATUS200 } from "../../assets/config/CodeMap";
import { CreateInstance, HeaderConfig } from '../../assets/config/APIConfig';

const GetClientList=(firstIndex, lastIndex,authroizationKey)=>{
    return(dispatch)=>{
        return CreateInstance()
            .get('/client/clientList/'+firstIndex+'/'+lastIndex,HeaderConfig(authroizationKey))
            .then(response => {
                if(response.status !== STATUS200){
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
        return CreateInstance()
        .post('/client/create/',userData,HeaderConfig(authroizationKey,userData))
        .then(response => {
            if(response.status !== STATUS200){
                dispatch(loadMessage(AlertColor.danger ,response.headers.message));
            }else{
                dispatch(loadMessage(AlertColor.success,response.headers.message))
                dispatch(SaveClientList(userData))
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

const GetClientDetailsById=(clientId, authroizationKey)=>{
    return(dispatch)=>{

    }
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

