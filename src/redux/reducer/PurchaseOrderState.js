const initialState = {
    purchaseOrderList: [],
    purchaseOrderDetails: []
}

const PurchaseOrderState = (state = initialState, action) => {
    switch (action.type) {
        case "SAVE_PURCHASE_ORDER_LIST":
            return { ...state, purchaseOrderList: action.purchaseOrderList }
        case "SAVE_PURCHASE_ORDER_DATA":
            return { ...state, purchaseOrderDetails: action.purchaseOrderData }
        default:
            return state;
    }
}

export default PurchaseOrderState;