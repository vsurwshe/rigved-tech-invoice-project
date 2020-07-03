const initialState = {
    listOfClient: [],
    clientDetails: [],
    common_message: "",
    color: "",
}

const ClientState = (state = initialState, action) => {
    switch (action.type) {
        case "SAVE_CLIENT_LIST":
            return { ...state, listOfClient: action.clientList }
        case "CHANGE_MASSAGE":
            return { ...state, common_message: action.message, color: action.color }
        default:
            return state;
    }
}

export default ClientState;