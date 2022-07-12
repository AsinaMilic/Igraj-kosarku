import * as React from 'react';
import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
import Link from '@mui/material/Link';
import Container from '@mui/material/Container';
import Typography from '../components/Typography';
import TextField from '../components/TextField';
import { useDispatch, } from 'react-redux';
import { setLanguage } from '../../features/language/languageSlice';
import { useSelector } from 'react-redux';
import { selectLanguage } from '../../features/language/languageSlice';
let j

function Copyright() {
  j=useSelector(selectLanguage);
  return (
    <>
      {'© '}
      <Link color="inherit" href="https://mui.com/">
        {j==='e'? 'Our Website':'Nas sajt'}
      </Link>{' '}
      {new Date().getFullYear()}
    </>
  );
}

const iconStyle = {
  width: 48,
  height: 48,
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center',
  backgroundColor: 'warning.main',
  mr: 1,
  '&:hover': {
    bgcolor: 'warning.dark',
  },
};

const LANGUAGES = [
  {
    code: 'e',
    name: 'English',
  },
  {
    code: 's',
    name: 'Srpski',
  },
];

export default function AppFooter(props) {
  const dispatch=useDispatch()
  let j=useSelector(selectLanguage);

  let jezik=localStorage.getItem('language')
  if(jezik=='s'){
    dispatch(setLanguage(jezik))
    j='s'; 
  }

  const putLanguage=(e)=>{
    dispatch(setLanguage(e.target.value)) //ne mogu da persistiram ovu vrednost
    localStorage.setItem('language',(e.target.value))
  }
  
  let boja= props.color? props.color: 'secondary.light' //JER ETO BOJE NE RADE LEPO
  return (
    <Typography
      component="footer"
      sx={{ display: 'flex', bgcolor: boja}}
    >{/*my : koliko veliko hoces roza boja da ti bude*/}
      <Container sx={{ my: 8, display: 'flex'}}>
        <Grid container spacing={5}>
          <Grid item xs={6} sm={4} md={3}>
            <Grid
              container
              direction="column"
              justifyContent="flex-end"
              spacing={2}
              sx={{ height: 120 }}
            >
              <Grid item sx={{ display: 'flex' }}>
                <Box component="a" href="https://mui.com/" sx={iconStyle}>
                  <img
                    src="/onepirate/appFooterFacebook.png"
                    alt="Facebook"
                  />
                </Box>
                <Box component="a" href="https://twitter.com/MUI_hq" sx={iconStyle}>
                  <img
                    src="/onepirate/appFooterTwitter.png"
                    alt="Twitter"
                  />
                </Box>
              </Grid>
              <Grid item>
                <Copyright />
              </Grid>
            </Grid>
          </Grid>
          <Grid item xs={6} sm={4} md={2}>
            <Typography variant="h6" marked="left" gutterBottom>
              {j==='e'?'Legal':'Legalno'}
            </Typography>
            <Box component="ul" sx={{ m: 0, listStyle: 'none', p: 0 }}>
              <Box component="li" sx={{ py: 0.5 }}>
                <Link href="/terms/">{j==='e'?'Terms':'Uslovi'}</Link>
              </Box>
              <Box component="li" sx={{ py: 0.5 }}>
                <Link href="/privacy/">{j==='e'?'Privacy':'Privatnost'}</Link>
              </Box>
            </Box>
          </Grid>
          <Grid item xs={6} sm={4} >
            <Typography variant="h6" marked="left" gutterBottom>
              {j==='e'?'Language':'Jezik'}
            </Typography>
            <TextField
              select
              size="medium"
              variant="standard"
              onChange={(e)=>putLanguage(e)}
              SelectProps={{
                native: true,
              }}
              sx={{ mt: 1, width: 150 }}
            >
                <option value={LANGUAGES[0].code} key={LANGUAGES[0].code} selected={jezik=='e'?true:false}>
                  {LANGUAGES[0].name}
                </option>
                <option value={LANGUAGES[1].code} key={LANGUAGES[1].code} selected={jezik=='s'?true:false}>
                  {LANGUAGES[1].name}
                </option>
            </TextField>
          </Grid>
          <Grid item>
            <Typography variant="caption">
              {j==='e'?'Icons made by ':'Ikonice su napravljene od '}
              <Link href="https://www.freepik.com" rel="sponsored" title="Freepik">
                Freepik
              </Link>
              {j==='e'?' from ':' sa '}
              <Link href="https://www.flaticon.com" rel="sponsored" title="Flaticon">
                www.flaticon.com
              </Link>
              {j==='e'?' is licensed by ':' lincencirano od stane '}
              <Link
                href="https://creativecommons.org/licenses/by/3.0/"
                title="Creative Commons BY 3.0"
                target="_blank"
                rel="noopener noreferrer"
              >
                CC 3.0 BY
              </Link>
            </Typography>
          </Grid>
        </Grid>
      </Container>
    </Typography>
  );
}
