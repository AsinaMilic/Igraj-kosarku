import {useState,useEffect} from 'react'
import { Box, Collapse, Container } from '@mui/material';
import { CustomerListResults } from './customer-list-results'
import { CustomerListToolbar } from './customer-list-toolbar';
import  DashboardLayout  from './dashboard-layout';
import { useGetUsersQuery } from '../../api/apiSlice';
import { AddUser } from './addUser';

const Users = () => {
  const [input,setInput]=useState()
  const [selectedCustomerIds, setSelectedCustomerIds] = useState([]);
  const [addUser,setAddUser]=useState(false);
  const {
    data: CUSTOMERS, 
    isLoading,
    isError
  } = useGetUsersQuery()
  
  console.log(CUSTOMERS)
return(
  <>
  <DashboardLayout>
    <Box component='main' sx={{flexGrow: 1, py: 1,display:'flex',alignItems:'flex-start' }}>
      <Container maxWidth={true}>
        {isLoading?null:
        <>
          <CustomerListToolbar 
            customers={CUSTOMERS} 
            input={input} setInput={setInput} 
            selectedCustomerIds={selectedCustomerIds} 
            setSelectedCustomerIds={setSelectedCustomerIds}
            addUser={addUser}
            setAddUser={setAddUser}
          />
          {addUser&&
            <Collapse in={addUser}> 
              <Container maxWidth="md" sx={{mt:1}}>
                <AddUser/> 
              </Container>
            </Collapse>
          }
          <Box sx={{ mt: 3 }}>
            <CustomerListResults 
              customers={CUSTOMERS} 
              input={input} setInput={setInput} 
              selectedCustomerIds={selectedCustomerIds}
              setSelectedCustomerIds={setSelectedCustomerIds}/>
          </Box>
        
      </>
        } 
      </Container>
    </Box>
    </DashboardLayout>
  </>
);
}
export default Users;
