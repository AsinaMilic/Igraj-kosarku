import { useState } from 'react';
import { Box } from '@mui/material';
import { styled } from '@mui/material/styles';
import AppAppBarLogged from '../../modules/views/AppAppBarLogged'
import AppAppBar from '../../modules/views/AppAppBar'
import withRoot from '../../modules/withRoot';
import AppFooter from '../../modules/views/AppFooter';
import AppForm from '../../modules/views/AppForm'


const DashboardLayoutRoot = styled('div')(({ theme }) => ({
  display: 'flex',
  flex: '1 1 auto',
  maxWidth: '90%',
  paddingTop: 4,
  [theme.breakpoints.up('xl')]: {
    paddingLeft: 180
  }
}));

const DashboardLayout = (props) => {
  const { children } = props;

  return (
    <>
    {localStorage.getItem('token')?<AppAppBarLogged/>:<AppAppBar/>}
    <AppForm size='xxl'>
      <DashboardLayoutRoot>
        
          {children}
        
      </DashboardLayoutRoot>
      </AppForm>
      <AppFooter/>
    </>
  );
};

export default withRoot(DashboardLayout);
