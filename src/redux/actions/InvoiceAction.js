import {AlertColor} from '../../assets/config/Config';
import { CreateInstance, HeaderConfig } from '../../assets/config/APIConfig';
import { loadMessage } from "../actions/ClientAction";
import { SuccessFunction, ErrorFunction } from "./CommonAction"
import { InvoiceError } from '../../assets/config/ErrorStringFile';

const GetInvoiceUserList = (firstIndex, lastIndex, invoiceId, authroizationKey) => {
    return (dispatch) => {
        return CreateInstance()
            .get('/innvoice/invoiceList/' + firstIndex + '/' + lastIndex+'/'+invoiceId, HeaderConfig(authroizationKey))
            .then(response => { SuccessFunction({ dispatch , "successMethod": SaveInvoiceUserList, "loadMessage":loadMessage, response}) })
            .catch(error => { ErrorFunction({dispatch,"loadMessage":loadMessage, error}) })
    }
}

const GenerateInvoice = (invoiceData, authroizationKey, projectType) => {
    return (dispatch) => {
        return CreateInstance()
            .post('/innvoice/create/',invoiceData,{headers: { 
                'Content-Type': 'application/json',
                Authorization: authroizationKey 
            }})
            .then(response => { 
                switch (response && response.data && response.data.Status) {
                    case "NO_CONTENT":
                        return dispatch(loadMessage(AlertColor.danger, InvoiceError.NO_CONTENT));  
                    case "CONFLICT":
                        return dispatch(loadMessage(AlertColor.danger, InvoiceError.CONFLICT + response.data.fromDate +" to "+response.data.toDate)); 
                    case "INTERNAL_SERVER_ERROR":
                        return dispatch(loadMessage(AlertColor.danger, InvoiceError.INTERNAL_SERVER_ERROR)); 
                    default:
                        switch (projectType) {
                            case "Mile Stone":
                                return SuccessFunction({ dispatch , "successMethod": saveMileStonePreInvoiceData, "loadMessage":loadMessage, response})         
                            default:
                                return "";
                        }
                }
            })
            .catch(error => { ErrorFunction({dispatch,"loadMessage":loadMessage, error}) })
    }
}

const GetPDFInvoiceData = (invoiceId, authroizationKey) => {
    return (dispatch) => {
        return CreateInstance()
            .get('/innvoice/create/'+invoiceId,{headers: { 
                'Content-Type': 'application/json',
                Authorization: authroizationKey 
            }})
            .then(response => { SuccessFunction({ dispatch , "successMethod": SaveInvoiceEmployeeData, "loadMessage":loadMessage, response}) })
            .catch(error => { ErrorFunction({dispatch,"loadMessage":loadMessage, error}) })
    }
}

const GenerateInvoicePDF = (invoiceData, authroizationKey) => {
    return (dispatch) => {
        return CreateInstance()
            .post('/innvoice/createPDF/',invoiceData,{headers: { 
                'Content-Type': 'application/json',
                Authorization: authroizationKey 
            }})
            .then(response => { 
                switch (response && response.data && response.data.Status) {
                    case "NO_CONTENT":
                        return dispatch(loadMessage(AlertColor.danger, InvoiceError.NO_CONTENT));  
                    case "CONFLICT":
                        return dispatch(loadMessage(AlertColor.danger, InvoiceError.CONFLICT + response.data.fromDate +" to "+response.data.toDate)); 
                    case "INTERNAL_SERVER_ERROR":
                        return dispatch(loadMessage(AlertColor.danger, InvoiceError.INTERNAL_SERVER_ERROR));
                    default:
                        return SuccessFunction({ dispatch , "successMethod": SaveGenratedInvoiceData, "loadMessage":loadMessage, response}) 
                }
            })
            .catch(error => { ErrorFunction({dispatch,"loadMessage":loadMessage, error}) })
    }
}

const getPDFInvoiceList=(firstIndex, lastIndex,authroizationKey)=>{
    return (dispatch) => {
        return CreateInstance()
            .get('/innvoice/invoicePDFData/'+firstIndex+'/'+lastIndex,HeaderConfig(authroizationKey))
            .then(response => { SuccessFunction({ dispatch , "successMethod": SavePDFInvoiceList, "loadMessage":loadMessage, response}) })
            .catch(error => { ErrorFunction({dispatch,"loadMessage":loadMessage, error}) })
    }
}

const viewInvoicePDFData = (invoiceId, authroizationKey) => {
    return (dispatch) => {
        return CreateInstance()
            .get('/innvoice/invoicePDFData/'+invoiceId,{headers: { 
                'Content-Type': 'application/json',
                Authorization: authroizationKey 
            }})
            .then(response => { SuccessFunction({ dispatch , "successMethod": SaveInvoiceEmployeeData, "loadMessage":loadMessage, response}) })
            .catch(error => { ErrorFunction({dispatch,"loadMessage":loadMessage, error}) })
    }
}

const payInvoiceBill = (invoiceId, authroizationKey) => {
    return (dispatch) => {
        return CreateInstance()
            .get('/innvoice/invoicePaid/' + invoiceId, HeaderConfig(authroizationKey))
            .then(response => { SuccessFunction({ dispatch , "successMethod": SaveInvoiceUserList, "loadMessage":loadMessage, response}) })
            .catch(error => { ErrorFunction({dispatch,"loadMessage":loadMessage, error}) })
    }
}


//-------------------------------------

export function SaveInvoiceUserList(invoiceList) {
    return {
        type: "SAVE_INVOICE_USER_LIST",
        invoiceList
    }
}

export function SavePDFInvoiceList(invoiceList) {
    return {
        type: "SAVE_INVOICE_PDF_LIST",
        invoiceList
    }
}

export function SaveInvoiceEmployeeData(invoiceData) {
    return {
        type: "SAVE_INVOICE_EMPLOYEE_DATA",
        invoiceData
    }
}

export function SavePDFInvoiceData(invoiceData) {
    return {
        type: "SAVE_PDF_INVOICE_DATA",
        invoiceData
    }
}

export function SaveGenratedInvoiceData(invoiceData) {
    return {
        type: "SAVE_INVOICE_CREATE_PDF",
        invoiceData
    }
}

export function SaveViewInvoicePDFData(invoiceData) {
    return {
        type: "SAVE_VIEW_INVOICE_PDF",
        invoiceData
    }
}

export function SavePaidInvoiceData(invoiceData) {
    return {
        type: "SAVE_PAY_INVOICE_DATA",
        invoiceData
    }
}

export function saveMileStonePreInvoiceData(mileStones) {
    return{
        type: "SAVE_MILESTONE_PRE_INVOICE_DATA",
        mileStones
    }
}

export{
    GetInvoiceUserList,
    GenerateInvoice,
    GenerateInvoicePDF,
    GetPDFInvoiceData,
    viewInvoicePDFData,
    getPDFInvoiceList,
    payInvoiceBill
}
