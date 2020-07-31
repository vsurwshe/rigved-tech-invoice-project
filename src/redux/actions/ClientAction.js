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
                    dispatch(SaveClientList(response.data))
                }
            })
            .catch(error => { 
                if(error && error.response && error.response.status.toString() === CONFLICTSTATUS){
                    dispatch(loadMessage(AlertColor.danger, error.response.headers.message));
                }else{
                    dispatch(loadMessage(AlertColor.danger, 'Something went worng..!'));
                }
            })
    }
}

const SaveClientData=(userData,authroizationKey)=>{
    return(dispatch)=>{
        return CreateInstance()
        .post('/client/create/',userData,{headers: { 
            'Content-Type': 'application/json',
            Authorization: authroizationKey 
        }})
        .then(response => {
            if(response.status !== STATUS200){
                dispatch(loadMessage(AlertColor.danger ,response.headers.message));
            }else{
                dispatch(loadMessage(AlertColor.success,response.headers.message))
                dispatch(SaveClientList(userData))
            }
        })
        .catch(error => { 
            if(error && error.response && error.response.status.toString() === CONFLICTSTATUS){
                dispatch(loadMessage(AlertColor.danger, error.response.headers.message));
            }else{
                dispatch(loadMessage(AlertColor.danger, 'Something went worng..!'));
            }
        })
    }
}

const GetClientDetailsById=(clientId, authroizationKey)=>{
    return(dispatch)=>{
        return CreateInstance()
            .get('/client/read/'+clientId,HeaderConfig(authroizationKey))
            .then(response => {
                if(response.status !== STATUS200){
                    dispatch(loadMessage(AlertColor.danger ,response.headers.message));
                }else{
                    dispatch(SaveClientDetailsById(response.data))
                }
            })
            .catch(error => { 
                if(error && error.response && error.response.status.toString() === CONFLICTSTATUS){
                    dispatch(loadMessage(AlertColor.danger, error.response.headers.message));
                }else{
                    dispatch(loadMessage(AlertColor.danger, 'Something went worng..!'));
                }
        })
    }
}

const DeleteClient=(clientId, authroizationKey)=>{
    return(dispatch)=>{
        return CreateInstance()
        .get('/client/delete/'+clientId,HeaderConfig(authroizationKey))
        .then(response => {
            if(response.status !== STATUS200){
                dispatch(loadMessage(AlertColor.danger ,response.headers.message));
            }else{
                dispatch(DeleteClientDetails(response.data))
        }})
        .catch(error => { 
            if(error && error.response && error.response.status.toString() === CONFLICTSTATUS){
                dispatch(loadMessage(AlertColor.danger, error.response.headers.message));
            }else{
                dispatch(loadMessage(AlertColor.danger, 'Something went worng..!'));
        }})
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

export function SaveClientDetailsById(clientDetails){
    return{
        type: "SAVE_CLIENT_DETAILS_BY_ID",
        clientDetails
    }
}

export function DeleteClientDetails(clientDetails){
    return{
        type: "DELETE_CLIENT_DETAILS",
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
    SaveClientData,
    GetClientDetailsById,
    DeleteClient
}

