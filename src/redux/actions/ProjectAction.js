import { AlertColor } from '../../assets/config/Config';
import { CONFLICTSTATUS, STATUS200 } from "../../assets/config/CodeMap";
import { CreateInstance, HeaderConfig } from '../../assets/config/APIConfig';
import { loadMessage } from "../actions/ClientAction";


const GetProjectList = (firstIndex, lastIndex, authroizationKey) => {
    return (dispatch) => {
        return CreateInstance()
            .get('/project/projectList/' + firstIndex + '/' + lastIndex, HeaderConfig(authroizationKey))
            .then(response => {
                if (response.status !== STATUS200) {
                    dispatch(loadMessage(AlertColor.danger, response.headers.message));
                } else {
                    dispatch(SaveProjectList(response.data))
                }
            })
            .catch(error => {
                if (error.response.status.toString() === CONFLICTSTATUS) {
                    dispatch(loadMessage(AlertColor.danger, error.response.headers.message));
                } else {
                    dispatch(loadMessage(AlertColor.danger, 'Something went worng..!'));
                }
            })
    }
}


//-------------------------------

export function SaveProjectList(projectList) {
    return {
        type: "SAVE_PRoJECT_LIST",
        projectList
    }
}



export {
    GetProjectList
}