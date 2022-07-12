import { createSlice }from "@reduxjs/toolkit";
const initialState={
    l:'e'
}

const CreateLanguageSlice = createSlice({
    name: 'language',
    initialState,
    reducers:{
        setLanguage(state,action){
            state.l=action.payload
        }
    }
})

export default CreateLanguageSlice.reducer;

export const {setLanguage} = CreateLanguageSlice.actions;

export const selectLanguage =(state)=>state.language?.l; //vracam samo l