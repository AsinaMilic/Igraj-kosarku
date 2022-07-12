import { configureStore } from "@reduxjs/toolkit";
import { apiSlice } from "./api/apiSlice";
import authReducer from './features/auth/authSlice'
import eventReducer from './features/createvent/CreateEventSlice' //eventReducer sam sam imenovao
import languageReducer from "./features/language/languageSlice";
import locationReducer from './features/map/GoogleMapSlice';

import {
    persistStore,
    persistReducer,
    FLUSH,
    REHYDRATE,
    PAUSE,
    PERSIST,
    PURGE,
    REGISTER,
} from 'redux-persist'
import storage from 'redux-persist/lib/storage'


const persistConfig = {
    key: "root",
    storage,
   
};

const persistedReducer = persistReducer(persistConfig, authReducer);

const store=configureStore({
    reducer:{
       [apiSlice.reducerPath]: apiSlice.reducer,
        auth: persistedReducer, //authReducer
       event: eventReducer, //eventReducer sam sam imenovao 1.Slice 2.Store 3.drugi .js?
       location: locationReducer,
       language: languageReducer

    },
    //just need to get this in (RTK to cache results)
    middleware: getDefaultMiddleware=>
        getDefaultMiddleware({
            serializableCheck: {
                ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
            },
        }).concat(apiSlice.middleware),
    //devTools: true  //if production then true?
})

const persistor = persistStore(store);

export {store,persistor}

