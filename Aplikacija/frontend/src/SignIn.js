import * as React from 'react';
import { useState,useEffect} from 'react'
import { useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';

import { setCredentials, setToken } from './features/auth/authSlice';
import { useLoginUserMutation} from './api/apiSlice'

import { Field, Form, FormSpy } from 'react-final-form'; //posebna biblioteka
import Box from '@mui/material/Box'; //T
import Link from '@mui/material/Link'; //T
import { Chip, Divider } from '@mui/material';
import Typography from './modules/components/Typography'; //T
import AppFooter from './modules/views/AppFooter'; //T
import AppAppBar from './modules/views/AppAppBar'; //T
import AppForm from './modules/views/AppForm'; //T 
import { email, required } from './modules/form/validation'; //T
import RFTextField from './modules/form/RFTextField'; //T
import FormButton from './modules/form/FormButton'; //T
import FormFeedback from './modules/form/FormFeedback'; //T
import withRoot from './modules/withRoot'; //T
import { useSelector } from 'react-redux';
import jwt_decode from "jwt-decode"
import { selectLanguage } from './features/language/languageSlice';
let j

function SignIn() {
  j=useSelector(selectLanguage);
  const [Email,setEmail]=useState('');
  const [password,setPassword]=useState('');
  const navigate=useNavigate();
  const [loginUser, {isLoading}] = useLoginUserMutation(); 
  const dispatch = useDispatch(); //classic from reddux
  const [sent, setSent] = React.useState(false); //T
  const [errorMessage, setErrorMessage] = useState('');
  let ERROR
  useEffect(()=>{
    /* global google */
    //const google=window.google
    const google = window.google = window.google ? window.google : {}
    google.accounts?.id?.initialize({
      client_id: "929206234839-pa4efolq29b11hcm5hevrsbql0g6kpeq.apps.googleusercontent.com",
      callback: handleGoogleCallbackResponse
    })
    google.accounts?.id?.renderButton(
      document.getElementById("signInDiv"), 
      {theme: 'outlined',size:'large'}
    )
    localStorage.removeItem('token');

  },[])

  async function handleGoogleCallbackResponse(response){ //response koji dobijem od google login
    let userObject=jwt_decode(response.credential)
    console.log(userObject)
    const obj={
      email: userObject?.email,
      password: "Admin123"
    }
    fetch(`https://kosarkaapi.azurewebsites.net/Users/auth`,{
      method: 'POST',
      headers:  {'Content-Type': 'application/json'},
      body: JSON.stringify(obj)
    }).then((response) => response.json())
      .then((data)=>{
        console.log("SUCCESS",data)
        localStorage.setItem('token',data.token);
        dispatch(setCredentials(data))
        navigate("/Events")
        setSent(true)
      })
  }
  //google.accounts.id.prompt();// ma neki prompt kao nastavite logovani na ovom acc..
  
  
  const validate = (values) => { 
    setEmail(values.email)
    setPassword(values.password)
    
    const errors = required(['email', 'password'], values);
    if (!errors.email) {
      const emailError = email(values.email);
      if (emailError) {
        errors.email = emailError;
      }
    }
    
    return errors;
  };
 //T
  const handleSubmit = async (e) => {
    
    try{
      const {
        data: userData,
        isSuccess,
        isError,
        error 
      }= await loginUser({Email,password})//from RTK and it allows us to use try catch so it can repond accordingly. You can see it by retyping it again
      console.log(userData)
      if(!userData)
        setErrorMessage('The email address or password is incorrect. Please retry...')
      localStorage.setItem('token',userData.token);
      console.log(userData)
      dispatch(setCredentials(userData))

      ERROR=error
      setErrorMessage(ERROR?.data.slice(38,75))
      console.log(errorMessage)
      console.log(isError)
      console.log(error)
      console.log(isSuccess)
       
    }catch(err){
      if(!err.reponse)
        console.log(err);
      else if(err.reponse?.status===400)
        console.log('Missing Username or Password');
      else if(err.reponse?.status===401)
        console.log('Unauthorized')
      else
        console.log('Login Failed')
      return false
    }
    if(ERROR)
      return false
    else{
      setSent(true); 
      navigate("/events");
    }
    return false;
  };

  return (
    <>
      <AppAppBar />
      <AppForm>
        <>
          <Typography variant="h3" gutterBottom marked="center" align="center">
            Sign In
          </Typography>
          <Typography variant="body2" align="center">
            {'Not a member yet? '}
            <Link
              href="/sign-up/"
              align="center"
              underline="always"
            >
              Sign Up here
            </Link>
          </Typography>
          
        </>
        
        <Form
          onSubmit={handleSubmit}
          subscription={{ submitting: true }}
          validate={validate}
        >
          {({ handleSubmit: handleSubmit2, submitting }) => (
            <Box component="form" onSubmit={handleSubmit2} noValidate sx={{ mt: 6 }}>
              
              
              <Box sx={{display:'flex',justifyContent:'center',mb:'20px'}} >
              <div id="signInDiv" style={{alignSelf:'center'}}> </div>
             </Box>
             <Divider><Chip label='or' variant='outlined' size='medium'></Chip></Divider>
              
              <Field
                autoComplete="email"
                autoFocus
                component={RFTextField}
                disabled={submitting || sent}
                fullWidth
                label="Email"
                margin="normal"
                name="email"
                required
                size="large"
                onClick={()=>setErrorMessage('')}
              />
              <Field
                fullWidth
                size="large"
                component={RFTextField}
                disabled={submitting || sent}
                required
                name="password"
                autoComplete="current-password"
                label={j==='e'?"Password":'Lozinka'}
                type="password"
                margin="normal"
                onClick={()=>setErrorMessage('')}
              />
              {errorMessage?<Typography color='secondary.dark' align='center'> {errorMessage}</Typography>:null}
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
                size="large"
                color="secondary"
                fullWidth
              >
                {submitting || sent ? 'In progress…' : 'Sign In'}
              </FormButton>
            </Box>
          )}
        </Form>
        <Typography align="center">
          <Link underline="always" href="/forgot-password/">
            {j==='e'?'Forgot password?':'Zaboravili ste sifru?'}
          </Link>
        </Typography>
        
      </AppForm>
      
      <AppFooter />
    </>
  );
}

export default withRoot(SignIn);
