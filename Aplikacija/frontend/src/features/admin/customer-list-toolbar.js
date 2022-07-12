import {
  Box,
  Button,
  Card,
  CardContent,
  TextField,
  InputAdornment,
  SvgIcon,
  Typography,
  
} from "@mui/material";
import PrintOutlinedIcon from '@mui/icons-material/PrintOutlined';
import SearchIcon from "@mui/icons-material/Search";
import DownloadIcon from "@mui/icons-material/FileDownloadOutlined";
import DeleteOutlineOutlinedIcon from '@mui/icons-material/DeleteOutlineOutlined';

import {useNavigate} from "react-router-dom"
import { CSVLink } from "react-csv";
import jsPDF from 'jspdf' 
import 'jspdf-autotable'
import { useDeleteUserMutation } from "../../api/apiSlice";
import React, { useEffect } from "react";
import Snackbar from "../../modules/components/Snackbar";
import EditIcon from '@mui/icons-material/Edit';
import EditOffIcon from '@mui/icons-material/EditOff';
import PersonAddOutlinedIcon from '@mui/icons-material/PersonAddOutlined';



export const CustomerListToolbar = ({ customers,input,setInput,selectedCustomerIds, setSelectedCustomerIds, addUser,setAddUser}, ...rest) => {
  const navigate=useNavigate()
  const [open,setOpen]=React.useState(false)
  const [deleteUser]=useDeleteUserMutation()
  const [inspectIcon,setInspectIcon]=React.useState(false)
  
  const deleteUsers=()=>{
    if(selectedCustomerIds.length>=5)
      setOpen(true)
    selectedCustomerIds.forEach(userID=>{
      deleteUser(userID)
      window.location.reload()
    })
  }
  
  useEffect(()=>{
    if(selectedCustomerIds.length==1) 
      setInspectIcon(true)
    else  
      setInspectIcon(false)
  },[selectedCustomerIds.length])
  
  const headers = [
    { label: "Id", key: "id" },
    { label: "Address", key: "address" },
    { label: "AvatarUrl", key: "avatarUrl" },
    { label: "CreatedAt", key: "createdAt" },
    { label: "Email", key: "email" },
    { label: "Name", key: "name" },
    { label: "Phone", key: "phone" },
    { label: "Role", key: "role" },
    { label: "Request", key: "request" },
  ];
  const csvLink = {
    headers: headers,
    data: customers,
    filename: "BasketUsers.csv",
  };

  const downloadPdf=()=>{
    const doc=new jsPDF() //kreiramo instancu
    doc.text("Basketball user details",20,10) //naslov
    doc.autoTable({ //mapiramo podatke onako kako biblioteka zahteva
      columns: headers.map(cus=>({header:cus.label,dataKey:cus.key})),
      body:customers
    })
    doc.save('Basketball users details')
  }
  return (
    <Box {...rest}>
      <Box
        sx={{
          alignItems: "center",
          display: "flex",
          justifyContent: "space-between",
          flexWrap: "wrap",
          m: -1,
        }}
      >
        <Typography sx={{ m: 1 }} variant="h4">
          Users
        </Typography>
        <Box sx={{ m: 1 }} >
          <Button
            variant="outlined"
            startIcon={<PrintOutlinedIcon fontSize="small" />}
            sx={{ mr: 1,color:"blue"}}
            onClick={()=>downloadPdf()}
          >
            Export PDF
          </Button>
          <Button
            variant="outlined"
            startIcon={<DownloadIcon sx={{color:'blue'}} fontSize="small" />}
            sx={{ mr: 1 }}
          >
            <CSVLink {...csvLink}>Download CSV</CSVLink>
          </Button>
          <Button 
            onClick={()=> {setAddUser(true)}}
            sx={{color:'white',backgroundColor:'success.main',mr:1}}
            variant="contained"
            startIcon={<PersonAddOutlinedIcon/>}
            >
            Add User
          </Button>
          <Button 
            disabled={selectedCustomerIds.length!==1?true:false}
            onClick={()=> navigate(`/users/${selectedCustomerIds[0]}`)}
            sx={{color:'white',backgroundColor:'error.main',mr:1}}
            variant="contained"
            startIcon={inspectIcon?<EditIcon/>:<EditOffIcon/>}
            >
            Inspect User
          </Button>
          <Button 
            onClick={()=>deleteUsers()}
            sx={{color:'white',backgroundColor:'error.dark'}}
            variant="contained"
            startIcon={<DeleteOutlineOutlinedIcon/>}>
            Delete User/s
          </Button>
          
        </Box>
      </Box>
      <Box sx={{ mt: 3 }}>
        <Card>
          <CardContent>
            <Box sx={{ maxWidth: 500 }}>
              <TextField
                fullWidth
                InputProps={{
                  startAdornment: (
                    <InputAdornment position="start">
                      <SvgIcon color="action" fontSize="small">
                        <SearchIcon />
                      </SvgIcon>
                    </InputAdornment>
                  ),
                }}
                placeholder="Search user"
                variant="outlined"

                onChange={e=>setInput(e.target.value)}
              />
            </Box>
          </CardContent>
        </Card>
      </Box>
      
      <Snackbar
        open={open}
        closeFunc={()=>setOpen(false)}
        message="You are deleting too many users, are you sure?"
      />
      
    </Box>
    
    
  );
};
