import React, { useEffect, useState } from 'react'
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
import Card from '@mui/material/Card';
import Chip from '@mui/material/Chip';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Button from '@mui/material/Button';

//import Button from '../../modules/components/Button'
import Typography from '@mui/material/Typography';
import withRoot from '../../modules/withRoot';
import CircleLoader from "react-spinners/ClipLoader";
import copy from "copy-to-clipboard";
import AppAppBarLogged from '../../modules/views/AppAppBarLogged';
import AppAppBar from '../../modules/views/AppAppBar'
import AppFooter from '../../modules/views/AppFooter';
import Snackbar from '../../modules/components/Snackbar'
//import {styled} from '@mui/material/styles'
import Container from '@mui/material/Container';

import SelectFieldGroup from './SelectFieldGroup';

import PeopleAltIcon from '@mui/icons-material/PeopleAlt';
import DeleteIcon from '@mui/icons-material/Delete';
import IconButton from '@mui/material/IconButton';
import { Paper, Zoom } from '@mui/material';

import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import Draggable from 'react-draggable';

import Pagination from '@mui/material/Pagination';

import { useDeleteEventMutation, useGetEventsQuery, useGetUsersQuery } from '../../api/apiSlice';
import { selectLanguage } from '../../features/language/languageSlice';
import { selectCurrentToken, selectCurrentUser } from '../auth/authSlice';
import button85 from "./specialButton.css"
let j

