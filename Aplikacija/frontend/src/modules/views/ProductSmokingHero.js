import * as React from 'react';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Container from '@mui/material/Container';
import Typography from '../components/Typography';

function ProductSmokingHero() {
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
          If you dont know the rules, check this site!
        </Typography>

      </Button>
        <Typography variant="subtitle1" sx={{ my: 3 }}>
          Got any questions? Need help?
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

export default ProductSmokingHero;
