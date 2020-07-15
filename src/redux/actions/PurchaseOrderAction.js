import {AlertColor} from '../../assets/config/Config';
import {CONFLICTSTATUS, STATUS200 } from "../../assets/config/CodeMap";
import { CreateInstance, HeaderConfig } from '../../assets/config/APIConfig';


const GetPurchaseOrderList=(firstIndex, lastIndex,authroizationKey)=>{
    return(dispatch)=>{
        return CreateInstance()
        .get('/client/clientList/'+firstIndex+'/'+lastIndex,HeaderConfig(authroizationKey))
        .then(response => {
            if(response.status !== STATUS200){
                dispatch(loadMessage(AlertColor.danger ,response.headers.message));
            }else{
                dispatch(SaveClientList(response.data))
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




//-------------------------------------------------------

export function SavePurchaseOrderList(purchaseOrderList){
    return{
        type:"SAVE_PURCHASE_ORDER_LIST",
        purchaseOrderList
    }
}