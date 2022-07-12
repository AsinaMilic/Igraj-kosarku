import React from 'react'
import {Avatar,Box,Button, Card, CardActions, CardContent,Divider, Typography } from '@mui/material';
import { useDeleteUserMutation,usePutUserMutation} from '../../api/apiSlice';
import { useNavigate } from 'react-router-dom';
import { Uploader } from "uploader";
import { UploadButton } from "react-uploader";
import { useDispatch, useSelector } from 'react-redux';
import { logOut, selectCurrentUser } from '../auth/authSlice';

  
export const AccountProfile = ({user,ZaUredjajem}) => {
    const dispatch=useDispatch()
    const currentUser=useSelector(selectCurrentUser);
    const [deleteSelf]=useDeleteUserMutation()
    const navigate=useNavigate()
    const [files, setFiles] = React.useState([])

    const uploader = new Uploader({apiKey: "public_W142hRgBafjKRxPHqnwwdmmPqknE"});
    const uploaderOptions = {
        multi: false,
        styles: {
          colors: {
            primary: "#ffae42" 
          }
        }
    }
    const MyUploadButton = ({setFiles}) =>
    <UploadButton uploader={uploader}
                    options={uploaderOptions}
                    onComplete={setFiles}>
        {({onClick}) =>
        <Button fullWidth onClick={onClick}>
            Upload an image
        </Button>
        }
    </UploadButton>

    const MyUploadedFiles = ({files}) => {

            const todo={
                email: currentUser.email,
                firstName: currentUser.firstName,
                lastName: currentUser.lastName,
                ImageUrl: files[0].fileUrl
            }
            const id=currentUser?.id
           
            const token=localStorage.getItem('token')
            fetch(`https://localhost:7300/Users/update/${id}`,{
                method: 'PUT',
                headers: {
                    'Authorization': `Bearer ${token}`,  
                    'Content-Type': 'application/json',},
                body: JSON.stringify(todo),
            }).then((response) => response.json()).then((podaci) => {
                console.log('Success:');
                console.log(podaci)
                window.location.reload()
            })
            
            
       
        return <Button disabled>Uploaded!</Button>
    }
    
    
    const ObrisiSe=(id)=>{
        deleteSelf(id)
        localStorage.clear()
        dispatch(logOut())
        
    }
    const DateUser=(UTCstring)=>{
        const date = new Date(UTCstring)
        return date.toDateString()+' '+date.toString().slice(16,24)
    }
    const TimeZoneUser=(UTCstring)=>{
        const date=new Date(UTCstring);
        return date.toString().slice(25,69)
    }
    return ( <>
        <Card >
            <CardContent>
                <Box sx={{ alignItems: 'center', display: 'flex',flexDirection: 'column'}}>
                <Avatar src={user?.imageUrl} sx={{ height: 64,mb: 2,width: 64 }} />
                <Typography color="textPrimary" gutterBottom variant="h5" >
                    {user?.firstName} {user?.lastName}
                </Typography>
                <Typography color="textSecondary" variant="body2">
                    {DateUser(user?.createdAt)}
                </Typography>
                <Typography color="textSecondary" variant="body2">
                    {TimeZoneUser(user?.createdAt)}
                </Typography>
                <Typography color="textSecondary" variant="body2" >
                    {`${user?.role?.name ? "Role: "+ user?.role?.name: 'Unknown role, who are you?'}`}
                </Typography>
                </Box>
            </CardContent>
            <Divider />
            {ZaUredjajem?.id===user?.id && ZaUredjajem?.id!=null ?
            <>
                
                    <Box sx={{display:'flex',justifyContent:'center',margin:1}}>
                    {files.length 
                        ? <MyUploadedFiles files={files} /> 
                        : <MyUploadButton setFiles={setFiles} />
                    }
                    
                    </Box>
                
                <Divider/>
                <CardActions>
                    <Button  fullWidth variant="text" onClick={()=>ObrisiSe(user?.id)} sx={{color:'red'}}>
                        Delete account
                    </Button> 
                </CardActions>
            </>
            :
            null
            }
            
        </Card>
       
        </>)
}
  