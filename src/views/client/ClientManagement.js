import React, { Component } from 'react';
import { Card, Button, CircularProgress } from '@material-ui/core'
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
        clientData: []
    }

    componentDidMount = async () => {
        const { listOfClient } = this.props.ClientState;
        const { authorization } = this.props.LoginState;
        const { GetClientList }= this.props.ClientAction;
        const { GetSkillSet, GetSkillCategory, GetDomains }= this.props.MasterDataAction;
        if (listOfClient && listOfClient.length === 0) {
            this.handleLoadClientList(true);
            await GetSkillSet(0,10,authorization);
            await GetSkillCategory(0,10,authorization);
            await GetDomains(0,10,authorization);
            await GetClientList(0, 20, authorization);
            await this.handleLoadClientList(false);
        }
    }

    handleCreateClient = (clientData) => {
        this.setState({ createClient: !this.state.createClient, clientData }) 
    }

    handleLoadClientList = (loadValue) => { this.setState({ loadClientList: loadValue }) }

    render() {
        const { createClient , clientData } = this.state
        return <Card> {createClient  ? this.loadClientForm(clientData) : this.loadClientTable()} </Card>
    }

    // this method used for the loading client form
    loadClientForm = (clientData) => {
        let newClientData=undefined;
        if(clientData ){
            newClientData={
                ...clientData,
                "addressDtos": clientData.addressDtos && clientData.addressDtos[0],
                "bankDetailsDtoList": clientData.bankDetailsDtoList && clientData.bankDetailsDtoList[0]
            }
        }
        return <ClientForm initialValues={newClientData} SaveClientMethod={this.SaveClientDetails} cancle={this.handleCreateClient} />
    }
    
    // this method main framework which calling load client table method
    loadClientTable = () => {
        const { loadClientList } = this.state
        return < div style={{ paddingRight: 10 }}>
            <h1>Client Management</h1>
            {loadClientList ? this.loadingCircle() : this.loadingClientTable() }
        </div>
    }

    // this method used for load the client table
    loadingClientTable=()=><>
        <Button style={{ float: "Right" }} variant="contained" color="primary" onClick={()=>this.handleCreateClient()} > Create Client</Button>
        <ClientTable viewClientDetails={this.viewClientDetails} />
    </>

    // this method used for the show circular progress bar 
    loadingCircle=()=> <center><CircularProgress size={80} /></center>

    // this method called when we click the view button in client table
    viewClientDetails=(props)=>{ this.handleCreateClient(props.rowData) }
    
    // this method used for the save the client details
    SaveClientDetails = async (sendUserValues) => {
        const {SaveClient, loadMessage, GetClientList }=this.props.ClientAction;
        const {authorization }= this.props.LoginState
        const newUserData={
            ...sendUserValues,
            "gstUrl":sendUserValues.gstUrl && sendUserValues.gstUrl.name,
            "tanUrl": sendUserValues.tanUrl && sendUserValues.tanUrl.name,
            "addressDtos":[sendUserValues.addressDtos],
            "active":true,
            "bankDetailsDtoList":[sendUserValues.bankDetailsDtoList]
        }
        await SaveClient(newUserData, authorization)
        setTimeout(async () => {
            await loadMessage()
            await GetClientList(0, 20, authorization);
            this.handleCreateClient();
        }, API_EXE_TIME)
    }
}

const mapStateToProps = state => { return state; };
const mapDispatchToProps = (dispatch) => ({
    ClientAction: bindActionCreators(ClientAction, dispatch),
    MasterDataAction: bindActionCreators(MasterDataAction, dispatch)
})

export default connect(mapStateToProps, mapDispatchToProps)(ClientManagment);