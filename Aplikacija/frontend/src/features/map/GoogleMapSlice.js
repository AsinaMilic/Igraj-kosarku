import { createSlice }from "@reduxjs/toolkit";

const initialState = {
    lat: null,
    lng : null,
    weather: null,
    address: null, //ne upisuje se sa SingIn. Videcu da li mi treba
}

const locationSlice = createSlice({
    name: 'location',
    initialState,
    reducers:{
        setLocation(state,action){
            const {lat,lng,weather,address} = action.payload;
            state.lat=lat;
            state.lng=lng;
            state.weather=weather;
            state.address=address;
        },
        
    }
})

export const {setLocation} = locationSlice.actions;

export default locationSlice.reducer;

//selectors we can use 
export const selectCurrentLocation=(state)=>state.location;  //vracam ceo initialState
export const selectCurrentLat=(state)=>state.location.lat;
export const selectCurrentLng=(state)=>state.location.lng;