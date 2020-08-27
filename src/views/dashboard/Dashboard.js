import React, { Component } from 'react';
import { Grid } from "@material-ui/core";
import SimplePieChart from "./chart/SimplePieChart";
import StackedBarChart from "./chart/StackedBarChart";
import SimpleLineChart from "./chart/SimpleLineChart";
import { PageTitle } from './chart/DashboardUtilites';
import SideBySideBarChart from './chart/SideBySideBarChart';
import * as DashboardAction from "../../redux/actions/DashboardAction";
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

const ClientSerise=[
  {name:"Client 1", value:"client1"},
  {name:"Client 2", value:"client2"},
  {name:"Client 3", value:"client3"},
  {name:"Client 4", value:"client4"}
]

const TempBillingData=[
    { xaxis: 'Feb', client1:74.2,  client2: 308.6,  client3: 35.1,  client4: 956.9},
    { xaxis: 'March', client1: 40,   client2: 128.5, client3: 361.8, client4: 105 },
    { xaxis: 'April', client1: 22.6,  client2: 241.5,  client3: 64.9,  client4: 120.8}, 
    { xaxis: 'May', client1: 19,  client2: 119.3,  client3: 28.9,  client4: 204.8}, 
    { xaxis: 'Jun', client1: 6.1,  client2: 123.6, client3: 77.3, client4: 85.7 }
];

const TempEmployeeData=[
    { xaxis: 'Feb', client1:10,  client2: 30,  client3: 20,  client4: 10},
    { xaxis: 'March', client1: 20,   client2: 12, client3: 20, client4: 15 },
    { xaxis: 'April', client1: 22,  client2: 24,  client3: 10,  client4: 12}, 
    { xaxis: 'May', client1: 15,  client2: 11,  client3: 28,  client4: 20}, 
    { xaxis: 'Jun', client1: 6.1,  client2: 12, client3: 20, client4: 15 }
];

const ResourceSerise=[
  {name:"Hired", value:"hired"},
  {name:"Left", value:"left"}
]

const ResourceData=[
  { xaxis: 'Feb', hired:10,  left: 30 },
  { xaxis: 'March', hired: 20,   left: 12 },
  { xaxis: 'April', hired: 22,  left: 24 }, 
  { xaxis: 'May', hired: 15,  left: 11 }, 
  { xaxis: 'Jun', hired: 6.1,  left: 12 }
]

const BillSerise=[
  {name:"Billed", value:"billed"},
  {name:"Revenue", value:"unbilled"}
]

const BilledData=[
  { xaxis: 'Feb', billed:1000,  unbilled: 3000 },
  { xaxis: 'March', billed: 2000, unbilled: 1200 },
  { xaxis: 'April', billed: 2200, unbilled: 2400 }, 
  { xaxis: 'May', billed: 1500, unbilled: 1100 }, 
  { xaxis: 'Jun', billed: 6300, unbilled: 1200 }
]

const ClientRevenue=[
  { field:"Client 1", value:20},
  { field:"Client 2", value:30},
  { field:"Client 3", value:43},
  { field:"Client 4", value:17}
]

const ProjectRevenue=[
  { field:"Project 1", value:20, name:"Project 1"},
  { field:"Project 2", value:30, name:"Project 2"},
  { field:"Project 3", value:43, name:"Project 3"},
  { field:"Project 4", value:17, name:"Project 4"}
]

const PurchaseOrderRevenue=[
  { field:"PO 1", value:20},
  { field:"PO 2", value:30},
  { field:"PO 3", value:43},
  { field:"PO 4", value:17}
]

class Dashboard extends Component {
  state = { 
    BillingData : [], 
    EmployeeData : [],
    ProjectData : []
  }

  componentDidMount=async()=>{
    console.log("Props ",this.props)
    const { clientBillingData, clientEmployeeData }=this.props.DashboardState
    const { authorization }=this.props.LoginState
    const {GetBillingData }=this.props.DashboardAction
    if((clientBillingData && clientBillingData.length <=0) || (clientEmployeeData && clientEmployeeData.length <=0))
    {
      await GetBillingData(authorization);
    }

  }

