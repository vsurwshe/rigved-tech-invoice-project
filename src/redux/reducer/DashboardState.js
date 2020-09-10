const initialState = {
    clientSerise: [],
    employeeClientSerise: [],
    projectSerise: [],
    billSerise:[
        {name:"Billed", value:"billed"},
        {name:"Revenue", value:"unbilled"}
    ],
    resourceSerise:[
        {name:"Hired", value:"hired"},
        {name:"Left", value:"left"}
    ],
    clientBillingData: [],
    clientEmployeeData:[],
    billedData:[
        { xaxis: 'Feb', billed:1000,  unbilled: 3000 },
        { xaxis: 'March', billed: 2000, unbilled: 1200 },
        { xaxis: 'April', billed: 2200, unbilled: 2400 }, 
        { xaxis: 'May', billed: 1500, unbilled: 1100 }, 
        { xaxis: 'Jun', billed: 6300, unbilled: 1200 }
    ],
    resourceData:[],
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
            let tempClientBillingData = (action.BillingData) && action.BillingData.clientData.map((item,key)=>{ return {...item, "xaxis": months[item.xaxis]} })
            return {...state, clientSerise: tempClientSerise, clientBillingData : tempClientBillingData }
        case "SAVE_DASHBOARD_EMPLOYEE_DATA":
            let tempClientEmployeeSerise = (action.EmployeeData) && action.EmployeeData.clientId
            let tempClientEmployeeData = (action.EmployeeData) && action.EmployeeData.clientData.map((item,key)=>{ return {...item, "xaxis": months[item.xaxis]} })
            return {...state, employeeClientSerise: tempClientEmployeeSerise, clientEmployeeData : tempClientEmployeeData }
        case "SAVE_DASHBOARD_RESOURCE_DATA":
            let tempResourceData = (action.ResourceData) && action.ResourceData.map((item,key)=>{ return {...item, "xaxis": months[item.xaxis]} })
            return {...state, resourceData: tempResourceData }
        default:
            return state;
    }
}

// this is month name array
var months = ['', 'JANUARY', 'FEBRUARY', 'MARCH', 'APRIL', 'MAY', 'JUNE', 'JULY', 'AUGUST', 'SEPTEMBER', 'OCTOBER', 'NOVEMBER', 'DECEMBER'];

export default DashboardState;