import * as React from 'react';
import { Field, Form, FormSpy } from 'react-final-form';
import Box from '@mui/material/Box';
import Typography from './modules/components/Typography';
import AppFooter from './modules/views/AppFooter';
import AppAppBar from './modules/views/AppAppBar';
import AppForm from './modules/views/AppForm';
import { email, required } from './modules/form/validation';
import RFTextField from './modules/form/RFTextField';
import FormButton from './modules/form/FormButton';
import FormFeedback from './modules/form/FormFeedback';
import withRoot from './modules/withRoot';

function ForgotPassword() {
  const [sent, setSent] = React.useState(false);
  const [Email,setEmail]=React.useState('')
  const [poslato,setPoslato]= React.useState(false);

  const validate = (values) => {
    const errors = required(['email'], values);

    if (!errors.email) {
      const emailError = email(values.email);
      if (emailError) {
        errors.email = emailError;
      }
    }
    
    setEmail(values.email);
    return errors;
  };
  
  const HandleSubmit = () => {
    setSent(true);
    fetch(`https://kosarkaapi.azurewebsites.net/Users/reset-password?email=${Email}`,{
      method: 'GET',
      headers:  {'Content-Type': 'application/json'},
    }).then(setPoslato(true))
    
  };
  
  
  return (
    <React.Fragment>
      <AppAppBar />
      {!poslato?<AppForm>
            <React.Fragment>
              <Typography variant="h3" gutterBottom marked="center" align="center">
                Forgot your password?
              </Typography>
              <Typography variant="body2" align="center">
                {"Enter your email address below and we'll " +
                  'send you a link to reset your password.'}
              </Typography>
            </React.Fragment>
            <Form
              onSubmit={HandleSubmit}
              subscription={{ submitting: true }}
              validate={validate}
            >
              {({ handleSubmit: handleSubmit2, submitting }) => (
                <Box component="form" onSubmit={handleSubmit2} noValidate sx={{ mt: 6 }}>
                  <Field
                    autoFocus
                    autoComplete="email"
                    component={RFTextField}
                    disabled={submitting || sent}
                    fullWidth
                    label="Email"
                    margin="normal"
                    name="email"
                    required
                    size="large"
                  />
                  <FormButton
                    sx={{ mt: 3, mb: 2 }}
                    disabled={submitting || sent}
                    size="large"
                    color="secondary"
                    fullWidth
                  >
                    {submitting || sent ? 'In progress…' : 'Send reset link'}
                  </FormButton>
                </Box>
              )}
            </Form>
          </AppForm>
          :
          <AppForm>
            <React.Fragment>
              <Typography variant="h3" gutterBottom marked="center" align="center">
                Password Reset
              </Typography>
              <Box sx={{display:'flex',justifyContent:'center',flexDirection:'column',marginTop:'30px'}}>
              <Typography variant="body">
                        An email with a password reset link has been sent to your email:
              </Typography>
              <Typography align='center' variant='subtitle2' sx={{fontSize:'18px',margin:'10px'}} gutterBottom>
                {Email}
              </Typography >
              <Typography variant="body" align='center' gutterBottom sx={{marginTop:'20px'}}>
                        Check your email and click on the link to proceed!
              </Typography>
              </Box>
            </React.Fragment>
          </AppForm>}
      <AppFooter />
    </React.Fragment>
  );
}

export default withRoot(ForgotPassword);
