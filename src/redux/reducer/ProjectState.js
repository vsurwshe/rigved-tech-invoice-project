const initialState = {
    projectList: [],
    projectDetails: []
}

const ProjectState = (state = initialState, action) => {
    switch (action.type) {
        case "SAVE_PROJECT_LIST":
            return { ...state, projectList: action.projectList }
        case "SAVE_PROJECT_DATA":
            return { ...state, projectDetails: action.projectData }
        default:
            return state;
    }
}

export default ProjectState;