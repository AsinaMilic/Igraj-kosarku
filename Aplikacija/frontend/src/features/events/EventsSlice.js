import { createSlice }from "@reduxjs/toolkit";

const initialState = {
    id: null,
    name: null,
    description : null,
    location: null,
    createdByUserId: null,
    activityDateTime: null, 
    numberOfPlayers: null,
    courdId: null,
}

const eventSlice = createSlice({
    name: 'event',
    initialState,
    reducers:{
        setEvent(state,action){
            const {id,name,description,location,createdByUserId,activityDateTime,numberOfPlayers,courdId} = action.payload;
            state.id=id;
            state.name=name;
            state.description=description;
            state.location=location;
            state.createdByUserId=createdByUserId;
            state.activityDateTime=activityDateTime;
            state.numberOfPlayers=numberOfPlayers;
            state.courdId=courdId;
        },
        
    }
})

export const {setEvent,} = eventSlice.actions;

export default eventSlice.reducer;

//selectors we can use 
export const selectCurrentEvent=(state)=>state.event;  //vracam ceo event
