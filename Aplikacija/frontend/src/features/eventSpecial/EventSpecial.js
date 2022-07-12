import React, { useEffect } from 'react'
import AppAppBar from '../../modules/views/AppAppBar'
import AppAppBarLogged from '../../modules/views/AppAppBarLogged'
import {useNavigate, useParams} from 'react-router-dom'
import CircleLoader from "react-spinners/ClipLoader";
import { useDeleteEventMutation, useGetEventQuery,useGetEventsQuery,usePostRateEventMutation } from '../../api/apiSlice'
import AppFooter from '../../modules/views/AppFooter';
import withRoot from '../../modules/withRoot';
import { Container,Typography,Box,Card,CardContent,Chip,Grid, CardMedia, Paper, Button, Divider,Fab,Avatar, Rating ,Link, listItemSecondaryActionClasses,} from '@mui/material';
import ListSubheader from '@mui/material/ListSubheader';
import List from '@mui/material/List';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import Collapse from '@mui/material/Collapse';
import InboxIcon from '@mui/icons-material/MoveToInbox';
import DraftsIcon from '@mui/icons-material/Drafts';
import SendIcon from '@mui/icons-material/Send';
import DeleteIcon from '@mui/icons-material/Delete';
import ExpandLess from '@mui/icons-material/ExpandLess';
import ExpandMore from '@mui/icons-material/ExpandMore';
import StarBorder from '@mui/icons-material/StarBorder';
import CommentForm from '../event/comments/commentForm';
import Map from '../map/GoogleMap'
import PeopleAltIcon from '@mui/icons-material/PeopleAlt'
import FaceIcon from '@mui/icons-material/Face'
import AccessAlarmIcon from '@mui/icons-material/AccessAlarm';
import SearchPlayers from '../createvent/SearchPlayers';
import LocalActivityTwoToneIcon from '@mui/icons-material/LocalActivityTwoTone';
import EmojiPeopleTwoToneIcon from '@mui/icons-material/EmojiPeopleTwoTone';
import SentimentVerySatisfiedTwoToneIcon from '@mui/icons-material/SentimentVerySatisfiedTwoTone';

import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';

import Weather from '../weather/Weather'
import CustomizedTimeline from './CustomizedTimeline';
import { useSelector } from 'react-redux';
import { selectCurrentUser } from '../auth/authSlice';
import Draggable from 'react-draggable';

import Slider from '@mui/material/Slider';
import * as NBAIcons from 'react-nba-logos';

