import React from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import Box from '@mui/material/Box';
import Typography from './modules/components/Typography';
import AppFooter from './modules/views/AppFooter';
import AppAppBar from './modules/views/AppAppBar';
import AppForm from './modules/views/AppForm';
import withRoot from './modules/withRoot';
import TextField from './modules/components/TextField';
import { FormHelperText, InputAdornment, OutlinedInput } from '@mui/material';
import Visibility from '@mui/icons-material/Visibility';
import VisibilityOff from '@mui/icons-material/VisibilityOff';
import IconButton from '@mui/material/IconButton';
import LockTwoToneIcon from '@mui/icons-material/LockTwoTone';
import Button from './modules/components/Button';

const ResetPassword = () => {
    const {id}=useParams()
    const navigate=useNavigate()
    const [showPassword,setShowPassword]=React.useState(false)
    const [password,setPassword]=React.useState('')
    const [showPassword2,setShowPassword2]=React.useState(false)
    const [password2,setPassword2]=React.useState('')
    const [minError1,setMinError1]=React.useState(false)
    const [minError2,setMinError2]=React.useState(false)
    const [notMatching,setNotMatching]=React.useState(false)
    const [Success,setSuccess]=React.useState(false)

  

    const handlePassword1=(pass)=>{
      setPassword(pass)
      if(pass.length<8)
        setMinError1(true)
      else
        setMinError1(false)
    }
    const handlePassword2=(pass)=>{
      setPassword2(pass)
      console.log(password)
      console.log(pass)
      if(password!==pass) 
        setNotMatching(true)
      else  
        setNotMatching(false)

      if(pass.length<8)
        setMinError2(true)
      else 
        setMinError2(false)
    }
    const Submit=()=>{
      fetch(`https://kosarkaapi.azurewebsites.net/Users/reset-password/${id}`,{
      method: 'POST',
      headers:  {'Content-Type': 'application/json'},
      body: JSON.stringify(password)
    }).then(setSuccess(true))
      
    }

if(!Success)
  return (<>
    <AppAppBar />
    <Box sx={{ textAlign: 'center',maxHeight:'20vh',marginBottom:'-30px' }}>
                <img
                  alt="Under development"
                  src="/onepirate/logoNarandzasti.svg"
                  style={{
                    marginTop: 10,
                    display: 'inline-block',
                    maxHeight: '20vh'
                  }}
          />
    </Box>
      <AppForm>
        
        <Typography variant="h3" gutterBottom marked="center" align="center" sx={{marginTop:'-20px'}}>
                    Password Reset
        </Typography>
        
        <Typography variant="h6" sx={{marginTop:'30px'}}>New password</Typography>
        
        
        <OutlinedInput
            id="outlined-adornment-password"
            autoFocus
            type={showPassword ? 'text' : 'password'}
            value={password}
            onChange={(e)=>handlePassword1(e.target.value)}
            fullWidth
            startAdornment={
              <InputAdornment position="start">
                <LockTwoToneIcon/>
              </InputAdornment>
            }
            endAdornment={
              <InputAdornment position="end">
                <IconButton
                  aria-label="toggle password visibility"
                  onClick={()=>setShowPassword(!showPassword)}
                  onMouseDown={(e)=>{e.preventDefault()}}
                  edge="end"
                >
                  {showPassword ? <VisibilityOff /> : <Visibility />}
                </IconButton>
              </InputAdornment>
            }
            error={minError1}
          />
          {minError1&&<FormHelperText>
            Must be at least 8 characters
          </FormHelperText>}

        <Typography variant="h6" sx={{marginTop:'30px'}}>Confirm New password</Typography>

        <OutlinedInput
            id="outlined-adornment-password"
            type={showPassword2 ? 'text' : 'password'}
            value={password2}
            onChange={(e)=>handlePassword2(e.target.value)}
            fullWidth
            startAdornment={
              <InputAdornment position="start">
                <LockTwoToneIcon/>
              </InputAdornment>
            }
            endAdornment={
              <InputAdornment position="end">
                <IconButton
                  aria-label="toggle password visibility"
                  onClick={()=>setShowPassword2(!showPassword2)}
                  onMouseDown={(e)=>{e.preventDefault()}}
                  edge="end"
                >
                  {showPassword2 ? <VisibilityOff /> : <Visibility />}
                </IconButton>
              </InputAdornment>
            }
            error={minError2}
          />
          {minError2&&<FormHelperText>
            Must be at least 8 characters
          </FormHelperText>}
           
            {notMatching&& <Typography color='secondary.dark' align='center' sx={{marginTop:'20px'}}> Passwords doesn't match</Typography>}

          <Button         
            size="large"
            sx={{marginTop:'30px',backgroundColor:'secondary.main',color:'white'}}
            fullWidth
            onClick={()=>Submit()}
            disabled={!(!notMatching && !minError1 && !minError2 && password2)}
          >
            Submit
          </Button>
         
      </AppForm>
    <AppFooter />
  
    </>)

  else
    return(<>
      <AppAppBar/>
      <Box sx={{ textAlign: 'center',maxHeight:'20vh',marginBottom:'-30px' }}>
                <img
                  alt="Under development"
                  src="/onepirate/logoNarandzasti.svg"
                  style={{
                    marginTop: 10,
                    display: 'inline-block',
                    maxHeight: '20vh'
                  }}
          />
    </Box>
      <AppForm>
        
        <Typography variant="h3" gutterBottom marked="center" align="center" sx={{marginTop:'-20px'}}>
                    Password reset
        </Typography>
        <Typography variant="h5" sx={{marginTop:'30px'}} align='center'>Your password has been reset successfully</Typography>
        <Typography variant="h5" sx={{marginTop:'0px'}} align='center'>You may now login</Typography>
        <Box sx={{display:'flex',justifyContent:'center'}}>
        <Button         
            size="large"
            sx={{marginTop:'30px',backgroundColor:'secondary.main',color:'white'}}
            onClick={()=>navigate('/sign-in')}
          >
            Sign in
          </Button>
        </Box>
        </AppForm>
      <AppFooter/>
      
    </> )
}

export default withRoot(ResetPassword)