import { API_URL } from '../../assets/config/Config';
import { CreateInstance } from '../../assets/config/APIConfig';
import { loadMessage } from "../actions/ClientAction";
import { SuccessFunction, ErrorFunction } from "./CommonAction"

const SaveFileDetails = (fileData, authroizationKey) => {
    return (dispatch) => {
        return CreateInstance()
            .post('/file/upload/', fileData, {
                headers: {
                    'Content-Type': 'application/json',
                    Authorization: authroizationKey
                }
            })
            .then(response => { SuccessFunction({ dispatch , "successMethod": SaveFileData, "loadMessage":loadMessage, response}) })
            .catch(error => { ErrorFunction({dispatch,"loadMessage":loadMessage, error}) })
    }
}

const FetchPhoto = (fileUrl,authroizationKey,clientId,fileType) => {
    return (dispatch) => {
        return fetch(API_URL+'/file/getFile/'+fileUrl, {
            headers: {
                "content-type": "application/json",
                Authorization: authroizationKey
            }
        })
        .then((response) => {return response.blob();})
        .then((myBlob) => {
            const file = fileType && new Blob([myBlob], {type: 'application/pdf'});
            let ImageUrl= fileType ? URL.createObjectURL(file) :  URL.createObjectURL(myBlob)
            dispatch(SaveFile(ImageUrl,fileUrl,clientId))
        })
        .catch(error => { ErrorFunction({dispatch,"loadMessage":loadMessage, error}) })
    } 
}
//-----------------------------------

export function SaveFileData(fileData) {
    return {
        type: "SAVE_FILE_DATA",
        fileData
    }
}

export function SaveFile(fileData, fileName,clientId) {
    return {
        type: "SAVE_FILES",
        payload : {"fileData":fileData, "fileName" :fileName, "cid" :clientId}
    }
}

export {
    SaveFileDetails,
    FetchPhoto
}