import React, { Component } from 'react';
import { Grid } from "@material-ui/core";
import { PieChartDataRevenue, LineChartRevenue } from './DashboardWidget';
import SimplePieChart from "./chart/SimplePieChart";
import StackedBarChart from "./chart/StackedBarChart";
import SimpleLineChart from "./chart/SimpleLineChart";
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

        const ClientRevenue=[
          { field:"Client 1", value:20},
          { field:"Client 2", value:30},
          { field:"Client 3", value:43},
          { field:"Client 4", value:17}
        ]

        const ProjectRevenue=[
          { field:"Project 1", value:20},
          { field:"Project 2", value:30},
          { field:"Project 3", value:43},
          { field:"Project 4", value:17}
        ]

        const PurchaseOrderRevenue=[
          { field:"PO 1", value:20},
          { field:"PO 2", value:30},
          { field:"PO 3", value:43},
          { field:"PO 4", value:17}
        ]

        return <>
        <Grid container spacing={6}>
          <Grid item xs={12} sm={6}>
            <StackedBarChart dataSource={BillingData} xAxisText="Billing" title="Billing Data" series={BillingSerise}  />
          </Grid>
          <Grid item xs={12} sm={6}>
            <StackedBarChart dataSource={EmployeeData} xAxisText="Employees" title="Employee Data" series={EmployeeSerise}  />
          </Grid>
        </Grid>
        <Grid container spacing={6}>
          <Grid item xs={12} sm={6}>
            <SimpleLineChart dataSource={ResourceData} xAxisText="Employees" title="Resource Data" architectureSources={ResourceSerise} title="Resource Data"/>
          </Grid>
          <Grid item xs={12} sm={6}>
            <SimplePieChart dataSource={ClientRevenue} title="Client revenue share"/>
          </Grid>
        </Grid>
        <Grid container spacing={6}>
          <Grid item xs={12} sm={6}>
          <SimplePieChart dataSource={ProjectRevenue} title="Project revenue share"/>
          </Grid>
          <Grid item xs={12} sm={6}>
            <SimplePieChart dataSource={PurchaseOrderRevenue} title="Purchase order share"/>
          </Grid>
        </Grid>
      </>
    }
}

 
export default Dashboard;