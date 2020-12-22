const initalState={
    listOfBillingModel:[ 
        {title:"Milestone",id:1}, 
        {title:"Fixedamount",id:2}, 
        {title:"Payable days",id:3}, 
        {title:"Data provided by client",id:4} 
    ],
    milestoneData:[]
}
const BillingStateModel=(state=initalState,action)=>{
    switch (action && action.type) {
        case "SAVE_MILESTONE":
            return {...state, milestoneData: action.milestoneData }
        default:
            return state;
    }
}

export default BillingStateModel;