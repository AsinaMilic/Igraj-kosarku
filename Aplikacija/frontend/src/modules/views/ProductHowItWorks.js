import * as React from 'react';

import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
import Container from '@mui/material/Container';
import Button from '../components/Button';
import Typography from '../components/Typography';
import { useSelector } from 'react-redux';
import { selectLanguage } from '../../features/language/languageSlice';

const item = {
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  px: 5,
};

const number = {
  fontSize: 24,
  fontFamily: 'default',
  color: 'secondary.main',
  fontWeight: 'medium',
};

const image = {
  height: 55,
  my: 4,
};

function ProductHowItWorks() {
  const j=useSelector(selectLanguage);
  return (
    <Box
      component="section"
      sx={{ display: 'flex', bgcolor: 'secondary.light', overflow: 'hidden' }}
    >
      <Container
        sx={{
          mt: 10,
          mb: 15,
          position: 'relative',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
        }}
      >
        <Box
          component="img"
          src="/onepirate/productCurvyLines.png"
          alt="curvy lines"
          sx={{
            pointerEvents: 'none',
            position: 'absolute',
            top: -180,
            opacity: 0.7,
          }}
        />
        <Typography variant="h4" marked="center" component="h2" sx={{ mb: 14 }}>
          {j==='e'?'How it works':'Kako radi'}
        </Typography>
        <div>
          <Grid container spacing={5}>
            <Grid item xs={12} md={4}>
              <Box sx={item}>
                <Box sx={number}>1.</Box>
                <Box
                  component="img"
                  src="/onepirate/B-Ball_Retro_Net.svg"
                  alt="suitcase"
                  sx={image}
                />
                <Typography variant="h5" align="center">
                  {j==='e'?'Explore every basketball activity. Find someone to play with and attend every event':'Istražite svaku košarkašku aktivnost. Pronađite nekoga sa kim ćete se igrati i prisustvovati svakom događaju'}
                </Typography>
              </Box>
            </Grid>
            <Grid item xs={12} md={4}>
              <Box sx={item}>
                <Box sx={number}>2.</Box>
                <Box
                  component="img"
                  src="/onepirate/Log In Icon.svg"
                  alt="graph"
                  sx={image}
                />
                <Typography variant="h5" align="center">
                  {j==='e'?'Set up your account so you can post an event and meet your friends to play with':'Podesite svoj nalog tako da možete da objavite događaj i upoznate svoje prijatelje sa kojima ćete se igrati'}
                </Typography>
              </Box>
            </Grid>
            <Grid item xs={12} md={4}>
              <Box sx={item}>
                <Box sx={number}>3.</Box>
                <Box
                  component="img"
                  src="/onepirate/push_back_time.svg"
                  alt="clock"
                  sx={image}
                />
                <Typography variant="h5" align="center">
                  {j==='e'?'Create event anytime you like, choose your rules and locations. ':'Kreirajte događaj kad god želite, izaberite svoja pravila i lokacije.'}
                  {j==='e'?'Everyone can see your event.':'Svako moze da vidi vas dogadjaj'}
                </Typography>
              </Box>
            </Grid>
          </Grid>
        </div>
        <Button
          color="secondary"
          size="large"
          variant="contained"
          component="a"
          href="/sign-up/"
          sx={{ mt: 8 }}
        >
          {j==='e'?'Get started':'Zapocnimo'}
        </Button>
      </Container>
    </Box>
  );
}

export default ProductHowItWorks;
