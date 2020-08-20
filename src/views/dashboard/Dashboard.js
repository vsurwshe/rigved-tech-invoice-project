import React, { Component } from 'react';
import { Grid } from "@material-ui/core";
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
            "total": 120,
            "totalReceived":20,
            "totalPending":50,
            "totalInProcess":50
        }
        const PurchaseOrderData ={
            "total": 12,
            "totalReceived":20000,
            "totalPending":50000,
            "totalInProcess":50000
        }
        const bigStat = [
            {
              product: "Client revenue",
              color: "primary",
              total: {
                monthly: 4232,
                weekly: 1465,
                daily: 199,
                percent: { value: 3.7, profit: false }
              },
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
                color: "success",
                total: {
                  monthly: 4232,
                  weekly: 1465,
                  daily: 199,
                  percent: { value: 3.7, profit: false }
                },
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
            <Grid container spacing={6}>
                {bigStat.map(stat => (
                    <Grid item md={4} sm={6} xs={12} key={stat.product}>
                        <BigStat {...stat} />
                    </Grid>
                ))}
               <PieChartDataRevenue title="Bill status" PieChartData={BillData} />
            </Grid>
            <Grid container spacing={6}>
                <LineChartRevenue title="Billable employees" data={EmployeeData}/>
                <LineChartRevenue title="Purchase order" data={PurchaseOrderData}/>
            </Grid>
        </>
    }
}

 
export default Dashboard;