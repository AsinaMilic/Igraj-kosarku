import { Avatar, Card, CardContent, Grid, Typography } from '@mui/material';
import CommentOutlinedIcon from '@mui/icons-material/CommentOutlined';
import React, { useEffect } from 'react';
import { useGetCommentsQuery } from '../../../api/apiSlice';

export const TotalComments = ({events}) => {
  const [NumComments,setNumComments]=React.useState('')
  let NooComments=0;

  events.map(event=>{HookLoop(event?.id)})

  function HookLoop(id){
    const sigurno={
      id:id
    }
    const {
      data: KOMENTARI,
      isSuccess
    }=useGetCommentsQuery(sigurno)

    if(isSuccess)
      KOMENTARI.map(komentar=>NooComments++)
    
    useEffect(()=>{setNumComments(NooComments)},[NooComments])

  }
  return (
    <Card >
      <CardContent>
        <Grid
          container
          spacing={3}
          sx={{ justifyContent: 'space-between' }}
        >
          <Grid item>
            <Typography
              color="textSecondary"
              gutterBottom
              variant="overline"
            >
              Comments made
            </Typography>
            <Typography
              color="textPrimary"
              variant="h4"
            >
              {NooComments}
            </Typography>
          </Grid>
          <Grid item>
            <Avatar
              sx={{
                backgroundColor: 'primary.main',
                height: 56,
                width: 56
              }}
            >
              <CommentOutlinedIcon />
            </Avatar>
          </Grid>
          <Grid item>
          <Typography
            color="error.dark"
            variant="caption"
          >
            Low users activity!
          </Typography>
          </Grid>
          
        </Grid>
      </CardContent>
    </Card>
  );
}

