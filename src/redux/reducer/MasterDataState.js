const initialState = {
    SkillSet: [],
    SkillCategory: [],
    Domains: [],
    ManagerList: []
}

// this is master data state 
const MasterDataState = (state = initialState, action) => {
    switch (action.type) {
        case "SAVE_SKILL_SET":
            return { ...state, SkillSet: action.SkillSet }
        case "SAVE_SKILL_CATEGORY_SET":
            return { ...state, SkillCategory: action.SkillCategory }
        case "SAVE_DOMAIN_SET":
            return { ...state, Domains: action.Domains }
        case "SAVE_MANAGER_LIST":
            return { ...state, ManagerList: action.ManagerList }
        default:
            return state
    }
}

export default MasterDataState;