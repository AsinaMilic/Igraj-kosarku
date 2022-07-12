import {useState} from 'react'

import { Field, Form,FormSpy } from 'react-final-form';

import { useSelector,useDispatch } from "react-redux";
import {setEvent} from './CreateEventSlice'
import { selectCurrentUser } from '../auth/authSlice';
import { selectCurrentLocation } from '../map/GoogleMapSlice';

import RFTextField from "../../modules/form/RFTextField";
import { Grid,Box } from "@mui/material";

import withRoot from "../../modules/withRoot";
import AppAppBarLogin from "../../modules/views/AppAppBarLogged";
import AppFooter from "../../modules/views/AppFooter";
import AppForm from "../../modules/views/AppForm";
import FormButton from "../../modules/form/FormButton";
import Typography from "../../modules/components/Typography";
import FormFeedback from '../../modules/form/FormFeedback';

import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider'; //formatiranje vremena za lokoalno podrucije
import { DateTimePicker } from '@mui/x-date-pickers/DateTimePicker';

import TextField from '@mui/material/TextField';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import Select, { SelectChangeEvent } from '@mui/material/Select';
import { selectCurrenEvent } from './CreateEventSlice';

import Map from '../map/GoogleMap'
import index from '../map/indexx.css'


import { required} from '../../modules/form/validation' //T
import { usePostEventMutation } from '../../api/apiSlice';
import { useNavigate } from 'react-router-dom';

import SearchPlayers from './SearchPlayers';


