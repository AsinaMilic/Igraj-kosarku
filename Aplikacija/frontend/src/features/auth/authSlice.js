import { createSlice }from "@reduxjs/toolkit";

const initialState = {
    id: null,
    token: null,
    firstName: null,
    lastName: null,
    email: null,
    location: null, //string?
    role: null,
    createdAt: null,
    teams: null,
    phoneNumber: null,
    status:null,
    passwordResetToken: null,
    imageUrl:null
}

const authSlice = createSlice({
    name: 'auth',
    initialState,
    reducers:{
        setCredentials(state,action){
            const {user,token} = action.payload;
            console.log(token)
            state.id=user?.id;
            state.firstName=user?.firstName;
            state.lastName=user?.lastName;
            state.email=user?.email;
            state.role=user?.role;
            state.location=user?.location;
            state.createdAt=user?.createdAt;
            state.teams=user?.teams;
            state.phoneNumber=user?.phoneNumber;
            state.status=user?.status;
            state.imageUrl=user?.imageUrl
            state.token=token
        },
        logOut(state){            // logging out 
            state.id=null;
            console.log(state.id)
            state.firstName=null;
            state.lastName=null;
            state.email=null;
            state.role=null;
            state.location=null;
            state.createdAt=null;
            state.teams=null;
            state.phoneNumber=null;
            state.status=null;
            state.imageUrl=null;
            state.token=null //token je obrisan
        },
        setToken(state,action){
            const {token}=action.payload;
            state.token=token;
            
        },
        setPasswordResetToken(state,action){
            console.log(action.payload)
            state.passwordResetToken=action.payload
            console.log(state.passwordResetToken)
        }
    }
})

export const {setCredentials,logOut,setToken,setPasswordResetToken} = authSlice.actions;

export default authSlice.reducer;

//selectori koji mozemo da koristimo
export const selectCurrentUser=(state)=>state?.auth;  //vracam ceo initialState
export const selectCurrentToken=(state)=>state?.auth?.token;