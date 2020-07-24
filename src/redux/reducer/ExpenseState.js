const initialState = {
    expensesList: [],
    expenseDetails: []
}

const ExpenseState=(state= initialState,action)=>{
    switch (action.type) {
        case "SAVE_EXPENSES_LIST":
            return {...state, expensesList: action.expensesList}
        case "SAVE_EXPENSE_RECORD":
            return {...state, expenseDetails: action.expenseData}
        default:
            return state;
    }
}

export default ExpenseState;