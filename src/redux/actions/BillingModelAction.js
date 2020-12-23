import Axios from 'axios';
import { CreateInstance, HeaderConfig } from '../../assets/config/APIConfig';
import { API_URL } from '../../assets/config/Config';
import { loadMessage } from './ClientAction';
import { ErrorFunction, SuccessFunction } from './CommonAction';

const GetMileStoneList=(firstIndex, lastIndex,authroizationKey)=>{
    return(dispatch)=>{
        return CreateInstance()
            .get('/client/clientList/'+firstIndex+'/'+lastIndex,HeaderConfig(authroizationKey))
            .then(response => { SuccessFunction({ dispatch , "successMethod": saveMileStoneList, "loadMessage":loadMessage, response}) })
            .catch(error => { ErrorFunction({dispatch,"loadMessage":loadMessage, error}) })
    }
}

const SaveMileStoneData=(mileStoneData,authroizationKey)=>{
    return(dispatch)=>{
        return CreateInstance()
        .post('/milestone/create',mileStoneData,{
            headers: { 
                'Content-Type': 'application/json',
                Authorization: authroizationKey 
            }
        })
        .then(response => { SuccessFunction({ dispatch , "successMethod": saveMileStoneData, "loadMessage":loadMessage, response, "postMethod":true}) })
        .catch(error => { ErrorFunction({dispatch,"loadMessage":loadMessage, error}) })
    }
}

const SaveMileStoneDataArray=(mileStoneData,authroizationKey)=>{
    return(dispatch)=>{
        let urlList= mileStoneData.length>0 && mileStoneData.map((item)=>{
            let modifyData={...item, "active": true}
            return Axios.post(API_URL+'/milestone/create',modifyData,{ headers: {  'Content-Type': 'application/json', Authorization: authroizationKey }})
        })
        console.log("URL ",urlList)
        return Axios.all(urlList)
        .then(response=>{ console.log("RES ",response); SuccessFunction({ dispatch , "successMethod": saveMileStoneData, "loadMessage":loadMessage, response, "postMethod":true}) })
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

export function saveMileStoneData(mileStoneData) {
    return {
        type:"SAVE_MILE_STONE_DATA",
        mileStoneData
    }
}

export{
    GetMileStoneList,
    SaveMileStoneData,
    SaveMileStoneDataArray   
}