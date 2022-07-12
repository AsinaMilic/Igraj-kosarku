import { useSelector } from 'react-redux';
import { selectLanguage } from '../../features/language/languageSlice';
import * as React from 'react';
import { styled } from '@mui/material/styles';
import Box from '@mui/material/Box';
import ButtonBase from '@mui/material/ButtonBase';
import Container from '@mui/material/Container';
import Typography from '../components/Typography';
import {useNavigate} from 'react-router-dom'

let j;
let naslov1,naslov2,naslov3,naslov4,naslov5,naslov6,naslov7,naslov8,naslov9;

const ImageBackdrop = styled('div')(({ theme }) => ({
  position: 'absolute',
  left: 0,
  right: 0,
  top: 0,
  bottom: 0,
  background: '#000',
  opacity: 0.5,
  transition: theme.transitions.create('opacity'),
}));

const ImageIconButton = styled(ButtonBase)(({ theme }) => ({
  position: 'relative',
  display: 'block',
  padding: 0,
  borderRadius: 0,
  height: '40vh',
  [theme.breakpoints.down('md')]: {
    width: '100% !important',
    height: 100,
  },
  '&:hover': {
    zIndex: 1,
  },
  '&:hover .imageBackdrop': {
    opacity: 0.15,
  },
  '&:hover .imageMarked': {
    opacity: 0,
  },
  '&:hover .imageTitle': {
    border: '4px solid currentColor',
  },
  '& .imageTitle': {
    position: 'relative',
    padding: `${theme.spacing(2)} ${theme.spacing(4)} 14px`,
  },
  '& .imageMarked': {
    height: 3,
    width: 18,
    background: theme.palette.common.white,
    position: 'absolute',
    bottom: -2,
    left: 'calc(50% - 9px)',
    transition: theme.transitions.create('opacity'),
  },
}));



export default function ProductPictures() {
  j=useSelector(selectLanguage);
  j==='e'?naslov1='Basketball':naslov1='Basket'
  j==='e'?naslov2='Shooting':naslov2='Sutiranje'
  j==='e'?naslov3='1 vs 1':naslov3='1 vs 1'
  j==='e'?naslov4='anyone':naslov4='bilo ko'
  j==='e'?naslov5='Training':naslov5='Trening'
  j==='e'?naslov6='Competition':naslov6='Takmicenje'
  j==='e'?naslov7='5 vs 5':naslov7='5 vs 5'
  j==='e'?naslov8='Emulate':naslov8='Imitiraj'
  j==='e'?naslov9='The best':naslov9='Najbolje'
  const images = [
    {
      url: 'https://images.pexels.com/photos/1080882/pexels-photo-1080882.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1',
      title: naslov1,
      width: '40%',
    },
    {
      url: 'https://images.pexels.com/photos/2820902/pexels-photo-2820902.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1',
      title: naslov2,
      width: '20%',
    },
    {
      url: 'https://images.pexels.com/photos/1080885/pexels-photo-1080885.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1',
      title: '1 vs 1',
      width: '40%',
    },
    {
      url: 'https://images.pexels.com/photos/6763758/pexels-photo-6763758.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1',
      title: naslov4,
      width: '38%',
    },
    {
      url: 'https://images.pexels.com/photos/2116469/pexels-photo-2116469.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1',
      title: naslov5,
      width: '38%',
    },
    {
      url: 'https://images.pexels.com/photos/2820899/pexels-photo-2820899.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1',
      title: naslov6,
      width: '24%',
    },
    {
      url: 'https://images.pexels.com/photos/3755445/pexels-photo-3755445.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1',
      title: '5 vs 5',
      width: '40%',
    },
    {
      url: 'https://images.pexels.com/photos/8979892/pexels-photo-8979892.jpeg?auto=compress&cs=tinysrgb&w=1600',
      title: naslov8,
      width: '30%',
    },
    {
      url: 'https://i.pinimg.com/736x/1c/b7/91/1cb7915fa61d23ce5bdd9ccd57e64b21.jpg',
      title: naslov9,
      width: '30%',
    },
  ];
  const navigate=useNavigate();
  return (
    <Container component="section" sx={{ mt: 8, mb: 4 }}>
      <Typography variant="h4" marked="center" align="center" component="h2">
        {j==='e'?'For all styles and all desires':'Za sve stilove i sve zelje'}
      </Typography>
      <Box sx={{ mt: 8, display: 'flex', flexWrap: 'wrap' }}>
        {images.map((image) => (
          <ImageIconButton
            key={image.title}
            style={{ width: image.width,}}
            onClick={()=>navigate('/Events')}
          >
            <Box
              sx={{
                position: 'absolute',
                left: 0,
                right: 0,
                top: 0,
                bottom: 0,
                backgroundSize: 'cover',
                backgroundPosition: 'center 40%',
                backgroundImage: `url(${image.url})`,
              }}
            />
            <ImageBackdrop className="imageBackdrop" />
            <Box
              sx={{
                position: 'absolute',
                left: 0,
                right: 0,
                top: 0,
                bottom: 0,
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                color: 'common.white',
              }}
            >
              <Typography
                component="h3"
                variant="h6"
                color="inherit"
                className="imageTitle"
              >
                {image.title}
                <div className="imageMarked" />
              </Typography>
            </Box>
          </ImageIconButton>
        ))}
      </Box>
    </Container>
  );
}