const Events = () => {
    j=useSelector(selectLanguage);
    const navigate=useNavigate();
    const [ShareOpen,setShareOpen]=useState(false);
    const [type,setType]=React.useState('')
    const [deleteEventMutation]=useDeleteEventMutation()
    const user=useSelector(selectCurrentUser)
    const [openDialog,setOpenDialog]=React.useState(false)
    const [EventIdToDelete,setEventIdToDelete]=React.useState('')
    const [PostojiSpecialEvent,setPostojiSpecialEvent]=useState(false)

    const [pagination,setPagination]=useState({
        count: 0,
        from: 0,
        to: 4
    })
    
    let count=0;
    
    console.log(user)

    const formatDate=(date)=>{
        let month;
        switch (date.slice(5,7)) {
            case '01': month='Jan'; break;
            case '02': month='Feb'; break;
            case '03': month='Mar'; break;
            case '04': month='Apr'; break;
            case '05': month='May'; break;
            case '06': month='Jun'; break;
            case '07': month='Jul'; break;
            case '08': month='Aug'; break;
            case '09': month='Sep'; break;
            case '10': month='Oct'; break;
            case '11': month='Nov'; break;
            case '12': month='Dec'; break;
            default:
                break;
        }
        return date.slice(8,10)+" "+month
    }

    const Share=(id)=>{
        copy(`${window.location.href}/${id}`);
        setShareOpen(true)
    }
    const deleteEvent=(id)=>{
        setEventIdToDelete(id);
        setOpenDialog(true)
        //deleteEventMutation(id)
    }

    let delay=-100;
    let pageWentThrough=0
    const ContentJSX=(activity)=>{
        delay+=100;
        let Border=activity?.category?.id===6? "3px solid orange":null;
        if(activity?.location?.name.includes('SPECIAL')) return null; //ne prikazuje specijalne evente,ok

        pageWentThrough++;
        if(pageWentThrough>pagination.from && pageWentThrough<=pagination.from+4)
        return(
        <React.Fragment key={activity?.id}>
        {<Grid item xs={12} sm={6} md={3} >
            <Zoom in={true} style={{ transitionDelay: `${delay}ms`}}>
            <Card sx={{border: Border}}>
            <CardMedia
                component="img"
                height="240"
                image={activity?.url?activity?.url:"/onepirate/no-photo.svg"}
            />
            <CardContent >
                <Typography gutterBottom variant="h5" component="div" sx={{fontSize:"30px"}} mt={-1}>
                    {activity?.name? activity.name : "Greska u imenu eventa"} {"- "+formatDate(activity.activityDateTime)}
                </Typography>
                <Typography variant="body2" color="text.secondary" mb={2}>
                    {activity?.description}
                </Typography>
                <Chip label={activity?.category?.text} />
                <Chip icon={<PeopleAltIcon />} label={activity.numberOfPlayers} sx={{ml:"10px"}} />
            </CardContent>
            <CardActions>
                <Button size="medium" variant="outlined" onClick={()=> {Share(activity.id)}}>Share Link</Button>
                <Button size="medium" variant="contained" onClick={()=> {navigate(`/Events/${activity.id}`)}}>Learn More</Button>
                {user?.role?.id===1080 || user?.id === activity?.createdByUser?.id ?<Button 
                    variant="outlined" 
                    startIcon={<DeleteIcon sx={{marginLeft:1,color:'red'}}/>}
                    onClick={()=> deleteEvent(activity?.id)}
                > 
                </Button>:null}
            </CardActions>
            </Card>
            </Zoom>
        
        </Grid>}
        </React.Fragment>
        )
    }

    const NoEventsJSX=()=>{
        return (
            <Box sx={{width:'100%',height:'50vh',display:'flex',justifyContent:'center',alignItems:'center',flexDirection:'column'}}>
                <Typography  variant="h1" color='red'> {j==='e'?'No Events!':'Nema dogadjaja'}</Typography>
                <Typography variant="caption" color="#c6e1f2">{j==='e'?'Try different event type or our servers arent working':'Pokusaj sa drugim tipom dodgadjaja ili nasi serveri ne rade'}</Typography> 
            </Box>
        )
    }

    const {
        data: aktivnosti,
        isLoading,
        isSuccess,
        isError,
        error
    } = useGetEventsQuery()

    let contentSpecialDugme;
    let content;
    if(isError) 
        content=NoEventsJSX() //ovo oce i ako ne pokrenes back
    if(isLoading) {
    content=<Grid item xs={12} sx={{display:'flex',justifyContent:'center'}}>
                <CircleLoader loading={isLoading} color="red" size={150} />
            </Grid>
    }
    if(isSuccess){
        content=null;
        let SpecialEvent=false
        console.log(aktivnosti)

        aktivnosti.map(stagod=>count++)
        
          content=aktivnosti.map(activity=>{
                if(activity?.location?.name.includes('SPECIAL')){
                    SpecialEvent=true
                }
                
                const cat=activity?.category?.text;
                if(type==='' || type==='All types') return ContentJSX(activity)
                else if(type==cat) return ContentJSX(activity)
                else if (type==="Something else..." && (cat!=="Competition" &&cat!=="1 vs 1"&&cat!=="2 vs 2"&&cat!=="3 vs 3"&&cat!=="5 vs 5"&&cat!=="Training")) return ContentJSX(activity)
                
            })
         
            let flag=content.every(function(el){ return el==null})
            if(flag) 
            content=NoEventsJSX()

            if(SpecialEvent){
                
                contentSpecialDugme=<button class="button-85" 
                role="button" 
                style={{marginTop:'25px',paddingLeft:'40px',paddingRight:'40px',paddingTop:'10px',paddingBottom:'10px',fontSize:"17px"}}
                onClick={()=>doSpecialEventa()}
                >
                    Special Event
                </button>
            }
            else
                contentSpecialDugme=null;
            
        }
   
    const doSpecialEventa=()=>{
        console.log(aktivnosti)
        aktivnosti.map(activity=>{
            if(activity?.location?.name.includes('SPECIAL'))
                navigate(`/EventSpecial/${activity?.id}`)
        })
    }

    

  return (
    <>
    {user.token?<AppAppBarLogged/>:<AppAppBar/>}   
            
    <Box sx={{bgcolor: "#FFFFEF"}} >
        <Container maxWidth="xl">
            <Grid container spacing={5} sx={{ paddingX: 2}} >
                <Grid item xs={12} sm={5} md={5}>
                    <Typography variant="h3" align='left' mt={2}> {j==='e'?'List of events':'Lista dogadjaja'}</Typography>
                </Grid>
                
                
                <Grid item xs={12} sm={3} md={3}>
                {contentSpecialDugme}
                </Grid>
        
                <Grid item xs={12} sm={4} md={4}>
                    <SelectFieldGroup type={type} setType={setType}/>
                </Grid>
            </Grid>
        </Container>
    </Box>


    <Container maxWidth="xl">
        <Grid container spacing={4} sx={{ paddingX: 2}} mt={0}>
            {content}
          
        </Grid> 

        <Box sx={{display:'flex',justifyContent:'center',alignItems:'center',margin:4}}>
            <Pagination 
                count={Math.ceil(count/4)} 
                variant="outlined" 
                shape='rounded' 
                size='large'
                onChange={(event,page)=>{
                    setPagination({...pagination,from: (page-1)*4})
                }}
            />
        </Box>

    </Container>

    <AppFooter/>
    <Snackbar
        open={ShareOpen}
        closeFunc={()=>setShareOpen(false)}
        message="Your event link is copied! You can send it to your friends!"
    />


    <div>
    <Dialog
        open={openDialog}
        onClose={()=>setOpenDialog(false)}
        PaperComponent={PaperComponent}
        aria-labelledby="draggable-dialog-title"
    >
        <DialogTitle style={{ cursor: 'move' }} id="draggable-dialog-title">
        Delete Team
        </DialogTitle>
        <DialogContent>
        <DialogContentText>
            You are deleting this team. You are going to remove this team and users from activity. Changes cannot be undone!
        </DialogContentText>
        </DialogContent>
        <DialogActions>
        <Button autoFocus onClick={()=>setOpenDialog(false)} variant="outlined">
            Cancel
        </Button>
        <Button onClick={()=>{
            setOpenDialog(false)
            deleteEventMutation(EventIdToDelete);
            //window.location.reload();
        }} 
        variant="outlined">
            Confirm
        </Button>
        </DialogActions>
    </Dialog>
    </div>
    </>
  )
}

export default withRoot(Events);

function PaperComponent(props) { //sranje open dialoga
    return (
      <Draggable
        handle="#draggable-dialog-title"
        cancel={'[class*="MuiDialogContent-root"]'}
      >
        <Paper {...props} />
      </Draggable>
    );
  }