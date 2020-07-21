import React,{Component} from 'react';
import { connect } from 'react-redux';
import * as PurchaseOrderAction from '../../redux/actions/PurchaseOrderAction'
import { bindActionCreators } from 'redux';
import {Card, Dialog, DialogTitle, DialogContent, DialogContentText, Button, CircularProgress, DialogActions } from '@material-ui/core';
import PurchaseOrderTable from './PurchaseOrderTable';
import PurchaseOrderForm from './PurchaseOrderFrom'
import { API_EXE_TIME } from '../../assets/config/Config';
import moment from 'moment';

class PurchaseOrderManagement extends Component {
    state = { 
        createPuchaseOrder: false,
        loadPuchaseOrderList: false,
        puchaseOrderData: [],
        deleteModel: false,
        operation:"",
        purchaseOrderFileUrl:"",
        purchaseOrderFileUpload:false
    }

    componentDidMount=async()=>{
        const { purchaseOrderList }= this.props.PurchaseOrderState
        const { authorization }= this.props.LoginState
        const { GetPurchaseOrderList }= this.props.PurchaseOrderAction
        if (purchaseOrderList && purchaseOrderList.length === 0) {
            await GetPurchaseOrderList(0,20,authorization);
        }
    }

    // this method used for the create client from
    handleCreatePurchaseOrder = (puchaseOrderData,operation) => { this.setState({ createPuchaseOrder: !this.state.createPuchaseOrder, puchaseOrderData, operation }) }

    // this method used for the progress bar 
    handleLoadPurchaseOrdertList = () => { this.setState({ loadPuchaseOrderList: !this.state.loadPuchaseOrderList }) }

    // this method used for the load the delete model
    handleDeleteModel = (puchaseOrderData) => { this.setState({ deleteModel: !this.state.deleteModel, puchaseOrderData }) };

    // this method used for the handling the puchase order file
    handlePurchaseOrderUplaod=()=>{ this.setState({purchaseOrderFileUpload : !this.state.purchaseOrderFileUpload})}


    render() { 
        const {createPuchaseOrder, puchaseOrderData}=this.state
        return <Card> {createPuchaseOrder ? this.loadPurchaseOrderForm(puchaseOrderData) :this.loadPurchaseOrder()}</Card>
    }

    uploadPurchaseFile=(fileData,name,type)=>{
        console.log("PM -3",fileData)
    }

    // this method used for the loading PurchaseOrder form
    loadPurchaseOrderForm = (purchaseOrderData) => {
        const {operation,purchaseOrderFileUrl, purchaseOrderFileUpload}=this.state
        let newPurchaseOrderData = undefined;
        if (purchaseOrderData) {
            newPurchaseOrderData = {
                ...purchaseOrderData,
                "validFrom":moment(purchaseOrderData.validFrom).format('YYYY-MM-DD') ,
                "validTo":moment(purchaseOrderData.validTo).format('YYYY-MM-DD') ,
            }
        }
        const data={ operation,purchaseOrderFileUrl,purchaseOrderFileUpload }
        return <PurchaseOrderForm 
                stateData={data} 
                initialValues={newPurchaseOrderData} 
                SaveMethod={this.SavePODetails} 
                cancle={this.handleCreatePurchaseOrder} 
            />
    }

    loadDeleteModel = () => {
        const { deleteModel, puchaseOrderData } = this.state
        const { id, clientName } = puchaseOrderData  ? puchaseOrderData : ''
        return <Dialog open={deleteModel} keepMounted onClose={this.handleDeleteModel} aria-labelledby="alert-dialog-slide-title" aria-describedby="alert-dialog-slide-description"   >
            <DialogTitle id="alert-dialog-slide-title">{'Delete Client Data'}</DialogTitle>
            <DialogContent>
                <DialogContentText id="alert-dialog-slide-description">
                    {"You are deleteing " + clientName + " client record. Are you sure want to delete this record ?"}</DialogContentText>
            </DialogContent>
            <DialogActions>
                <Button onClick={this.handleDeleteModel} color="primary">Cancel</Button>
                <Button onClick={() => this.DeleteClientDetails(id)} color="secondary">Delete</Button>
            </DialogActions>
        </Dialog>
    }

    // this method main framework which calling load PurchaseOrder table method
    loadPurchaseOrder = () => {
        const { loadPuchaseOrderList } = this.state
        return < div style={{ paddingRight: 10 }}>  {loadPuchaseOrderList ? this.loadingCircle() :this.loadingPurchaseOrderTable()} </div>
    }

    // this method used for load the client table
    loadingPurchaseOrderTable = () => {
        const {operation}=this.state
        return <>
        {this.loadDeleteModel()}
        <PurchaseOrderTable  operation={operation} createPurchaseOrder={this.handleCreatePurchaseOrder} viewPurchaseOrder={this.viewPuchaseOrderDetails}  deletePuchaseOrder={this.handleDeleteModel}  />
    </>
    }
    // this method used for the show circular progress bar 
    loadingCircle = () => <center> <h3>Purchase Order Management</h3> <CircularProgress size={80} /> </center>

    // this method called when we click the view button in client table
    viewPuchaseOrderDetails = (data,operation) => {  this.handleCreatePurchaseOrder(data,operation)  }

    // this method used for the save the client details
    SavePODetails = async (sendUserValues) => {
        const { SavePurchaseOrderDetails, loadMessage, GetPurchaseOrderList } = this.props.PurchaseOrderAction;
        const { authorization } = this.props.LoginState
        const newUserData = {
            ...sendUserValues,
            // "gstUrl": (sendUserValues.gstUrl && sendUserValues.gstUrl.type) ? sendUserValues.gstUrl.name : sendUserValues.gstUrl,
            // "validFrom": DatePassToAPI(sendUserValues.validFrom) ,
            // "validTo": DatePassToAPI(sendUserValues.validTo),
            "active": true,
            // "bankDetailsDtoList": [sendUserValues.bankDetailsDtoList]
        }
        await SavePurchaseOrderDetails(newUserData, authorization)
        setTimeout(async () => {
            await loadMessage()
            await GetPurchaseOrderList(0, 20, authorization);
            this.handleCreatePurchaseOrder();
        }, API_EXE_TIME)
    }

    DeleteClientDetails = async (purchaseOrderId) => {
        const { DeletePurchaseOrder, loadMessage, GetPurchaseOrderList } = this.props.PurchaseOrderAction;
        const { authorization } = this.props.LoginState
        await this.handleLoadPurchaseOrdertList();
        purchaseOrderId && await DeletePurchaseOrder(purchaseOrderId, authorization);
        setTimeout(async () => {
            await loadMessage();
            await GetPurchaseOrderList(0, 20, authorization);
            await this.handleDeleteModel();
            await this.handleLoadPurchaseOrdertList();
        }, API_EXE_TIME)
    }


}

const mapStateToProps = state => { return state; };
const mapDispatchToProps = (dispatch) => ({
    PurchaseOrderAction: bindActionCreators(PurchaseOrderAction, dispatch),
})

export default connect(mapStateToProps,mapDispatchToProps)(PurchaseOrderManagement);