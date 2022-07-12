import React from 'react'
import { Box, Container,Grid } from '@mui/material';
import DashboardLayout from '../dashboard-layout'
import { Places } from './places'
import { TotalUsers } from './total-users';
import { Teams } from './user-team';
import { TotalComments } from './total-comments';
import {Events} from './events-timeline'
import {TrafficByDevice} from './traffic-by-device'
import { useGetEventsQuery } from '../../../api/apiSlice';

const Dashboard = () => {
const {
    data: events,
    isSuccess,
    isLoading,
    isError
  }=useGetEventsQuery()
  if(isSuccess)
    return (
        <>
        <DashboardLayout>
            
            <Grid container spacing={3}>
                <Grid item xs={12} md={6} lg={3} >
                    <Places events={events}/>
                </Grid>
                <Grid item xs={12} md={6} lg={3} >
                    <TotalUsers/>
                </Grid>
                <Grid item xs={12} md={6} lg={3} >
                    <Teams/>
                </Grid>
                <Grid item xs={12} md={6} lg={3} >
                    <TotalComments events={events}/>
                </Grid>
                
                <Grid item xs={12} md={8}>
                    <Events events={events}/>
                </Grid>
                <Grid item xs={12} md={4}>
                    <TrafficByDevice/>
                </Grid>
                
            </Grid>
        </DashboardLayout>
        </>
    )
}

export default Dashboard