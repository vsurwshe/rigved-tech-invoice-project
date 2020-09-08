import React, { Component } from 'react';
import InvoiceFrom from './InvoiceFrom';
import { connect } from 'react-redux';
import { Card, CircularProgress } from '@material-ui/core';
import InvoiceTable from './InvoiceTable';
import * as ClientAction from "../../redux/actions/ClientAction";
import { bindActionCreators } from 'redux';


class InvoiceManagement extends Component {
    state = {  
        loadInvoiceList:false,
        fromAction:false,
        operations:"",
        invoiceData:[]
    };

    componentDidMount=async()=>{
        const { listOfClient }=this.props.ClientState
        const { authorization }=this.props.LoginState
        const { GetClientList }=this.props.ClientAction
        await this.handleInvoiceLoadvalue();
        (listOfClient && listOfClient<=0)&& await GetClientList(0,20,authorization);
        await this.handleInvoiceLoadvalue();
    }
    
    // this method will handle the progress bar datas
    handleInvoiceLoadvalue=()=>{ this.setState({loadInvoiceList: !this.state.loadInvoiceList})}
    
    // this method will handle the form action
    handleInvoiceFromAction=(invoiceData,operations)=>{this.setState({ invoiceData,fromAction: !this.state.fromAction, operations})}

    render() {
        const { fromAction, invoiceData }=this.state
        return <Card> {fromAction ? this.loadInvoiceFrom(invoiceData) : this.loadInvoiceTable()}</Card>;
    }

    loadInvoiceFrom=(invoiceData)=>{
        return  <InvoiceFrom 
            cancle={this.handleInvoiceFromAction}
        />
    }

    loadInvoiceTable=()=>{
        const { loadInvoiceList }=this.state
        return  < div style={{ paddingRight: 10 }}>  {loadInvoiceList ? this.loadingCircle() :this.loadingInvoiceTable()} </div>
    }

    // this method used for the show circular progress bar 
    loadingCircle = () => <center> <h3>Project Management</h3> <CircularProgress size={80} /> </center>


    loadingInvoiceTable=()=>{
        return <InvoiceTable 
            fromAction={this.handleInvoiceFromAction}
        />
    }
}

const mapStateToProps = state => { return state; };
const mapDispatchToProps = (dispatch) => ({
    ClientAction: bindActionCreators(ClientAction, dispatch),
})
export default connect(mapStateToProps,mapDispatchToProps)(InvoiceManagement);