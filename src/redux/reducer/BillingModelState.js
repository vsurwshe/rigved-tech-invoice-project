const initalState={
    mileStoneList:[],
    milestoneData:[],
    mileStoneListProjectId:[],
    fixedTypeList:[],
    fixedTypeListProjectId:[],
    fixedTypeData:[],
    payablesDayList:[],
    payablesDayListProjectId:[],
    payablesDayData:[]
}
const BillingStateModel=(state=initalState,action)=>{
    switch (action && action.type) {
        case "SAVE_MILE_STONE_LIST":
            return {...state, mileStoneList: action.mileStoneList }
        case "SAVE_MILE_STONE_LIST_PROJECT_ID":
            return {...state, mileStoneListProjectId: (action.mileStoneList && action.mileStoneList.Status) ?[]:action.mileStoneList}
        case "SAVE_MILE_STONE_DATA":
            return {...state, milestoneData: action.mileStoneData }
        case "UPDATE_MILE_STONE_DATA":
            return {...state, milestoneData: action.mileStoneData }
        case "SAVE_FIXED_TYPE_LIST":
            return {...state, fixedTypeList: action.fixedTypeList }
        case "SAVE_FIXED_TYPE_LIST_PROJECT_ID":
            return {...state, fixedTypeListProjectId: action.fixedTypeList }
        case "SAVE_FIXED_TYPE_DATA":
            return {...state, fixedTypeData: action.fixedTypeData }
        case "SAVE_PAYABLES_DAYS_TYPE_DATA":
            return {...state, payablesDayData: action.payablesDayData }
        case "SAVE_PAYABLE_DAYS_PROJECT_ID":
            return {...state, payablesDayListProjectId: action.payableDaysList }
        default:
            return state;
    }
}

export default BillingStateModel;