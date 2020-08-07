import { CreateInstance, HeaderConfig } from '../../assets/config/APIConfig';
import { loadMessage } from "../actions/ClientAction";
import { SuccessFunction, ErrorFunction } from "./CommonAction"

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
            .then(response => { SuccessFunction({ dispatch , "successMethod": SaveInvoiceList, "loadMessage":loadMessage, response}) })
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

export function SaveGenratedInvoiceData(invoiceData) {
    return {
        type: "SAVE_INVOICE_DATA",
        invoiceData
    }
}


export{
    GetInvoiceList,
    GenerateInvoice
}