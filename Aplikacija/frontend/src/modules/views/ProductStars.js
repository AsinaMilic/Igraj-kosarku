import { selectLanguage } from '../../features/language/languageSlice';
import { useSelector } from 'react-redux'
import * as React from 'react';
import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
import Container from '@mui/material/Container';
import Typography from '../components/Typography';
import TextField from '../components/TextField';
import Snackbar from '../components/Snackbar';
import Button from '../components/Button';

function ProductStars() {
  const j=useSelector(selectLanguage);
  const [open, setOpen] = React.useState(false);

  const handleSubmit = (event) => {
    event.preventDefault();
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  return (
    <Container component="section" sx={{ mt: 10, display: 'flex' }}>
      <Grid container>
        <Grid item xs={12} md={6} sx={{ zIndex: 1 }}>
          <Box
            sx={{
              display: 'flex',
              justifyContent: 'center',
              bgcolor: 'warning.main',
              py: 8,
              px: 3,
            }}
          >
            <Box component="form" onSubmit={handleSubmit} sx={{ maxWidth: 400 }}>
              <Typography variant="h2" component="h2" gutterBottom>
                {j==='e'?'Receive invitations':"Primi pozivnice"}
              </Typography>
              <Typography variant="h5">
                {j==='e'?'We will let you know if a basketball star is close to you':'Obavesticemo vas ukoliko je kosarkaska zvezda blizu vas'}
              </Typography>
              <TextField
                noBorder
                placeholder={j==='e'?"Your email":'Tvoj email'}
                variant="standard"
                sx={{ width: '100%', mt: 3, mb: 2 }}
              />
              <Button
                type="submit"
                color="primary"
                variant="contained"
                sx={{ width: '100%' }}
              >
                {j==='e'?'Keep me updated':'Informisi me'}
              </Button>
            </Box>
          </Box>
        </Grid>
        <Grid
          item
          xs={12}
          md={6}
          sx={{ display: { md: 'block', xs: 'none' }, position: 'relative' }}
        >
          <Box
            sx={{
              position: 'absolute',
              top: -67,
              left: -67,
              right: 0,
              bottom: 0,
              width: '100%',
              background: 'url(/onepirate/ProductStarsImageDots.png)',
            }}
          />
          <Box
            component="img"
            src={j==='e'?"/onepirate/giannis-kids.jpg":"https://cdn.vox-cdn.com/thumbor/YpQPy3SR23HC5fPPvcZNs1WFX8I=/0x0:4244x2829/1200x800/filters:focal(1783x1076:2461x1754)/cdn.vox-cdn.com/uploads/chorus_image/image/62706543/usa_today_11870208.0.jpg"}
            alt="nestala slika"
            sx={{
              position: 'absolute',
              top: -40 ,
              left: -50,
              right: 0,
              bottom: 0,
              width: '105%',
              height: '95%',
              maxWidth: 700,
            }}
          />
        </Grid>
      </Grid>
      <Snackbar
        open={open}
        closeFunc={handleClose}
        message={j==='e'?"We will send you invitation if basketball stars are near you!.":'Obavesticemo vas ukoliko je kosarkaska zvezda blizu vas'}
      />
    </Container>
  );
}

export default ProductStars;
