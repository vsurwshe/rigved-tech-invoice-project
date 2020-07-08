import React, { Component } from 'react';
import { Card, Button, CircularProgress } from '@material-ui/core'
import ClientTable from './ClientTable';
import { connect } from 'react-redux';
import ClientForm from './ClientForm';
import { bindActionCreators } from 'redux';
import * as ClientAction from "../../redux/actions/ClientAction";
import * as MasterDataAction from "../../redux/actions/MasterDataAction";

class ClientManagment extends Component {
    state = {
        createClient: false,
        loadClientList: false
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
            await GetClientList(0, 10, authorization);
            await this.handleLoadClientList(false);
        }
    }

    handleCreateClient = () => {
        this.setState({ createClient: !this.state.createClient })
    }

    handleLoadClientList = (loadValue) => {
        this.setState({ loadClientList: loadValue })
    }

    render() {
        const { createClient } = this.state
        return <Card> {createClient ? this.loadClientForm() : this.loadClientTable()} </Card>
    }

    loadClientForm = () => <ClientForm SaveClient={this.SaveClientDetails} cancle={this.handleCreateClient} />
    
    loadClientTable = () => {
        const { loadClientList } = this.state
        return < div style={{ paddingRight: 10 }}>
            <h1>Client Management</h1>
            {loadClientList ? this.loadingCircle() : this.loadingClientTable() }
        </div>
    }

    loadingClientTable=()=><>
        <Button style={{ float: "Right" }} variant="contained" color="primary" onClick={this.handleCreateClient} > Create Client</Button>
        <ClientTable />
    </>

    loadingCircle=()=> <center><CircularProgress size={80} /></center>

    SaveClientDetails = async (sendUserValues) => {
        console.log("Mes ", sendUserValues)
        //     const newUserData={
        //         ...sendUserValues,
        //         "profilePic": sendUserValues.profilePic.name,
        //         "companyName": "RVTech Pvt Ltd"
        //     }
        //     await props.RegisterUser(newUserData, props.LoginState.authorization)
        //     setTimeout(async () => {
        //         await props.loadMessage()
        //         // await setLoading(loading = !loading);
        //     }, API_EXE_TIME)
    }
}

const mapStateToProps = state => { return state; };
const mapDispatchToProps = (dispatch) => ({
    ClientAction: bindActionCreators(ClientAction, dispatch),
    MasterDataAction: bindActionCreators(MasterDataAction, dispatch)
})

export default connect(mapStateToProps, mapDispatchToProps)(ClientManagment);