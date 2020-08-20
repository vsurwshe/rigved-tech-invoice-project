import React, { Component } from 'react';
import { Grid } from "@material-ui/core";
import PageTitle from '../PageTitle/PageTitle'
import { PieChartDataRevenue, LineChartRevenue } from './DashboardWidget';
import BigStat from "./widget/BigStat";
class Dashboard extends Component {
    state = {  }
    
    render() { 
        const BillData = [
            { name: "Billed", value: 400, color: "success" },
            { name: "Unbilled", value: 300, color: "secondary" },
        ];
        const EmployeeData ={
            "total": 12,
            "totalReceived":20000,
            "totalPending":30000,
            "totalInProcess":40000
        }
        const bigStat = [
            {
              product: "Client revenue",
              total: {
                monthly: 4232,
                weekly: 1465,
                daily: 199,
                percent: { value: 3.7, profit: false }
              },
              color: "primary",
              registrations: {
                monthly: { value: 830, profit: false },
                weekly: { value: 215, profit: true },
                daily: { value: 33, profit: true }
              },
              bounce: {
                monthly: { value: 4.5, profit: false },
                weekly: { value: 3, profit: true },
                daily: { value: 3.25, profit: true }
              }
            },
            {
                product: "Project revenue",
                total: {
                  monthly: 4232,
                  weekly: 1465,
                  daily: 199,
                  percent: { value: 3.7, profit: false }
                },
                color: "success",
                registrations: {
                  monthly: { value: 830, profit: false },
                  weekly: { value: 215, profit: true },
                  daily: { value: 33, profit: true }
                },
                bounce: {
                  monthly: { value: 4.5, profit: false },
                  weekly: { value: 3, profit: true },
                  daily: { value: 3.25, profit: true }
                }
              }
        ]
        return <>
            <PageTitle title="Dashboard"/>
            <Grid container spacing={6}>
                {bigStat.map(stat => (
                    <Grid item md={4} sm={6} xs={12} key={stat.product}>
                        <BigStat {...stat} />
                    </Grid>
                ))}
               <PieChartDataRevenue title="Bill breakdown" PieChartData={BillData} />
            </Grid>
            <Grid container spacing={6}>
                <LineChartRevenue title="Billable Employees" data={EmployeeData}/>
            </Grid>
        </>
    }
}

 
export default Dashboard;