import { useState,useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
import Link from '@mui/material/Link';
import { Chip, Divider } from '@mui/material';
import { Field, Form, FormSpy } from 'react-final-form';
import Typography from './modules/components/Typography';
import AppFooter from './modules/views/AppFooter';
import AppAppBar from './modules/views/AppAppBar';
import AppForm from './modules/views/AppForm';
import { email, required } from './modules/form/validation';
import RFTextField from './modules/form/RFTextField';
import FormButton from './modules/form/FormButton';
import FormFeedback from './modules/form/FormFeedback';
import withRoot from './modules/withRoot';
import { selectCurrentUser, setCredentials, setToken } from './features/auth/authSlice';
import {useRegisterUserMutation,useLoginUserMutation, usePutUserMutation} from './api/apiSlice'
import { useSelector } from 'react-redux';


import jwt_decode from "jwt-decode"
import { selectLanguage } from './features/language/languageSlice';
let j


function SignUp() {
  j=useSelector(selectLanguage);
  const [sent, setSent] = useState(false);
  const navigate=useNavigate(); 
  const dispatch = useDispatch();
  const [registerUser] = useRegisterUserMutation(); //init
  const [loginUser, {isLoading}] = useLoginUserMutation(); 
  const [Email,setEmail]= useState('');
  const [Password,setPassword]=useState('');
  const [FirstName,setFirstName]=useState('');
  const [LastName,setLastName]=useState('');
  const [errorMessage, setErrorMessage] = useState('');
  const [putUser]=usePutUserMutation()

  useEffect(()=>{
     /* global google */
     //const google=window.google
    const google = window.google = window.google ? window.google : {}
    google.accounts?.id?.initialize({
      client_id: "929206234839-pa4efolq29b11hcm5hevrsbql0g6kpeq.apps.googleusercontent.com", //moj id 
      callback: handleGoogleCallbackResponse
    })
    google.accounts?.id?.renderButton(
      document.getElementById("signInDiv"), 
      {theme: 'filled',size:'large'}
    )
    localStorage.removeItem('token');
  },[]);

  async function handleGoogleCallbackResponse(response){ //response koji dobijem od google login
    let userObject=jwt_decode(response.credential)
    console.log(userObject)
    const{

    }= await registerUser({
      email: userObject?.email,
      password: "Admin123",
      firstName: userObject?.given_name,
      lastName:  userObject?.family_name,
    })
    const obj1={
      email: userObject?.email,
      password: "Admin123"
    }
    await fetch(`https://kosarkaapi.azurewebsites.net/Users/auth`,{
      method: 'POST',
      headers:  {'Content-Type': 'application/json'},
      body: JSON.stringify(obj1)
    }).then((response) => response.json())
      .then((data)=>{
        console.log("SUCCESS",data)
        localStorage.setItem('token',data?.token);
        dispatch(setCredentials(data))
        //navigate("/Events")
        setSent(true)
        
        const todo={
          email: userObject?.email,
          firstName: userObject?.given_name,
          lastName:  userObject?.family_name,
          imageUrl: userObject?.picture
        }
        const obj={
          todo: todo,
          id: data?.user?.id
        }
        putUser(obj)
        setSent(true)
        navigate("/create-profile")
      })
    

  }


  const validate = (values) => {

    const errors = required(['firstName', 'lastName', 'email', 'password'], values);
    setEmail(values.email);
    setPassword(values.password);
    setFirstName(values.firstName);
    setLastName(values.lastName);
    
    if (!errors.email) {
      const emailError = email(values.email);
      if (emailError) {
        errors.email = emailError;
      }
    }
    
    return errors;
  };
  let ERROR
  const handleSubmit = async() => {
    try{
      const {
        error
      }
      =await registerUser({
        email: Email,
        password: Password,
        firstName: FirstName,
        lastName:  LastName,
      })
      ERROR=error;
      setErrorMessage(ERROR?.data.slice(38,75))
      const userData = await loginUser({Email,Password}).unwrap()
      dispatch(setCredentials(userData))
      localStorage.setItem('token',userData.token);
      
      
  }catch(err){
    if(!err.reponse)
        alert('No Server Response');
      else if(err.reponse?.status===400)
        alert('Missing Username or Password');
      else if(err.reponse?.status===401)
        alert('Unauthorized')
      else
        alert('Login Failed')
      return false;
  }
  if(ERROR)
    return false
  else{
    setSent(true);
    navigate("/create-profile");
  }
  return false
 
}
  return (
    <>
      <AppAppBar />
      <AppForm>
        <>
          <Typography variant="h3" gutterBottom marked="center" align="center">
            {j==='e'?'Sign Up':'Registracija'}
          </Typography>
          <Typography variant="body2" align="center">
            <Link href="/sign-in/" underline="always">
              {j==='e'?'Already have an account?':'Vec imas napravljen nalog?'}
            </Link>
          </Typography>
        </>
        <Box sx={{display:'flex',justifyContent:'center',mb:'20px',mt:'20px'}} >
          <div id="signInDiv" style={{alignSelf:'center'}}> </div> 
        </Box>
        <Divider><Chip label={j==='e'?'or':'ili'} variant='outlined' size='medium'></Chip></Divider>
        <Form
          onSubmit={event=>handleSubmit(event)}
          subscription={{ submitting: true }}
          validate={validate}
        >
          {({ handleSubmit: handleSubmit2, submitting }) => (
            
            <Box component="form" onSubmit={handleSubmit2} noValidate sx={{ mt: 3 }}>
              <Grid container spacing={2}>
                <Grid item xs={12} sm={6}>
                  <Field
                    autoFocus
                    component={RFTextField}
                    disabled={submitting || sent}
                    autoComplete="given-name"
                    fullWidth
                    label={j==='e'?"First name":'Licno ime'}
                    name="firstName"
                    required
                    onClick={()=>setErrorMessage('')}
                  />
                </Grid>
                <Grid item xs={12} sm={6}>
                  <Field
                    component={RFTextField}
                    disabled={submitting || sent}
                    autoComplete="family-name"
                    fullWidth
                    label={j==='e'?"Last name":'Licno prezime'}
                    name="lastName"
                    required
                    onClick={()=>setErrorMessage('')}
                  />
                </Grid>
              </Grid>
              <Field
                autoComplete="email"
                component={RFTextField}
                disabled={submitting || sent}
                fullWidth
                label="Email"
                margin="normal"
                name="email"
                required
                onClick={()=>setErrorMessage('')}
              />
              <Field
                fullWidth
                component={RFTextField}
                disabled={submitting || sent}
                required
                name="password"
                autoComplete="new-password"
                label={j==='e'?"Password":'Lozinka'}
                type="password"
                margin="normal"
                onClick={()=>setErrorMessage('')}
              />
              {errorMessage?<Typography color='secondary.dark' align='center'> {errorMessage}!</Typography>:null}
              <FormSpy subscription={{ submitError: true }}> 
                {({ submitError }) =>
                  submitError ? (
                    <FormFeedback error sx={{ mt: 2 }}>
                      {submitError}
                    </FormFeedback>
                  ) : null
                }
              </FormSpy>
              <FormButton
                sx={{ mt: 3, mb: 2 }}
                disabled={submitting || sent}
                color="secondary"
                fullWidth
              >
                {submitting || sent ? 'In progress…' : 'register'}
              </FormButton>
              <Typography variant="subtitle2">
                    {j==='e'?'By creating an account, you accept Play basketaball':'Kreiranjem kanala, prihvatate Igraj kosarku'} <Link href="/terms/">{j==='e'?'Terms of Service':'Uslove koriscenja'} </Link> {j===' e '?'and':' i '} <Link href="/privacy/">{j==='e'?'Privacy Policy':'Politiku privatnosti'}</Link>
              </Typography>
              
            </Box>
          )}
        </Form>
      </AppForm>
      <AppFooter />
    </>
  );
}

export default withRoot(SignUp);
