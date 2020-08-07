const initialState = {
    invoiceList: [],
    invoiceDetails: [],
    genratedInvoiceData:[]
}

const InvoiceState=(state=initialState,action)=>{
    switch (action.type) {
        case "SAVE_INVOICE_LIST":
            return {...state,invoiceList:action.invoiceList}
        case "SAVE_INVOICE_DATA":
            return {...state,genratedInvoiceData:action.invoiceData}
        default:
            return state;
    }
}

export default InvoiceState;

