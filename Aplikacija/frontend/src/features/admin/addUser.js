import React from 'react'
import { useState } from 'react';
import {Box,Button,Card,CardContent,CardHeader,Divider,Grid,IconButton,InputAdornment,OutlinedInput,TextField} from '@mui/material';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import { styled } from '@mui/material/styles';
import Chip from '@mui/material/Chip';
import Paper from '@mui/material/Paper';
import Typography from '@mui/material/Typography';

import CountrySelect from '../createprofile/CountrySelect';
import { useDeleteUserMutation, usePutUserMutation, useRegisterUserMutation } from '../../api/apiSlice';
import { useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { selectCurrentUser } from '../auth/authSlice';
import { isDisabled } from '@testing-library/user-event/dist/utils';
import CheckboxesTags from '../createprofile/CheckboxesTags';
import Visibility from '@mui/icons-material/Visibility';
import VisibilityOff from '@mui/icons-material/VisibilityOff';


export const AddUser = ({user}) => {
  const currentUser = useSelector(selectCurrentUser)
  const [firstName,setFirstName]=useState(user?.firstName)
  const [lastName,setLastName]=useState(user?.lastName)
  const [profileName,setProfileName]=useState(user?.profileName)
  const [status,setStatus]=useState(user?.status)
  const [location,setLocation]=useState('')
  const [email,setEmail]=useState(user?.email)
  const [phoneNumber,setPhoneNumber]=useState('')
  const [description,setDescription]=useState(user?.description)
  const [specialties,setSpecialties]=useState(user?.specialties)
  const [role,setRole]=useState(user?.role)
  const [password,setPassword]=useState('')
  const [showPassword,setShowPassword]=useState(false)

 
  const [registerUser]=useRegisterUserMutation()
  
  const SpecialtiesToObject=()=>{
    let obj=[];
    if(user?.specialties){
      let ArrSpecialties=user?.specialties.split(',')
      ArrSpecialties.map((specialtie,index)=>{
        obj.push({key: index, label: specialtie})
      })
      console.log(obj)
    }
    
    return obj;
  }
  const handleDelete = (chipToDelete) => () => {
    setChipData((chips) => chips.filter((chip) => chip.key !== chipToDelete.key));
  };
  const ListItem = styled('li')(({ theme }) => ({
    margin: theme.spacing(0.5),
  }));
  const [chipData,setChipData]=React.useState(SpecialtiesToObject())
  console.log(chipData)
  const [open, setOpen] = React.useState(false);
  const handleClose = () => {
    setOpen(false);
    setRole(2300);
    setStatus('pending')
  };


  const AddUserToDatabase= async()=>{
    let specijalnosti=''
      chipData.forEach(obj=>{
          specijalnosti+=obj.label+','
      })
      //console.log(specijalnosti)
      specijalnosti=specijalnosti.slice(0, -1)
      //setSpecialties(specijalnosti) 
      console.log(specijalnosti)
      console.log(profileName)
      const locationObj={
        name: location
      }
     
      try{
        await registerUser({
          firstName: firstName,
          lastName: lastName,
          profileName: profileName,
          status: status,
          location: locationObj,
          email: email,
          password: password,
          phone: phoneNumber.toString(),
          description: description,
          specialties: specijalnosti,
          role: role,
          
        })
      }catch(err){
        if(!err.reponse)
        alert('No Server Response');
      else if(err.reponse?.status===400)
        alert('Missing Username or Password');
      else if(err.reponse?.status===401)
        alert('Unauthorized')
      else
        alert('Login Failed')
      return false;
      }
      
      window.location.reload()
  }

  const coachQuestion=()=>{
    setRole(2300)
    setOpen(true)
  }


  return (
    <form autoComplete="off" noValidate>
      <Card >
        <CardHeader
          subheader="The information can be edited"
          title={currentUser.id!==1?"Account":"Add User"}
        />
        <Divider />
        <CardContent>
          <Grid  container spacing={3}  >
            <Grid item md={6}xs={12}>
              <TextField
                fullWidth
                helperText="Please specify the first name"
                label="First name"
                required
                
                value={firstName}
                onChange={(e)=>setFirstName(e.target.value)}
                defaultValue={user?.firstName}
                variant="standard"
              />
            </Grid>
            <Grid item md={6}xs={12} >
              <TextField
                fullWidth
                label="Last name"
                name="lastName"
                
                required
               
                value={lastName}
                onChange={(e)=>setLastName(e.target.value)}
                defaultValue={user?.lastName}
                variant="standard"
              />
            </Grid>
            <Grid item md={6} xs={12}>
              <TextField
                fullWidth
                label="Email Address"
                name="email"
                
                value={email}
                onChange={(e)=>setEmail(e.target.value)}
                defaultValue={user?.email}
                variant="outlined"
                helperText="Cannot be changed"
              
              />
            </Grid>
            <Grid item  md={6} xs={12} >
              <TextField
                fullWidth
                label="Profile Name"
                name="profile"
                
                required
                value={profileName}
                onChange={(e)=>setProfileName(e.target.value)}
                defaultValue={user?.profileName}
                variant="outlined"
              />
            </Grid>
            <Grid item md={6} xs={12} >
              <CountrySelect label={user?.location?.name} setLocation={setLocation}/>
            </Grid>
            <Grid item md={6} xs={12}>
              <TextField
                fullWidth
                label={user?.phoneNumber? user?.phoneNumber: 'No number'}
                name="phone"
                defaultValue={user?.phoneNumber}
                value={phoneNumber}
                onChange={(e)=>setPhoneNumber(e.target.value)}
                helperText="Private contact number"
                variant="outlined"
               
              />
            </Grid>
            <Grid item xs={12}>
              <Typography variant="body1"> Specialties: </Typography>
              {currentUser.id!==1?
            <Paper
                sx={{
                  display: 'flex',
                  flexWrap: 'wrap',
                  listStyle: 'none',
                  p: 0.5,
                  m: 0,
                }}
                component="ul"
             >       
              {chipData.map((data) => {
                let icon
                return (
                  <ListItem key={data.key}>
                    <Chip
                      icon={icon}
                      label={data.label}
                      onDelete={handleDelete(data)}
                      
                    />
                  </ListItem>
                );
              })}
              </Paper>
            :
              <CheckboxesTags/>
            }
            </Grid>
            <Grid item xs={12}>
              <TextField
                    label={currentUser?.id!==1?"Your Biography":"Add User Biography"}
                    placeholder="Bio"
                    fullWidth
                    multiline
                    rows={3}
                    variant="filled"
                  
                    value={description}
                    onChange={(e)=>setDescription(e.target.value)}
                    defaultValue={user?.description}
                />
            </Grid>
          </Grid>
        </CardContent>
        
        <Divider />
        <Box sx={{ display: 'flex', justifyContent: 'flex-end', p: 2}} >
              <OutlinedInput
              type={password ? 'text' : 'password'}
              value={password}
              onChange={(e)=>setPassword(e.target.value)}
              endAdornment={
                <InputAdornment position="end">
                  <IconButton
                    aria-label="toggle password visibility"
                    onClick={()=>setShowPassword(!showPassword)}
                    onMouseDown={(e)=>e.preventDefault()}
                    edge="end"
                  >
                    {showPassword ? <VisibilityOff /> : <Visibility />}
                  </IconButton>
                </InputAdornment>
              }
              label="Password"
              sx={{marginRight:"138px",width:'390px'}}
            />

            <Button variant="filled" onClick={()=>coachQuestion()} style={{backgroundColor:'#ffb25e',marginRight:10}}>
              coach?
            </Button>
           
            <Dialog  open={open}onClose={()=>setOpen(false)}>
                <DialogTitle >
                 Make him a Coach?
                </DialogTitle>
                <DialogContent>
                <DialogContentText >
                    Coaches have special features that can be abused
                </DialogContentText>
                </DialogContent>
                <DialogActions>
                <Button onClick={()=>setOpen(false)}>Disagree</Button>
                <Button onClick={handleClose} autoFocus>Agree</Button>
                </DialogActions>
            </Dialog>
          
          <Button color="success" variant="contained" onClick={AddUserToDatabase}>
            Add user to server
          </Button>
          
        </Box>
        
        
      </Card>
    </form>
  );
};


