const initialState = {
    clientSerise: [
        {name:"Client 1", value:"client1"},
        {name:"Client 2", value:"client2"},
        {name:"Client 3", value:"client3"},
        {name:"Client 4", value:"client4"}
    ],
    projectSerise: [],
    billSerise:[
        {name:"Billed", value:"billed"},
        {name:"Revenue", value:"unbilled"}
    ],
    resourceSerise:[
        {name:"Hired", value:"hired"},
        {name:"Left", value:"left"}
    ],
    clientBillingData: [
        { xaxis: 'Feb', client1:74.2,  client2: 308.6,  client3: 35.1,  client4: 956.9},
        { xaxis: 'March', client1: 40,   client2: 128.5, client3: 361.8, client4: 105 },
        { xaxis: 'April', client1: 22.6,  client2: 241.5,  client3: 64.9,  client4: 120.8}, 
        { xaxis: 'May', client1: 19,  client2: 119.3,  client3: 28.9,  client4: 204.8}, 
        { xaxis: 'Jun', client1: 6.1,  client2: 123.6, client3: 77.3, client4: 85.7 }
    ],
    clientEmployeeData:[
        { xaxis: 'Feb', client1:10,  client2: 30,  client3: 20,  client4: 10},
        { xaxis: 'March', client1: 20,   client2: 12, client3: 20, client4: 15 },
        { xaxis: 'April', client1: 22,  client2: 24,  client3: 10,  client4: 12}, 
        { xaxis: 'May', client1: 15,  client2: 11,  client3: 28,  client4: 20}, 
        { xaxis: 'Jun', client1: 6.1,  client2: 12, client3: 20, client4: 15 }
    ],
    billedData:[
        { xaxis: 'Feb', billed:1000,  unbilled: 3000 },
        { xaxis: 'March', billed: 2000, unbilled: 1200 },
        { xaxis: 'April', billed: 2200, unbilled: 2400 }, 
        { xaxis: 'May', billed: 1500, unbilled: 1100 }, 
        { xaxis: 'Jun', billed: 6300, unbilled: 1200 }
    ],
    resourceData:[
        { xaxis: 'Feb', hired:10,  left: 30 },
        { xaxis: 'March', hired: 20,   left: 12 },
        { xaxis: 'April', hired: 22,  left: 24 }, 
        { xaxis: 'May', hired: 15,  left: 11 }, 
        { xaxis: 'Jun', hired: 6.1,  left: 12 }
    ],
    clientRevenueData:[
        { field:"Client 1", value:20},
        { field:"Client 2", value:30},
        { field:"Client 3", value:43},
        { field:"Client 4", value:17}
    ],
    projectRevenueData:[
        { field:"Project 1", value:20, name:"Project 1"},
        { field:"Project 2", value:30, name:"Project 2"},
        { field:"Project 3", value:43, name:"Project 3"},
        { field:"Project 4", value:17, name:"Project 4"}
    ],
    purchaseOrderRevenueData:[
        { field:"PO 1", value:20},
        { field:"PO 2", value:30},
        { field:"PO 3", value:43},
        { field:"PO 4", value:17}
    ]
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