const initialState={
    purchaseOrderList:[],
    purchaseOrderDetails:[]
}

const PurchaseOrderState = (state = initialState, action) => {
    switch (action.type) {
        case "SAVE_PURCHASE_ORDER_LIST":
            return {...state, purchaseOrderList: action.purchaseOrderList}
        default:
            return state;
    }
}

export default PurchaseOrderState;