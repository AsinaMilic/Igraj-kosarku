import React from 'react'
import { useState } from 'react';
import {Box,Button,Card,CardContent,CardHeader,Divider,Grid,TextField} from '@mui/material';
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
import { useDeleteUserMutation, usePutUserMutation } from '../../api/apiSlice';
import { useNavigate } from 'react-router-dom';

export const AccountProfileDetails = ({user,ZaUredjajem}) => {
  //const [values, setValues] = useState(user);
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

  const [putUser]=usePutUserMutation()
  const navigate=useNavigate()

  let readOnly=  !(user?.id===ZaUredjajem?.id)  //readOnly ako korisnik ne edituje samog sebe
  if(ZaUredjajem?.id===1)
    readOnly=false  //nije ako je admin
  if(ZaUredjajem?.id==null)
    readOnly=true   //jeste ako je samo posetilac
    
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

  const saveDetails=()=>{
   // console.log(user.id)
   // console.log(firstName)
   // console.log(lastName)
   // console.log(profileName)
    //console.log(status)
   // console.log(location)
   // console.log(email)
   // console.log(phoneNumber)
   // console.log(description)
   // console.log(specialties)
    //console.log(role)

    let specijalnosti=''
    chipData.forEach(obj=>{
        specijalnosti+=obj.label+','
    })
    //console.log(specijalnosti)
    specijalnosti=specijalnosti.slice(0, -1)
    //setSpecialties(specijalnosti) 
   // console.log(specijalnosti)
    const locationObj={
      name: location
    }
    const todo={
      firstName: firstName,
      lastName: lastName,
      profileName: profileName,
      status: status,
      location: locationObj,
      email: email,
      phone: phoneNumber.toString(),
      description: description,
      specialties: specijalnosti,
      roleId: role.id
    }
    const id=user?.id
    const obj={
      todo: todo,
      id: id
    }
    putUser(obj)
    window.location.reload()
  }

  return (
    <form autoComplete="off" noValidate>
      <Card>
        <CardHeader
          subheader="The information can be edited"
          title="Account"
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
                inputProps={{readOnly:readOnly}}
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
                inputProps={{readOnly:readOnly}}
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
                inputProps={{readOnly:readOnly}}
                disabled
                value={email}
                onChange={(e)=>setEmail(e.target.value)}
                defaultValue={user?.email}
                variant="outlined"
                helperText="Cannot be changed"
                InputProps={{
                  readOnly: true,
                }}
              />
            </Grid>
            <Grid item  md={6} xs={12} >
              <TextField
                fullWidth
                label="Profile Name"
                name="profile"
                inputProps={{readOnly:readOnly}}
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
                inputProps={{readOnly:readOnly}}
              />
            </Grid>
            <Grid item xs={12}>
              <Typography variant="body1"> Specialties: </Typography>
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
                    inputProps={{readOnly:readOnly}}
                  />
                </ListItem>
              );
            })}
            </Paper>
            </Grid>
            <Grid item xs={12}>
              <TextField
                    label="Your Biography"
                    placeholder="Bio"
                    fullWidth
                    multiline
                    rows={3}
                    variant="filled"
                    inputProps={{readOnly:readOnly}}
                    value={description}
                    onChange={(e)=>setDescription(e.target.value)}
                    defaultValue={user?.description}
                />
            </Grid>
          </Grid>
        </CardContent>
        {readOnly?null:<>
        <Divider />
        <Box sx={{ display: 'flex', justifyContent: 'flex-end', p: 2}} >
          <Button variant="outlined" onClick={()=>setOpen(true)} style={{color:'#ffb25e',marginRight:10}}>
            become a coach
            </Button>
            <Dialog  open={open}onClose={()=>setOpen(false)}>
                <DialogTitle >
                {"Are you a basketball coach?"}
                </DialogTitle>
                <DialogContent>
                <DialogContentText >
                    You are going to be a coach but our administrators will have to check that.
                    If approved, you will receive new feature to make a new training sessions!
                    Press SAVE DETAILS
                </DialogContentText>
                </DialogContent>
                <DialogActions>
                <Button onClick={()=>setOpen(false)}>Disagree</Button>
                <Button onClick={handleClose} autoFocus>Agree</Button>
                </DialogActions>
            </Dialog>

          <Button color="primary"variant="contained" onClick={saveDetails}>
            Save details
          </Button>
        </Box>
        </>
        }
      </Card>
    </form>
  );
};