  handelBillingData=(BillingData)=>{this.setState({BillingData})}
  
  handelEmployeeData=(EmployeeData)=>{this.setState({EmployeeData})}
  
  handelProjectData=(ProjectData)=>{this.setState({ProjectData})}
  
  render() { 
      return <> {this.loadGird()}</>
  }

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

  loadPageTitle=()=>{
    const { clientSerise, projectSerise }= this.props.DashboardState
    return <PageTitle title="Dashboard" 
        clientSerise={clientSerise} 
        projectSerise={projectSerise} 
        filterByClient={this.filterByClient}
        filterByProject={this.filterByProject}
    />
  }

  loadClientBillingChart=()=>{
    const { clientBillingData, clientSerise }= this.props.DashboardState
    return <StackedBarChart 
        dataSource={clientBillingData} 
        architectureSources={clientSerise} 
        xAxisText="Billing" 
        title="Client Billing Data"   
    /> 
  }

  loadBillingChart=()=>{
    const { billedData, billSerise }= this.props.DashboardState
    return <SideBySideBarChart 
        dataSource={billedData} 
        architectureSources={billSerise}
        xAxisText="Billing"  
        title="Billed Data"
    />
  }

  loadEmployeeChart=()=>{
    const { clientEmployeeData, clientSerise }=this.props.DashboardState
    return <StackedBarChart 
        dataSource={clientEmployeeData} 
        architectureSources={clientSerise}  
        xAxisText="Employees" 
        title="Employee Data" 
    />
  }

  loadResourceChart=()=>{
    const { resourceData, resourceSerise }=this.props.DashboardState
    return <SimpleLineChart 
      dataSource={resourceData} 
      architectureSources={resourceSerise} 
      xAxisText="Employees" 
      title="Resource Data"  
    />
  }

  loadClientRevenueChart=()=>{
    const {clientRevenueData}=this.props.DashboardState
    return <SimplePieChart 
        dataSource={clientRevenueData} 
        title="Client revenue share"
    />
  }

  loadProjectRevenueChart=()=>{
    const { projectRevenueData }=this.props.DashboardState
    return <SimplePieChart 
      dataSource={projectRevenueData} 
      title="Project revenue share"
    />
  }

  loadPurchaseOrderRevenueChart=()=>{
    const { purchaseOrderRevenueData }= this.props.DashboardState
    return <SimplePieChart 
        dataSource={purchaseOrderRevenueData} 
        title="Purchase order share"
    />
  }

  filterByClient=(propsData)=>{
    if(propsData){
      let keyValue=propsData.value;
      let tempBillingFilter = (TempBillingData.length >0) && TempBillingData.filter((item)=>item.hasOwnProperty(propsData.value))
      .map((item)=> {return {"xaxis":item.xaxis , [keyValue] : item.[keyValue]}});
      let tempEmployeeFilter = (TempEmployeeData.length >0) && TempEmployeeData.filter((item)=>item.hasOwnProperty(propsData.value))
      .map((item)=> {return {"xaxis":item.xaxis , [keyValue] : item.[keyValue]}});
      this.handelBillingData(tempBillingFilter);
      this.handelEmployeeData(tempEmployeeFilter);
    }else{
      this.handelBillingData(TempBillingData);
      this.handelEmployeeData(TempEmployeeData);
    }
  }

  filterByProject=(propsData)=>{
    if(propsData){
      let tempProjectFilter = (ProjectRevenue.length >0) && ProjectRevenue.filter((item)=>item.field === propsData.field);
      this.handelProjectData(tempProjectFilter);
    }else{
      this.handelProjectData(ProjectRevenue);
    }
  }
}

const mapStateToProps = state => { return state; };
const mapDispatchToProps = (dispatch) => ({
    DashboardAction: bindActionCreators(DashboardAction, dispatch),
})

export default connect(mapStateToProps, mapDispatchToProps)(Dashboard);