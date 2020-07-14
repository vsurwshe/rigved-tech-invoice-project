import React, { Component } from 'react';
import { Card, Button, CircularProgress, Dialog, DialogTitle, DialogContent, DialogContentText, DialogActions } from '@material-ui/core'
import ClientTable from './ClientTable';
import { connect } from 'react-redux';
import ClientForm from './ClientForm';
import { bindActionCreators } from 'redux';
import * as ClientAction from "../../redux/actions/ClientAction";
import * as MasterDataAction from "../../redux/actions/MasterDataAction";
import { API_EXE_TIME } from '../../assets/config/Config';

class ClientManagment extends Component {
    state = {
        createClient: false,
        loadClientList: false,
        clientData: [],
        deleteModel: false
    }

    componentDidMount = async () => {
        const { listOfClient } = this.props.ClientState;
        const { authorization } = this.props.LoginState;
        const { GetClientList } = this.props.ClientAction;
        const { GetSkillSet, GetSkillCategory, GetDomains } = this.props.MasterDataAction;
        if (listOfClient && listOfClient.length === 0) {
            this.handleLoadClientList(true);
            await GetSkillSet(0, 10, authorization);
            await GetSkillCategory(0, 10, authorization);
            await GetDomains(0, 10, authorization);
            await GetClientList(0, 20, authorization);
            await this.handleLoadClientList(false);
        }
    }

    // this method used for the create client from
    handleCreateClient = (clientData) => { this.setState({ createClient: !this.state.createClient, clientData }) }

    // this method used for the progress bar 
    handleLoadClientList = (loadValue) => { this.setState({ loadClientList: loadValue }) }

    // this method used for the load the delete model
    handleDeleteModel = (clientData) => { this.setState({ deleteModel: !this.state.deleteModel, clientData }) };

    render() {
        const { createClient, clientData } = this.state
        return <Card> {createClient ? this.loadClientForm(clientData) : this.loadClientTable()}</Card>
    }

    // this method used for the loading client form
    loadClientForm = (clientData) => {
        let newClientData = undefined;
        if (clientData) {
            newClientData = {
                ...clientData,
                "addressDtos": clientData.addressDtos && clientData.addressDtos[0],
                "bankDetailsDtoList": clientData.bankDetailsDtoList && clientData.bankDetailsDtoList[0]
            }
        }
        return <ClientForm initialValues={newClientData} SaveClientMethod={this.SaveClientDetails} cancle={this.handleCreateClient} />
    }

    loadDeleteModel = () => {
        const { deleteModel, clientData } = this.state
        const { id, clientName } = (clientData && clientData.rowData) ? clientData.rowData : ''
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

    // this method main framework which calling load client table method
    loadClientTable = () => {
        const { loadClientList } = this.state
        return < div style={{ paddingRight: 10 }}>
            <h1>Client Management</h1>
            {loadClientList ? this.loadingCircle() : this.loadingClientTable()}
        </div>
    }

    // this method used for load the client table
    loadingClientTable = () => <>
        {this.loadDeleteModel()}
        <Button style={{ float: "Right" }} variant="contained" color="primary" onClick={() => this.handleCreateClient()} > Create Client</Button>
        <ClientTable viewClientDetails={this.viewClientDetails} deleteClientDetails={this.handleDeleteModel} />
    </>

    // this method used for the show circular progress bar 
    loadingCircle = () => <center><CircularProgress size={80} /></center>

    // this method called when we click the view button in client table
    viewClientDetails = (props) => { this.handleCreateClient(props.rowData) }

    // this method used for the save the client details
    SaveClientDetails = async (sendUserValues) => {
        const { SaveClientData, loadMessage, GetClientList } = this.props.ClientAction;
        const { authorization } = this.props.LoginState
        const newUserData = {
            ...sendUserValues,
            "gstUrl": (sendUserValues.gstUrl && sendUserValues.gstUrl.type) ? sendUserValues.gstUrl.name : sendUserValues.gstUrl,
            "tanUrl": (sendUserValues.tanUrl && sendUserValues.tanUrl.type) ? sendUserValues.tanUrl.name : sendUserValues.tanUrl,
            "addressDtos": [sendUserValues.addressDtos],
            "active": true,
            "bankDetailsDtoList": [sendUserValues.bankDetailsDtoList]
        }
        await SaveClientData(newUserData, authorization)
        setTimeout(async () => {
            await loadMessage()
            await GetClientList(0, 20, authorization);
            this.handleCreateClient();
        }, API_EXE_TIME)
    }

    DeleteClientDetails = async (clientId) => {
        const { DeleteClient, loadMessage, GetClientList } = this.props.ClientAction;
        const { authorization } = this.props.LoginState
        await this.handleLoadClientList(true);
        clientId && await DeleteClient(clientId, authorization);
        setTimeout(async () => {
            await loadMessage();
            await GetClientList(0, 20, authorization);
            await this.handleDeleteModel();
            await this.handleLoadClientList(false);
        }, API_EXE_TIME)
    }
}

const mapStateToProps = state => { return state; };
const mapDispatchToProps = (dispatch) => ({
    ClientAction: bindActionCreators(ClientAction, dispatch),
    MasterDataAction: bindActionCreators(MasterDataAction, dispatch)
})

export default connect(mapStateToProps, mapDispatchToProps)(ClientManagment);