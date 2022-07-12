import { useLocation, Navigate, Outlet} from "react-router-dom"
import { useSelector } from "react-redux"
import { selectCurrentToken, selectCurrentUser } from "./authSlice"
import React from 'react'

const RequireAuth = ({allowedRoles}) => {
    //const token = useSelector(selectCurrentToken) 
    const token = localStorage.getItem('token');
    const location = useLocation()
    const user=useSelector(selectCurrentUser)
    console.log(user)

    const Direct=()=>{
      if(token && user){
        if(allowedRoles.includes(user?.role?.id)){
          return( <Outlet/> )
        }else
        return (<Navigate to="/sign-in" state={ {from: location}} replace />)
      }
      else
        return (<Navigate to="/sign-in" state={ {from: location}} replace />)
    }

  return (
      <Direct/>
  )
}
export default RequireAuth

/*                                state={ {from: location}} replace   -  omogucava back funkcionlalnost*/


/*return (
    token?
        <Outlet/>                 
        : <Navigate to="/sign-in" state={ {from: location}} replace />
  )
*/