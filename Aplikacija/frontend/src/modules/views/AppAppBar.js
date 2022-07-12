import * as React from 'react';
import Box from '@mui/material/Box';
import Link from '@mui/material/Link';
import AppBar from '../components/AppBar';
import Toolbar from '../components/Toolbar';
import SportsBasketballIcon from '@mui/icons-material/SportsBasketball'
import { useSelector,useDispatch } from 'react-redux';
import { useNavigate } from "react-router-dom";
import { selectLanguage } from '../../features/language/languageSlice';
import { logOut } from '../../features/auth/authSlice';
import { Typography } from '@mui/material';
let j

const rightLink = {
  fontSize: 19,
  color: 'common.white',
  ml: 3,
};

function AppAppBar() {
  j=useSelector(selectLanguage);
  const navigate=useNavigate()
  const dispatch=useDispatch();
  const handleLogOut = () => {
    dispatch(logOut);
    localStorage.removeItem('token');
    navigate("/");
  };
  return (
    <div>
      <AppBar position="fixed">
        <Toolbar sx={{ justifyContent: 'space-between' }}>
          <Box sx={{ flex: 1 }} />
          {/*<img src={logo}></img>*/}
          <Typography align='start'>
          <Link
            variant="h6"
            underline="none"
            color="inherit"
            onClick={()=>handleLogOut()}
            href="/"
            sx={{ fontSize: 25 }}
          >
            <SportsBasketballIcon fontSize='medium' />
             {j==='e'?'Play basketball':'igraj kosarku'}
          </Link></Typography>
          
          <Box sx={{ flex: 1, display: 'flex', justifyContent: 'flex-end' }}>
            <Link
              color="inherit"
              variant="h6"
              underline="none"
              href="/sign-in/"
              sx={rightLink}
            >
              {j==='e'?'Sign In':'Prijava'}
            </Link>
            <Link
              variant="h6"
              underline="none"
              href="/sign-up/"
              sx={{ ...rightLink, color: 'secondary.main' }}
            >
              {j==='e'?'Sign Up':'Registracija'}
            </Link>
            
          </Box>
        </Toolbar>
      </AppBar>
      <Toolbar />
    </div>
  );
}

export default AppAppBar;
