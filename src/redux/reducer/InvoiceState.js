const initialState = {
    invoiceList: [],
    invoiceUserList: [],
    invoiceDetails: [],
    invoiceEmployeeData:[],
    genratedInvoiceData:[],
    pdfInvoiceData:[],
    viewPDFInvoiceData:[]
}

const InvoiceState=(state=initialState,action)=>{
    switch (action.type) {
        case "SAVE_INVOICE_LIST":
            return {...state,invoiceList:action.invoiceList}
        case "SAVE_INVOICE_PDF_LIST":
            return {...state,invoiceList:action.invoiceList}
        case "SAVE_INVOICE_USER_LIST":
            return {...state,invoiceUserList:action.invoiceList}
        case "SAVE_INVOICE_EMPLOYEE_DATA":
            return {...state,invoiceEmployeeData:action.invoiceData}
        case "SAVE_INVOICE_CREATE_PDF":
            return {...state,genratedInvoiceData:action.invoiceData}
        case "SAVE_PDF_INVOICE_DATA":
            return {...state,pdfInvoiceData:action.invoiceData}
        case "SAVE_VIEW_INVOICE_PDF":
            return {...state,viewPDFInvoiceData:action.invoiceData}
        default:
            return state;
    }
}

export default InvoiceState;
