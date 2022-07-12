import * as React from 'react';

import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
import Container from '@mui/material/Container';
import Typography from '../components/Typography';
import { useSelector } from 'react-redux';
import { selectLanguage } from '../../features/language/languageSlice';
let j

const item = {
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  px: 5,
};

function ProductValues() {
  j=useSelector(selectLanguage);
  return (
    <Box
      component="section"
      sx={{ display: 'flex', overflow: 'hidden', bgcolor: 'secondary.light' }}
    >
      <Container sx={{ mt: 15, mb: 30, display: 'flex', position: 'relative' }}>
        <Box
          component="img"
          src="/onepirate/productCurvyLines.png"
          alt="curvy lines"
          sx={{ pointerEvents: 'none', position: 'absolute', top: -180 }}
        />
        <Grid container spacing={5}>
          <Grid item xs={12} md={4}>
            <Box sx={item}>
              <Box
                component="img"
                src="/onepirate/Mojeperspective-2031250.svg"
                alt="suitcase"
                sx={{ height: 55 }}
              />
              <Typography variant="h6" sx={{ my: 5 }}>
               {j==='e'?'around the globe':'bilo gde na svetu'} 
              </Typography>
              <Typography variant="h5">
                {j==='e'?'It easy to find someone to play with!':'Lako je pronaci nekoga za igru!' }

                {j==='e'? 'Use our website to check where, and if someone is available for the games ':'Koristi nas sajt da proveris gde, i da li je neko dostupan za igru!'}
              </Typography>
            </Box>
          </Grid>
          <Grid item xs={12} md={4}>
            <Box sx={item}>
              <Box
                component="img"
                src="/onepirate/310708528.svg"
                alt="graph"
                sx={{ height: 55 }}
              />
              <Typography variant="h6" sx={{ my: 5 }}>
                {j==='e'?'New experiences':'Nova iskustva'}
              </Typography>
              <Typography variant="h5">
                {j==='e'?
                  'Sports build relationships. Spend time with your friends, bond over your experiences, work hard together, and compete in a healthy way against each other.'
                  :'Sport gradi odnose. Provedite vreme sa svojim prijateljima, povežite svoja iskustva, naporno radite zajedno i takmičite se na zdrav način jedni protiv drugih.'
                }

                {''}
              </Typography>
            </Box>
          </Grid>
          <Grid item xs={12} md={4}>
            <Box sx={item}>
              <Box
                component="img"
                src="/onepirate/1280081500.svg"
                alt="clock"
                sx={{ height: 55 }}
              />
              <Typography variant="h6" sx={{ my: 5 }}>
                {j==='e'?'Regardless of the age':'Nezavisno od godista'} 
              </Typography>
              <Typography variant="h5">
                {j==='e'?'Anyone can play, regardless of age or gender. ':'Svako moze da igra, nezavisno od godista ili pola'}
                {j==='e'?'Everyone, with different skills can join and play and have fun.':'Svako, sa drugacijim vestinama mogu da se pridruze i igraju i lepo provedu'}
              </Typography>
            </Box>
          </Grid>
        </Grid>
      </Container>
    </Box>
  );
}

export default ProductValues;
