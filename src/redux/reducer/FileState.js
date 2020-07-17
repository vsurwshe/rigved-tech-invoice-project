const initialState = {
    listOfFiles: [],
    fileUrl: ""
}

const FileState = (state = initialState, action) => {
    switch (action.type) {
        case "SAVE_FILE_DATA":
            return { ...state, fileUrl: action.fileData }
        default:
            return state;
    }

}

export default FileState;