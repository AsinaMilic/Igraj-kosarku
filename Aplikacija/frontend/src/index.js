import React from 'react'; 
import ReactDOM from 'react-dom/client'; //def
import App from './App';  

import {store,persistor} from './store'
import {Provider} from 'react-redux' 

import {BrowserRouter, Routes, Route} from 'react-router-dom'

import { PersistGate } from 'redux-persist/integration/react'


const root = ReactDOM.createRoot(document.getElementById('root')); //def
root.render(  
  <React.StrictMode>   
    <BrowserRouter>
      <Provider store={store}>
        <PersistGate loading={null} persistor={persistor}>
          <App />
        </PersistGate>      
      </Provider>  
    </BrowserRouter> 
  </React.StrictMode>
);
