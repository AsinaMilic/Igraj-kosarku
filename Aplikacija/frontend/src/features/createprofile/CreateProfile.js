import React from 'react'
import { Field, Form ,FormSpy } from 'react-final-form';
import { useSelector } from "react-redux";
import { selectCurrentUser,selectCurrentToken } from '../auth/authSlice';
import { usePutUserMutation } from '../../api/apiSlice';

import RFTextField from "../../modules/form/RFTextField";
import { Grid,Box,Link } from "@mui/material";
import RadioGroup from '@mui/material/RadioGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import Radio from '@mui/material/Radio';
import { FormLabel } from "@mui/material";

import withRoot from "../../modules/withRoot";

import AppAppBarLogin from "../../modules/views/AppAppBarLogged";
import AppFooter from "../../modules/views/AppFooter";
import AppForm from "../../modules/views/AppForm";
import FormButton from "../../modules/form/FormButton";
import Typography from "../../modules/components/Typography";

import TextField from '@mui/material/TextField';
import AccountCircle from '@mui/icons-material/AccountCircle';
import InputAdornment from '@mui/material/InputAdornment';
import ContactPhoneIcon from '@mui/icons-material/ContactPhone';

import CountrySelect from './CountrySelect'
import CheckboxesTags from './CheckboxesTags';
import Snackbar from '../../modules/components/Snackbar';
import { useNavigate } from 'react-router-dom';
import FormFeedback from '../../modules/form/FormFeedback';


const CreateProfile = () => {
  const [open, setOpen] = React.useState(false);
  const [sent, setSent] = React.useState(false);
  
  const [Prephone,setPrephone]=React.useState('')
  const [phone,setPhone]=React.useState('')
  const [location,setLocation]=React.useState('')
  const [role,setRole]=React.useState(3636)
  const [specialties,setSpecialties]=React.useState('')
  const [description,setDescription]=React.useState('')

  const [putUser]=usePutUserMutation()
  const user=useSelector(selectCurrentUser)
  const navigate=useNavigate()

  const ProfilePlaceHolder= `EX: ${user.firstName} ${user.lastName}`
  

  let profileName
  const validate=(values)=>{
    profileName=values.profilename
    console.log(phone)
    console.log(location)
  }

  const CoachClick=(val)=>{
    setOpen(true);
    setRole(val)
  }
  
  const handleSubmit= async(e) =>{
    e.preventDefault();
    console.log(user.id)
    console.log(role)
    console.log(specialties)
    let status=  role===2300?'pending':null
    console.log(status)
    const todo={
      // id:user.id, //pazi
      email: user.email,
      firstName: user.firstName,
      lastName: user.lastName,
      location: location,
      roleId: role, //dovrsi
      status: role===2300? 'pending':null,
      phone: phone,
      description: description,
      specialties: specialties,
      profileName: profileName
    }
    const obj={
      todo: todo,
      id: user.id
    }
    putUser(obj)
    setSent(true);
    navigate('/Events')
    
      
  }
  

  return (
  <>
  <AppAppBarLogin/>
      <AppForm size="md">
      <Typography variant="h2"  align="center"> Create Your Profile</Typography>
          <Form onSubmit={handleSubmit}
                subscription={{ submitting: true }} 
                validate={validate}>
          {({ handleSubmit: handleSubmit2,submitting }) => ( 
            <Box component="form" onSubmit={handleSubmit2} noValidate sx={{ mt: 5 }}>
          
            <Grid container spacing={1} >
              <Grid item xs={12} >
                  <Field
                      autoFocus
                      component={RFTextField}
                      disabled={submitting || sent}
                      fullWidth
                      autoComplete="given-name"
                      label="Profile name"
                      name="profilename"
                      placeholder= {ProfilePlaceHolder}
                      required
                      InputProps={{
                        startAdornment: (
                          <InputAdornment position="start">
                            <AccountCircle />
                          </InputAdornment>
                        ),
                      }}
                  />
                  <Typography variant="caption" color="#c6e1f2"> A unique hande for your profile</Typography>
              </Grid>
              <Grid item xs={12} sm={6} mt={2}>
                 
                  <CountrySelect setPrephone={setPrephone} setLocation={setLocation}/>
                  <Typography variant="caption" color="#c6e1f2">Where do you live?</Typography>
                    
              </Grid>
              <Grid item xs={12} sm={6} mt={2}>
                  
                  <TextField
                    fullWidth='true'
                    label='Contact number'
                    placeholder={Prephone}
                    autoComplete='off'
                    value={phone}
                    onChange={(e)=>setPhone(e.target.value)}
                    InputProps={{
                      startAdornment: <InputAdornment position="start"><ContactPhoneIcon/></InputAdornment>,
                    }}
                     
                  />
                  
              </Grid>

              <Grid item xs={12} mb={1}>
                  <FormLabel id="demo-row-radio-buttons-group-label" ><Typography color="secondary"> Who are you:</Typography></FormLabel>
                  <RadioGroup
                      row
                      aria-labelledby="demo-row-radio-buttons-group-label"
                      name="row-radio-buttons-group"
                      disabled={submitting || sent}
                  >
                      <FormControlLabel value={3636} control={<Radio  color="secondary"/>} label="Player" onClick={()=>setRole(3636)}/>
                      <FormControlLabel value={2300} control={<Radio color="secondary" onClick={()=>CoachClick(2300)}/>} label="Coach/Field owner" />

                  </RadioGroup>
              </Grid>

              <Grid item> <Typography variant="overline" color="" > Choose your specialties:</Typography></Grid>

              <Grid item  xs={12}> {/*ovaj container mi omogucava flexibilnost */}
                  <CheckboxesTags specialties={specialties} setSpecialties={setSpecialties}/> 
              </Grid>
      
              <Grid item xs={12} mt={3}>
                  <TextField
                      label="Your Biography"
                      placeholder="Bio"
                      fullWidth
                      multiline
                      rows={5}
                      variant="filled" 
                      disabled={submitting || sent} 
                      value={description}
                      onChange={(e)=>setDescription(e.target.value)}
                  />
              </Grid>
              
              <Grid item xs={12} >
                  <Box>
                  <FormButton
                      onClick={handleSubmit} 
                      sx={{ mt: 3, mb: 2 }}
                      disabled={submitting || sent}
                      color="secondary"
                      fullWidth
                  >
                      {submitting || sent ? 'In progress…' : 'Create'}
                  </FormButton>
                  </Box>
              </Grid>
              <FormSpy subscription={{ submitError: true }}>
                {({ submitError }) =>
                  submitError ? (
                    <FormFeedback error sx={{ mt: 2 }}>
                      {submitError}
                    </FormFeedback>
                  ) : null
                }
              </FormSpy>

            </Grid>     
            </Box>
          )}
          </Form>
      </AppForm>
  <AppFooter color='#feeac6'/> {/*iz nekog razloga mora passujem tu roze boju=fff5f8*/}
  <Snackbar
        open={open}
        closeFunc={()=>setOpen(false)}
        message={'Every coach will be inspected by administrators'}
      />
  </>
  );
} 

export default withRoot(CreateProfile);