const EventSpecial = () => {
  
  const navigate=useNavigate();
  const {id} = useParams();
  
  const {
    data: aktivnosti,
    isLoading,
    isSuccess,
    isError,
    error
} = useGetEventsQuery()


let content;
let contentSearchPlayers;


const [open, setOpen] = React.useState(true);

const [openDialog,setOpenDialog]=React.useState(false)

const [pokaziOcenjivanje,setPokaziOcenjivanje]=React.useState(true)
const [stars, setStars] = React.useState(2);

const [postRate]=usePostRateEventMutation()


const [Description,setDescription]=React.useState('sdfsdfsdf');
const [FeelsLike,setFeelsLike]=React.useState('');
const [IMG,setIMG]=React.useState('');

const [teamAbbrevation,setTeamAbbrevation]=React.useState('')
const [starPlayerId,setStarPlayerId]=React.useState('')

let EventSpecial=true;
const [lokacijaSaOpenCage,setLokacijaSaOpenCage]=React.useState('');

const [open2,setOpen2]=React.useState(false)
let fetchedLoc={}
const currentUser=useSelector(selectCurrentUser)
const [deleteEventMutation]=useDeleteEventMutation()

const [eventIdToDelete,setEventIdToDelete]=React.useState('')
const deleteEvent=(id)=>{
  setOpenDialog(true)
  setEventIdToDelete(id);
}

const ContentJSX=(aktivnost)=>{
  const user=aktivnost?.createdByUser 
  
  const formatDate=(date)=>{
    let vreme=new Date(date)
    let datum=vreme.toDateString()
    return `${datum} `
    }
  const formatTime=(date)=>{
      let vreme=new Date(date)
      let sati=vreme.getHours()
      let minuti=vreme.getMinutes()
      return `${sati}:${minuti} `
  }

  const doKreatoraEventa=(id)=>{
      navigate(`/users/${id}`)
  }
  
  const sendRate=(newValue)=>{
    setOpen2(true)
    setPokaziOcenjivanje(false)
    console.log(newValue);
    setStars(newValue)
    console.log(stars)
    const obj={
        rate: newValue,
        id: aktivnost.id
    }
    console.log(obj)
    postRate(obj)
  }
  return(
  <React.Fragment key={aktivnost?.id}>
    <Grid container>
      <Grid item xs={9}>
        <Typography  variant="h4" mt={2} align='start'>{aktivnost?.name} </Typography>
      </Grid>
      {currentUser?.role?.id==1080?
      <Grid item xs={3}>
        <Button variant="outlined" 
          sx={{marginTop:'20px',marginLeft:'50px',color:'red'}}
          startIcon={<DeleteIcon />}
          onClick={()=>deleteEvent(aktivnost?.id)}
        >
          Delete Event
        </Button>
      </Grid>:null}
    </Grid>
    <Box  display="flex" flexDirection="column">
        <Card >
            <CardContent >
              
                <Grid container xs={12}  sx={{flexDirection:'row',justifyContent:'center'}} >

                <Grid item xs={12} md={6}>
                    {aktivnost?.rating?<Paper sx={{display:'flex',justifyContent:'center'}}>                                                                    
                        <Typography mt={1} ml={1}align='center'> Rate for this event is: </Typography> 
                        <Rating value={aktivnost?.rating} precision={0.5} size="large" readOnly={true}/>
                    </Paper>
                    :null
                    }
                    
                  
                </Grid>
                    <Card sx={{marginBottom:1,marginTop:2}}>
                        <CardMedia 
                            component="img" 
                            image={aktivnost.url?aktivnost?.url:"/onepirate/no-photo.svg"}   
                            sx={{ maxHeight: '400px' }}
                        />
                        
                        
                    </Card>
                    
                    <Grid item xs={11}>
                      <Box sx={{display:'flex',justifyContent:'center'}}>
                        {AbbrToLogo(teamAbbrevation)}
                      </Box>
                      <List
                        sx={{ width: '100%',  bgcolor: 'background.paper' }}
                        component="nav"
                        aria-labelledby="nested-list-subheader"
                        subheader={
                          <ListSubheader component="div" id="nested-list-subheader">
                            What is this?
                          </ListSubheader>
                        }
                      >
                        <ListItemButton sx={{backgroundColor:'#fff0f3'}}>
                          <ListItemIcon>
                            <LocalActivityTwoToneIcon fontSize='large'/>
                          </ListItemIcon>
                          <ListItemText primary="This is a special event for basketball stars and fans" />
                        </ListItemButton>
                        <ListSubheader component="div" id="nested-list-subheader">
                            What can i do?
                          </ListSubheader>
                        <ListItemButton sx={{backgroundColor:'#fff0f3'}}>
                          <ListItemIcon>
                            <SentimentVerySatisfiedTwoToneIcon fontSize='large' />
                          </ListItemIcon>
                          <ListItemText primary="Anything! Just make sure you respect celebrity's personal space" />
                        </ListItemButton>
                        <ListSubheader component="div" id="nested-list-subheader">
                            Who is going to be there?
                          </ListSubheader>
                        <ListItemButton onClick={()=> setOpen(!open)} sx={{backgroundColor:'#fff0f3'}}>
                          <ListItemIcon>
                            <EmojiPeopleTwoToneIcon fontSize='large'/>
                          </ListItemIcon>
                          <ListItemText primary="Anyone who is interested can join" />
                          {open ? <ExpandLess /> : <ExpandMore />}
                        </ListItemButton>
                        <Collapse in={open} timeout="auto" unmountOnExit>
                          <List component="div" disablePadding>
                            <ListItemButton sx={{ pl: 4 }}>
                              <ListItemIcon>
                                <StarBorder fontSize='large'/>
                              </ListItemIcon>
                              <ListItemText primary="Basketball star" />
                            </ListItemButton>
                          </List>
                        </Collapse>
                    </List>
                    <Typography mt={3} variant='h6'>Baksetball star stats</Typography>
                    
                    {contentSearchPlayers}
                  </Grid>

                  
                    <Grid container xs={12} md={11} sx={{fontSize:'20px'}} mt={3}>
                      
                        <Grid item xs={6} p={2.5}>                             
                                <Chip sx={{fontSize:'20px'}} label="Type of Activity "> </Chip>
                            <Typography sx={{fontSize:'20px'}} pl={2.5}>{aktivnost?.category?.text}  </Typography> 
                        </Grid>
                        <Grid item xs={6} align='end' p={2.5} >                             
                                <Chip  sx={{fontSize:'20px'}} label="Start Date "> </Chip>
                            <Typography sx={{fontSize:'20px'}}> {formatDate(aktivnost?.activityDateTime)}  </Typography>
                            <Typography sx={{fontSize:'20px'}}><AccessAlarmIcon sx={{paddingTop:1}}/> {formatTime(aktivnost?.activityDateTime)}  </Typography>  
                        </Grid>
                        
                        <Grid item xs={6} md={6} p={2.5} >                             
                                <Chip sx={{fontSize:'20px'}} label="Description "/>
                            <Typography sx={{fontSize:'20px'}}> {aktivnost?.description}  </Typography> 
                        </Grid>
                        <Grid item xs={6} md={6} align='end' p={2.5}>                             
                                <Chip  sx={{fontSize:'20px'}} label="Location "> </Chip>
                            <Typography sx={{fontSize:'20px'}}> {lokacijaSaOpenCage}  </Typography> 
                        </Grid> 
                        <Grid item xs={6} md={6} p={2.5}>                             
                                <Chip sx={{fontSize:'20px'}} label="Number of players "> </Chip>
                            <Typography>
                                    <Chip sx={{fontSize:'20px'}} variant="outlined" icon={<PeopleAltIcon/>} label={aktivnost?.numberOfPlayers}/>
                            </Typography>
                        </Grid>
                        <Grid item xs={6} md={6} align='end' p={2.5} sx={{fontSize:'20px'}}>                             
                                <Chip  label="Hosted by " sx={{fontSize:'20px'}}/>
                                <Typography sx={{fontSize:'20px'}}>
                                    {user?.profileName ?
                                        <Chip icon={<FaceIcon />} label={`${user?.profileName}`} variant="outlined" onClick={()=>doKreatoraEventa(user?.id)}/>
                                        : <Chip icon={<FaceIcon />} label={`${user?.firstName} ${user?.lastName}`} variant="outlined" onClick={()=>doKreatoraEventa(user?.id)}/>
                                    }
                                </Typography>
                        </Grid>
                        <Grid item xs={12} md={12} p={2.5}>
                            <Paper >
                                <Grid container sx={{display:'flex',alignItems:'center',justifyContent:'center'}}>
                                    <Grid item xs={10} sx={{display:'flex',justifyContent:'center',flexDirection:'column',alignItems:'center'}}>
                                        <Typography align='center' > Temprature will be around: {FeelsLike} C°, {Description}</Typography>
                          
                                          {FeelsLike?DiscreteSliderLabel():null}

                                    </Grid>
                                    <Grid item xs={2}  sx={{display:'flex',alignItems:'center',justifyContent:'center'}} >
                                        <img src ={`http://openweathermap.org/img/w/${IMG}.png`} alt="weather img" />
                                    </Grid>
                                </Grid>
                            </Paper>
                            <Box sx={{display:'flex',justifyContent:'center'}}> 
                            
                            </Box>
                        </Grid>
                    </Grid>
                    
                    
                    
                    <Grid item xs={12} md={6}>
                    {pokaziOcenjivanje && localStorage.getItem('token')?<Paper sx={{display:'flex',justifyContent:'center'}}>                                                                    
                        <Typography mt={1} ml={1} align='center'> You can rate this event:</Typography> 
                        <Rating name="simple-controlled" value={stars} precision={0.5} size="large"  onChange={(event, newValue)=>{sendRate(newValue)}} />
                    </Paper>:null
                    }
                    </Grid>
                </Grid>
            </CardContent>
            
            <Paper variant="outlined">
                <Typography variant='caption' color="orange" ml={1}> Click on the map to see the exact location</Typography>
                <Grid container xs={12} style={{padding:'5px',border: `0 5 5 5px solid #fffcdd`}}>
                    <Map fetchedLoc={fetchedLoc} />
                </Grid>
            </Paper>

            <CardContent>
                
                <CustomizedTimeline time={aktivnost?.activityDateTime}/>
    
            </CardContent>
        </Card>
        <CommentForm/>
      </Box>
  </React.Fragment>)
}

if(isLoading) {
content=<Grid item xs={12} sx={{display:'flex',justifyContent:'center'}}>
            <CircleLoader loading={isLoading} color="red" size={150} />
        </Grid>
}
if(isSuccess){
  content=null;
  console.log(aktivnosti)
  content=aktivnosti.map(activity=>{
    if(activity?.location?.name.includes('SPECIAL')) {
      fetchedLoc={
        lat: activity?.location?.lat,
        lng: activity?.location?.lng,
      }
      //radi
      Weather(activity?.activityDateTime, fetchedLoc.lat,fetchedLoc.lng,setIMG,setDescription,setFeelsLike)
      let starId=(activity?.location?.name.split('SPECIAL')[1])
      contentSearchPlayers=<SearchPlayers starPlayerId={starId} setStarPlayerId={setStarPlayerId} EventSpecial={EventSpecial} setTeamAbbrevation={setTeamAbbrevation}/>
      
      fetch(`https://api.opencagedata.com/geocode/v1/json?q=${fetchedLoc.lat}+${fetchedLoc.lng}&key=302b897ab78a4ce29a5a0228ae98c520`)
      .then(function(resp) { return resp.json() })
      .then(function(data) { 
        console.log(data)
        setLokacijaSaOpenCage(data?.results[0]?.formatted)
        console.log(lokacijaSaOpenCage);
      })
      return ContentJSX(activity)
    }
  })
}
  
  return (
    <>
      {localStorage.getItem('token')?<AppAppBarLogged/>:<AppAppBar/>} 
      <Container maxWidth='md'>
                {content}
      </Container>
      <AppFooter/>


      <div>
        <Dialog
            open={openDialog}
            onClose={()=>setOpenDialog(false)}
            PaperComponent={PaperComponent}
            aria-labelledby="draggable-dialog-title"
        >
            <DialogTitle style={{ cursor: 'move' }} id="draggable-dialog-title">
            Delete Special Event
            </DialogTitle>
            <DialogContent>
            <DialogContentText>
                You are deleting this special event. You are going to remove everything about this activity. Changes cannot be undone!
            </DialogContentText>
            </DialogContent>
            <DialogActions>
            <Button autoFocus onClick={()=>setOpenDialog(false)} variant="outlined">
                Cancel
            </Button>
            <Button onClick={()=>{
                setOpenDialog(false)
                deleteEventMutation(eventIdToDelete)
                navigate('/Events');
            }} 
            variant="outlined">
                Confirm
            </Button>
            </DialogActions>
        </Dialog>
        </div>
    </>
  )

  function valuetext(value) {
    return `${value}°C`;
  }
   function DiscreteSliderLabel() {
    let temp= parseInt(FeelsLike/40 * 100)
    console.log(temp)
    console.log(FeelsLike)
    return (
      <Box sx={{ width:'80%',display:'flex',marginLeft:'0px',justiftyContent:'center' }}>
        <Slider
          aria-label="Always visible"
          defaultValue={[parseInt(FeelsLike/40 * 100)-5,parseInt(FeelsLike/40 * 100)+5]}
          getAriaValueText={valuetext}
          step={1}
          marks={marks}
  
          sx={{color:'red'}}
        />
      </Box>
    );
  }
  
}

