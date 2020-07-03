import axios from "axios"
import {API_URL, AlertColor} from '../../assets/config/Config';
import { UNAUTHORIZED, OKSTATUS, CONFLICTSTATUS } from "../../assets/config/CodeMap";


const HeaderConfig=(authroizationKey)=>{

}


const GetClientList=(firstIndex, lastIndex,authroizationKey)=>{
    return(dispatch)=>{

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