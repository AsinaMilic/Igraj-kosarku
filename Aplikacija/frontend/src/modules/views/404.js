import { Box, Button, Container, Typography } from '@mui/material';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import {Link} from 'react-router-dom'

const NotFound = () => (
  <>
    <Box
      component="main"
      sx={{
        alignItems: 'center',
        display: 'flex',
        flexGrow: 1,
        minHeight: '100%'
      }}
    >
      <Container maxWidth="md">
        <Box
          sx={{
            alignItems: 'center',
            display: 'flex',
            flexDirection: 'column'
          }}
        >
          <Typography
            align="center"
            variant="h4"
            fontWeight='bold'
            
          >
            404: The page you are looking for isn’t here
          </Typography>
          <Typography
            align="center"
            color=" orange"
            variant="subtitle2"
          >
            You either tried some shady route or you came here by mistake.
            Whichever it is, try using the navigation
          </Typography>
          <Box sx={{ textAlign: 'center' }}>
            <img
              alt="Under development"
              src="/onepirate/404-basketball.png"
              style={{
                marginTop: 0,
                display: 'inline-block',
                maxWidth: '100%'
              }}
            />
          </Box>
          <Link
            to='/'
          >
            <Button
              component="a"
              startIcon={(<ArrowBackIcon fontSize="small" />)}
              
              variant="contained"
              color='warning'
            >
              Go back to Home
            </Button>
          </Link>
        </Box>
      </Container>
    </Box>
  </>
);

export default NotFound;