export default withRoot(EventSpecial)


function PaperComponent(props) { //pomeranje open dialoga
  return (
    <Draggable
      handle="#draggable-dialog-title"
      cancel={'[class*="MuiDialogContent-root"]'}
    >
      <Paper {...props} />
    </Draggable>
  );
}


const marks = [
  {
    value: 0,
    label: '0°C',
  },
  {
    value: 20,
    label: '10°C',
  },
  {
    value: 40,
    label: '15°C',
  },
  {
    value: 60,
    label: '20°C',
  },
  {
    value: 70,
    label: '25°C',
  },
  {
    value: 80,
    label: '30°C',
  },
  {
    value: 90,
    label: '35°C',
  },
  
  {
    value: 100,
    label: '40°C',
  },
  
];

function AbbrToLogo(abbr){
  if(abbr==='ATL') return <NBAIcons.ATL />
  else if(abbr==='BOS') return <NBAIcons.BOS/>
  else if(abbr==='CHA') return <NBAIcons.CHA/>
  else if(abbr==='CHI') return <NBAIcons.CHI/>
  else if(abbr==='CLE') return <NBAIcons.CLE/>
  else if(abbr==='DAL') return <NBAIcons.DAL/>
  else if(abbr==='DEN') return <NBAIcons.DEN/>
  else if(abbr==='DET') return <NBAIcons.DET/>
  else if(abbr==='GSW') return <NBAIcons.GSW/>
  else if(abbr==='HOU') return <NBAIcons.HOU/>
  else if(abbr==='IND') return <NBAIcons.IND/>
  else if(abbr==='LAC') return <NBAIcons.LAC/>
  else if(abbr==='LAL') return <NBAIcons.LAL/>
  else if(abbr==='MEM') return <NBAIcons.MEM/>
  else if(abbr==='MIA') return <NBAIcons.MIA/>
  else if(abbr==='MIL') return <NBAIcons.MIL/>
  else if(abbr==='MIN') return <NBAIcons.MIN/>
  else if(abbr==='NOP') return <NBAIcons.NOP/>
  else if(abbr==='NYK') return <NBAIcons.NYK/>
  else if(abbr==='BKN') return <NBAIcons.BKN/>
  else if(abbr==='OKC') return <NBAIcons.OKC/>
  else if(abbr==='ORL') return <NBAIcons.ORL/>
  else if(abbr==='PHI') return <NBAIcons.PHI/>
  else if(abbr==='PHX') return <NBAIcons.PHX/>
  else if(abbr==='POR') return <NBAIcons.POR/>
  else if(abbr==='SAC') return <NBAIcons.SAC/>
  else if(abbr==='TOR') return <NBAIcons.TOR/>
  else if(abbr==='UTA') return <NBAIcons.UTA/>
  else if(abbr==='WAS') return <NBAIcons.WAS/>
  console.log(abbr)
}

