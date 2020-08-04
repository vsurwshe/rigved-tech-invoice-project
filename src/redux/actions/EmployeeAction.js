import { CreateInstance, HeaderConfig } from '../../assets/config/APIConfig';
import { loadMessage } from "../actions/ClientAction";
import { SuccessFunction, ErrorFunction } from "./CommonAction"

const GetEmployeeListByProjectId = (firstIndex, lastIndex,projectId, authroizationKey) => {
    return (dispatch) => {
        return CreateInstance()
            .get('/project/employeeList/' + firstIndex + '/' + lastIndex+'/'+projectId, HeaderConfig(authroizationKey))
            .then(response => { SuccessFunction({ dispatch , "successMethod": SaveEmployeeListByProjectId, "loadMessage":null,check:true, response, "id":projectId}) })
            .catch(error => { ErrorFunction({dispatch,"loadMessage":loadMessage, error}) })
    }
}

const SaveEmployeeRecord=(userData,authroizationKey)=>{
    return(dispatch)=>{
        return CreateInstance()
        .post('/project/addEmployee/',userData,{headers: { 
            'Content-Type': 'application/json',
            Authorization: authroizationKey 
        }})
        .then(response => { SuccessFunction({ dispatch , "successMethod": SaveEmployeeDetails, "loadMessage":loadMessage, response}) })
        .catch(error => { ErrorFunction({dispatch,"loadMessage":loadMessage, error}) })
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