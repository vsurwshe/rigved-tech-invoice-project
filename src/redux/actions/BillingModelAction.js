import { CreateInstance, HeaderConfig } from '../../assets/config/APIConfig';
import { loadMessage } from './ClientAction';
import { ErrorFunction, SuccessFunction } from './CommonAction';

// this action will help to get milestone list according to project
const GetMileStoneListProjectId=(firstIndex, lastIndex, projectId, authroizationKey)=>{
    return(dispatch)=>{
        return CreateInstance()
            .get('/milestone/getMileStoneList/'+firstIndex+'/'+lastIndex+'/'+projectId,HeaderConfig(authroizationKey))
            .then(response => { SuccessFunction({ dispatch , "successMethod": saveMileStoneListProjectId, "loadMessage":loadMessage, response}) })
            .catch(error => { ErrorFunction({dispatch,"loadMessage":loadMessage, error}) })
    }
}

// this action will help to get all milestone list
const GetAllMileStoneList=(firstIndex, lastIndex, authroizationKey)=>{
    return(dispatch)=>{
        return CreateInstance()
            .get('/milestone/getMileStoneList/'+firstIndex+'/'+lastIndex,HeaderConfig(authroizationKey))
            .then(response => { SuccessFunction({ dispatch , "successMethod": saveMileStoneList, "loadMessage":loadMessage, response}) })
            .catch(error => { ErrorFunction({dispatch,"loadMessage":loadMessage, error}) })
    }
}

// this action will help to save mile stone details with array list
const SaveMileStoneData=(mileStoneData,authroizationKey)=>{
    return(dispatch)=>{
        return CreateInstance()
        .post('/milestone/createAll/',mileStoneData,{
            headers: { 
                'Content-Type': 'application/json',
                Authorization: authroizationKey 
            }
        })
        .then(response => { SuccessFunction({ dispatch , "successMethod": saveMileStoneRecordData, "loadMessage":loadMessage, response, "postMethod":true}) })
        .catch(error => { ErrorFunction({dispatch,"loadMessage":loadMessage, error}) })
    }
}

// this action will help to update mile stone details
const udpateMileStoneData=(mileStoneData,authroizationKey)=>{
    return(dispatch)=>{
        return  CreateInstance()
        .post('/milestone/create/',mileStoneData,{
            headers: { 
                'Content-Type': 'application/json',
                Authorization: authroizationKey 
            }
        })
        .then(response=>{ SuccessFunction({ dispatch , "successMethod": updateMileStoneRecordData, "loadMessage":loadMessage, response, "postMethod":true}) })
        .catch(error => { ErrorFunction({dispatch,"loadMessage":loadMessage, error}) })
    }
}

// this action will help to get fixed type billing model list according to project
const getFixedTypeListProjectId=(firstIndex, lastIndex, projectId, authroizationKey)=>{
    return(dispatch)=>{
        return CreateInstance()
            .get('/billingTypeDetail/getBillTypeDetailsList/'+firstIndex+'/'+lastIndex+'/'+projectId,HeaderConfig(authroizationKey))
            .then(response => { SuccessFunction({ dispatch , "successMethod": saveFixedTypeListProjectId, "loadMessage":loadMessage, response}) })
            .catch(error => { ErrorFunction({dispatch,"loadMessage":loadMessage, error}) })
    }
}

// this action will help to get all fixed type billing model list
const getAllFixedTypeList=(firstIndex, lastIndex, authroizationKey)=>{
    return(dispatch)=>{
        return CreateInstance()
            .get('billingTypeDetail/getBillTypeDetailsList/'+firstIndex+'/'+lastIndex,HeaderConfig(authroizationKey))
            .then(response => { SuccessFunction({ dispatch , "successMethod": saveFixedTypeList, "loadMessage":loadMessage, response}) })
            .catch(error => { ErrorFunction({dispatch,"loadMessage":loadMessage, error}) })
    }
}

// this action will help to save fixed type billing model details
const saveFixedTypeData=(fixedTypeData,authroizationKey)=>{
    return(dispatch)=>{
        return CreateInstance()
        .post('/billingTypeDetail/create',fixedTypeData,{
            headers: { 
                'Content-Type': 'application/json',
                Authorization: authroizationKey 
            }
        })
        .then(response => { SuccessFunction({ dispatch , "successMethod": saveFixedTypeRecordData, "loadMessage":loadMessage, response, "postMethod":true}) })
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

export function saveFixedTypeList(fixedTypeList) {
    return {
        type:"SAVE_FIXED_TYPE_LIST",
        fixedTypeList
    }
}

export function saveFixedTypeListProjectId(fixedTypeList) {
    return {
        type:"SAVE_FIXED_TYPE_LIST_PROJECT_ID",
        fixedTypeList
    }
}

export function saveMileStoneRecordData(mileStoneData) {
    return {
        type:"SAVE_MILE_STONE_DATA",
        mileStoneData
    }
}

export function saveFixedTypeRecordData(fixedTypeData) {
    return {
        type:"SAVE_FIXED_TYPE_DATA",
        fixedTypeData
    }
}

export function updateMileStoneRecordData(mileStoneData) {
    return {
        type:"UPDATE_MILE_STONE_DATA",
        mileStoneData
    }
}

export{
    GetAllMileStoneList,
    GetMileStoneListProjectId,
    SaveMileStoneData,
    udpateMileStoneData,
    getFixedTypeListProjectId,
    getAllFixedTypeList,
    saveFixedTypeData
}