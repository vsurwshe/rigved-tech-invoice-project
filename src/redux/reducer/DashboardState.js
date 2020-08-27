const initialState = {
    clientSerise: [],
    projectSerise: [],
    billSerise:[],
    resourceSerise:[],
    clientBillingData: [],
    clientEmployeeData:[],
    billedData:[],
    resourceData:[],
    clientRevenueData:[],
    projectRevenueData:[],
    purchaseOrderRevenueData:[]
}

const DashboardState=(state = initialState, action)=>{
    switch (action.type) {
        case "SAVE_DASHBOARD_BILLING_DATA":
            let tempClientSerise = (action.BillingData) && action.BillingData.clientId
            let tempClientBillingData = (action.BillingData) && action.BillingData.clientData
            return {...state, clientSerise: tempClientSerise, clientEmployeeData : tempClientBillingData }
        default:
            return state;
    }
}

export default DashboardState;