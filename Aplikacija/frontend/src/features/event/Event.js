    import React, { useEffect } from 'react'
    import {useNavigate, useParams} from 'react-router-dom'
    import AppAppBarLogged from '../../modules/views/AppAppBarLogged'
    import AppAppBar from '../../modules/views/AppAppBar'
    import AppFooter from '../../modules/views/AppFooter'
    import withRoot from '../../modules/withRoot';
    import CircleLoader from "react-spinners/ClipLoader";
    import { useSelector } from 'react-redux'
    import {selectCurrentToken, selectCurrentUser} from '../auth/authSlice'
    import { useGetEventQuery,usePostRateEventMutation } from '../../api/apiSlice'

    import { Container,Typography,Box,Card,CardContent,Chip,Grid, CardMedia, Paper, Button, Divider,Fab,Avatar, Rating ,Link, listItemSecondaryActionClasses,} from '@mui/material';
    //import {Link} from 'react-router-dom'
    import PeopleAltIcon from '@mui/icons-material/PeopleAlt'
    import FaceIcon from '@mui/icons-material/Face'

    import Map from '../map/GoogleMap'
    import CommentForm from './comments/commentForm';

    import AccessAlarmIcon from '@mui/icons-material/AccessAlarm';
   
    import Snackbar from '../../modules/components/Snackbar'
    import Weather from '../weather/Weather'
    import MuiAlert from '@mui/material/Alert';

    import Teams from './Teams'

    const Alert = React.forwardRef(function Alert(props, ref) {
        return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
    });

    const Event = () => {
        const navigate= useNavigate()
        const {id} = useParams(); //uzima .../:id
       
        const [open2,setOpen2]=React.useState(false)
        const [pokaziOcenjivanje,setPokaziOcenjivanje]=React.useState(true)
        const [stars, setStars] = React.useState(2);

        const [postRate]=usePostRateEventMutation()
        const readOnly= (localStorage.getItem('token')==null)

        const [Description,setDescription]=React.useState('');
        const [FeelsLike,setFeelsLike]=React.useState('');
        const [IMG,setIMG]=React.useState('');
        const [lokacijaSaOpenCage,setLokacijaSaOpenCage]=React.useState('');
        

        const {
            data: aktivnost,
            isLoading,
        } = useGetEventQuery(id)
        console.log(aktivnost)

        const user=aktivnost?.createdByUser   
        

        const fetchedLoc={
            lat: aktivnost?.location?.lat,
            lng: aktivnost?.location?.lng,
        }
        fetch(`https://api.opencagedata.com/geocode/v1/json?q=${fetchedLoc.lat}+${fetchedLoc.lng}&key=302b897ab78a4ce29a5a0228ae98c520`)
        .then(function(resp) { return resp.json() })
        .then(function(data) { 
            console.log(data)
            setLokacijaSaOpenCage(data?.results[0]?.formatted)
            console.log(lokacijaSaOpenCage);
        })

        Weather(aktivnost?.activityDateTime, fetchedLoc.lat,fetchedLoc.lng,setIMG,setDescription,setFeelsLike)
    

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
        const handleClose = (event, reason) => {
            if (reason === 'clickaway') return;
            setOpen2(false);
        };
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
       
    
    return (
        <>
            {localStorage.getItem('token')?<AppAppBarLogged/>:<AppAppBar/>} 
                <Container maxWidth='lg'>
                {isLoading? <Box sx={{width:'100%',height:'50vh',display:'flex',justifyContent:'center'}}><CircleLoader loading={isLoading} color="red" size={250} /></Box>
                        :
                <>
                <Typography  variant="h4" mt={2}>{aktivnost?.name}</Typography>
                    <Box  display="flex" flexDirection="column">
                        <Card >
                            <CardContent >
                                <Grid container xs={12}  >
                                    <Grid container xs={12} md={6}  >
                                        <Grid item xs={6} >                             
                                                <Chip  label="Type of Activity "> </Chip>
                                            <Typography pl={2.5}>{aktivnost?.category?.text}  </Typography> 
                                        </Grid>
                                        <Grid item xs={6} align='center'>                             
                                                <Chip  label="Start Date "> </Chip>
                                            <Typography> {formatDate(aktivnost?.activityDateTime)}  </Typography>
                                            <Typography ><AccessAlarmIcon sx={{paddingTop:1}}/> {formatTime(aktivnost?.activityDateTime)}  </Typography>  
                                        </Grid>
                                        
                                        <Grid item xs={6} md={6}>                             
                                                <Chip  label="Description "/>
                                            <Typography pl={2.5}> {aktivnost?.description}  </Typography> 
                                        </Grid>
                                        <Grid item xs={6} md={6} align='center'>                             
                                                <Chip  label="Location "> </Chip>
                                            <Typography> {lokacijaSaOpenCage}  </Typography> 
                                        </Grid> 
                                        <Grid item xs={6} md={6} >                             
                                                <Chip  label="Number of players "> </Chip>
                                            <Typography>
                                                    <Chip sx={{marginLeft:2.5}} variant="outlined" icon={<PeopleAltIcon/>} label={aktivnost?.numberOfPlayers}/>
                                            </Typography>
                                        </Grid>
                                        <Grid item xs={6} md={6} align='center' >                             
                                                <Chip  label="Hosted by "/>
                                                <Typography>
                                                    {user?.profileName ?
                                                        <Chip icon={<FaceIcon />} label={`${user?.profileName}`} variant="outlined" onClick={()=>doKreatoraEventa(user?.id)}/>
                                                        : <Chip icon={<FaceIcon />} label={`${user?.firstName} ${user?.lastName}`} variant="outlined" onClick={()=>doKreatoraEventa(user?.id)}/>
                                                    }
                                                </Typography>
                                        </Grid>
                                        <Grid item xs={12} md={10} >
                                            <Paper >
                                                <Grid container sx={{display:'flex',alignItems:'center',justifyContent:'center'}}>
                                                    <Grid item xs={10}>
                                                        <Typography align='center' > Temprature feels like: {FeelsLike} C°, {Description}</Typography>
                                                    </Grid>
                                                    <Grid item xs={2}  sx={{display:'flex',alignItems:'center',justifyContent:'center'}} >
                                                        <img src ={`http://openweathermap.org/img/w/${IMG}.png`} alt="weather img" />
                                                    </Grid>
                                                </Grid>
                                            </Paper>
                                        </Grid>
                                    </Grid>
                                    
                                    
                                    <Grid item xs={12} md={6}>
                                    {aktivnost?.rating?<Paper sx={{display:'flex',justifyContent:'center'}}>                                                                    
                                        <Typography mt={1} ml={1} align='center'> Rate for this event is: </Typography> 
                                        <Rating value={aktivnost?.rating} precision={0.5} size="large" readOnly={true}/>
                                    </Paper>:null
                                    }

                                    <Card sx={{marginBottom:1}}>
                                        <CardMedia
                                            component="img" 
                                            image={aktivnost.url?aktivnost?.url:"/onepirate/no-photo.svg"}   
                                            sx={{ maxHeight: '400px' }}
                                        />
                                    </Card>

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
                                
                                <Teams teams={aktivnost?.teams} Act={aktivnost}/>
                    
                            </CardContent>
                        </Card>
                        <CommentForm/>
                    </Box>
                    </>
                    }
                

                </Container>
                

                <Snackbar open={open2} autoHideDuration={6000} onClose={()=>setOpen2(false)}>
                    <Alert onClose={handleClose} severity="success" sx={{ width: '100%' }}>
                        You sent a rate!
                    </Alert>
                </Snackbar>
            <AppFooter/>
        </>
    )
    }

    export default withRoot(Event)