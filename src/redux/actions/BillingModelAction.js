import { CreateInstance, HeaderConfig } from '../../assets/config/APIConfig';
import { loadMessage } from './ClientAction';
import { ErrorFunction, SuccessFunction } from './CommonAction';

const GetMileStoneListProjectId=(firstIndex, lastIndex, projectId, authroizationKey)=>{
    return(dispatch)=>{
        return CreateInstance()
            .get('/milestone/getMileStoneList/'+firstIndex+'/'+lastIndex+'/'+projectId,HeaderConfig(authroizationKey))
            .then(response => { SuccessFunction({ dispatch , "successMethod": saveMileStoneListProjectId, "loadMessage":loadMessage, response}) })
            .catch(error => { ErrorFunction({dispatch,"loadMessage":loadMessage, error}) })
    }
}

const GetAllMileStoneList=(firstIndex, lastIndex, authroizationKey)=>{
    return(dispatch)=>{
        return CreateInstance()
            .get('/milestone/getMileStoneList/'+firstIndex+'/'+lastIndex,HeaderConfig(authroizationKey))
            .then(response => { SuccessFunction({ dispatch , "successMethod": saveMileStoneList, "loadMessage":loadMessage, response}) })
            .catch(error => { ErrorFunction({dispatch,"loadMessage":loadMessage, error}) })
    }
}

const SaveMileStoneData=(mileStoneData,authroizationKey)=>{
    return(dispatch)=>{
        return CreateInstance()
        .post('/milestone/createAll/',mileStoneData,{
            headers: { 
                'Content-Type': 'application/json',
                Authorization: authroizationKey 
            }
        })
        .then(response => { SuccessFunction({ dispatch , "successMethod": saveMileStoneData, "loadMessage":loadMessage, response, "postMethod":true}) })
        .catch(error => { ErrorFunction({dispatch,"loadMessage":loadMessage, error}) })
    }
}

const udpateMileStoneData=(mileStoneData,authroizationKey)=>{
    return(dispatch)=>{
        return  CreateInstance()
        .post('/milestone/create/',mileStoneData,{
            headers: { 
                'Content-Type': 'application/json',
                Authorization: authroizationKey 
            }
        })
        .then(response=>{ SuccessFunction({ dispatch , "successMethod": updateMileStoneData, "loadMessage":loadMessage, response, "postMethod":true}) })
        .catch(error => { ErrorFunction({dispatch,"loadMessage":loadMessage, error}) })
    }
}

// -------------------------

export function saveMileStoneList(mileStoneList) {
    return {
        type:"SAVE_MILE_STONE_LIST",
        mileStoneList
    }
}

export function saveMileStoneListProjectId(mileStoneList) {
    return {
        type:"SAVE_MILE_STONE_LIST_PROJECT_ID",
        mileStoneList
    }
}

export function saveMileStoneData(mileStoneData) {
    return {
        type:"SAVE_MILE_STONE_DATA",
        mileStoneData
    }
}

export function updateMileStoneData(mileStoneData) {
    return {
        type:"UPDATE_MILE_STONE_DATA",
        mileStoneData
    }
}

export{
    GetAllMileStoneList,
    GetMileStoneListProjectId,
    SaveMileStoneData,
    udpateMileStoneData   
}