import * as React from 'react';
import Button from '../components/Button';
import Typography from '../components/Typography';
import ProductHeroLayout from './ProductHeroLayout';
import { useSelector } from 'react-redux';
import { selectLanguage } from '../../features/language/languageSlice';
let j;

const backgroundImage =
  //'https://images7.alphacoders.com/363/363760.jpg';
 'https://st4.depositphotos.com/1031174/31398/i/450/depositphotos_313980882-stock-photo-basketball-and-sky.jpg' 
  //'https://images5.alphacoders.com/677/677066.jpg'

export default function ProductHero() {
  j=useSelector(selectLanguage);
  return (
    <ProductHeroLayout
      sxBackground={{
        backgroundImage: `url(${backgroundImage})`,
       backgroundColor: '#7fc7d9', // Average color of the background image.
        backgroundPosition: 'center',
      }}
    >
      {/* Increase the network loading priority of the background image. */}
      <img
        style={{ display: 'none' }}
        src={backgroundImage}
        alt="increase priority"
      />
      <Typography color="inherit" align="center" variant="h2" marked="center">
        {j==='e'?'Search for Players':'Potrazi igrace'}
      </Typography>
      <Typography
        color="inherit"
        align="center"
        variant="h5"
        sx={{ mb: 4, mt: { sx: 4, sm: 10 } }}
      >
        {j==='e'?'Pick a day, time, and place to play basketball with someone':'Izaberite dan, vreme i mesto da igrate kosarku sa nekim'}
      </Typography>
      <Button
        color="secondary"
        variant="contained"
        size="large"
        component="a"
        href="/Events/"
        sx={{ minWidth: 200 }}
      >
        {j==='e'?'Find Events':'Pronadji dogadjaje'}
      </Button>
      <Typography variant="body2" color="inherit" sx={{ mt: 2 }}>
        {j==='e'?'Discover the experience':'Otkrijte novo iskustvo'}
      </Typography>
    </ProductHeroLayout>
  );
}
