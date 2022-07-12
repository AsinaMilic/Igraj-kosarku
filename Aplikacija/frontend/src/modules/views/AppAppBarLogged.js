import * as React from "react";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import IconButton from "@mui/material/IconButton";

import Badge from "@mui/material/Badge";
import MenuItem from "@mui/material/MenuItem";
import Menu from "@mui/material/Menu";
import AccountCircle from "@mui/icons-material/AccountCircle";
import NotificationsIcon from "@mui/icons-material/Notifications";
import MoreIcon from "@mui/icons-material/MoreVert";
import SportsBasketballIcon from "@mui/icons-material/SportsBasketball";
import Button from "@mui/material/Button";
import MenuIcon from '@mui/icons-material/Menu';

import AddCircleOutlineIcon from "@mui/icons-material/AddCircleOutline";
import SearchIcon from "@mui/icons-material/Search";
import { Avatar, Link, Typography } from "@mui/material";

import { useNavigate } from "react-router-dom";
import { logOut, selectCurrentUser } from "../../features/auth/authSlice";
import { useDispatch } from "react-redux";

import EmojiEventsIcon from "@mui/icons-material/EmojiEvents";

import Drawer from '@mui/material/Drawer';
import List from '@mui/material/List';
import Divider from '@mui/material/Divider';
import ChevronLeftIcon from '@mui/icons-material/ChevronLeft';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';

import PeopleAltTwoToneIcon from '@mui/icons-material/PeopleAltTwoTone';
import AdminPanelSettingsIcon from '@mui/icons-material/AdminPanelSettings';
import QueryStatsRoundedIcon from '@mui/icons-material/QueryStatsRounded';
import LogoutIcon from '@mui/icons-material/Logout';

import { useSelector } from 'react-redux';
import { selectLanguage } from '../../features/language/languageSlice';
let j

