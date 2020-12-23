const initalState={
    mileStoneList:[],
    milestoneData:[]
}
const BillingStateModel=(state=initalState,action)=>{
    switch (action && action.type) {
        case "SAVE_MILE_STONE_LIST":
            return {...state, mileStoneList: action.mileStoneList }
        case "SAVE_MILE_STONE_DATA":
            return {...state, milestoneData: action.mileStoneData }
        default:
            return state;
    }
}

export default BillingStateModel;