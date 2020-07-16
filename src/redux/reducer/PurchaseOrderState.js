const initialState={
    purchaseOrderList:[],
    purchaseOrderDetails:[],
    common_message:"",
    color:""
}

const PurchaseOrderState = (state = initialState, action) => {
    switch (action.type) {
        case "SAVE_PURCHASE_ORDER_LIST":
            return {...state, purchaseOrderList: action.purchaseOrderList}
        case "CHANGE_MASSAGE":
            return { ...state, common_message: action.message, color: action.color }
        default:
            return state;
    }
}

export default PurchaseOrderState;