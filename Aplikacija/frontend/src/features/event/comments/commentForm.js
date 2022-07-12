import { AppBar, Paper } from '@mui/material'
import React from 'react'
import Typography from '../../../modules/components/Typography'
import Box from '@mui/material/Box'
import withRoot from '../../../modules/withRoot'
import TextField from '../../../modules/components/TextField'
import Button from '@mui/material/Button'
import { useSelector } from 'react-redux'
import { selectCurrentUser } from '../../auth/authSlice'
import { Link, useParams } from 'react-router-dom'
import { useGetCommentsQuery, usePostCommentMutation } from '../../../api/apiSlice'
import Comments from './comments'

const CommentForm = () => {
  const [postComment]=usePostCommentMutation()
  const token=localStorage.getItem('token')
  const {id}=useParams()
  const [text,setText]=React.useState('')
 

  const sendComment=()=>{
    const obj={
      text: text,
      id: id
    }
    console.log(text)
    console.log(id)

    postComment(obj);
  }

  if(token!=null)
    return (
      <>
          <Paper variant='outlined' style={{marginTop:'30px',marginBottom:'30px'}} >
            
            <Box sx={{display:'flex',backgroundColor: "#e62958",alignItems:"center",height:'60px',boxShadow: 'rgba(255, 255, 255, 0.2) 0px 0px 0px 1px inset, rgba(0, 0, 0, 0.9) 0px 0px 0px 1px;'}} >
                <div style={{color:'white',fontSize:'22px',marginLeft:'20px'}}> Make a comment ?</div> 
            </Box>
            
            <TextField         
                placeholder="Comment"
                multiline
                rows={4}
                variant="filled"
                sx={{width:"100%",padding:'30px'}}
                value={text}
                onChange={(e)=>setText(e.target.value)}
              />
            <Button
            sx={{margin:'30px',marginTop:"0px",backgroundColor:'#e62958',color:'white'}}
            variant="outlined"
            size="large"
            onClick={()=>sendComment()}
            >
              SUBMIT
            </Button>
          </Paper>

          <Box>
            <Comments />
          </Box>
        </>
    )
  else 
      return(< >
        
          <Typography variant="h6" color="secondary.dark" align='center' mt={5} > You need to login to join teams and add comments. </Typography> 
          <Link to='/sign-in/' align='center' sx={{fontWeight:'Bold'}}> Click Here!</Link>

          <Box>
            <Comments />
          </Box>
        </>
      )
}

export default (CommentForm)