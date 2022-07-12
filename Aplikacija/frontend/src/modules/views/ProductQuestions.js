import * as React from 'react';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Container from '@mui/material/Container';
import Typography from '../components/Typography';
import {useSelector } from 'react-redux';
import { selectLanguage } from '../../features/language/languageSlice';

function ProductQuestions() {
  const j=useSelector(selectLanguage);
  return (
    <Container
      component="section"
      sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', my: 9 }}
    >
      <Button
        href="https://www.fiba.basketball/documents/official-basketball-rules-yellow/2020.pdf"
        sx={{
          border: '4px solid currentColor',
          borderRadius: 0,
          height: 'auto',
          py: 2,
          px: 5,
        }}
      >
        <Typography variant="h4" component="span">
          {j==='e'?'If you dont know the rules, check this site!':'Ako ne znas pravila, proveri ovaj sajt!'}
        </Typography>

      </Button>
        <Typography variant="subtitle1" sx={{ my: 3 }}>
          {j==='e'?'Got any questions? Need help?':'Imas neka pitanja? Potrebna ti je pomoc?'}
        </Typography>
      <Box
        component="img"
        src="/onepirate/double up.svg"
        alt="buoy"
        sx={{ width: 60 }}
      />
    </Container>
  );
}

export default ProductQuestions;
