import { createSlice }from "@reduxjs/toolkit";


const initialState={
    name: null,
    type: null,
    nooPlayers: null,
    imgUrl: null,
    location:null,
    time: null,
    date: null,
    descriptio: null,
}

const CreateEventSlice = createSlice({
    name: 'event',
    initialState,
    reducers:{
        setEvent(state,action){
            const {name,type,nooPlayers,imgUrl,location,time,date,descriptio}=action.payload;
            state.name=name;
            state.type=type;
            state.nooPlayers=nooPlayers;
            state.imgUrl=imgUrl;
            state.location=location;
            state.time=time;
            state.date=date;
            state.descriptio=descriptio;
        }
    }
})

export default CreateEventSlice.reducer;

export const {setEvent} = CreateEventSlice.actions;

export const selectCurrenEvent =(state)=>state.event; //vracam ceo event