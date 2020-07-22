import {AlertColor} from '../../assets/config/Config';
import {CONFLICTSTATUS, STATUS200 } from "../../assets/config/CodeMap";
import { CreateInstance, HeaderConfig } from '../../assets/config/APIConfig';

const GetSkillSet=(firstIndex, lastIndex,authroizationKey)=>{
    return(dispatch)=>{
        return CreateInstance()
            .get('/masterdata/SkillSet/'+firstIndex+'/'+lastIndex,HeaderConfig(authroizationKey))
            .then(response => {
                if(response.status !== STATUS200){
                    dispatch(loadMessage(AlertColor.danger ,response.headers.message));
                }else{
                    dispatch(saveSkillSet(response.data))
                }
            })
            .catch(error => { 
                if(error.response.status.toString() === CONFLICTSTATUS){
                    dispatch(loadMessage(AlertColor.danger, error.response.headers.message));
                }else{
                    dispatch(loadMessage(AlertColor.danger, 'Something went worng..!'));
                }
            })
    }
}


const GetSkillCategory=(firstIndex, lastIndex,authroizationKey)=>{
    return(dispatch)=>{
        return CreateInstance()
            .get('/masterdata/SkillCategory/'+firstIndex+'/'+lastIndex,HeaderConfig(authroizationKey))
            .then(response => {
                if(response.status !== STATUS200){
                    dispatch(loadMessage(AlertColor.danger ,response.headers.message));
                }else{
                    dispatch(saveSkillCategory(response.data))
                }
            })
            .catch(error => { 
                if(error.response.status.toString() === CONFLICTSTATUS){
                    dispatch(loadMessage(AlertColor.danger, error.response.headers.message));
                }else{
                    dispatch(loadMessage(AlertColor.danger, 'Something went worng..!'));
                }
            })
    }
}


const GetDomains=(firstIndex, lastIndex,authroizationKey)=>{
    return(dispatch)=>{
        return CreateInstance()
            .get('/masterdata/Domain/'+firstIndex+'/'+lastIndex,HeaderConfig(authroizationKey))
            .then(response => {
                if(response.status !== STATUS200){
                    dispatch(loadMessage(AlertColor.danger ,response.headers.message));
                }else{
                    dispatch(saveDomain(response.data))
                }
            })
            .catch(error => { 
                if(error.response.status.toString() === CONFLICTSTATUS){
                    dispatch(loadMessage(AlertColor.danger, error.response.headers.message));
                }else{
                    dispatch(loadMessage(AlertColor.danger, 'Something went worng..!'));
                }
            })
    }
}

const GetManagerList=(firstIndex, lastIndex,authroizationKey)=>{
    return(dispatch)=>{
        return CreateInstance()
            .get('/masterdata/searchProjectMang/'+firstIndex+'/'+lastIndex,HeaderConfig(authroizationKey))
            .then(response => {
                if(response.status !== STATUS200){
                    dispatch(loadMessage(AlertColor.danger ,response.headers.message));
                }else{
                    dispatch(saveManagerList(response.data))
                }
            })
            .catch(error => { 
                if(error.response.status.toString() === CONFLICTSTATUS){
                    dispatch(loadMessage(AlertColor.danger, error.response.headers.message));
                }else{
                    dispatch(loadMessage(AlertColor.danger, 'Something went worng..!'));
                }
            })
    }
}


//----------------------------------

export function saveSkillSet(SkillSet){
    return {
        type:"SAVE_SKILL_SET",
        SkillSet
    }
}

export function saveSkillCategory(SkillCategory){
    return {
        type:"SAVE_SKILL_CATEGORY_SET",
        SkillCategory
    }
}

export function saveDomain(Domains){
    return {
        type:"SAVE_DOMAIN_SET",
        Domains
    }
}

export function saveManagerList(ManagerList){
    return {
        type:"SAVE_MANAGER_LIST",
        ManagerList
    }
}

export function loadMessage(color, message){
    return{
        type:"SET_NO_DATA",
        color,
        message
    }
}


export {
    GetSkillSet,
    GetSkillCategory,
    GetDomains,
    GetManagerList
}