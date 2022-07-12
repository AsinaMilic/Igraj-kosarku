import React from 'react'
import { useSelector } from 'react-redux'
import { selectCurrentUser } from '../../auth/authSlice'
import { Paper,Avatar, List, ListItem, ListItemText, Grid, Fab } from '@mui/material'
import DeleteForeverIcon from '@mui/icons-material/DeleteForever';
import { Link, useParams } from 'react-router-dom'
import { useDeleteCommentMutation, useGetCommentsQuery } from '../../../api/apiSlice'
import Typography from '../../../modules/components/Typography'

const Comments = () => {
    const user=useSelector(selectCurrentUser);
    const [deleteCom] =useDeleteCommentMutation();
    const id=useParams();
    const {
    data: KOMENTARI,
    isLoading,
    isSuccess,
    } = useGetCommentsQuery(id);
    
    const RandomColor=()=>"#" + Math.floor(Math.random()*16777215).toString(16).padStart(6, '0').toUpperCase();
    
    const TwoLetters=(UserCom)=>{
        let str=''
        if(UserCom?.profileName) {
            str=UserCom?.profileName
            if(str)
                return str.charAt(0)
        }
        else{
            str=UserCom?.firstName.charAt(0)+UserCom?.lastName.charAt(0);
            return str;
        }

    }
    const ProfileImePre=(UserCom)=>{//{ProfileImePre(komentar?.createdByUser)}
        let str=''
        if(UserCom?.profileName)
            str=UserCom?.profileName;
        else if(UserCom?.firstName&&UserCom?.lastName)
            str=UserCom?.firstName+' '+UserCom?.lastName

        return str;
    }

    const ProfileDate=(UserCom)=>{
        if(UserCom?.createdAt){
            return  ' - ' +UserCom?.createdAt.slice(0,10)                                                                                  
        }                                                                           
    }

    const TextBelowName=(UserCom,Com)=>{
        console.log(UserCom)
        let role=''
        if(UserCom?.role)
            role=UserCom?.role;
        else 
            role="Shady role";
        if(Com)
            role+=": "+ Com;
        return role
    }

   const deleteCommentBre=(id)=>{
    deleteCom({id});
   }

  let content;
  if(isSuccess){
  
    console.log(KOMENTARI);
    content=KOMENTARI.map(komentar=>{
        return(<React.Fragment key={komentar?.id} value={komentar?.createdByUser?.id}>
        
            <Paper sx={{marginBottom:"5px"}}>
                <List>
                    <ListItem>
                        <Avatar src={komentar?.createdByUser?.imageUrl} sx={{backgroundColor:RandomColor,margin:'0px'}}>{TwoLetters(komentar?.createdByUser)}</Avatar>
                    <Grid container>
                        <Grid item sx={9}>
                            <Typography variant='subtitle2'  sx={{paddingLeft:'15px',marginBottom:'1px',fontSize:'15px'}}>
                                {ProfileImePre(komentar?.createdByUser)}    
                                {ProfileDate(komentar?.createdByUser)}
                            </Typography>
                            <Typography variant='body1' sx={{paddingLeft:'15px'}}>
                                {TextBelowName(komentar?.createdByUser,komentar?.text)}
                        </Typography>
                        </Grid>
                    </Grid>
                    {komentar?.createdByUser?.id===user?.id || user?.id===1080 ? 
                    <Fab color="secondary" aria-label="edit" >
                        <DeleteForeverIcon 
                            fontSize='large'
                            onClick={()=>deleteCommentBre(komentar?.id)}    
                        />
                    </Fab>
                  :
                    
                    null}
                        
                    </ListItem>
                    
                </List>
                
            </Paper>
    
    </React.Fragment>
    )

    })
    
    return <>
    {content}
    </>
        
  }
    
}

export default Comments