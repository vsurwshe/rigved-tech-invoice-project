import { AlertColor, API_URL } from '../../assets/config/Config';
import { CONFLICTSTATUS, STATUS200 } from "../../assets/config/CodeMap";
import { CreateInstance } from '../../assets/config/APIConfig';
import { loadMessage } from "../actions/ClientAction";

const SaveFileDetails = (fileData, authroizationKey) => {
    return (dispatch) => {
        return CreateInstance()
            .post('/file/upload/', fileData, {
                headers: {
                    'Content-Type': 'application/json',
                    Authorization: authroizationKey
                }
            })
            .then(response => {
                if (response.status !== STATUS200) {
                    dispatch(loadMessage(AlertColor.danger, response.headers.message));
                } else {
                    dispatch(SaveFileData(response.data))
                }
            })
            .catch(error => {
                if (error && error.response && error.response.status.toString() === CONFLICTSTATUS) {
                    dispatch(loadMessage(AlertColor.danger, error.response.headers.message));
                } else {
                    dispatch(loadMessage(AlertColor.danger, 'Something went worng..!'));
                }
            })
    }
}

const FetchPhoto = (fileUrl,authroizationKey,clientId) => {
    return (dispatch) => {
        return fetch(API_URL+'/file/getFile/'+fileUrl, {
            headers: {
                "content-type": "application/json",
                Authorization: authroizationKey
            }
        })
        .then((response) => {return response.blob();})
        .then((myBlob) => {
            let ImageUrl= URL.createObjectURL(myBlob);
            dispatch(SaveFile(ImageUrl,fileUrl,clientId))
        })
        .catch(error => { return error.message })
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