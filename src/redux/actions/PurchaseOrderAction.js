import {AlertColor} from '../../assets/config/Config';
import {CONFLICTSTATUS, STATUS200 } from "../../assets/config/CodeMap";
import { CreateInstance, HeaderConfig } from '../../assets/config/APIConfig';


const GetPurchaseOrderList=(firstIndex, lastIndex,authroizationKey)=>{
    return(dispatch)=>{
        return CreateInstance()
        .get('/purchaseOrder/poList/'+firstIndex+'/'+lastIndex,HeaderConfig(authroizationKey))
        .then(response => {
            if(response.status !== STATUS200){
                dispatch(loadMessage(AlertColor.danger ,response.headers.message));
            }else{
                dispatch(SavePurchaseOrderList(response.data))
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


const SavePurchaseOrderDetails=(userData,authroizationKey)=>{
    return(dispatch)=>{
        return CreateInstance()
        .post('/purchaseOrder/create/',userData,{headers: { 
            'Content-Type': 'application/json',
            Authorization: authroizationKey 
        }})
        .then(response => {
            if(response.status !== STATUS200){
                dispatch(loadMessage(AlertColor.danger ,response.headers.message));
            }else{
                dispatch(loadMessage(AlertColor.success,response.headers.message))
                dispatch(SavePurchaseOrderData(userData))
            }
        })
        .catch(error => { 
            if(error.response && error.response.status.toString() === CONFLICTSTATUS){
                dispatch(loadMessage(AlertColor.danger, error.response.headers.message));
            }else{
                dispatch(loadMessage(AlertColor.danger, 'Something went worng..!'));
            }
        })
    }
}




//-------------------------------------------------------

export function SavePurchaseOrderList(purchaseOrderList){
    return{
        type:"SAVE_PURCHASE_ORDER_LIST",
        purchaseOrderList
    }
}

export function SavePurchaseOrderData(purchaseOrderData){
    return{
        type:"SAVE_PURCHASE_ORDER_DATA",
        purchaseOrderData
    }
}

export function loadMessage(color,message){
    return{
        type:"CHANGE_MASSAGE",
        message,
        color
    }
}


export {
    GetPurchaseOrderList,
    SavePurchaseOrderDetails   
}