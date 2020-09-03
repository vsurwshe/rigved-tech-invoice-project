import { CreateInstance } from '../../assets/config/APIConfig';
import { loadMessage } from "../actions/ClientAction";
import { SuccessFunction, ErrorFunction } from "./CommonAction"

const GetBillingData=(authroizationKey, filterData)=>{
    return (dispatch) => {
        return CreateInstance()
        .post('/dashboard/billngDetailByClint/',filterData,{headers: { 
            'Content-Type': 'application/json',
            Authorization: authroizationKey 
        }})
        .then(response => { SuccessFunction({ dispatch , "successMethod": SaveBillingData, "loadMessage":loadMessage, response}) })
        .catch(error => { ErrorFunction({dispatch,"loadMessage":loadMessage, error}) })
    }
}

const GetEmployeeData=(authroizationKey, filterData)=>{
    return (dispatch) => {
        return CreateInstance()
        .post('/dashboard/employeeDetail/',filterData,{headers: { 
            'Content-Type': 'application/json',
            Authorization: authroizationKey 
        }})
        .then(response => { SuccessFunction({ dispatch , "successMethod": SaveEmployeeData, "loadMessage":loadMessage, response}) })
        .catch(error => { ErrorFunction({dispatch,"loadMessage":loadMessage, error}) })
    }
}

const GetResourceData=(authroizationKey,filterData)=>{
    return (dispatch) => {
        return CreateInstance()
        .post('/dashboard/employeeDetail123/',filterData,{headers: { 
            'Content-Type': 'application/json',
            Authorization: authroizationKey 
        }})
        .then(response => { SuccessFunction({ dispatch , "successMethod": SaveResourceData, "loadMessage":loadMessage, response}) })
        .catch(error => { ErrorFunction({dispatch,"loadMessage":loadMessage, error}) })
    }
}


//-------------------------------

export function SaveBillingData(BillingData){
    return{
        type:"SAVE_DASHBOARD_BILLING_DATA",
        BillingData
    }
}

export function SaveEmployeeData(EmployeeData){
    return{
        type:"SAVE_DASHBOARD_EMPLOYEE_DATA",
        EmployeeData
    }
}

export function SaveResourceData(ResourceData){
    return{
        type:"SAVE_DASHBOARD_RESOURCE_DATA",
        ResourceData
    }
}

export {
    GetBillingData,
    GetResourceData,
    GetEmployeeData
}
