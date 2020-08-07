const initialState = {
    invoiceList: [],
    invoiceDetails: [],
    invoiceEmployeeData:[],
    genratedInvoiceData:[]
}

const InvoiceState=(state=initialState,action)=>{
    switch (action.type) {
        case "SAVE_INVOICE_LIST":
            return {...state,invoiceList:action.invoiceList}
        case "SAVE_INVOICE_EMPLOYEE_DATA":
            return {...state,invoiceEmployeeData:action.invoiceData}
        default:
            return state;
    }
}

export default InvoiceState;

