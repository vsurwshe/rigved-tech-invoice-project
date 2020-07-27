const initialState = {
    expensesList: [],
    expensesListByProjectId:[],
    expenseDetails: []
}

const ExpenseState=(state= initialState,action)=>{
    switch (action.type) {
        case "SAVE_EXPENSES_LIST":
            return {...state, expensesList: action.expensesList}
        case "SAVE_EXPENSE_RECORD":
            return {...state, expenseDetails: action.expenseData}
        case "SAVE_EXPENSES_LIST_BY_PROJECT_ID":
            let newExpensesListByProjectId =state.expensesListByProjectId.filter(item=> item.projectId !== action.projectId); 
            return {...state, expensesListByProjectId: [...newExpensesListByProjectId,{"List":action.expenseList,"projectId": action.projectId}]}
        default:
            return state;
    }
}

export default ExpenseState;