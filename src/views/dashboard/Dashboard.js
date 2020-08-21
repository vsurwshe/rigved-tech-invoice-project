import React, { Component } from 'react';
import { Grid } from "@material-ui/core";
import { PieChartDataRevenue, LineChartRevenue } from './DashboardWidget';
import BigStat from "./widget/BigStat";
import StackedBarChart from "./chart/StackedBarChart";
class Dashboard extends Component {
    state = {  }
    
    render() { 
        const BillData = [
            { name: "Billed", value: 400, color: "success" },
            { name: "Unbilled", value: 300, color: "secondary" },
        ];
        const PurchaseOrderData ={
            "total": 12,
            "totalReceived":20000,
            "totalPending":50000,
            "totalInProcess":50000
        }
        const BillingSerise=[
          {name:"Client 1", value:"client1"},
          {name:"Client 2", value:"client2"},
          {name:"Client 3", value:"client3"},
          {name:"Client 4", value:"client4"}
        ]
        const BillingData=[
            { xaxis: 'Feb', client1:74.2,  client2: 308.6,  client3: 35.1,  client4: 956.9},
            { xaxis: 'March', client1: 40,   client2: 128.5, client3: 361.8, client4: 105 },
            { xaxis: 'April', client1: 22.6,  client2: 241.5,  client3: 64.9,  client4: 120.8}, 
            { xaxis: 'May', client1: 19,  client2: 119.3,  client3: 28.9,  client4: 204.8}, 
            { xaxis: 'Jun', client1: 6.1,  client2: 123.6, client3: 77.3, client4: 85.7 }
        ];
        const EmployeeSerise=[
          {name:"Client 1", value:"client1"},
          {name:"Client 2", value:"client2"},
          {name:"Client 3", value:"client3"},
          {name:"Client 4", value:"client4"}
        ]
        const EmployeeData=[
            { xaxis: 'Feb', client1:10,  client2: 30,  client3: 20,  client4: 10},
            { xaxis: 'March', client1: 20,   client2: 12, client3: 20, client4: 15 },
            { xaxis: 'April', client1: 22,  client2: 24,  client3: 10,  client4: 12}, 
            { xaxis: 'May', client1: 15,  client2: 11,  client3: 28,  client4: 20}, 
            { xaxis: 'Jun', client1: 6.1,  client2: 12, client3: 20, client4: 15 }
        ];
        return <>
            <Grid container spacing={6}>
              <StackedBarChart chartData={BillingData} max={2000} series={BillingSerise} title="Billing Data" /> &nbsp;&nbsp;
              <StackedBarChart chartData={EmployeeData} max={2000} series={EmployeeSerise} title="Employee Data" />
            </Grid>
            <Grid container spacing={6}>
            </Grid>
        </>
    }
}

 
export default Dashboard;