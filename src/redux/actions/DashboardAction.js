import { CreateInstance, HeaderConfig } from '../../assets/config/APIConfig';
import { loadMessage } from "../actions/ClientAction";
import { SuccessFunction, ErrorFunction } from "./CommonAction"

const GetBillingData=(authroizationKey)=>{
    return (dispatch) => {
        return CreateInstance()
        .get('/invoice/invoiceList/', HeaderConfig(authroizationKey))
        .then(response => { SuccessFunction({ dispatch , "successMethod": SaveBillingData, "loadMessage":loadMessage, response}) })
        .catch(error => { ErrorFunction({dispatch,"loadMessage":loadMessage, error}) })
    }
}

const GetResourceData=(authroizationKey)=>{
    return (dispatch) => {
        return CreateInstance()
        .get('/invoice/invoiceList/', HeaderConfig(authroizationKey))
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

export function SaveResourceData(ResourceData){
    return{
        type:"SAVE_DASHBOARD_RESOURCE_DATA",
        ResourceData
    }
}

export {
    GetBillingData,
    GetResourceData
}
