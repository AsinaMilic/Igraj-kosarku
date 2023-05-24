import { Container,Typography,Box,Chip,Grid, CardMedia, Paper, Button, Divider,Fab,Avatar, TextField, MenuItem, FormControl,} from '@mui/material';
import LoadingButton from '@mui/lab/LoadingButton';
import SaveIcon from '@mui/icons-material/Save';
import React from 'react'
import { useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux'
import { selectCurrentUser } from '../auth/authSlice'
import OpenIconSpeedDial from './OpenIconSpeedDial'
import GroupAddIcon from '@mui/icons-material/GroupAdd';
import AddTaskTwoToneIcon from '@mui/icons-material/AddTaskTwoTone';
import Snackbar from '../../modules/components/Snackbar';
import { useGetTeamsAllQuery,useGetTeamQuery,usePutTeamInPlayerMutation,usePostJoinTeamActivityMutation,useDeleteTeamMutation, useDeleteUserFromTeamMutation } from '../../api/apiSlice';
import GroupsIcon from '@mui/icons-material/Groups';
import DeleteForeverIcon from '@mui/icons-material/DeleteForever';

import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import Draggable from 'react-draggable';

import InputLabel from '@mui/material/InputLabel';
import Select from '@mui/material/Select';


const Teams = ({teams,Act}) => {
    const navigate=useNavigate()
    const currentUser=useSelector(selectCurrentUser)
    
    const [nooTeams,setNooTeams]=React.useState(0);
    const [makeTeams,setMakeTeams]=React.useState(false)
    const [touched,setTouched]=React.useState(false)
    const [joinedTeam,setJoinedTeam]=React.useState(0)
    
    const [open, setOpen] = React.useState(false);
    const [openRemove, setOpenRemove] = React.useState(false);
    const [openDialog,setOpenDialog]=React.useState(false)
    const [deleteTeamId,setDeleteTeamId]=React.useState(0);
    
    const [choosedTeam,setChoosedTeam]=React.useState('')

    const [loading,setLoading]=React.useState(false)
    
    const [JoinTeamActivity]=usePostJoinTeamActivityMutation()
    //const [postTeam]=usePostTeamMutation()
    const [putTeamInPlayer]=usePutTeamInPlayerMutation()
    const [deleteTeam]=useDeleteTeamMutation()
    const [deleteUserFromTeam]=useDeleteUserFromTeamMutation();

    
   // const {data : timovi } =useGetTeamQuery(Act?.id);
   // console.log(timovi)

    const Admin = currentUser?.role?.id===1080; 

    const JoinTeamClick=(TeamId)=>{
        setJoinedTeam(TeamId)
        setOpen(true)
        const obj={
            teamId: TeamId,
            userId: currentUser?.id
        }
        console.log(obj)
        putTeamInPlayer(obj);
        
    }
    
    const handleClickColor=(e,i)=>{
        BojaTimova[i]=(e.target.value)
    }
    const handleTypingTeamName=(e,i)=>{
        setTouched(true)
        ImenaTimova[i]=(e.target.value)
    }
    
    let ImenaTimova=[]
    let BojaTimova=[]
    
    const postTeams=()=>{
        setLoading(true)
        
        ImenaTimova.forEach((ime,index)=>{
            let obj={}  //inic za rtk query ali mrzi me da menjam
            if(ime==null){
                obj.name=`Team ${index}`
                obj.color=BojaTimova[index]
            }
            else{
                obj.name=ime;
                obj.color=BojaTimova[index]
            }
            console.log(obj.name)

            const data = { name: `${obj.name}` , color: `${obj.color}` }; //radi
            const token=localStorage.getItem('token')
            fetch('https://kosarkaapi.azurewebsites.net/api/Team', {
                method: 'POST',
                headers: {
                    'Authorization': `Bearer ${token}`,  
                    'Content-Type': 'application/json',},
                body: JSON.stringify(data),
            }).then((response) => response.json()).then((tim) => {
                console.log('Success:', data);
                const obj1={
                    teamId: tim?.id,
                    activityId: Act?.id
                }
                JoinTeamActivity(obj1) //radi
                
            })
            
        })
        setLoading(false)
        setNooTeams(0)
        
    }

    const removeUserFromTeam=(userIdToDelete,FromTeamId)=>{
        const obj={
            teamId:FromTeamId,
            userId:userIdToDelete
        }
        deleteUserFromTeam(obj)
        setOpenRemove(true)
        window.location.reload()
    }

    const TeamInit=()=>{
        let Content=[];
        if(makeTeams){
            for (let i=1;i<=nooTeams;i++){
                let ContentEl=<>
                            <Divider>
                                    <TextField   
                                        autoComplete='off'
                                        sx={{width:'250px',margin:'15px'}} 
                                        error={touched?false:true}
                                        placeholder={`             Team Name ${i}`} 
                                        onChange={(e)=>handleTypingTeamName(e,i)}
                                    /> 
                                    {Act?.category?.id===6 ? 
                                        <>
                                        <FormControl sx={{width:'100px',marginTop:'15px'}}>
                                        <InputLabel id="demo-simple-select-label">Color {i}</InputLabel>
                                        <Select
                                          labelId="demo-simple-select-label"
                                          id="demo-simple-select"
                                          
                                          label="Color"
                                          onChange={(e)=>handleClickColor(e,i)}
                                        >
                                          <MenuItem value={'red'} sx={{color:'red'}}>Red </MenuItem>
                                          <MenuItem value={'orange'}sx={{color:'orange'}}>Orange</MenuItem>
                                          <MenuItem value={'brown'}sx={{color:'brown'}}>brown</MenuItem>
                                          <MenuItem value={'green'}sx={{color:'green'}}>green</MenuItem>
                                          <MenuItem value={'blue'}sx={{color:'blue'}}>blue</MenuItem>
                                          <MenuItem value={'purple'}sx={{color:'purple'}}>purple</MenuItem>
                                        </Select>
                                        </FormControl>
                                        </>
                                        : 
                                        null
                                    }               
                            </Divider>
                        </>
                Content.push(ContentEl)

                if(i===nooTeams){
                    let Content1=<Box sx={{display:'flex',justifyContent:'center'}}>
                        <LoadingButton
                            size='large'
                            color="secondary"
                            loading={loading}
                            onClick={()=>postTeams()}
                            startIcon={<SaveIcon />}
                            variant="contained"
                            sx={{marginBottom:'20px'}}
                        >
                            Save
                        </LoadingButton>
                    </Box>
                    Content.push(Content1)
                } 
            }
            
        }
            
        return Content
    }
    
    let playersjoined=0;
    const TeamField=()=>{
       
        const Content=teams.map((tim)=>{
            
            const TimColor= tim?.color!='string' ? tim?.color : "darkgray" //nece ovo
            //console.log(tim?.users[0]?.firstName)
            return(<React.Fragment >
                <Divider> <Chip label={tim?.name}  variant='filled' sx={{margin:'10px',minWidth:'120px',height:'25px',backgroundColor:TimColor,color:'white'}}></Chip></Divider>
                <Grid container spacing={5}>
                    <Grid item xs={10}>
                        {tim?.users.map(user=>{
                            playersjoined++
                            let IzbacitiUseraIzTima= currentUser?.id===1080; //ako je admin
                            if(currentUser?.id===user?.id) IzbacitiUseraIzTima=true; //ako je sam sebe
                            if(currentUser?.id===Act?.createdByUser?.id) IzbacitiUseraIzTima=true //ako je kreator eventa
                            if(!IzbacitiUseraIzTima)
                                return(<Chip   
                                        style={{marginLeft:'10px',marginTop:'10px'}}
                                        avatar={<Avatar alt='sta je to'></Avatar>} 
                                        label={user?.firstName} 
                                        variant="outlined" 
                                        key={user?.firstName}
                                        onClick={()=>navigate(`/users/${user?.id}`)}
                                    />)
                            else
                                return(<Chip   
                                        style={{marginLeft:'10px',marginTop:'10px'}}
                                        avatar={<Avatar alt='sta je to'></Avatar>} 
                                        label={user?.firstName} 
                                        variant="outlined" 
                                        key={user?.firstName}
                                        onDelete={()=>removeUserFromTeam(user?.id,tim?.id)}
                                        onClick={()=>navigate(`/users/${user?.id}`)}
                                    />)
                        })}
                    </Grid>
                    <Grid item xs={1}>
                        {!joinedTeam && currentUser?.id ? 
                                <Fab variant="extended" onClick={()=>JoinTeamClick(tim?.id)} sx={{ mr: 1 }}>
                                    <GroupAddIcon sx={{ mr: 1 }} />
                                        Join
                                </Fab>:
                                joinedTeam===tim?.id?
                                    <Fab variant="extended" >
                                        <AddTaskTwoToneIcon sx={{ mr: 1 }} disabled/>
                                            Joined
                                    </Fab>
                                    :null
                        }
                    </Grid>
                    <Grid item xs={1}>
                        { (currentUser?.id===Act?.createdByUser?.id) || currentUser?.role?.id===1080 ?
                            <Fab color="secondary" aria-label="edit" sx={{marginLeft:'10px',marginRight:'10px',marginBottom:'0px'}} >
                                <DeleteForeverIcon 
                                    fontSize='large'
                                    onClick={()=>{
                                        console.log(tim?.id)
                                        setDeleteTeamId(tim?.id);
                                        setOpenDialog(true);
                                    }} 
                                />
                            </Fab>
                            :
                            null 
                        }
                    </Grid>
                </Grid>
                <Divider><Chip label={tim?.name} variant='filled' sx={{margin:'10px',minWidth:'120px',height:'25px',backgroundColor:TimColor,color:'white'}}></Chip></Divider>
            </React.Fragment>)
        })
        
        return Content;
    }
    const LeleOvajReactPlayers=()=>{
        let nooPlayers=0;
        Act?.teams.map(team=>{
            team?.users.map(user=>nooPlayers++)
        })
        return(Act?.numberOfPlayers-nooPlayers)
        
    }
  return (
    <>
        {(currentUser?.id===Act?.createdByUser?.id) || Admin ? 
        <>
            <Button size='large' variant="outlined" style={{backgroundColor:"#ffc071"}} >JOIN THIS EVENT</Button><span style={{marginLeft:'10px'}}> {LeleOvajReactPlayers()} spots left </span>
            <OpenIconSpeedDial nooTeams={nooTeams} setNooTeams={setNooTeams} setMakeTeams={setMakeTeams}/> 
        </>
        : null }
        <Typography align='center'> <GroupsIcon fontSize='large'/></Typography>
        <TeamInit/>
        <TeamField/>

        <Snackbar open={open} closeFunc={()=>setOpen(false)} message={'You are going to this event!'}/>
        <Snackbar open={openRemove} closeFunc={()=>setOpenRemove(false)} message={'User is removed from the team!'}/>
        
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
                deleteTeam(deleteTeamId);
                setDeleteTeamId(0)
                window.location.reload();
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

export default Teams


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