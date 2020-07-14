const initialState = {
    SkillSet: [],
    SkillCategory: [],
    Domains: []
}



const MasterDataState = (state = initialState, action) => {
    switch (action.type) {
        case "SAVE_SKILL_SET":
            return { ...state, SkillSet: action.SkillSet }
        case "SAVE_SKILL_CATEGORY_SET":
            return { ...state, SkillCategory: action.SkillCategory }
        case "SAVE_DOMAIN_SET":
            return { ...state, Domains: action.Domains }
        default:
            return state
    }
}

export default MasterDataState;