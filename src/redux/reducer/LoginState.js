const initialState = {
    sidebarShow: 'responsive',
    role: "",
    account_id: "",
    authorization: "",
    common_message: "",
    color:"",
    saveUserData: []
  }
  
  const LoginState = (state = initialState, action) => {
    switch (action.type) {
      case 'set':
        return { ...state }
      case 'CLEAR_DATA':
        return initialState;
      case 'USER_LOGIN':
        return { ...state, role: action.role }
      case "SET_ACCOUNT_ID":
        localStorage.setItem('account_id',action.account_id)
        return { ...state, account_id: action.account_id, authorization: action.authorization }
      case "CHANGE_MASSAGE":
        return { ...state, common_message: action.message, color: action.color }
      case "USER_SAVED":
        return {...state, saveUserData: action.saveUserData}
      default:
        return state
    }
  }

  export default LoginState;