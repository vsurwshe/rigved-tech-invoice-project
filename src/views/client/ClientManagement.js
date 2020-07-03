import React, { Component } from 'react';
import { Card } from '@material-ui/core';
import ClientTable from './ClientTable';

class ClientManagment extends Component {
    state = {  }
    render() { 
        return <Card>
            <center> <h1>Client Management</h1></center>
            <ClientTable />
        </Card>
    }
}
 
export default ClientManagment;