import { Avatar, Box, Card, CardContent, Grid, LinearProgress, Typography } from '@mui/material';
import GroupsOutlinedIcon from '@mui/icons-material/GroupsOutlined';
import { useGetTeamsAllQuery, useGetUsersQuery } from '../../../api/apiSlice';

export const Teams = (props) => {
  const {
    data: users,
    isLoading,
    isError
  } = useGetUsersQuery();

  const {
    data: teams,
    isSuccess
  } = useGetTeamsAllQuery()
  if(isSuccess)
    return(
    <Card
      sx={{ height: '100%' }}
      {...props}
    >
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
              Joined Team
            </Typography>
            <Typography
              color="textPrimary"
              variant="h4"
            >
              {(users?.length/teams?.length*100).toFixed(2)}%
            </Typography>
          </Grid>
          <Grid item>
            <Avatar
              sx={{
                backgroundColor: 'warning.main',
                height: 56,
                width: 56
              }}
            >
              <GroupsOutlinedIcon />
            </Avatar>
          </Grid>
        </Grid>
        <Box sx={{ pt: 3 }}>
          <LinearProgress
            value={(users?.length/teams?.length*100).toFixed(2)}
            variant="determinate"
          />
        </Box>
      </CardContent>
    </Card>
  );
}