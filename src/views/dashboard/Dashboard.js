import React, { Component } from 'react';
import { Grid } from "@material-ui/core";
import PageTitle from '../PageTitle/PageTitle'
import { PieChartDataRevenue } from './DashboardWidget';

class Dashboard extends Component {
    state = {  }
    
    render() { 
        const ClientRevenueData = [
            { name: "Complete", value: 400, color: "success" },
            { name: "Incomplete", value: 300, color: "secondary" },
        ];
        return <>
            <PageTitle title="Dashboard"/>
            <Grid container spacing={6}>
               <PieChartDataRevenue PieChartData={ClientRevenueData} title="Client revenue share"/>
            </Grid>
        </>
    }
}

 
export default Dashboard;