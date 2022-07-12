import React, { useEffect } from 'react'
import { Box, Collapse, Container, Grid, Typography } from '@mui/material';
import { AccountProfileDetails } from './accountProfileDetails';
import { AccountProfile } from './accountProfile';
import AppAppBarLogged from '../../modules/views/AppAppBarLogged';
import AppFooter from '../../modules/views/AppFooter';
import withRoot from '../../modules/withRoot';
import AppForm from '../../modules/views/AppForm';

import {useParams} from 'react-router-dom'
import { useSelector } from 'react-redux';
import { selectCurrentUser } from '../auth/authSlice';
import {  useGetUserQuery } from '../../api/apiSlice';

const Account = () => {
    const ZaUredjajem=useSelector(selectCurrentUser);
    const [mounted, setMounted] = React.useState(false);
    useEffect(()=>{
        setMounted(true)
    },[])
    const {id} = useParams();
    const {
        data: user,
        isSuccess,
        isLoading,
        isError,
    } = useGetUserQuery(id)
    console.log(user)
  return(
  <>
    <AppAppBarLogged/>
    <AppForm size="lg" >
        <Box sx={{display: 'flex', flex: '1 1 auto',flexDirection: 'column',width: '100%',marginTop:-2 }}   >
                <Box component="main" sx={{flexGrow: 1}}  >
                
                    <Container maxWidth="lg">

                    {isSuccess?<Grid container spacing={3} >
                        <Grid item lg={4} md={6} xs={12}>
                        <Typography sx={{ mb: 2,}} variant="h4" align="center" >
                    profile
                    </Typography>
                            <Collapse in={mounted} > 
                                <AccountProfile user={user} ZaUredjajem={ZaUredjajem}/>
                            </Collapse>
                        </Grid>
                        <Grid item lg={8} md={6}xs={12} >
                            <Collapse in={mounted} >
                                <AccountProfileDetails user={user} ZaUredjajem={ZaUredjajem}/>
                            </Collapse>
                        </Grid>
                    </Grid>:null
                    }
                </Container>
            </Box>
        </Box>
    </AppForm>
    <AppFooter/>
  </>
  )
}


export default withRoot(Account);
