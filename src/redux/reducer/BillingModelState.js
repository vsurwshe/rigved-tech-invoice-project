const initalState={
    listOfBillingModel:[ 
        {title:"Milestone",id:1}, 
        {title:"Fiexd Cost",id:2}, 
        {title:"Payables",id:3}, 
        {title:"Free Style",id:4} 
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