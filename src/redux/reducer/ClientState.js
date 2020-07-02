const initialState = {
    listOfClient:[],
    clientDetails:[]
}

const ClientState = (state = initialState, action) => {
    switch (action.type) {
        case "SAVE_CLIENT_LIST":
            return{...state, listOfClient: action.clientData}
        
        default:
            return state;
    }
}

export default ClientState;