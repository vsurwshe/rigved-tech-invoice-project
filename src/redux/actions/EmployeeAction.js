import { AlertColor } from '../../assets/config/Config';
import { CONFLICTSTATUS, STATUS200 } from "../../assets/config/CodeMap";
import { CreateInstance, HeaderConfig } from '../../assets/config/APIConfig';
import { loadMessage } from "../actions/ClientAction";


const GetEmployeeListByProjectId = (firstIndex, lastIndex,projectId, authroizationKey) => {
    return (dispatch) => {
        return CreateInstance()
            .get('/project/employeeList/' + firstIndex + '/' + lastIndex+'/'+projectId, HeaderConfig(authroizationKey))
            .then(response => {
                if (response.status !== STATUS200) {
                    dispatch(loadMessage(AlertColor.danger, response.headers.message));
                } else {
                    dispatch(SaveEmployeeListByProjectId(response.data,projectId))
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

const SaveEmployeeRecord=(userData,authroizationKey)=>{
    return(dispatch)=>{
        return CreateInstance()
        .post('/project/addEmployee/',userData,{headers: { 
            'Content-Type': 'application/json',
            Authorization: authroizationKey 
        }})
        .then(response => {
            if(response.status !== STATUS200){
                dispatch(loadMessage(AlertColor.danger ,response.headers.message));
            }else{
                dispatch(SaveEmployeeDetails(response.data))
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


//------------------------------
export function SaveEmployeeListByProjectId(employeeList,projectId){
    return {
        type:"SAVE_EMPOLYEE_BY_PROJECT_ID",
        employeeList,
        projectId
    }
}

export function SaveEmployeeDetails(employeeDetails){
    return {
        type:"SAVE_EMPLOYEE_DETAILS",
        employeeDetails
    }
}

export{
    GetEmployeeListByProjectId,
    SaveEmployeeRecord   
}