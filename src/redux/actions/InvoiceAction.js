import {AlertColor} from '../../assets/config/Config';
import { CreateInstance, HeaderConfig } from '../../assets/config/APIConfig';
import { loadMessage } from "../actions/ClientAction";
import { SuccessFunction, ErrorFunction } from "./CommonAction"
import { InvoiceError } from '../../assets/config/ErrorStringFile';

const GetInvoiceList = (firstIndex, lastIndex, authroizationKey) => {
    return (dispatch) => {
        return CreateInstance()
            .get('/invoice/invoiceList/' + firstIndex + '/' + lastIndex, HeaderConfig(authroizationKey))
            .then(response => { SuccessFunction({ dispatch , "successMethod": SaveInvoiceList, "loadMessage":loadMessage, response}) })
            .catch(error => { ErrorFunction({dispatch,"loadMessage":loadMessage, error}) })
    }
}

const GenerateInvoice = (invoiceData, authroizationKey) => {
    return (dispatch) => {
        return CreateInstance()
            .post('/innvoice/create/',invoiceData,{headers: { 
                'Content-Type': 'application/json',
                Authorization: authroizationKey 
            }})
            .then(response => { 
                console.log("Response", response)
                switch (response && response.data && response.data.Status) {
                    case "NO_CONTENT":
                        return dispatch(loadMessage(AlertColor.danger, InvoiceError.NO_CONTENT));  
                    case "CONFLICT":
                        return dispatch(loadMessage(AlertColor.danger, InvoiceError.CONFLICT + response.data.fromDate +" to "+response.data.toDate)); 
                    default:
                        return SuccessFunction({ dispatch , "successMethod": SaveInvoiceEmployeeData, "loadMessage":loadMessage, response}) 
                }
                
            })
            .catch(error => { ErrorFunction({dispatch,"loadMessage":loadMessage, error}) })
    }
}

//-------------------------------------

export function SaveInvoiceList(invoiceList) {
    return {
        type: "SAVE_INVOICE_LIST",
        invoiceList
    }
}

export function SaveInvoiceEmployeeData(invoiceData) {
    return {
        type: "SAVE_INVOICE_EMPLOYEE_DATA",
        invoiceData
    }
}


export{
    GetInvoiceList,
    GenerateInvoice
}