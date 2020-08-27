import {AlertColor} from '../../assets/config/Config';
import { CreateInstance, HeaderConfig } from '../../assets/config/APIConfig';
import { loadMessage } from "../actions/ClientAction";
import { SuccessFunction, ErrorFunction } from "./CommonAction"

const GetBillingData=(authroizationKey)=>{
    return (dispatch) => {
        return CreateInstance().
        get('/invoice/invoiceList/' + firstIndex + '/' + lastIndex, HeaderConfig(authroizationKey))
        .then(response => { SuccessFunction({ dispatch , "successMethod": SaveBillingData, "loadMessage":loadMessage, response}) })
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

export {
    GetBillingData
}