export default function AppAppBarLogged() {
  j=useSelector(selectLanguage);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const user=useSelector(selectCurrentUser);

  const [anchorEl, setAnchorEl] = React.useState(null);
  const [mobileMoreAnchorEl, setMobileMoreAnchorEl] = React.useState(null);

  const isMenuOpen = Boolean(anchorEl);
  const isMobileMenuOpen = Boolean(mobileMoreAnchorEl);

  const handleProfileMenuOpen = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleMobileMenuClose = () => {
    setMobileMoreAnchorEl(null);
  };

  const handleMenuClose = () => {
    setAnchorEl(null);
    handleMobileMenuClose();
  };

  const handleMobileMenuOpen = (event) => {
    setMobileMoreAnchorEl(event.currentTarget);
  };

  const handleLogOut = () => {
    dispatch(logOut());
    localStorage.removeItem('token');
    navigate("/");
  };
  const handleProfile = () => {
    navigate(`/users/${user?.id}`)
  };

  const menuId = "primary-search-account-menu";
  const renderMenu = (
    <Menu
      anchorEl={anchorEl}
      anchorOrigin={{
        vertical: "top",
        horizontal: "right",
      }}
      id={menuId}
      keepMounted
      transformOrigin={{
        vertical: "top",
        horizontal: "right",
      }}
      open={isMenuOpen}
      onClose={handleMenuClose}
    >
      <MenuItem onClick={handleProfile}><Avatar sx={{height:30,width:30,margin:1,marginLeft:'5px'}}/>{j==='e'?'Profile':'Profil'}</MenuItem>
      <MenuItem onClick={handleLogOut}><LogoutIcon sx={{height:30,width:30,margin:1,marginLeft:'5px'}}/>{j==='e'?'Log out':'Odjava'}</MenuItem>
    </Menu>
  );

  const mobileMenuId = "primary-search-account-menu-mobile";

  const renderMobileMenu = (
    <Menu
      anchorEl={mobileMoreAnchorEl}
      anchorOrigin={{
        vertical: "top",
        horizontal: "right",
      }}
      id={mobileMenuId}
      keepMounted
      transformOrigin={{
        vertical: "top",
        horizontal: "right",
      }}
      open={isMobileMenuOpen}
      onClose={handleMobileMenuClose}
    >
      {/*koje opcije da se prikazu kada kliknes 3 vertikalne tacke odnosno mobile menu*/}
      
      <MenuItem onClick={handleProfileMenuOpen}>
        <IconButton
          size="large"
          aria-label="account of current user"
          aria-controls="primary-search-account-menu"
          aria-haspopup="true"
          color="inherit"
        >
          <AccountCircle />
        </IconButton>
        <p>{j==='e'?'Profile':'Profil'}</p>
      </MenuItem>
      <MenuItem onClick={() => navigate("/create-event")}>
        <IconButton size="large" color="inherit">
          <AddCircleOutlineIcon />
        </IconButton>
        <p>{j==='e'?'Create Event':'Kreiraj Dogadjaj'}</p>
      </MenuItem>
      <MenuItem onClick={() => navigate("/Events")}>
        <IconButton size="large" color="inherit">
          <SearchIcon />
        </IconButton>
        <p>{j==='e'?'Find Event':'Pronadji event'}</p>
      </MenuItem>
    </Menu>
  );

  const [open, setOpen] = React.useState(false);
  const drawerWidth = 240;

  return (
    <div>
      <Box  >
        <AppBar position="fixed" style={{ backgroundColor: "rgb(27,27,27)" }}>
          <Toolbar>
            <Box sx={{ flex: 1, display: "flex", fontSize: 20 }}>
            
              <IconButton
                color="inherit"
                aria-label="open drawer"
                onClick={()=>setOpen(true)}
                edge="start"
                sx={{ mr: 2, ...(open && { display: 'none' }) }}
              >
                <MenuIcon />
              </IconButton>
              
              <Box
                sx={{ height: "60px", filter: "brightness(1.1)" }}
                component="img"
                src="/onepirate/golden-state-warriors.svg"
              ></Box>
              <Box sx={{ marginTop: "15px" }}>{" 2022 NBA "}</Box>
              <EmojiEventsIcon
                fontSize="large"
                color="warning"
                sx={{ marginTop: "10px" }}
              />
            </Box>
            <Box sx={{display:'flex',flexGrow:1,justifyContent:'end',paddingRight:'100px'}}>
              <Link
                variant="h6"
                underline="none"
                color="warning.main"
                
                sx={{ fontSize: 25 }}
                
                onClick={()=>handleLogOut()}
              >
                <SportsBasketballIcon fontSize="medium" />
                {j==='e'?"PLAY BASKETBALL":"IGRAJ KOSARKU"}
              </Link>
            </Box>

            <Box sx={{ display: { xs: "none", md: "flex" },flexGrow:1,justifyContent:'end' }}>
              <Button color="inherit" variant="outlined" onClick={() => navigate("/Events")}>
                Find Event
              </Button>
              <Button color="inherit" onClick={() => navigate("/create-event")}>
                Create Event
              </Button>

              
              <IconButton
                size="large"
                edge="end"
                aria-label="account of current user"
                aria-controls={menuId}
                aria-haspopup="true"
                onClick={handleProfileMenuOpen}
                color="inherit"
              >
                <Avatar src={user.imageUrl}/>
              </IconButton>
            </Box>
            <Box sx={{ display: { xs: "flex", md: "none" } }}>
              <IconButton
                size="large"
                aria-label="show more"
                aria-controls={mobileMenuId}
                aria-haspopup="true"
                onClick={handleMobileMenuOpen}
                color="inherit"
              >
                <MoreIcon />
              </IconButton>
            </Box>
          </Toolbar>
        </AppBar>
        {renderMobileMenu}
        {renderMenu}
      </Box>
      <Toolbar />

      {user?.role?.id===1080?
        <Drawer
        sx={{
          width: drawerWidth,
          flexShrink: 0,
          '& .MuiDrawer-paper': {
            width: drawerWidth,
            boxSizing: 'border-box',
          },
        }}
        variant="persistent"
        anchor="left"
        open={open}
      >
        <Box sx={{display: 'flex',alignItems: 'center',justifyContent: 'flex-end',backgroundColor:'#fff5f8'}}>
        <AdminPanelSettingsIcon/> <Typography sx={{paddingLeft:1, paddingTop:2.5, paddingBottom:2.5,paddingRight:4}} > Hello Admin! </Typography> 
          <IconButton onClick={()=>setOpen(false)}>
            <ChevronLeftIcon /> 
          </IconButton>
        </Box>
        <Divider />
        <List>
        
            <ListItem disablePadding>
              <ListItemButton>
                <ListItemIcon>
                  <PeopleAltTwoToneIcon />
                </ListItemIcon>
                <ListItemText primary={"Users list"} onClick={()=>navigate('/users')} />
              </ListItemButton>
            </ListItem>
          
        </List>
        <Divider />
        <List>

            <ListItem disablePadding>
                  <ListItemButton>
                    <ListItemIcon>
                      <QueryStatsRoundedIcon />
                    </ListItemIcon>
                    <ListItemText primary={"Dashboard"} onClick={()=>navigate('/dashboard')} />
                  </ListItemButton>
                </ListItem>
            </List>

      </Drawer>
      :null
      }


    </div>
  );
}
