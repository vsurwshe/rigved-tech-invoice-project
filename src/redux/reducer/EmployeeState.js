const initialState = {
    employeeListByPojectId: [],
    employeeListByRateCardId: [],
    employeeDetails:[]
}

const EmployeeState=(state=initialState,action)=>{
    switch (action.type) {
        case "SAVE_EMPOLYEE_BY_PROJECT_ID":
            return {...state, employeeListByPojectId: action.employeeList}
        case "SAVE_EMPOLYEE_BY_RATECARD_ID":
            return {...state, employeeListByRateCardId: action.employeeList}
    
        default:
            return state;
    }
}

export default EmployeeState;
