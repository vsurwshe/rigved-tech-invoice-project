const initialState = {
    invoiceList: [],
    invoiceDetails: []
}

const InvoiceState=(state=initialState,action)=>{
    switch (action.type) {
        case "SAVE_INVOICE_LIST":
            return {...state,invoiceList:action.invoiceList}
        default:
            return state;
    }
}

export default InvoiceState;

