import React, { Component } from 'react';
import { Card, Button } from '@material-ui/core'
import ClientTable from './ClientTable';
import { connect } from 'react-redux';
import * as ClientAction from "../../redux/actions/ClientAction";
import ClientForm from './ClientForm';

class ClientManagment extends Component {
    

    state = {
        createClient: false
    }

    componentDidMount = () => {
        const { listOfClient } = this.props.ClientState;
        const { authorization } = this.props.LoginState;
        if (listOfClient && listOfClient.length === 0) {
            this.props.GetClientList(0, 10, authorization)
        }
    }

    handleCreateClient = () => {
        this.setState({ createClient: !this.state.createClient })
    }

    render() {
        const { createClient } = this.state
        return <Card> {createClient ? this.loadClientForm() : this.loadClientTable()} </Card>
    }

    loadClientForm = () => <ClientForm SaveClient={this.SaveClientDetails} cancle={this.handleCreateClient} />
    loadClientTable = () => <>
        <h1>Client Management</h1>
        <Button style={{ float: "Right" }} variant="contained" color="primary" onClick={this.handleCreateClient} > Create Client</Button>
        <ClientTable />
    </>

SaveClientDetails = async(sendUserValues, props) => {
    console.log("Mes ",props)
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
export default connect(mapStateToProps, ClientAction)(ClientManagment);