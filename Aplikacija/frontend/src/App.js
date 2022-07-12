import React, { Component, useEffect } from 'react';
import { BrowserRouter as Router,Routes, Route, Switch } from 'react-router-dom';
import { Container } from '@mui/material';
import { Provider } from 'react-redux';

import Index from './Home'
import SignIn from './SignIn'
import SignUp from './SignUp'
import Terms from './Terms'
import Privacy from './Privacy'
import ForgotPassword from './ForgotPassword'
import Events from './features/events/Events.js';
import Event from './features/event/Event';
import RequireAuth from './features/auth/RequireAuth';
import CreateProfile from './features/createprofile/CreateProfile';
import CreateEvent from './features/createvent/CreateEvent';
import NotFound from './modules/views/404';
import Account from './features/account/account';
import Users from './features/admin/users';
import Dashboard from './features/admin/dashboard/dashboard';
import ResetPassword from './ResetPassword';
import EventSpecial from './features/eventSpecial/EventSpecial';

/*1080=admin, 2300=trener, 3636=igrac  Ovo naravno ne bi bilo ostavljeno u produkciji*/
/*Router->Routes->Route*/
function App(){
    return (
          
            <Routes>
              <Route path="/" element={<Index/>} />
              <Route path="/sign-in/" element={<SignIn/>} />
              <Route path="/sign-up/" element={<SignUp/>} />
              <Route path="/terms/" element={<Terms/>} />  
              <Route path="/privacy/" element={<Privacy/>} />
              <Route path="/forgot-password" element={<ForgotPassword/>} />
              <Route path="/Events" element={<Events/>}/>
              <Route path="/EventSpecial/:id" element={<EventSpecial/>}/>
              <Route path="/Events/:id" element={<Event/>}/>
              <Route path="/users/:id" element={<Account/>}/>

              <Route element={<RequireAuth allowedRoles={[1080,3636,2300]}/>} >
                <Route path="/create-event" element={<CreateEvent/>}/> 
              </Route> 

              <Route element={<RequireAuth allowedRoles={[2300,3636]}/>} >
                <Route path="/create-profile" element={<CreateProfile/>}/>
              </Route> 

              <Route element={<RequireAuth allowedRoles={[1080]}/>} >
                <Route path="/users" element={<Users/>}/>
                <Route path="/dashboard" element={<Dashboard/>}/>
              </Route>

              <Route path="/reset-password/:id" element={<ResetPassword/>}/>
              
              <Route path='*' element={<NotFound/>} />
                
            </Routes>
      
    );
  }

export default App;
