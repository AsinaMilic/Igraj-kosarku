import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { setCredentials, logOut, selectCurrentToken } from '../features/auth/authSlice'
import { useSelector } from 'react-redux';

const baseQuery = fetchBaseQuery({
    baseUrl: 'https://localhost:7300', //3500 je bilo
    credentials: 'same-origin', //https://www.youtube.com/watch?v=-JJFQ9bkUbo 7:30 "u want to send cookie with every query"
    prepareHeaders: (headers)=>{
        headers.set('Access-Control-Allow-Origin', '*') //ne reseva bug za cross origin
        //const token = getState().auth.token //
        const token = localStorage.getItem('token');
        console.log(token);
        if(token){     
            headers.set("authorization",   `Bearer ${token}`)
        }  
        return headers
    }
})
                                  //required
const baseQueryWithReauth = async (args,api,extraOptions) => {
    let result = await baseQuery(args,api, extraOptions)
    if(result?.error?.originalStatus===403){
        console.log("sending refresh token");
        //send refres token to get new access token
                                            //refresh endpoint backend
        const refreshResult= await baseQuery('/refresh',api, extraOptions);
        console.log(refreshResult);

        if(refreshResult?.data){
            const user = api.getState().auth.user

            //store new token
            api.dispatch(setCredentials({...refreshResult.data, user }))

            //retry the original query with new access token
            result = await baseQuery(args,api,extraOptions);
        }
    }else{
       // api.dispatch(logOut()); 
    }
    return result;
}


export const apiSlice = createApi({
    baseQuery: baseQueryWithReauth, 
    tagTypes: ['Events','Comments','User','Rate','Teams'],
    endpoints: (builder)=>({
        getUsers: builder.query({
            query: ()=> '/Users/all'
        }),
        getUser: builder.query({
            query: (id)=> `Users/${id}`,
            providesTags: ['User']
        }),
        registerUser: builder.mutation({
            query: (todo) => ({
                url:'/Users/register',
                method: 'POST',
                body: todo
            })
        }),
        putUser: builder.mutation({
            query: ({todo,id})=>({
                url: `/Users/update/${id}`,
                method: 'PUT',
                body: {...todo}   //hahaha moralo 3 tackice
            }),
            invalidatesTags: ["Comments"]
        }),
        deleteUser: builder.mutation({
            query: (id)=>({
                url: `/Users/${id}`,
                method: 'DELETE',
                body: id
            }),
            invalidatesTags: ["User"]
        }),
        loginUser: builder.mutation({
            query: credentials => ({
                url: '/Users/auth',  //bukv endpoints koji se dodaju na baseURL
                method: 'POST',
                body: {...credentials}
            })
        }),




        getComments: builder.query({
            query: ({id}) => `/api/Comment/${id}`, //id aktivnosti  //id ili {id} pazi da nije objekat
            providesTags: ['Comments']
        }),
        postComment: builder.mutation({
            query: ({text,id}) => ({       //boze sacuvaj ovaj rtk query...
                url: `/api/Comment/${id}`,
                method: 'POST',
                body: {text}
            }),
            invalidatesTags: ["Comments"]
        }),
        putComment: builder.mutation({
            query: ({text,id})=>({
                url: `/api/Comment/${id}`,
                method: 'PUT',
                body: {text}
            }),
            invalidatesTags: ["Comments"]
        }),
        deleteComment: builder.mutation({
            query: ({id})=>({
                url: `/api/Comment/${id}`,
                method: 'DELETE'
               // body: {id}
            }),
           invalidatesTags: ["Comments"]  
        }),


        
        getEvents: builder.query({        //get all Events/Activities
            query: () => '/api/Activities',
            providesTags: ['Events']
        }),
        getEvent: builder.query({
            query: (id)=>( `api/Activities/${id}`),
            providesTags: ["Teams"]
        }),
        deleteEvent: builder.mutation({
            query: (id)=>({
                url: `/api/Activities/${id}`,
                method: 'DELETE',
                body: id
            }),
            invalidatesTags: ["Events"]
        }),
        postEvent: builder.mutation({
            query: (data)=>({
                url: `/api/Activities`, //verovatno
                method: 'POST',
                body: {...data}
            })
        }),
        postRateEvent: builder.mutation({
            query: ({rate,id})=>({
                url: `/api/Activities/rate/${id}?rating=${rate}`, 
                method: 'POST',
                
            }),
           
        }),
        postJoinTeamActivity: builder.mutation({
            query: ({teamId,activityId})=>({
                url:  `/api/Activities/join-activity/${teamId}/${activityId}`,
                method: 'POST'
            }),
            invalidatesTags: ["Teams"]
        }),




        getTeamsAll: builder.query({
            query: ()=>({
                url: `/api/Team`,
                method: 'GET' //mada ne mora method
            })
        }),
        getTeam: builder.query({
            query: (id)=>({
                url: `/api/Team/${id}`,
                method: 'GET'
            }),
            providesTags: ["Teams"]
        }),
        postTeam: builder.mutation({
            query: (obj) =>({
                url: `api/Team`,
                method: 'POST',
                body: {...obj}    //e nisam siguran sad kako 
            }),
            invalidatesTags: ["Teams"]
        }),
        putTeamInPlayer: builder.mutation({
            query: ({teamId,userId})=>({
                url: `api/Team/${teamId}/${userId}`,
                method: 'PUT',
                //nema tela izgleda
            }),
            invalidatesTags: ["Teams"]
        }),
        deleteUserFromTeam: builder.mutation({
            query: ({teamId,userId})=>({
                url: `api/Team/${teamId}/${userId}`,
                method: 'DELETE'
            }),
            invalidatesTag: ["Teams"]
        }),
        deleteTeam: builder.mutation({
            query: (id) =>({
                url: `api/Team/${id}`,
                method: 'DELETE',
            }),
            invalidatesTag: ["Teams"]
        })
        



    }),
    
})

//ove hookove nam pravi automatski RTK
export const {
    useGetUsersQuery,
    useGetUserQuery,
    useLoginUserMutation,
    useDeleteUserMutation,
    usePutUserMutation,
    useRegisterUserMutation,

    
    useGetEventsQuery,
    useGetEventQuery,
    useDeleteEventMutation,
    usePostEventMutation,
    usePostRateEventMutation,
    usePostJoinTeamActivityMutation,


    useGetCommentsQuery,
    usePostCommentMutation,
    usePutCommentMutation,
    useDeleteCommentMutation,

    
    useGetTeamsAllQuery,
    useGetTeamQuery,
    usePostTeamMutation,
    usePutTeamInPlayerMutation,
    useDeleteUserFromTeamMutation,
    useDeleteTeamMutation,

} = apiSlice;