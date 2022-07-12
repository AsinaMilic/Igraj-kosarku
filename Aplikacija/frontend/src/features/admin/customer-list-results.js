import React from 'react'
import { useEffect, useState } from 'react';
import PerfectScrollbar from 'react-perfect-scrollbar';
import PropTypes from 'prop-types';
import { format } from 'date-fns';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';

import {
  Avatar,
  Box,
  Card,
  Checkbox,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TablePagination,
  TableRow,
  Typography,
  Chip,
  Button,
  Dialog,
  DialogTitle
} from '@mui/material';
import { usePutUserMutation } from '../../api/apiSlice';

export const CustomerListResults = ({ customers, input,setInput,selectedCustomerIds, setSelectedCustomerIds,...rest }) => {
  const [output,setOutput]=useState([]);

  //const [selectedCustomerIds, setSelectedCustomerIds] = useState([]);
  const [limit, setLimit] = useState(5);
  const [page, setPage] = useState(0);
  const [putUser]=usePutUserMutation()
  let out;

  useEffect(()=>{
    setOutput([]);
    customers.filter(customer=>{
      if(customer?.firstName?.includes(input)){
        setOutput(output=>[...output,customer])
      }
    })
  },[input])

  const handleSelectAll = (event) => {
    let newSelectedCustomerIds;

    if (event.target.checked) {
      newSelectedCustomerIds = customers.map((customer) => customer.id);
    } else {
      newSelectedCustomerIds = [];
    }

    setSelectedCustomerIds(newSelectedCustomerIds);
  };

  const handleSelectOne = (event, id) => {
    const selectedIndex = selectedCustomerIds.indexOf(id);
    let newSelectedCustomerIds = [];

    if (selectedIndex === -1) {
      newSelectedCustomerIds = newSelectedCustomerIds.concat(selectedCustomerIds, id);
    } else if (selectedIndex === 0) {
      newSelectedCustomerIds = newSelectedCustomerIds.concat(selectedCustomerIds.slice(1));
    } else if (selectedIndex === selectedCustomerIds.length - 1) {
      newSelectedCustomerIds = newSelectedCustomerIds.concat(selectedCustomerIds.slice(0, -1));
    } else if (selectedIndex > 0) {
      newSelectedCustomerIds = newSelectedCustomerIds.concat(
        selectedCustomerIds.slice(0, selectedIndex),
        selectedCustomerIds.slice(selectedIndex + 1)
      );
    }

    setSelectedCustomerIds(newSelectedCustomerIds);
  };

  const pendingReq=(out)=>{
    handleClickOpen()
  }
  
  const StatusToChip = (status,out)=>{
    console.log(out)
    if(status==='pending') return  <>
                                    <Button onClick={()=>pendingReq(out)}><Chip label="Pending" color="warning" sx={{color:"white"}}/></Button>
                                            <div>
                                                <Dialog
                                                open={open}
                                                onClose={()=>setOpen(false)}
                                                aria-labelledby="alert-dialog-title"
                                                aria-describedby="alert-dialog-description"
                                              >
                                                <DialogTitle >
                                                  {"Change the role of the user?"}
                                                </DialogTitle>
                                                <DialogContent>
                                                  <DialogContentText >
                                                    This is pending request for a user that wants to become a coach. 
                                                    What do you want to do with this request?
                                                  </DialogContentText>
                                                </DialogContent>
                                                <DialogActions>
                                                  <Button  onClick={()=>{prihvati(out)}}>Accept</Button>
                                                  <Button onClick={()=>{odbi(out)}} autoFocus>Deny</Button>
                                                </DialogActions>
                                              </Dialog>
                                            </div>
                                    </>
    if(status==='approved') return <Chip label="Approved" color="success" sx={{color:"white",marginLeft:1}}/>
    if(status==='denied') return <Chip label="Denied" color="error" sx={{color:"white",marginLeft:2}}/>
  }
  const formatDate=(date)=>{
    let vreme=new Date(date)
    let datum=vreme.toDateString()
    return `${datum} `
 }


 const [open, setOpen] = React.useState(false);
 const handleClickOpen = () => {
  setOpen(true);
};



const odbi=(out)=>{
  setOpen(false);
  let todo={
    email: out?.email ,
    firstName: out.firstName,
    lastName: out.lastName,
    location: out.location,
    roleId: out.role.id,
    status: 'denied',
    phone: out.phone,
    description: out.description,
    specialties: out.specialties,
    profileName: out.profileName
  }
  const obj={
    todo: todo,
    id: out.id
  }
  putUser(obj)
}
const prihvati=(out)=>{
  setOpen(false);
  //delete out.status
  //out.status='pending'
  console.log(out)
  
  let todo={
      email: out?.email ,
      firstName: out.firstName,
      lastName: out.lastName,
      location: out.location,
      roleId: 2300,
      status: 'approved',
      phone: out.phone,
      description: out.description,
      specialties: out.specialties,
      profileName: out.profileName
  }
  console.log(todo)
  console.log(out.id);
  const obj={
    todo: todo,
    id: out.id
  }
  putUser(obj)
  
}
  return (
    <Card {...rest}>
      <PerfectScrollbar>
        <Box sx={{ minWidth: 1050 }}>
          <Table>
            <TableHead sx={{backgroundColor:"#C8C9C7"}}>
              <TableRow>
                <TableCell padding="checkbox">
                  <Checkbox
                    checked={selectedCustomerIds.length === customers.length}
                    color="primary"
                    indeterminate={
                      selectedCustomerIds.length > 0
                      && selectedCustomerIds.length < customers.length
                    }
                    onChange={handleSelectAll}
                  />
                </TableCell>
                <TableCell>
                  Name
                </TableCell>
                <TableCell>
                  Email
                </TableCell>
                <TableCell>
                  Profile Name
                </TableCell>
                <TableCell>
                  Phone
                </TableCell>
                <TableCell>
                  Registration date
                </TableCell>
                <TableCell>
                  Role
                </TableCell>
                <TableCell>
                  Request
                </TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {output.slice(page*limit, page*limit+limit).map((out) => {
                
                out=out;
                return (
                <TableRow
                  hover
                  key={out.id}
                  selected={selectedCustomerIds.indexOf(out.id) !== -1}
                >
                  <TableCell padding="checkbox">
                    <Checkbox
                      checked={selectedCustomerIds.indexOf(out.id) !== -1}
                      onChange={(event) => handleSelectOne(event, out.id)}
                      value="true"
                    />
                  </TableCell>
                  <TableCell>
                    <Box
                      sx={{
                        alignItems: 'center',
                        display: 'flex'
                      }}
                    >
                      <Avatar
                        src={out?.imageUrl}
                        sx={{ mr: 2 }}
                      >
                        {getInitials(out?.firstName)}
                      </Avatar>
                      <Typography
                        
                        variant="body1"
                      >
                        {out?.firstName}
                      </Typography>
                    </Box>
                  </TableCell>
                  <TableCell>
                    {out?.email}
                  </TableCell>
                  <TableCell>
                    {`${out?.profileName}`}
                  </TableCell>
                  <TableCell>
                    {out?.phoneNumber}
                  </TableCell>
                  <TableCell>
                    {formatDate(out?.createdAt)}
                  </TableCell>
                  <TableCell>
                    {out?.role?.name}
                  </TableCell>
                  <TableCell>
                    { StatusToChip(out?.status,out)}
                  </TableCell>
                </TableRow>
              )})}
            </TableBody>
          </Table>
        </Box>
      </PerfectScrollbar>
      <TablePagination
        component="div"
        count={customers.length}
        onPageChange={(event, newPage) => {setPage(newPage)}}
        onRowsPerPageChange={(event) => {setLimit(event.target.value);}}
        page={page}
        rowsPerPage={limit}
        rowsPerPageOptions={[5, 10, 25]}
      />
      
    </Card>
    
  );
};

CustomerListResults.propTypes = {
  customers: PropTypes.array.isRequired
};



const getInitials = (name = '') => name
  .replace(/\s+/, ' ')
  .split(' ')
  .slice(0, 2)
  .map((v) => v && v[0].toUpperCase())
  .join('');
