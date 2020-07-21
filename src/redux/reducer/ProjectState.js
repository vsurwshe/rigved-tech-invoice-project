const initialState = {
    projectList: [],
    projectDetails: []
}

const ProjectState = (state = initialState, action) => {
    switch (action.type) {
        case "SAVE_PRoJECT_LIST":
            return { ...state, projectList: action.projectList }
        default:
            return state;
    }
}

export default ProjectState;