import React, { Component } from 'react';
import { Grid, CircularProgress } from "@material-ui/core";
import SimplePieChart from "./chart/SimplePieChart";
import StackedBarChart from "./chart/StackedBarChart";
import SimpleLineChart from "./chart/SimpleLineChart";
import { PageTitle } from './chart/DashboardUtilites';
import SideBySideBarChart from './chart/SideBySideBarChart';
import * as DashboardAction from "../../redux/actions/DashboardAction";
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

class Dashboard extends Component {
  state = { 
    load:false,
    BillingData : [], 
    EmployeeData : [],
    ProjectData : []
  }

  componentDidMount=async()=>{
    const { clientBillingData, clientEmployeeData, projectRevenueData }=this.props.DashboardState
    const { authorization }=this.props.LoginState
    const { GetBillingData, GetEmployeeData }=this.props.DashboardAction
    await this.handelLoadValue();
    (clientEmployeeData && clientEmployeeData.length <=0) && await GetEmployeeData(authorization,{});
    (clientBillingData && clientBillingData.length <=0) && await GetBillingData(authorization,{}); 
    (clientEmployeeData && clientEmployeeData.length > 0) && await this.handelEmployeeData(clientEmployeeData)  
    console.log("EMP ",clientEmployeeData, this.props.DashboardState.clientEmployeeData) 
     await this.handelBillingData(clientBillingData)
     await this.handelProjectData(projectRevenueData)
    await this.handelLoadValue();
  }

  // this method will handel the state billing data
  handelBillingData=(BillingData)=>{this.setState({BillingData})}
  
  // this method will handel the state employee data
  handelEmployeeData=(EmployeeData)=>{ console.log("12", EmployeeData); this.setState({EmployeeData})}
  
  // this method will handel the state project data
  handelProjectData=(ProjectData)=>{this.setState({ProjectData})}

  // this method will handel the loading dashboard
  handelLoadValue=()=>{this.setState({ load: !this.state.load})}
  
  render() { 
    const { load , BillingData, EmployeeData }=this.state
    console.log("Data ", load,BillingData,EmployeeData)
      if(load && BillingData.length <=0 && EmployeeData.length <=0){
        this.loadingCircle("Loading Dashboard....");
      }
      return <> {this.loadGird()}</>
  }

  // this method used for the show circular progress bar 
  loadingCircle = (message) => <center> <h3>{message}</h3> <CircularProgress size={80} /> </center>

  loadGird=()=>{
    return <> {this.loadPageTitle()}
    <Grid container spacing={6}>
      <Grid item xs={12} sm={6}> {this.loadClientBillingChart()} </Grid>
      <Grid item xs={12} sm={6}> {this.loadBillingChart()} </Grid>
    </Grid>
    <Grid container spacing={6}>
      <Grid item xs={12} sm={6}> {this.loadEmployeeChart()} </Grid>
      <Grid item xs={12} sm={6}> {this.loadResourceChart()} </Grid>
    </Grid>
    <Grid container spacing={6}>
      <Grid item xs={12} sm={6}> {this.loadClientRevenueChart()} </Grid>
      <Grid item xs={12} sm={6}> {this.loadProjectRevenueChart()} </Grid>
      <Grid item xs={12} sm={6}> {this.loadPurchaseOrderRevenueChart()}</Grid>
    </Grid>
    </>
  }

  // this method will load the page title
  loadPageTitle=()=>{
    const { clientSerise, projectSerise }= this.props.DashboardState
    return <PageTitle title="Dashboard" 
        clientSerise={clientSerise} 
        projectSerise={projectSerise} 
        filterByClient={this.filterByClient}
        filterByProject={this.filterByProject}
    />
  }

  // this method will load the client billing chart 
  loadClientBillingChart=()=>{
    const { clientSerise }= this.props.DashboardState
    const { BillingData }= this.state
    return <StackedBarChart 
        dataSource={BillingData} 
        architectureSources={clientSerise} 
        xAxisText="Billing" 
        title="Client Billing Data"   
    /> 
  }

  // this method will load the billing chart
  loadBillingChart=()=>{
    const { billedData, billSerise }= this.props.DashboardState
    return <SideBySideBarChart 
        dataSource={billedData} 
        architectureSources={billSerise}
        xAxisText="Billing"  
        title="Billed Data"
    />
  }

  // this method will load the employee chart
  loadEmployeeChart=()=>{
    const { employeeClientSerise }=this.props.DashboardState
    const { EmployeeData }=this.state
    return <StackedBarChart 
        dataSource={EmployeeData} 
        architectureSources={employeeClientSerise}  
        xAxisText="Employees" 
        title="Employee Data" 
    />
  }

  // this method will load the resource chart
  loadResourceChart=()=>{
    const { resourceData, resourceSerise }=this.props.DashboardState
    return <SimpleLineChart 
      dataSource={resourceData} 
      architectureSources={resourceSerise} 
      xAxisText="Employees" 
      title="Resource Data"  
    />
  }

  // this method will load the client revenue chart
  loadClientRevenueChart=()=>{
    const {clientRevenueData}=this.props.DashboardState
    return <SimplePieChart 
        dataSource={clientRevenueData} 
        title="Client revenue share"
    />
  }

  // this method will load the project chart
  loadProjectRevenueChart=()=>{
    const { ProjectData }=this.state
    return <SimplePieChart 
      dataSource={ProjectData} 
      title="Project revenue share"
    />
  }

  // this method will load the purchase order revenue chart
  loadPurchaseOrderRevenueChart=()=>{
    const { purchaseOrderRevenueData }= this.props.DashboardState
    return <SimplePieChart 
        dataSource={purchaseOrderRevenueData} 
        title="Purchase order share"
    />
  }

  // this method will filter by client
  filterByClient=(propsData)=>{
    const { clientBillingData, clientEmployeeData }=this.props.DashboardState
    if(propsData){
      let keyValue=propsData.value;
      let tempBillingFilter = (clientBillingData.length >0) && clientBillingData.filter((item)=>item.hasOwnProperty(propsData.value))
      .map((item)=> {return {"xaxis":item.xaxis , [keyValue] : item.[keyValue]}});
      let tempEmployeeFilter = (clientEmployeeData.length >0) && clientEmployeeData.filter((item)=>item.hasOwnProperty(propsData.value))
      .map((item)=> {return {"xaxis":item.xaxis , [keyValue] : item.[keyValue]}});
      this.handelBillingData(tempBillingFilter);
      this.handelEmployeeData(tempEmployeeFilter);
    }else{
      this.handelBillingData(clientBillingData);
      this.handelEmployeeData(clientEmployeeData);
    }
  }

  // this method will filter by project
  filterByProject=(propsData)=>{
    const { projectRevenueData }=this.props.DashboardState
    if(propsData){
      let tempProjectFilter = (projectRevenueData && projectRevenueData.length >0) && projectRevenueData.filter((item)=>item.field === propsData.field);
      this.handelProjectData(tempProjectFilter);
    }else{
      this.handelProjectData(projectRevenueData);
    }
  }
}

const mapStateToProps = state => { return state; };
const mapDispatchToProps = (dispatch) => ({
    DashboardAction: bindActionCreators(DashboardAction, dispatch),
})

export default connect(mapStateToProps, mapDispatchToProps)(Dashboard);