const CreateEvent = () => {
  const navigate=useNavigate()
  const user=useSelector(selectCurrentUser);
  const loc=useSelector(selectCurrentLocation) //samo da vidim da li redux radi. Radi!
  const [sent, setSent] = useState(false);
 
  const [addEvent]=usePostEventMutation();

  const [eventName,setEventName]=useState('')
  const [type, setType] = useState('');
  const [nooPlayers, setNooPlayers] = useState(0);
  const [imgUrl, setImgUrl]=useState('')
  const [date, setDate] = useState(new Date())
  const [description,setDescription]=useState('')

  const [starPlayerId,setStarPlayerId]=useState(127)

  const handleChange = (e) => {setDescription(e.target.value) } //el stvr moralo ovako..

  const handleSubmit = async(e) =>{
    e.preventDefault()
    if(eventName && (typeof loc.lng=='number') && ( typeof loc.lat=='number')){
      //console.log(eventName)
     // console.log(description)
      //console.log(loc)
      //console.log(user.id)
     // console.log(date)
     // console.log(nooPlayers)
     // console.log(imgUrl)
// console.log(type)
      let SpecialEventName=eventName
      if(type==8){
        SpecialEventName='SPECIAL'+starPlayerId;
      }
      let lokacija={
        name: SpecialEventName,
        lat: loc.lat,
        lng: loc.lng
      }
      let Tip=parseInt(type)

      console.log(eventName)
      console.log(description)
      console.log(lokacija)
      console.log( user.id)
      console.log(date)
      console.log(nooPlayers)
      console.log(imgUrl)
      console.log(Tip)


      const nadam = addEvent({
        name:eventName,
        description: description,
        location: lokacija,
        createdByUserId: user.id,
        activityDateTime: date,
        numberOfPlayers: nooPlayers,
        url: imgUrl,
        categoryId: Tip,
        courtId:1
      })
      console.log(nadam)
      setSent(true);
      navigate('/Events');
    }else{
      console.log("a?")
    }
          
  }
  
  function isImage(URL) {
    return /\.(jpg|jpeg|png|webp|avif|gif|svg)$/.test(URL);
  }

  const validate = (values) => { 

    const errors=required(['event-name'],values) //ako je prazno samo mi kaze mu kaze da je required
    
    if (isImage(values.url)) 
      setImgUrl(values.url);
    else
        errors.url='Invalid URL'
    
    if(values.eventName ===' ' || values.eventName ==="  " || values.eventName===null ||values.eventName===undefined)
      errors.eventName='Invalid name'
    else
      setEventName(values.eventName)
    
    return errors; //mora da vrati errors
  };

  return (
    <>
      <AppAppBarLogin/> 
        <AppForm size="lg" >
          <Typography variant="h2"  align="center"> Create Your Event</Typography>

          <Form 
                onSubmit={handleSubmit}
                subscription={{ submitting: true }}
                validate={validate}
          >
          {({ handleSubmit: handleSubmit2,submitting }) => ( 
            <Box component="form" onSubmit={handleSubmit2} noValidate sx={{ mt: 4 }}>
                           
                <Grid container >
                  <Grid item xs={12} sm={6} mt={4.1}>
                      <Field
                          autoFocus
                          component={RFTextField}
                          
                          disabled={submitting || sent}
                          fullWidth
                          autoComplete="given-name"
                          name="eventName"
                          placeholder= "Event Name*"
                          required
                      />
                  </Grid>
                  <Grid item xs={12} sm={6} align='center' >
                  <Typography variant='body2' style={{fontSize:'23px'}}>Start time</Typography>
                  <LocalizationProvider dateAdapter={AdapterDateFns}>
                    <DateTimePicker
                      label="Date | Clock"
                      disabled={submitting || sent}
                      renderInput={(params) => <TextField {...params} helperText="mm/dd/year" />}
                      value={date}
                      onChange={(newValue) => { setDate(newValue) }}
                      required
                      
                    />
                    </LocalizationProvider>
                  </Grid>
                
                
                <Grid  container>
                  <Grid item xs={12} sm={6} md={6} >         
                    <InputLabel >Type of Basketball</InputLabel>
                    <Select
                      value={type}
                      label="Type of Basketball"
                      onChange={(e)=>{setType(e.target.value)}}
                      fullWidth
                      variant='filled'
                      disabled={submitting || sent}
                    >
                      <MenuItem value={1}>Casual</MenuItem>              
                      <MenuItem value={2}>1 vs 1</MenuItem>
                      <MenuItem value={3}>2 vs 2</MenuItem>
                      <MenuItem value={4}>3 vs 3</MenuItem>
                      <MenuItem value={5}>5 vs 5</MenuItem> 
                      <MenuItem value={7}>Competition</MenuItem>
                      <MenuItem value={6} sx={{background:"#FCD299"}}
                      disabled={user?.role?.id===2300 || user?.role?.id===1080?false:true}
                        >               Training session
                    </MenuItem>
                    <MenuItem value={8}  sx={{background:"#FF7F7F"}}
                      disabled={user?.role?.id===1080?false:true}
                        >               Special event
                    </MenuItem>
                  </Select>
                  </Grid>
                
                  <Grid item xs={12} sm={6} md={6} mt={3}  align='center'>  
                    <TextField
                        align='center' 
                        fullWidth
                        sx={{maxWidth:"250px"}}
                        value={nooPlayers}
                        onChange={(e)=>{setNooPlayers(e.target.value)}}
                        id="filled-number"
                        label="Number of Players"
                        disabled={submitting || sent}
                        type="number"
                        placeholder="2-50 Players"
                        InputLabelProps={{
                          shrink: true,
                        }}
                        variant="outlined"
                      />
                   
                  </Grid> 
                <Grid/>
              </Grid>
              <Grid item xs={12} mt={3}>
                {type==8? <SearchPlayers starPlayerId={starPlayerId} setStarPlayerId={setStarPlayerId}/>: null}
              </Grid>
                
                <Grid item xs={12} mt={1}>
                <Typography variant="caption" color="#c6e1f2"> Image for your event</Typography>
                    <Field
                        component={RFTextField}
                        disabled={submitting || sent}
                        fullWidth
                        autoComplete="given-name"
                        name="url"
                        placeholder= "Image URL"
                    />
                </Grid>

                <Grid item xs={12} mt={1} >
                <Typography variant="caption" color="#c6e1f2"> Describe your event</Typography>
                  <TextField
                      placeholder="Description"
                         
                      fullWidth  
                      multiline
                      rows={3}
                      variant="outlined" 
                      disabled={submitting || sent}
                      value={description}
                      onChange={(e)=>{handleChange(e)}}
                      
                  />
                <Grid/>

                <Grid item xs={12} mt={3} >
                <Typography variant="caption" color={loc.lat&&loc.lng?"#c6e1f2":"red"}> Mark exact position</Typography>
                  <Map/>
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
                
                <Box alignItems='center'>
                <Box>
                <Grid container xs={12} align='center'>
                <Grid item xs={12} mt={10} align='center'>
                  <FormButton
                    onClick={handleSubmit}        
                    sx={{ mt: 3, mb: 2,maxWidth:'600px' }}
                    disabled={submitting || sent}
                    size="large"
                    color="secondary"
                    fullWidth
                >
                  {submitting || sent ? 'In progress…' : 'Create and Publish'}
                </FormButton>
                </Grid>
                </Grid>
                </Box>
                </Box>
              </Grid>
              </Grid>
            </Box>
          )}
          </Form>
        </AppForm>   
      <AppFooter/>     
    </>
  )
}

export default withRoot(CreateEvent)
